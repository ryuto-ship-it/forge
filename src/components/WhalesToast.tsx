"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSoundContext } from "@/contexts/SoundContext";
import { playWhaleSound, playNewTokenSound, playDonationSound } from "@/lib/soundEngine";
import { triggerWhaleSwim } from "@/components/WhaleSwimEffect";

type ToastType = "whale" | "new_token" | "ath" | "charity";

interface Toast {
  id: string;
  type: ToastType;
  emoji: string;
  title: string;
  body: string;
  amount?: string;
}

const MOCK_EVENTS: Omit<Toast, "id">[] = [
  { type:"whale",     emoji:"🐋", title:"WHALE ALERT",        body:"Anonymous bought $GOBLIN",       amount:"42 ETH · $280,000" },
  { type:"new_token", emoji:"🚀", title:"NEW COIN",           body:"$CHAOS launched by 0x7f3a...",   amount:"Bonding 0%" },
  { type:"ath",       emoji:"🔥", title:"ATH ALERT",          body:"$TROLL hit all-time high",       amount:"$117M market cap" },
  { type:"whale",     emoji:"🐋", title:"WHALE ALERT",        body:"0x9c21... entered $DEGEN",       amount:"88 ETH · $590,000" },
  { type:"charity",   emoji:"💚", title:"CHARITY MILESTONE",  body:"$WISH donation hit $10K",        amount:"+$10,000" },
  { type:"new_token", emoji:"🚀", title:"NEW COIN",           body:"$FROG launched by 0x2b8d...",   amount:"Bonding 0%" },
  { type:"whale",     emoji:"🐋", title:"WHALE ALERT",        body:"Whale dumped $MAGA",             amount:"-55 ETH · $368,000" },
  { type:"ath",       emoji:"🔥", title:"ATH ALERT",          body:"$GOBLIN new ATH!",              amount:"$20.6M market cap" },
  { type:"whale",     emoji:"🐋", title:"WHALE ALERT",        body:"Anonymous ape'd into $PUMP",    amount:"120 ETH · $800,000" },
];

const BORDER_COLORS: Record<ToastType, string> = {
  whale:     "#00FFE5",
  new_token: "#F5A623",
  ath:       "#F5A623",
  charity:   "#FF6B6B",
};

const GLOW_COLORS: Record<ToastType, string> = {
  whale:     "rgba(0,255,229,0.18)",
  new_token: "rgba(245,166,35,0.18)",
  ath:       "rgba(245,166,35,0.18)",
  charity:   "rgba(255,107,107,0.18)",
};

const AMOUNT_COLORS: Record<ToastType, string> = {
  whale:     "#00FFE5",
  new_token: "#F5A623",
  ath:       "#F5A623",
  charity:   "#FF6B6B",
};

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: (id: string) => void }) {
  useEffect(() => {
    const t = setTimeout(() => onDismiss(toast.id), 4500);
    return () => clearTimeout(t);
  }, [toast.id, onDismiss]);

  return (
    <motion.div
      layout
      initial={{ x: 110, opacity: 0 }}
      animate={{ x: 0,   opacity: 1 }}
      exit={{    x: 110, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
      onClick={() => onDismiss(toast.id)}
      style={{
        background: "#111111",
        border: `1px solid ${BORDER_COLORS[toast.type]}`,
        borderLeft: `3px solid ${BORDER_COLORS[toast.type]}`,
        boxShadow: `0 4px 24px ${GLOW_COLORS[toast.type]}, 0 0 0 1px rgba(255,255,255,0.04)`,
        borderRadius: "10px",
        padding: "12px 14px",
        cursor: "pointer",
        minWidth: "280px",
        maxWidth: "320px",
        userSelect: "none",
      }}
    >
      <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"6px" }}>
        <span style={{ fontSize:"18px" }}>{toast.emoji}</span>
        <span style={{
          fontFamily:"'Departure Mono', monospace",
          fontSize:"11px", fontWeight:"bold",
          color: BORDER_COLORS[toast.type],
          letterSpacing:"0.08em",
        }}>
          {toast.title}
        </span>
        <span style={{ marginLeft:"auto", color:"#444", fontSize:"16px", lineHeight:1 }}>×</span>
      </div>
      <div style={{ fontFamily:"'DM Sans', sans-serif", fontSize:"13px", color:"#cccccc", marginBottom: toast.amount ? "6px" : 0 }}>
        {toast.body}
      </div>
      {toast.amount && (
        <div style={{ fontFamily:"'Departure Mono', monospace", fontSize:"12px", color: AMOUNT_COLORS[toast.type], fontWeight:"bold" }}>
          {toast.amount}
        </div>
      )}
      <motion.div
        initial={{ scaleX:1 }}
        animate={{ scaleX:0 }}
        transition={{ duration:4.5, ease:"linear" }}
        style={{
          marginTop:"10px", height:"2px",
          background: BORDER_COLORS[toast.type],
          opacity:0.4, borderRadius:"1px",
          transformOrigin:"left center",
        }}
      />
    </motion.div>
  );
}

export default function WhalesToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [eventIndex, setEventIndex] = useState(0);
  const { play } = useSoundContext();

  const dismiss = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  useEffect(() => {
    const showNext = () => {
      const template = MOCK_EVENTS[eventIndex % MOCK_EVENTS.length];
      const toast: Toast = { ...template, id: `${Date.now()}-${Math.random()}` };

      setToasts(prev => [...prev.slice(-4), toast]);
      setEventIndex(i => i + 1);

      // Trigger sounds + side effects based on type
      if (template.type === "whale") {
        play(playWhaleSound);
        // Trigger whale swim
        triggerWhaleSwim({
          id: toast.id,
          text: template.body,
          amount: template.amount ?? "",
        });
      } else if (template.type === "new_token") {
        play(playNewTokenSound);
      } else if (template.type === "charity") {
        play(playDonationSound);
      }
    };

    const initial  = setTimeout(showNext, 3000);
    const interval = setInterval(showNext, 9000);
    return () => { clearTimeout(initial); clearInterval(interval); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventIndex]);

  return (
    <div style={{
      position:"fixed", bottom:"24px", right:"24px",
      zIndex:9000,
      display:"flex", flexDirection:"column", gap:"10px",
      pointerEvents:"none",
    }}>
      <div style={{ pointerEvents:"all" }}>
        <AnimatePresence mode="popLayout">
          {toasts.map(toast => (
            <div key={toast.id} style={{ marginTop:"10px" }}>
              <ToastItem toast={toast} onDismiss={dismiss} />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
