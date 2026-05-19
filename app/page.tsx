"use client";
import { useState, useEffect } from "react";
import ProcessWheel from "./components/ProcessWheel";

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
  { v: "R$2M+", l: "em tráfego gerenciado",   count: 2,   prefix: "R$", suffix: "M+" },
  { v: "150+",  l: "leads qualificados/mês",   count: 150, prefix: "",   suffix: "+"  },
  { v: "98%",   l: "taxa de retenção",          count: 98,  prefix: "",   suffix: "%"  },
  { v: "3.2×",  l: "ROAS médio",               count: 3.2, prefix: "",   suffix: "×"  },
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

function tilt(e: React.MouseEvent<HTMLDivElement>) {
  const el = e.currentTarget;
  el.style.transition = "border-color .2s, box-shadow .2s";
  const r = el.getBoundingClientRect();
  const x = ((e.clientX - r.left) / r.width - 0.5) * 18;
  const y = ((e.clientY - r.top) / r.height - 0.5) * -18;
  el.style.transform = `perspective(700px) rotateX(${y}deg) rotateY(${x}deg) translateY(-5px)`;
  el.style.borderColor = "var(--bdr-gold)";
  el.style.boxShadow = "0 20px 60px rgba(201,162,39,.12)";
}
function resetTilt(e: React.MouseEvent<HTMLDivElement>) {
  const el = e.currentTarget;
  el.style.transition = "transform .5s cubic-bezier(.16,1,.3,1), border-color .3s, box-shadow .3s";
  el.style.transform = "";
  el.style.borderColor = "";
  el.style.boxShadow = "";
}

