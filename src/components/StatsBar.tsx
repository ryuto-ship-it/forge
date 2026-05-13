"use client";

import { useState, useEffect, useRef } from "react";
import { useSoundContext } from "@/contexts/SoundContext";
import { playMilestoneSound, playDonationSound } from "@/lib/soundEngine";
import { triggerMilestone } from "@/components/ConfettiBanner";

interface StatItem {
  id: string;
  icon: string;
  label: string;
  base: number;
  format: (n: number) => string;
  color: string;
  accentColor: string;
  increment: () => number;
  isCharity?: boolean;
}

const MILESTONES = [90_000, 100_000, 150_000, 200_000, 250_000, 500_000];

const STATS: StatItem[] = [
  {
    id: "tokens",
    icon: "🚀",
    label: "Tokens Launched Today",
    base: 1247,
    format: n => n.toLocaleString(),
    color: "#ffffff",
    accentColor: "#F5A623",
    increment: () => Math.random() < 0.15 ? 1 : 0,
  },
  {
    id: "volume",
    icon: "📊",
    label: "24h Trading Volume",
    base: 4_200_000,
    format: n => `$${(n / 1_000_000).toFixed(2)}M`,
    color: "#ffffff",
    accentColor: "#F5A623",
    increment: () => Math.floor(Math.random() * 800),
  },
  {
    id: "charity",
    icon: "💚",
    label: "Total Donations",
    base: 89_340,
    format: n => `$${n.toLocaleString()}`,
    color: "#00FF87",
    accentColor: "#00FF87",
    increment: () => Math.random() < 0.3 ? 1 : 0,
    isCharity: true,
  },
  {
    id: "traders",
    icon: "🔥",
    label: "Active Traders Now",
    base: 3891,
    format: n => n.toLocaleString(),
    color: "#ffffff",
    accentColor: "#F5A623",
    increment: () => Math.floor(Math.random() * 5) - 2,
  },
];

interface Particle { id: number; x: number; }

function AnimatedNumber({ value, format, color }: { value: number; format: (n: number) => string; color: string }) {
  const [displayed, setDisplayed] = useState(value);
  const prevRef = useRef(value);

  useEffect(() => {
    const from = prevRef.current;
    const to = value;
    if (from === to) return;
    prevRef.current = to;
    const duration = 400;
    const start = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(from + (to - from) * eased));
      if (progress < 1) requestAnimationFrame(animate);
      else setDisplayed(to);
    };
    requestAnimationFrame(animate);
  }, [value]);

  return (
    <span style={{ color, fontFamily: "'Departure Mono', monospace", fontSize: "26px", fontWeight: "bold" }}>
      {format(displayed)}
    </span>
  );
}

export default function StatsBar() {
  const [values, setValues] = useState<Record<string, number>>(
    Object.fromEntries(STATS.map(s => [s.id, s.base]))
  );
  const [particles, setParticles] = useState<Record<string, Particle[]>>(
    Object.fromEntries(STATS.map(s => [s.id, []]))
  );
  const particleCounter = useRef(0);
  const triggeredMilestones = useRef<Set<number>>(new Set());
  const { play } = useSoundContext();

  useEffect(() => {
    const interval = setInterval(() => {
      setValues(prev => {
        const next = { ...prev };
        STATS.forEach(stat => {
          const inc = stat.increment();
          if (inc !== 0) {
            next[stat.id] = Math.max(0, prev[stat.id] + inc);

            // Charity: particle + milestone check
            if (stat.isCharity && inc > 0) {
              particleCounter.current++;
              const pid = particleCounter.current;
              setParticles(pp => ({
                ...pp,
                [stat.id]: [...(pp[stat.id] || []).slice(-5), { id: pid, x: 20 + Math.random() * 60 }],
              }));
              setTimeout(() => {
                setParticles(pp => ({
                  ...pp,
                  [stat.id]: (pp[stat.id] || []).filter(p => p.id !== pid),
                }));
              }, 1200);

              // Play small donation sound
              play(playDonationSound);

              // Milestone check
              const newVal = next[stat.id];
              for (const milestone of MILESTONES) {
                if (newVal >= milestone && !triggeredMilestones.current.has(milestone)) {
                  triggeredMilestones.current.add(milestone);
                  play(playMilestoneSound);
                  const label = milestone >= 1_000_000
                    ? `$${(milestone / 1_000_000).toFixed(0)}M`
                    : `$${(milestone / 1_000).toFixed(0)}K`;
                  triggerMilestone(label);
                  break;
                }
              }
            }
          }
        });
        return next;
      });
    }, 1200);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{
      background: "#0e0e0e",
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: "16px",
      padding: "20px",
    }}>
      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"20px" }}>
        <span style={{
          fontFamily:"'Departure Mono', monospace",
          fontSize:"11px", color:"#F5A623", letterSpacing:"0.1em",
        }}>
          📡 PLATFORM STATS
        </span>
        <span className="net-dot" />
      </div>

      {/* Stats */}
      <div style={{ display:"flex", flexDirection:"column", gap:"18px" }}>
        {STATS.map(stat => (
          <div key={stat.id} style={{ position:"relative" }}>
            {/* Particles */}
            {particles[stat.id]?.map(p => (
              <div
                key={p.id}
                style={{
                  position:"absolute", left:`${p.x}%`, bottom:"100%",
                  fontFamily:"'Departure Mono', monospace",
                  fontSize:"11px", color: stat.accentColor,
                  fontWeight:"bold", pointerEvents:"none",
                  animation:"particle-rise 1.2s ease-out forwards",
                  zIndex:10,
                }}
              >
                +1
              </div>
            ))}

            <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
              <span style={{ fontSize:"16px" }}>{stat.icon}</span>
              <span style={{ fontFamily:"'DM Sans', sans-serif", fontSize:"12px", color:"#888" }}>
                {stat.label}
              </span>
            </div>

            <div style={{ marginTop:"4px" }}>
              <AnimatedNumber value={values[stat.id]} format={stat.format} color={stat.color} />
            </div>

            {stat.isCharity && (
              <div style={{
                height:"1px",
                background:"linear-gradient(90deg, rgba(0,255,135,0.4), transparent)",
                marginTop:"6px",
              }} />
            )}
          </div>
        ))}
      </div>

      <div style={{
        marginTop:"20px", paddingTop:"14px",
        borderTop:"1px solid rgba(255,255,255,0.04)",
        fontFamily:"'DM Sans', sans-serif", fontSize:"10px",
        color:"#444", textAlign:"center",
      }}>
        Updates every 1.2s · Base mainnet
      </div>
    </div>
  );
}
