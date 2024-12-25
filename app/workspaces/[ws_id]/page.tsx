"use client"

import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/auth"
import { Cookies } from "typescript-cookie"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CreateApplicationButton } from "@/components/create-app-btn"

export default function WorkspacePage() {
  const { user } = useAuth()
  const router = useRouter()
  const params = useParams<{ ws_id: string }>()
  const ws_id = params.ws_id
  const selectedWorkspace = user?.Workspaces?.find(
    (workspace) => workspace.ID === ws_id
  )

  return (
    <div className="container py-5 flex flex-col gap-5">
      {selectedWorkspace?.Applications?.map((application) => (
        <Card key={application.ID}>
          <CardHeader>
            <CardTitle>{application.ApplicationName}</CardTitle>
            <CardDescription>{application.API_Token}</CardDescription>
          </CardHeader>
          <CardFooter className="flex gap-5">
            <div className="flex-1">
              {application.Providers.map((provider) => (
                <Badge>{provider}</Badge>
              ))}
            </div>
            <Button
              variant="outline"
              onClick={() => {
                Cookies.set("app_id", application.ID)
                router.push(`/applications/${application.ID}`)
              }}
            >
              Open Application
            </Button>
          </CardFooter>
        </Card>
      ))}
      <CreateApplicationButton ws_id={ws_id} />
    </div>
  )
}
