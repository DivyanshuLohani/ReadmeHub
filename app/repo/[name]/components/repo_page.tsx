"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ShareButton from "./share_button"
import { Readme } from "./readme"

export default function RepoPage() {
    const params = useParams()
    const router = useRouter()
    const [repo, setRepo] = useState<any>(null)
    const [readme, setReadme] = useState("")
    const [loading, setLoading] = useState(true)
    const [contributing, setContributing] = useState(false)
    const [stared, setStared] = useState(false)
    const [stars, setStars] = useState(0);
    const [repositories, setRepositories] = useState<any[]>([])


    useEffect(() => {
        fetchRepo()
    }, [params.name])

    const fetchRepo = async () => {
        const res = await fetch(`/api/repos/${params.name}`)
        if (res.ok) {
            const data = await res.json()
            setRepo(data.repository)
            setReadme(data.repository.readmeContent);
            setStars(data.repository.stars);
        } else if (res.status === 404) {
            const data = await res.json()
            setRepositories(data.repositories);
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
                // Get a quote from https://zenquotes.io/api/random
                const quoteRes = await fetch("/api/quotes")
                const quoteData = await quoteRes.json()


                newContent = newContent + `\n\n> "${quoteData.q}"`
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

    const handleStar = async () => {
        setStared(!stared)
        const res = await fetch(`/api/repos/${repo.name}/star`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ stared: !stared }),
        })

        if (res.ok) {
            setStars((prevStars: number) => (stared ? prevStars - 1 : prevStars + 1));
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">🎃</div>
                    <p className="text-white text-xl">Loading repository...</p>
                </div>
            </div>
        )
    }

    if (!repo) {
        return (
            <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">😢</div>
                    <p className="text-white text-xl">Repository not found</p>

                    {repositories.length > 0 && (
                        <div className="container mx-auto my-8">
                            <p className="text-white text-lg mb-4">Did you mean one of these?</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {repositories.map((repo: any) => (
                                    <Card key={repo.id} className="bg-[#161b22] border border-[#30363d] cursor-pointer hover:border-orange-500 transition-colors"
                                        onClick={() => router.push(`/repo/${repo.name}`)}
                                    >
                                        <CardHeader>
                                            <CardTitle className="text-white text-xl">{repo.name}</CardTitle>
                                            <CardDescription className="text-gray-400">{repo.description}</CardDescription>
                                        </CardHeader>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#0d1117] relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-orange-500/10 blur-3xl" />
            <div className="absolute top-40 right-20 w-40 h-40 rounded-full bg-[#183D5D]/20 blur-3xl" />
            <div className="absolute bottom-20 left-1/4 w-36 h-36 rounded-full bg-purple-500/10 blur-3xl" />

            <div className="container mx-auto px-4 py-8 relative z-10">
                {/* Header */}
                <div className="mb-6 flex justify-between items-center">
                    <Button
                        variant="outline"
                        className="bg-[#21262d] text-white border-[#30363d] hover:bg-[#30363d]"
                        onClick={() => router.push("/dashboard")}
                    >
                        ← Back to Dashboard
                    </Button>

                    <div className="flex items-center gap-2 px-4 py-2 bg-[#183D5D] border-2 border-orange-500 rounded-full">
                        <span className="text-xl">🎃</span>
                        <span className="text-orange-500 font-bold text-sm tracking-wider">CONTRIBUTE NOW</span>
                    </div>
                </div>

                {/* Repo Header */}
                <Card className="mb-8 bg-[#0d1117] border-2 border-[#30363d]">
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle className="text-4xl text-white mb-2 flex items-center gap-3">
                                    <span>📁</span>
                                    {repo.name}
                                </CardTitle>
                                <CardDescription className="text-gray-400 text-lg">{repo.description}</CardDescription>
                            </div>
                            <div className="flex items-center gap-4">
                                <ShareButton repo={repo} />

                                <Badge
                                    onClick={handleStar}
                                    className={`cursor-pointer text-lg px-4 py-2 rounded-full flex items-center gap-2 transition-colors ${stared ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50' : 'bg-gray-500/20 text-gray-400 border-gray-500/50'}`}
                                >
                                    {stared ? '❤️' : '⭐'}
                                    {stars}
                                </Badge>
                            </div>

                        </div>
                    </CardHeader>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* README Section */}
                    <div className="lg:col-span-2">
                        <Card className="bg-[#0d1117] border-2 border-[#30363d]">
                            <CardHeader>
                                <CardTitle className="text-white flex items-center gap-2 text-2xl">
                                    <span>📄</span>
                                    README.md
                                </CardTitle>
                                <CardDescription className="text-gray-400">
                                    The sacred text that desperately needs your "improvements"
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="bg-[#161b22] border border-[#30363d] p-6 rounded-lg font-mono text-sm whitespace-pre-wrap text-gray-300 min-h-[400px]">
                                    <Readme content={readme || "# Empty README\n\nThis README is waiting for your contributions!"}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Contribution Options */}
                    <div className="space-y-6">
                        <Card className="bg-[#0d1117] border-2 border-[#30363d]">
                            <CardHeader>
                                <CardTitle className="text-white flex items-center gap-2">
                                    <span>⚔️</span>
                                    Contribution Arsenal
                                </CardTitle>
                                <CardDescription className="text-gray-400">
                                    Choose your weapon of mass contribution
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Button
                                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold text-base h-12"
                                    onClick={() => handleContribute("typo")}
                                    disabled={contributing}
                                >
                                    <span className="mr-2">📝</span>
                                    Fix Typos
                                </Button>
                                <Button
                                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold text-base h-12"
                                    onClick={() => handleContribute("emoji")}
                                    disabled={contributing}
                                >
                                    <span className="mr-2">🚀</span>
                                    Add Emoji
                                </Button>
                                <Button
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base h-12"
                                    onClick={() => handleContribute("quote")}
                                    disabled={contributing}
                                >
                                    <span className="mr-2">💬</span>
                                    Add Quote
                                </Button>
                                <Button
                                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold text-base h-12"
                                    onClick={() => handleContribute("exclamation")}
                                    disabled={contributing}
                                >
                                    <span className="mr-2">‼️</span>
                                    More Exclamation!!!
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Quality Meter */}
                        <Card className="bg-[#0d1117] border-2 border-red-500/30">
                            <CardHeader>
                                <CardTitle className="text-white flex items-center gap-2">
                                    <span>📉</span>
                                    Quality Meter
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center py-4">
                                    <p className="text-6xl font-bold text-red-500 mb-2">0/10</p>
                                    <p className="text-sm text-gray-400">
                                        Contribution quality
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">(always)</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Tips Card */}
                        <Card className="bg-[#161b22] border-2 border-[#30363d]">
                            <CardHeader>
                                <CardTitle className="text-white flex items-center gap-2 text-lg">
                                    <span>💡</span>
                                    Pro Tips
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm">
                                <p className="text-gray-400">
                                    <span className="text-orange-500 font-bold">•</span> More emojis = more professional
                                </p>
                                <p className="text-gray-400">
                                    <span className="text-orange-500 font-bold">•</span> Random quotes add wisdom
                                </p>
                                <p className="text-gray-400">
                                    <span className="text-orange-500 font-bold">•</span> Every typo is a contribution
                                </p>
                                <p className="text-gray-400">
                                    <span className="text-orange-500 font-bold">•</span> Exclamations show enthusiasm!!!
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center text-gray-500 text-sm">
                    <p>🎃 Making the world's READMEs better, one emoji at a time 🎃</p>
                </div>
            </div>
        </div>
    )
}