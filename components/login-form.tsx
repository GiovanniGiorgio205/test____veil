"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@/auth"
import { SigninFormData, signinSchema } from "@/schemas/signinSchema"
import { ChevronLeft, UserPlus } from "lucide-react"
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

export function LoginForm() {
  const router = useRouter()
  const { login } = useAuth()
  const handleSubmit = async (data: SigninFormData) => {
    toast("Sign in in process...")
    const res = await login(data.login, data.password)
  }

  return (
    <div className="grid gap-2 p-2 rounded-lg border border-dashed overflow-hidden">
      <Card className="w-[500px] z-20 bg-background">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Enter through the VEIL.</CardDescription>
        </CardHeader>
        <CardContent>
          <DynamicForm
            schema={signinSchema}
            onSubmit={handleSubmit}
            submitText="Sign In"
            redirectUrl="/workspaces"
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
            router.push("/signup")
          }}
        >
          <UserPlus />
          <h3>Create account</h3>
        </Button>
        <ThemeToggle />
      </div>
    </div>
  )
}
