"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  Award,
} from "lucide-react";
import Navigation from "@/components/navigation";
import ScrollProgress from "@/components/scroll-progress";
import { motion } from "framer-motion";
import LoadingScreen from "@/components/loading-screen";
import Image from "next/image";

// ---------------------------------------------
// Traduções + Conteúdo (PT/EN)
// ---------------------------------------------
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

    profile:
      "Desenvolvedor Full-Stack com foco em front-end (React/Next.js) e integrações. Experiência em suporte técnico (HelpDesk) e contribuições em open source (Orval). Rotina voltada a boas práticas (testes, CI/CD) e aprendizado contínuo rumo à Arquitetura de Software.",

    phone: "+55 (48) 99605-3100",
    email: "me@johnv.place",
    location: "Florianópolis / São José, SC — Brasil",

    exp: [
      {
        title: "HelpDesk / Suporte de TI",
        company: "Alix Tecnologia",
        period: "2024 — atual",
        desc: "Atendimento a usuários (on-site e remoto), troubleshooting de estações Windows, rede e impressoras; abertura/gestão de chamados; documentação; apoio a inventário de TI e rotinas de backup.",
      },
      {
        title: "Contribuidor Open Source",
        company: "Orval (Gerador de SDK via OpenAPI)",
        period: "2024 — atual",
        desc: "Melhorias de DX e documentação, investigação de issues, atualização do Next.js e ajustes em exemplos; foco em qualidade de build e organização de pacotes.",
      },
      {
        title: "Automação & Integrações (freelance)",
        company: "Projetos pessoais / clientes",
        period: "2024 — 2025",
        desc: "Integrações RD Station → Pipedrive; formatação de atividades de lead, deduplicação de notas e sincronização de histórico. Steps reutilizáveis e rastreáveis.",
      },
      {
        title: "Dev Front-End (projetos autorais)",
        company: "Portfólio",
        period: "2024 — 2025",
        desc: "Next.js + TypeScript, Tailwind e shadcn/ui; testes (Cypress/Vitest); deploy em Vercel/Render; landing pages e sistemas de estudo (Kanban, CRUDs).",
      },
    ],

    edu: [
      {
        title: "Técnico em TI (em andamento)",
        institution: "SENAI",
        period: "2025",
      },
      {
        title: "CS50x – Harvard (em andamento)",
        institution: "edX",
        period: "2025",
      },
    ],

    // labels de skills
    frontend: "Frontend",
    backend: "Backend",
    database: "Banco de Dados",
    tools: "Ferramentas",

    // certificações (preencha quando tiver)
    certs: [] as Array<{ name: string; org: string; year: string }>,
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

    profile:
      "Full-Stack developer focused on React/Next.js and integrations. Background in IT support (HelpDesk) and open-source contributions (Orval). Strong emphasis on testing, CI/CD and best practices on the path to Software Architecture.",

    phone: "+55 (48) 99605-3100",
    email: "me@johnv.place",
    location: "Florianópolis / São José, SC — Brazil",

    exp: [
      {
        title: "HelpDesk / IT Support",
        company: "Alix Tecnologia",
        period: "2024 — present",
        desc: "User support (on-site/remote), Windows troubleshooting, networking & printers, ticket handling, documentation, asset tracking and backup routines.",
      },
      {
        title: "Open-Source Contributor",
        company: "Orval (OpenAPI → SDK generator)",
        period: "2024 — present",
        desc: "DX & docs improvements, issue triage, Next.js upgrades and example fixes; focus on build quality and package organization.",
      },
      {
        title: "Automation & Integrations (freelance)",
        company: "Personal/clients",
        period: "2024 — 2025",
        desc: "RD Station → Pipedrive flows; lead activity formatting, note deduplication and history sync. Reusable and traceable steps.",
      },
      {
        title: "Front-End Dev (personal projects)",
        company: "Portfolio",
        period: "2024 — 2025",
        desc: "Next.js + TypeScript, Tailwind, shadcn/ui; Cypress/Vitest; Vercel/Render; landing pages and study systems (Kanban, CRUDs).",
      },
    ],

    edu: [
      { title: "IT Technician (in progress)", institution: "SENAI", period: "2025" },
      { title: "CS50x – Harvard (in progress)", institution: "edX", period: "2025" },
    ],

    frontend: "Frontend",
    backend: "Backend",
    database: "Database",
    tools: "Tools",

    certs: [] as Array<{ name: string; org: string; year: string }>,
  },
} as const;

