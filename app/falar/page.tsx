"use client";
import { useState } from "react";
import Link from "next/link";

// ── Step types ───────────────────────────────────────────────────────────────
interface FieldDef { id: string; label: string; placeholder: string; type?: string }
interface CardOpt  { value: string; label: string; price: string; desc: string }

type StepDef =
  | { id: string; etapa?: string; q: string; type: "fields"; fields: FieldDef[] }
  | { id: string; etapa?: string; q: string; type: "select"; opts: string[] }
  | { id: string; etapa?: string; q: string; type: "text";   placeholder: string }
  | { id: string; etapa?: string; q: string; type: "cards";  cards: CardOpt[] };

// ── Score map ────────────────────────────────────────────────────────────────
const SCORE: Record<string, number> = {
  // serviços — tráfego
  "Sim, investimos atualmente": 10, "Já investimos mas paramos": 5, "Nunca investimos": 0,
  // serviços — atendimento
  "CRM + automações": 15, "Equipe comercial": 10, "Manual no WhatsApp": 5, "Não temos processo definido": 0,
  // serviços — leads
  "Mais de 500": 15, "200 a 500": 10, "50 a 200": 5, "Menos de 50": 0,
  // serviços — faturamento
  "Acima de R$200 mil": 30, "R$50 mil a R$200 mil": 20, "R$10 mil a R$50 mil": 10, "Até R$10 mil": 0,
  // serviços — investimento
  "Acima de R$10 mil": 30, "R$5 mil a R$10 mil": 25, "R$3 mil a R$5 mil": 15, "Até R$2 mil": 0,
  // mentoria — área
  "Infoprodutor": 20, "Empresário": 20,
  "Marketing": 15, "Social Media": 15, "Gestor de tráfego": 15, "E-commerce": 15,
  "Prestador de serviço": 10, "Outro": 5,
  // mentoria — dificuldade
  "Conseguir clientes": 20, "Posicionamento": 20, "Vendas": 20, "Escalar": 20,
  "Organização": 10, "Falta de processo": 10,
  // mentoria — faturamento pessoal
  "Acima de R$20 mil": 30, "R$5 mil a R$20 mil": 20, "Até R$5 mil": 10, "Ainda não faturo": 0,
  // mentoria — modelo
  "Premium": 30, "Start": 15,
};

// ── Types ────────────────────────────────────────────────────────────────────
type Flow = "servicos" | "mentoria" | "curso" | null;
type D = Record<string, string>;

