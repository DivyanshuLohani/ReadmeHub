import { notFound } from "next/navigation"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ContributionGraph } from "@/components/contribution-graph"
import { Metadata, ResolvingMetadata } from 'next'
import { ShareButton } from "@/components/share-button"

type Props = {
  params: { username: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const username = params.username

  return {
    title: `${username}'s Profile | ReadmeHub`,
    description: `Check out ${username}'s contributions on ReadmeHub.`,
    openGraph: {
      images: [`/api/profile/${username}/og`],
    },
  }
}


export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params

  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      contributions: {
        include: {
          repository: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      badges: {
        include: {
          badge: true,
        },
      },
    },
  })

  if (!user) {
    notFound()
  }

  const typeCounts: { [key: string]: number } = {}
  user.contributions.forEach((contrib) => {
    typeCounts[contrib.type] = (typeCounts[contrib.type] || 0) + 1
  })

  return (
    <div className="min-h-screen bg-[#0d1117] relative overflow-hidden">
      {/* Decorative Halloween/Hacktoberfest circles */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-orange-500/10 blur-3xl" />
      <div className="absolute top-40 right-20 w-40 h-40 rounded-full bg-[#183D5D]/20 blur-3xl" />
      <div className="absolute bottom-20 left-1/4 w-36 h-36 rounded-full bg-purple-500/10 blur-3xl" />
      <div className="absolute bottom-40 right-1/3 w-28 h-28 rounded-full bg-orange-600/10 blur-3xl" />

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="mb-6 flex justify-between items-center">
          <Link href="/dashboard">
            <Button variant="outline" className="bg-[#21262d] text-white border-[#30363d] hover:bg-[#30363d]">
              ← Back to Dashboard
            </Button>
          </Link>

          <div className="flex items-center gap-2 px-4 py-2 bg-[#183D5D] border-2 border-orange-500 rounded-full">
            <span className="text-2xl">🎃</span>
            <span className="text-orange-500 font-bold text-sm tracking-wider">HACKTOBERFEST 2025</span>
          </div>
        </div>

        <Card className="mb-8 bg-[#0d1117] border-2 border-[#30363d]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24 border-4 border-orange-500 bg-[#183D5D]">
                  <AvatarFallback className="text-3xl text-orange-500 font-bold bg-[#183D5D]">
                    {username[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-4xl text-white mb-2">{username}</CardTitle>
                  <CardDescription className="text-orange-500 text-lg font-semibold flex items-center gap-2">
                    📝 Professional README Editor
                  </CardDescription>
                  <div className="flex gap-2 mt-3">
                    <Badge className="bg-orange-500/20 text-orange-500 border border-orange-500/50">
                      Elite Typo Fixer
                    </Badge>
                    <Badge className="bg-purple-500/20 text-purple-400 border border-purple-500/50">
                      Whitespace Warrior
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card className="mb-8 bg-[#0d1117] border-2 border-[#30363d]">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <span>🔗</span> Share Your Glory
            </CardTitle>
            <CardDescription className="text-gray-400">
              Show the world your README editing prowess!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ShareButton />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-[#0d1117] border-2 border-orange-500/30 hover:border-orange-500 transition-all">
            <CardHeader>
              <CardTitle className="text-gray-300 text-sm uppercase tracking-wider">README Edits</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-5xl font-bold text-orange-500">{user.contributions.length}</p>
              <p className="text-xs text-gray-500 mt-2">Each one matters! 🏆</p>
            </CardContent>
          </Card>

          <Card className="bg-[#0d1117] border-2 border-purple-500/30 hover:border-purple-500 transition-all">
            <CardHeader>
              <CardTitle className="text-gray-300 text-sm uppercase tracking-wider">Badges Earned</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-5xl font-bold text-purple-400">{user.badges.length}</p>
              <p className="text-xs text-gray-500 mt-2">Totally official 🎖️</p>
            </CardContent>
          </Card>

          <Card className="bg-[#0d1117] border-2 border-red-500/30 hover:border-red-500 transition-all">
            <CardHeader>
              <CardTitle className="text-gray-300 text-sm uppercase tracking-wider">Code Quality</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-5xl font-bold text-red-500">0/10</p>
              <p className="text-xs text-gray-500 mt-2">Who needs code? 😎</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8 bg-[#0d1117] border-2 border-[#30363d]">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <span>📊</span> Contribution Heatmap
            </CardTitle>
            <CardDescription className="text-gray-400">
              Your README editing activity over time (with random colors for extra authenticity!)
            </CardDescription>
          </CardHeader>
          <CardContent className="bg-[#0d1117] rounded-lg p-4 border border-[#21262d]">
            <ContributionGraph contributions={user.contributions} />
          </CardContent>
        </Card>

        {user.badges.length > 0 && (
          <Card className="mb-8 bg-[#0d1117] border-2 border-[#30363d]">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <span>🏅</span> Hall of Fame
              </CardTitle>
              <CardDescription className="text-gray-400">
                Your prestigious collection of highly coveted badges
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {user.badges.map((userBadge) => (
                  <div key={userBadge.id} className="p-4 border-2 border-[#30363d] rounded-lg bg-[#161b22] hover:border-orange-500/50 transition-all">
                    <div className="flex items-center gap-3">
                      <span className="text-5xl">{userBadge.badge.icon}</span>
                      <div>
                        <h3 className="font-semibold text-white">{userBadge.badge.name}</h3>
                        <p className="text-sm text-gray-400">{userBadge.badge.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="mb-8 bg-[#0d1117] border-2 border-[#30363d]">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <span>📈</span> Contribution Breakdown
            </CardTitle>
            <CardDescription className="text-gray-400">
              Your impactful contributions categorized by groundbreaking type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(typeCounts).map(([type, count]) => (
                <div key={type} className="flex justify-between items-center p-3 rounded-lg bg-[#161b22] border border-[#30363d] hover:border-orange-500/30 transition-all">
                  <span className="capitalize text-gray-300 font-medium">{type}s</span>
                  <Badge className="bg-orange-500/20 text-orange-500 border border-orange-500/50 text-lg px-4 py-1">
                    {count}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0d1117] border-2 border-[#30363d]">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <span>⭐</span> Recent Masterpieces
            </CardTitle>
            <CardDescription className="text-gray-400">
              Your latest README contributions that changed the world
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {user.contributions.slice(0, 10).map((contrib) => (
                <div key={contrib.id} className="p-4 border-2 border-[#30363d] rounded-lg bg-[#161b22] hover:border-orange-500/50 transition-all">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <Link href={`/repo/${contrib.repository.name}`} className="font-semibold text-white hover:text-orange-500 transition-colors">
                        {contrib.repository.name}
                      </Link>
                      <p className="text-sm text-gray-400 mt-1">
                        {contrib.type} • {new Date(contrib.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge className="capitalize bg-[#183D5D] text-orange-500 border border-orange-500/50">
                      {contrib.type}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>🎃 Powered by ReadmeHub • Where Every Typo Fix Counts • Hacktoberfest Approved* 🎃</p>
          <p className="text-xs mt-1">*Not actually approved by anyone</p>
        </div>
      </div>
    </div>
  )
}