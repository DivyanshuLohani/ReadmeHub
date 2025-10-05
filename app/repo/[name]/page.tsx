"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function RepoPage() {
  const params = useParams()
  const router = useRouter()
  const [repo, setRepo] = useState<any>(null)
  const [readme, setReadme] = useState("")
  const [loading, setLoading] = useState(true)
  const [contributing, setContributing] = useState(false)

  useEffect(() => {
    fetchRepo()
  }, [params.name])

  const fetchRepo = async () => {
    const res = await fetch(`/api/repos/${params.name}`)
    if (res.ok) {
      const data = await res.json()
      setRepo(data.repository)
      setReadme(data.repository.readmeContent)
    }
    setLoading(false)
  }

  const handleContribute = async (type: string) => {
    setContributing(true)
    let newContent = readme

    switch (type) {
      case "typo":
        newContent = newContent.replace(/project/g, "projct").replace(/awesome/g, "awsome")
        break
      case "emoji":
        const emojis = ["🚀", "✨", "🔥", "💯", "🎉", "💪", "⚡", "🌟"]
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)]
        newContent = newContent + ` ${randomEmoji}`
        break
      case "quote":
        const quotes = [
          '\n\n> "Code is poetry" - Some Developer',
          '\n\n> "Just ship it!" - Every PM Ever',
          '\n\n> "It works on my machine" - Everyone',
          '\n\n> "First we solve the problem, then we write the code" - Wise Person',
        ]
        newContent = newContent + quotes[Math.floor(Math.random() * quotes.length)]
        break
      case "exclamation":
        newContent = newContent.replace(/\./g, "!").replace(/\!/g, "!!!")
        break
    }

    setReadme(newContent)

    const res = await fetch("/api/contribute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        repositoryId: repo.id,
        type,
        content: newContent,
      }),
    })

    if (res.ok) {
      await fetchRepo()
    }

    setContributing(false)
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!repo) {
    return <div className="min-h-screen flex items-center justify-center">Repository not found</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4">
          <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20" onClick={() => router.push("/dashboard")}>
            ← Back to Dashboard
          </Button>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-3xl">{repo.name}</CardTitle>
                <CardDescription>{repo.description}</CardDescription>
              </div>
              <Badge variant="secondary">⭐ {repo.stars}</Badge>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>README.md</CardTitle>
                <CardDescription>The sacred text that needs your "improvements"</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg font-mono text-sm whitespace-pre-wrap">
                  {readme}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Contribution Options</CardTitle>
                <CardDescription>Choose your weapon</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full" 
                  onClick={() => handleContribute("typo")}
                  disabled={contributing}
                >
                  Fix Typos 📝
                </Button>
                <Button 
                  className="w-full" 
                  variant="secondary"
                  onClick={() => handleContribute("emoji")}
                  disabled={contributing}
                >
                  Add Emoji 🚀
                </Button>
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => handleContribute("quote")}
                  disabled={contributing}
                >
                  Add Quote 💬
                </Button>
                <Button 
                  className="w-full" 
                  variant="destructive"
                  onClick={() => handleContribute("exclamation")}
                  disabled={contributing}
                >
                  More Exclamation!!! ‼️
                </Button>
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Quality Meter</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-5xl font-bold text-red-500">0/10</p>
                  <p className="text-sm text-muted-foreground mt-2">Contribution quality (always)</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
