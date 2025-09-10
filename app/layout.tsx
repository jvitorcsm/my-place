import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"


export const metadata = {
  title: "João Vitor | Portfolio",
  description: "FullStack Developer and open-source contributor",
  openGraph: {
    title: "João Vitor | Portfolio",
    description: "FullStack Developer and open-source contributor",
    url: "https://johnv.place",
    siteName: "johnv.place",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "João Vitor Portfolio",
      },
    ],
    locale: "en_US, pt_BR",
    type: "website",
  },
};

interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
  topics: string[]
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased animated-wallpaper`}>
        <Suspense
          fallback={
            <div className="min-h-screen bg-background flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-bold text-primary mb-4">JV</div>
                <div className="text-lg text-muted-foreground">Loading Portfolio...</div>
              </div>
            </div>
          }
        >
          {children}
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
