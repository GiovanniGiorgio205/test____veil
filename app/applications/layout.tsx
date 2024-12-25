"use client"

import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/auth"
import { Cookies } from "typescript-cookie"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ThemeToggle } from "@/components/theme-toggle"

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const params = useParams<{ app_id: string }>()
  const { user } = useAuth()
  const router = useRouter()

  const app_id = params.app_id
  const cookies_app_id = Cookies.get("app_id")?.toString()
  const cookies_ws_id = Cookies.get("ws_id")?.toString()

  if (app_id != cookies_app_id && !cookies_ws_id && app_id) {
    Cookies.set("app_id", app_id)
  }

  const selectedWorkspace = user?.Workspaces?.find(
    (workspace) => workspace.ID === cookies_ws_id
  )
  const selectedApplication = selectedWorkspace?.Applications?.find(
    (app) => app.ID === cookies_app_id
  )

  return (
    <div className="grid grid-cols-[200px_1fr] grid-rows-[auto_1fr] columns-2 h-screen">
      <div className="grid justify-center items-center px-4 py-2 border-r border-b w-auto">
        <h4 className="text-lg font-bold w-full text-center">Veil</h4>
      </div>
      <div className="flex md:flex-row flex-col gap-2 align-center px-4 py-2 border-b w-full text-sm ">
        <div className="flex flex-none md:max-w-[300px] w-full">
          <Select
            defaultValue={
              cookies_ws_id ? cookies_ws_id : selectedApplication?.WS_ID
            }
            onValueChange={(ws_id) => {
              if (ws_id != "all") {
                Cookies.set("ws_id", ws_id)
                router.push(`/workspaces/${ws_id}`)
              } else {
                Cookies.remove("ws_id")
                router.push("/workspaces")
              }
            }}
          >
            <SelectTrigger id="select-15">
              <SelectValue placeholder="Select workspace" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {user?.Workspaces?.map((workspace) => (
                <SelectItem key={workspace.ID} value={workspace.ID}>
                  {workspace.Name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-none md:max-w-[300px] w-full">
          <Select
            defaultValue={app_id && cookies_app_id ? cookies_app_id : "all"}
            onValueChange={(app_id) => {
              if (app_id != "all") {
                Cookies.set("app_id", app_id)
                router.push(`/applications/${app_id}`)
              } else {
                Cookies.remove("ws_id")
                router.push("/applications")
              }
            }}
          >
            <SelectTrigger id="select-15">
              <SelectValue placeholder="Select workspace" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {selectedWorkspace?.Applications?.map((workspace) => (
                <SelectItem key={workspace.ID} value={workspace.ID}>
                  {workspace.ApplicationName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1"></div>
        <h4 className="my-auto">{user?.display_name}</h4>
        <div className="flex-none">
          <ThemeToggle />
        </div>
      </div>
      <div className="col-span-2 grid place-items-stretch">{children}</div>
    </div>
  )
}
