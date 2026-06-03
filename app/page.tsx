"use client";
import { useState, useEffect } from "react";
import ProcessWheel from "./components/ProcessWheel";
import FlyInGrid    from "./components/FlyInGrid";

const SERVICES = [
  {
    icon: "â—ˆ",
    title: "Meta Ads",
    desc: "Campanhas estratÃ©gicas no Facebook e Instagram com segmentaÃ§Ã£o precisa e criativos que convertem. Gerenciamos do zero ao escala.",
    tags: ["Campanhas", "Criativos", "Remarketing", "A/B Test"],
  },
  {
    icon: "âŠ•",
    title: "Google Ads",
    desc: "ApareÃ§a no momento certo para quem jÃ¡ estÃ¡ procurando o que vocÃª oferece. Search, Display, Shopping e YouTube.",
    tags: ["Search", "Display", "Shopping", "YouTube"],
  },
  {
    icon: "âœ¦",
    title: "Agente IA no WhatsApp",
    desc: "Seu consultor de vendas disponÃ­vel 24h. Qualifica leads, responde dÃºvidas, agenda reuniÃµes e fecha negÃ³cios automaticamente.",
    tags: ["QualificaÃ§Ã£o", "Agendamento", "CRM", "24/7"],
  },
  {
    icon: "â¬¡",
    title: "AutomaÃ§Ãµes & IntegraÃ§Ãµes",
    desc: "Conectamos suas ferramentas e eliminamos trabalho repetitivo. Funis automatizados que nutrem leads enquanto vocÃª foca no que importa.",
    tags: ["Funis", "E-mail", "IntegraÃ§Ãµes", "Workflows"],
  },
  {
    icon: "â—‰",
    title: "CRM Inteligente",
    desc: "Dashboard exclusivo com pipeline de vendas, gestÃ£o de leads e anÃ¡lise de performance. Tudo em tempo real, tudo integrado.",
    tags: ["Pipeline", "Leads", "Analytics", "RelatÃ³rios"],
  },
  {
    icon: "â–³",
    title: "Consultoria EstratÃ©gica",
    desc: "DiagnÃ³stico completo do seu negÃ³cio, benchmarking de mercado e roadmap de crescimento com foco em ROI mensurÃ¡vel.",
    tags: ["DiagnÃ³stico", "ROI", "EstratÃ©gia", "KPIs"],
  },
];

const PROCESS = [
  { num: "01", title: "DiagnÃ³stico Gratuito", time: "1 hora", desc: "Entendemos seu negÃ³cio, pÃºblico, concorrÃªncia e objetivos. Sem compromisso, 100% gratuito." },
  { num: "02", title: "Proposta Personalizada", time: "24-48h", desc: "EstratÃ©gia sob medida com metas claras, investimento definido e expectativas reais." },
  { num: "03", title: "Kick-off & Onboarding", time: "1 semana", desc: "ConfiguraÃ§Ã£o completa de contas, pixels, integraÃ§Ãµes e treinamento do agente IA." },
  { num: "04", title: "ExecuÃ§Ã£o & OtimizaÃ§Ã£o", time: "ContÃ­nuo", desc: "GestÃ£o ativa das campanhas com otimizaÃ§Ãµes diÃ¡rias baseadas em dados reais." },
  { num: "05", title: "RelatÃ³rios Semanais", time: "Todo domingo", desc: "RelatÃ³rio completo de performance com anÃ¡lise IA e prÃ³ximas aÃ§Ãµes jÃ¡ planejadas." },
];

const FOR_WHOM = [
  { icon: "ðŸ›ï¸", title: "E-commerce", desc: "Reduza o CAC e aumente o ROAS com campanhas de produto e remarketing inteligente." },
  { icon: "ðŸŽ“", title: "Infoprodutores", desc: "LanÃ§amentos, perpÃ©tuos e eventos com trÃ¡fego qualificado e automaÃ§Ã£o de vendas." },
  { icon: "ðŸ¥", title: "ClÃ­nicas & ConsultÃ³rios", desc: "Agenda sempre cheia com leads qualificados e agendamento automÃ¡tico pelo WhatsApp." },
  { icon: "ðŸ ", title: "ImobiliÃ¡rias", desc: "CaptaÃ§Ã£o de compradores e locatÃ¡rios com segmentaÃ§Ã£o geogrÃ¡fica e perfil de renda." },
  { icon: "ðŸª", title: "NegÃ³cios Locais", desc: "ApareÃ§a para quem estÃ¡ perto e pronto para comprar. TrÃ¡fego local de alta conversÃ£o." },
  { icon: "ðŸš€", title: "Startups & SaaS", desc: "Crescimento previsÃ­vel com funis de aquisiÃ§Ã£o escalÃ¡veis e mÃ©tricas de produto." },
];

