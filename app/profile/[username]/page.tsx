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
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-blue-900 to-cyan-800">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4">
          <Link href="/dashboard">
            <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
              ← Back to Dashboard
            </Button>
          </Link>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="text-2xl">{username[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-3xl">{username}</CardTitle>
                <CardDescription>README Contributor Extraordinaire</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Share Your Profile</CardTitle>
            <CardDescription>Share your ReadmeHub profile with the world!</CardDescription>
          </CardHeader>
          <CardContent>
            <ShareButton />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Total Contributions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{user.contributions.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Badges Earned</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{user.badges.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quality Meter</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-red-500">0/10</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Contribution Graph</CardTitle>
            <CardDescription>Your README editing activity (with random colors for extra flair!)</CardDescription>
          </CardHeader>
          <CardContent>
            <ContributionGraph contributions={user.contributions} />
          </CardContent>
        </Card>

        {user.badges.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
              <CardDescription>Your collection of prestigious badges</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {user.badges.map((userBadge) => (
                  <div key={userBadge.id} className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{userBadge.badge.icon}</span>
                      <div>
                        <h3 className="font-semibold">{userBadge.badge.name}</h3>
                        <p className="text-sm text-muted-foreground">{userBadge.badge.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Contribution Breakdown</CardTitle>
            <CardDescription>Your impactful contributions by type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(typeCounts).map(([type, count]) => (
                <div key={type} className="flex justify-between items-center">
                  <span className="capitalize">{type}s</span>
                  <Badge variant="secondary">{count}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Contributions</CardTitle>
            <CardDescription>Your latest README masterpieces</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {user.contributions.slice(0, 10).map((contrib) => (
                <div key={contrib.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <Link href={`/repo/${contrib.repository.name}`} className="font-semibold hover:underline">
                        {contrib.repository.name}
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        {contrib.type} - {new Date(contrib.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant="outline" className="capitalize">{contrib.type}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
