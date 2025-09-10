"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface ContributionDay {
  date: string
  count: number
  level: number
}

export default function GitHubContributions({ currentLang }: { currentLang: "pt" | "en" }) {
  const [contributions, setContributions] = useState<ContributionDay[]>([])

  useEffect(() => {
    // Generate mock contribution data for the last 365 days
    const generateContributions = () => {
      const data: ContributionDay[] = []
      const today = new Date()

      for (let i = 364; i >= 0; i--) {
        const date = new Date(today)
        date.setDate(date.getDate() - i)

        // Generate random contribution count with some patterns
        const dayOfWeek = date.getDay()
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
        const baseChance = isWeekend ? 0.3 : 0.7

        let count = 0
        if (Math.random() < baseChance) {
          count = Math.floor(Math.random() * 15) + 1
        }

        const level = count === 0 ? 0 : count <= 3 ? 1 : count <= 6 ? 2 : count <= 9 ? 3 : 4

        data.push({
          date: date.toISOString().split("T")[0],
          count,
          level,
        })
      }

      return data
    }

    setContributions(generateContributions())
  }, [])

  const getLevelColor = (level: number) => {
    switch (level) {
      case 0:
        return "bg-muted"
      case 1:
        return "bg-green-200 dark:bg-green-900"
      case 2:
        return "bg-green-300 dark:bg-green-700"
      case 3:
        return "bg-green-400 dark:bg-green-500"
      case 4:
        return "bg-green-500 dark:bg-green-400"
      default:
        return "bg-muted"
    }
  }

  const getWeeks = () => {
    const weeks: ContributionDay[][] = []
    let currentWeek: ContributionDay[] = []

    contributions.forEach((day, index) => {
      const date = new Date(day.date)
      const dayOfWeek = date.getDay()

      if (index === 0) {
        // Fill empty days at the beginning of the first week
        for (let i = 0; i < dayOfWeek; i++) {
          currentWeek.push({ date: "", count: 0, level: 0 })
        }
      }

      currentWeek.push(day)

      if (dayOfWeek === 6 || index === contributions.length - 1) {
        weeks.push([...currentWeek])
        currentWeek = []
      }
    })

    return weeks
  }

  const totalContributions = contributions.reduce((sum, day) => sum + day.count, 0)

  return (
    <section className="py-20 border-t border-border">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4 text-foreground">
          {currentLang === "pt" ? "Atividade de Código" : "Code Activity"}
        </h2>
        <p className="text-muted-foreground mb-6">
          {currentLang === "pt"
            ? `${totalContributions} contribuições no último ano`
            : `${totalContributions} contributions in the last year`}
        </p>
      </div>

      <div className="overflow-x-auto">
        <div className="inline-flex flex-col gap-1 min-w-max">
          <div className="flex gap-1">
            {getWeeks().map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {week.map((day, dayIndex) => (
                  <motion.div
                    key={`${weekIndex}-${dayIndex}`}
                    className={`w-3 h-3 rounded-sm ${getLevelColor(day.level)} ${
                      day.date ? "cursor-pointer hover:ring-2 hover:ring-primary/50" : ""
                    }`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      delay: (weekIndex * 7 + dayIndex) * 0.01,
                      duration: 0.2,
                    }}
                    whileHover={day.date ? { scale: 1.2 } : {}}
                    title={day.date ? `${day.count} contributions on ${day.date}` : ""}
                  />
                ))}
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-4 text-xs text-muted-foreground">
            <span>{currentLang === "pt" ? "Menos" : "Less"}</span>
            <div className="flex gap-1 items-center">
              {[0, 1, 2, 3, 4].map((level) => (
                <div key={level} className={`w-3 h-3 rounded-sm ${getLevelColor(level)}`} />
              ))}
            </div>
            <span>{currentLang === "pt" ? "Mais" : "More"}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
