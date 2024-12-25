"use client"

import { useRouter } from "next/navigation"

import { Button } from "./ui/button"

export function CreateApplicationButton({ ws_id }: { ws_id: string }) {
  const router = useRouter()

  return (
    <Button
      onClick={() => {
        router.push(`/create-application?ws_id=${ws_id}`)
      }}
      className="flex"
    >
      Create application
    </Button>
  )
}
