"use client";
import { useState } from "react";
import Link from "next/link";

const OPTIONS = [
  {
    icon: "💼",
    title: "Quero contratar os serviços da Aurea Group",
    desc: "Meta Ads, Google Ads, agente IA no WhatsApp e CRM inteligente",
    action: "wa" as const,
    msg: "Olá! Vim pelo site da Aurea Group e quero contratar os serviços de vocês. Pode me ajudar?",
  },
  {
    icon: "🎓",
    title: "Quero entender mais sobre a mentoria",
    desc: "Aprenda a escalar seu negócio com tráfego pago e automações",
    action: "link" as const,
    href: "/mentoria",
  },
  {
    icon: "📚",
    title: "Quero entender mais sobre o curso",
    desc: "Conteúdo prático para dominar o marketing digital do zero",
    action: "wa" as const,
    msg: "Olá! Vim pelo site da Aurea Group e tenho interesse no curso. Pode me passar mais detalhes?",
  },
];

const WA = "5541987850818";

export default function FalarPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const [leaving, setLeaving] = useState(false);

  const handleContinue = () => {
    if (selected === null) return;
    const opt = OPTIONS[selected];
    setLeaving(true);
    setTimeout(() => {
      if (opt.action === "wa") {
        window.open(`https://wa.me/${WA}?text=${encodeURIComponent(opt.msg!)}`, "_blank");
        setLeaving(false);
      } else {
        window.location.href = opt.href!;
      }
    }, 300);
  };

  return (
    <>
      {/* Background */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,.018) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="orb-a" style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "var(--gold)", filter: "blur(150px)", opacity: .08, top: -200, left: -100 }} />
        <div className="orb-b" style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "#3A7BD5", filter: "blur(130px)", opacity: .06, bottom: 0, right: -50 }} />
      </div>

      {/* Mini header */}
      <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 24px", height: 60, display: "flex", alignItems: "center", background: "rgba(0,0,0,.6)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,.05)" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <img src="/logo.jpg" alt="Aurea Group" style={{ width: 30, height: 30, borderRadius: 7, objectFit: "cover" }} />
          <span style={{ fontSize: 15, fontWeight: 900, letterSpacing: "-.03em", color: "#fff" }}>
            Aurea<span className="gold-text">Group</span>
          </span>
        </Link>
      </header>

      {/* Main content */}
      <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 24px 60px", position: "relative", zIndex: 1 }}>
        <div style={{ width: "100%", maxWidth: 480 }} className={`falar-container${leaving ? " falar-leaving" : ""}`}>

          {/* Profile */}
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div style={{ position: "relative", display: "inline-block", marginBottom: 14 }}>
              <div style={{ width: 80, height: 80, borderRadius: "50%", padding: 3, background: "linear-gradient(135deg, var(--gold-lt), var(--gold2))", display: "inline-flex" }}>
                <img src="/logo.jpg" alt="Aurea Group" style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover", display: "block" }} />
              </div>
              <div style={{ position: "absolute", bottom: 2, right: 2, width: 16, height: 16, borderRadius: "50%", background: "#4CAF86", border: "2px solid #000" }} />
            </div>
            <div>
              <a href="https://instagram.com/lucavespaa" target="_blank" rel="noopener noreferrer"
                style={{ fontSize: 14, fontWeight: 700, color: "var(--gold-lt)", textDecoration: "none", letterSpacing: "-.01em" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--gold-lt)")}>
                @lucavespaa
              </a>
            </div>
          </div>

          {/* Question */}
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h1 style={{ fontSize: "clamp(22px, 5vw, 28px)", fontWeight: 900, letterSpacing: "-.04em", lineHeight: 1.2, marginBottom: 10 }}>
              O que você busca?
            </h1>
            <p style={{ fontSize: 14, color: "var(--t2)", lineHeight: 1.6 }}>
              Selecione a opção que mais combina com você.
            </p>
          </div>

          {/* Options */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
            {OPTIONS.map((opt, i) => {
              const isSelected = selected === i;
              return (
                <button
                  key={i}
                  onClick={() => setSelected(i)}
                  className="falar-option"
                  style={{
                    background: isSelected ? "rgba(201,162,39,.07)" : "rgba(255,255,255,.025)",
                    border: `1px solid ${isSelected ? "rgba(201,162,39,.45)" : "rgba(255,255,255,.07)"}`,
                    borderRadius: 14,
                    padding: "18px 20px",
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    textAlign: "left",
                    cursor: "pointer",
                    width: "100%",
                    transition: "all .25s cubic-bezier(.16,1,.3,1)",
                    transform: isSelected ? "scale(1.01)" : "scale(1)",
                    boxShadow: isSelected ? "0 0 40px rgba(201,162,39,.08)" : "none",
                  }}
                >
                  <span style={{ fontSize: 26, flexShrink: 0 }}>{opt.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: isSelected ? "#fff" : "var(--t2)", marginBottom: 3, letterSpacing: "-.01em", transition: "color .2s" }}>
                      {opt.title}
                    </div>
                    <div style={{ fontSize: 12, color: "var(--t3)", lineHeight: 1.5 }}>
                      {opt.desc}
                    </div>
                  </div>
                  <div style={{
                    width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
                    border: `1.5px solid ${isSelected ? "var(--gold-lt)" : "rgba(255,255,255,.15)"}`,
                    background: isSelected ? "linear-gradient(135deg, var(--gold-lt), var(--gold2))" : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, fontWeight: 900, color: "#000",
                    transition: "all .2s",
                  }}>
                    {isSelected ? "✓" : ""}
                  </div>
                </button>
              );
            })}
          </div>

          {/* CTA — slides in when option selected */}
          <div className={`falar-cta-wrap${selected !== null ? " visible" : ""}`}>
            <button
              onClick={handleContinue}
              className="btn-primary"
              style={{ width: "100%", justifyContent: "center", fontSize: 15, padding: "16px 28px", borderRadius: 12 }}
            >
              Continuar →
            </button>
          </div>

          {/* Privacy */}
          <p style={{ textAlign: "center", fontSize: 12, color: "var(--t3)", marginTop: 24, lineHeight: 1.6 }}>
            🔒 Suas informações estão seguras e não serão compartilhadas.
          </p>
        </div>
      </main>
    </>
  );
}