// ── Serviços steps ───────────────────────────────────────────────────────────
const SV: StepDef[] = [
  { id:"dados",        etapa:"Etapa 1 de 4 — Dados Básicos",             q:"Vamos começar. Conta um pouco sobre você.",  type:"fields" as const,
    fields:[{id:"nome",label:"Nome completo",placeholder:"João Silva"},{id:"empresa",label:"Nome da empresa",placeholder:"Empresa LTDA"},{id:"email",label:"Melhor e-mail",placeholder:"joao@empresa.com",type:"email"},{id:"whatsapp",label:"WhatsApp",placeholder:"(41) 99999-9999",type:"tel"},{id:"cidade",label:"Cidade e estado",placeholder:"Curitiba, PR"}]},
  { id:"segmento",     etapa:"Etapa 2 de 4 — Estrutura da Empresa",       q:"Qual o segmento da sua empresa?",            type:"select" as const,
    opts:["Clínica","Estética","Imobiliária","Advocacia","E-commerce","SaaS","Infoproduto","Prestação de serviço","Outro"]},
  { id:"trafegoPago",  etapa:"Etapa 2 de 4 — Estrutura da Empresa",       q:"Hoje vocês já investem em tráfego pago?",    type:"select" as const,
    opts:["Sim, investimos atualmente","Já investimos mas paramos","Nunca investimos"]},
  { id:"atendimento",  etapa:"Etapa 2 de 4 — Estrutura da Empresa",       q:"Como funciona o atendimento hoje?",          type:"select" as const,
    opts:["Manual no WhatsApp","Equipe comercial","CRM + automações","Não temos processo definido"]},
  { id:"perdaVendas",  etapa:"Etapa 2 de 4 — Estrutura da Empresa",       q:"Você perde vendas por demora no atendimento ou falta de processo?", type:"select" as const,
    opts:["Sim, frequentemente","Às vezes","Raramente","Não"]},
  { id:"leadsMonth",   etapa:"Etapa 3 de 4 — Volume e Estrutura",          q:"Quantos leads vocês recebem por mês?",       type:"select" as const,
    opts:["Menos de 50","50 a 200","200 a 500","Mais de 500"]},
  { id:"faturamento",  etapa:"Etapa 3 de 4 — Volume e Estrutura",          q:"Qual o faturamento médio mensal da empresa?",type:"select" as const,
    opts:["Até R$10 mil","R$10 mil a R$50 mil","R$50 mil a R$200 mil","Acima de R$200 mil"]},
  { id:"desafio",      etapa:"Etapa 3 de 4 — Volume e Estrutura",          q:"Qual seu principal desafio hoje?",           type:"select" as const,
    opts:["Gerar mais leads","Converter mais vendas","Automatizar atendimento","Escalar operação","Melhorar posicionamento","Outro"]},
  { id:"investimento", etapa:"Etapa 4 de 4 — Capacidade de Investimento",  q:"Quanto você pretende investir para estruturar essa operação?", type:"select" as const,
    opts:["Até R$2 mil","R$3 mil a R$5 mil","R$5 mil a R$10 mil","Acima de R$10 mil"]},
];

// ── Mentoria steps ───────────────────────────────────────────────────────────
const MT: StepDef[] = [
  { id:"dados",           etapa:"Etapa 1 de 3 — Dados Básicos",    q:"Vamos começar. Conta um pouco sobre você.",          type:"fields" as const,
    fields:[{id:"nome",label:"Nome completo",placeholder:"João Silva"},{id:"email",label:"Melhor e-mail",placeholder:"joao@email.com",type:"email"},{id:"whatsapp",label:"WhatsApp",placeholder:"(41) 99999-9999",type:"tel"}]},
  { id:"trabalhaDigital", etapa:"Etapa 2 de 3 — Momento Atual",     q:"Você já trabalha com o digital?",                    type:"select" as const,
    opts:["Sim","Estou começando agora","Já tentei antes","Trabalho em outra área"]},
  { id:"oQueVende",       etapa:"Etapa 2 de 3 — Momento Atual",     q:"O que você vende hoje?",                             type:"text" as const,
    placeholder:"Ex: consultoria, serviços de marketing, produtos físicos..."},
  { id:"areaAtuacao",     etapa:"Etapa 2 de 3 — Momento Atual",     q:"Qual sua área de atuação?",                          type:"select" as const,
    opts:["Marketing","Social Media","Gestor de tráfego","Prestador de serviço","E-commerce","Infoprodutor","Empresário","Outro"]},
  { id:"dificuldade",     etapa:"Etapa 2 de 3 — Momento Atual",     q:"Qual sua maior dificuldade hoje?",                   type:"select" as const,
    opts:["Conseguir clientes","Posicionamento","Vendas","Escalar","Organização","Falta de processo"]},
  { id:"melhorFat",       etapa:"Etapa 2 de 3 — Momento Atual",     q:"Qual foi seu melhor faturamento mensal?",            type:"select" as const,
    opts:["Ainda não faturo","Até R$5 mil","R$5 mil a R$20 mil","Acima de R$20 mil"]},
  { id:"modelo",          etapa:"Etapa 3 de 3 — Oferta",            q:"Qual modelo da mentoria faz mais sentido para você?",type:"cards" as const,
    cards:[
      {value:"Start",  label:"Mentoria Start",   price:"R$5.000",  desc:"Acompanhamento estratégico para posicionamento, estruturação e vendas."},
      {value:"Premium",label:"Mentoria Premium", price:"R$10.000", desc:"Acompanhamento avançado com foco em escala, automações e crescimento da operação."},
    ] as CardOpt[]},
];

