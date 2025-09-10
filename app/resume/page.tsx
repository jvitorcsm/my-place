"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Mail, Phone, MapPin, Calendar, Briefcase, GraduationCap, Award } from "lucide-react"
import Navigation from "@/components/navigation"
import ScrollProgress from "@/components/scroll-progress"
import { motion } from "framer-motion"
import LoadingScreen from "@/components/loading-screen"
import Image from "next/image"

export default function Resume() {
  const [currentLang, setCurrentLang] = useState<"pt" | "en">("pt")
  const [isPageLoaded, setIsPageLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoaded(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const translations = {
    pt: {
      title: "CURRÍCULO DIGITAL",
      subtitle: "Perfil Profissional",
      download: "Download PDF",
      contact: "Contato",
      experience: "Experiência Profissional",
      education: "Formação Acadêmica",
      skills: "Competências Técnicas",
      certifications: "Certificações",
      languages: "Idiomas",
      projects: "Projetos Destacados",
      // Placeholder content - user will fill this
      profile:
        "Desenvolvedor Full-Stack apaixonado por tecnologia e inovação. Experiência em desenvolvimento web moderno com foco em performance e experiência do usuário.",
      phone: "+55 (48) 99605-3100",
      email: "joaovitorcarvalhosavimondo@gmail.com",
      location: "São Paulo, SP - Brasil",
      // Experience entries
      exp1Title: "Desenvolvedor Full-Stack Sênior",
      exp1Company: "Empresa Tech Ltda",
      exp1Period: "2022 - Presente",
      exp1Description:
        "Desenvolvimento de aplicações web escaláveis usando React, Next.js e Node.js. Liderança técnica de equipe e implementação de melhores práticas.",
      // Education
      edu1Title: "Bacharelado em Ciência da Computação",
      edu1Institution: "Universidade de São Paulo",
      edu1Period: "2018 - 2022",
      // Skills categories
      frontend: "Frontend",
      backend: "Backend",
      database: "Banco de Dados",
      tools: "Ferramentas",
    },
    en: {
      title: "DIGITAL RESUME",
      subtitle: "Professional Profile",
      download: "Download PDF",
      contact: "Contact",
      experience: "Professional Experience",
      education: "Education",
      skills: "Technical Skills",
      certifications: "Certifications",
      languages: "Languages",
      projects: "Featured Projects",
      // Placeholder content - user will fill this
      profile:
        "Full-Stack Developer passionate about technology and innovation. Experience in modern web development with focus on performance and user experience.",
      phone: "+55 (48) 99605-3100",
      email: "joaovitorcarvalhosavimondo@gmail.com",
      location: "São Paulo, SP - Brazil",
      // Experience entries
      exp1Title: "Senior Full-Stack Developer",
      exp1Company: "Tech Company Ltd",
      exp1Period: "2022 - Present",
      exp1Description:
        "Development of scalable web applications using React, Next.js and Node.js. Technical team leadership and implementation of best practices.",
      // Education
      edu1Title: "Bachelor in Computer Science",
      edu1Institution: "University of São Paulo",
      edu1Period: "2018 - 2022",
      // Skills categories
      frontend: "Frontend",
      backend: "Backend",
      database: "Database",
      tools: "Tools",
    },
  }

  const t = translations[currentLang]

  const generatePDF = () => {
    // Create a simple PDF content
    const pdfContent = `
JOÃO VITOR CARVALHO SAVIMONDO
Full-Stack Developer

CONTACT:
Email: joaovitorcarvalhosavimondo@gmail.com
WhatsApp: +55 (48) 99605-3100

PROFESSIONAL PROFILE:
${
  currentLang === "pt"
    ? "Desenvolvedor Full-Stack apaixonado por tecnologia e inovação. Experiência em desenvolvimento web moderno com foco em performance e experiência do usuário."
    : "Full-Stack Developer passionate about technology and innovation. Experience in modern web development with focus on performance and user experience."
}

TECHNICAL SKILLS:
• Frontend: React, Next.js, TypeScript, Tailwind CSS
• Backend: Node.js, Python, Express, FastAPI  
• Database: PostgreSQL, MongoDB, Redis, Supabase
• Tools: Docker, AWS, Git, Vercel

LANGUAGES:
• Portuguese - Native
• English - Advanced
• Spanish - Intermediate

For more information, visit: https://github.com/jvitorcsm
    `

    // Create and download the PDF
    const element = document.createElement("a")
    const file = new Blob([pdfContent], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = "Joao_Vitor_Curriculo.pdf"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <motion.div
        className="min-h-screen bg-background relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: isPageLoaded ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 2.5 }}
      >
        <div className="floating-particles">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 20}s`,
                animationDuration: `${15 + Math.random() * 10}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10">
          <Navigation currentLang={currentLang} onLanguageChange={setCurrentLang} />

          <main className="max-w-4xl mx-auto px-6">
            <motion.section
              className="py-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 3 }}
            >
              <div className="text-center mb-12">
                <motion.div
                  className="mb-8 flex justify-center"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 3.2 }}
                >
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-border shadow-lg">
                      <Image
                        src="/images/profile.jpg"
                        alt="João Vitor"
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 3.4 }}
                >
                  <h1 className="text-5xl md:text-7xl font-bold mb-4 text-foreground tracking-tight">{t.title}</h1>
                  <p className="text-xl text-muted-foreground font-mono">
                    {"<"} {t.subtitle} {">"}
                  </p>
                </motion.div>
              </div>
            </motion.section>

            <motion.div
              className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* Left Column - Contact & Info */}
              <div className="space-y-6">
                {/* Contact Card */}
                <Card className="bg-card hover:bg-card/80 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-foreground">{t.contact}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">joaovitorcarvalhosavimondo@gmail.com</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">+55 (48) 99605-3100</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">{t.location}</span>
                    </div>
                    <Button
                      className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground"
                      onClick={generatePDF}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      {t.download}
                    </Button>
                  </CardContent>
                </Card>

                {/* Skills Card */}
                <Card className="bg-card hover:bg-card/80 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-foreground">{t.skills}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-2">{t.frontend}</h4>
                      <div className="flex flex-wrap gap-1">
                        {["React", "Next.js", "TypeScript", "Tailwind"].map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-2">{t.backend}</h4>
                      <div className="flex flex-wrap gap-1">
                        {["Node.js", "Python", "Express", "FastAPI"].map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-2">{t.database}</h4>
                      <div className="flex flex-wrap gap-1">
                        {["PostgreSQL", "MongoDB", "Redis", "Supabase"].map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-2">{t.tools}</h4>
                      <div className="flex flex-wrap gap-1">
                        {["Docker", "AWS", "Git", "Vercel"].map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Languages Card */}
                <Card className="bg-card hover:bg-card/80 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-foreground">{t.languages}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-foreground">Português</span>
                      <Badge variant="outline">Nativo</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-foreground">English</span>
                      <Badge variant="outline">Avançado</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-foreground">Español</span>
                      <Badge variant="outline">Intermediário</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Experience & Education */}
              <div className="lg:col-span-2 space-y-6">
                {/* Profile */}
                <Card className="bg-card hover:bg-card/80 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-foreground">João Vitor</CardTitle>
                    <CardDescription className="text-muted-foreground font-mono">Full-Stack Developer</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{t.profile}</p>
                  </CardContent>
                </Card>

                {/* Experience */}
                <Card className="bg-card hover:bg-card/80 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-foreground flex items-center">
                      <Briefcase className="mr-2 h-5 w-5" />
                      {t.experience}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="border-l-2 border-border pl-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-foreground">{t.exp1Title}</h3>
                      </div>
                      <p className="text-muted-foreground text-sm mb-1">{t.exp1Company}</p>
                      <div className="flex items-center space-x-2 mb-3">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{t.exp1Period}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{t.exp1Description}</p>
                    </div>

                    <div className="text-center py-4">
                      <p className="text-muted-foreground text-sm italic">
                        [Adicione mais experiências profissionais aqui]
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Education */}
                <Card className="bg-card hover:bg-card/80 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-foreground flex items-center">
                      <GraduationCap className="mr-2 h-5 w-5" />
                      {t.education}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="border-l-2 border-border pl-4">
                      <h3 className="font-semibold text-foreground mb-1">{t.edu1Title}</h3>
                      <p className="text-muted-foreground text-sm mb-1">{t.edu1Institution}</p>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{t.edu1Period}</span>
                      </div>
                    </div>

                    <div className="text-center py-4">
                      <p className="text-muted-foreground text-sm italic">[Adicione mais formações acadêmicas aqui]</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Certifications */}
                <Card className="bg-card hover:bg-card/80 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-foreground flex items-center">
                      <Award className="mr-2 h-5 w-5" />
                      {t.certifications}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <p className="text-muted-foreground text-sm italic">[Adicione suas certificações aqui]</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </main>
        </div>
      </motion.div>
    </>
  )
}
