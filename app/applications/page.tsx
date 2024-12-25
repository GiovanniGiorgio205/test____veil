"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@/auth"
import { Cookies } from "typescript-cookie"

import { Button } from "@/components/ui/button"

export default function WorkspacePage() {
  const { user } = useAuth()
  const router = useRouter()

  if (Cookies.get("ws_id")) {
    Cookies.set("ws_id", null)
  }
  return (
    <div className="container py-5 flex flex-col gap-5">
      <Button
        onClick={() => {
          router.push("/create-application")
        }}
      >
        Create Application
      </Button>
    </div>
  )
}