// ── Curso steps ──────────────────────────────────────────────────────────────
const CU: StepDef[] = [
  { id:"quiz1", type:"select", etapa:"Pergunta 1 de 5", q:"Você acredita que poderia ganhar mais usando a internet da forma certa?",   opts:["Sim","Talvez","Nunca tentei"] },
  { id:"quiz2", type:"select", etapa:"Pergunta 2 de 5", q:"Hoje você sente que está deixando oportunidades passarem?",                 opts:["Sim","Às vezes","Não"] },
  { id:"quiz3", type:"select", etapa:"Pergunta 3 de 5", q:"Se tivesse um método claro e acompanhamento, você começaria agora?",        opts:["Sim","Talvez","Não sei"] },
  { id:"quiz4", type:"select", etapa:"Pergunta 4 de 5", q:"O que mais te impede hoje?",                                                opts:["Falta de conhecimento","Falta de direção","Falta de dinheiro","Medo de começar"] },
  { id:"quiz5", type:"select", etapa:"Pergunta 5 de 5", q:"O que você gostaria de aprender?",                                         opts:["Como vender no digital","Como atrair clientes","Como criar uma oferta","Como escalar usando automação e IA"] },
];

// ── Helpers ──────────────────────────────────────────────────────────────────
function calcScore(flow: Flow, d: D): number {
  if (flow === "servicos") {
    return (SCORE[d.trafegoPago] ?? 0) + (SCORE[d.atendimento] ?? 0) +
           (SCORE[d.leadsMonth] ?? 0) + (SCORE[d.faturamento] ?? 0) + (SCORE[d.investimento] ?? 0);
  }
  if (flow === "mentoria") {
    return (SCORE[d.areaAtuacao] ?? 0) + (SCORE[d.dificuldade] ?? 0) +
           (SCORE[d.melhorFat] ?? 0) + (SCORE[d.modelo] ?? 0);
  }
  return 0;
}

function classify(flow: Flow, score: number, d: D) {
  if (flow === "servicos") {
    const baixaAderencia = d.faturamento === "Até R$10 mil" && d.investimento === "Até R$2 mil";
    const hot = d.faturamento === "Acima de R$200 mil" || d.investimento === "Acima de R$10 mil";
    if (baixaAderencia) return { label: "Baixa aderência", color: "#888", tags: ["Baixa aderência"], hot: false };
    if (hot || score >= 81) return { label: "HOT LEAD 🔥", color: "#ff6b35", tags: ["HOT LEAD", "PRIORIDADE", "CONTATO IMEDIATO"], hot: true };
    if (score >= 61) return { label: "Qualificado ✅", color: "#4CAF86", tags: ["Qualificado"], hot: false };
    if (score >= 31) return { label: "Potencial", color: "var(--gold-lt)", tags: ["Potencial"], hot: false };
    return { label: "Lead frio", color: "var(--t2)", tags: ["Lead frio"], hot: false };
  }
  if (flow === "mentoria") {
    if (score >= 81) return { label: "Alta intenção 🔥", color: "#ff6b35", tags: [], hot: true };
    if (score >= 61) return { label: "Qualificado ✅",  color: "#4CAF86",  tags: [], hot: false };
    if (score >= 31) return { label: "Potencial",        color: "var(--gold-lt)", tags: [], hot: false };
    return { label: "Curioso", color: "var(--t2)", tags: [], hot: false };
  }
  return { label: "", color: "", tags: [], hot: false };
}

