"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const API_URL = "https://button-api.onrender.com/api/buttons";

// Petal / sparkle burst on unlock
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

// Animated lock → bloom icon
function LockIcon({ unlocked }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <motion.rect
        x="3"
        y="11"
        width="18"
        height="11"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.8"
        fill="none"
        animate={{ y: 0 }}
      />
      <motion.path
        strokeLinecap="round"
        strokeWidth="1.8"
        stroke="currentColor"
        fill="none"
        animate={
          unlocked
            ? { d: "M7 11V7a5 5 0 0 1 9.9-1" }
            : { d: "M7 11V7a5 5 0 0 1 10 0v4" }
        }
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
      <motion.circle
        cx="12"
        cy="16"
        r="1.5"
        fill="currentColor"
        animate={{ scale: unlocked ? [1, 1.6, 1] : 1 }}
        transition={{ duration: 0.4 }}
      />
    </svg>
  );
}

// Subtle rose SVG watermark
function RoseWatermark({ opacity = 0.05 }) {
  return (
    <svg
      viewBox="0 0 100 100"
      style={{
        position: "absolute",
        bottom: -10,
        right: -10,
        width: 90,
        height: 90,
        opacity,
        pointerEvents: "none",
      }}
    >
      <g fill="#A00300">
        {/* simplified rose petals */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <ellipse
            key={i}
            cx="50"
            cy="50"
            rx="14"
            ry="26"
            transform={`rotate(${angle} 50 50) translate(0 -16)`}
            opacity={0.6 + (i % 3) * 0.1}
          />
        ))}
        <circle cx="50" cy="50" r="9" fill="#7a0200" />
        <circle cx="50" cy="50" r="5" fill="#A00300" opacity={0.7} />
      </g>
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

  useEffect(() => {
    if (justUnlocked) {
      setShowParticles(true);
      setShowImage(false);
      const t = setTimeout(() => setShowParticles(false), 900);
      return () => clearTimeout(t);
    }
  }, [justUnlocked]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.93 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: index * 0.07,
        duration: 0.55,
        ease: [0.23, 1, 0.32, 1],
      }}
      className="relative group"
    >
      {/* Glow ring on unlock */}
      <motion.div
        className="absolute -inset-[2px] rounded-2xl pointer-events-none"
        animate={
          isUnlocked
            ? {
                opacity: [0, 1, 0.7],
                background:
                  "linear-gradient(135deg, #A00300, #ff6b6b, #A00300)",
              }
            : { opacity: 0 }
        }
        transition={{ duration: 0.7 }}
        style={{ filter: "blur(5px)" }}
      />

      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: isUnlocked
            ? "linear-gradient(145deg, #1a0005 0%, #0e0003 100%)"
            : "linear-gradient(145deg, #07071a 0%, #030312 100%)",
          border: isUnlocked
            ? "1px solid rgba(160,3,0,0.4)"
            : "1px solid rgba(255,255,255,0.05)",
          boxShadow: isUnlocked
            ? "0 0 36px rgba(160,3,0,0.18), inset 0 1px 0 rgba(255,100,100,0.08)"
            : "0 4px 28px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.03)",
          transition: "border 0.4s, box-shadow 0.4s, background 0.4s",
        }}
      >
        {/* Rose watermark */}
        <RoseWatermark opacity={isUnlocked ? 0.09 : 0.04} />

        {/* Header bar */}
        <div className="flex items-center justify-between px-4 pt-3 pb-2 relative z-10">
          <div className="flex items-center gap-2">
            <motion.div
              className="w-2 h-2 rounded-full"
              style={{ background: isUnlocked ? "#A00300" : "#1f1f3a" }}
              animate={
                isUnlocked
                  ? {
                      boxShadow: [
                        "0 0 4px #A00300",
                        "0 0 12px #ff4040",
                        "0 0 4px #A00300",
                      ],
                    }
                  : { boxShadow: "none" }
              }
              transition={{ repeat: Infinity, duration: 2 }}
            />
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.22em",
                color: isUnlocked ? "#ffb3b3" : "#2e2e50",
                textTransform: "uppercase",
                transition: "color 0.4s",
              }}
            >
              Seller{" "}
              <span className="font-sans">{slotKey.padStart(2, "0")}</span>
            </span>
          </div>
          <motion.div
            animate={{ color: isUnlocked ? "#A00300" : "#2e2e50" }}
            transition={{ duration: 0.4 }}
          >
            <LockIcon unlocked={isUnlocked} />
          </motion.div>
        </div>

        {/* Video area */}
        <div
          className="relative mx-3 mb-3 rounded-xl overflow-hidden"
          style={{ height: "180px", background: "#04040f" }}
        >
          {/* Silk sheen overlay */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
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
              className="w-full h-full object-cover"
              onEnded={() => {
                setShowImage(true);
                if (onUnlockVideoEnd) {
                  onUnlockVideoEnd(slotKey);
                }
              }}
              style={{
                filter: isUnlocked
                  ? "brightness(1.05) saturate(1.15)"
                  : "brightness(0.22) saturate(0) grayscale(1)",
                transition: "filter 0.7s ease",
              }}
            />
          )}

          {showImage && (
            <motion.img
              src="/last-img.jpeg"
              alt="Final"
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            />
          )}

          {/* Locked overlay */}
          <AnimatePresence>
            {!isUnlocked && (
              <motion.div
                key="locked-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-2 z-20"
              >
                <motion.div
                  style={{ color: "#1a1a40", fontSize: 28 }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                >
                  ♥
                </motion.div>
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "9px",
                    color: "#1a1a3a",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                  }}
                >
                  Coming Soon
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Unlock flash */}
          <AnimatePresence>
            {justUnlocked && (
              <motion.div
                key="flash"
                className="absolute inset-0 z-30"
                initial={{ opacity: 0.9 }}
                animate={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                style={{
                  background:
                    "radial-gradient(circle, rgba(160,3,0,0.7) 0%, transparent 70%)",
                }}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Status strip */}
        <div
          className="mx-3 mb-3 rounded-lg px-3 py-2 flex items-center justify-between relative z-10"
          style={{
            background: isUnlocked
              ? "rgba(160,3,0,0.1)"
              : "rgba(255,255,255,0.02)",
            border: isUnlocked
              ? "1px solid rgba(160,3,0,0.2)"
              : "1px solid rgba(255,255,255,0.04)",
            transition: "all 0.4s",
          }}
        >
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "13px",
              fontWeight: 600,
              color: isUnlocked ? "#ffb3b3" : "#1f1f3a",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              transition: "color 0.4s",
            }}
          >
            {isUnlocked ? "✦ Live Now" : "Awaiting"}
          </span>
          <motion.div className="flex gap-1">
            {[0, 1, 2].map((dot) => (
              <motion.div
                key={dot}
                className="rounded-full"
                style={{
                  width: 5,
                  height: 5,
                  background: isUnlocked ? "#A00300" : "#0d0d25",
                }}
                animate={
                  isUnlocked
                    ? { opacity: [0.4, 1, 0.4], scale: [1, 1.3, 1] }
                    : { opacity: 0.25 }
                }
                transition={{
                  repeat: Infinity,
                  duration: 1.4,
                  delay: dot * 0.22,
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Particle burst */}
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

    // reset image state
    if (video.dataset) {
      video.dataset.playing = "true";
    }
  };

  useEffect(() => {
    fetchButtons();
    const interval = setInterval(fetchButtons, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const savedTarget = localStorage.getItem("launchTargetCount");
    if (savedTarget) {
      setTargetCount(Number(savedTarget));
    }
  }, []);

  const totalUnlocked = Object.values(buttonStates).filter(
    (v) => v === 1,
  ).length;

  useEffect(() => {
    if (totalUnlocked >= targetCount) {
      setAllUnlocked(true);
    } else {
      setAllUnlocked(false);
    }
  }, [totalUnlocked, targetCount]);

  const handleUnlockVideoEnd = (key) => {
    if (allUnlocked) {
      // small cinematic delay
      setTimeout(() => {
        setShowFinalVideo(true);
      }, 800);
    }
  };
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body { background: #030310; min-height: 100vh; }

        /* Subtle noise texture */
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

        /* Decorative corner lines */
        .corner-ornament {
          position: absolute;
          width: 40px;
          height: 40px;
          border-color: rgba(160,3,0,0.25);
          border-style: solid;
        }
        .corner-ornament.tl { top: 24px; left: 24px; border-width: 1px 0 0 1px; }
        .corner-ornament.tr { top: 24px; right: 24px; border-width: 1px 1px 0 0; }
        .corner-ornament.bl { bottom: 24px; left: 24px; border-width: 0 0 1px 1px; }
        .corner-ornament.br { bottom: 24px; right: 24px; border-width: 0 1px 1px 0; }
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
              minHeight: "100vh",
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
              padding: "48px 24px",
              position: "relative",
            }}
          >
            {/* Corner ornaments */}
            <div className="corner-ornament tl" />
            <div className="corner-ornament tr" />
            <div className="corner-ornament bl" />
            <div className="corner-ornament br" />

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              style={{
                textAlign: "center",
                marginBottom: "44px",
                position: "relative",
                zIndex: 1,
              }}
            >
              {/* Top label */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                  marginBottom: "10px",
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
                    fontSize: "10px",
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

              {/* Main title */}
              <h1
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 900,
                  fontStyle: "italic",
                  fontSize: "clamp(30px, 5.5vw, 52px)",
                  color: "#f9f4f4",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.05,
                }}
              >
                The Launch
              </h1>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontSize: "clamp(12px, 2vw, 16px)",
                  color: "rgba(255,200,200,0.45)",
                  letterSpacing: "0.4em",
                  textTransform: "uppercase",
                  marginTop: "4px",
                }}
              >
                Sale Week
              </div>
            </motion.div>

            {/* Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "28px",
                maxWidth: "1000px",
                width: "100%",
                position: "relative",
                zIndex: 1,
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

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              style={{
                marginTop: "36px",
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "10px",
                fontStyle: "italic",
                color: "rgba(160,3,0,0.3)",
                letterSpacing: "0.2em",
                zIndex: 1,
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
            {/* 🔴 Cinematic Crimson Bloom */}
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

            {/* ✨ Subtle Silk Flash */}
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

            {/* 🎥 Final Video Reveal */}
            <motion.video
              src="/end.mp4"
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
              initial={{ scale: 1.2, filter: "blur(8px) brightness(0.6)" }}
              animate={{ scale: 1, filter: "blur(0px) brightness(1)" }}
              transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: "relative", zIndex: 1 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
