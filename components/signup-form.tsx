"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@/auth"
import { SignupFormData, signupSchema } from "@/schemas/signupSchema"
import { ChevronLeft, User } from "lucide-react"
import { toast } from "sonner"

import { DynamicForm } from "./dynamic-form"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "./ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"

export function SignupForm() {
  const { signup } = useAuth()
  const handleSubmit = async (data: SignupFormData) => {
    const res = await signup(data)
    toast("Sign up in process...")
  }
  const router = useRouter()
  return (
    <div className="grid gap-2 p-2 rounded-lg border border-dashed overflow-hidden">
      <Card className="w-[500px] z-20 bg-background">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create your own VEIL account.</CardDescription>
        </CardHeader>
        <CardContent>
          <DynamicForm
            schema={signupSchema}
            onSubmit={handleSubmit}
            submitText="Sign Up"
            redirectUrl="/signin"
          />
        </CardContent>
      </Card>
      <div className="flex flex-row justify-items-stretch gap-2 ">
        <Button
          variant="link"
          className="flex-1 gap-2"
          onClick={() => {
            router.push("/")
          }}
        >
          <ChevronLeft />
          <h3>Return to home page</h3>
        </Button>
        <Button
          variant="link"
          className="flex-1 gap-2"
          onClick={() => {
            router.push("/signin")
          }}
        >
          <User />
          <h3>Login into account</h3>
        </Button>
        <ThemeToggle />
      </div>
    </div>
  )
}
