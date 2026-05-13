"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import TokenCard from "@/components/TokenCard";
import KingOfTheHill from "@/components/KingOfTheHill";
import StatsBar from "@/components/StatsBar";

// Dynamically import D3 chart (client-only, no SSR)
const BubbleChart = dynamic(() => import("@/components/BubbleChart"), { ssr: false });

// ─── Mock Data ───────────────────────────────────────────────────────────────
type CardType = "hot" | "new" | "charity" | "agent" | "normal";

interface Token {
  id: string;
  ticker: string;
  name: string;
  creator: string;
  marketCap: string;
  change: string;
  progress: number;
  image: string;
  type: CardType;
  comments: number;
  voiceUsers: number;
  category: string[];
  changeNum: number;
}

const ALL_TOKENS: Token[] = [
  { id:"t1",  ticker:"GOBLIN",  name:"GoblinCoin",     creator:"0x7f3a...c1d",  marketCap:"$20.6M",  change:"+340%",  changeNum:340,  progress:88, image:"https://picsum.photos/seed/goblin/300",  type:"hot",     category:["all","trending","movers"],   comments:234, voiceUsers:12 },
  { id:"t2",  ticker:"TROLL",   name:"TrollKing",      creator:"0x2b8d...f9e",  marketCap:"$117M",   change:"+28%",   changeNum:28,   progress:100, image:"https://picsum.photos/seed/troll/300",  type:"hot",     category:["all","trending"],            comments:891, voiceUsers:47 },
  { id:"t3",  ticker:"WISH",    name:"Make A Wish",    creator:"0x9a12...44b",  marketCap:"$250K",   change:"-2.3%",  changeNum:-2.3, progress:42, image:"https://picsum.photos/seed/wish/300",   type:"charity", category:["all","charity"],             comments:56,  voiceUsers:3  },
  { id:"t4",  ticker:"HANTA",   name:"Hantavirus",     creator:"0x4c77...9f0",  marketCap:"$3.31M",  change:"+180%",  changeNum:180,  progress:65, image:"https://picsum.photos/seed/hanta/300",  type:"agent",   category:["all","agents","movers"],     comments:129, voiceUsers:8  },
  { id:"t5",  ticker:"BOOB",    name:"BoobCoin",       creator:"0x1e55...a7c",  marketCap:"$6.70M",  change:"+0.0%",  changeNum:0,    progress:91, image:"https://picsum.photos/seed/boob/300",   type:"charity", category:["all","charity","trending"],  comments:443, voiceUsers:21 },
  { id:"t6",  ticker:"CHAOS",   name:"Chaos Token",    creator:"0x8d3b...22f",  marketCap:"$44K",    change:"+520%",  changeNum:520,  progress:12, image:"https://picsum.photos/seed/chaos/300",  type:"new",     category:["all","new","movers","mayhem"], comments:18, voiceUsers:0 },
  { id:"t7",  ticker:"NEURAL",  name:"Neural Net",     creator:"0xf091...b3a",  marketCap:"$810K",   change:"+92%",   changeNum:92,   progress:55, image:"https://picsum.photos/seed/neural/300", type:"agent",   category:["all","agents","trending"],   comments:77,  voiceUsers:5  },
  { id:"t8",  ticker:"FROG",    name:"FrogCoin",       creator:"0x3a2c...d1e",  marketCap:"$8K",     change:"+1200%", changeNum:1200, progress:5,  image:"https://picsum.photos/seed/frog/300",   type:"new",     category:["all","new","movers","mayhem"], comments:7, voiceUsers:0 },
  { id:"t9",  ticker:"DEGEN",   name:"DegenDAO",       creator:"0x6b4f...88c",  marketCap:"$1.2M",   change:"-45%",   changeNum:-45,  progress:73, image:"https://picsum.photos/seed/degen/300",  type:"normal",  category:["all","mayhem"],              comments:312, voiceUsers:18 },
  { id:"t10", ticker:"MAGA",    name:"MAGA Coin",      creator:"0x5d1a...f72",  marketCap:"$88M",    change:"+280%",  changeNum:280,  progress:99, image:"https://picsum.photos/seed/maga/300",   type:"hot",     category:["all","trending","movers"],   comments:1204, voiceUsers:89 },
  { id:"t11", ticker:"PUNCH",   name:"PunchToken",     creator:"0x2a9e...c4b",  marketCap:"$3.02M",  change:"+0.1%",  changeNum:0.1,  progress:81, image:"https://picsum.photos/seed/punch/300",  type:"charity", category:["all","charity"],             comments:88,  voiceUsers:6  },
  { id:"t12", ticker:"PEPE2",   name:"Pepe 2.0",       creator:"0x7c3d...01f",  marketCap:"$512K",   change:"+67%",   changeNum:67,   progress:48, image:"https://picsum.photos/seed/pepe2/300",  type:"normal",  category:["all","trending"],            comments:234, voiceUsers:14 },
  { id:"t13", ticker:"SKYNET",  name:"SkyNet AI",      creator:"0x0d88...a99",  marketCap:"$2.1M",   change:"+145%",  changeNum:145,  progress:62, image:"https://picsum.photos/seed/skynet/300", type:"agent",   category:["all","agents","movers"],     comments:156, voiceUsers:22 },
  { id:"t14", ticker:"MOON",    name:"Moonshot",       creator:"0x4f2a...b55",  marketCap:"$77K",    change:"+890%",  changeNum:890,  progress:18, image:"https://picsum.photos/seed/moon/300",   type:"new",     category:["all","new","movers","mayhem"], comments:23, voiceUsers:1 },
  { id:"t15", ticker:"RUG",     name:"RugPull",        creator:"0x9c11...d34",  marketCap:"$3K",     change:"-94%",   changeNum:-94,  progress:8,  image:"https://picsum.photos/seed/rug/300",    type:"normal",  category:["all","mayhem"],              comments:892, voiceUsers:0  },
  { id:"t16", ticker:"LOVE",    name:"LoveCharity",    creator:"0x3b77...e01",  marketCap:"$190K",   change:"+5.2%",  changeNum:5.2,  progress:35, image:"https://picsum.photos/seed/love/300",   type:"charity", category:["all","charity"],             comments:44,  voiceUsers:2  },
  { id:"t17", ticker:"ALPHA",   name:"AlphaBot",       creator:"0x8811...2c3",  marketCap:"$5.5M",   change:"+213%",  changeNum:213,  progress:78, image:"https://picsum.photos/seed/alpha/300",  type:"agent",   category:["all","agents","trending"],   comments:388, voiceUsers:31 },
  { id:"t18", ticker:"BEAR",    name:"BearCoin",       creator:"0x1f99...77a",  marketCap:"$420K",   change:"-38%",   changeNum:-38,  progress:57, image:"https://picsum.photos/seed/bear/300",   type:"normal",  category:["all","mayhem"],              comments:201, voiceUsers:9  },
  { id:"t19", ticker:"STAR",    name:"StarMeme",       creator:"0x6a3c...f4d",  marketCap:"$15K",    change:"+450%",  changeNum:450,  progress:9,  image:"https://picsum.photos/seed/star/300",   type:"new",     category:["all","new","movers"],        comments:11,  voiceUsers:0  },
  { id:"t20", ticker:"CYBER",   name:"CyberDAO",       creator:"0x4e8b...03e",  marketCap:"$740K",   change:"+78%",   changeNum:78,   progress:52, image:"https://picsum.photos/seed/cyber/300",  type:"agent",   category:["all","agents"],              comments:99,  voiceUsers:7  },
  { id:"t21", ticker:"SEED",    name:"SeedFund",       creator:"0x2d1a...9b8",  marketCap:"$62K",    change:"+12%",   changeNum:12,   progress:22, image:"https://picsum.photos/seed/seed/300",   type:"charity", category:["all","charity","new"],       comments:16,  voiceUsers:0  },
  { id:"t22", ticker:"VOID",    name:"VoidToken",      creator:"0x7a44...c12",  marketCap:"$1.8M",   change:"-67%",   changeNum:-67,  progress:44, image:"https://picsum.photos/seed/void/300",   type:"normal",  category:["all","mayhem"],              comments:567, voiceUsers:0  },
  { id:"t23", ticker:"PUMP",    name:"PumpMax",        creator:"0x5c99...e56",  marketCap:"$33M",    change:"+190%",  changeNum:190,  progress:95, image:"https://picsum.photos/seed/pump/300",   type:"hot",     category:["all","trending","movers"],   comments:778, voiceUsers:55 },
  { id:"t24", ticker:"GHOST",   name:"GhostProtocol",  creator:"0x1b2d...7f3",  marketCap:"$290K",   change:"+34%",   changeNum:34,   progress:39, image:"https://picsum.photos/seed/ghost/300",  type:"normal",  category:["all"],                       comments:45,  voiceUsers:4  },
];

