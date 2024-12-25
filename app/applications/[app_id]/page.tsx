"use client"

import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/auth"
import { UserPlus, Users } from "lucide-react"
import { Cookies } from "typescript-cookie"

import NumberTicker from "@/components/ui/number-ticker"
import { Stats } from "@/components/stats"

export default function WorkspacePage() {
  const { user } = useAuth()
  const router = useRouter()
  const params = useParams<{ app_id: string }>()
  const app_id = params.app_id

  const cookies_ws_id = Cookies.get("ws_id")?.toString()
  const cookies_app_id = Cookies.get("app_id")?.toString()

  const selectedWorkspace = user?.Workspaces?.find(
    (workspace) => workspace.ID === cookies_ws_id
  )
  const selectedApp = selectedWorkspace?.Applications?.find(
    (app) => app.ID === cookies_app_id
  )

  const statsData = [
    {
      label: "Login Users",
      value: 1,
      icon: <Users />,
    },
    {
      label: "New Signups",
      value: 1,
      icon: <UserPlus />,
    },
  ]

  return (
    <div className="container py-5 flex flex-col gap-5">
      <div className="flex flex-col gap-2 p-5 border rounded-lg">
        <h1 className="text-3xl font-bold text-gray-500">Total users</h1>
        <NumberTicker
          value={selectedApp?.Users.length}
          className="text-6xl font-black"
        />
      </div>
      <Stats items={statsData} columns={2} />
    </div>
  )
}