export default function Resume() {
  const [currentLang, setCurrentLang] = useState<"pt" | "en">("pt");
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const t = translations[currentLang];

  useEffect(() => {
    const timer = setTimeout(() => setIsPageLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // ---------------------------------------------
  // Geração de PDF (client-side) com jsPDF
  // ---------------------------------------------
  const generatePDF = async () => {
  const lang = currentLang; // "pt" | "en"
  const res = await fetch(`/api/resume/pdf?lang=${lang}`);
  if (!res.ok) {
    alert("Falha ao gerar PDF.");
    return;
  }
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = lang === "pt" ? "Joao_Vitor_Curriculo.pdf" : "Joao_Vitor_Resume.pdf";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};

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
        {/* partículas */}
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
          <Navigation
            currentLang={currentLang}
            onLanguageChange={setCurrentLang}
          />

          <main className="max-w-4xl mx-auto px-6">
            {/* Header */}
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
                  <h1 className="text-5xl md:text-7xl font-bold mb-4 text-foreground tracking-tight">
                    {t.title}
                  </h1>
                  <p className="text-xl text-muted-foreground font-mono">
                    {"<"} {t.subtitle} {">"}
                  </p>
                </motion.div>
              </div>
            </motion.section>

            {/* Grid principal */}
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* Coluna Esquerda */}
              <div className="space-y-6">
                {/* Contato */}
                <Card className="bg-card hover:bg-card/80 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-foreground">{t.contact}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">{t.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">{t.phone}</span>
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

                {/* Skills */}
                <Card className="bg-card hover:bg-card/80 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-foreground">{t.skills}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-2">
                        {t.frontend}
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {["React", "Next.js", "TypeScript", "Tailwind", "shadcn/ui"].map(
                          (skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          )
                        )}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-2">
                        {t.backend}
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {["Node.js", "Express", "Fastify", "Python (básico)"].map(
                          (skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          )
                        )}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-2">
                        {t.database}
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {["PostgreSQL", "Supabase", "Redis (básico)"].map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-2">
                        {t.tools}
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {[
                          "GitHub Actions",
                          "Cypress",
                          "Vitest",
                          "Docker",
                          "Linux",
                          "Vercel/Render",
                        ].map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Idiomas */}
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
                      <Badge variant="outline">
                        {currentLang === "pt" ? "Avançado" : "Advanced"}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-foreground">Español</span>
                      <Badge variant="outline">
                        {currentLang === "pt" ? "Intermediário" : "Intermediate"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Coluna Direita */}
              <div className="lg:col-span-2 space-y-6">
                {/* Perfil */}
                <Card className="bg-card hover:bg-card/80 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-foreground">João Vitor</CardTitle>
                    <CardDescription className="text-muted-foreground font-mono">
                      Full-Stack Developer
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {t.profile}
                    </p>
                  </CardContent>
                </Card>

                {/* Experiência */}
                <Card className="bg-card hover:bg-card/80 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-foreground flex items-center">
                      <Briefcase className="mr-2 h-5 w-5" />
                      {t.experience}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {t.exp.map((item: any, idx: number) => (
                      <div key={idx} className="border-l-2 border-border pl-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-foreground">
                            {item.title}
                          </h3>
                        </div>
                        <p className="text-muted-foreground text-sm mb-1">
                          {item.company}
                        </p>
                        <div className="flex items-center space-x-2 mb-3">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {item.period}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Formação */}
                <Card className="bg-card hover:bg-card/80 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-foreground flex items-center">
                      <GraduationCap className="mr-2 h-5 w-5" />
                      {t.education}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {t.edu.map((ed: any, idx: number) => (
                      <div key={idx} className="border-l-2 border-border pl-4">
                        <h3 className="font-semibold text-foreground mb-1">
                          {ed.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-1">
                          {ed.institution}
                        </p>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {ed.period}
                          </span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Certificações */}
                <Card className="bg-card hover:bg-card/80 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-foreground flex items-center">
                      <Award className="mr-2 h-5 w-5" />
                      {t.certifications}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {t.certs.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground text-sm italic">
                          [Adicione suas certificações aqui]
                        </p>
                      </div>
                    ) : (
                      <ul className="space-y-2">
                        {t.certs.map((c: any, i: number) => (
                          <li
                            key={i}
                            className="flex items-center justify-between"
                          >
                            <span className="text-sm text-foreground">
                              {c.name} — {c.org}
                            </span>
                            <Badge variant="outline">{c.year}</Badge>
                          </li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </main>
        </div>
      </motion.div>
    </>
  );
}