const FAQS = [
  { q: "Quanto tempo para ver resultados?", a: "Os primeiros resultados costumam aparecer entre 15 e 30 dias apÃ³s o inÃ­cio das campanhas. Resultados consistentes e escalÃ¡veis geralmente se consolidam entre o 2Âº e 3Âº mÃªs, conforme otimizamos com base nos dados reais do seu pÃºblico." },
  { q: "Qual o investimento mÃ­nimo em trÃ¡fego pago?", a: "Recomendamos um investimento mÃ­nimo de R$1.500/mÃªs em mÃ­dia (verba de anÃºncios). Esse valor Ã© pago diretamente Ã s plataformas (Meta/Google). Nossa gestÃ£o Ã© cobrada separadamente." },
  { q: "Como funciona o agente de IA no WhatsApp?", a: "O agente Ã© treinado com informaÃ§Ãµes do seu negÃ³cio e opera 24h por dia. Ele qualifica leads, responde dÃºvidas, agenda reuniÃµes no Google Calendar e notifica sua equipe quando um cliente estÃ¡ pronto para fechar. Quando necessÃ¡rio, transfere para um humano com todo o contexto da conversa." },
  { q: "Preciso ter experiÃªncia com marketing digital?", a: "NÃ£o. Cuidamos de tudo â€” estratÃ©gia, execuÃ§Ã£o e relatÃ³rios. VocÃª recebe atualizaÃ§Ãµes semanais em linguagem simples, com foco nos nÃºmeros que realmente importam para o seu negÃ³cio." },
  { q: "Trabalham com contrato de fidelidade?", a: "NÃ£o exigimos fidelidade. Acreditamos que o resultado Ã© o melhor argumento para a continuidade. Trabalhamos com contratos mensais renovÃ¡veis e perÃ­odo de aviso prÃ©vio de 30 dias." },
  { q: "Atendem empresas de qualquer segmento?", a: "Atendemos a maioria dos segmentos B2C e B2B. Temos expertise especial em e-commerce, saÃºde, educaÃ§Ã£o, imÃ³veis e serviÃ§os. Agende um diagnÃ³stico para entendermos se fazemos sentido para o seu negÃ³cio." },
];

const TESTIMONIALS = [
  { name: "Carlos Mendes", role: "CEO â€” E-commerce de Moda", text: "Em 45 dias o ROAS passou de 1.8x para 3.4x. O agente de WhatsApp qualifica os leads que chegam dos anÃºncios e jÃ¡ vendemos 3 pedidos grandes sem intervenÃ§Ã£o humana." },
  { name: "Ana Beatriz", role: "Fundadora â€” ClÃ­nica EstÃ©tica", text: "A agenda estava sempre com buracos. Hoje estÃ¡ cheia com 2 semanas de antecedÃªncia. O agente IA agenda direto no Google Calendar e avisa a equipe." },
  { name: "Rafael Torres", role: "Diretor â€” ImobiliÃ¡ria", text: "Deixamos de perder leads fora do horÃ¡rio comercial. O agente qualifica, entende a necessidade e jÃ¡ manda uma seleÃ§Ã£o de imÃ³veis. A taxa de visitas agendadas triplicou." },
  { name: "Juliana Costa", role: "SÃ³cia â€” Infoprodutora", text: "Meu lanÃ§amento bateu R$180k em 7 dias. A automaÃ§Ã£o de WhatsApp seguiu os leads quentes em tempo real enquanto eu estava no palco apresentando." },
  { name: "Marcos Oliveira", role: "Fundador â€” SaaS B2B", text: "CAC caiu 38% em dois meses. O funil automatizado nutre os leads por semanas antes de passar para o time comercial â€” eles chegam muito mais prontos." },
  { name: "Fernanda Lima", role: "Diretora â€” Rede de Franquias", text: "Gerenciar anÃºncios de 12 unidades era um caos. Agora temos relatÃ³rio semanal unificado e cada franqueado vÃª sua performance em tempo real." },
];

