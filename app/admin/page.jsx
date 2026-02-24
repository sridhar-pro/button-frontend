"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const API_UPDATE = "https://button-api.onrender.com/api/buttons/update";
const API_URL = "https://button-api.onrender.com/api/buttons";

const persons = [
  { id: 1, name: "Person 1" },
  { id: 2, name: "Person 2" },
  { id: 3, name: "Person 3" },
  { id: 4, name: "Person 4" },
  { id: 5, name: "Person 5" },
  { id: 6, name: "Person 6" },
  { id: 7, name: "Person 7" },
  { id: 8, name: "Person 8" },
  { id: 9, name: "Person 9" },
];

function FloralAccent({ style }) {
  return (
    <svg
      style={style}
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
    >
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <ellipse
          key={i}
          cx="60"
          cy="60"
          rx="8"
          ry="24"
          fill="rgba(160,3,0,0.12)"
          transform={`rotate(${angle} 60 60) translate(0 -18)`}
          style={{ transformOrigin: "60px 60px" }}
        />
      ))}
      <circle cx="60" cy="60" r="7" fill="rgba(160,3,0,0.2)" />
    </svg>
  );
}

function RoseIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3C12 3 8 6 8 10C8 12.2 9.8 14 12 14C14.2 14 16 12.2 16 10C16 6 12 3 12 3Z"
        fill="#A00300"
        opacity="0.9"
      />
      <path
        d="M12 14C12 14 9 15 9 18C9 19.7 10.3 21 12 21C13.7 21 15 19.7 15 18C15 15 12 14 12 14Z"
        fill="#A00300"
        opacity="0.7"
      />
      <path
        d="M12 14L12 22"
        stroke="#4a7c4e"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M10 18L8 20"
        stroke="#4a7c4e"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SkeletonRow({ index }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.05 }}
      style={{
        padding: "18px 22px",
        borderRadius: "14px",
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(0,9,48,0.8) 100%)",
        border: "1px solid rgba(255,255,255,0.05)",
        display: "flex",
        alignItems: "center",
        gap: "14px",
      }}
    >
      <motion.div
        style={{
          width: "42px",
          height: "42px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.06)",
          flexShrink: 0,
        }}
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ repeat: Infinity, duration: 1.4, delay: index * 0.1 }}
      />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "6px",
        }}
      >
        <motion.div
          style={{
            height: "12px",
            width: "100px",
            borderRadius: "4px",
            background: "rgba(255,255,255,0.06)",
          }}
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ repeat: Infinity, duration: 1.4, delay: index * 0.1 }}
        />
        <motion.div
          style={{
            height: "8px",
            width: "60px",
            borderRadius: "4px",
            background: "rgba(255,255,255,0.04)",
          }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{
            repeat: Infinity,
            duration: 1.4,
            delay: index * 0.1 + 0.2,
          }}
        />
      </div>
      <motion.div
        style={{
          width: "80px",
          height: "34px",
          borderRadius: "8px",
          background: "rgba(160,3,0,0.1)",
        }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ repeat: Infinity, duration: 1.4, delay: index * 0.1 }}
      />
    </motion.div>
  );
}

