import { redirect } from "next/navigation"
import Link from "next/link"
import { getCurrentUser } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SignOutButton } from "@/components/sign-out-button"

export default async function Dashboard() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/auth/signin")
  }

  const repos = await prisma.repository.findMany({
    orderBy: { stars: "desc" },
  })

  const contributionCount = user.contributions.length

  return (
    <div className="min-h-screen bg-[#0d1117] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute top-40 right-20 w-80 h-80 rounded-full bg-[#183D5D]/20 blur-3xl" />
        <div className="absolute bottom-20 left-1/4 w-72 h-72 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute bottom-40 right-1/3 w-56 h-56 rounded-full bg-orange-600/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-5xl font-bold text-white">ReadmeHub</h1>
              <span className="text-3xl">🎃</span>
            </div>
            <p className="text-gray-400 text-lg">
              Welcome back, <span className="text-orange-500 font-semibold">{user.username}</span>!
              Ready to make some <span className="italic">impactful</span> contributions?
            </p>
          </div>
          <div className="flex gap-3">
            <Link href={`/profile/${user.username}`}>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold">
                <span className="mr-2">👤</span>
                My Profile
              </Button>
            </Link>
            <SignOutButton />
          </div>
        </div>

        {/* Hacktoberfest Banner */}
        <div className="mb-8 bg-gradient-to-r from-[#183D5D] via-purple-900 to-[#183D5D] border-2 border-orange-500 rounded-xl p-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-4xl">🎃</span>
            <h2 className="text-3xl font-bold text-orange-500">HACKTOBERFEST 2025</h2>
            <span className="text-4xl">🎃</span>
          </div>
          <p className="text-white/90 text-lg">
            Every README edit counts towards absolutely nothing! Keep going! 🏆
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-[#0d1117] border-2 border-orange-500/30 hover:border-orange-500 transition-all">
            <CardHeader>
              <CardTitle className="text-gray-300 text-sm uppercase tracking-wider flex items-center gap-2">
                <span>📝</span>
                README Edits
              </CardTitle>
              <CardDescription className="text-gray-500">Your valuable contributions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-5xl font-bold text-orange-500">{contributionCount}</p>
              <p className="text-xs text-gray-500 mt-2">Each one is special! ✨</p>
            </CardContent>
          </Card>

          <Card className="bg-[#0d1117] border-2 border-purple-500/30 hover:border-purple-500 transition-all">
            <CardHeader>
              <CardTitle className="text-gray-300 text-sm uppercase tracking-wider flex items-center gap-2">
                <span>🏅</span>
                Badges Earned
              </CardTitle>
              <CardDescription className="text-gray-500">Achievement unlocked!</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-5xl font-bold text-purple-400">{user.badges.length}</p>
              <p className="text-xs text-gray-500 mt-2">Collector's edition 🎖️</p>
            </CardContent>
          </Card>

          <Card className="bg-[#0d1117] border-2 border-red-500/30 hover:border-red-500 transition-all">
            <CardHeader>
              <CardTitle className="text-gray-300 text-sm uppercase tracking-wider flex items-center gap-2">
                <span>📉</span>
                Quality Meter
              </CardTitle>
              <CardDescription className="text-gray-500">Our honest assessment</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-5xl font-bold text-red-500">0/10</p>
              <p className="text-xs text-gray-500 mt-2">At least you tried! 😂</p>
            </CardContent>
          </Card>
        </div>

        {/* Trending Repositories */}
        <Card className="mb-8 bg-[#0d1117] border-2 border-[#30363d]">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2 text-2xl">
              <span>🔥</span>
              Trending Repositories
            </CardTitle>
            <CardDescription className="text-gray-400">
              The hottest README destinations right now
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {repos.slice(0, 5).map((repo) => (
                <Link key={repo.id} href={`/repo/${repo.name}`}>
                  <div className="p-5 border-2 border-[#30363d] rounded-lg hover:border-orange-500/50 hover:bg-[#161b22] transition-all cursor-pointer group">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-white group-hover:text-orange-500 transition-colors flex items-center gap-2">
                          <span>📁</span>
                          {repo.name}
                        </h3>
                        <p className="text-sm text-gray-400 mt-1">{repo.description}</p>
                      </div>
                      <Badge className="bg-orange-500/20 text-orange-500 border border-orange-500/50 ml-4">
                        ⭐ {repo.stars}
                      </Badge>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* All Repositories */}
        <Card className="bg-[#0d1117] border-2 border-[#30363d]">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2 text-2xl">
              <span>📚</span>
              All Repositories
            </CardTitle>
            <CardDescription className="text-gray-400">
              Find your next contribution target and make your mark!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {repos.map((repo) => (
                <Link key={repo.id} href={`/repo/${repo.name}`}>
                  <div className="p-5 border-2 border-[#30363d] rounded-lg hover:border-purple-500/50 hover:bg-[#161b22] transition-all cursor-pointer group h-full">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-white group-hover:text-purple-400 transition-colors flex items-center gap-2 mb-2">
                          <span>📦</span>
                          {repo.name}
                        </h3>
                        <p className="text-sm text-gray-400 line-clamp-2">{repo.description}</p>
                      </div>
                      <Badge className="bg-purple-500/20 text-purple-400 border border-purple-500/50 ml-3">
                        ⭐ {repo.stars}
                      </Badge>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Motivational Footer */}
        <div className="mt-8 text-center">
          <div className="inline-block bg-[#161b22] border-2 border-[#30363d] rounded-lg px-8 py-4">
            <p className="text-gray-400 text-sm mb-2">
              💡 <span className="font-semibold text-white">Pro Tip:</span> The more READMEs you edit, the more you look like you're doing something!
            </p>
            <p className="text-gray-500 text-xs">
              🎃 ReadmeHub • Where Every Contribution Matters (Sort Of) 🎃
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}