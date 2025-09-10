
/*import React from "react";
import { Document, Page, Text, View, StyleSheet, Link } from "@react-pdf/renderer";

type T = {
  title: string;
  subtitle: string;
  contact: string;
  experience: string;
  education: string;
  skills: string;
  certifications: string;
  languages: string;
  projects: string;
  profile: string;
  phone: string;
  email: string;
  location: string;
  frontend: string;
  backend: string;
  database: string;
  tools: string;
  certs: Array<{ name: string; org: string; year: string }>;
  exp: Array<{ title: string; company: string; period: string; desc: string }>;
  edu: Array<{ title: string; institution: string; period: string }>;
};

export default function ResumePDF({ t, lang = "pt" }: { t: T; lang?: "pt" | "en" }) {
  const styles = StyleSheet.create({
    page: { padding: 36, fontSize: 10, fontFamily: "Helvetica" },
    header: { marginBottom: 12, paddingBottom: 8, borderBottom: "1px solid #e5e7eb" },
    name: { fontSize: 16, fontWeight: 700 },
    role: { fontSize: 10, color: "#6b7280" },
    grid: { flexDirection: "row", gap: 16 },
    left: { width: "35%" },
    right: { width: "65%" },
    sectionTitle: { fontSize: 12, fontWeight: 700, marginBottom: 6, marginTop: 10 },
    line: { marginBottom: 6 },
    smallMuted: { color: "#6b7280" },
    bullet: { marginLeft: 8 },
    chipRow: { flexDirection: "row", flexWrap: "wrap", gap: 4 },
    chip: {
      paddingVertical: 2,
      paddingHorizontal: 6,
      borderRadius: 3,
      backgroundColor: "#f3f4f6",
      fontSize: 9,
      marginRight: 4,
      marginBottom: 4,
    },
  });

  const label = (pt: string, en: string) => (lang === "pt" ? pt : en);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header /*
        <View style={styles.header}>
          <Text style={styles.name}>JOÃO VITOR CARVALHO SAVI MONDO</Text>
          <Text style={styles.role}>Full-Stack Developer</Text>
        </View>

        <View style={styles.grid}>
          {/* LEFT 
          <View style={styles.left}>
            <Text style={styles.sectionTitle}>{t.contact}</Text>
            <View style={styles.line}><Text>Email: {t.email}</Text></View>
            <View style={styles.line}><Text>WhatsApp: {t.phone}</Text></View>
            <View style={styles.line}><Text>{label("Local", "Location")}: {t.location}</Text></View>
            <View style={styles.line}>
              <Text>
                GitHub:{" "}
                <Link src="https://github.com/jvitorcsm">github.com/jvitorcsm</Link>
              </Text>
            </View>

            <Text style={styles.sectionTitle}>{t.skills}</Text>

            <View style={styles.line}>
              <Text style={{ fontWeight: 700 }}>{t.frontend}</Text>
              <View style={styles.chipRow}>
                {["React", "Next.js", "TypeScript", "Tailwind", "shadcn/ui"].map((s) => (
                  <Text style={styles.chip} key={s}>{s}</Text>
                ))}
              </View>
            </View>

            <View style={styles.line}>
              <Text style={{ fontWeight: 700 }}>{t.backend}</Text>
              <View style={styles.chipRow}>
                {["Node.js", "Express", "Fastify", "Python (básico)"].map((s) => (
                  <Text style={styles.chip} key={s}>{s}</Text>
                ))}
              </View>
            </View>

            <View style={styles.line}>
              <Text style={{ fontWeight: 700 }}>{t.database}</Text>
              <View style={styles.chipRow}>
                {["PostgreSQL", "Supabase", "Redis (básico)"].map((s) => (
                  <Text style={styles.chip} key={s}>{s}</Text>
                ))}
              </View>
            </View>

            <View style={styles.line}>
              <Text style={{ fontWeight: 700 }}>{t.tools}</Text>
              <View style={styles.chipRow}>
                {["GitHub Actions", "Cypress", "Vitest", "Docker", "Linux", "Vercel/Render"].map(
                  (s) => (
                    <Text style={styles.chip} key={s}>{s}</Text>
                  )
                )}
              </View>
            </View>

            <Text style={styles.sectionTitle}>{t.languages}</Text>
            <View style={styles.line}><Text>Português — {label("Nativo", "Native")}</Text></View>
            <View style={styles.line}><Text>English — {label("Avançado", "Advanced")}</Text></View>
            <View style={styles.line}><Text>Español — {label("Intermediário", "Intermediate")}</Text></View>

            <Text style={styles.sectionTitle}>{t.certifications}</Text>
            {t.certs.length === 0 ? (
              <Text style={styles.smallMuted}>
                {label("Adicione suas certificações aqui", "Add your certifications here")}
              </Text>
            ) : (
              t.certs.map((c, i) => (
                <View style={styles.line} key={i}>
                  <Text>{c.name} — {c.org} ({c.year})</Text>
                </View>
              ))
            )}
          </View>

          {/* RIGHT 
          <View style={styles.right}>
            <Text style={styles.sectionTitle}>{label("Perfil Profissional", "Professional Profile")}</Text>
            <View style={styles.line}><Text>{t.profile}</Text></View>

            <Text style={styles.sectionTitle}>{t.experience}</Text>
            {t.exp.map((e, i) => (
              <View key={i} style={{ marginBottom: 8 }}>
                <Text style={{ fontWeight: 700 }}>
                  {e.title} — {e.company} ({e.period})
                </Text>
                <Text>{e.desc}</Text>
              </View>
            ))}

            <Text style={styles.sectionTitle}>{t.education}</Text>
            {t.edu.map((e, i) => (
              <View key={i} style={{ marginBottom: 6 }}>
                <Text style={{ fontWeight: 700 }}>{e.title}</Text>
                <Text>
                  {e.institution} — <Text style={styles.smallMuted}>{e.period}</Text>
                </Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
}

*/