function buildWAMsg(flow: Flow, d: D, score: number, cl: ReturnType<typeof classify>): string {
  if (flow === "servicos") {
    const tag = cl.hot ? "🔥 *HOT LEAD — CONTATO IMEDIATO*" : "📋 *NOVO LEAD — AUREA GROUP*";
    return encodeURIComponent(
`${tag}

*Nome:* ${d.nome}
*Empresa:* ${d.empresa}
*E-mail:* ${d.email}
*WhatsApp:* ${d.whatsapp}
*Cidade:* ${d.cidade}

*QUALIFICAÇÃO*
Segmento: ${d.segmento}
Tráfego pago: ${d.trafegoPago}
Atendimento: ${d.atendimento}
Perde vendas: ${d.perdaVendas}
Leads/mês: ${d.leadsMonth}
Faturamento: ${d.faturamento}
Desafio: ${d.desafio}
Investimento disponível: ${d.investimento}

*SCORE: ${score}/100 — ${cl.label}*
Tags: ${cl.tags.join(" | ")}`.trim()
    );
  }
  if (flow === "mentoria") {
    return encodeURIComponent(
`📋 *APLICAÇÃO MENTORIA — AUREA GROUP*

*Nome:* ${d.nome}
*E-mail:* ${d.email}
*WhatsApp:* ${d.whatsapp}

*PERFIL*
Trabalha no digital: ${d.trabalhaDigital}
O que vende: ${d.oQueVende}
Área: ${d.areaAtuacao}
Dificuldade: ${d.dificuldade}
Melhor faturamento: ${d.melhorFat}
Modelo de interesse: Mentoria ${d.modelo}

*SCORE: ${score}/100 — ${cl.label}*`.trim()
    );
  }
  return "";
}

const WA          = "5541987850818";
const BACKEND_URL = "https://whatsap-agent-whatsap-agent.nctu8q.easypanel.host";

// ── Backend payload builder ───────────────────────────────────────────────────
function buildBackendPayload(flow: Flow, d: D, score: number, cl: ReturnType<typeof classify>) {
  const quality = cl.hot || score >= 61 ? "quente" : score >= 31 ? "morno" : "frio";
  const analise = flow === "servicos"
    ? `Lead Serviços | Score ${score}/100 | ${cl.label} | Segmento: ${d.segmento} | Tráfego: ${d.trafegoPago} | Atendimento: ${d.atendimento} | Perde vendas: ${d.perdaVendas} | Leads/mês: ${d.leadsMonth} | Faturamento: ${d.faturamento} | Desafio: ${d.desafio} | Investimento: ${d.investimento} | Cidade: ${d.cidade}`
    : `Mentoria | Score ${score}/100 | ${cl.label} | Digital: ${d.trabalhaDigital} | Vende: ${d.oQueVende} | Área: ${d.areaAtuacao} | Dificuldade: ${d.dificuldade} | Faturamento: ${d.melhorFat} | Modelo: Mentoria ${d.modelo}`;

  return {
    tipo_de_lead:        flow ?? "",
    tipo_lead:           flow ?? "",
    perfil:              cl.label,
    nome:                d.nome    ?? "",
    email:               d.email   ?? "",
    whatsapp:            d.whatsapp ?? "",
    empresa:             d.empresa ?? "",
    cidade:              d.cidade  ?? "",
    score,
    lead_quality:        quality,
    analise,
    // Serviços
    segmento:            d.segmento    ?? "",
    faturamento:         d.faturamento ?? d.melhorFat ?? "",
    desafio:             d.desafio     ?? d.dificuldade ?? "",
    trafego:             d.trafegoPago ?? "",
    investir:            d.investimento ?? "",
    // Mentoria
    trabalha_marketing:  d.trabalhaDigital ?? "",
    area_atuacao:        d.areaAtuacao     ?? "",
    maior_dificuldade:   d.dificuldade     ?? "",
    // Payload completo para form_leads
    payload:             { ...d, flow, score, classificacao: cl.label, tags: cl.tags },
  };
}

