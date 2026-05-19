import type { Metadata } from "next";
import "./globals.css";
import SmoothScrollProvider from "./components/SmoothScrollProvider";
import CustomCursor from "./components/CustomCursor";

export const metadata: Metadata = {
  title: "Aurea Group — Tráfego Pago & IA para Negócios que Querem Crescer",
  description: "Automatizamos sua aquisição de clientes com campanhas de alta performance e inteligência artificial. Meta Ads, Google Ads, agentes IA e CRM inteligente.",
  icons: {
    icon: "/icon.jpg",
    apple: "/icon.jpg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <CustomCursor />
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
