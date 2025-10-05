"use client"

import { useMemo } from "react"

interface ContributionGraphProps {
  contributions: Array<{ createdAt: Date }>
}

export function ContributionGraph({ contributions }: ContributionGraphProps) {
  const graphData = useMemo(() => {
    const days = 365
    const today = new Date()
    const startDate = new Date(today)
    startDate.setDate(startDate.getDate() - days)

    const contributionMap = new Map<string, number>()
    contributions.forEach((contrib) => {
      const date = new Date(contrib.createdAt).toISOString().split("T")[0]
      contributionMap.set(date, (contributionMap.get(date) || 0) + 1)
    })

    const weeks: Array<Array<{ date: string; count: number; color: string }>> = []
    let currentWeek: Array<{ date: string; count: number; color: string }> = []

    for (let i = 0; i < days; i++) {
      const date = new Date(startDate)
      date.setDate(date.getDate() + i)
      const dateStr = date.toISOString().split("T")[0]
      const count = contributionMap.get(dateStr) || 0
      
      const colors = ["bg-gray-200", "bg-green-200", "bg-green-400", "bg-green-600", "bg-green-800", "bg-purple-500", "bg-pink-500", "bg-orange-500", "bg-blue-500", "bg-red-500"]
      const randomColor = count > 0 ? colors[Math.floor(Math.random() * colors.length)] : "bg-gray-200"

      currentWeek.push({ date: dateStr, count, color: randomColor })

      if (date.getDay() === 6 || i === days - 1) {
        weeks.push(currentWeek)
        currentWeek = []
      }
    }

    return weeks
  }, [contributions])

  return (
    <div className="overflow-x-auto">
      <div className="inline-flex gap-1">
        {graphData.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1">
            {week.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className={`w-3 h-3 rounded-sm ${day.color}`}
                title={`${day.date}: ${day.count} contributions`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
