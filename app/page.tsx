"use client";
import { useState } from "react";

const SERVICES = [
  {
    icon: "◈",
    title: "Meta Ads",
    desc: "Campanhas estratégicas no Facebook e Instagram com segmentação precisa e criativos que convertem. Gerenciamos do zero ao escala.",
    tags: ["Campanhas", "Criativos", "Remarketing", "A/B Test"],
  },
  {
    icon: "⊕",
    title: "Google Ads",
    desc: "Apareça no momento certo para quem já está procurando o que você oferece. Search, Display, Shopping e YouTube.",
    tags: ["Search", "Display", "Shopping", "YouTube"],
  },
  {
    icon: "✦",
    title: "Agente IA no WhatsApp",
    desc: "Seu consultor de vendas disponível 24h. Qualifica leads, responde dúvidas, agenda reuniões e fecha negócios automaticamente.",
    tags: ["Qualificação", "Agendamento", "CRM", "24/7"],
  },
  {
    icon: "⬡",
    title: "Automações & Integrações",
    desc: "Conectamos suas ferramentas e eliminamos trabalho repetitivo. Funis automatizados que nutrem leads enquanto você foca no que importa.",
    tags: ["Funis", "E-mail", "Integrações", "Workflows"],
  },
  {
    icon: "◉",
    title: "CRM Inteligente",
    desc: "Dashboard exclusivo com pipeline de vendas, gestão de leads e análise de performance. Tudo em tempo real, tudo integrado.",
    tags: ["Pipeline", "Leads", "Analytics", "Relatórios"],
  },
  {
    icon: "△",
    title: "Consultoria Estratégica",
    desc: "Diagnóstico completo do seu negócio, benchmarking de mercado e roadmap de crescimento com foco em ROI mensurável.",
    tags: ["Diagnóstico", "ROI", "Estratégia", "KPIs"],
  },
];

const PROCESS = [
  { num: "01", title: "Diagnóstico Gratuito", time: "1 hora", desc: "Entendemos seu negócio, público, concorrência e objetivos. Sem compromisso, 100% gratuito." },
  { num: "02", title: "Proposta Personalizada", time: "24-48h", desc: "Estratégia sob medida com metas claras, investimento definido e expectativas reais." },
  { num: "03", title: "Kick-off & Onboarding", time: "1 semana", desc: "Configuração completa de contas, pixels, integrações e treinamento do agente IA." },
  { num: "04", title: "Execução & Otimização", time: "Contínuo", desc: "Gestão ativa das campanhas com otimizações diárias baseadas em dados reais." },
  { num: "05", title: "Relatórios Semanais", time: "Todo domingo", desc: "Relatório completo de performance com análise IA e próximas ações já planejadas." },
];

const FOR_WHOM = [
  { icon: "🛍️", title: "E-commerce", desc: "Reduza o CAC e aumente o ROAS com campanhas de produto e remarketing inteligente." },
  { icon: "🎓", title: "Infoprodutores", desc: "Lançamentos, perpétuos e eventos com tráfego qualificado e automação de vendas." },
  { icon: "🏥", title: "Clínicas & Consultórios", desc: "Agenda sempre cheia com leads qualificados e agendamento automático pelo WhatsApp." },
  { icon: "🏠", title: "Imobiliárias", desc: "Captação de compradores e locatários com segmentação geográfica e perfil de renda." },
  { icon: "🏪", title: "Negócios Locais", desc: "Apareça para quem está perto e pronto para comprar. Tráfego local de alta conversão." },
  { icon: "🚀", title: "Startups & SaaS", desc: "Crescimento previsível com funis de aquisição escaláveis e métricas de produto." },
];

