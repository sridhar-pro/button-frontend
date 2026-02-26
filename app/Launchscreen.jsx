"use client";
import { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── 3D Rotating Rose / Gem orb ────────────────────────────────────────────
function OrbScene() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let frame;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const W = () => canvas.offsetWidth;
    const H = () => canvas.offsetHeight;

    const drawOrb = () => {
      ctx.clearRect(0, 0, W(), H());
      const cx = W() / 2;
      const cy = H() / 2;
      const r = Math.min(W(), H()) * 0.38;

      // Outer ambient glow
      const ambient = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 2.4);
      ambient.addColorStop(0, "rgba(160,3,0,0.18)");
      ambient.addColorStop(0.4, "rgba(100,2,0,0.09)");
      ambient.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(cx, cy, r * 2.4, 0, Math.PI * 2);
      ctx.fillStyle = ambient;
      ctx.fill();

      // ── 3D faceted gem — draw rotated facets ──
      const facets = 12;
      for (let fi = 0; fi < facets; fi++) {
        const a1 = (fi / facets) * Math.PI * 2 + t * 0.4;
        const a2 = ((fi + 1) / facets) * Math.PI * 2 + t * 0.4;
        const depth = Math.sin(a1 + t * 0.3);
        const brightness = 0.35 + 0.65 * ((depth + 1) / 2);
        const isFront = depth > 0;

        // Tip of facet goes to inner ring
        const rx1 = cx + Math.cos(a1) * r;
        const ry1 = cy + Math.sin(a1) * r * 0.55;
        const rx2 = cx + Math.cos(a2) * r;
        const ry2 = cy + Math.sin(a2) * r * 0.55;
        const mx = cx + Math.cos((a1 + a2) / 2) * r * 0.38;
        const my = cy + Math.sin((a1 + a2) / 2) * r * 0.22;

        ctx.beginPath();
        ctx.moveTo(rx1, ry1);
        ctx.lineTo(mx, my);
        ctx.lineTo(rx2, ry2);
        ctx.closePath();

        const r1 = Math.round(isFront ? 160 * brightness : 80 * brightness);
        const g1 = Math.round(3 * brightness);
        const b1 = Math.round(0);
        ctx.fillStyle = `rgba(${r1},${g1},${b1},${isFront ? 0.82 : 0.45})`;
        ctx.fill();

        if (isFront) {
          ctx.strokeStyle = `rgba(255,180,160,${0.08 + 0.12 * brightness})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }

        // Bottom band
        const ba1 = a1;
        const ba2 = a2;
        const bx1 = cx + Math.cos(ba1) * r;
        const by1 = cy + Math.sin(ba1) * r * 0.55;
        const bx2 = cx + Math.cos(ba2) * r;
        const by2 = cy + Math.sin(ba2) * r * 0.55;
        const bot = cy + r * 0.68;

        ctx.beginPath();
        ctx.moveTo(bx1, by1);
        ctx.lineTo(bx2, by2);
        ctx.lineTo((bx1 + bx2) / 2, bot);
        ctx.closePath();
        const dr = Math.round(isFront ? 120 * brightness : 50 * brightness);
        ctx.fillStyle = `rgba(${dr},${Math.round(dr * 0.02)},0,${isFront ? 0.75 : 0.38})`;
        ctx.fill();
      }

      // Top cap
      const capGrad = ctx.createRadialGradient(
        cx - r * 0.2,
        cy - r * 0.28,
        0,
        cx,
        cy,
        r * 0.6,
      );
      capGrad.addColorStop(0, "rgba(255,210,200,0.55)");
      capGrad.addColorStop(0.35, "rgba(200,30,10,0.45)");
      capGrad.addColorStop(1, "rgba(80,3,0,0.0)");
      ctx.beginPath();
      ctx.ellipse(cx, cy - r * 0.05, r * 0.62, r * 0.32, 0, 0, Math.PI * 2);
      ctx.fillStyle = capGrad;
      ctx.fill();

      // Specular highlight
      const specGrad = ctx.createRadialGradient(
        cx - r * 0.22,
        cy - r * 0.28,
        0,
        cx - r * 0.1,
        cy - r * 0.15,
        r * 0.38,
      );
      specGrad.addColorStop(0, "rgba(255,255,255,0.75)");
      specGrad.addColorStop(0.4, "rgba(255,220,210,0.22)");
      specGrad.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.ellipse(
        cx - r * 0.12,
        cy - r * 0.2,
        r * 0.26,
        r * 0.14,
        -0.3,
        0,
        Math.PI * 2,
      );
      ctx.fillStyle = specGrad;
      ctx.fill();

      // Floor reflection
      const reflGrad = ctx.createRadialGradient(
        cx,
        cy + r * 0.85,
        0,
        cx,
        cy + r * 0.85,
        r * 0.7,
      );
      reflGrad.addColorStop(0, "rgba(160,3,0,0.28)");
      reflGrad.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.ellipse(cx, cy + r * 0.88, r * 0.52, r * 0.12, 0, 0, Math.PI * 2);
      ctx.fillStyle = reflGrad;
      ctx.fill();

      // Orbiting particles
      for (let pi = 0; pi < 14; pi++) {
        const pa = (pi / 14) * Math.PI * 2 + t * (pi % 2 === 0 ? 0.7 : -0.5);
        const pr = r * (1.18 + 0.08 * Math.sin(t * 1.3 + pi));
        const px = cx + Math.cos(pa) * pr;
        const py = cy + Math.sin(pa) * pr * 0.38;
        const ps = 1.5 + 1.2 * Math.sin(t + pi * 0.9);
        const alpha = 0.4 + 0.4 * Math.sin(t * 0.8 + pi);
        ctx.beginPath();
        ctx.arc(px, py, ps, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,${80 + pi * 10},${40 + pi * 4},${alpha})`;
        ctx.fill();
      }

      t += 0.012;
      frame = requestAnimationFrame(drawOrb);
    };

    drawOrb();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}

