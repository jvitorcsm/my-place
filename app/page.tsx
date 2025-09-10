"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, ExternalLink, Linkedin, Code, Star, GitFork, Calendar, MessageCircle } from "lucide-react"
import Navigation from "@/components/navigation"
import ContactModal from "@/components/contact-modal"
import ScrollProgress from "@/components/scroll-progress"
import Image from "next/image"
import { motion } from "framer-motion"
import LoadingScreen from "@/components/loading-screen"

export const metadata = {
  title: "João Vitor | Portfolio",
  description: "Developer and open-source contributor",
  openGraph: {
    title: "João Vitor | Portfolio",
    description: "Developer and open-source contributor",
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
    locale: "en_US",
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

export default function Portfolio() {
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentLang, setCurrentLang] = useState<"pt" | "en">("pt")
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [isPageLoaded, setIsPageLoaded] = useState(false)

  const translations = {
    pt: {
      title: "H4CK T3H W0RLD",
      subtitle: "Desenvolvedor Full-Stack",
      description:
        "Especializado em criar experiências digitais inovadoras com tecnologias modernas. Conectado à rede DedSec, desenvolvendo soluções que fazem a diferença no mundo digital.",
      skills: "Habilidades Técnicas",
      projects: "Projetos GitHub",
      loading: "Carregando projetos...",
      error: "Erro:",
      noDescription: "Sem descrição disponível",
      footer: "Desenvolvido com ❤️ usando Next.js e Tailwind CSS",
      github: "GitHub",
      contact: "Contato",
    },
    en: {
      title: "H4CK T3H W0RLD",
      subtitle: "Full-Stack Developer",
      description:
        "Specialized in creating innovative digital experiences with modern technologies. Connected to the DedSec network, developing solutions that make a difference in the digital world.",
      skills: "Technical Skills",
      projects: "GitHub Projects",
      loading: "Loading projects...",
      error: "Error:",
      noDescription: "No description available",
      footer: "Built with ❤️ using Next.js and Tailwind CSS",
      github: "GitHub",
      contact: "Contact",
    },
  }

  const t = translations[currentLang]

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch("https://api.github.com/users/jvitorcsm/repos?sort=updated&per_page=12")
        if (!response.ok) {
          throw new Error("Erro ao carregar repositórios")
        }
        const data = await response.json()
        setRepos(data.filter((repo: GitHubRepo) => !repo.name.includes("jvitorcsm")))
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido")
      } finally {
        setLoading(false)
      }
    }

    fetchRepos()

    // Set page as loaded after initial render
    const timer = setTimeout(() => {
      setIsPageLoaded(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(currentLang === "pt" ? "pt-BR" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
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
        <div className="wallpaper-background"></div>

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
              className="min-h-screen flex items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 3 }}
            >
              <div className="text-center py-32">
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
                  className="mb-8"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 3.4 }}
                >
                  <h1 className="text-5xl md:text-7xl font-bold mb-4 text-foreground tracking-tight">Eai 👋</h1>
                  <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-foreground">
                    I am João Vitor
                  </h2>
                </motion.div>

                <motion.div
                  className="space-y-6 text-lg leading-relaxed text-muted-foreground max-w-3xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 3.6 }}
                >
                  <p>
                    {currentLang === "pt"
                      ? "Sou um desenvolvedor full-stack apaixonado por tecnologia. Minha jornada no desenvolvimento começou em 2019 com Java, e desde então tenho me dedicado ao desenvolvimento full-stack. Quando não estou codificando, você me encontrará explorando novas tecnologias, jogando Counter-Strike, assistindo filmes cyberpunk, ou ajudando outros desenvolvedores com código."
                      : "I'm a passionate full-stack developer from Brazil 🇧🇷. My coding journey started in late 2019 with Java, and since then I've grown to develop various applications, including SaaS enterprise projects, a TypeScript framework, and even my own programming language. When I'm not coding, you'll find me exploring new technologies, playing Counter-Strike, watching cyberpunk movies, or helping other developers with code."}
                  </p>

                  <p>
                    {currentLang === "pt"
                      ? "Sou dedicado ao desenvolvimento full-stack: comecei minha jornada de codificação no final de 2019 com Java, e desde então cresci para desenvolver várias aplicações, incluindo projetos SaaS empresariais, um framework TypeScript e até minha própria linguagem de programação."
                      : "I'm dedicated to full-stack development: I started my coding journey in late 2019 with Java, and since then I've grown to develop various applications, including SaaS enterprise projects, a TypeScript framework, and even my own programming language."}
                  </p>

                  <p>
                    {currentLang === "pt"
                      ? "Descubra mais sobre meu mundo online verificando minhas redes sociais e outras plataformas."
                      : "Discover more about my online world by checking out my social media and other platforms."}
                  </p>
                </motion.div>

                <motion.div
                  className="mt-12 flex flex-wrap gap-4 justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 3.8 }}
                >
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                    <a
                      href="https://github.com/jvitorcsm"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ backgroundColor: "#1a1a1a", color: "#ffffff" }}
                    >
                      <Github className="mr-2 h-5 w-5" />
                      GitHub
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a href="https://linkedin.com/in/jvitorcsm" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="mr-2 h-5 w-5" />
                      LinkedIn
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => setIsContactModalOpen(true)}>
                    <MessageCircle className="mr-2 h-5 w-5" />
                    {currentLang === "pt" ? "Contato" : "Contact"}
                  </Button>
                </motion.div>
              </div>
            </motion.section>

            <motion.section
              className="py-20 border-t border-border"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-4 text-foreground">
                  {currentLang === "pt" ? "Tecnologias que uso" : "Technologies I use"}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {[
                    "JavaScript",
                    "TypeScript",
                    "React",
                    "Next.js",
                    "Node.js",
                    "Python",
                    "PostgreSQL",
                    "MongoDB",
                    "Docker",
                    "AWS",
                    "Git",
                    "Tailwind CSS",
                  ].map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="p-3 text-center justify-center project-card bg-card hover:bg-accent hover:text-accent-foreground transition-all"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.section>

            <motion.section
              className="py-20 border-t border-border"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-4 text-foreground">
                  {currentLang === "pt" ? "Projetos em destaque" : "Featured projects"}
                </h2>
                <p className="text-muted-foreground">
                  {currentLang === "pt"
                    ? "Alguns dos meus projetos open source favoritos. Você pode encontrar mais no meu GitHub."
                    : "Some of my favorite open source projects. You can find more on my GitHub."}
                </p>
              </div>

              {loading && (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  <p className="mt-4 text-muted-foreground">
                    {currentLang === "pt" ? "Carregando projetos..." : "Loading projects..."}
                  </p>
                </div>
              )}

              {error && (
                <div className="text-center py-12">
                  <p className="text-destructive">
                    {currentLang === "pt" ? "Erro:" : "Error:"} {error}
                  </p>
                </div>
              )}

              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, staggerChildren: 0.1 }}
                viewport={{ once: true }}
              >
                {repos.slice(0, 6).map((repo, index) => (
                  <motion.div
                    key={repo.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="project-card bg-card hover:bg-card/80 transition-all duration-300 group">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
                            {repo.name}
                          </CardTitle>
                          <div className="flex gap-1">
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0" asChild>
                              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                                <Github className="h-4 w-4" />
                              </a>
                            </Button>
                            {repo.homepage && (
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0" asChild>
                                <a href={repo.homepage} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="h-4 w-4" />
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>
                        <CardDescription className="text-sm text-muted-foreground line-clamp-2">
                          {repo.description ||
                            (currentLang === "pt" ? "Sem descrição disponível" : "No description available")}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {repo.language && (
                            <Badge variant="outline" className="text-xs border-border">
                              <Code className="mr-1 h-3 w-3" />
                              {repo.language}
                            </Badge>
                          )}
                          {repo.topics.slice(0, 2).map((topic) => (
                            <Badge key={topic} variant="secondary" className="text-xs">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1">
                              <Star className="h-3 w-3" />
                              {repo.stargazers_count}
                            </span>
                            <span className="flex items-center gap-1">
                              <GitFork className="h-3 w-3" />
                              {repo.forks_count}
                            </span>
                          </div>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(repo.updated_at)}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>

              {repos.length > 6 && (
                <div className="text-center mt-12">
                  <Button variant="outline" className="nav-link bg-transparent" asChild>
                    <a href="https://github.com/jvitorcsm" target="_blank" rel="noopener noreferrer">
                      {currentLang === "pt" ? "Ver todos os projetos" : "View all projects"}
                    </a>
                  </Button>
                </div>
              )}
            </motion.section>

            <motion.footer
              className="border-t border-border py-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-muted-foreground">
                  {currentLang === "pt"
                    ? "Desenvolvido com ❤️ usando Next.js e Tailwind CSS"
                    : "Built with ❤️ using Next.js and Tailwind CSS"}
                </p>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
                    <a href="https://github.com/jvitorcsm" target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
                    <a href="https://linkedin.com/in/jvitorcsm" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
                    <a href="https://www.reddit.com/user/jvitorcsm" target="_blank" rel="noopener noreferrer">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
                      </svg>
                    </a>
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
                    <a
                      href="https://steamcommunity.com/profiles/76561199196554349"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.624 0 11.999-5.375 11.999-12S18.603.001 11.979.001zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.253 0-2.265-1.014-2.265-2.265z" />
                      </svg>
                    </a>
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
                    <a href="https://discord.com/users/1085739484118777967" target="_blank" rel="noopener noreferrer">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.7719-1.3628 1.225 1.9932a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0002 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z" />
                      </svg>
                    </a>
                  </Button>
                </div>
              </div>
            </motion.footer>
          </main>
        </div>
      </motion.div>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        currentLang={currentLang}
      />
    </>
  )
}
