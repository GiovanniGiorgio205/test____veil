import { NextRequest, NextResponse } from "next/server"

import encrypt from "@/lib/crypto"
import prisma from "@/lib/prisma"

import { SignupFormData } from "../../../../schemas/signupSchema"

export async function POST(req: NextRequest) {
  const { signupFormData } = await req.json()
  const { login, email, displayName, birthdayDate, password } =
    signupFormData as SignupFormData

  const user = await prisma.users.create({
    data: {
      login: login,
      email: email,
      display_name: displayName,
      birthday_date: birthdayDate,
      encrypted_password: encrypt(password),
    },
  })

  if (user) {
    return NextResponse.json(user)
  }

  return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
}
