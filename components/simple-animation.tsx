"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function SimpleAnimation() {
  const [animatedSquares, setAnimatedSquares] = useState<number[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      const randomSquares = Array.from({ length: 8 }, () => Math.floor(Math.random() * 168))
      setAnimatedSquares(randomSquares)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex justify-center mb-8">
      <div className="grid grid-cols-12 gap-1 p-4 rounded-lg bg-card/50 backdrop-blur-sm">
        {Array.from({ length: 168 }).map((_, index) => (
          <motion.div
            key={index}
            className={`w-2 h-2 rounded-sm ${animatedSquares.includes(index) ? "bg-primary" : "bg-muted"}`}
            animate={{
              scale: animatedSquares.includes(index) ? 1.2 : 1,
              opacity: animatedSquares.includes(index) ? 1 : 0.3,
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </div>
  )
}
