"use client";
import { useEffect, useRef, useState } from "react";

// ── Types ────────────────────────────────────────────────────────────────────
export interface FlyItem {
  icon: string;
  title: string;
  desc: string;
}

// ── Config ───────────────────────────────────────────────────────────────────
// Starting positions (off-screen) for each of the 6 cards
// Each card comes from a different cinematic direction
const STARTS = [
  { x: -1600, y: -400, r: -24 }, // 0 — far top-left
  { x:    80, y: -900, r:   8 }, // 1 — straight above center
  { x:  1600, y: -350, r:  22 }, // 2 — far top-right
  { x: -1500, y:  450, r:  18 }, // 3 — far bottom-left
  { x:   -50, y:  900, r: -10 }, // 4 — straight below center
  { x:  1500, y:  500, r: -20 }, // 5 — far bottom-right
];

// At what % of section scroll each card starts its animation
const TRIGGERS = [0.04, 0.16, 0.28, 0.40, 0.52, 0.64];
const DURATION = 0.22; // each card takes this fraction of scroll to land

// Individual float durations + delays for organic feel
const FLOAT = [
  { dur: "3.8s", delay: "0.0s" },
  { dur: "4.3s", delay: "0.7s" },
  { dur: "3.5s", delay: "1.4s" },
  { dur: "4.6s", delay: "0.4s" },
  { dur: "3.9s", delay: "1.1s" },
  { dur: "4.1s", delay: "1.8s" },
];

// ── Easing ───────────────────────────────────────────────────────────────────
const easeOutQuart = (t: number) =>
  1 - Math.pow(1 - Math.max(0, Math.min(1, t)), 4);

// ── Component ────────────────────────────────────────────────────────────────
interface Props {
  items: FlyItem[];
  sectionTitle?: string;
  sectionBadge?: string;
  heading: React.ReactNode;
}