// ─── Floating rose petals ───────────────────────────────────────────────────
function Petals() {
  const petals = useMemo(() => {
    return Array.from({ length: 22 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 6,
      dur: 8 + Math.random() * 6, // slightly longer for smoother loop
      size: 6 + Math.random() * 10,
      rot: Math.random() * 360,
      drift: (Math.random() - 0.5) * 120,
    }));
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      {petals.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: "-40px",
            width: p.size,
            height: p.size * 1.3,
            borderRadius: "50% 50% 50% 0",
            background:
              "radial-gradient(circle at 40% 35%, rgba(255,160,140,0.65), rgba(160,3,0,0.55))",
            transform: `rotate(${p.rot}deg)`,
            filter: "blur(0.5px)",
          }}
          animate={{
            y: ["-10vh", "110vh"],
            x: [0, p.drift],
            rotate: [p.rot, p.rot + 360],
            opacity: [0, 0.8, 0.6, 0],
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
// ─── Animated counter ──────────────────────────────────────────────────────
function CountUp({ target, suffix = "", duration = 2.2 }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / (duration * 1000), 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(ease * target));
      if (p < 1) requestAnimationFrame(step);
    };
    const id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [target, duration]);
  return (
    <>
      {val}
      {suffix}
    </>
  );
}

// ─── Decorative horizontal rule ────────────────────────────────────────────
function OrnamentRule() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        width: "100%",
        maxWidth: 480,
      }}
    >
      <div
        style={{
          flex: 1,
          height: 1,
          background:
            "linear-gradient(to right, transparent, rgba(160,3,0,0.55))",
        }}
      />
      <svg width="18" height="18" viewBox="0 0 18 18">
        <rect
          x="9"
          y="0"
          width="6.5"
          height="6.5"
          transform="rotate(45 9 9)"
          fill="rgba(160,3,0,0.7)"
        />
        <rect
          x="9"
          y="0"
          width="3"
          height="3"
          transform="rotate(45 9 9)"
          fill="rgba(255,180,160,0.6)"
        />
      </svg>
      <div
        style={{
          flex: 1,
          height: 1,
          background:
            "linear-gradient(to left, transparent, rgba(160,3,0,0.55))",
        }}
      />
    </div>
  );
}

