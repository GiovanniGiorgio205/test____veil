"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@/auth"
import { LayoutDashboard, LogInIcon, LogOut } from "lucide-react"

import { Button } from "./ui/button"

export function LoginButton() {
  const router = useRouter()
  const { user, logout } = useAuth()

  return (
    <div className="grid grid-flow-col gap-2">
      <Button
        className="flex gap-2 p-2 md:px-4 md:py-2"
        variant={user ? "outline" : "default"}
        onClick={() => {
          if (user) {
            router.push("/workspaces")
          } else {
            router.push("/signin")
          }
        }}
      >
        {user ? <LayoutDashboard /> : <LogInIcon />}
        {user ? (
          <h4 className="hidden md:block">
            Open {user.display_name} Workspace
          </h4>
        ) : (
          <h4 className="hidden md:block">Login into Workspace</h4>
        )}
      </Button>
      {user && (
        <Button variant="outline" className="p-3" onClick={() => logout()}>
          <LogOut />
        </Button>
      )}
    </div>
  )
}
