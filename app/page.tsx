"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Github,
  ExternalLink,
  Linkedin,
  Code,
  Star,
  GitFork,
  Calendar,
  MessageCircle
} from "lucide-react";
import Navigation from "@/components/navigation";
import ContactModal from "@/components/contact-modal";
import ScrollProgress from "@/components/scroll-progress";
import Image from "next/image";
import { motion } from "framer-motion";
import LoadingScreen from "@/components/loading-screen";

/** Types **/
type GitHubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics?: string[];
  homepage?: string | null;
  created_at: string;
  updated_at: string;
};

/** Translations */
const translations = {
  pt: {
    titleHello: "E aí, eu sou o João — ou John, como preferir! 👋",
    titleMe: "Desenvolvedor Full-Stack",
    aboutP1:
      "Sou um entusiasta brasileiro da programação, atualmente focado em desenvolvimento Full-Stack. Meu objetivo é me tornar Arquiteto de Software — degrau por degrau, com disciplina e dedicação.",
    aboutP2:
      "Minha jornada começou no ensino médio, quando um professor de física me mostrou 'o que tem por trás dos sites'. Desde então venho construindo projetos e contribuindo em outros, sempre buscando aprender e evoluir.",
    aboutP3:
      "Sou apaixonado por open source: contribuo para aprender em ambientes reais, ampliar meu networking e me desafiar constantemente (destaque para contribuições no Orval).",
    aboutP4:
      "Quando não estou programando, você vai me encontrar jogando Counter-Strike, correndo, na academia ou curtindo as praias e trilhas de Florianópolis. Um bom livro, café, música eletrônica e uma tela cheia de código me fazem feliz!",
    discoverMore: "Veja mais sobre meu trabalho e rotina nos links abaixo.",
    techTitle: "Tecnologias que uso",
    featuredTitle: "Projetos em destaque",
    featuredDesc:
      "Alguns projetos e contribuições públicas. Você encontra mais no meu GitHub.",
    loading: "Carregando projetos...",
    error: "Erro:",
    noDescription: "Sem descrição disponível",
    footer: "desenvolvido por @jvitorcsm",
    contact: "Contato",
    viewAll: "Ver todos os projetos",
    nowTitle: "Agora",
    nowBullets: [
      "Estudando arquitetura e padrões (SOLID, Clean, DDD pragmático).",
      "Praticando testes e CI/CD em projetos pessoais.",
      "Contribuindo em open source (documentação, DX e bugfixes)."
    ],
    goalsTitle: "Objetivos",
    goalsBullets: [
      "Tornar-me referência técnica e Arquiteto de Software.",
      "Construir um portfólio sólido com projetos bem documentados.",
      "Aprimorar soft skills e networking no mercado de tecnologia."
    ],
  },
  en: {
    titleHello: "Hey — I'm João (or John, if you prefer)! 👋",
    titleMe: "Full-Stack Developer",
    aboutP1:
      "I'm a Brazilian programming enthusiast currently focused on Full-Stack development. My goal is to become a Software Architect — one step at a time, with discipline and dedication.",
    aboutP2:
      "It all started back in high school when a physics teacher showed me 'what happens behind websites'. Since then, I’ve been building projects and contributing to others, always aiming to learn and grow.",
    aboutP3:
      "I'm passionate about open source: I contribute to learn in real environments, expand my network, and constantly challenge myself (notably with the Orval project).",
    aboutP4:
      "When I’m not coding, you’ll probably find me playing Counter-Strike, running, at the gym, or enjoying Florianópolis’ beaches and trails. A good book, coffee, electronic music, and a screen full of code make me happy!",
    discoverMore:
      "Discover more about my work and routine through the links below.",
    techTitle: "Technologies I use",
    featuredTitle: "Featured projects",
    featuredDesc:
      "Some of my public projects and contributions. Check more on my GitHub.",
    loading: "Loading projects...",
    error: "Error:",
    noDescription: "No description available",
    footer: "developed by @jvitorcsm",
    contact: "Contact",
    viewAll: "View all projects",
    nowTitle: "Now",
    nowBullets: [
      "Studying architecture and design patterns (SOLID, Clean, pragmatic DDD).",
      "Practicing testing and CI/CD in personal projects.",
      "Contributing to open source (docs, DX and bugfixes)."
    ],
    goalsTitle: "Goals",
    goalsBullets: [
      "Become a strong technical reference and Software Architect.",
      "Build a solid portfolio with well-documented projects.",
      "Improve soft skills and expand networking in the tech community."
    ],
  }
} as const;

export default function Portfolio() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentLang, setCurrentLang] = useState<"pt" | "en">("pt");
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

