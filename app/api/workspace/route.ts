import { NextRequest, NextResponse } from "next/server"

import prisma from "@/lib/prisma"

export async function GET(req: NextRequest) {
  const workspaces = await prisma.workspaces.findMany()

  return NextResponse.json(workspaces)
}