const FAQS = [
  { q: "Quanto tempo para ver resultados?", a: "Os primeiros resultados costumam aparecer entre 15 e 30 dias após o início das campanhas. Resultados consistentes e escaláveis geralmente se consolidam entre o 2º e 3º mês, conforme otimizamos com base nos dados reais do seu público." },
  { q: "Qual o investimento mínimo em tráfego pago?", a: "Recomendamos um investimento mínimo de R$1.500/mês em mídia (verba de anúncios). Esse valor é pago diretamente às plataformas (Meta/Google). Nossa gestão é cobrada separadamente." },
  { q: "Como funciona o agente de IA no WhatsApp?", a: "O agente é treinado com informações do seu negócio e opera 24h por dia. Ele qualifica leads, responde dúvidas, agenda reuniões no Google Calendar e notifica sua equipe quando um cliente está pronto para fechar. Quando necessário, transfere para um humano com todo o contexto da conversa." },
  { q: "Preciso ter experiência com marketing digital?", a: "Não. Cuidamos de tudo — estratégia, execução e relatórios. Você recebe atualizações semanais em linguagem simples, com foco nos números que realmente importam para o seu negócio." },
  { q: "Trabalham com contrato de fidelidade?", a: "Não exigimos fidelidade. Acreditamos que o resultado é o melhor argumento para a continuidade. Trabalhamos com contratos mensais renováveis e período de aviso prévio de 30 dias." },
  { q: "Atendem empresas de qualquer segmento?", a: "Atendemos a maioria dos segmentos B2C e B2B. Temos expertise especial em e-commerce, saúde, educação, imóveis e serviços. Agende um diagnóstico para entendermos se fazemos sentido para o seu negócio." },
];

const TESTIMONIALS = [
  { name: "Carlos Mendes", role: "CEO — E-commerce de Moda", text: "Em 45 dias o ROAS passou de 1.8x para 3.4x. O agente de WhatsApp qualifica os leads que chegam dos anúncios e já vendemos 3 pedidos grandes sem intervenção humana." },
  { name: "Ana Beatriz", role: "Fundadora — Clínica Estética", text: "A agenda estava sempre com buracos. Hoje está cheia com 2 semanas de antecedência. O agente IA agenda direto no Google Calendar e avisa a equipe." },
  { name: "Rafael Torres", role: "Diretor — Imobiliária", text: "Deixamos de perder leads fora do horário comercial. O agente qualifica, entende a necessidade e já manda uma seleção de imóveis. A taxa de visitas agendadas triplicou." },
  { name: "Juliana Costa", role: "Sócia — Infoprodutora", text: "Meu lançamento bateu R$180k em 7 dias. A automação de WhatsApp seguiu os leads quentes em tempo real enquanto eu estava no palco apresentando." },
  { name: "Marcos Oliveira", role: "Fundador — SaaS B2B", text: "CAC caiu 38% em dois meses. O funil automatizado nutre os leads por semanas antes de passar para o time comercial — eles chegam muito mais prontos." },
  { name: "Fernanda Lima", role: "Diretora — Rede de Franquias", text: "Gerenciar anúncios de 12 unidades era um caos. Agora temos relatório semanal unificado e cada franqueado vê sua performance em tempo real." },
];

const STATS = [
  { v: "R$2M+", l: "em tráfego gerenciado" },
  { v: "150+", l: "leads qualificados/mês" },
  { v: "98%", l: "taxa de retenção" },
  { v: "3.2×", l: "ROAS médio" },
];

const CLIENTS = [
  { name: "Ademicon",  file: "ademicon logo.PNG"  },
  { name: "Nissei",    file: "nissei logo.PNG"    },
  { name: "Lavish",    file: "lavish logo.PNG"    },
  { name: "Vespinha",  file: "vespinha logo.PNG"  },
  { name: "Maaniam",   file: "maaniam logo.PNG"   },
  { name: "Grove",     file: "grove logo.PNG"     },
  { name: "Folha",     file: "folha logo.PNG"     },
  { name: "Ramon",     file: "ramon logo.PNG"     },
  { name: "Hawkinds",  file: "hawkinds logo.PNG"  },
  { name: "Vespa",     file: "vespa logo.PNG"     },
];

