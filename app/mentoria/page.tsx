"use client";
import { useState } from "react";

const PILLARS = [
  {
    num: "01",
    title: "Oferta",
    headline: "Transforme o que você vende em algo irresistível",
    desc: "Refinamos completamente a sua oferta para que você pare de competir por preço e aumente o valor percebido do que entrega.",
    items: [
      "Precificação",
      "Estratégia de cobrança",
      "Posicionamento da oferta",
      "Copy",
      "Estrutura do serviço",
      "Percepção de valor",
      "Diferenciação no mercado",
    ],
  },
  {
    num: "02",
    title: "Posicionamento",
    headline: "Seu perfil como máquina de autoridade e vendas",
    desc: "Estruturamos o seu posicionamento digital para construir autoridade real e atrair audiência qualificada de forma orgânica e consistente.",
    items: [
      "Estrutura estratégica do Instagram",
      "Bio e comunicação",
      "Estratégia de conteúdo",
      "Autoridade",
      "Branding pessoal",
      "Conteúdo que gera desejo",
      "Construção de audiência qualificada",
    ],
    note: "Foco principal no Instagram, adaptável para outras redes.",
  },
  {
    num: "03",
    title: "Vendas",
    headline: "Uma operação comercial enxuta e eficiente",
    desc: "Criamos um processo de vendas completo, do primeiro contato ao pós-venda, maximizando cada cliente que entra na sua operação.",
    groups: [
      {
        label: "Pré-venda",
        items: ["Canais de aquisição", "Geração de leads", "Qualificação", "Estrutura comercial", "Funil"],
      },
      {
        label: "Venda",
        items: ["Estratégias de fechamento", "Apresentação comercial", "Conversão", "Scripts", "Processo comercial"],
      },
      {
        label: "Pós-venda",
        items: ["Onboarding", "Retenção", "Upsell", "Aumento de LTV", "Experiência do cliente"],
      },
    ],
  },
];

const RESULTS = [
  { v: "Simples", l: "operação sem complexidade" },
  { v: "Lucrativa", l: "margens saudáveis e crescentes" },
  { v: "Previsível", l: "receita recorrente e estável" },
  { v: "Escalável", l: "crescimento sem caos" },
];

