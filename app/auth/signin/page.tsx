"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SignIn() {
  const [username, setUsername] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username.trim()) return

    setLoading(true)

    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username.trim() }),
    })

    if (res.ok) {
      router.push("/dashboard")
      router.refresh()
    } else {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-blue-900 to-cyan-800">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl text-center">Welcome to ReadmeHub</CardTitle>
          <CardDescription className="text-center">
            Enter your username to start contributing to READMEs!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="hacktoberfest_pro"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading || !username.trim()}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          <p className="text-sm text-muted-foreground text-center mt-4">
            No password needed - we trust you! 😄
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
