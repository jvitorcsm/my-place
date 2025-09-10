// app/api/resume/pdf/route.ts
import React from "react";
import { pdf } from "@react-pdf/renderer";

// garanta Node runtime e sem cache
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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
    email: "joaovitorcarvalhosavimondo@gmail.com",
    location: "Florianópolis / São José, SC — Brasil",
    exp: [
      {
        title: "HelpDesk / Suporte de TI",
        company: "Alix Tecnologia",
        period: "2024 — atual",
        desc:
          "Atendimento a usuários (on-site e remoto), troubleshooting de estações Windows, rede e impressoras; abertura/gestão de chamados; documentação; apoio a inventário de TI e rotinas de backup.",
      },
      {
        title: "Contribuidor Open Source",
        company: "Orval (Gerador de SDK via OpenAPI)",
        period: "2024 — atual",
        desc:
          "Melhorias de DX e documentação, investigação de issues, atualização do Next.js e ajustes em exemplos; foco em qualidade de build e organização de pacotes.",
      },
      {
        title: "Automação & Integrações (freelance)",
        company: "Projetos pessoais / clientes",
        period: "2024 — 2025",
        desc:
          "Integrações RD Station → Pipedrive; formatação de atividades de lead, deduplicação de notas e sincronização de histórico. Steps reutilizáveis e rastreáveis.",
      },
      {
        title: "Dev Front-End (projetos autorais)",
        company: "Portfólio",
        period: "2024 — 2025",
        desc:
          "Next.js + TypeScript, Tailwind e shadcn/ui; testes (Cypress/Vitest); deploy em Vercel/Render; landing pages e sistemas de estudo (Kanban, CRUDs).",
      },
    ],
    edu: [
      { title: "Técnico em TI (em andamento)", institution: "SENAI", period: "2025" },
      { title: "CS50x – Harvard (em andamento)", institution: "edX", period: "2025" },
    ],
    frontend: "Frontend",
    backend: "Backend",
    database: "Banco de Dados",
    tools: "Ferramentas",
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
    email: "joaovitorcarvalhosavimondo@gmail.com",
    location: "Florianópolis / São José, SC — Brazil",
    exp: [
      {
        title: "HelpDesk / IT Support",
        company: "Alix Tecnologia",
        period: "2024 — present",
        desc:
          "User support (on-site/remote), Windows troubleshooting, networking & printers, ticket handling, documentation, asset tracking and backup routines.",
      },
      {
        title: "Open-Source Contributor",
        company: "Orval (OpenAPI → SDK generator)",
        period: "2024 — present",
        desc:
          "DX & docs improvements, issue triage, Next.js upgrades and example fixes; focus on build quality and package organization.",
      },
      {
        title: "Automation & Integrations (freelance)",
        company: "Personal/clients",
        period: "2024 — 2025",
        desc:
          "RD Station → Pipedrive flows; lead activity formatting, note deduplication and history sync. Reusable and traceable steps.",
      },
      {
        title: "Front-End Dev (personal projects)",
        company: "Portfolio",
        period: "2024 — 2025",
        desc:
          "Next.js + TypeScript, Tailwind, shadcn/ui; Cypress/Vitest; Vercel/Render; landing pages and study systems (Kanban, CRUDs).",
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

/* export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const lang = (searchParams.get("lang") as "pt" | "en") ?? "pt";
    const t = translations[lang];

//    const instance = pdf(<ResumePDF t={t as any} lang={lang} />);
//    const buffer = await instance.toBuffer();

   return new Response(buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${
          lang === "pt" ? "Joao_Vitor_Curriculo" : "Joao_Vitor_Resume"
        }.pdf"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (e: any) {
    console.error("[/api/resume/pdf] ERRO:", e);
    return new Response(
      JSON.stringify({ error: "PDF generation failed", detail: e?.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
} */       
