"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LaunchScreen from "./Launchscreen";
import SmokeOverlay from "./Smokeoverlay";

const API_URL = "https://launch.betalearnings.com/api/buttons";

function Particles({ active }) {
  if (!active) return null;
  const colors = ["#A00300", "#ff6b6b", "#ffd6d6", "#fff0f0", "#ffb3b3"];
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
      {Array.from({ length: 18 }).map((_, i) => {
        const angle = (i / 18) * 360;
        const rad = (angle * Math.PI) / 180;
        const tx = Math.cos(rad) * 90;
        const ty = Math.sin(rad) * 90;
        const isHeart = i % 4 === 0;
        return (
          <motion.div
            key={i}
            className="absolute flex items-center justify-center"
            style={{
              left: "50%",
              top: "50%",
              marginLeft: "-5px",
              marginTop: "-5px",
              width: 10,
              height: 10,
              color: colors[i % colors.length],
              fontSize: isHeart ? 10 : 6,
            }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
            animate={{ x: tx, y: ty, opacity: 0, scale: 0, rotate: angle }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {isHeart ? "♥" : "✦"}
          </motion.div>
        );
      })}
    </div>
  );
}

function Rivet({ style }) {
  return (
    <div
      style={{
        width: 9,
        height: 9,
        borderRadius: "50%",
        background: "radial-gradient(circle at 35% 30%, #7a7a8a, #252530)",
        boxShadow:
          "0 2px 4px rgba(0,0,0,0.9), inset 0 1px 1px rgba(255,255,255,0.1)",
        position: "absolute",
        zIndex: 10,
        ...style,
      }}
    />
  );
}

function PanelRivets() {
  return (
    <>
      <Rivet style={{ top: 7, left: 7 }} />
      <Rivet style={{ top: 7, right: 7 }} />
      <Rivet style={{ bottom: 7, left: 7 }} />
      <Rivet style={{ bottom: 7, right: 7 }} />
      <Rivet style={{ top: 7, left: "50%", transform: "translateX(-50%)" }} />
      <Rivet
        style={{ bottom: 7, left: "50%", transform: "translateX(-50%)" }}
      />
      <Rivet style={{ left: 7, top: "50%", transform: "translateY(-50%)" }} />
      <Rivet style={{ right: 7, top: "50%", transform: "translateY(-50%)" }} />
      <Rivet style={{ top: 7, left: "25%" }} />
      <Rivet style={{ top: 7, right: "25%" }} />
      <Rivet style={{ bottom: 7, left: "25%" }} />
      <Rivet style={{ bottom: 7, right: "25%" }} />
      <Rivet style={{ left: 7, top: "25%" }} />
      <Rivet style={{ left: 7, bottom: "25%" }} />
      <Rivet style={{ right: 7, top: "25%" }} />
      <Rivet style={{ right: 7, bottom: "25%" }} />
    </>
  );
}

function PadlockSVG({ pulse }) {
  return (
    <svg
      viewBox="0 0 90 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%" }}
    >
      <defs>
        <radialGradient id="bodyGradL" cx="40%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#8a7850" />
          <stop offset="50%" stopColor="#3a3020" />
          <stop offset="100%" stopColor="#1a1208" />
        </radialGradient>
        <radialGradient id="glowRedL" cx="50%" cy="60%" r="55%">
          <stop offset="0%" stopColor={`rgba(130,10,0,${0.5 * pulse})`} />
          <stop offset="60%" stopColor={`rgba(80,5,0,${0.22 * pulse})`} />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
        <filter id="lockGlowL" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="redGlowL" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <ellipse
        cx="45"
        cy="80"
        rx="32"
        ry="22"
        fill="url(#glowRedL)"
        filter="url(#redGlowL)"
      />
      <path
        d="M25 58 L25 36 Q25 10 45 10 Q65 10 65 36 L65 58"
        stroke="#5a4828"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
        filter="url(#lockGlowL)"
      />
      <path
        d="M27 58 L27 37 Q27 13 45 13 Q62 13 62 37 L62 58"
        stroke="rgba(255,200,100,0.13)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <rect
        x="38"
        y="6"
        width="14"
        height="8"
        rx="4"
        fill="#3a2e18"
        stroke="rgba(255,200,80,0.12)"
        strokeWidth="1"
      />
      <rect
        x="10"
        y="55"
        width="70"
        height="54"
        rx="10"
        ry="10"
        fill="url(#bodyGradL)"
      />
      <rect
        x="10"
        y="55"
        width="70"
        height="54"
        rx="10"
        ry="10"
        stroke="rgba(255,180,80,0.1)"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M18 60 Q45 56 72 60"
        stroke="rgba(255,200,100,0.09)"
        strokeWidth="1.5"
        fill="none"
      />
      <circle
        cx="45"
        cy="80"
        r="18"
        fill="none"
        stroke="rgba(130,100,40,0.3)"
        strokeWidth="1.8"
      />
      <circle
        cx="45"
        cy="80"
        r="13"
        fill="none"
        stroke="rgba(130,100,40,0.2)"
        strokeWidth="1"
      />
      {Array.from({ length: 10 }).map((_, i) => {
        const a = (i / 10) * Math.PI * 2;
        return (
          <line
            key={i}
            x1={45 + Math.cos(a) * 15}
            y1={80 + Math.sin(a) * 15}
            x2={45 + Math.cos(a) * 20}
            y2={80 + Math.sin(a) * 20}
            stroke="rgba(130,100,40,0.25)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        );
      })}
      <circle
        cx="45"
        cy="80"
        r="9"
        fill="#0c0a06"
        stroke="rgba(80,20,0,0.3)"
        strokeWidth="1"
      />
      <circle cx="45" cy="78" r="4.5" fill="#050403" />
      <rect x="43" y="79" width="4" height="7" rx="2" fill="#050403" />
    </svg>
  );
}

