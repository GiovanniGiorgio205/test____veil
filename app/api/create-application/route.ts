import { NextRequest, NextResponse } from "next/server"

import prisma from "@/lib/prisma"

export async function POST(req: NextRequest) {
  const { application_name, providers } = await req.json()
  const application = await prisma.applications.create({
    data: {
      ApplicationName: application_name,
      Providers: providers,
      API_Token: "",
    },
  })
  return NextResponse.json(application)
}
