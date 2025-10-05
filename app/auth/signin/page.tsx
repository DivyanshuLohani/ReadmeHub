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
    <div className="min-h-screen flex items-center justify-center bg-[#0d1117] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute top-40 right-20 w-[500px] h-[500px] rounded-full bg-[#183D5D]/20 blur-3xl" />
        <div className="absolute bottom-20 left-1/4 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute bottom-40 right-1/3 w-72 h-72 rounded-full bg-orange-600/10 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md px-4">
        {/* Hacktoberfest Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#183D5D] border-2 border-orange-500 rounded-full">
            <span className="text-3xl">🎃</span>
            <span className="text-orange-500 font-bold text-lg tracking-wider">HACKTOBERFEST 2024</span>
            <span className="text-3xl">🎃</span>
          </div>
        </div>

        <Card className="w-full bg-[#0d1117] border-2 border-[#30363d] shadow-2xl">
          <CardHeader className="space-y-3 pb-6">
            <div className="flex justify-center mb-2">
              <div className="text-6xl">🚀</div>
            </div>
            <CardTitle className="text-4xl text-center text-white font-bold">
              Welcome to ReadmeHub
            </CardTitle>
            <CardDescription className="text-center text-gray-400 text-lg">
              Join the elite squad of README contributors!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignIn} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="username" className="text-gray-300 text-base font-semibold">
                  Choose Your Username
                </Label>
                <Input
                  id="username"
                  placeholder="readme_warrior_2024"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={loading}
                  className="bg-[#161b22] border-2 border-[#30363d] focus:border-orange-500 text-white placeholder:text-gray-600 h-12 text-base"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg h-12 transition-all transform hover:scale-105 shadow-lg shadow-orange-500/20"
                disabled={loading || !username.trim()}
              >
                {loading ? "Joining the party..." : "Start Contributing 🎉"}
              </Button>
            </form>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                <span>✅</span>
                <p>No password needed - we trust you! 😄</p>
              </div>

              <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 space-y-2">
                <p className="text-xs text-gray-500 text-center font-semibold uppercase tracking-wider mb-2">
                  What You'll Get
                </p>
                <div className="space-y-2 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <span className="text-orange-500">•</span>
                    <span>Instant access to "fix" READMEs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-orange-500">•</span>
                    <span>Totally legitimate badges</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-orange-500">•</span>
                    <span>Contribution graph that looks impressive</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-orange-500">•</span>
                    <span>Bragging rights (questionable value)</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            🎃 ReadmeHub • Where Every Typo Fix Makes You a Hero 🎃
          </p>
          <p className="text-gray-600 text-xs mt-2">
            *This is a parody site celebrating the spirit of README contributions
          </p>
        </div>
      </div>
    </div>
  )
}