function SellerRow({ person, onUpdate, isLoading, isFlash, isUnlocked }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: person.id * 0.055,
        duration: 0.5,
        ease: [0.23, 1, 0.32, 1],
      }}
      style={{ position: "relative" }}
    >
      <AnimatePresence>
        {isFlash && (
          <motion.div
            key="flash"
            initial={{ opacity: 0.8, scale: 1 }}
            animate={{ opacity: 0, scale: 1.04 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            style={{
              position: "absolute",
              inset: "-2px",
              borderRadius: "16px",
              background:
                "linear-gradient(135deg, rgba(160,3,0,0.5), rgba(200,50,50,0.2))",
              filter: "blur(6px)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />
        )}
      </AnimatePresence>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "18px 22px",
          borderRadius: "14px",
          background: isUnlocked
            ? "linear-gradient(135deg, rgba(160,3,0,0.18) 0%, rgba(0,9,48,0.95) 100%)"
            : "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(0,9,48,0.9) 100%)",
          border: isUnlocked
            ? "1px solid rgba(160,3,0,0.5)"
            : "1px solid rgba(255,255,255,0.07)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
          boxShadow: isUnlocked
            ? "0 4px 24px rgba(160,3,0,0.15), inset 0 1px 0 rgba(255,255,255,0.06)"
            : "0 2px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)",
          transition: "all 0.4s ease",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Identity */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            flex: 1,
          }}
        >
          <div
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              background: isUnlocked
                ? "linear-gradient(135deg, #A00300, #ff4444)"
                : "rgba(255,255,255,0.06)",
              border: isUnlocked
                ? "2px solid rgba(160,3,0,0.6)"
                : "2px solid rgba(255,255,255,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.4s",
              flexShrink: 0,
            }}
          >
            {isUnlocked ? (
              //   <RoseIcon size={18} />
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle
                  cx="12"
                  cy="8"
                  r="4"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1.5"
                />
                <path
                  d="M4 20C4 16.686 7.134 14 12 14C16.866 14 20 16.686 20 20"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle
                  cx="12"
                  cy="8"
                  r="4"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1.5"
                />
                <path
                  d="M4 20C4 16.686 7.134 14 12 14C16.866 14 20 16.686 20 20"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </div>

          <div>
            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 600,
                fontSize: "16px",
                color: isUnlocked ? "#fff" : "rgba(255,255,255,0.7)",
                letterSpacing: "0.02em",
                transition: "color 0.4s",
              }}
            >
              {person.name}
            </div>
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "10px",
                color: isUnlocked
                  ? "rgba(160,3,0,0.9)"
                  : "rgba(255,255,255,0.25)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginTop: "2px",
                transition: "color 0.4s",
              }}
            >
              {isUnlocked
                ? "✦ Launch Active"
                : `Seller #${String(person.id).padStart(2, "0")}`}
            </div>
          </div>
        </div>

        {/* Status badge */}
        <motion.div
          animate={
            isUnlocked
              ? { opacity: 1, scale: 1 }
              : { opacity: 0.4, scale: 0.95 }
          }
          transition={{ duration: 0.3 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            padding: "4px 10px",
            borderRadius: "20px",
            background: isUnlocked
              ? "rgba(160,3,0,0.2)"
              : "rgba(255,255,255,0.04)",
            border: isUnlocked
              ? "1px solid rgba(160,3,0,0.4)"
              : "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <motion.div
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: isUnlocked ? "#ff4444" : "#374151",
            }}
            animate={isUnlocked ? { opacity: [1, 0.3, 1] } : {}}
            transition={{ repeat: Infinity, duration: 1.4 }}
          />
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "9px",
              color: isUnlocked ? "#ff8080" : "#4b5563",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            {isUnlocked ? "LIVE" : "IDLE"}
          </span>
        </motion.div>

        {/* Actions */}
        <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
          <motion.button
            onClick={() => onUpdate(person.id, 1)}
            disabled={isLoading || isUnlocked}
            whileHover={{ scale: isLoading || isUnlocked ? 1 : 1.04 }}
            whileTap={{ scale: isLoading || isUnlocked ? 1 : 0.96 }}
            style={{
              padding: "9px 20px",
              borderRadius: "8px",
              border: "none",
              background: isUnlocked
                ? "rgba(160,3,0,0.2)"
                : isLoading
                  ? "rgba(160,3,0,0.4)"
                  : "linear-gradient(135deg, #A00300 0%, #cc1a1a 100%)",
              color: isUnlocked ? "rgba(255,255,255,0.35)" : "white",
              cursor: isLoading || isUnlocked ? "not-allowed" : "pointer",
              fontFamily: "'DM Mono', monospace",
              fontSize: "11px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              boxShadow:
                isLoading || isUnlocked
                  ? "none"
                  : "0 4px 14px rgba(160,3,0,0.4)",
              transition: "all 0.3s",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            {isLoading ? (
              <motion.span
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
              >
                ···
              </motion.span>
            ) : isUnlocked ? (
              <>✦ Live</>
            ) : (
              <>
                <span>✦</span> Launch
              </>
            )}
          </motion.button>

          <motion.button
            onClick={() => onUpdate(person.id, 0)}
            disabled={isLoading || !isUnlocked}
            whileHover={{
              scale: isLoading || !isUnlocked ? 1 : 1.04,
              background: "rgba(255,255,255,0.1)",
            }}
            whileTap={{ scale: isLoading || !isUnlocked ? 1 : 0.96 }}
            style={{
              padding: "9px 16px",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.14)",
              background: "transparent",
              color: !isUnlocked
                ? "rgba(255,255,255,0.2)"
                : "rgba(255,255,255,0.55)",
              cursor: isLoading || !isUnlocked ? "not-allowed" : "pointer",
              fontFamily: "'DM Mono', monospace",
              fontSize: "11px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              transition: "all 0.3s",
            }}
          >
            Pause
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default function AdminPanel() {
  const [loading, setLoading] = useState({});
  const [successFlash, setSuccessFlash] = useState(null);
  const [unlockedStates, setUnlockedStates] = useState({});
  const [initialLoading, setInitialLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  // Fetch real state on mount
  useEffect(() => {
    const fetchInitialState = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        const states = {};
        Object.entries(data.buttons).forEach(([key, val]) => {
          states[Number(key)] = val === 1;
        });
        setUnlockedStates(states);
      } catch (err) {
        console.error("Initial state fetch error:", err);
        setFetchError(true);
      } finally {
        setInitialLoading(false);
      }
    };
    fetchInitialState();
  }, []);

  const updateButton = async (buttonId, value) => {
    try {
      setLoading((prev) => ({ ...prev, [buttonId]: true }));
      const res = await fetch(API_UPDATE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ buttonId: String(buttonId), value }),
      });
      if (!res.ok) throw new Error("API failed");
      setSuccessFlash(buttonId);
      setUnlockedStates((prev) => ({ ...prev, [buttonId]: value === 1 }));
      setTimeout(() => setSuccessFlash(null), 1200);
    } catch (err) {
      console.error("Update error:", err);
      alert("API failed. Check console.");
    } finally {
      setLoading((prev) => ({ ...prev, [buttonId]: false }));
    }
  };

  const activeCount = Object.values(unlockedStates).filter(Boolean).length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Mono:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #000930; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #000930; }
        ::-webkit-scrollbar-thumb { background: rgba(160,3,0,0.4); border-radius: 4px; }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(160,3,0,0.15) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 10% 100%, rgba(160,3,0,0.07) 0%, transparent 50%), #000930",
          padding: "60px 20px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <FloralAccent
          style={{
            position: "fixed",
            top: "-20px",
            left: "-20px",
            opacity: 0.7,
            transform: "rotate(-15deg)",
          }}
        />
        <FloralAccent
          style={{
            position: "fixed",
            top: "-20px",
            right: "-20px",
            opacity: 0.7,
            transform: "rotate(30deg)",
          }}
        />
        <FloralAccent
          style={{
            position: "fixed",
            bottom: "-20px",
            left: "30%",
            opacity: 0.4,
            transform: "rotate(45deg)",
          }}
        />

        <div
          style={{
            position: "fixed",
            inset: 0,
            pointerEvents: "none",
            backgroundImage:
              "linear-gradient(rgba(160,3,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(160,3,0,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div
          style={{
            maxWidth: "640px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            style={{ textAlign: "center", marginBottom: "48px" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                marginBottom: "14px",
              }}
            >
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  background:
                    "linear-gradient(to right, transparent, rgba(160,3,0,0.5))",
                }}
              />
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "9px",
                  color: "rgba(160,3,0,0.7)",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                }}
              >
                Women's Day Sale Week
              </span>
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  background:
                    "linear-gradient(to left, transparent, rgba(160,3,0,0.5))",
                }}
              />
            </div>

            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 700,
                fontSize: "clamp(32px, 6vw, 48px)",
                color: "#fff",
                letterSpacing: "-0.01em",
                lineHeight: 1.05,
              }}
            >
              Launch Control
            </h1>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontSize: "17px",
                color: "rgba(255,255,255,0.4)",
                marginTop: "6px",
                letterSpacing: "0.02em",
              }}
            >
              Activate your sellers for the grand reveal
            </p>

            {/* Progress */}
            <div
              style={{
                marginTop: "24px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "10px",
                  color: "rgba(255,255,255,0.3)",
                  letterSpacing: "0.12em",
                }}
              >
                {initialLoading ? "—" : activeCount}/{persons.length} LIVE
              </span>
              <div
                style={{
                  width: "160px",
                  height: "3px",
                  background: "rgba(255,255,255,0.07)",
                  borderRadius: "2px",
                  overflow: "hidden",
                }}
              >
                <motion.div
                  style={{
                    height: "100%",
                    borderRadius: "2px",
                    background: "linear-gradient(to right, #A00300, #ff4444)",
                  }}
                  animate={{
                    width: initialLoading
                      ? "0%"
                      : `${(activeCount / persons.length) * 100}%`,
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </div>
              <motion.div
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: initialLoading ? "#1f2937" : "#A00300",
                }}
                animate={!initialLoading ? { opacity: [1, 0.3, 1] } : {}}
                transition={{ repeat: Infinity, duration: 1.8 }}
              />
            </div>

            {/* Error state */}
            <AnimatePresence>
              {fetchError && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{
                    marginTop: "14px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "6px 14px",
                    borderRadius: "20px",
                    background: "rgba(160,3,0,0.15)",
                    border: "1px solid rgba(160,3,0,0.3)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "9px",
                      color: "rgba(255,120,120,0.8)",
                      letterSpacing: "0.15em",
                    }}
                  >
                    ⚠ COULD NOT LOAD CURRENT STATE — DEFAULTS TO LOCKED
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Section label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "16px",
              paddingLeft: "4px",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M7 1L8.5 5.5H13L9.5 8.5L11 13L7 10L3 13L4.5 8.5L1 5.5H5.5L7 1Z"
                fill="rgba(160,3,0,0.6)"
              />
            </svg>
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "10px",
                color: "rgba(255,255,255,0.25)",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              Seller Roster
            </span>
          </motion.div>

          {/* Rows */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {initialLoading
              ? persons.map((p) => <SkeletonRow key={p.id} index={p.id} />)
              : persons.map((person) => (
                  <SellerRow
                    key={person.id}
                    person={person}
                    onUpdate={updateButton}
                    isLoading={!!loading[person.id]}
                    isFlash={successFlash === person.id}
                    isUnlocked={!!unlockedStates[person.id]}
                  />
                ))}
          </div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            style={{ textAlign: "center", marginTop: "44px" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "1px",
                  background: "rgba(160,3,0,0.25)",
                }}
              />
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.18)",
                }}
              >
                Empowering Women Sellers, March 2025
              </span>
              <div
                style={{
                  width: "40px",
                  height: "1px",
                  background: "rgba(160,3,0,0.25)",
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
