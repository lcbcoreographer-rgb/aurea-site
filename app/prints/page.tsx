"use client";
import { useState } from "react";

// Para adicionar um print novo: salve a imagem em /public/prints/ e adicione uma linha aqui.
const PRINTS: { src: string; client: string }[] = [
];

export default function PrintsPage() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <main style={{ minHeight: "100vh", position: "relative" }}>
      {/* Background */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,.022) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div style={{ position: "absolute", width: 700, height: 700, borderRadius: "50%", background: "var(--gold)", filter: "blur(140px)", opacity: .08, top: -200, left: -150 }} />
      </div>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 48px", height: 68, background: "rgba(0,0,0,.75)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <img src="/logo.jpg" alt="Aurea Group" style={{ width: 36, height: 36, borderRadius: 8, objectFit: "cover" }} />
          <span style={{ fontSize: 17, fontWeight: 900, letterSpacing: "-.03em", color: "#fff" }}>Aurea<span className="gold-text">Group</span></span>
        </a>
        <a href="/" style={{ fontSize: 13, color: "var(--t3)", textDecoration: "none", fontWeight: 500 }}>← Voltar para o site</a>
      </nav>

      {/* HERO */}
      <section style={{ paddingTop: 160, paddingBottom: 60, textAlign: "center", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px" }}>
          <div className="badge" style={{ marginBottom: 24 }}>
            <span className="badge-dot" /> Prova real
          </div>
          <h1 style={{ fontSize: "clamp(32px, 5.5vw, 56px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-.04em", marginBottom: 20 }}>
            Prints reais<br /><span className="gold-text">de clientes reais</span>
          </h1>
          <p style={{ fontSize: 16, color: "var(--t2)", lineHeight: 1.7, maxWidth: 560, margin: "0 auto" }}>
            Nada de números inventados. Aqui estão as conversas e resultados exatamente como os clientes mandaram pra gente.
          </p>
        </div>
      </section>

      {/* GRID */}
      <section style={{ padding: "0 24px 100px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {PRINTS.length === 0 ? (
            <div className="glass-card" style={{ padding: 48, textAlign: "center", maxWidth: 480, margin: "0 auto" }}>
              <p style={{ fontSize: 14, color: "var(--t2)" }}>Novos prints chegando em breve.</p>
            </div>
          ) : (
            <div style={{ columnCount: 3, columnGap: 16 }} className="prints-grid">
              {PRINTS.map((p, i) => (
                <div
                  key={i}
                  className="glass-card"
                  style={{ breakInside: "avoid", marginBottom: 16, overflow: "hidden", cursor: "pointer" }}
                  onClick={() => setActive(i)}
                >
                  <img src={p.src} alt={p.client} style={{ width: "100%", display: "block" }} />
                  <div style={{ padding: "10px 14px", fontSize: 12, color: "var(--t3)", fontWeight: 700 }}>{p.client}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* LIGHTBOX */}
      {active !== null && (
        <div
          onClick={() => setActive(null)}
          style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,.9)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, cursor: "zoom-out" }}
        >
          <img src={PRINTS[active].src} alt={PRINTS[active].client} style={{ maxWidth: "100%", maxHeight: "90vh", borderRadius: 12, boxShadow: "0 20px 60px rgba(0,0,0,.6)" }} />
        </div>
      )}

      <style>{`
        @media (max-width: 720px) {
          .prints-grid { column-count: 2 !important; }
        }
        @media (max-width: 460px) {
          .prints-grid { column-count: 1 !important; }
        }
      `}</style>
    </main>
  );
}
