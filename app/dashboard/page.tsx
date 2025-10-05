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
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-blue-900 to-cyan-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white">ReadmeHub</h1>
            <p className="text-white/80">Welcome back, {user.username}!</p>
          </div>
          <div className="flex gap-4">
            <Link href={`/profile/${user.username}`}>
              <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                My Profile
              </Button>
            </Link>
            <SignOutButton />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Contributions</CardTitle>
              <CardDescription>Total README edits</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{contributionCount}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Badges Earned</CardTitle>
              <CardDescription>Achievement unlocked!</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{user.badges.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quality Meter</CardTitle>
              <CardDescription>Our honest assessment</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-red-500">0/10</p>
              <p className="text-sm text-muted-foreground mt-2">Always room for improvement! 😂</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Trending Repositories</CardTitle>
            <CardDescription>The hottest README destinations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {repos.slice(0, 5).map((repo) => (
                <Link key={repo.id} href={`/repo/${repo.name}`}>
                  <div className="p-4 border rounded-lg hover:bg-accent transition-colors cursor-pointer">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{repo.name}</h3>
                        <p className="text-sm text-muted-foreground">{repo.description}</p>
                      </div>
                      <Badge variant="secondary">⭐ {repo.stars}</Badge>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>All Repositories</CardTitle>
            <CardDescription>Find your next contribution target</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {repos.map((repo) => (
                <Link key={repo.id} href={`/repo/${repo.name}`}>
                  <div className="p-4 border rounded-lg hover:bg-accent transition-colors cursor-pointer">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{repo.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{repo.description}</p>
                      </div>
                      <Badge variant="outline">⭐ {repo.stars}</Badge>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
