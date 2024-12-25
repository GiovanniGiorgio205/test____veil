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
  const params = useParams<{ ws_id: string }>()
  const { user } = useAuth()
  const router = useRouter()

  if (user) {
    if (user?.Workspaces?.length == 0) {
      router.push("/setup")
    }
  }

  const ws_id = params.ws_id
  const cookies_ws_id = Cookies.get("ws_id")?.toString()

  if (ws_id != cookies_ws_id && !cookies_ws_id && ws_id) {
    Cookies.set("ws_id", ws_id)
  }

  return (
    <div className="grid grid-cols-[200px_1fr] grid-rows-[auto_1fr] columns-2 h-screen">
      <div className="grid justify-center items-center px-4 py-2 border-r border-b w-auto">
        <h4 className="self-center text-lg font-bold">Veil</h4>
      </div>
      <div className="flex gap-5 align-center px-4 py-2 border-b w-full text-sm ">
        <div className="flex flex-none md:max-w-[300px] w-full">
          <Select
            defaultValue={ws_id && cookies_ws_id ? cookies_ws_id : "all"}
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
