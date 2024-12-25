"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Provider, Users } from "@prisma/client"

import { SignupFormData } from "./schemas/signupSchema"

type User = {
  id: string
  email: string
  display_name: string | null
  Workspaces: Workspace[] | null
}

export type Workspace = {
  ID: string
  Name: string
  Description: string
  Domain_Name: string
  WS_Type: string
  Access_Token: string
  UID: string
  Applications: Application[] | null
}

export type Application = {
  ID: string
  ApplicationName: string
  API_Token: string
  Providers: Provider[]
  Secret_Key: string
  Created_At: Date
  Updated_At: Date
  WS_ID: string
  Users: Users[]
}

type Session = {
  user: User
  expires: string
}

type AuthContextType = {
  user: User | null
  session: Session | null
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  signup: (data: SignupFormData) => Promise<void>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkSession()
  }, [])

  async function checkSession() {
    try {
      const response = await fetch("/api/auth/session")
      if (response.ok) {
        const sessionData = await response.json()
        setSession(sessionData)
        setUser(sessionData.user)
      }
    } catch (error) {
      console.error("Failed to check session:", error)
    } finally {
      setIsLoading(false)
    }
  }

  async function login(login: string, password: string) {
    setIsLoading(true)
    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
      })
      if (response.ok) {
        const sessionData = await response.json()
        setSession(sessionData)
        setUser(sessionData.user)
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || "Login failed")
      }
    } catch (error) {
      console.error("Login error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  async function signup(signupFormData: SignupFormData) {
    setIsLoading(true)
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ signupFormData }),
      })
      if (response.ok) {
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || "Signup failed")
      }
    } catch (error) {
      console.error("Signup error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  async function logout() {
    setIsLoading(true)
    try {
      const response = await fetch("/api/auth/signout", { method: "POST" })
      if (response.ok) {
        setUser(null)
        setSession(null)
        router.push("/")
      } else {
        throw new Error("Logout failed")
      }
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        login,
        logout,
        signup,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
