import { z } from "zod"

export const signupSchema = z.object({
  login: z.string().min(2, "Login should be at least 2 characters long"),
  email: z.string().email("Invalid email"),
  displayName: z
    .string()
    .min(2, "Display name should be at least 2 characters long"),
  password: z.string().min(8, "Password should be at least 8 characters long"),
  confirmPassword: z
    .string()
    .min(8, "Password should be at least 8 characters long"),
  birthdayDate: z.date(),
})

export type SignupFormData = z.infer<typeof signupSchema>