useEffect(() => {
  const fetchPinned = async () => {
    try {
      const res = await fetch("/api/github/pinned");
      if (!res.ok) throw new Error("Erro ao carregar repositórios fixados");
      const data = await res.json();
      setRepos(data.repos);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  fetchPinned();

  const timer = setTimeout(() => setIsPageLoaded(true), 100);
  return () => clearTimeout(timer);
}, []);


  const t = translations[currentLang];

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString(
      currentLang === "pt" ? "pt-BR" : "en-US",
      { year: "numeric", month: "short", day: "numeric" }
    );

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
        <div className="wallpaper-background" />

        <div className="floating-particles">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 20}s`,
                animationDuration: `${15 + Math.random() * 10}s`
              }}
            />
          ))}
        </div>

        <div className="relative z-10">
          <Navigation
            currentLang={currentLang}
            onLanguageChange={setCurrentLang}
          />

          <main className="max-w-4xl mx-auto px-6">
            {/* Hero */}
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
                  <h1 className="text-5xl md:text-7xl font-bold mb-4 text-foreground tracking-tight">
                    {t.titleHello}
                  </h1>
                  <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-foreground">
                    {t.titleMe}
                  </h2>
                </motion.div>

                <motion.div
                  className="space-y-6 text-lg leading-relaxed text-muted-foreground max-w-3xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 3.6 }}
                >
                  <p>{t.aboutP1}</p>
                  <p>{t.aboutP2}</p>
                  <p>{t.aboutP3}</p>
                  <p>{t.aboutP4}</p>
                  <p className="pt-2 font-medium text-foreground">
                    {t.discoverMore}
                  </p>
                </motion.div>

                <motion.div
                  className="mt-12 flex flex-wrap gap-4 justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 3.8 }}
                >
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    asChild
                  >
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
                    <a
                      href="https://linkedin.com/in/jvitorcsm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="mr-2 h-5 w-5" />
                      LinkedIn
                    </a>
                  </Button>

                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => setIsContactModalOpen(true)}
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    {t.contact}
                  </Button>
                </motion.div>
              </div>
            </motion.section>

            {/* Skills */}
            <motion.section
              className="py-20 border-t border-border"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-4 text-foreground">
                  {t.techTitle}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {[
                    "JavaScript",
                    "TypeScript",
                    "React",
                    "Next.js",
                    "Node.js",
                    "Tailwind CSS",
                    "shadcn/ui",
                    "Vitest",
                    "Cypress",
                    "PostgreSQL",
                    "Supabase",
                    "Docker",
                    "Linux",
                    "GitHub Actions",
                    "AWS (básico)"
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

            {/* NOW */}
            <motion.section
              className="py-16 border-t border-border"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6 text-foreground">
                {t.nowTitle}
              </h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                {t.nowBullets.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </motion.section>

            {/* GOALS */}
            <motion.section
              className="py-16 border-t border-border"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6 text-foreground">
                {t.goalsTitle}
              </h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                {t.goalsBullets.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </motion.section>

            {/* Projects */}
            <motion.section
              className="py-20 border-t border-border"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-4 text-foreground">
                  {t.featuredTitle}
                </h2>
                <p className="text-muted-foreground">{t.featuredDesc}</p>
              </div>

              {loading && (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                  <p className="mt-4 text-muted-foreground">{t.loading}</p>
                </div>
              )}

              {error && (
                <div className="text-center py-12">
                  <p className="text-destructive">
                    {t.error} {error}
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
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0"
                              asChild
                            >
                              <a
                                href={repo.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Github className="h-4 w-4" />
                              </a>
                            </Button>

                            {repo.homepage && (
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0"
                                asChild
                              >
                                <a
                                  href={repo.homepage}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <ExternalLink className="h-4 w-4" />
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>

                        <CardDescription className="text-sm text-muted-foreground line-clamp-2">
                          {repo.description || t.noDescription}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="pt-0">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {repo.language && (
                            <Badge
                              variant="outline"
                              className="text-xs border-border"
                            >
                              <Code className="mr-1 h-3 w-3" />
                              {repo.language}
                            </Badge>
                          )}

                          {(repo.topics ?? []).slice(0, 2).map((topic) => (
                            <Badge
                              key={topic}
                              variant="secondary"
                              className="text-xs"
                            >
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
                    <a
                      href="https://github.com/jvitorcsm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t.viewAll}
                    </a>
                  </Button>
                </div>
              )}
            </motion.section>

            {/* Footer */}
            <motion.footer
              className="border-t border-border py-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-muted-foreground">{t.footer}</p>

                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
                    <a
                      href="https://github.com/jvitorcsm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  </Button>

                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
                    <a
                      href="https://linkedin.com/in/jvitorcsm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="h-4 w-4" />
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
  );
}
