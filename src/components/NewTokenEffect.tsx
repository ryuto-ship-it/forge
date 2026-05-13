"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface NewTokenEvent {
  id: string;
  ticker: string;
  creator: string;
  image: string;
}

let newTokenListeners: ((e: NewTokenEvent) => void)[] = [];
export function triggerNewToken(event: Omit<NewTokenEvent, "id">) {
  const id = `nt-${Date.now()}-${Math.random()}`;
  newTokenListeners.forEach(fn => fn({ ...event, id }));
}

const MOCK_NEW_TOKENS = [
  { ticker: "CHAOS2",  creator: "0x7f3a...c1d", image: "https://picsum.photos/seed/chaos2/80" },
  { ticker: "DERP",    creator: "0x2b8d...f9e", image: "https://picsum.photos/seed/derp/80" },
  { ticker: "WOJAK2",  creator: "0x9a12...44b", image: "https://picsum.photos/seed/wojak2/80" },
  { ticker: "SIGMA",   creator: "0x4c77...9f0", image: "https://picsum.photos/seed/sigma/80" },
  { ticker: "BONK2",   creator: "0x6b4f...88c", image: "https://picsum.photos/seed/bonk2/80" },
];

export default function NewTokenEffect() {
  const [tokens, setTokens] = useState<NewTokenEvent[]>([]);

  // Listen for triggered events
  useEffect(() => {
    const handler = (e: NewTokenEvent) => {
      setTokens(prev => [...prev.slice(-3), e]); // max 4 stacked
      setTimeout(() => {
        setTokens(prev => prev.filter(x => x.id !== e.id));
      }, 4000);
    };
    newTokenListeners.push(handler);
    return () => { newTokenListeners = newTokenListeners.filter(fn => fn !== handler); };
  }, []);

  // Simulate new tokens being launched periodically
  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      const token = MOCK_NEW_TOKENS[idx % MOCK_NEW_TOKENS.length];
      triggerNewToken(token);
      idx++;
    }, 18000); // every 18 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      position: "fixed",
      bottom: "24px",
      left: "24px",
      zIndex: 8500,
      display: "flex",
      flexDirection: "column-reverse",
      gap: "10px",
      pointerEvents: "none",
    }}>
      <AnimatePresence>
        {tokens.map(token => (
          <motion.div
            key={token.id}
            initial={{ y: 80, opacity: 0, scale: 0.85 }}
            animate={{ y: 0,  opacity: 1, scale: 1 }}
            exit={{   y: -20, opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            style={{
              background: "#111111",
              border: "1px solid rgba(245,166,35,0.35)",
              borderLeft: "3px solid #F5A623",
              borderRadius: "10px",
              padding: "10px 14px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              boxShadow: "0 4px 24px rgba(245,166,35,0.12), 0 0 0 1px rgba(255,255,255,0.04)",
              minWidth: "240px",
              pointerEvents: "all",
            }}
          >
            {/* Token image */}
            <div style={{
              width: "36px", height: "36px",
              borderRadius: "50%",
              overflow: "hidden",
              flexShrink: 0,
              border: "1px solid rgba(245,166,35,0.3)",
              position: "relative",
            }}>
              <Image src={token.image} alt={token.ticker} fill className="object-cover" />
            </div>

            {/* Info */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "2px" }}>
                <span style={{ fontSize: "12px" }}>🚀</span>
                <span style={{
                  fontFamily: "'Departure Mono', monospace",
                  fontSize: "11px", color: "#F5A623",
                  fontWeight: "bold", letterSpacing: "0.06em",
                }}>
                  NEW COIN
                </span>
              </div>
              <div style={{
                fontFamily: "'Departure Mono', monospace",
                fontSize: "13px", fontWeight: "bold", color: "#ffffff",
              }}>
                ${token.ticker}
              </div>
              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "10px", color: "#555",
              }}>
                by {token.creator}
              </div>
            </div>

            {/* NEW badge */}
            <div style={{ marginLeft: "auto" }}>
              <span className="badge-new">🌱 NEW</span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
