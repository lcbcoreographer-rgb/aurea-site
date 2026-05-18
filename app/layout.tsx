import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aurea Group — Tráfego Pago & IA para Negócios que Querem Crescer",
  description: "Automatizamos sua aquisição de clientes com campanhas de alta performance e inteligência artificial. Meta Ads, Google Ads, agentes IA e CRM inteligente.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
