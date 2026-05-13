"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const HILL_TOKENS = [
  { id:"t1",  ticker:"GOBLIN", name:"GoblinCoin", marketCap:"$20.6M", change:"+340%", image:"https://picsum.photos/seed/goblin/200", sparkline:[30,45,38,55,72,68,85,91,88,100] },
  { id:"b2",  ticker:"MAGA",   name:"MAGA Coin",  marketCap:"$88M",   change:"+280%", image:"https://picsum.photos/seed/maga/200",  sparkline:[20,28,35,50,45,60,75,80,95,100] },
  { id:"b3",  ticker:"TROLL",  name:"TrollKing",  marketCap:"$117M",  change:"+28%",  image:"https://picsum.photos/seed/troll/200", sparkline:[60,55,70,65,80,75,85,90,95,100] },
  { id:"b4",  ticker:"PUMP",   name:"PumpMax",    marketCap:"$33M",   change:"+190%", image:"https://picsum.photos/seed/pump/200",  sparkline:[10,25,40,35,55,70,65,85,90,100] },
];

const ROTATION_SECONDS = 300; // 5 minutes

function Sparkline({ data }: { data: number[] }) {
  const w = 120, h = 36;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 4) - 2;
    return `${x},${y}`;
  });
  const polyline = pts.join(" ");
  const areaPath = `M${pts[0]} L${pts.join(" L")} L${w},${h} L0,${h} Z`;

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="spark-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F5A623" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#F5A623" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#spark-grad)" />
      <polyline points={polyline} fill="none" stroke="#F5A623" strokeWidth="1.5" strokeLinejoin="round" />
      <circle
        cx={parseFloat(pts[pts.length - 1].split(",")[0])}
        cy={parseFloat(pts[pts.length - 1].split(",")[1])}
        r="3" fill="#F5A623"
      />
    </svg>
  );
}

export default function KingOfTheHill() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(ROTATION_SECONDS);
  const [direction, setDirection] = useState(1);

  const current = HILL_TOKENS[currentIndex];

  // Countdown timer
  useEffect(() => {
    const tick = setInterval(() => {
      setSecondsLeft(s => {
        if (s <= 1) {
          setDirection(1);
          setCurrentIndex(i => (i + 1) % HILL_TOKENS.length);
          return ROTATION_SECONDS;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(tick);
  }, []);

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const progressPct = ((ROTATION_SECONDS - secondsLeft) / ROTATION_SECONDS) * 100;

  return (
    <div
      style={{
        position: "relative",
        borderRadius: "16px",
        overflow: "hidden",
        background: "#0e0e0e",
        border: "1px solid rgba(255,255,255,0.06)",
        padding: "1px", // space for gradient border
      }}
    >
      {/* Animated gradient border */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: "16px", zIndex: 0,
        background: "linear-gradient(135deg, rgba(245,166,35,0.5), rgba(255,107,107,0.2), rgba(0,255,229,0.2), rgba(245,166,35,0.5))",
        backgroundSize: "300% 300%",
        animation: "shimmer 4s linear infinite",
        mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        maskComposite: "exclude",
        WebkitMaskComposite: "xor",
        padding: "1px",
      }} />

      <div style={{ background: "#0e0e0e", borderRadius: "15px", padding: "20px", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{ fontSize: "18px", display: "inline-block", animation: "crown-sway 2s ease-in-out infinite" }}
            >
              👑
            </span>
            <span style={{
              fontFamily: "'Departure Mono', monospace",
              fontSize: "11px", fontWeight: "bold",
              color: "#F5A623", letterSpacing: "0.1em",
            }}>
              KING OF THE HILL
            </span>
          </div>
          {/* Dot indicators */}
          <div style={{ display: "flex", gap: "5px" }}>
            {HILL_TOKENS.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > currentIndex ? 1 : -1); setCurrentIndex(i); setSecondsLeft(ROTATION_SECONDS); }}
                style={{
                  width: "6px", height: "6px", borderRadius: "50%", border: "none",
                  background: i === currentIndex ? "#F5A623" : "rgba(255,255,255,0.15)",
                  cursor: "pointer", padding: 0,
                  transition: "background 200ms",
                }}
              />
            ))}
          </div>
        </div>

        {/* Token content */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current.id}
            custom={direction}
            initial={{ x: direction * 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -direction * 40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
          >
            {/* Token image */}
            <div style={{
              width: "72px", height: "72px",
              borderRadius: "50%",
              overflow: "hidden",
              border: "2px solid rgba(245,166,35,0.4)",
              boxShadow: "0 0 20px rgba(245,166,35,0.2)",
              marginBottom: "12px",
              position: "relative",
            }}>
              <Image src={current.image} alt={current.ticker} fill className="object-cover" />
            </div>

            {/* Ticker + Name */}
            <div style={{ marginBottom: "4px" }}>
              <span style={{
                fontFamily: "'Departure Mono', monospace",
                fontSize: "22px", fontWeight: "bold", color: "#ffffff",
              }}>
                ${current.ticker}
              </span>
            </div>
            <div style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: "12px",
              color: "#888", marginBottom: "14px",
            }}>
              {current.name}
            </div>

            {/* Stats */}
            <div style={{ display: "flex", gap: "16px", marginBottom: "14px" }}>
              <div>
                <div style={{ fontFamily: "'Departure Mono', monospace", fontSize: "18px", fontWeight: "bold", color: "#ffffff" }}>
                  {current.marketCap}
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", color: "#555" }}>MARKET CAP</div>
              </div>
              <div>
                <div style={{
                  fontFamily: "'Departure Mono', monospace", fontSize: "18px", fontWeight: "bold",
                  color: current.change.startsWith("+") ? "#F5A623" : "#FF3B3B",
                }}>
                  {current.change}
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", color: "#555" }}>24H CHANGE</div>
              </div>
            </div>

            {/* Sparkline */}
            <div style={{ marginBottom: "16px", opacity: 0.9 }}>
              <Sparkline data={current.sparkline} />
            </div>

            {/* Trade Now button */}
            <Link href={`/token/${current.id}`} style={{ display: "block", textDecoration: "none" }}>
              <button style={{
                width: "100%", padding: "10px",
                background: "rgba(245,166,35,0.12)",
                border: "1px solid rgba(245,166,35,0.35)",
                borderRadius: "8px",
                color: "#F5A623",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px", fontWeight: "600",
                cursor: "pointer",
                letterSpacing: "0.02em",
                transition: "background 150ms, box-shadow 150ms",
                marginBottom: "12px",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(245,166,35,0.22)";
                e.currentTarget.style.boxShadow = "0 0 16px rgba(245,166,35,0.2)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "rgba(245,166,35,0.12)";
                e.currentTarget.style.boxShadow = "none";
              }}
              >
                Trade Now →
              </button>
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* Countdown */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", color: "#555" }}>
              Next king in
            </span>
            <span style={{
              fontFamily: "'Departure Mono', monospace", fontSize: "11px",
              color: secondsLeft < 30 ? "#FF3B3B" : "#888",
            }}>
              {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
            </span>
          </div>
          <div style={{ background: "#1A1A1A", borderRadius: "9999px", height: "3px", overflow: "hidden" }}>
            <div style={{
              height: "100%",
              background: "linear-gradient(90deg, #F5A623, #FFD27F)",
              borderRadius: "9999px",
              width: `${progressPct}%`,
              transition: "width 1s linear",
            }} />
          </div>
        </div>
      </div>
    </div>
  );
}
