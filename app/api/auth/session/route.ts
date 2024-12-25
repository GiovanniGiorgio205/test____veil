import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
  const sessionToken = req.cookies.get("session-token")?.value

  if (!sessionToken) {
    return NextResponse.json({ error: "No session found" }, { status: 401 })
  }

  try {
    const session = await prisma.session.findUnique({
      where: { sessionToken },
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
                Description: true,
                WS_Type: true,
                Access_Token: true,
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

    if (!session) {
      const response = NextResponse.json(
        { error: "Invalid session" },
        { status: 401 }
      )
      response.cookies.set("session-token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 0,
        path: "/",
      })
      return response
    }

    if (new Date(session.expires) < new Date()) {
      const response = NextResponse.json(
        { error: "Session expired" },
        { status: 401 }
      )
      response.cookies.set("session-token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 0,
        path: "/",
      })
      return response
    }

    return NextResponse.json({
      user: session.user,
      expires: session.expires.toISOString(),
    })
  } catch (error) {
    console.error("Session check error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
