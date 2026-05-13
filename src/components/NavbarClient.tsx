"use client";

import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useSoundContext } from "@/contexts/SoundContext";

const NAV_LINKS = [
  { href: "/",        label: "Home" },
  { href: "/callouts",label: "Callouts" },
  { href: "/agents",  label: "Agents" },
  { href: "/charity", label: "Charity" },
];

export default function NavbarClient() {
  const { soundOn, toggleSound } = useSoundContext();

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        width: "100%",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        background: "rgba(8, 8, 8, 0.85)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        height: "60px",
        gap: "24px",
      }}
    >
      {/* ── Logo ──────────────────────────────── */}
      <Link href="/" style={{ display:"flex", alignItems:"center", gap:"2px", textDecoration:"none", flexShrink:0 }}>
        <span style={{
          fontFamily:"'Departure Mono', monospace",
          fontSize:"20px", fontWeight:"bold",
          color:"#ffffff", letterSpacing:"-0.03em",
        }}>
          PRIME
        </span>
        <span style={{
          fontFamily:"'Departure Mono', monospace",
          fontSize:"20px", fontWeight:"bold",
          color:"#F5A623", letterSpacing:"-0.03em",
        }}>
          .fun
        </span>
      </Link>

      {/* ── Network Status ────────────────────── */}
      <div style={{ display:"flex", alignItems:"center", gap:"6px", flexShrink:0 }}>
        <span className="net-dot" />
        <span style={{
          fontFamily:"'Departure Mono', monospace",
          fontSize:"10px", color:"#00FF87", letterSpacing:"0.05em",
        }}>
          Base
        </span>
      </div>

      {/* ── Nav Links ─────────────────────────── */}
      <nav style={{ display:"flex", alignItems:"center", gap:"4px", flex:1, justifyContent:"center" }}>
        {NAV_LINKS.map(link => (
          <Link
            key={link.label}
            href={link.href}
            style={{
              fontFamily:"'DM Sans', sans-serif",
              fontSize:"14px", fontWeight:"400",
              color:"#888888",
              textDecoration:"none",
              padding:"6px 14px",
              borderRadius:"8px",
              transition:"color 150ms, background 150ms",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = "#ffffff";
              e.currentTarget.style.background = "rgba(255,255,255,0.06)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = "#888888";
              e.currentTarget.style.background = "transparent";
            }}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* ── Right Controls ────────────────────── */}
      <div style={{ display:"flex", alignItems:"center", gap:"12px", flexShrink:0 }}>

        {/* Sound Toggle — connected to SoundContext */}
        <button
          id="sound-toggle"
          onClick={toggleSound}
          title={soundOn ? "Mute sounds" : "Enable sounds"}
          style={{
            background: soundOn ? "rgba(245,166,35,0.12)" : "rgba(255,255,255,0.04)",
            border: `1px solid ${soundOn ? "rgba(245,166,35,0.3)" : "rgba(255,255,255,0.1)"}`,
            borderRadius: "8px",
            padding: "6px 10px",
            color: soundOn ? "#F5A623" : "#555555",
            fontSize: "16px",
            cursor: "pointer",
            transition: "all 150ms ease-out",
            lineHeight: 1,
            position: "relative",
          }}
        >
          {soundOn ? "🔊" : "🔇"}
          {/* Active indicator dot */}
          {soundOn && (
            <span style={{
              position:"absolute", top:"-2px", right:"-2px",
              width:"6px", height:"6px", borderRadius:"50%",
              background:"#00FF87",
              boxShadow:"0 0 4px #00FF87",
            }} />
          )}
        </button>

        {/* Create Coin */}
        <Link href="/create" style={{ textDecoration:"none" }}>
          <button
            id="create-coin-btn"
            style={{
              background:"#F5A623",
              color:"#000000",
              border:"none",
              borderRadius:"8px",
              padding:"8px 16px",
              fontFamily:"'DM Sans', sans-serif",
              fontSize:"13px", fontWeight:"700",
              cursor:"pointer",
              letterSpacing:"0.01em",
              transition:"transform 150ms, box-shadow 150ms, background 150ms",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "scale(1.04)";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(245,166,35,0.35)";
              e.currentTarget.style.background = "#FFB845";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.background = "#F5A623";
            }}
          >
            + Create Coin
          </button>
        </Link>

        {/* Wallet */}
        <ConnectButton showBalance={false} chainStatus="none" accountStatus="avatar" />
      </div>
    </header>
  );
}
