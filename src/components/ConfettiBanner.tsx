"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

// canvas-confetti loaded client-side only
let confetti: ((opts?: Record<string, unknown>) => void) | null = null;
if (typeof window !== "undefined") {
  import("canvas-confetti").then(m => { confetti = m.default; });
}

interface MilestoneBanner {
  id: string;
  amount: string;
}

let milestoneListeners: ((b: MilestoneBanner) => void)[] = [];
export function triggerMilestone(amount: string) {
  const id = `m-${Date.now()}`;
  milestoneListeners.forEach(fn => fn({ id, amount }));
}

function fireConfetti() {
  if (!confetti) return;

  // Left side burst
  confetti({
    particleCount: 80,
    angle: 60,
    spread: 55,
    origin: { x: 0, y: 0.6 },
    colors: ["#F5A623", "#00FF87", "#00FFE5", "#FF6B6B", "#ffffff"],
    scalar: 1.2,
  });

  // Right side burst
  confetti({
    particleCount: 80,
    angle: 120,
    spread: 55,
    origin: { x: 1, y: 0.6 },
    colors: ["#F5A623", "#00FF87", "#00FFE5", "#FF6B6B", "#ffffff"],
    scalar: 1.2,
  });

  // Center shower
  setTimeout(() => {
    confetti?.({
      particleCount: 60,
      spread: 80,
      origin: { x: 0.5, y: 0.3 },
      colors: ["#00FF87", "#F5A623", "#ffffff"],
      startVelocity: 35,
    });
  }, 200);
}

export default function ConfettiBanner() {
  const [banners, setBanners] = useState<MilestoneBanner[]>([]);

  useEffect(() => {
    const handler = (b: MilestoneBanner) => {
      fireConfetti();
      setBanners(prev => [...prev, b]);
      setTimeout(() => {
        setBanners(prev => prev.filter(x => x.id !== b.id));
      }, 5000);
    };
    milestoneListeners.push(handler);
    return () => { milestoneListeners = milestoneListeners.filter(fn => fn !== handler); };
  }, []);

  return (
    <div style={{
      position: "fixed",
      top: "80px",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 9500,
      pointerEvents: "none",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "12px",
    }}>
      <AnimatePresence>
        {banners.map(banner => (
          <motion.div
            key={banner.id}
            initial={{ y: -60, opacity: 0, scale: 0.8 }}
            animate={{ y: 0,   opacity: 1, scale: 1 }}
            exit={{   y: -60, opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            style={{
              background: "linear-gradient(135deg, rgba(0,255,135,0.15), rgba(0,255,135,0.08))",
              border: "1px solid rgba(0,255,135,0.5)",
              borderRadius: "12px",
              padding: "14px 32px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              boxShadow: "0 0 40px rgba(0,255,135,0.2), 0 8px 32px rgba(0,0,0,0.5)",
              backdropFilter: "blur(12px)",
            }}
          >
            <span style={{ fontSize: "24px" }}>💚</span>
            <div>
              <div style={{
                fontFamily: "'Departure Mono', monospace",
                fontSize: "14px",
                fontWeight: "bold",
                color: "#00FF87",
                letterSpacing: "0.06em",
              }}>
                CHARITY MILESTONE
              </div>
              <div style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "20px",
                fontWeight: "800",
                color: "#ffffff",
              }}>
                {banner.amount} Donation Reached! 🎉
              </div>
            </div>
            <span style={{ fontSize: "24px" }}>💚</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
