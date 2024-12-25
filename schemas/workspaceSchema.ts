import { WS_Type } from "@prisma/client"
import { z } from "zod"

export const workspaceSchema = z.object({
  workspace_name: z
    .string()
    .min(2, "Workspace name should be at least 2 characters long"),
  workspace_domain_name: z
    .string()
    .min(2, "Workspace domain name should be at least 2 characters long"),
  workspaceType: z.nativeEnum(WS_Type),
  uid: z.string(),
})

export type WorkspaceFormData = z.infer<typeof workspaceSchema>
