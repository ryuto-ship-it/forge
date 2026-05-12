"use client";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Copy, Terminal, ShieldAlert, FileCode2, Wallet, Layers, ArrowRightLeft, Activity, MessageCircle } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function TokenPage() {
  const params = useParams();
  const id = params.id as string;
  const [tradeMode, setTradeMode] = useState<"buy" | "sell">("buy");
  const [amount, setAmount] = useState("");

  return (
    <div className="w-full">
      {/* Top Header / Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 font-bold">
        <span className="hover:text-white cursor-pointer transition-colors">Search for coins...</span>
        <span>/</span>
        <span className="text-white">Red Kitten Crew</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: Chart & About */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Token Header */}
          <div className="flex items-start gap-4 p-4 bg-card rounded-2xl border border-border">
            <div className="w-16 h-16 rounded-xl bg-secondary overflow-hidden relative border border-border">
              <Image src="/tokens/aegis.png" alt="RKC" fill className="object-cover" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-bold text-white">Red Kitten Crew</h1>
                <span className="text-xs font-mono font-bold bg-secondary text-white px-2 py-1 rounded-md">RKC</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
                <div className="flex items-center gap-1 hover:text-white cursor-pointer transition-colors">
                  <span className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-[8px] text-white">1</span>
                  1nc1ne
                </div>
                <span>•</span>
                <span>6h ago</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" className="rounded-full font-bold">Share</Button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-card border border-border rounded-2xl p-4 flex flex-col items-center justify-center text-center">
              <div className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">Market Cap</div>
              <div className="text-2xl font-bold text-primary">$6.71M</div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-4 flex flex-col items-center justify-center text-center">
              <div className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">Vol 24h</div>
              <div className="text-lg font-bold text-white">$30.1M</div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-4 flex flex-col items-center justify-center text-center">
              <div className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">Price</div>
              <div className="text-lg font-mono font-bold text-white">$0.00668</div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-4 flex flex-col items-center justify-center text-center">
              <div className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">24h Chg</div>
              <div className="text-lg font-bold text-primary">+235k%</div>
            </div>
          </div>

          {/* Chart */}
          <div className="border border-border bg-card rounded-2xl flex flex-col h-[500px] overflow-hidden relative group">
            <div className="flex-1 relative bg-[#0a0a0a]">
              {/* Grid Lines */}
              <div className="absolute inset-0" style={{backgroundImage: "linear-gradient(to right, #18181b 1px, transparent 1px), linear-gradient(to bottom, #18181b 1px, transparent 1px)", backgroundSize: "40px 40px"}}></div>
              {/* Mock Candlestick Chart SVG */}
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 300">
                <g strokeWidth="2">
                  {/* Candlesticks mock */}
                  {[...Array(50)].map((_, i) => {
                    const isGreen = Math.random() > 0.4;
                    const color = isGreen ? "#4ade80" : "#ef4444";
                    const x = i * 20 + 10;
                    const y1 = Math.random() * 150 + 50;
                    const y2 = y1 + Math.random() * 80 + 20;
                    const cy1 = y1 + Math.random() * 15;
                    const cy2 = y2 - Math.random() * 15;
                    return (
                      <g key={i}>
                        <line x1={x} y1={y1} x2={x} y2={y2} stroke={color} strokeOpacity={0.6} />
                        <rect x={x - 4} y={cy1} width="8" height={cy2 - cy1} fill={color} rx="2" />
                      </g>
                    );
                  })}
                </g>
              </svg>
              <div className="absolute top-4 left-4 flex gap-2">
                <Button variant="secondary" className="h-8 rounded-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">15m</Button>
                <Button variant="secondary" className="h-8 rounded-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">Price/MCap</Button>
              </div>
            </div>
          </div>

          {/* About Coin */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">About Coin</h3>
            <p className="text-sm text-white/90 leading-relaxed mb-6">
              Roaring Kitty, the guy who turned GameStop into a cultural war between Reddit and Wall Street, posted the $RKC contract address from his account. The coin hit 6x in two minutes, and he followed up with 'red bandit crew 4 life.'
            </p>
            <div className="flex gap-2">
              <Button variant="secondary" className="rounded-full text-xs font-bold h-8">TheRoaringKitty</Button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Execution & Bonding */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Buy/Sell Panel */}
          <div className="border border-border bg-card rounded-2xl flex flex-col">
            <div className="flex p-2 gap-2 bg-background/50 border-b border-border rounded-t-2xl">
              <button 
                className={`flex-1 py-2 text-sm font-bold rounded-xl transition-colors ${tradeMode === "buy" ? "bg-primary text-black" : "text-muted-foreground hover:bg-secondary hover:text-white"}`}
                onClick={() => setTradeMode("buy")}
              >
                Buy
              </button>
              <button 
                className={`flex-1 py-2 text-sm font-bold rounded-xl transition-colors ${tradeMode === "sell" ? "bg-destructive text-white" : "text-muted-foreground hover:bg-secondary hover:text-white"}`}
                onClick={() => setTradeMode("sell")}
              >
                Sell
              </button>
            </div>
            
            <div className="p-4 flex flex-col gap-4">
              <div className="flex justify-between items-center text-sm font-bold text-muted-foreground px-2">
                <span className="cursor-pointer hover:text-white">Switch to RKC</span>
                <span className="cursor-pointer hover:text-white">Slippage 2%</span>
              </div>

              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 font-mono font-bold text-muted-foreground">0.0</div>
                <Input 
                  type="number" 
                  placeholder="" 
                  className="h-16 bg-background border-border text-white font-mono rounded-xl focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary transition-colors pl-12 pr-16 text-xl"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <span className="text-xs font-bold font-mono">ETH</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="secondary" className="flex-1 rounded-xl text-xs font-bold h-8 border border-border">Reset</Button>
                <Button variant="secondary" className="flex-1 rounded-xl text-xs font-bold h-8 border border-border">1 ETH</Button>
                <Button variant="secondary" className="flex-1 rounded-xl text-xs font-bold h-8 border border-border">5 ETH</Button>
              </div>

              <Button className={`w-full h-14 text-base font-bold rounded-xl mt-2 transition-transform active:scale-95 ${tradeMode === "buy" ? "bg-primary hover:bg-green-400 text-black" : "bg-destructive hover:bg-destructive/90 text-white"}`}>
                Place Trade
              </Button>
            </div>
          </div>

          {/* Creator Rewards / Progress */}
          <div className="border border-border bg-card rounded-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Creator Rewards</h3>
              <Button variant="secondary" className="h-8 rounded-full text-xs font-bold">Follow</Button>
            </div>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">1</div>
              <div>
                <div className="text-sm font-bold text-white flex items-center gap-2">1nc1...1111 <span className="text-[10px] bg-secondary px-1.5 py-0.5 rounded-md">Creator</span></div>
                <div className="text-xs text-primary font-bold">✓ 100%</div>
              </div>
            </div>

            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Bonding curve progress</h3>
            <div className="flex justify-between text-xs font-bold mb-2">
              <span className="text-white">Target: 20 ETH</span>
              <span className="text-primary">100.0%</span>
            </div>
            <Progress value={100} className="h-2 bg-secondary rounded-full [&>div]:bg-primary mb-2" />
            <p className="text-xs text-muted-foreground font-bold">Coin has graduated to DEX!</p>
          </div>

          {/* Voice Chat */}
          <div className="border border-border bg-card rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"><MessageCircle className="w-5 h-5 text-muted-foreground" /></div>
              <div>
                <div className="text-sm font-bold text-white">Voice chat</div>
                <div className="text-xs text-muted-foreground">Talk live with other $RKC holders</div>
              </div>
            </div>
            <Button className="w-full h-12 bg-primary text-black hover:bg-green-400 font-bold rounded-xl transition-all">
              Join voice chat
            </Button>
          </div>

        </div>

      </div>
    </div>
  );
}
