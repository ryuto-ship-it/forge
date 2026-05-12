"use client";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Terminal, Activity, MessageCircle, Mic, ArrowUpRight, Settings, CandlestickChart, Type, Smile, Ruler, Search, Magnet, Pencil, PenTool, AlignLeft, FileCode2 } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

// Mock Trades Data
const TRADES = Array.from({ length: 15 }).map((_, i) => ({
  id: i,
  account: `0x${Math.floor(Math.random()*10000).toString(16)}...`,
  type: Math.random() > 0.5 ? "Buy" : "Sell",
  sol: (Math.random() * 5).toFixed(4),
  token: (Math.random() * 100000).toFixed(2),
  time: `${Math.floor(Math.random() * 59) + 1}s ago`,
  txn: `tx${Math.floor(Math.random()*10000)}`,
  avatar: `https://picsum.photos/seed/${i + 200}/32/32`
}));

const CALLOUTS = [
  { name: "9o2F...twBf", time: "4 days ago", calledAt: "$4.59M", change: "+40%", msg: "" },
  { name: "4a3Y...pGfj", time: "1 day ago", calledAt: "$4.88M", change: "+40%", msg: "hey4" },
  { name: "Dxv3...yVUK", time: "11 days ago", calledAt: "$5.11M", change: "+20%", msg: "If autism hit 25 mil i will eat 3500 mc nuggets live on stream pump fun live" },
  { name: "9qCp...iFCp", time: "about 1 month ago", calledAt: "$2.92M", change: "2.1x", msg: "" }
];