// ─── Category Tabs ────────────────────────────────────────────────────────────
const TABS = [
  { id: "all",      label: "전체",        icon: "◎" },
  { id: "trending", label: "Trending",   icon: "🔥" },
  { id: "new",      label: "New",        icon: "🌱" },
  { id: "charity",  label: "Charity",    icon: "💚" },
  { id: "agents",   label: "Agents",     icon: "🤖" },
  { id: "mayhem",   label: "Mayhem",     icon: "💥" },
  { id: "movers",   label: "Movers",     icon: "📈" },
];

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Home() {
  const [activeTab, setActiveTab] = useState("all");
  const [flashMap, setFlashMap] = useState<Record<string, "buy" | "sell">>({});

  // Simulate periodic trade flashes
  useEffect(() => {
    const interval = setInterval(() => {
      const token = ALL_TOKENS[Math.floor(Math.random() * ALL_TOKENS.length)];
      const type = Math.random() > 0.35 ? "buy" : "sell";
      setFlashMap(prev => ({ ...prev, [token.id]: type }));
      setTimeout(() => {
        setFlashMap(prev => {
          const next = { ...prev };
          delete next[token.id];
          return next;
        });
      }, 800);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const filteredTokens = ALL_TOKENS.filter(t => t.category.includes(activeTab));

  // Sort mayhem by most extreme change
  const displayTokens = activeTab === "mayhem"
    ? [...filteredTokens].sort((a, b) => Math.abs(b.changeNum) - Math.abs(a.changeNum))
    : activeTab === "movers"
      ? [...filteredTokens].sort((a, b) => b.changeNum - a.changeNum)
      : filteredTokens;

  const isMayhem = activeTab === "mayhem";

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", paddingBottom: "80px" }}>

      {/* ── Hero Section: Bubble Chart + Side Panel ─────────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 260px",
          gap: "16px",
          marginBottom: "32px",
        }}
      >
        {/* Bubble Chart */}
        <BubbleChart />

        {/* Right Side Panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <KingOfTheHill />
          <StatsBar />
        </div>
      </div>

      {/* ── Category Tabs ─────────────────────────────────────────────── */}
      <div
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          marginBottom: "24px",
          background: isMayhem ? "rgba(255,59,59,0.03)" : "transparent",
          transition: "background 300ms ease",
          paddingTop: "4px",
        }}
      >
        <div style={{ display: "flex", gap: "0", overflowX: "auto" }} className="scrollbar-hide">
          {TABS.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "12px 16px",
                  background: "none",
                  border: "none",
                  borderBottom: isActive ? "2px solid #F5A623" : "2px solid transparent",
                  color: isActive ? "#F5A623" : "#888888",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "13px",
                  fontWeight: isActive ? "600" : "400",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "color 150ms ease-out, border-color 150ms ease-out",
                  position: "relative",
                }}
                onMouseEnter={e => {
                  const icon = e.currentTarget.querySelector(".tab-icon") as HTMLElement;
                  if (icon) icon.style.animation = "icon-bounce 0.4s ease";
                }}
                onMouseLeave={e => {
                  const icon = e.currentTarget.querySelector(".tab-icon") as HTMLElement;
                  if (icon) icon.style.animation = "none";
                }}
              >
                <span
                  className="tab-icon"
                  style={{ fontSize: "14px", display: "inline-block" }}
                >
                  {tab.icon}
                </span>
                {tab.label}
                {tab.id === "mayhem" && (
                  <span
                    style={{
                      background: "rgba(255,59,59,0.15)",
                      color: "#FF3B3B",
                      fontSize: "9px",
                      fontFamily: "'Departure Mono', monospace",
                      padding: "1px 5px",
                      borderRadius: "3px",
                      border: "1px solid rgba(255,59,59,0.3)",
                    }}
                  >
                    EXTREME
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Token Grid ────────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: "16px",
          }}
        >
          {displayTokens.map((token, i) => (
            <motion.div
              key={token.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.025, duration: 0.2 }}
            >
              <TokenCard
                {...token}
                flashType={flashMap[token.id] ?? null}
              />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {displayTokens.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "80px 0",
            color: "#444444",
            fontFamily: "'Departure Mono', monospace",
            fontSize: "14px",
          }}
        >
          No tokens in this category yet.
        </div>
      )}
    </div>
  );
}
