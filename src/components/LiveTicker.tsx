"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TICKER_EVENTS = [
  { emoji: "🔥", text: "$GOBLIN", highlight: "+340%", type: "moon" },
  { emoji: "🐋", text: "Anonymous bought $TROLL with 420 ETH", highlight: "", type: "whale" },
  { emoji: "💚", text: "$WISH charity donation reached", highlight: "$12,400", type: "charity" },
  { emoji: "🤖", text: "AI Agent launched", highlight: "$HANTA", type: "agent" },
  { emoji: "🔥", text: "$BOOB hit new ATH", highlight: "$7.1M", type: "ath" },
  { emoji: "📈", text: "$TROLL market cap", highlight: "$117M", type: "moon" },
  { emoji: "🐋", text: "Whale alert: 88 ETH into", highlight: "$PEPE2", type: "whale" },
  { emoji: "💚", text: "$WISH total donations", highlight: "$89,340", type: "charity" },
  { emoji: "🚀", text: "New token launched:", highlight: "$CHAOS", type: "new" },
  { emoji: "🤖", text: "AI Agent auto-minted", highlight: "$NEURAL", type: "agent" },
  { emoji: "🔥", text: "$MAGA surged", highlight: "+280%", type: "moon" },
  { emoji: "🐋", text: "55 ETH whale entry into", highlight: "$DEGEN", type: "whale" },
  { emoji: "💥", text: "$RUG collapsed", highlight: "-94%", type: "rug" },
  { emoji: "📈", text: "$GOBLIN volume 24h", highlight: "$4.2M", type: "vol" },
  { emoji: "🌱", text: "New: just launched", highlight: "$FROG", type: "new" },
];

function TickerItem({ emoji, text, highlight, type }: { emoji: string; text: string; highlight: string; type: string }) {
  const highlightColor =
    type === "whale" ? "#00FFE5"
    : type === "charity" ? "#FF6B6B"
    : type === "agent" ? "#00FFE5"
    : type === "rug" ? "#FF3B3B"
    : "#F5A623";

  return (
    <span
      className="inline-flex items-center gap-2 px-6 cursor-pointer whitespace-nowrap"
      style={{ fontFamily: "'Departure Mono', monospace", fontSize: "11px" }}
    >
      <span>{emoji}</span>
      <span style={{ color: "#888888" }}>{text}</span>
      {highlight && (
        <span style={{ color: highlightColor, fontWeight: "bold" }}>{highlight}</span>
      )}
      <span style={{ color: "rgba(255,255,255,0.12)", marginLeft: "8px" }}>|</span>
    </span>
  );
}

export default function LiveTicker() {
  const [paused, setPaused] = useState(false);

  // Duplicate items for seamless infinite loop
  const items = [...TICKER_EVENTS, ...TICKER_EVENTS];

  return (
    <div
      style={{
        background: "rgba(245, 166, 35, 0.06)",
        borderBottom: "1px solid rgba(245, 166, 35, 0.12)",
        borderTop: "1px solid rgba(245, 166, 35, 0.08)",
        overflow: "hidden",
        position: "relative",
        height: "36px",
        display: "flex",
        alignItems: "center",
        width: "100%",
        zIndex: 30,
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Left fade */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "80px",
          background: "linear-gradient(90deg, rgba(8,8,8,0.9) 0%, transparent 100%)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
      {/* Right fade */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: "80px",
          background: "linear-gradient(270deg, rgba(8,8,8,0.9) 0%, transparent 100%)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* LIVE label */}
      <div
        style={{
          position: "absolute",
          left: "12px",
          zIndex: 3,
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <span className="net-dot" />
        <span
          style={{
            fontFamily: "'Departure Mono', monospace",
            fontSize: "10px",
            color: "#F5A623",
            letterSpacing: "0.1em",
            fontWeight: "bold",
          }}
        >
          LIVE
        </span>
      </div>

      {/* Scrolling content */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          animation: paused ? "none" : "ticker-scroll 40s linear infinite",
          willChange: "transform",
          paddingLeft: "120px",
        }}
      >
        {items.map((item, i) => (
          <TickerItem key={i} {...item} />
        ))}
      </div>
    </div>
  );
}
