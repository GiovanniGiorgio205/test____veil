import { Provider } from "@prisma/client"
import { z } from "zod"

export const appSchema = z.object({
  application_name: z
    .string()
    .min(2, "Application name should be at least 2 characters long"),
  providers: z.array(z.nativeEnum(Provider)),
})

export type ApplicationFormData = z.infer<typeof appSchema>