export default function TokenPage() {
  const params = useParams();
  const id = params.id as string;
  const [tradeMode, setTradeMode] = useState<"buy" | "sell">("buy");

  return (
    <div className="w-full text-[#fafafa]">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: Chart Area */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          
          {/* Header Box (Matches screenshot exactly) */}
          <div className="bg-[#121212] border border-[#27272a] rounded-xl p-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="text-sm font-bold text-muted-foreground mb-1">Market Cap</div>
              <div className="text-4xl font-black text-white tracking-tight mb-2">$6.63M</div>
              <div className="text-primary font-bold text-sm tracking-wide">
                +$1.04M (+18.61%) 24hr
              </div>
            </div>
            
            <div className="flex-1 max-w-[300px] flex items-center gap-4 mb-1">
              <div className="flex-1">
                <div className="h-1.5 bg-[#27272a] rounded-full overflow-hidden w-full relative">
                  <div className="absolute top-0 left-0 h-full bg-primary/70 rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>
              <div className="text-sm font-bold text-muted-foreground whitespace-nowrap">
                ATH <span className="text-white">$6.79M</span>
              </div>
            </div>
          </div>

          {/* Chart Wrapper */}
          <div className="bg-[#121212] border border-[#27272a] rounded-xl flex flex-col overflow-hidden h-[600px]">
            
            {/* Chart Top Toolbar */}
            <div className="flex items-center gap-6 px-4 py-3 border-b border-[#27272a] text-xs font-bold text-muted-foreground">
              <span className="text-white cursor-pointer hover:text-primary transition-colors">24h</span>
              <CandlestickChart className="w-4 h-4 cursor-pointer hover:text-white transition-colors" />
              <span className="cursor-pointer hover:text-white transition-colors">Trade Display</span>
              <span className="cursor-pointer hover:text-white transition-colors">Hide All Bubbles</span>
              <span className="text-primary cursor-pointer">Price/MCap</span>
              <span className="cursor-pointer hover:text-white transition-colors">USD/ETH</span>
            </div>
            
            <div className="flex-1 flex relative bg-[#0a0a0a]">
              
              {/* Left Vertical Toolbar */}
              <div className="w-12 border-r border-[#27272a] flex flex-col items-center py-2 gap-4 text-muted-foreground bg-[#121212]">
                <Activity className="w-4 h-4 cursor-pointer hover:text-white transition-colors"/>
                <ArrowUpRight className="w-4 h-4 cursor-pointer hover:text-white transition-colors"/>
                <PenTool className="w-4 h-4 cursor-pointer hover:text-white transition-colors"/>
                <Type className="w-4 h-4 cursor-pointer hover:text-white transition-colors"/>
                <Smile className="w-4 h-4 cursor-pointer hover:text-white transition-colors"/>
                <Ruler className="w-4 h-4 cursor-pointer hover:text-white transition-colors"/>
                <Search className="w-4 h-4 cursor-pointer hover:text-white transition-colors"/>
                <Magnet className="w-4 h-4 cursor-pointer hover:text-white transition-colors"/>
                <Pencil className="w-4 h-4 cursor-pointer hover:text-white transition-colors mt-auto"/>
              </div>
              
              {/* Main Chart Area */}
              <div className="flex-1 relative overflow-hidden">
                {/* Grid Lines */}
                <div className="absolute inset-0" style={{backgroundImage: "linear-gradient(to right, #18181b 1px, transparent 1px), linear-gradient(to bottom, #18181b 1px, transparent 1px)", backgroundSize: "80px 40px"}}></div>
                
                {/* Chart Info Overlay */}
                <div className="absolute top-4 left-4 z-10 font-mono text-xs">
                  <div className="text-white font-bold mb-1">boob/ETH Market Cap (USD) · 24h · Prime</div>
                  <div className="text-primary font-bold">O <span className="text-white">6.40M</span> H <span className="text-white">7.11M</span> L <span className="text-white">6.40M</span> C <span className="text-white">6.63M</span> <span className="ml-2">231K (+3.61%)</span></div>
                  <div className="text-muted-foreground font-bold mt-2">Volume <span className="text-primary">216.67K</span></div>
                </div>

                {/* Y-Axis mock labels */}
                <div className="absolute right-0 top-0 bottom-8 w-16 border-l border-[#27272a] bg-[#0a0a0a]/80 flex flex-col justify-between py-10 text-[10px] text-muted-foreground items-center font-mono">
                  <span>8.00M</span>
                  <span>7.00M</span>
                  <span className="bg-primary/20 text-primary px-1 -ml-1 border border-primary/30 w-full text-center">6.63M</span>
                  <span>6.00M</span>
                  <span>5.00M</span>
                  <span>4.00M</span>
                  <span>3.00M</span>
                  <span>2.00M</span>
                  <span>1.00M</span>
                </div>
                
                {/* Chart Mock SVG */}
                <svg className="absolute inset-0 w-[calc(100%-4rem)] h-[calc(100%-2rem)]" preserveAspectRatio="none" viewBox="0 0 1000 300">
                  <g strokeWidth="2">
                    {[...Array(60)].map((_, i) => {
                      // Parabolic curve
                      const x = i * 16 + 10;
                      // Base path simulates a dip and then a massive rally
                      const base = i < 30 ? 200 + (Math.sin(i/5) * 50) : 250 - (Math.pow(i-30, 2) * 0.3);
                      
                      const isGreen = i > 30 || Math.random() > 0.4;
                      const color = isGreen ? "#4ade80" : "#ef4444";
                      const y1 = Math.max(20, base - Math.random() * 40);
                      const y2 = Math.min(280, y1 + Math.random() * 40 + 5);
                      const cy1 = y1 + Math.random() * 5;
                      const cy2 = y2 - Math.random() * 5;
                      return (
                        <g key={i}>
                          <line x1={x} y1={y1} x2={x} y2={y2} stroke={color} strokeOpacity={0.8} />
                          <rect x={x - 3} y={cy1} width="6" height={Math.max(1, cy2 - cy1)} fill={color} />
                        </g>
                      );
                    })}
                  </g>
                  {/* Volume Bars at bottom */}
                  <g>
                    {[...Array(60)].map((_, i) => {
                       const isGreen = i > 30 || Math.random() > 0.4;
                       const color = isGreen ? "#4ade80" : "#ef4444";
                       const h = Math.random() * 30 + (i > 45 ? 20 : 5);
                       return <rect key={`vol-${i}`} x={i * 16 + 7} y={300 - h} width="6" height={h} fill={color} opacity="0.6" />;
                    })}
                  </g>
                </svg>

                {/* Callout Bubbles Mock */}
                <div className="absolute top-[20%] right-[10%] w-6 h-6 rounded-full bg-[#8b5cf6]/20 border border-[#8b5cf6] flex items-center justify-center text-[10px] text-[#8b5cf6] font-bold shadow-[0_0_10px_rgba(139,92,246,0.3)]">C</div>
                <div className="absolute top-[40%] right-[30%] w-6 h-6 rounded-full bg-[#8b5cf6]/20 border border-[#8b5cf6] flex items-center justify-center text-[10px] text-[#8b5cf6] font-bold shadow-[0_0_10px_rgba(139,92,246,0.3)]">C</div>
                <div className="absolute top-[35%] right-[30%] w-6 h-6 rounded-full bg-[#8b5cf6]/20 border border-[#8b5cf6] flex items-center justify-center text-[10px] text-[#8b5cf6] font-bold shadow-[0_0_10px_rgba(139,92,246,0.3)]">C</div>
                
                <div className="absolute top-[50%] left-[25%] w-6 h-6 rounded-full bg-primary/20 border border-primary flex items-center justify-center text-[10px] text-primary font-bold shadow-[0_0_10px_rgba(74,222,128,0.3)]">DB</div>
                <div className="absolute top-[60%] left-[10%] w-6 h-6 rounded-full bg-primary/20 border border-primary flex items-center justify-center text-[10px] text-primary font-bold shadow-[0_0_10px_rgba(74,222,128,0.3)]">DB</div>

              </div>
            </div>
            
            {/* Chart Bottom Toolbar */}
            <div className="h-8 border-t border-[#27272a] flex items-center justify-between px-4 bg-[#121212] text-[10px] font-bold text-muted-foreground">
              <div className="flex gap-4 items-center">
                <span className="text-white cursor-pointer">1D</span>
                <span className="cursor-pointer hover:text-white">5D</span>
                <span className="cursor-pointer hover:text-white">1M</span>
                <span className="cursor-pointer hover:text-white border border-[#27272a] rounded px-1 ml-2">📅</span>
              </div>
              <div className="flex gap-4 items-center">
                <span>04:24:06 UTC</span>
                <span className="text-blue-500 cursor-pointer">%</span>
                <span className="text-blue-500 cursor-pointer">log</span>
                <span className="text-blue-500 cursor-pointer">auto</span>
              </div>
            </div>
          </div>

          {/* Trades Table */}
          <div className="border border-[#27272a] bg-[#121212] rounded-xl overflow-hidden mt-4">
            <div className="grid grid-cols-6 gap-4 p-4 border-b border-[#27272a] text-[11px] uppercase font-bold text-muted-foreground">
              <div className="col-span-2">Account</div>
              <div>Type</div>
              <div>Amount (ETH)</div>
              <div>Amount (boob)</div>
              <div>Time</div>
              <div>Txn</div>
            </div>
            
            <div className="flex flex-col">
              {TRADES.map((trade, i) => (
                <div key={trade.id} className="grid grid-cols-6 gap-4 p-3 items-center text-xs font-mono font-bold border-b border-[#27272a]/50 hover:bg-[#18181b] transition-colors">
                  <div className="col-span-2 flex items-center gap-2">
                    <div className="w-5 h-5 rounded overflow-hidden">
                      <Image src={trade.avatar} alt="avatar" width={20} height={20} className="object-cover"/>
                    </div>
                    <span className="text-white hover:underline cursor-pointer">{trade.account}</span>
                  </div>
                  <div className={trade.type === "Buy" ? "text-primary" : "text-destructive"}>{trade.type}</div>
                  <div className={trade.type === "Buy" ? "text-primary" : "text-destructive"}>{trade.sol}</div>
                  <div className={trade.type === "Buy" ? "text-primary" : "text-destructive"}>{trade.token}</div>
                  <div className="text-muted-foreground text-[10px] flex items-center gap-1">{trade.time}</div>
                  <div className="flex items-center gap-1 text-muted-foreground hover:text-white cursor-pointer">
                    {trade.txn} <ArrowUpRight className="w-3 h-3" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Execution & Widgets */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          
          {/* Box 1: Quick Connect Panel */}
          <div className="bg-[#121212] border border-[#27272a] rounded-xl p-5 flex flex-col gap-4">
            <div className="flex justify-between items-center text-sm font-bold text-white px-2">
              <span className="cursor-pointer hover:text-primary transition-colors">$25</span>
              <span className="cursor-pointer hover:text-primary transition-colors">$100</span>
              <span className="cursor-pointer hover:text-primary transition-colors">$250</span>
              <span className="cursor-pointer text-muted-foreground hover:text-white transition-colors"><Settings className="w-4 h-4" /></span>
            </div>
            <Button className="w-full h-12 bg-primary text-black hover:bg-primary/90 font-bold text-[15px] rounded-xl transition-all shadow-none">
              Connect wallet to trade
            </Button>
            <div className="text-center text-xs font-bold text-muted-foreground flex justify-center items-center gap-1.5 mt-1">
              <Settings className="w-3 h-3" /> 2% • Turbo
            </div>
          </div>

          {/* Box 2: Voice Chat */}
          <div className="bg-[#121212] border border-[#27272a] rounded-xl p-5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center"><Mic className="w-4 h-4 text-primary" /></div>
              <div>
                <div className="text-sm font-bold text-white">Voice chat</div>
                <div className="text-xs font-bold text-muted-foreground">Talk live with other $boob holders</div>
              </div>
            </div>
            <Button className="w-full h-12 bg-primary text-black hover:bg-primary/90 font-bold text-[15px] rounded-xl transition-colors">
              Join voice chat
            </Button>
            <div className="text-[11px] font-bold text-muted-foreground mt-1">Sign in to join the conversation.</div>
          </div>

          {/* Box 3: Top Callouts */}
          <div className="bg-[#121212] border border-[#27272a] rounded-xl overflow-hidden flex flex-col">
            <div className="p-4 flex items-center gap-2 bg-[#121212]">
              <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center"><AlignLeft className="w-3 h-3 text-primary" /></div>
              <h3 className="text-[15px] font-bold text-white">Top callouts</h3>
              <span className="text-[10px] bg-[#27272a] text-white px-2 py-0.5 rounded-full font-bold ml-1">7</span>
            </div>
            
            <div className="flex flex-col">
              {CALLOUTS.map((call, i) => (
                <div key={i} className="px-5 py-4 flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#18181b] border border-[#27272a] flex items-center justify-center text-[10px] font-bold text-muted-foreground mt-1 uppercase">
                    {call.name.substring(0,2)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <div className="text-[15px] font-bold text-white hover:underline cursor-pointer flex items-center gap-2">
                          {call.name} 
                          <span className="text-xs text-muted-foreground font-normal">{call.time}</span>
                        </div>
                        <div className="text-xs text-muted-foreground font-bold mt-0.5">called at {call.calledAt}</div>
                      </div>
                      <div className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs font-bold border border-primary/20 flex items-center justify-center">
                        {call.change}
                      </div>
                    </div>
                    {call.msg && (
                      <div className="text-[13px] text-white/90 mt-2 leading-relaxed">{call.msg}</div>
                    )}
                    <div className="mt-2 text-muted-foreground cursor-pointer hover:text-white flex justify-end">
                       <FileCode2 className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
