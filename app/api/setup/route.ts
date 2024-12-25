import { NextRequest, NextResponse } from "next/server"

import prisma from "@/lib/prisma"

export async function POST(req: NextRequest) {
  const { workspace_name, workspace_domain_name, workspaceType, uid } =
    await req.json()

  const workspace = await prisma.workspaces.create({
    data: {
      Name: workspace_name,
      Domain_Name: workspace_domain_name,
      WS_Type: workspaceType,
      UID: uid,
    },
  })
  return NextResponse.json(workspace)
}
