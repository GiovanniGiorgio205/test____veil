"use client"

import { WorkspaceFormData, workspaceSchema } from "@/schemas/workspaceSchema"

import { DynamicForm } from "@/components/dynamic-form"

export default function Page() {
  const handleSubmit = async (data: WorkspaceFormData) => {
    const res = await fetch("/api/setup", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  return (
    <div className="p-2 h-screen">
      <div className="border border-dotted h-full rounded-lg p-5 space-y-8">
        <h1 className="text-2xl font-bold">Setup workspace</h1>
        <DynamicForm
          schema={workspaceSchema}
          onSubmit={handleSubmit}
          submitText="Create workspace"
          redirectUrl="/workspaces"
        />
      </div>
    </div>
  )
}
