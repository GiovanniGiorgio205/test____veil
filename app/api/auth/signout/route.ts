import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  const sessionToken = req.cookies.get("session-token")?.value

  if (sessionToken) {
    try {
      await prisma.session.delete({
        where: { sessionToken },
      })
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const response = NextResponse.json({ message: "Logged out successfully" })
  response.cookies.set("session-token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0,
    path: "/",
  })

  return response
}
