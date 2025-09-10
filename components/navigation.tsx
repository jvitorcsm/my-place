"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Home, FileText, Globe, Menu, X } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"


interface NavigationProps {
  currentLang: "pt" | "en"
  onLanguageChange: (lang: "pt" | "en") => void
}

export default function Navigation({ currentLang, onLanguageChange }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const translations = {
    pt: {
      home: "Início",
      resume: "Currículo",
      language: "Idioma",
    },
    en: {
      home: "Home",
      resume: "Resume",
      language: "Language",
    },
  }

  const t = translations[currentLang]

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div
                className="w-8 h-8 rounded-sm flex items-center justify-center"
                style={{ backgroundColor: "#000000", color: "#ffffff" }}
              >
                <span className="font-bold text-sm">JV</span>
              </div>
              <span className="font-mono text-lg text-foreground">{"<DEV/>"}</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/">
                <Button variant="ghost" className="hover:bg-accent hover:text-accent-foreground">
                  <Home className="mr-2 h-4 w-4" />
                  {t.home}
                </Button>
              </Link>
              <Link href="/resume">
                <Button variant="ghost" className="hover:bg-accent hover:text-accent-foreground">
                  <FileText className="mr-2 h-4 w-4" />
                  {t.resume}
                </Button>
              </Link>

              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <button
                  className="px-2 py-1 text-xs font-semibold rounded transition-colors"
                  style={{
                    backgroundColor: currentLang === "pt" ? "#000000" : "#6b7280",
                    color: currentLang === "pt" ? "#ffffff" : "#ffffff",
                  }}
                  onClick={() => onLanguageChange("pt")}
                >
                  PT
                </button>
                <button
                  className="px-2 py-1 text-xs font-semibold rounded transition-colors"
                  style={{
                    backgroundColor: currentLang === "en" ? "#000000" : "#6b7280",
                    color: currentLang === "en" ? "#ffffff" : "#ffffff",
                  }}
                  onClick={() => onLanguageChange("en")}
                >
                  EN
                </button>
              </div>

              <ThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-border">
              <div className="flex flex-col space-y-3">
                <Link href="/" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start hover:bg-accent hover:text-accent-foreground">
                    <Home className="mr-2 h-4 w-4" />
                    {t.home}
                  </Button>
                </Link>
                <Link href="/resume" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start hover:bg-accent hover:text-accent-foreground">
                    <FileText className="mr-2 h-4 w-4" />
                    {t.resume}
                  </Button>
                </Link>

                <div className="flex items-center justify-center space-x-2 pt-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <button
                    className="px-2 py-1 text-xs font-semibold rounded transition-colors"
                    style={{
                      backgroundColor: currentLang === "pt" ? "#000000" : "#6b7280",
                      color: "#ffffff",
                    }}
                    onClick={() => onLanguageChange("pt")}
                  >
                    PT
                  </button>
                  <button
                    className="px-2 py-1 text-xs font-semibold rounded transition-colors"
                    style={{
                      backgroundColor: currentLang === "en" ? "#000000" : "#6b7280",
                      color: "#ffffff",
                    }}
                    onClick={() => onLanguageChange("en")}
                  >
                    EN
                  </button>
                  <ThemeToggle />
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Spacer for fixed navigation */}
      <div className="h-16"></div>
    </>
  )
}
