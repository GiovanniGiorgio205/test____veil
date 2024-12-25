"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@/auth"
import { Cookies } from "typescript-cookie"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function WorkspacePage() {
  const { user } = useAuth()
  const router = useRouter()

  Cookies.remove("ws_id")

  return (
    <div className="container py-5 flex flex-col gap-5">
      {user?.Workspaces?.map((workspace) => (
        <Card key={workspace.ID}>
          <CardHeader>
            <CardTitle>{workspace.Name}</CardTitle>
            <CardDescription>{workspace.Domain_Name}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{workspace.Description}</p>
          </CardContent>
          <CardFooter className="flex gap-5">
            <div className="flex-1">
              <Badge>{workspace.WS_Type}</Badge>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                Cookies.set("ws_id", workspace.ID)
                router.push(`/workspaces/${workspace.ID}`)
              }}
            >
              Open Workspace
            </Button>
          </CardFooter>
        </Card>
      ))}
      <Button
        onClick={() => {
          router.push("/setup")
        }}
      >
        Create Workspace
      </Button>
    </div>
  )
}
