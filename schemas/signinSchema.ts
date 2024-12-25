import { z } from "zod"

export const signinSchema = z.object({
  login: z.string().min(2, "Login should be at least 2 characters long"),
  password: z.string().min(8, "Password should be at least 8 characters long"),
})

export type SigninFormData = z.infer<typeof signinSchema>