export default function Page() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* Background effects */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,.022) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div style={{ position: "absolute", width: 700, height: 700, borderRadius: "50%", background: "var(--gold)", filter: "blur(140px)", opacity: .1, top: -200, left: -150 }} />
        <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "#3A7BD5", filter: "blur(130px)", opacity: .08, bottom: -100, right: -100 }} />
      </div>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 48px", height: 68, background: "rgba(0,0,0,.75)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, var(--gold-lt), var(--gold2))", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 14, color: "#000" }}>A</div>
          <span style={{ fontSize: 17, fontWeight: 900, letterSpacing: "-.03em" }}>Aurea<span className="gold-text">Group</span></span>
        </div>
        <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {["Serviços", "Processo", "Para Quem", "FAQ"].map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(" ", "-")}`} style={{ fontSize: 13, fontWeight: 500, color: "var(--t2)", textDecoration: "none", transition: "color .15s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--t2)")}>
              {l}
            </a>
          ))}
        </div>
        <a href="https://linktree-lucavespaa.lovable.app/" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: 13, padding: "10px 20px" }}>Falar com especialista →</a>
      </nav>

      {/* HERO */}
      <section style={{ paddingTop: 160, paddingBottom: 100, textAlign: "center", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px" }}>
          <div className="badge fade-up" style={{ marginBottom: 28 }}>
            <span className="badge-dot" /> Agência de performance & IA
          </div>
          <h1 className="fade-up d1" style={{ fontSize: "clamp(40px, 7vw, 76px)", fontWeight: 900, lineHeight: 1.08, letterSpacing: "-.04em", marginBottom: 24 }}>
            Tráfego pago e IA<br />
            <span className="gold-text">que vendem enquanto</span><br />
            você dorme
          </h1>
          <p className="fade-up d2" style={{ fontSize: 18, color: "var(--t2)", lineHeight: 1.7, maxWidth: 580, margin: "0 auto 40px", fontWeight: 400 }}>
            Automatizamos sua aquisição de clientes com campanhas de alta performance e inteligência artificial. Do lead ao fechamento, tudo conectado.
          </p>
          <div className="fade-up d3" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://linktree-lucavespaa.lovable.app/" target="_blank" rel="noopener noreferrer" className="btn-primary">Quero uma proposta gratuita →</a>
            <a href="#servicos" className="btn-ghost">Ver serviços</a>
          </div>

          {/* Hero visual — metrics mockup */}
          <div className="fade-up d4" style={{ marginTop: 64, position: "relative" }}>
            <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 20, padding: "28px 32px", maxWidth: 680, margin: "0 auto", backdropFilter: "blur(10px)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: "var(--t3)", letterSpacing: ".06em", textTransform: "uppercase" }}>Performance — últimos 30 dias</span>
                <span style={{ fontSize: 11, background: "rgba(76,175,134,.1)", color: "#4CAF86", border: "1px solid rgba(76,175,134,.2)", borderRadius: 99, padding: "3px 10px", fontWeight: 700 }}>● Ao vivo</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
                {[
                  { l: "Investido", v: "R$12.400", c: "var(--t2)" },
                  { l: "Receita gerada", v: "R$39.680", c: "var(--gold-lt)" },
                  { l: "ROAS", v: "3.2×", c: "#4CAF86" },
                  { l: "Leads", v: "284", c: "var(--cold, #5A9BC8)" },
                ].map(m => (
                  <div key={m.l} style={{ textAlign: "left" }}>
                    <div style={{ fontSize: 10, color: "var(--t3)", fontWeight: 600, letterSpacing: ".04em", textTransform: "uppercase", marginBottom: 6 }}>{m.l}</div>
                    <div style={{ fontSize: 22, fontWeight: 900, color: m.c, letterSpacing: "-.03em" }}>{m.v}</div>
                  </div>
                ))}
              </div>
              {/* Mini bar chart */}
              <div style={{ marginTop: 20, display: "flex", alignItems: "flex-end", gap: 4, height: 48 }}>
                {[30, 45, 38, 60, 52, 70, 65, 80, 72, 90, 85, 100, 92, 88].map((h, i) => (
                  <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: "3px 3px 1px 1px", background: i === 13 ? "linear-gradient(to top, var(--gold), var(--gold-lt))" : "rgba(201,162,39,.2)", boxShadow: i === 13 ? "0 0 12px rgba(201,162,39,.4)" : "none" }} />
                ))}
              </div>
            </div>
            {/* Glow under card */}
            <div style={{ position: "absolute", bottom: -40, left: "50%", transform: "translateX(-50%)", width: 400, height: 60, background: "var(--gold)", filter: "blur(60px)", opacity: .12, pointerEvents: "none" }} />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: "40px 0 80px", position: "relative", zIndex: 1 }}>
        <div className="divider" style={{ marginBottom: 60 }} />
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0 }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ textAlign: "center", borderRight: i < 3 ? "1px solid rgba(255,255,255,.06)" : "none", padding: "0 24px" }}>
              <div className="gold-text" style={{ fontSize: 40, fontWeight: 900, letterSpacing: "-.04em", lineHeight: 1 }}>{s.v}</div>
              <div style={{ fontSize: 13, color: "var(--t2)", marginTop: 8, fontWeight: 500 }}>{s.l}</div>
            </div>
          ))}
        </div>
        <div className="divider" style={{ marginTop: 60 }} />
      </section>

      {/* TICKER — Clientes */}
      <section style={{ padding: "0 0 80px", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <span style={{ fontSize: 11, color: "var(--t3)", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase" }}>Empresas que confiam na Aurea Group</span>
        </div>
        <div className="ticker-wrap">
          <div className="ticker">
            {[...CLIENTS, ...CLIENTS].map((c, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", padding: "0 40px", borderRight: "1px solid rgba(255,255,255,.05)" }}>
                <img
                  src={`/clients/${c.file}`}
                  alt={c.name}
                  style={{ height: 40, maxWidth: 130, objectFit: "contain", filter: "grayscale(1) brightness(1.8)", opacity: .6, transition: "opacity .2s, filter .2s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.filter = "grayscale(0)"; (e.currentTarget as HTMLImageElement).style.opacity = "1"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.filter = "grayscale(1) brightness(1.8)"; (e.currentTarget as HTMLImageElement).style.opacity = ".6"; }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="serviços" style={{ padding: "80px 0", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div className="badge" style={{ marginBottom: 20 }}>Serviços</div>
            <h2 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900, letterSpacing: "-.04em", lineHeight: 1.1, marginBottom: 16 }}>
              Tudo que você precisa<br /><span className="gold-text">para crescer de verdade</span>
            </h2>
            <p style={{ fontSize: 16, color: "var(--t2)", maxWidth: 520, margin: "0 auto" }}>
              Combinamos estratégia, tecnologia e inteligência artificial para criar um sistema de aquisição que funciona no piloto automático.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {SERVICES.map((s, i) => (
              <div key={i} className="glass-card" style={{ padding: 28 }}>
                <div style={{ fontSize: 28, marginBottom: 16, color: "var(--gold-lt)" }}>{s.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-.02em", marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: "var(--t2)", lineHeight: 1.7, marginBottom: 20 }}>{s.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {s.tags.map(t => (
                    <span key={t} style={{ fontSize: 10, fontWeight: 700, color: "var(--t3)", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 99, padding: "3px 10px", letterSpacing: ".02em" }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="processo" style={{ padding: "80px 0", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
          <div>
            <div className="badge" style={{ marginBottom: 20 }}>Processo</div>
            <h2 style={{ fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 900, letterSpacing: "-.04em", lineHeight: 1.1, marginBottom: 20 }}>
              Do diagnóstico<br /><span className="gold-text">ao resultado</span>
            </h2>
            <p style={{ fontSize: 15, color: "var(--t2)", lineHeight: 1.7, marginBottom: 32 }}>
              Um processo claro, transparente e orientado a resultados. Sem surpresas, sem promessas vazias — só dados e entregas concretas.
            </p>
            <a href="https://linktree-lucavespaa.lovable.app/" target="_blank" rel="noopener noreferrer" className="btn-primary">Começar agora →</a>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {PROCESS.map((p, i) => (
              <div key={i} style={{ display: "flex", gap: 20, position: "relative" }}>
                {i < PROCESS.length - 1 && (
                  <div style={{ position: "absolute", left: 19, top: 44, bottom: -32, width: 1, background: "linear-gradient(to bottom, rgba(201,162,39,.25), transparent)" }} />
                )}
                <div style={{ width: 40, height: 40, borderRadius: 10, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(201,162,39,.08)", border: "1px solid rgba(201,162,39,.22)", fontSize: 12, fontWeight: 800, color: "var(--gold-lt)" }}>{p.num}</div>
                <div style={{ flex: 1, paddingTop: 2 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                    <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-.02em" }}>{p.title}</span>
                    <span style={{ fontSize: 10, color: "var(--gold-lt)", background: "rgba(201,162,39,.08)", border: "1px solid rgba(201,162,39,.15)", borderRadius: 99, padding: "2px 8px", fontWeight: 700, flexShrink: 0 }}>{p.time}</span>
                  </div>
                  <p style={{ fontSize: 13, color: "var(--t2)", lineHeight: 1.65 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOR WHOM */}
      <section id="para-quem" style={{ padding: "80px 0", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div className="badge" style={{ marginBottom: 20 }}>Para Quem</div>
            <h2 style={{ fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 900, letterSpacing: "-.04em", lineHeight: 1.1, marginBottom: 16 }}>
              Feito para quem quer<br /><span className="gold-text">crescer com consistência</span>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {FOR_WHOM.map((f, i) => (
              <div key={i} className="glass-card" style={{ padding: 24, display: "flex", gap: 18, alignItems: "flex-start" }}>
                <div style={{ fontSize: 28, flexShrink: 0 }}>{f.icon}</div>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-.01em", marginBottom: 8 }}>{f.title}</h3>
                  <p style={{ fontSize: 13, color: "var(--t2)", lineHeight: 1.65 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section style={{ padding: "80px 0", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="badge" style={{ marginBottom: 20 }}>Diferenciais</div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, letterSpacing: "-.04em", lineHeight: 1.1 }}>
              Somos diferentes.<br /><span className="gold-text">Isso é um fato.</span>
            </h2>
          </div>
          <div style={{ background: "rgba(255,255,255,.025)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 16, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,.07)" }}>
                  <th style={{ padding: "16px 24px", textAlign: "left", fontSize: 13, color: "var(--t2)", fontWeight: 600 }}>Critério</th>
                  <th style={{ padding: "16px 24px", textAlign: "center", fontSize: 13, fontWeight: 800, color: "var(--gold-lt)" }}>Aurea Group</th>
                  <th style={{ padding: "16px 24px", textAlign: "center", fontSize: 13, color: "var(--t3)", fontWeight: 600 }}>Agências tradicionais</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Relatório semanal de resultados", true, false],
                  ["Agente IA integrado ao WhatsApp", true, false],
                  ["CRM próprio e exclusivo", true, false],
                  ["Sem contrato de fidelidade", true, false],
                  ["Atendimento no mesmo dia", true, false],
                  ["Estratégia baseada em dados reais", true, "Parcial"],
                  ["Equipe dedicada ao seu negócio", true, false],
                ].map(([c, a, t], i) => (
                  <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,.04)" }}>
                    <td style={{ padding: "14px 24px", fontSize: 13, color: "var(--t2)" }}>{c as string}</td>
                    <td style={{ padding: "14px 24px", textAlign: "center", fontSize: 16 }}>
                      {a === true ? <span style={{ color: "#4CAF86" }}>✓</span> : <span style={{ color: "var(--t3)" }}>✕</span>}
                    </td>
                    <td style={{ padding: "14px 24px", textAlign: "center", fontSize: t === "Parcial" ? 12 : 16 }}>
                      {t === true ? <span style={{ color: "#4CAF86" }}>✓</span> : t === "Parcial" ? <span style={{ color: "var(--gold)", fontWeight: 700 }}>Parcial</span> : <span style={{ color: "var(--t3)" }}>✕</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "80px 0", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: 48, padding: "0 24px" }}>
          <div className="badge" style={{ marginBottom: 20 }}>Depoimentos</div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, letterSpacing: "-.04em", lineHeight: 1.1 }}>
            O que nossos clientes<br /><span className="gold-text">estão dizendo</span>
          </h2>
        </div>
        <div>
          <div className="ticker-wrap">
            <div className="ticker-slow">
              {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
                <div key={i} className="glass-card" style={{ width: 380, flexShrink: 0, padding: 28, margin: "0 8px" }}>
                  <div style={{ display: "flex", gap: 2, marginBottom: 16 }}>
                    {[1,2,3,4,5].map(s => <span key={s} style={{ color: "var(--gold-lt)", fontSize: 14 }}>★</span>)}
                  </div>
                  <p style={{ fontSize: 14, color: "var(--t2)", lineHeight: 1.7, marginBottom: 20, fontStyle: "italic" }}>&ldquo;{t.text}&rdquo;</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,.06)" }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, var(--gold-lt), var(--gold2))", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, color: "#000", flexShrink: 0 }}>{t.name[0]}</div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700 }}>{t.name}</div>
                      <div style={{ fontSize: 11, color: "var(--t3)" }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: "80px 0", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="badge" style={{ marginBottom: 20 }}>FAQ</div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, letterSpacing: "-.04em" }}>
              Perguntas <span className="gold-text">frequentes</span>
            </h2>
          </div>
          <div>
            {FAQS.map((f, i) => (
              <div key={i} className="faq-item">
                <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{f.q}</span>
                  <span className={`faq-icon${openFaq === i ? " open" : ""}`}>+</span>
                </button>
                {openFaq === i && <p className="faq-a">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="contato" style={{ padding: "80px 24px 120px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <div style={{ background: "rgba(201,162,39,.06)", border: "1px solid rgba(201,162,39,.2)", borderRadius: 24, padding: "60px 40px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center top, rgba(201,162,39,.1) 0%, transparent 70%)", pointerEvents: "none" }} />
            <div className="badge" style={{ marginBottom: 24 }}>Vamos conversar</div>
            <h2 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900, letterSpacing: "-.04em", lineHeight: 1.1, marginBottom: 16 }}>
              Pronto para escalar<br /><span className="gold-text">seu negócio?</span>
            </h2>
            <p style={{ fontSize: 16, color: "var(--t2)", lineHeight: 1.7, marginBottom: 36 }}>
              Diagnóstico 100% gratuito. Sem compromisso. Resposta em até 1 hora.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="https://wa.me/5541987490574?text=Olá! Quero um diagnóstico gratuito" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: 15, padding: "16px 32px" }}>
                💬 Falar no WhatsApp
              </a>
              <a href="mailto:contato@aureagroup.com.br" className="btn-ghost" style={{ fontSize: 15, padding: "16px 32px" }}>
                Enviar e-mail
              </a>
            </div>
            <p style={{ marginTop: 20, fontSize: 12, color: "var(--t3)" }}>Atendemos de segunda a sexta, das 9h às 18h (Brasília)</p>
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
            <p style={{ fontSize: 12, color: "var(--t3)", maxWidth: 300, lineHeight: 1.6 }}>Tráfego pago e IA para negócios que querem crescer de verdade.</p>
          </div>
          <div style={{ display: "flex", gap: 32 }}>
            {[
              { l: "Instagram", h: "#" },
              { l: "LinkedIn", h: "#" },
              { l: "WhatsApp", h: "https://wa.me/5541987490574" },
            ].map(s => (
              <a key={s.l} href={s.h} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: "var(--t3)", textDecoration: "none", fontWeight: 500, transition: "color .15s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--gold-lt)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--t3)")}>
                {s.l}
              </a>
            ))}
          </div>
          <p style={{ fontSize: 12, color: "var(--t3)" }}>© {new Date().getFullYear()} Aurea Group. Todos os direitos reservados.</p>
        </div>
      </footer>
    </>
  );
}
