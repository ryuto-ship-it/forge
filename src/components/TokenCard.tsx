"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSoundContext } from "@/contexts/SoundContext";
import { playBuySound, playSellSound } from "@/lib/soundEngine";

type CardType = "hot" | "new" | "charity" | "agent" | "normal";

interface TokenCardProps {
  id: string;
  ticker: string;
  name: string;
  creator: string;
  marketCap: string;
  change: string;
  progress: number;
  image: string;
  type?: CardType;
  comments?: number;
  voiceUsers?: number;
  flashType?: "buy" | "sell" | null;
}

const ACCENT_COLORS: Record<CardType, string> = {
  hot:     "#F5A623",
  new:     "#00FF87",
  charity: "#FF6B6B",
  agent:   "#00FFE5",
  normal:  "transparent",
};

export default function TokenCard({
  id,
  ticker,
  name,
  creator,
  marketCap,
  change,
  progress,
  image,
  type = "normal",
  comments = 0,
  voiceUsers = 0,
  flashType = null,
}: TokenCardProps) {
  const [isFlashing, setIsFlashing] = useState(false);
  const [currentFlash, setCurrentFlash] = useState<"buy" | "sell" | null>(null);
  const [hovered, setHovered] = useState(false);
  const flashTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { play } = useSoundContext();

  useEffect(() => {
    if (flashType) {
      setCurrentFlash(flashType);
      setIsFlashing(true);
      // Play sound on trade flash
      if (flashType === "buy")  play(playBuySound);
      if (flashType === "sell") play(playSellSound);
      if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current);
      flashTimeoutRef.current = setTimeout(() => {
        setIsFlashing(false);
        setCurrentFlash(null);
      }, 700);
    }
    return () => {
      if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flashType]);

  const isPositive = change.startsWith("+");
  const accentColor = ACCENT_COLORS[type];

  return (
    <Link href={`/token/${id}`} style={{ display: "block" }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: "#111111",
          border: `1px solid ${hovered ? "rgba(245,166,35,0.25)" : "rgba(255,255,255,0.06)"}`,
          borderLeft: type !== "normal" ? `3px solid ${accentColor}` : `1px solid rgba(255,255,255,0.06)`,
          borderRadius: "12px",
          overflow: "hidden",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          position: "relative",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          boxShadow: isFlashing
            ? currentFlash === "buy"
              ? "0 0 0 2px rgba(245,166,35,0.9), 0 0 20px rgba(245,166,35,0.4)"
              : "0 0 0 2px rgba(255,59,59,0.9), 0 0 20px rgba(255,59,59,0.4)"
            : hovered
              ? "0 8px 32px rgba(245,166,35,0.12)"
              : "none",
          transition: "transform 300ms ease-in-out, box-shadow 300ms ease-in-out, border-color 150ms ease-out",
        }}
      >
        {/* Token Image */}
        <div style={{ position: "relative", width: "100%", paddingBottom: "100%", overflow: "hidden", background: "#0a0a0a" }}>
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            style={{
              transform: hovered ? "scale(1.08)" : "scale(1)",
              transition: "transform 500ms ease-in-out",
            }}
          />
          {/* Badge */}
          {type !== "normal" && (
            <div style={{ position: "absolute", top: "8px", left: "8px", zIndex: 2 }}>
              {type === "hot"    && <span className="badge-hot">🔥 HOT</span>}
              {type === "new"    && <span className="badge-new">🌱 NEW</span>}
              {type === "charity"&& <span className="badge-charity">💚 CHARITY</span>}
              {type === "agent"  && <span className="badge-agent">🤖 AI</span>}
            </div>
          )}
          {/* Agent glow overlay */}
          {type === "agent" && (
            <div style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(ellipse at bottom, rgba(0,255,229,0.08) 0%, transparent 70%)",
              pointerEvents: "none",
            }} />
          )}
        </div>

        {/* Content */}
        <div style={{ padding: "10px 12px", display: "flex", flexDirection: "column", flex: 1, gap: "6px" }}>
          {/* Ticker + Name */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div
                style={{
                  fontFamily: "'Departure Mono', monospace",
                  fontSize: "13px",
                  fontWeight: "bold",
                  color: hovered ? "#F5A623" : "#ffffff",
                  transition: "color 150ms ease-out",
                }}
              >
                ${ticker}
              </div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", color: "#888888", marginTop: "1px" }}>
                {name}
              </div>
            </div>
            {/* Change badge */}
            <div
              style={{
                fontFamily: "'Departure Mono', monospace",
                fontSize: "11px",
                fontWeight: "bold",
                color: isPositive ? "#F5A623" : "#FF3B3B",
                background: isPositive ? "rgba(245,166,35,0.1)" : "rgba(255,59,59,0.1)",
                padding: "2px 6px",
                borderRadius: "4px",
                whiteSpace: "nowrap",
              }}
            >
              {change}
            </div>
          </div>

          {/* Creator */}
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", color: "#444444" }}>
            by {creator}
          </div>

          {/* Bonding Curve */}
          <div style={{ marginTop: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
              <span style={{ fontFamily: "'Departure Mono', monospace", fontSize: "9px", color: "#555555", letterSpacing: "0.05em" }}>
                BONDING
              </span>
              <span style={{ fontFamily: "'Departure Mono', monospace", fontSize: "9px", color: progress > 80 ? "#F5A623" : "#555555" }}>
                {progress}%
              </span>
            </div>
            <div className="progress-amber">
              <div
                className="progress-amber-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Market Cap + Social */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "6px" }}>
            <span
              style={{
                fontFamily: "'Departure Mono', monospace",
                fontSize: "12px",
                fontWeight: "bold",
                color: "#F5A623",
              }}
            >
              {marketCap}
            </span>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              {comments > 0 && (
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", color: "#666666" }}>
                  💬 {comments}
                </span>
              )}
              {voiceUsers > 0 && (
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", color: "#00FFE5" }}>
                  🔊 {voiceUsers}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
