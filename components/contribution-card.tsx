"use client"

import { useRef } from "react"
import { toPng } from "html-to-image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ContributionCardProps {
  username: string
  contributionType: string
  repoName: string
  date: string
}

export function ContributionCard({ username, contributionType, repoName, date }: ContributionCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleExport = async () => {
    if (cardRef.current === null) return

    try {
      const dataUrl = await toPng(cardRef.current, { cacheBust: true })
      const link = document.createElement("a")
      link.download = `readmehub-contribution-${Date.now()}.png`
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error("Error exporting contribution card:", err)
    }
  }

  return (
    <div className="space-y-4">
      <div ref={cardRef} className="bg-gradient-to-br from-indigo-950 via-blue-900 to-cyan-800 p-8 rounded-lg">
        <div className="bg-white rounded-lg p-6">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">ReadmeHub</h2>
            <div className="py-6">
              <p className="text-xl font-semibold text-purple-600">🎉 New Contribution!</p>
              <p className="text-lg mt-2">
                <span className="font-bold">{username}</span> just made a <span className="font-semibold text-pink-600">{contributionType}</span> contribution
              </p>
              <p className="text-md text-gray-600 mt-1">to {repoName}</p>
            </div>
            <div className="border-t pt-4">
              <p className="text-sm text-gray-500">{date}</p>
              <p className="text-xs text-gray-400 mt-2">Quality: 0/10 (as always)</p>
            </div>
          </div>
        </div>
      </div>
      <Button onClick={handleExport} className="w-full">
        📸 Export for Social Media
      </Button>
    </div>
  )
}