// ─── Main launch screen ────────────────────────────────────────────────────
export default function LaunchScreen({ onClose }) {
  const [step, setStep] = useState(0); // 0=enter, 1=reveal

  useEffect(() => {
    const t = setTimeout(() => setStep(1), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,700&family=Cinzel:wght@400;600;700;900&display=swap');
        .ls-root * { box-sizing: border-box; margin: 0; padding: 0; }
        .ls-noise::after {
          content: '';
          position: fixed; inset: 0; pointer-events: none; z-index: 1;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.032'/%3E%3C/svg%3E");
          background-size: 180px; opacity: 0.55;
        }
        @keyframes rotateRing {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes counterRotateRing {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
      `}</style>

      <div
        className="ls-root ls-noise"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 10000,
          background: `
            radial-gradient(ellipse 75% 55% at 50% 0%, rgba(160,3,0,0.16) 0%, transparent 65%),
            radial-gradient(ellipse 55% 45% at 20% 110%, rgba(0,9,48,0.8) 0%, transparent 55%),
            radial-gradient(ellipse 45% 40% at 80% 90%, rgba(160,3,0,0.08) 0%, transparent 50%),
            #030310
          `,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <Petals />

        {/* ── Corner ornaments ── */}
        {["tl", "tr", "bl", "br"].map((pos) => (
          <div
            key={pos}
            style={{
              position: "fixed",
              top: pos.startsWith("t") ? 28 : "auto",
              bottom: pos.startsWith("b") ? 28 : "auto",
              left: pos.endsWith("l") ? 28 : "auto",
              right: pos.endsWith("r") ? 28 : "auto",
              width: 52,
              height: 52,
              pointerEvents: "none",
              zIndex: 2,
              borderColor: "rgba(160,3,0,0.3)",
              borderStyle: "solid",
              borderWidth:
                pos === "tl"
                  ? "1px 0 0 1px"
                  : pos === "tr"
                    ? "1px 1px 0 0"
                    : pos === "bl"
                      ? "0 0 1px 1px"
                      : "0 1px 1px 0",
            }}
          />
        ))}

        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            maxWidth: 720,
            padding: "0 24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0,
          }}
        >
          {/* ── 3D Gem Orb ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.4, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            style={{
              position: "relative",
              width: 220,
              height: 220,
              flexShrink: 0,
            }}
          >
            {/* Outer rotating dashed ring */}
            <div
              style={{
                position: "absolute",
                inset: -18,
                borderRadius: "50%",
                border: "1px dashed rgba(160,3,0,0.22)",
                animation: "rotateRing 18s linear infinite",
              }}
            />
            {/* Inner counter-rotating ring with gems */}
            <div
              style={{
                position: "absolute",
                inset: -8,
                borderRadius: "50%",
                border: "1px solid rgba(160,3,0,0.12)",
                animation: "counterRotateRing 12s linear infinite",
              }}
            >
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    width: 5,
                    height: 5,
                    background: "rgba(160,3,0,0.7)",
                    borderRadius: "50%",
                    top: "50%",
                    left: "50%",
                    transform: `rotate(${i * 60}deg) translateX(calc(${220 / 2 + 8}px / 1)) translateY(-50%)`,
                    marginTop: -2.5,
                    marginLeft: -2.5,
                    boxShadow: "0 0 6px rgba(160,3,0,0.9)",
                  }}
                />
              ))}
            </div>
            <OrbScene />
          </motion.div>

          {/* ── "Launched" badge ── */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{
              duration: 0.7,
              delay: 0.55,
              ease: [0.23, 1, 0.32, 1],
            }}
            style={{
              marginTop: -12,
              marginBottom: 16,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                width: 36,
                height: 1,
                background:
                  "linear-gradient(to right, transparent, rgba(160,3,0,0.6))",
              }}
            />
            <span
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: 10,
                fontWeight: 600,
                color: "#A00300",
                letterSpacing: "0.42em",
                textTransform: "uppercase",
              }}
            >
              We Are Live
            </span>
            <div
              style={{
                width: 36,
                height: 1,
                background:
                  "linear-gradient(to left, transparent, rgba(160,3,0,0.6))",
              }}
            />
          </motion.div>

          {/* ── Main headline ── */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.65,
              ease: [0.23, 1, 0.32, 1],
            }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 700,
              fontSize: "clamp(42px, 8vw, 82px)",
              color: "#f9f4f4",
              letterSpacing: "-0.02em",
              lineHeight: 0.95,
              textAlign: "center",
              marginBottom: 6,
            }}
          >
            Celebrating
            <br />
            <em style={{ fontStyle: "italic", color: "#d44", fontWeight: 300 }}>
              Women's Day
            </em>
          </motion.h1>

          {/* ── Ornament rule ── */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.85 }}
            style={{
              marginTop: 18,
              marginBottom: 18,
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <OrnamentRule />
          </motion.div>

          {/* ── Date banner ── */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.95 }}
            style={{
              background:
                "linear-gradient(135deg, rgba(160,3,0,0.18), rgba(80,2,0,0.28))",
              border: "1px solid rgba(160,3,0,0.3)",
              borderRadius: 2,
              padding: "10px 28px",
              marginBottom: 20,
            }}
          >
            <span
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "clamp(11px, 1.8vw, 14px)",
                color: "rgba(255,200,190,0.85)",
                letterSpacing: "0.22em",
              }}
            >
              MARCH 1–8, 2025
            </span>
          </motion.div>

          {/* ── Body copy ── */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.05 }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(15px, 2.2vw, 19px)",
              color: "rgba(255,255,255,0.48)",
              letterSpacing: "0.04em",
              lineHeight: 1.7,
              textAlign: "center",
              maxWidth: 480,
              marginBottom: 20,
            }}
          >
            Join us in celebrating the incredible women entrepreneurs who power
            our marketplace. Discover exclusive deals on handpicked treasures.
          </motion.p>

          {/* ── 25% stat card ── */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.85, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 420,
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(160,3,0,0.18) 0%, rgba(10,6,6,0.7) 70%)",
              border: "1px solid rgba(160,3,0,0.35)",
              borderRadius: 4,
              padding: "28px 32px",
              textAlign: "center",
              overflow: "hidden",
            }}
          >
            {/* Card rivets */}
            {[
              { top: 8, left: 8 },
              { top: 8, right: 8 },
              { bottom: 8, left: 8 },
              { bottom: 8, right: 8 },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle at 35% 30%, #7a7a8a, #252530)",
                  boxShadow:
                    "0 1px 3px rgba(0,0,0,0.9), inset 0 1px 1px rgba(255,255,255,0.08)",
                  ...s,
                }}
              />
            ))}

            {/* Shimmer line */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 1,
                background:
                  "linear-gradient(to right, transparent, rgba(255,160,140,0.3), transparent)",
              }}
            />

            <div
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "clamp(52px, 10vw, 80px)",
                fontWeight: 700,
                color: "#A00300",
                lineHeight: 1,
                letterSpacing: "-0.02em",
                textShadow:
                  "0 0 40px rgba(160,3,0,0.6), 0 0 80px rgba(160,3,0,0.25)",
              }}
            >
              {step === 1 && <CountUp target={25} suffix="%" duration={2.4} />}
            </div>
            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(13px, 2vw, 16px)",
                fontWeight: 600,
                color: "rgba(255,220,210,0.7)",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                marginTop: 8,
              }}
            >
              Reinvested into Women's Advancement
            </div>
            <div
              style={{
                marginTop: 10,
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontSize: "clamp(12px, 1.6vw, 14px)",
                color: "rgba(255,255,255,0.25)",
                letterSpacing: "0.06em",
              }}
            >
              of every sale · powering the next generation
            </div>
          </motion.div>

          {/* ── Bottom flourish ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            style={{
              marginTop: 32,
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: 11,
              color: "rgba(160,3,0,0.35)",
              letterSpacing: "0.22em",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span>♥</span>
            <span>By Women · For Everyone · Always</span>
            <span>♥</span>
          </motion.div>
        </div>
      </div>
    </>
  );
}
