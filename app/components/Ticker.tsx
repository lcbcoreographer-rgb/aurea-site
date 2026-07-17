"use client";
import { useEffect, useRef } from "react";

export default function Ticker({
  children,
  duration = 30,
}: {
  children: React.ReactNode;
  duration?: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const pausedRef = useRef(false);
  const lastXRef = useRef(0);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function wrapScroll() {
    const el = trackRef.current;
    if (!el) return;
    const half = el.scrollWidth / 2;
    if (half <= 0) return;
    if (el.scrollLeft >= half) el.scrollLeft -= half;
    else if (el.scrollLeft < 0) el.scrollLeft += half;
  }

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let raf: number;
    let last = performance.now();
    const pxPerSec = el.scrollWidth / 2 / duration;

    function step(now: number) {
      const dt = now - last;
      last = now;
      if (!draggingRef.current && !pausedRef.current) {
        el!.scrollLeft += (pxPerSec * dt) / 1000;
        wrapScroll();
      }
      raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [duration]);

  function onPointerDown(e: React.PointerEvent) {
    const el = trackRef.current;
    if (!el) return;
    if (e.pointerType === "touch") {
      pausedRef.current = true;
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
      return;
    }
    draggingRef.current = true;
    lastXRef.current = e.clientX;
    el.setPointerCapture(e.pointerId);
    el.style.cursor = "grabbing";
  }

  function onPointerMove(e: React.PointerEvent) {
    if (e.pointerType === "touch" || !draggingRef.current) return;
    const el = trackRef.current;
    if (!el) return;
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    el.scrollLeft -= dx;
    wrapScroll();
  }

  function endDrag(e: React.PointerEvent) {
    const el = trackRef.current;
    if (e.pointerType === "touch") {
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = setTimeout(() => { pausedRef.current = false; }, 1500);
      return;
    }
    draggingRef.current = false;
    if (el) el.style.cursor = "grab";
  }

  return (
    <div
      ref={trackRef}
      className="ticker-track"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={endDrag}
      onScroll={wrapScroll}
    >
      {children}
    </div>
  );
}
