import { NextRequest, NextResponse } from "next/server"

import prisma from "@/lib/prisma"

export async function GET(req: NextRequest) {
  const { id } = await req.json()

  const workspaces = await prisma.workspaces.findMany({
    where: {
      UID: id,
    },
    select: {
      ID: true,
      Name: true,
      Domain_Name: true,
      WS_Type: true,
      UID: true,
      Applications: true,
    },
  })

  return NextResponse.json(workspaces)
}