const STATS = [
  { v: "R$2M+", l: "em trÃ¡fego gerenciado",   count: 2,   prefix: "R$", suffix: "M+" },
  { v: "150+",  l: "leads qualificados/mÃªs",   count: 150, prefix: "",   suffix: "+"  },
  { v: "98%",   l: "taxa de retenÃ§Ã£o",          count: 98,  prefix: "",   suffix: "%"  },
  { v: "3.2Ã—",  l: "ROAS mÃ©dio",               count: 3.2, prefix: "",   suffix: "Ã—"  },
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
  el.style.boxShadow = "0 20px 60px rgba(192,144,40,.12)";
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
    // â”€â”€ Scroll reveal â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    const revealObs = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("visible"); revealObs.unobserve(e.target); }
      }),
      { threshold: 0.07, rootMargin: "0px 0px -48px 0px" }
    );
    document.querySelectorAll(".reveal").forEach(el => revealObs.observe(el));

    // â”€â”€ Counter animation â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

    // â”€â”€ Hero parallax + scroll progress â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    const onScroll = () => {
      const sy = window.scrollY;

      // Hero parallax â€” desktop only
      if (window.innerWidth >= 768) {
        const hero = document.querySelector<HTMLElement>(".hero-section");
        if (hero) {
          const p = Math.min(sy / 480, 1);
          hero.style.transform = `translateY(${sy * 0.22}px)`;
          hero.style.opacity = `${1 - p * 0.75}`;
        }
      }

      // Scroll progress bar
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const prog = docH > 0 ? sy / docH : 0;
      const bar = document.querySelector<HTMLElement>(".scroll-progress-bar");
      if (bar) bar.style.transform = `scaleX(${prog})`;

      // Hide scroll hints after user starts scrolling
      const hidden = sy > 160;
      document.getElementById("scroll-hint")?.classList.toggle("hidden", hidden);
      document.getElementById("scroll-hint-r")?.classList.toggle("hidden", hidden);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // â”€â”€ Magnetic buttons â€” desktop/mouse only â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    type MagnetEntry = { el: HTMLElement; move: (e: MouseEvent) => void; leave: () => void };
    const magnets: MagnetEntry[] = [];
    if (window.matchMedia("(pointer: fine)").matches) document.querySelectorAll<HTMLElement>(".btn-primary, .btn-ghost").forEach(el => {
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
    }); // end pointer: fine check

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

      {/* Scroll hints â€” desktop only, both sides */}
      {(["scroll-hint-left", "scroll-hint-right"] as const).map(side => (
        <div key={side} id={side === "scroll-hint-left" ? "scroll-hint" : "scroll-hint-r"} className={`scroll-hint ${side}`}>
          <span className="scroll-hint-label">scroll</span>
          <div className="scroll-hint-track">
            <div className="scroll-hint-fill" />
          </div>
          <span className="scroll-hint-arrow">â†“</span>
        </div>
      ))}

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
          {["ServiÃ§os", "Processo", "Para Quem", "FAQ"].map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(" ", "-")}`} style={{ fontSize: 13, fontWeight: 500, color: "var(--t2)", textDecoration: "none", transition: "color .15s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--t2)")}>
              {l}
            </a>
          ))}
          <a href="/mentoria" style={{ fontSize: 13, fontWeight: 700, color: "var(--gold-lt)", textDecoration: "none", transition: "color .15s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--gold-lt)")}>
            Mentoria âœ¦
          </a>
        </div>
        <a href="/forms" className="btn-primary hide-mobile" style={{ fontSize: 13, padding: "10px 20px", whiteSpace: "nowrap" }}>Falar com especialista â†’</a>
        <button className="show-mobile" onClick={() => setMobileMenu(!mobileMenu)} style={{ background: "none", border: "1px solid rgba(255,255,255,.12)", borderRadius: 8, padding: "8px 12px", cursor: "pointer", color: "#fff", fontSize: 18, lineHeight: 1 }}>
          {mobileMenu ? "âœ•" : "â˜°"}
        </button>
      </nav>

      {/* MOBILE MENU */}
      {mobileMenu && (
        <div style={{ position: "fixed", top: 68, left: 0, right: 0, zIndex: 99, background: "rgba(0,0,0,.96)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,.08)", padding: "24px 24px 32px", display: "flex", flexDirection: "column", gap: 0 }}>
          {["ServiÃ§os", "Processo", "Para Quem", "FAQ"].map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(" ", "-")}`} onClick={() => setMobileMenu(false)}
              style={{ fontSize: 16, fontWeight: 600, color: "var(--t2)", textDecoration: "none", padding: "16px 0", borderBottom: "1px solid rgba(255,255,255,.05)" }}>
              {l}
            </a>
          ))}
          <a href="/mentoria" onClick={() => setMobileMenu(false)}
            style={{ fontSize: 16, fontWeight: 700, color: "var(--gold-lt)", textDecoration: "none", padding: "16px 0", borderBottom: "1px solid rgba(255,255,255,.05)" }}>
            Mentoria âœ¦
          </a>
          <a href="/forms" className="btn-primary" onClick={() => setMobileMenu(false)}
            style={{ marginTop: 20, justifyContent: "center", fontSize: 15 }}>
            Falar com especialista â†’
          </a>
        </div>
      )}

      {/* HERO */}
      <section className="hero-wrap" style={{ paddingTop: 160, paddingBottom: 100, textAlign: "center", position: "relative", zIndex: 1 }}>
        <div className="hero-section" style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px" }}>
          <div className="badge fade-up" style={{ marginBottom: 28 }}>
            <span className="badge-dot" /> AgÃªncia de performance & IA
          </div>
          <h1 className="fade-up d1" style={{ fontSize: "clamp(40px, 7vw, 76px)", fontWeight: 900, lineHeight: 1.08, letterSpacing: "-.04em", marginBottom: 24 }}>
            TrÃ¡fego pago e IA<br />
            <span className="gold-text">que vendem enquanto</span><br />
            vocÃª dorme
          </h1>
          <p className="fade-up d2" style={{ fontSize: 18, color: "var(--t2)", lineHeight: 1.7, maxWidth: 580, margin: "0 auto 40px", fontWeight: 400 }}>
            Automatizamos sua aquisiÃ§Ã£o de clientes com campanhas de alta performance e inteligÃªncia artificial. Do lead ao fechamento, tudo conectado.
          </p>
          <div className="fade-up d3" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/forms" className="btn-primary">Quero uma proposta gratuita â†’</a>
            <a href="#servicos" className="btn-ghost">Ver serviÃ§os</a>
          </div>

          {/* Hero visual â€” metrics mockup */}
          <div className="fade-up d4" style={{ marginTop: 64, position: "relative" }}>
            <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 20, padding: "28px 32px", maxWidth: 680, margin: "0 auto", backdropFilter: "blur(10px)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: "var(--t3)", letterSpacing: ".06em", textTransform: "uppercase" }}>Performance â€” Ãºltimos 30 dias</span>
                <span style={{ fontSize: 11, background: "rgba(76,175,134,.1)", color: "#4CAF86", border: "1px solid rgba(76,175,134,.2)", borderRadius: 99, padding: "3px 10px", fontWeight: 700 }}>â— Ao vivo</span>
              </div>
              <div className="metrics-grid">
                {[
                  { l: "Investido", v: "R$12.400", c: "var(--t2)" },
                  { l: "Receita gerada", v: "R$39.680", c: "var(--gold-lt)" },
                  { l: "ROAS", v: "3.2Ã—", c: "#4CAF86" },
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
                  <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: "3px 3px 1px 1px", background: i === 13 ? "linear-gradient(to top, var(--gold), var(--gold-lt))" : "rgba(192,144,40,.2)", boxShadow: i === 13 ? "0 0 12px rgba(192,144,40,.4)" : "none" }} />
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

      {/* TICKER â€” Clientes */}
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
      <section id="serviÃ§os" style={{ padding: "80px 0", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <div className="reveal" style={{ textAlign: "center", marginBottom: 60 }}>
            <div className="badge" style={{ marginBottom: 20 }}>ServiÃ§os</div>
            <h2 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900, letterSpacing: "-.04em", lineHeight: 1.1, marginBottom: 16 }}>
              Tudo que vocÃª precisa<br /><span className="gold-text">para crescer de verdade</span>
            </h2>
            <p style={{ fontSize: 16, color: "var(--t2)", maxWidth: 520, margin: "0 auto" }}>
              Combinamos estratÃ©gia, tecnologia e inteligÃªncia artificial para criar um sistema de aquisiÃ§Ã£o que funciona no piloto automÃ¡tico.
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

      {/* PROCESS â€” 3D wheel */}
      <ProcessWheel items={PROCESS} />

      {/* FOR WHOM â€” cinematic fly-in */}
      <FlyInGrid
        items={FOR_WHOM}
        sectionBadge="Para Quem"
        heading={<>Feito para quem quer<br /><span className="gold-text">crescer com consistÃªncia</span></>}
      />

      {/* COMPARISON */}
      <section style={{ padding: "80px 0", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
          <div className="reveal" style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="badge" style={{ marginBottom: 20 }}>Diferenciais</div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, letterSpacing: "-.04em", lineHeight: 1.1 }}>
              Somos diferentes.<br /><span className="gold-text">Isso Ã© um fato.</span>
            </h2>
          </div>
          <div className="table-scroll reveal reveal-d2" style={{ border: "1px solid rgba(255,255,255,.07)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", background: "rgba(255,255,255,.025)", minWidth: 480 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,.07)" }}>
                  <th style={{ padding: "16px 24px", textAlign: "left", fontSize: 13, color: "var(--t2)", fontWeight: 600 }}>CritÃ©rio</th>
                  <th style={{ padding: "16px 24px", textAlign: "center", fontSize: 13, fontWeight: 800, color: "var(--gold-lt)" }}>Aurea Group</th>
                  <th style={{ padding: "16px 24px", textAlign: "center", fontSize: 13, color: "var(--t3)", fontWeight: 600 }}>AgÃªncias tradicionais</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["RelatÃ³rio semanal de resultados", true, false],
                  ["Agente IA integrado ao WhatsApp", true, false],
                  ["CRM prÃ³prio e exclusivo", true, false],
                  ["Sem contrato de fidelidade", true, false],
                  ["Atendimento no mesmo dia", true, false],
                  ["EstratÃ©gia baseada em dados reais", true, "Parcial"],
                  ["Equipe dedicada ao seu negÃ³cio", true, false],
                ].map(([c, a, t], i) => (
                  <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,.04)" }}>
                    <td style={{ padding: "14px 24px", fontSize: 13, color: "var(--t2)" }}>{c as string}</td>
                    <td style={{ padding: "14px 24px", textAlign: "center", fontSize: 16 }}>
                      {a === true ? <span style={{ color: "#4CAF86" }}>âœ“</span> : <span style={{ color: "var(--t3)" }}>âœ•</span>}
                    </td>
                    <td style={{ padding: "14px 24px", textAlign: "center", fontSize: t === "Parcial" ? 12 : 16 }}>
                      {t === true ? <span style={{ color: "#4CAF86" }}>âœ“</span> : t === "Parcial" ? <span style={{ color: "var(--gold)", fontWeight: 700 }}>Parcial</span> : <span style={{ color: "var(--t3)" }}>âœ•</span>}
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
            O que nossos clientes<br /><span className="gold-text">estÃ£o dizendo</span>
          </h2>
        </div>
        <div>
          <div className="ticker-wrap">
            <div className="ticker-slow">
              {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
                <div key={i} className="glass-card" style={{ width: 380, flexShrink: 0, padding: 28, margin: "0 8px" }}>
                  <div style={{ display: "flex", gap: 2, marginBottom: 16 }}>
                    {[1,2,3,4,5].map(s => <span key={s} style={{ color: "var(--gold-lt)", fontSize: 14 }}>â˜…</span>)}
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
          <div className="cta-box reveal" style={{ background: "rgba(192,144,40,.06)", border: "1px solid rgba(192,144,40,.2)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center top, rgba(192,144,40,.1) 0%, transparent 70%)", pointerEvents: "none" }} />
            <div className="badge" style={{ marginBottom: 24 }}>Vamos conversar</div>
            <h2 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900, letterSpacing: "-.04em", lineHeight: 1.1, marginBottom: 16 }}>
              Pronto para escalar<br /><span className="gold-text">seu negÃ³cio?</span>
            </h2>
            <p style={{ fontSize: 16, color: "var(--t2)", lineHeight: 1.7, marginBottom: 36 }}>
              DiagnÃ³stico 100% gratuito. Sem compromisso. Resposta em atÃ© 1 hora.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="https://wa.me/5541987850818?text=OlÃ¡! Quero um diagnÃ³stico gratuito" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: 15, padding: "16px 32px" }}>
                ðŸ’¬ Falar no WhatsApp
              </a>
              <a href="mailto:contato@aureagroup.com.br" className="btn-ghost" style={{ fontSize: 15, padding: "16px 32px" }}>
                Enviar e-mail
              </a>
            </div>
            <p style={{ marginTop: 20, fontSize: 12, color: "var(--t3)" }}>Atendemos de segunda a sexta, das 9h Ã s 18h (BrasÃ­lia)</p>
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
            <p style={{ fontSize: 12, color: "var(--t3)", maxWidth: 300, lineHeight: 1.6 }}>TrÃ¡fego pago e IA para negÃ³cios que querem crescer de verdade.</p>
          </div>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
            <a href="/mentoria" style={{ fontSize: 13, color: "var(--gold-lt)", textDecoration: "none", fontWeight: 700, transition: "color .15s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--gold-lt)")}>
              Mentoria âœ¦
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
          <p style={{ fontSize: 12, color: "var(--t3)" }}>Â© {new Date().getFullYear()} Aurea Group. Todos os direitos reservados.</p>
        </div>
      </footer>
    </>
  );
}