// ── Component ────────────────────────────────────────────────────────────────
export default function FalarPage() {
  const [flow,        setFlow]        = useState<Flow>(null);
  const [step,        setStep]        = useState(0);
  const [data,        setData]        = useState<D>({});
  const [done,        setDone]        = useState(false);
  const [anim,        setAnim]        = useState(false);
  const [fwd,         setFwd]         = useState(true);
  const [submitting,  setSubmitting]  = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<string[]>([]);

  const steps: StepDef[] = flow === "servicos" ? SV : flow === "mentoria" ? MT : CU;
  const cur: StepDef | undefined = steps[step];
  const total = steps.length;

  const goStep = (n: number, forward = true) => {
    setFwd(forward); setAnim(true);
    setTimeout(() => { setStep(n); setAnim(false); }, 220);
  };

  const canAdvance = (): boolean => {
    if (!cur) return true;
    if (cur.type === "fields") {
      const missing = cur.fields.filter(f => !(data[f.id]?.trim()));
      setFieldErrors(missing.map(f => f.id));
      return missing.length === 0;
    }
    if (cur.type === "text") return !!(data[cur.id]?.trim());
    return !!data[cur.id];
  };

  const next = async () => {
    if (!canAdvance()) return;
    setFieldErrors([]);

    if (step < total - 1) {
      goStep(step + 1, true);
      return;
    }

    // Last step — submit to backend (only for servicos and mentoria)
    if (flow === "servicos" || flow === "mentoria") {
      setSubmitting(true);
      setSubmitError(false);
      try {
        const s     = calcScore(flow, data);
        const cl2   = classify(flow, s, data);
        const payload = buildBackendPayload(flow, data, s, cl2);
        console.log("[CRM] Enviando para", `${BACKEND_URL}/n8n/lead`);
        console.log("[CRM] Payload:", JSON.stringify(payload, null, 2));

        const controller = new AbortController();
        const timeout    = setTimeout(() => controller.abort(), 12000);

        const res = await fetch(`${BACKEND_URL}/n8n/lead`, {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify(payload),
          signal:  controller.signal,
        });
        clearTimeout(timeout);

        const responseBody = await res.text();
        console.log("[CRM] Status:", res.status, "| Body:", responseBody);
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${responseBody}`);
        console.log("[CRM] Lead enviado com sucesso ✓");
      } catch (e) {
        console.error("[CRM] Erro ao enviar lead:", e);
        setSubmitError(true);
      } finally {
        setSubmitting(false);
      }
    }

    setFwd(true); setAnim(true);
    setTimeout(() => { setDone(true); setAnim(false); }, 220);
  };

  const back = () => {
    setFieldErrors([]);
    if (step > 0) { goStep(step - 1, false); }
    else { setFwd(false); setAnim(true); setTimeout(() => { setFlow(null); setStep(0); setData({}); setDone(false); setAnim(false); }, 220); }
  };

  const score = calcScore(flow, data);
  const cl    = classify(flow, score, data);
  const waMsg = buildWAMsg(flow, data, score, cl);
  const progress = done ? 100 : total > 0 ? ((step + 1) / total) * 100 : 0;

  // ── Render step content ────────────────────────────────
  const renderStep = () => {
    if (!cur) return null;

    if (cur.type === "fields") {
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {cur.fields.map(f => (
            <div key={f.id}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "var(--t2)", marginBottom: 6, letterSpacing: ".03em", textTransform: "uppercase" }}>{f.label}</label>
              <input
                type={f.type || "text"}
                placeholder={f.placeholder}
                value={data[f.id] || ""}
                onChange={e => setData(p => ({ ...p, [f.id]: e.target.value }))}
                className={`falar-input${fieldErrors.includes(f.id) ? " error" : ""}`}
                onKeyDown={e => e.key === "Enter" && next()}
              />
              {fieldErrors.includes(f.id) && <span style={{ fontSize: 11, color: "#ff6b6b", marginTop: 4, display: "block" }}>Campo obrigatório</span>}
            </div>
          ))}
        </div>
      );
    }

    if (cur.type === "text") {
      return (
        <input
          type="text"
          placeholder={cur.placeholder}
          value={data[cur.id] || ""}
          onChange={e => setData(p => ({ ...p, [cur.id]: e.target.value }))}
          className="falar-input"
          onKeyDown={e => e.key === "Enter" && next()}
          autoFocus
        />
      );
    }

    if (cur.type === "select") {
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {cur.opts.map(opt => {
            const sel = data[cur.id] === opt;
            return (
              <button key={opt} onClick={() => setData(p => ({ ...p, [cur.id]: opt }))}
                className="falar-opt" style={{
                  background: sel ? "rgba(192,144,40,.08)" : "rgba(255,255,255,.025)",
                  border: `1px solid ${sel ? "rgba(192,144,40,.5)" : "rgba(255,255,255,.07)"}`,
                  transform: sel ? "scale(1.01)" : "scale(1)",
                  boxShadow: sel ? "0 0 30px rgba(192,144,40,.08)" : "none",
                }}>
                <span style={{ fontSize: 14, fontWeight: sel ? 700 : 500, color: sel ? "#fff" : "var(--t2)", flex: 1, textAlign: "left" }}>{opt}</span>
                <div className="falar-radio" style={{
                  background: sel ? "linear-gradient(135deg, var(--gold-lt), var(--gold2))" : "transparent",
                  borderColor: sel ? "var(--gold-lt)" : "rgba(255,255,255,.2)",
                }}>
                  {sel && <span style={{ fontSize: 10, color: "#000", fontWeight: 900 }}>✓</span>}
                </div>
              </button>
            );
          })}
        </div>
      );
    }

    if (cur.type === "cards") {
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {cur.cards.map(c => {
            const sel = data[cur.id] === c.value;
            return (
              <button key={c.value} onClick={() => setData(p => ({ ...p, [cur.id]: c.value }))}
                className="falar-opt" style={{
                  flexDirection: "column", alignItems: "flex-start", padding: "20px 22px",
                  background: sel ? "rgba(192,144,40,.07)" : "rgba(255,255,255,.025)",
                  border: `1px solid ${sel ? "rgba(192,144,40,.5)" : "rgba(255,255,255,.07)"}`,
                  boxShadow: sel ? "0 0 40px rgba(192,144,40,.1)" : "none",
                }}>
                <div style={{ display: "flex", justifyContent: "space-between", width: "100%", marginBottom: 8 }}>
                  <div>
                    <span style={{ fontSize: 15, fontWeight: 800, color: sel ? "#fff" : "var(--t2)" }}>{c.label}</span>
                    <span style={{ marginLeft: 10, fontSize: 13, fontWeight: 700, color: "var(--gold-lt)" }}>{c.price}</span>
                  </div>
                  <div className="falar-radio" style={{
                    background: sel ? "linear-gradient(135deg, var(--gold-lt), var(--gold2))" : "transparent",
                    borderColor: sel ? "var(--gold-lt)" : "rgba(255,255,255,.2)",
                    flexShrink: 0,
                  }}>
                    {sel && <span style={{ fontSize: 10, color: "#000", fontWeight: 900 }}>✓</span>}
                  </div>
                </div>
                <p style={{ fontSize: 13, color: "var(--t3)", lineHeight: 1.6, textAlign: "left" }}>{c.desc}</p>
              </button>
            );
          })}
        </div>
      );
    }
    return null;
  };

  // ── Final screen ───────────────────────────────────────
  const renderFinal = () => {
    if (flow === "curso") {
      return (
        <div style={{ textAlign: "center" }} className={`step-slide${anim ? (fwd ? " exit-fwd" : " exit-bwd") : ""}`}>
          <div style={{ fontSize: 48, marginBottom: 20 }}>🚀</div>
          <div className="badge" style={{ marginBottom: 20 }}>Seu resultado</div>
          <h2 style={{ fontSize: "clamp(20px,4vw,26px)", fontWeight: 900, letterSpacing: "-.03em", lineHeight: 1.3, marginBottom: 16 }}>
            Existe um grande potencial<br /><span className="gold-text">para você crescer no digital</span>
          </h2>
          <p style={{ fontSize: 14, color: "var(--t2)", lineHeight: 1.7, marginBottom: 32, maxWidth: 380, margin: "0 auto 32px" }}>
            Com base nas suas respostas, você só precisa de estratégia, posicionamento e processo para transformar seus resultados.
          </p>
          <a href="https://mentorialucavespa.com" target="_blank" rel="noopener noreferrer"
            className="btn-primary" style={{ width: "100%", justifyContent: "center", fontSize: 15, padding: "16px 28px", borderRadius: 12 }}>
            QUERO ACESSAR O TREINAMENTO →
          </a>
          <p style={{ marginTop: 20, fontSize: 12, color: "var(--t3)" }}>🔒 Suas informações estão seguras.</p>
        </div>
      );
    }

    const isServicos = flow === "servicos";
    const msg = isServicos
      ? "Nossa equipe vai analisar sua operação e entrar em contato para apresentar a melhor estratégia para escalar seu negócio."
      : "Nossa equipe vai analisar seu perfil e entrar em contato para explicar os próximos passos da mentoria.";

    return (
      <div style={{ textAlign: "center" }} className={`step-slide${anim ? (fwd ? " exit-fwd" : " exit-bwd") : ""}`}>
        <div style={{ fontSize: 52, marginBottom: 20 }}>✅</div>
        <h2 style={{ fontSize: "clamp(20px,4vw,26px)", fontWeight: 900, letterSpacing: "-.03em", lineHeight: 1.3, marginBottom: 16 }}>
          Recebemos suas<br /><span className="gold-text">informações com sucesso!</span>
        </h2>
        <p style={{ fontSize: 14, color: "var(--t2)", lineHeight: 1.8, maxWidth: 380, margin: "0 auto 32px" }}>
          {msg}
        </p>
        <a href="/" className="btn-primary"
          style={{ width: "100%", justifyContent: "center", fontSize: 15, padding: "16px 28px", borderRadius: 12 }}>
          Voltar ao site →
        </a>
        <p style={{ marginTop: 20, fontSize: 12, color: "var(--t3)" }}>🔒 Suas informações estão seguras e não serão compartilhadas.</p>
      </div>
    );
  };

  // ── Choice screen ──────────────────────────────────────
  const renderChoice = () => (
    <div className={`step-slide${anim ? " exit-fwd" : ""}`} style={{ textAlign: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <div style={{ display: "inline-block", marginBottom: 14 }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", padding: 3, background: "linear-gradient(135deg, var(--gold-lt), var(--gold2))", display: "inline-flex" }}>
            <img src="/logo.jpg" alt="Aurea Group" style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />
          </div>
          <div style={{ position: "absolute", bottom: 2, right: 2, width: 16, height: 16, borderRadius: "50%", background: "#4CAF86", border: "2px solid #000" }} />
        </div>
        <div style={{ marginTop: 8 }}>
          <a href="https://instagram.com/lucavespaa" target="_blank" rel="noopener noreferrer"
            style={{ fontSize: 13, fontWeight: 700, color: "var(--gold-lt)", textDecoration: "none" }}>@lucavespaa</a>
        </div>
      </div>
      <h1 style={{ fontSize: "clamp(22px,5vw,28px)", fontWeight: 900, letterSpacing: "-.04em", marginBottom: 10 }}>O que você deseja?</h1>
      <p style={{ fontSize: 14, color: "var(--t2)", marginBottom: 28 }}>Selecione a opção que mais combina com você.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {[
          { icon: "💼", title: "Quero contratar os serviços da Aurea Group", desc: "Meta Ads, Google Ads, agente IA e CRM inteligente", f: "servicos" as Flow },
          { icon: "🎓", title: "Quero participar da mentoria",               desc: "Escale seu negócio com tráfego pago e automações",    f: "mentoria" as Flow },
          { icon: "📚", title: "Quero conhecer o curso",                     desc: "Conteúdo prático para dominar o marketing digital",   f: "curso" as Flow },
        ].map(o => (
          <button key={o.f} onClick={() => { setFwd(true); setAnim(true); setTimeout(() => { setFlow(o.f); setStep(0); setData({}); setDone(false); setAnim(false); }, 220); }}
            className="falar-opt">
            <span style={{ fontSize: 26, flexShrink: 0 }}>{o.icon}</span>
            <div style={{ flex: 1, textAlign: "left" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--t2)", marginBottom: 3 }}>{o.title}</div>
              <div style={{ fontSize: 12, color: "var(--t3)" }}>{o.desc}</div>
            </div>
            <span style={{ color: "var(--t3)", fontSize: 16 }}>›</span>
          </button>
        ))}
      </div>
      <p style={{ marginTop: 24, fontSize: 12, color: "var(--t3)" }}>🔒 Suas informações estão seguras e não serão compartilhadas.</p>
    </div>
  );

  // ── Layout ─────────────────────────────────────────────
  return (
    <>
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,.018) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="orb-a" style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "var(--gold)", filter: "blur(150px)", opacity: .08, top: -200, left: -100 }} />
        <div className="orb-b" style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "#3A7BD5", filter: "blur(130px)", opacity: .06, bottom: 0, right: -50 }} />
      </div>

      <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 24px", height: 60, display: "flex", alignItems: "center", background: "rgba(0,0,0,.6)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,.05)" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <img src="/logo.jpg" alt="Aurea Group" style={{ width: 30, height: 30, borderRadius: 7, objectFit: "cover" }} />
          <span style={{ fontSize: 15, fontWeight: 900, letterSpacing: "-.03em", color: "#fff" }}>Aurea<span className="gold-text">Group</span></span>
        </Link>
      </header>

      <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 24px 60px", position: "relative", zIndex: 1 }}>
        <div style={{ width: "100%", maxWidth: 500 }}>

          {/* Progress bar */}
          {flow && !done && (
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 11, color: "var(--t3)", fontWeight: 700, letterSpacing: ".04em", textTransform: "uppercase" }}>
                  {cur?.etapa || ""}
                </span>
                <span style={{ fontSize: 11, color: "var(--t3)" }}>{step + 1}/{total}</span>
              </div>
              <div style={{ height: 3, background: "rgba(255,255,255,.06)", borderRadius: 99, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg, var(--gold2), var(--gold-lt))", borderRadius: 99, transition: "width .4s cubic-bezier(.16,1,.3,1)", boxShadow: "0 0 8px rgba(192,144,40,.5)" }} />
              </div>
            </div>
          )}

          {/* Content */}
          <div className={`step-slide${anim ? (fwd ? " exit-fwd" : " exit-bwd") : ""}`}>
            {!flow && renderChoice()}

            {flow && !done && (
              <>
                <h2 style={{ fontSize: "clamp(18px,4vw,24px)", fontWeight: 900, letterSpacing: "-.03em", lineHeight: 1.3, marginBottom: 24 }}>
                  {cur?.q}
                </h2>
                {renderStep()}

                {/* Navigation */}
                <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
                  <button onClick={back} className="btn-ghost" style={{ padding: "14px 20px", borderRadius: 10, fontSize: 14 }}>← Voltar</button>
                  <button onClick={next} className="btn-primary" disabled={submitting}
                    style={{ flex: 1, justifyContent: "center", padding: "14px 20px", borderRadius: 10, fontSize: 14,
                      opacity: isStepValid(cur, data) && !submitting ? 1 : 0.5 }}>
                    {submitting ? "Enviando..." : step === total - 1 ? "Concluir →" : "Continuar →"}
                  </button>
                </div>
              </>
            )}

            {done && renderFinal()}
          </div>

        </div>
      </main>
    </>
  );
}

function isStepValid(cur: StepDef | undefined, data: D): boolean {
  if (!cur) return true;
  if (cur.type === "fields") return cur.fields.every(f => !!(data[f.id]?.trim()));
  return !!(data[cur.id]?.trim());
}
