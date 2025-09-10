"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { MessageCircle, Mail, Copy, Check } from "lucide-react"

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
  currentLang: "pt" | "en"
}

export default function ContactModal({ isOpen, onClose, currentLang }: ContactModalProps) {
  const [copiedWhatsApp, setCopiedWhatsApp] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState(false)

  const whatsappNumber = "48996053100"
  const email = "joaovitorcarvalhosavimondo@gmail.com"

  const copyToClipboard = async (text: string, type: "whatsapp" | "email") => {
    try {
      await navigator.clipboard.writeText(text)
      if (type === "whatsapp") {
        setCopiedWhatsApp(true)
        setTimeout(() => setCopiedWhatsApp(false), 2000)
      } else {
        setCopiedEmail(true)
        setTimeout(() => setCopiedEmail(false), 2000)
      }
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  const translations = {
    pt: {
      title: "Entre em Contato",
      whatsapp: "WhatsApp",
      email: "E-mail",
      copy: "Copiar",
      copied: "Copiado!",
      openWhatsApp: "Abrir WhatsApp",
      sendEmail: "Enviar E-mail",
    },
    en: {
      title: "Get in Touch",
      whatsapp: "WhatsApp",
      email: "E-mail",
      copy: "Copy",
      copied: "Copied!",
      openWhatsApp: "Open WhatsApp",
      sendEmail: "Send E-mail",
    },
  }

  const t = translations[currentLang]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-background/98 backdrop-blur-md border-2 border-border shadow-xl rounded-xl">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-foreground text-2xl font-bold text-center tracking-tight">{t.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-8 px-2 pb-2">
          {/* WhatsApp */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <MessageCircle className="h-5 w-5 text-green-500" />
              </div>
              <span className="font-semibold text-foreground text-lg">{t.whatsapp}</span>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-card rounded-xl border border-border hover:bg-muted/50 transition-colors">
              <span className="flex-1 font-mono text-sm text-foreground">+55 {whatsappNumber}</span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(`+55${whatsappNumber}`, "whatsapp")}
                className="h-9 w-9 p-0 hover:bg-background rounded-lg"
              >
                {copiedWhatsApp ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
            <Button
              className="w-full h-12 bg-green-600 hover:bg-green-700 text-white transition-all duration-200 rounded-xl font-medium"
              onClick={() => window.open(`https://wa.me/55${whatsappNumber}`, "_blank")}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              {t.openWhatsApp}
            </Button>
          </div>

          {/* Email */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Mail className="h-5 w-5 text-blue-500" />
              </div>
              <span className="font-semibold text-foreground text-lg">{t.email}</span>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-card rounded-xl border border-border hover:bg-muted/50 transition-colors">
              <span className="flex-1 font-mono text-sm break-all text-foreground">{email}</span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(email, "email")}
                className="h-9 w-9 p-0 hover:bg-background rounded-lg"
              >
                {copiedEmail ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
            <Button
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 rounded-xl font-medium"
              onClick={() => window.open(`mailto:${email}`, "_blank")}
            >
              <Mail className="mr-2 h-5 w-5" />
              {t.sendEmail}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
