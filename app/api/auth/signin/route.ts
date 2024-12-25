import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

import encrypt from "../../../../lib/crypto"

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { login, password } = body

  try {
    const user = await prisma.users.findUnique({ where: { login: login } })

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      )
    }

    const isValidPassword =
      encrypt(password as string) === user.encrypted_password

    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      )
    }

    const session = await prisma.session.create({
      data: {
        sessionToken:
          Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15),
        userId: user.id,
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            display_name: true,
            Workspaces: {
              select: {
                ID: true,
                Name: true,
                Domain_Name: true,
                WS_Type: true,
                UID: true,
                Applications: {
                  select: {
                    ID: true,
                    ApplicationName: true,
                    API_Token: true,
                    Providers: true,
                    Secret_Key: true,
                    Created_At: true,
                    Updated_At: true,
                    WS_ID: true,
                    Users: true,
                  },
                },
              },
            },
          },
        },
      },
    })

    const response = NextResponse.json({
      user: session.user,
      expires: session.expires.toISOString(),
    })

    response.cookies.set("session-token", session.sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