function SlotCard({
  slotKey,
  index,
  isUnlocked,
  videoRef,
  justUnlocked,
  onUnlockVideoEnd,
}) {
  const [showParticles, setShowParticles] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [pulse, setPulse] = useState(1);

  useEffect(() => {
    if (justUnlocked) {
      setShowParticles(true);
      setShowImage(false);
      const t = setTimeout(() => setShowParticles(false), 900);
      return () => clearTimeout(t);
    }
  }, [justUnlocked]);

  useEffect(() => {
    let frame;
    let start = null;
    const animate = (ts) => {
      if (!start) start = ts;
      const t = ((ts - start) / 2200) % 1;
      setPulse(0.65 + 0.35 * Math.sin(t * Math.PI * 2));
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.93 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: index * 0.07,
        duration: 0.55,
        ease: [0.23, 1, 0.32, 1],
      }}
      style={{ position: "relative", width: "100%", height: "100%" }}
    >
      <motion.div
        style={{
          position: "absolute",
          inset: -4,
          pointerEvents: "none",
          zIndex: 0,
          filter: "blur(12px)",
          borderRadius: 3,
        }}
        animate={
          isUnlocked
            ? {
                opacity: [0.5, 0.85, 0.5],
                background:
                  "radial-gradient(ellipse at 50% 75%, rgba(190,20,0,0.75) 0%, transparent 70%)",
              }
            : { opacity: 0 }
        }
        transition={{ repeat: Infinity, duration: 2.4 }}
      />

      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          zIndex: 1,
          background: isUnlocked
            ? "radial-gradient(ellipse at 50% 40%, #1c1012 0%, #0e080a 50%, #060406 100%)"
            : "radial-gradient(ellipse at 50% 40%, #18181e 0%, #0e0e14 50%, #07070d 100%)",
          border: `2px solid ${isUnlocked ? "rgba(80,10,5,0.9)" : "rgba(20,20,35,0.95)"}`,
          boxShadow: [
            "inset 0 0 60px rgba(0,0,0,0.85)",
            "inset 0 2px 4px rgba(255,255,255,0.025)",
            isUnlocked
              ? "0 0 40px rgba(160,10,0,0.25), 0 8px 32px rgba(0,0,0,0.8)"
              : "0 8px 32px rgba(0,0,0,0.8)",
          ].join(", "),
          overflow: "hidden",
          transition: "background 0.6s, border 0.4s, box-shadow 0.5s",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.007) 3px, rgba(255,255,255,0.007) 4px),
              repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(0,0,0,0.15) 3px, rgba(0,0,0,0.15) 4px)
            `,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 14,
            borderRadius: 2,
            border: "1px solid rgba(0,0,0,0.7)",
            boxShadow: "inset 0 4px 16px rgba(0,0,0,0.6)",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "80%",
            height: "60%",
            background: isUnlocked
              ? `radial-gradient(ellipse at 50% 90%, rgba(200,20,0,${0.55 * pulse}) 0%, rgba(140,10,0,${0.28 * pulse}) 40%, transparent 75%)`
              : `radial-gradient(ellipse at 50% 90%, rgba(100,10,0,${0.2 * pulse}) 0%, transparent 65%)`,
            pointerEvents: "none",
            transition: "background 0.5s",
            zIndex: 1,
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: "10% 10% 10% 10%",
            borderRadius: 8,
            overflow: "hidden",
            background: "#04040f",
            zIndex: 3,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              zIndex: 10,
              background: isUnlocked
                ? "linear-gradient(135deg, rgba(160,3,0,0.08) 0%, transparent 50%, rgba(160,3,0,0.04) 100%)"
                : "transparent",
              transition: "background 0.6s",
            }}
          />

          {!showImage && (
            <video
              ref={videoRef}
              src="/unlock3.mp4"
              muted
              playsInline
              preload="auto"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: isUnlocked
                  ? "brightness(1.05) saturate(1.15)"
                  : "brightness(0.22) saturate(0) grayscale(1)",
                transition: "filter 0.7s ease",
              }}
              onEnded={() => {
                setShowImage(true);
                if (onUnlockVideoEnd) onUnlockVideoEnd(slotKey);
              }}
            />
          )}

          {showImage && (
            <motion.img
              src="/last-img.jpeg"
              alt="Final"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            />
          )}

          <AnimatePresence>
            {!isUnlocked && (
              <motion.div
                key="locked-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 20,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(4,4,15,0.5)",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "7px",
                    color: "rgba(255,255,255,0.15)",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    marginTop: 6,
                  }}
                >
                  Locked
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {justUnlocked && (
              <motion.div
                key="flash"
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 30,
                  background:
                    "radial-gradient(circle, rgba(160,3,0,0.7) 0%, transparent 70%)",
                }}
                initial={{ opacity: 0.9 }}
                animate={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
              />
            )}
          </AnimatePresence>
        </div>

        <PanelRivets />

        <div
          style={{
            position: "absolute",
            top: 18,
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: 8,
            fontFamily: "monospace",
            color: isUnlocked
              ? "rgba(255,180,180,0.22)"
              : "rgba(255,255,255,0.07)",
            letterSpacing: "0.25em",
            userSelect: "none",
            zIndex: 11,
          }}
        >
          {slotKey.padStart(2, "0")}
        </div>

        <Particles active={showParticles} />
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [buttonStates, setButtonStates] = useState({});
  const [justUnlocked, setJustUnlocked] = useState({});
  const [showFinalVideo, setShowFinalVideo] = useState(false);
  const [allUnlocked, setAllUnlocked] = useState(false);
  const videoRefs = useRef({});
  const previousStates = useRef({});
  const [targetCount, setTargetCount] = useState(9);
  const finalVideoRef = useRef(null);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [showLaunchScreen, setShowLaunchScreen] = useState(false);

  const fetchButtons = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      const newButtons = data.buttons;
      const unlocks = {};
      Object.keys(newButtons).forEach((key) => {
        const prev = previousStates.current[key] || 0;
        const current = newButtons[key];
        if (prev === 0 && current === 1) {
          triggerUnlock(key);
          unlocks[key] = true;
        }
      });
      if (Object.keys(unlocks).length > 0) {
        setJustUnlocked(unlocks);
        setTimeout(() => setJustUnlocked({}), 900);
      }
      previousStates.current = newButtons;
      setButtonStates(newButtons);
    } catch (err) {
      console.error("API error:", err);
    }
  };

  const triggerUnlock = (key) => {
    const video = videoRefs.current[key];
    if (!video) return;
    video.currentTime = 0;
    video.play();
  };

  useEffect(() => {
    fetchButtons();
    const interval = setInterval(fetchButtons, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const savedTarget = localStorage.getItem("launchTargetCount");
    if (savedTarget) setTargetCount(Number(savedTarget));
  }, []);

  const totalUnlocked = Object.values(buttonStates).filter(
    (v) => v === 1,
  ).length;

  useEffect(() => {
    setAllUnlocked(totalUnlocked >= targetCount);
  }, [totalUnlocked, targetCount]);

  const handleUnlockVideoEnd = (key) => {
    if (allUnlocked) {
      setTimeout(() => setShowFinalVideo(true), 800);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: 100%; overflow: hidden; background: #030310; }
        .silk-bg::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
          background-size: 200px;
          pointer-events: none;
          z-index: 0;
          opacity: 0.6;
        }
        .corner-ornament { position: absolute; width: 32px; height: 32px; border-color: rgba(160,3,0,0.25); border-style: solid; }
        .corner-ornament.tl { top: 16px; left: 16px; border-width: 1px 0 0 1px; }
        .corner-ornament.tr { top: 16px; right: 16px; border-width: 1px 1px 0 0; }
        .corner-ornament.bl { bottom: 16px; left: 16px; border-width: 0 0 1px 1px; }
        .corner-ornament.br { bottom: 16px; right: 16px; border-width: 0 1px 1px 0; }
      `}</style>

      <AnimatePresence>
        {!showFinalVideo && (
          <motion.main
            key="main-content"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
            className="silk-bg"
            style={{
              height: "100vh",
              overflow: "hidden",
              background: `
                radial-gradient(ellipse 70% 50% at 50% -5%, rgba(160,3,0,0.12) 0%, transparent 60%),
                radial-gradient(ellipse 50% 40% at 20% 110%, rgba(0,9,48,0.8) 0%, transparent 55%),
                radial-gradient(ellipse 40% 35% at 85% 95%, rgba(160,3,0,0.06) 0%, transparent 50%),
                #030310
              `,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px 16px",
              position: "relative",
            }}
          >
            <div className="corner-ornament tl" />
            <div className="corner-ornament tr" />
            <div className="corner-ornament bl" />
            <div className="corner-ornament br" />

            {/* Header — compact */}
            <motion.div
              initial={{ opacity: 0, y: -24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              style={{
                textAlign: "center",
                marginBottom: "10px",
                position: "relative",
                zIndex: 1,
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                  marginBottom: "6px",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "1px",
                    background:
                      "linear-gradient(to right, transparent, rgba(160,3,0,0.6))",
                  }}
                />
                <motion.span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "9px",
                    fontWeight: 600,
                    color: "#A00300",
                    letterSpacing: "0.35em",
                    textTransform: "uppercase",
                  }}
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                >
                  ♥ Women's Day Week ♥
                </motion.span>
                <div
                  style={{
                    width: "40px",
                    height: "1px",
                    background:
                      "linear-gradient(to left, transparent, rgba(160,3,0,0.6))",
                  }}
                />
              </div>
              <div style={{ position: "relative", display: "inline-block" }}>
                <h1 style={{ margin: 0, lineHeight: 1, textAlign: "center" }}>
                  <span
                    style={{
                      display: "block",
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 700,
                      fontSize: "clamp(28px, 4vw, 52px)",
                      color: "#f9f4f4",
                      letterSpacing: "-0.02em",
                      lineHeight: 0.95,
                    }}
                  >
                    <span className="text-[#A00300]"> SheRise </span>Grand Sale
                  </span>
                </h1>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    fontSize: "clamp(11px, 1.2vw, 13px)",
                    color: "rgba(255,255,255,0.38)",
                    letterSpacing: "0.06em",
                    textAlign: "center",
                    marginTop: "6px",
                  }}
                >
                  Celebrating women who build, sell & inspire
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    marginTop: "6px",
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      maxWidth: "60px",
                      height: "1px",
                      background:
                        "linear-gradient(to right, transparent, rgba(160,3,0,0.4))",
                    }}
                  />
                  <svg width="6" height="6" viewBox="0 0 6 6" fill="none">
                    <rect
                      x="3"
                      y="0"
                      width="3"
                      height="3"
                      transform="rotate(45 3 3)"
                      fill="rgba(160,3,0,0.5)"
                    />
                  </svg>
                  <div
                    style={{
                      flex: 1,
                      maxWidth: "60px",
                      height: "1px",
                      background:
                        "linear-gradient(to left, transparent, rgba(160,3,0,0.4))",
                    }}
                  />
                </div>
              </div>
            </motion.div>

            <SmokeOverlay />

            {/* Grid — fills remaining height, stays square via min() */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gridTemplateRows: "repeat(3, 1fr)",
                gap: "8px",
                width: "min(calc(100vh - 160px), calc(100vw - 32px))",
                height: "min(calc(100vh - 160px), calc(100vw - 32px))",
                flexShrink: 0,
                position: "relative",
                zIndex: 1,
                background: "#020204",
                padding: "8px",
                border: "3px solid #0c0c18",
                boxShadow:
                  "0 0 80px rgba(0,0,0,0.9), inset 0 0 30px rgba(0,0,0,0.6)",
              }}
            >
              {Array.from({ length: targetCount }, (_, i) => {
                const key = String(i + 1);
                return (
                  <SlotCard
                    key={key}
                    slotKey={key}
                    index={i}
                    isUnlocked={buttonStates[key] === 1}
                    videoRef={(el) => (videoRefs.current[key] = el)}
                    justUnlocked={!!justUnlocked[key]}
                    onUnlockVideoEnd={handleUnlockVideoEnd}
                  />
                );
              })}
            </div>

            {/* Footer — compact */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              style={{
                marginTop: "8px",
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "9px",
                fontStyle: "italic",
                color: "rgba(160,3,0,0.3)",
                letterSpacing: "0.2em",
                zIndex: 1,
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <span style={{ opacity: 0.5 }}>— By Women · For Everyone —</span>
              <span style={{ opacity: 0.25 }}>· Updating every 2s</span>
            </motion.div>
          </motion.main>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showFinalVideo && (
          <motion.div
            key="final-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              overflow: "hidden",
              background: "black",
            }}
          >
            <AnimatePresence>
              {!showLaunchScreen && (
                <motion.div
                  key="video-layer"
                  initial={{ opacity: 1 }}
                  exit={{
                    opacity: 0,
                    scale: 1.06,
                    filter: "blur(12px) brightness(2)",
                  }}
                  transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
                  style={{ position: "absolute", inset: 0, zIndex: 1 }}
                >
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0.8 }}
                    animate={{ scale: 2.2, opacity: 0 }}
                    transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "radial-gradient(circle at center, rgba(160,3,0,0.8) 0%, rgba(160,3,0,0.5) 25%, rgba(0,0,0,1) 70%)",
                      zIndex: 2,
                    }}
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.4, 0] }}
                    transition={{ duration: 1.2 }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)",
                      zIndex: 3,
                    }}
                  />
                  <motion.video
                    ref={finalVideoRef}
                    src="/end.mp4"
                    autoPlay
                    muted={!soundEnabled}
                    playsInline
                    onLoadedMetadata={(e) => {
                      e.currentTarget.playbackRate = 0.75;
                    }}
                    className="w-full h-full object-cover"
                    initial={{ filter: "blur(8px) brightness(0.6)" }}
                    animate={{ filter: "blur(0px) brightness(1)" }}
                    transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      position: "relative",
                      zIndex: 1,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transform: "scale(1.3)",
                    }}
                    onEnded={() => {
                      setTimeout(() => setShowLaunchScreen(true), 320);
                    }}
                  />

                  {!soundEnabled && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                      onClick={() => {
                        if (finalVideoRef.current) {
                          finalVideoRef.current.muted = false;
                          finalVideoRef.current.play();
                          setSoundEnabled(true);
                        }
                      }}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                      style={{
                        position: "absolute",
                        top: "24px",
                        right: "24px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "0 16px 0 12px",
                        height: "40px",
                        borderRadius: "40px",
                        background: "rgba(10,10,20,0.6)",
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        color: "#fff",
                        cursor: "pointer",
                        zIndex: 5,
                        boxShadow:
                          "0 2px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.07)",
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M3 9.5V14.5H7L13 19V5L7 9.5H3Z"
                          fill="rgba(255,255,255,0.9)"
                        />
                        <line
                          x1="17"
                          y1="9"
                          x2="21"
                          y2="15"
                          stroke="rgba(255,255,255,0.9)"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <line
                          x1="21"
                          y1="9"
                          x2="17"
                          y2="15"
                          stroke="rgba(255,255,255,0.9)"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                      <motion.div
                        animate={{ opacity: [1, 0.2, 1] }}
                        transition={{
                          repeat: Infinity,
                          duration: 1.6,
                          ease: "easeInOut",
                        }}
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: "50%",
                          background: "#A00300",
                          flexShrink: 0,
                        }}
                      />
                    </motion.button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showLaunchScreen && (
                <motion.div
                  key="launch-screen-layer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                  style={{ position: "absolute", inset: 0, zIndex: 10 }}
                >
                  <motion.div
                    initial={{ opacity: 0.7, scale: 0.8 }}
                    animate={{ opacity: 0, scale: 2.5 }}
                    transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      zIndex: 20,
                      pointerEvents: "none",
                      background:
                        "radial-gradient(circle at center, rgba(160,3,0,0.65) 0%, rgba(30,1,0,0.4) 40%, transparent 70%)",
                    }}
                  />
                  <LaunchScreen />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