export default function Page() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    // ── Scroll reveal ────────────────────────────────
    const revealObs = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("visible"); revealObs.unobserve(e.target); }
      }),
      { threshold: 0.07, rootMargin: "0px 0px -48px 0px" }
    );
    document.querySelectorAll(".reveal").forEach(el => revealObs.observe(el));

    // ── Counter animation ────────────────────────────
    const counterObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target as HTMLElement;
        const target = parseFloat(el.dataset.count ?? "0");
        const prefix = el.dataset.prefix ?? "";
        const suffix = el.dataset.suffix ?? "";
        const isDecimal = !Number.isInteger(target);
        const duration = 2200;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 4);
          const v = target * eased;
          el.textContent = prefix + (isDecimal ? v.toFixed(1) : Math.floor(v)) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        counterObs.unobserve(el);
      });
    }, { threshold: 0.6 });
    document.querySelectorAll<HTMLElement>("[data-count]").forEach(el => counterObs.observe(el));

    // ── Hero parallax + scroll progress ─────────────
    const onScroll = () => {
      const sy = window.scrollY;

      // Hero fades & rises on scroll
      const hero = document.querySelector<HTMLElement>(".hero-section");
      if (hero) {
        const p = Math.min(sy / 480, 1);
        hero.style.transform = `translateY(${sy * 0.22}px)`;
        hero.style.opacity = `${1 - p * 0.75}`;
      }

      // Scroll progress bar
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const prog = docH > 0 ? sy / docH : 0;
      const bar = document.querySelector<HTMLElement>(".scroll-progress-bar");
      if (bar) bar.style.transform = `scaleX(${prog})`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // ── Magnetic buttons ─────────────────────────────
    type MagnetEntry = { el: HTMLElement; move: (e: MouseEvent) => void; leave: () => void };
    const magnets: MagnetEntry[] = [];
    document.querySelectorAll<HTMLElement>(".btn-primary, .btn-ghost").forEach(el => {
      const move = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        el.style.transition = "transform .1s ease, box-shadow .2s";
        el.style.transform = `translate(${dx * 0.3}px, ${dy * 0.3}px)`;
      };
      const leave = () => {
        el.style.transition = "transform .5s cubic-bezier(.16,1,.3,1), box-shadow .2s";
        el.style.transform = "";
      };
      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", leave);
      magnets.push({ el, move, leave });
    });

    return () => {
      revealObs.disconnect();
      counterObs.disconnect();
      window.removeEventListener("scroll", onScroll);
      magnets.forEach(({ el, move, leave }) => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <div className="scroll-progress-bar" />

      {/* Background effects */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,.022) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="orb-a" style={{ position: "absolute", width: 700, height: 700, borderRadius: "50%", background: "var(--gold)", filter: "blur(140px)", opacity: .1, top: -200, left: -150 }} />
        <div className="orb-b" style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "#3A7BD5", filter: "blur(130px)", opacity: .08, bottom: -100, right: -100 }} />
      </div>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(0,0,0,.75)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,.06)" }} className="nav-wrap">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src="/logo.jpg" alt="Aurea Group" style={{ width: 36, height: 36, borderRadius: 8, objectFit: "cover" }} />
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
          <a href="/mentoria" style={{ fontSize: 13, fontWeight: 700, color: "var(--gold-lt)", textDecoration: "none", transition: "color .15s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--gold-lt)")}>
            Mentoria ✦
          </a>
        </div>
        <a href="/falar" className="btn-primary hide-mobile" style={{ fontSize: 13, padding: "10px 20px", whiteSpace: "nowrap" }}>Falar com especialista →</a>
        <button className="show-mobile" onClick={() => setMobileMenu(!mobileMenu)} style={{ background: "none", border: "1px solid rgba(255,255,255,.12)", borderRadius: 8, padding: "8px 12px", cursor: "pointer", color: "#fff", fontSize: 18, lineHeight: 1 }}>
          {mobileMenu ? "✕" : "☰"}
        </button>
      </nav>

      {/* MOBILE MENU */}
      {mobileMenu && (
        <div style={{ position: "fixed", top: 68, left: 0, right: 0, zIndex: 99, background: "rgba(0,0,0,.96)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,.08)", padding: "24px 24px 32px", display: "flex", flexDirection: "column", gap: 0 }}>
          {["Serviços", "Processo", "Para Quem", "FAQ"].map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(" ", "-")}`} onClick={() => setMobileMenu(false)}
              style={{ fontSize: 16, fontWeight: 600, color: "var(--t2)", textDecoration: "none", padding: "16px 0", borderBottom: "1px solid rgba(255,255,255,.05)" }}>
              {l}
            </a>
          ))}
          <a href="/mentoria" onClick={() => setMobileMenu(false)}
            style={{ fontSize: 16, fontWeight: 700, color: "var(--gold-lt)", textDecoration: "none", padding: "16px 0", borderBottom: "1px solid rgba(255,255,255,.05)" }}>
            Mentoria ✦
          </a>
          <a href="/falar" className="btn-primary" onClick={() => setMobileMenu(false)}
            style={{ marginTop: 20, justifyContent: "center", fontSize: 15 }}>
            Falar com especialista →
          </a>
        </div>
      )}

      {/* HERO */}
      <section style={{ paddingTop: 160, paddingBottom: 100, textAlign: "center", position: "relative", zIndex: 1 }}>
        <div className="hero-section" style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px" }}>
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
            <a href="/falar" className="btn-primary">Quero uma proposta gratuita →</a>
            <a href="#servicos" className="btn-ghost">Ver serviços</a>
          </div>

          {/* Hero visual — metrics mockup */}
          <div className="fade-up d4" style={{ marginTop: 64, position: "relative" }}>
            <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 20, padding: "28px 32px", maxWidth: 680, margin: "0 auto", backdropFilter: "blur(10px)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: "var(--t3)", letterSpacing: ".06em", textTransform: "uppercase" }}>Performance — últimos 30 dias</span>
                <span style={{ fontSize: 11, background: "rgba(76,175,134,.1)", color: "#4CAF86", border: "1px solid rgba(76,175,134,.2)", borderRadius: 99, padding: "3px 10px", fontWeight: 700 }}>● Ao vivo</span>
              </div>
              <div className="metrics-grid">
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
        <div className="stats-grid">
          {STATS.map((s, i) => (
            <div key={i} className={`stat-item reveal reveal-d${i + 1}`}>
              <div className="gold-text" data-count={s.count} data-prefix={s.prefix} data-suffix={s.suffix} style={{ fontSize: 40, fontWeight: 900, letterSpacing: "-.04em", lineHeight: 1 }}>{s.v}</div>
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
                  style={{ height: 80, maxWidth: 260, objectFit: "contain", filter: "grayscale(1) brightness(1.8)", opacity: .6, transition: "opacity .2s, filter .2s" }}
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
          <div className="reveal" style={{ textAlign: "center", marginBottom: 60 }}>
            <div className="badge" style={{ marginBottom: 20 }}>Serviços</div>
            <h2 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900, letterSpacing: "-.04em", lineHeight: 1.1, marginBottom: 16 }}>
              Tudo que você precisa<br /><span className="gold-text">para crescer de verdade</span>
            </h2>
            <p style={{ fontSize: 16, color: "var(--t2)", maxWidth: 520, margin: "0 auto" }}>
              Combinamos estratégia, tecnologia e inteligência artificial para criar um sistema de aquisição que funciona no piloto automático.
            </p>
          </div>
          <div className="grid-3">
            {SERVICES.map((s, i) => (
              <div key={i} className={`glass-card reveal reveal-d${(i % 3) + 1}`} style={{ padding: 28 }}
                onMouseMove={tilt} onMouseLeave={resetTilt}>
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

      {/* PROCESS — 3D wheel */}
      <ProcessWheel items={PROCESS} />

      {/* FOR WHOM */}
      <section id="para-quem" style={{ padding: "80px 0", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <div className="reveal" style={{ textAlign: "center", marginBottom: 60 }}>
            <div className="badge" style={{ marginBottom: 20 }}>Para Quem</div>
            <h2 style={{ fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 900, letterSpacing: "-.04em", lineHeight: 1.1, marginBottom: 16 }}>
              Feito para quem quer<br /><span className="gold-text">crescer com consistência</span>
            </h2>
          </div>
          <div className="grid-3">
            {FOR_WHOM.map((f, i) => (
              <div key={i} className={`glass-card reveal reveal-d${(i % 3) + 1}`} style={{ padding: 24, display: "flex", gap: 18, alignItems: "flex-start" }}
                onMouseMove={tilt} onMouseLeave={resetTilt}>
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
          <div className="reveal" style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="badge" style={{ marginBottom: 20 }}>Diferenciais</div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, letterSpacing: "-.04em", lineHeight: 1.1 }}>
              Somos diferentes.<br /><span className="gold-text">Isso é um fato.</span>
            </h2>
          </div>
          <div className="table-scroll reveal reveal-d2" style={{ border: "1px solid rgba(255,255,255,.07)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", background: "rgba(255,255,255,.025)", minWidth: 480 }}>
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
        <div className="reveal" style={{ textAlign: "center", marginBottom: 48, padding: "0 24px" }}>
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
          <div className="reveal" style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="badge" style={{ marginBottom: 20 }}>FAQ</div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, letterSpacing: "-.04em" }}>
              Perguntas <span className="gold-text">frequentes</span>
            </h2>
          </div>
          <div className="reveal reveal-d2">
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
          <div className="cta-box reveal" style={{ background: "rgba(201,162,39,.06)", border: "1px solid rgba(201,162,39,.2)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center top, rgba(201,162,39,.1) 0%, transparent 70%)", pointerEvents: "none" }} />
            <div className="badge" style={{ marginBottom: 24 }}>Vamos conversar</div>
            <h2 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900, letterSpacing: "-.04em", lineHeight: 1.1, marginBottom: 16 }}>
              Pronto para escalar<br /><span className="gold-text">seu negócio?</span>
            </h2>
            <p style={{ fontSize: 16, color: "var(--t2)", lineHeight: 1.7, marginBottom: 36 }}>
              Diagnóstico 100% gratuito. Sem compromisso. Resposta em até 1 hora.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="https://wa.me/5541987850818?text=Olá! Quero um diagnóstico gratuito" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: 15, padding: "16px 32px" }}>
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
      <footer style={{ borderTop: "1px solid rgba(255,255,255,.06)", padding: "40px 24px", position: "relative", zIndex: 1 }}>
        <div className="footer-flex">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <img src="/logo.jpg" alt="Aurea Group" style={{ width: 28, height: 28, borderRadius: 7, objectFit: "cover" }} />
              <span style={{ fontSize: 15, fontWeight: 900, letterSpacing: "-.03em" }}>Aurea<span className="gold-text">Group</span></span>
            </div>
            <p style={{ fontSize: 12, color: "var(--t3)", maxWidth: 300, lineHeight: 1.6 }}>Tráfego pago e IA para negócios que querem crescer de verdade.</p>
          </div>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
            <a href="/mentoria" style={{ fontSize: 13, color: "var(--gold-lt)", textDecoration: "none", fontWeight: 700, transition: "color .15s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--gold-lt)")}>
              Mentoria ✦
            </a>
            {[
              { l: "Instagram", h: "#" },
              { l: "LinkedIn", h: "#" },
              { l: "WhatsApp", h: "https://wa.me/5541987850818" },
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
