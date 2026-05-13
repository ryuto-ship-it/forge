"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface WhaleSwimEvent {
  id: string;
  text: string;
  amount: string;
}

// Global event bus for whale swims
let swimListeners: ((e: WhaleSwimEvent) => void)[] = [];
export function triggerWhaleSwim(event: WhaleSwimEvent) {
  swimListeners.forEach(fn => fn(event));
}

export default function WhaleSwimEffect() {
  const [events, setEvents] = useState<WhaleSwimEvent[]>([]);

  useEffect(() => {
    const handler = (e: WhaleSwimEvent) => {
      setEvents(prev => [...prev, e]);
      setTimeout(() => {
        setEvents(prev => prev.filter(x => x.id !== e.id));
      }, 5500); // animation duration
    };
    swimListeners.push(handler);
    return () => { swimListeners = swimListeners.filter(fn => fn !== handler); };
  }, []);

  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0, right: 0,
      pointerEvents: "none",
      zIndex: 8000,
      overflow: "hidden",
    }}>
      <AnimatePresence>
        {events.map((event, i) => (
          <motion.div
            key={event.id}
            initial={{ x: "-120px" }}
            animate={{ x: "calc(100vw + 120px)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 5, ease: "linear" }}
            style={{
              position: "absolute",
              top: `${72 + i * 44}px`,
              display: "flex",
              alignItems: "center",
              gap: "10px",
              whiteSpace: "nowrap",
            }}
          >
            {/* Whale emoji */}
            <span style={{ fontSize: "36px", filter: "drop-shadow(0 0 8px rgba(0,255,229,0.6))" }}>
              🐋
            </span>
            {/* Info bubble */}
            <div style={{
              background: "rgba(0,255,229,0.1)",
              border: "1px solid rgba(0,255,229,0.3)",
              borderRadius: "8px",
              padding: "4px 10px",
              backdropFilter: "blur(8px)",
            }}>
              <span style={{
                fontFamily: "'Departure Mono', monospace",
                fontSize: "11px",
                color: "#00FFE5",
              }}>
                {event.text}
              </span>
              <span style={{
                fontFamily: "'Departure Mono', monospace",
                fontSize: "11px",
                color: "#ffffff",
                marginLeft: "8px",
                fontWeight: "bold",
              }}>
                {event.amount}
              </span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Edge glow flash when whale swims */}
      <AnimatePresence>
        {events.length > 0 && (
          <motion.div
            key="edge-glow"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0] }}
            transition={{ duration: 0.8 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "radial-gradient(ellipse at 50% 0%, rgba(0,255,229,0.12) 0%, transparent 70%)",
              pointerEvents: "none",
              zIndex: 7999,
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
