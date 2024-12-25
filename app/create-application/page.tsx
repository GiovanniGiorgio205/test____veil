"use client"

import { useParams } from "next/navigation"
import { ApplicationFormData, appSchema } from "@/schemas/appSchema"
import { z } from "zod"

import { DynamicForm } from "@/components/dynamic-form"

export default function Page() {
  const params = useParams<{ ws_id: string }>()
  const handleSubmit = async (data: ApplicationFormData) => {
    const res = await fetch("/api/create-application", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  const filledSchema = appSchema.extend({
    WS_ID: z.string().default(params.ws_id),
  })

  return (
    <div className="p-2 h-screen">
      <div className="border border-dotted h-full rounded-lg p-5 space-y-8">
        <h1 className="text-2xl font-bold">Create new application</h1>
        <DynamicForm
          schema={filledSchema}
          onSubmit={handleSubmit}
          submitText="Create application"
          redirectUrl="/workspaces"
        />
      </div>
    </div>
  )
}