export default function MentoriaPage() {
  const [openPillar, setOpenPillar] = useState<number | null>(0);

  return (
    <>
      {/* Background */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,.022) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div style={{ position: "absolute", width: 700, height: 700, borderRadius: "50%", background: "var(--gold)", filter: "blur(140px)", opacity: .08, top: -200, left: -150 }} />
        <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "#3A7BD5", filter: "blur(130px)", opacity: .06, bottom: -100, right: -100 }} />
      </div>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 48px", height: 68, background: "rgba(0,0,0,.75)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, var(--gold-lt), var(--gold2))", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 14, color: "#000" }}>A</div>
          <span style={{ fontSize: 17, fontWeight: 900, letterSpacing: "-.03em", color: "#fff" }}>Aurea<span className="gold-text">Group</span></span>
        </a>
        <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "var(--t3)", letterSpacing: ".06em", textTransform: "uppercase" }}>Mentoria com</span>
          <span style={{ fontSize: 13, fontWeight: 800, color: "var(--gold-lt)" }}>Luca Vespa</span>
        </div>
        <a href="https://linktree-lucavespaa.lovable.app/" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: 13, padding: "10px 20px" }}>Quero participar →</a>
      </nav>

      {/* HERO */}
      <section style={{ paddingTop: 160, paddingBottom: 80, textAlign: "center", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 24px" }}>
          <div className="badge fade-up" style={{ marginBottom: 28 }}>
            <span className="badge-dot" /> Mentoria exclusiva
          </div>
          <h1 className="fade-up d1" style={{ fontSize: "clamp(38px, 6.5vw, 72px)", fontWeight: 900, lineHeight: 1.08, letterSpacing: "-.04em", marginBottom: 24 }}>
            Conhecimento que vira<br />
            <span className="gold-text">operação lucrativa</span>
          </h1>
          <p className="fade-up d2" style={{ fontSize: 18, color: "var(--t2)", lineHeight: 1.7, maxWidth: 600, margin: "0 auto 16px", fontWeight: 400 }}>
            A mentoria da CEO da Aurea Group, <strong style={{ color: "#fff" }}>Luca Vespa</strong>, é baseada em 3 pilares que transformam seu negócio em uma operação simples, lucrativa, previsível e escalável.
          </p>
          <p className="fade-up d3" style={{ fontSize: 14, color: "var(--t3)", marginBottom: 44 }}>
            Estratégia · Posicionamento · Processos
          </p>
          <div className="fade-up d4" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://linktree-lucavespaa.lovable.app/" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: 15, padding: "16px 32px" }}>Quero participar da mentoria →</a>
            <a href="#pilares" className="btn-ghost" style={{ fontSize: 15, padding: "16px 32px" }}>Ver os pilares</a>
          </div>
        </div>
      </section>

      {/* RESULTADO FINAL — 4 cards */}
      <section style={{ padding: "20px 0 80px", position: "relative", zIndex: 1 }}>
        <div className="divider" style={{ marginBottom: 60 }} />
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0 }}>
          {RESULTS.map((r, i) => (
            <div key={i} style={{ textAlign: "center", borderRight: i < 3 ? "1px solid rgba(255,255,255,.06)" : "none", padding: "0 24px" }}>
              <div className="gold-text" style={{ fontSize: 30, fontWeight: 900, letterSpacing: "-.04em", lineHeight: 1 }}>{r.v}</div>
              <div style={{ fontSize: 12, color: "var(--t2)", marginTop: 8, fontWeight: 500 }}>{r.l}</div>
            </div>
          ))}
        </div>
        <div className="divider" style={{ marginTop: 60 }} />
      </section>

      {/* PILARES */}
      <section id="pilares" style={{ padding: "80px 0", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div className="badge" style={{ marginBottom: 20 }}>Os 3 Pilares</div>
            <h2 style={{ fontSize: "clamp(30px, 4.5vw, 50px)", fontWeight: 900, letterSpacing: "-.04em", lineHeight: 1.1 }}>
              Tudo que você precisa<br /><span className="gold-text">em um único processo</span>
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {PILLARS.map((p, i) => (
              <div key={i} className="glass-card" style={{ overflow: "visible" }}>
                {/* Header */}
                <button
                  onClick={() => setOpenPillar(openPillar === i ? null : i)}
                  style={{ width: "100%", background: "none", border: "none", cursor: "pointer", padding: "28px 32px", display: "flex", alignItems: "center", gap: 24, textAlign: "left", fontFamily: "Inter, sans-serif" }}
                >
                  <div style={{ width: 52, height: 52, borderRadius: 14, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: openPillar === i ? "rgba(201,162,39,.15)" : "rgba(201,162,39,.06)", border: `1px solid ${openPillar === i ? "rgba(201,162,39,.4)" : "rgba(201,162,39,.18)"}`, fontSize: 13, fontWeight: 800, color: "var(--gold-lt)", transition: "all .2s" }}>{p.num}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, color: "var(--t3)", fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 4 }}>Pilar {p.num}</div>
                    <div style={{ fontSize: 22, fontWeight: 900, color: "#fff", letterSpacing: "-.03em" }}>{p.title}</div>
                  </div>
                  <div style={{ fontSize: 24, color: "var(--gold-lt)", transition: "transform .25s", transform: openPillar === i ? "rotate(45deg)" : "none", flexShrink: 0, lineHeight: 1 }}>+</div>
                </button>

                {/* Content */}
                {openPillar === i && (
                  <div style={{ padding: "0 32px 32px" }}>
                    <div style={{ height: 1, background: "rgba(255,255,255,.06)", marginBottom: 28 }} />
                    <div style={{ display: "grid", gridTemplateColumns: p.groups ? "1fr 2fr" : "1fr 1fr", gap: 40, alignItems: "start" }}>

                      {/* Left — headline + desc */}
                      <div>
                        <h3 style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-.02em", lineHeight: 1.3, marginBottom: 14, color: "#fff" }}>{p.headline}</h3>
                        <p style={{ fontSize: 14, color: "var(--t2)", lineHeight: 1.75 }}>{p.desc}</p>
                        {p.note && (
                          <p style={{ marginTop: 16, fontSize: 12, color: "var(--t3)", fontStyle: "italic" }}>{p.note}</p>
                        )}
                      </div>

                      {/* Right — items or groups */}
                      {p.groups ? (
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
                          {p.groups.map((g, gi) => (
                            <div key={gi}>
                              <div style={{ fontSize: 10, fontWeight: 800, color: "var(--gold-lt)", letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 14, paddingBottom: 8, borderBottom: "1px solid rgba(201,162,39,.18)" }}>{g.label}</div>
                              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                {g.items.map((item, ii) => (
                                  <div key={ii} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                    <div style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--gold)", flexShrink: 0 }} />
                                    <span style={{ fontSize: 13, color: "var(--t2)", lineHeight: 1.5 }}>{item}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                          {p.items!.map((item, ii) => (
                            <div key={ii} style={{ display: "flex", alignItems: "center", gap: 10, width: "calc(50% - 4px)" }}>
                              <div style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--gold)", flexShrink: 0 }} />
                              <span style={{ fontSize: 13, color: "var(--t2)", lineHeight: 1.5 }}>{item}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OBJETIVO FINAL */}
      <section style={{ padding: "40px 24px 80px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ background: "rgba(201,162,39,.04)", border: "1px solid rgba(201,162,39,.18)", borderRadius: 20, padding: "48px 48px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at top left, rgba(201,162,39,.09) 0%, transparent 65%)", pointerEvents: "none" }} />
            <div style={{ fontSize: 11, fontWeight: 700, color: "var(--gold-lt)", letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 16 }}>Objetivo final</div>
            <h2 style={{ fontSize: "clamp(24px, 3.5vw, 40px)", fontWeight: 900, letterSpacing: "-.04em", lineHeight: 1.15, marginBottom: 20 }}>
              Criar uma operação onde você<br />
              <span className="gold-text">gera vendas com consistência</span>
            </h2>
            <p style={{ fontSize: 15, color: "var(--t2)", lineHeight: 1.8, maxWidth: 580 }}>
              Utilizando posicionamento, estratégia e processos — uma operação simples, lucrativa, previsível e escalável, sem depender de sorte ou de esforço manual infinito.
            </p>
          </div>
        </div>
      </section>

      {/* MODELO — dois níveis */}
      <section style={{ padding: "0 24px 80px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="badge" style={{ marginBottom: 20 }}>Modelo da Mentoria</div>
            <h2 style={{ fontSize: "clamp(26px, 4vw, 44px)", fontWeight: 900, letterSpacing: "-.04em", lineHeight: 1.1 }}>
              Dois níveis de acesso.<br /><span className="gold-text">Você escolhe o seu formato.</span>
            </h2>
            <p style={{ fontSize: 15, color: "var(--t2)", marginTop: 16, maxWidth: 500, margin: "16px auto 0" }}>
              Cada cliente escolhe o nível mais adequado para o momento da sua operação. Entre em contato para conhecer as condições de cada formato.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {/* Nível 1 */}
            <div className="glass-card" style={{ padding: 36 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "var(--t3)", letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 12 }}>Nível 01</div>
              <h3 style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-.03em", marginBottom: 14 }}>Mentoria em Grupo</h3>
              <p style={{ fontSize: 14, color: "var(--t2)", lineHeight: 1.75, marginBottom: 28 }}>
                Acesso ao conteúdo dos 3 pilares em um ambiente colaborativo, com encontros em grupo, materiais exclusivos e comunidade ativa.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
                {["Encontros ao vivo em grupo", "Material e frameworks exclusivos", "Comunidade de mentoriados", "Acompanhamento por período definido"].map((f, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ color: "#4CAF86", fontSize: 15, flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: 13, color: "var(--t2)" }}>{f}</span>
                  </div>
                ))}
              </div>
              <a href="https://linktree-lucavespaa.lovable.app/" target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ width: "100%", justifyContent: "center", fontSize: 14 }}>Saber mais →</a>
            </div>

            {/* Nível 2 */}
            <div className="glass-card" style={{ padding: 36, borderColor: "rgba(201,162,39,.3)", background: "rgba(201,162,39,.04)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--gold-lt)", letterSpacing: ".08em", textTransform: "uppercase" }}>Nível 02</span>
                <span style={{ fontSize: 10, background: "rgba(201,162,39,.12)", border: "1px solid rgba(201,162,39,.3)", color: "var(--gold-lt)", borderRadius: 99, padding: "2px 10px", fontWeight: 700 }}>Premium</span>
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-.03em", marginBottom: 14 }}>Mentoria Individual</h3>
              <p style={{ fontSize: 14, color: "var(--t2)", lineHeight: 1.75, marginBottom: 28 }}>
                Acompanhamento personalizado e exclusivo com a Luca Vespa. Estratégia, implementação e ajustes feitos sob medida para o seu negócio.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
                {["Sessões 1:1 com a Luca Vespa", "Estratégia 100% personalizada", "Acesso direto por WhatsApp", "Revisão de materiais e processos", "Tudo do nível em grupo"].map((f, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ color: "var(--gold-lt)", fontSize: 15, flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: 13, color: "var(--t2)" }}>{f}</span>
                  </div>
                ))}
              </div>
              <a href="https://linktree-lucavespaa.lovable.app/" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ width: "100%", justifyContent: "center", fontSize: 14 }}>Quero o individual →</a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ padding: "0 24px 120px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <div style={{ background: "rgba(201,162,39,.06)", border: "1px solid rgba(201,162,39,.2)", borderRadius: 24, padding: "60px 40px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center top, rgba(201,162,39,.1) 0%, transparent 70%)", pointerEvents: "none" }} />
            <div className="badge" style={{ marginBottom: 24 }}>Vamos conversar</div>
            <h2 style={{ fontSize: "clamp(26px, 4.5vw, 44px)", fontWeight: 900, letterSpacing: "-.04em", lineHeight: 1.1, marginBottom: 16 }}>
              Pronto para transformar<br /><span className="gold-text">seu negócio?</span>
            </h2>
            <p style={{ fontSize: 16, color: "var(--t2)", lineHeight: 1.7, marginBottom: 36 }}>
              Fale com a Luca Vespa e descubra qual nível faz mais sentido para o seu momento.
            </p>
            <a href="https://wa.me/5541987490574?text=Olá Luca! Quero saber mais sobre a mentoria" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: 15, padding: "16px 32px" }}>
              💬 Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,.06)", padding: "40px 48px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: 7, background: "linear-gradient(135deg, var(--gold-lt), var(--gold2))", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 12, color: "#000" }}>A</div>
              <span style={{ fontSize: 15, fontWeight: 900, letterSpacing: "-.03em" }}>Aurea<span className="gold-text">Group</span></span>
            </div>
            <p style={{ fontSize: 12, color: "var(--t3)", maxWidth: 300, lineHeight: 1.6 }}>Mentoria com Luca Vespa — CEO da Aurea Group.</p>
          </div>
          <a href="/" style={{ fontSize: 13, color: "var(--t3)", textDecoration: "none", fontWeight: 500, transition: "color .15s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--gold-lt)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--t3)")}>
            ← Voltar para o site
          </a>
          <p style={{ fontSize: 12, color: "var(--t3)" }}>© {new Date().getFullYear()} Aurea Group. Todos os direitos reservados.</p>
        </div>
      </footer>
    </>
  );
}
