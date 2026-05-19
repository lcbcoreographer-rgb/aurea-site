"use client";
import { useEffect, useRef, useState } from "react";

interface Item { num: string; title: string; time: string; desc: string; }

const RADIUS = 190;
const LERP   = 0.075;

export default function ProcessWheel({ items }: { items: Item[] }) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  const sectionRef  = useRef<HTMLElement>(null);
  const ringRef     = useRef<HTMLDivElement>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const wrapperRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const currentAng  = useRef(0);
  const targetAng   = useRef(0);
  const rafId       = useRef(0);

  const [active, setActive] = useState(0);

  const N    = items.length;
  const STEP = 360 / N; // 72° for 5 items

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // ── Scroll listener ─────────────────────────────────
    const onScroll = () => {
      const { top } = section.getBoundingClientRect();
      const scrollH  = section.offsetHeight - window.innerHeight;
      const p        = Math.max(0, Math.min(-top / scrollH, 1));
      targetAng.current = -p * (N - 1) * STEP;
      const newActive   = Math.min(Math.round(p * (N - 1)), N - 1);
      setActive(prev => (prev !== newActive ? newActive : prev));
    };

    // ── RAF animation loop ───────────────────────────────
    const animate = () => {
      const diff = targetAng.current - currentAng.current;
      if (Math.abs(diff) > 0.005) {
        currentAng.current += diff * LERP;
        const ca = currentAng.current;

        // Rotate the ring
        if (ringRef.current) {
          ringRef.current.style.transform = `rotateX(${ca}deg)`;
        }

        // Update each item: counter-rotate content + opacity
        items.forEach((_, i) => {
          const content = contentRefs.current[i];
          const wrapper = wrapperRefs.current[i];
          const card    = cardRefs.current[i];
          if (!content || !wrapper) return;

          // Content always faces viewer
          content.style.transform = `rotateX(${-(i * STEP + ca)}deg)`;

          // Opacity based on world-space angle
          const absAng  = ((i * STEP + ca) % 360 + 360) % 360;
          const normAng = absAng > 180 ? absAng - 360 : absAng;
          const cosA    = Math.cos(normAng * Math.PI / 180);
          const opacity = Math.max(0.1, (cosA + 1) * 0.42 + 0.1);
          wrapper.style.opacity = String(opacity);

          // Active glow
          if (card) {
            const isA = Math.abs(normAng) < 20;
            card.style.borderColor     = isA ? "rgba(201,162,39,.45)" : "rgba(255,255,255,.07)";
            card.style.background      = isA ? "rgba(201,162,39,.08)" : "rgba(255,255,255,.025)";
            card.style.boxShadow       = isA ? "0 8px 48px rgba(201,162,39,.18)" : "none";
          }
        });
      }
      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, [N, STEP, items]);

  // ── Mobile fallback: simple vertical timeline ─────────
  if (isMobile) {
    return (
      <section id="processo" style={{ padding: "64px 0", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 560, margin: "0 auto", padding: "0 20px" }}>
          <div className="badge" style={{ marginBottom: 16 }}>Processo</div>
          <h2 style={{ fontSize: "clamp(26px,7vw,36px)", fontWeight: 900, letterSpacing: "-.04em", lineHeight: 1.15, marginBottom: 12 }}>
            Do diagnóstico<br /><span className="gold-text">ao resultado</span>
          </h2>
          <p style={{ fontSize: 14, color: "var(--t2)", lineHeight: 1.7, marginBottom: 32 }}>
            Processo claro, transparente e orientado a resultados.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {items.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 14, position: "relative" }}>
                {i < items.length - 1 && (
                  <div style={{ position: "absolute", left: 18, top: 40, bottom: -24, width: 1, background: "linear-gradient(to bottom, rgba(201,162,39,.25), transparent)" }} />
                )}
                <div style={{ width: 36, height: 36, borderRadius: 9, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(201,162,39,.08)", border: "1px solid rgba(201,162,39,.22)", fontSize: 10, fontWeight: 900, color: "var(--gold-lt)" }}>{item.num}</div>
                <div style={{ paddingTop: 2 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 14, fontWeight: 700 }}>{item.title}</span>
                    <span style={{ fontSize: 10, color: "var(--gold-lt)", background: "rgba(201,162,39,.08)", border: "1px solid rgba(201,162,39,.15)", borderRadius: 99, padding: "2px 7px", fontWeight: 700 }}>{item.time}</span>
                  </div>
                  <p style={{ fontSize: 13, color: "var(--t2)", lineHeight: 1.65 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <a href="/falar" className="btn-primary" style={{ marginTop: 32, display: "inline-flex" }}>Começar agora →</a>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="processo"
      style={{ height: `${N * 90}vh`, position: "relative", zIndex: 1 }}
    >
      {/* Sticky viewport */}
      <div style={{
        position: "sticky", top: 0, height: "100vh",
        display: "flex", alignItems: "center",
        overflow: "hidden",
      }}>
        <div className="process-grid">

          {/* ── Left: 3D Wheel ─────────────────────────── */}
          <div className="process-wheel-col">
            {/* Horizontal indicator line */}
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%, -1px)",
              width: 260, height: 2, pointerEvents: "none",
              background: "linear-gradient(90deg, transparent, rgba(201,162,39,.3), transparent)",
            }} />

            {/* Perspective scene */}
            <div style={{ perspective: "720px", perspectiveOrigin: "50% 50%" }}>
              {/* Ring — rotated by RAF */}
              <div
                ref={ringRef}
                style={{
                  position: "relative", width: 0, height: 0,
                  transformStyle: "preserve-3d",
                  transform: "rotateX(0deg)",
                  willChange: "transform",
                }}
              >
                {items.map((item, i) => {
                  const iAngle = i * STEP;
                  return (
                    <div
                      key={i}
                      ref={el => { wrapperRefs.current[i] = el; }}
                      style={{
                        position: "absolute", top: 0, left: 0,
                        transform: `rotateX(${iAngle}deg) translateZ(${RADIUS}px)`,
                        willChange: "opacity",
                      }}
                    >
                      {/* Counter-rotate — updated by RAF */}
                      <div
                        ref={el => { contentRefs.current[i] = el; }}
                        style={{
                          transform: `rotateX(${-iAngle}deg)`,
                          width: 248,
                          marginLeft: -124,
                          marginTop: -38,
                          willChange: "transform",
                        }}
                      >
                        <div
                          ref={el => { cardRefs.current[i] = el; }}
                          style={{
                            background: "rgba(255,255,255,.025)",
                            border: "1px solid rgba(255,255,255,.07)",
                            borderRadius: 14,
                            padding: "14px 18px",
                            display: "flex",
                            alignItems: "center",
                            gap: 14,
                            backdropFilter: "blur(10px)",
                            transition: "background .3s, border-color .3s, box-shadow .3s",
                          }}
                        >
                          <div style={{
                            width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                            background: "rgba(201,162,39,.06)",
                            border: "1px solid rgba(201,162,39,.18)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 11, fontWeight: 900, color: "var(--gold-lt)",
                          }}>
                            {item.num}
                          </div>
                          <div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--t2)", lineHeight: 1.3 }}>
                              {item.title}
                            </div>
                            <div style={{ fontSize: 10, color: "var(--gold-lt)", fontWeight: 700, marginTop: 3 }}>
                              {item.time}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Center glow */}
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              width: 4, height: 4,
              transform: "translate(-50%, -50%)",
              borderRadius: "50%",
              boxShadow: "0 0 60px 30px rgba(201,162,39,.07)",
              pointerEvents: "none",
            }} />
          </div>

          {/* ── Right: Description ─────────────────────── */}
          <div style={{ padding: "0 8px" }}>
            <div className="badge" style={{ marginBottom: 20 }}>Processo</div>
            <h2 style={{
              fontSize: "clamp(28px,4vw,44px)", fontWeight: 900,
              letterSpacing: "-.04em", lineHeight: 1.1, marginBottom: 28,
            }}>
              Do diagnóstico<br />
              <span className="gold-text">ao resultado</span>
            </h2>

            {/* Active description — key triggers animation */}
            <div key={active} className="process-desc-in">
              <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 10, marginBottom: 12 }}>
                <span style={{
                  fontSize: 12, fontWeight: 900, color: "var(--gold-lt)",
                  background: "rgba(201,162,39,.08)", border: "1px solid rgba(201,162,39,.22)",
                  borderRadius: 99, padding: "3px 12px",
                }}>
                  {items[active].num}
                </span>
                <span style={{ fontSize: 17, fontWeight: 800, letterSpacing: "-.02em" }}>
                  {items[active].title}
                </span>
                <span style={{
                  fontSize: 10, fontWeight: 700, color: "var(--gold-lt)",
                  background: "rgba(201,162,39,.06)", border: "1px solid rgba(201,162,39,.15)",
                  borderRadius: 99, padding: "2px 9px",
                }}>
                  {items[active].time}
                </span>
              </div>
              <p style={{
                fontSize: 14, color: "var(--t2)", lineHeight: 1.85,
                marginBottom: 28, maxWidth: 380,
              }}>
                {items[active].desc}
              </p>
            </div>

            {/* Step dots */}
            <div style={{ display: "flex", gap: 8, marginBottom: 32 }}>
              {items.map((_, i) => (
                <div key={i} style={{
                  height: 8, borderRadius: 99,
                  width: i === active ? 28 : 8,
                  background: i === active ? "var(--gold-lt)" : "rgba(201,162,39,.18)",
                  transition: "all .45s cubic-bezier(.16,1,.3,1)",
                }} />
              ))}
            </div>

            <a href="/falar" className="btn-primary">Começar agora →</a>
          </div>

        </div>
      </div>

      {/* Mobile fallback — shown only on small screens */}
      <style>{`
        @media (max-width: 768px) {
          .process-grid { grid-template-columns: 1fr !important; }
          .process-wheel-col { display: none !important; }
        }
      `}</style>
    </section>
  );
}