export default function FlyInGrid({ items, sectionBadge = "Para Quem", heading }: Props) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const sectionRef = useRef<HTMLElement>(null);
  const wrapRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef  = useRef<HTMLDivElement>(null);
  const rafId      = useRef(0);
  const landed     = useRef<boolean[]>(new Array(items.length).fill(false));

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const animate = () => {
      const { top } = section.getBoundingClientRect();
      const scrollH = section.offsetHeight - window.innerHeight;
      const p       = Math.max(0, Math.min(-top / scrollH, 1));

      // Header reveals early
      if (headerRef.current) {
        const hp = easeOutQuart(Math.min(p / 0.06, 1));
        headerRef.current.style.opacity    = String(hp);
        headerRef.current.style.transform  = `translateY(${(1 - hp) * 24}px)`;
      }

      items.forEach((_, i) => {
        const wrap = wrapRefs.current[i];
        if (!wrap) return;

        const raw   = (p - TRIGGERS[i]) / DURATION;
        const cardP = Math.max(0, Math.min(raw, 1));
        const eased = easeOutQuart(cardP);

        if (cardP <= 0) {
          // Off-screen — clear landed state
          if (landed.current[i]) {
            landed.current[i] = false;
            wrap.classList.remove("fly-landed");
            wrap.style.animationName = "";
          }
          wrap.style.opacity   = "0";
          wrap.style.transform = `translate(${STARTS[i].x}px,${STARTS[i].y}px) rotate(${STARTS[i].r}deg) scale(0.72)`;

        } else if (cardP >= 1) {
          // Landed — trigger float
          if (!landed.current[i]) {
            landed.current[i] = true;
            wrap.style.opacity   = "1";
            wrap.style.transform = "";
            wrap.classList.add("fly-landed");
          }

        } else {
          // In-flight — interpolate
          if (landed.current[i]) {
            landed.current[i] = false;
            wrap.classList.remove("fly-landed");
          }
          const x     = STARTS[i].x * (1 - eased);
          const y     = STARTS[i].y * (1 - eased);
          const r     = STARTS[i].r * (1 - eased);
          const scale = 0.72 + eased * 0.28;
          wrap.style.opacity   = String(Math.min(cardP * 5, 1));
          wrap.style.transform = `translate(${x}px,${y}px) rotate(${r}deg) scale(${scale})`;
        }
      });

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId.current);
  }, [items]);

  // Tilt handlers on inner card (separate from fly wrapper — no conflict)
  function tilt(e: React.MouseEvent<HTMLDivElement>) {
    const el = e.currentTarget;
    el.style.transition = "border-color .2s, box-shadow .2s";
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width  - 0.5) * 16;
    const y = ((e.clientY - r.top)  / r.height - 0.5) * -16;
    el.style.transform   = `perspective(700px) rotateX(${y}deg) rotateY(${x}deg) translateY(-5px)`;
    el.style.borderColor = "var(--bdr-gold)";
    el.style.boxShadow   = "0 20px 60px rgba(192,144,40,.12)";
  }
  function resetTilt(e: React.MouseEvent<HTMLDivElement>) {
    const el = e.currentTarget;
    el.style.transition  = "transform .5s cubic-bezier(.16,1,.3,1), border-color .3s, box-shadow .3s";
    el.style.transform   = "";
    el.style.borderColor = "";
    el.style.boxShadow   = "";
  }

  // ── Mobile fallback: simple stacked cards ────────────
  if (isMobile) {
    return (
      <section id="para-quem" style={{ padding: "64px 0", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 560, margin: "0 auto", padding: "0 20px" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div className="badge" style={{ marginBottom: 16 }}>{sectionBadge}</div>
            <h2 style={{ fontSize: "clamp(26px,7vw,36px)", fontWeight: 900, letterSpacing: "-.04em", lineHeight: 1.15 }}>{heading}</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {items.map((item, i) => (
              <div key={i} className="glass-card mob-card" style={{ padding: "18px 20px", display: "flex", gap: 16, alignItems: "flex-start", animationDelay: `${i * 0.07}s` } as React.CSSProperties}>
                <div style={{ fontSize: 26, flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <h3 style={{ fontSize: 14, fontWeight: 700, letterSpacing: "-.01em", marginBottom: 6 }}>{item.title}</h3>
                  <p style={{ fontSize: 13, color: "var(--t2)", lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="para-quem"
      style={{
        // Enough scroll height for all cards to fly in + float time
        height: `${items.length * 60 + 120}vh`,
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* Sticky viewport */}
      <div style={{
        position: "sticky", top: 0, height: "100vh",
        display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center",
        overflow: "hidden",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", width: "100%" }}>

          {/* Header — fades in first */}
          <div
            ref={headerRef}
            style={{ textAlign: "center", marginBottom: 44, opacity: 0, transform: "translateY(24px)" }}
          >
            <div className="badge" style={{ marginBottom: 20 }}>{sectionBadge}</div>
            <h2 style={{
              fontSize: "clamp(30px,4vw,48px)", fontWeight: 900,
              letterSpacing: "-.04em", lineHeight: 1.1,
            }}>
              {heading}
            </h2>
          </div>

          {/* Card grid */}
          <div className="grid-3">
            {items.map((item, i) => (
              // Outer wrapper: fly + float animation (RAF-driven)
              <div
                key={i}
                ref={el => { wrapRefs.current[i] = el; }}
                className="fly-wrapper"
                style={{
                  opacity: 0,
                  transform: `translate(${STARTS[i].x}px,${STARTS[i].y}px) rotate(${STARTS[i].r}deg) scale(0.72)`,
                  willChange: "transform, opacity",
                  // CSS vars for per-card float timing
                  ["--fly-dur"   as string]: FLOAT[i].dur,
                  ["--fly-delay" as string]: FLOAT[i].delay,
                }}
              >
                {/* Inner card: 3D tilt on hover */}
                <div
                  className="glass-card"
                  style={{ padding: 24, display: "flex", gap: 18, alignItems: "flex-start", height: "100%" }}
                  onMouseMove={tilt}
                  onMouseLeave={resetTilt}
                >
                  <div style={{ fontSize: 28, flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-.01em", marginBottom: 8 }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: 13, color: "var(--t2)", lineHeight: 1.65 }}>{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
