"use client";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Copy, Terminal, ShieldAlert, FileCode2, Wallet, Layers, ArrowRightLeft, Activity } from "lucide-react";
import { useState } from "react";

export default function TokenPage() {
  const params = useParams();
  const id = params.id as string;
  const [tradeMode, setTradeMode] = useState<"buy" | "sell">("buy");
  const [amount, setAmount] = useState("");

  return (
    <div className="w-full flex flex-col gap-4 mt-4">
      {/* Top Header Bar */}
      <div className="border border-border bg-card p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-secondary border border-border flex items-center justify-center font-mono text-sm font-bold text-muted-foreground">
            AGS
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-mono font-bold text-white uppercase tracking-wider">Aegis Protocol</h1>
              <span className="text-[10px] font-mono text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 font-bold tracking-wider">AGS/ETH</span>
            </div>
            <div className="flex items-center gap-3 mt-1 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
              <span className="flex items-center gap-1 hover:text-white cursor-pointer transition-colors"><FileCode2 className="w-3 h-3" /> 0x8f...3a2b</span>
              <span>|</span>
              <span className="flex items-center gap-1 hover:text-white cursor-pointer transition-colors"><Wallet className="w-3 h-3" /> Creator: 0x4a...9b1c</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-mono font-bold tracking-wider text-muted-foreground uppercase mb-1">Last Price</span>
            <span className="text-lg font-mono font-bold text-green-500">0.00001240 ETH</span>
          </div>
          <div className="flex flex-col items-end hidden sm:flex">
            <span className="text-[10px] font-mono font-bold tracking-wider text-muted-foreground uppercase mb-1">24h Change</span>
            <span className="text-sm font-mono font-bold text-green-500 bg-green-500/10 px-2 py-0.5 border border-green-500/20">+12.4%</span>
          </div>
          <div className="flex flex-col items-end hidden md:flex">
            <span className="text-[10px] font-mono font-bold tracking-wider text-muted-foreground uppercase mb-1">24h Volume</span>
            <span className="text-sm font-mono text-white font-bold">412.5 ETH</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Center - Chart & Order Book */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          
          {/* Chart */}
          <div className="border border-border bg-card flex flex-col h-[500px]">
            <div className="p-2 border-b border-border flex items-center justify-between bg-secondary/50">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary ml-2" />
                <span className="text-[10px] font-mono font-bold tracking-widest text-white uppercase">Market Chart Data</span>
              </div>
              <div className="flex gap-1">
                {["1m", "5m", "15m", "1H", "4H", "1D"].map((tf) => (
                  <Button key={tf} variant="ghost" className={`h-6 text-[10px] font-mono rounded-none px-3 border border-transparent ${tf === "15m" ? "text-primary bg-primary/10 border-primary/20" : "text-muted-foreground hover:bg-secondary hover:text-white"}`}>
                    {tf}
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex-1 relative overflow-hidden bg-[#09090b]">
              {/* Grid Lines */}
              <div className="absolute inset-0" style={{backgroundImage: "linear-gradient(to right, #18181b 1px, transparent 1px), linear-gradient(to bottom, #18181b 1px, transparent 1px)", backgroundSize: "40px 40px"}}></div>
              {/* Mock Candlestick Chart SVG */}
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 300">
                <g strokeWidth="1.5">
                  {/* Candlesticks mock */}
                  {[...Array(50)].map((_, i) => {
                    const isGreen = Math.random() > 0.45;
                    const color = isGreen ? "#22c55e" : "#ef4444";
                    const x = i * 20 + 10;
                    const y1 = Math.random() * 150 + 50;
                    const y2 = y1 + Math.random() * 80 + 20;
                    const cy1 = y1 + Math.random() * 15;
                    const cy2 = y2 - Math.random() * 15;
                    return (
                      <g key={i}>
                        <line x1={x} y1={y1} x2={x} y2={y2} stroke={color} strokeOpacity={0.4} />
                        <rect x={x - 3} y={cy1} width="6" height={cy2 - cy1} fill={color} />
                      </g>
                    );
                  })}
                </g>
              </svg>
              <div className="absolute top-4 left-4 text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground/50">Terminal Chart Connected</div>
            </div>
          </div>

          {/* Bonding Curve & Data */}
          <div className="border border-border bg-card p-6">
            <h3 className="text-xs font-mono font-bold tracking-widest text-white mb-6 uppercase flex items-center gap-2">
              <Layers className="w-4 h-4 text-primary" /> Liquidity Pool Status
            </h3>
            
            <div className="space-y-4 bg-background border border-border p-4">
              <div className="flex justify-between text-[10px] font-mono font-bold tracking-wider">
                <span className="text-muted-foreground uppercase">Bonding Curve Progress</span>
                <span className="text-primary">85.00%</span>
              </div>
              <Progress value={85} className="h-2 bg-secondary rounded-none" />
              <div className="flex justify-between text-[10px] font-mono text-muted-foreground font-bold tracking-wider">
                <span>0 ETH</span>
                <span>TARGET: 20 ETH</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="border border-border bg-background p-3">
                <div className="text-[10px] font-mono font-bold tracking-wider text-muted-foreground uppercase mb-2">Security Score</div>
                <div className="font-mono text-primary font-bold flex items-center gap-1 text-sm"><ShieldAlert className="w-4 h-4"/> 98/100</div>
              </div>
              <div className="border border-border bg-background p-3">
                <div className="text-[10px] font-mono font-bold tracking-wider text-muted-foreground uppercase mb-2">Holders</div>
                <div className="font-mono text-white font-bold text-sm">3,421</div>
              </div>
              <div className="border border-border bg-background p-3">
                <div className="text-[10px] font-mono font-bold tracking-wider text-muted-foreground uppercase mb-2">Dev Allocation</div>
                <div className="font-mono text-white font-bold text-sm">0.00%</div>
              </div>
              <div className="border border-border bg-background p-3">
                <div className="text-[10px] font-mono font-bold tracking-wider text-muted-foreground uppercase mb-2">Supply Burned</div>
                <div className="font-mono text-white font-bold text-sm">12.4%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Execution Panel */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="border border-border bg-card flex flex-col h-full sticky top-20">
            <div className="flex bg-background border-b border-border">
              <button 
                className={`flex-1 py-4 text-xs font-mono font-bold tracking-widest uppercase transition-none border-b-2 ${tradeMode === "buy" ? "text-primary border-primary bg-primary/5" : "text-muted-foreground border-transparent hover:bg-secondary/50"}`}
                onClick={() => setTradeMode("buy")}
              >
                Buy AGS
              </button>
              <button 
                className={`flex-1 py-4 text-xs font-mono font-bold tracking-widest uppercase transition-none border-b-2 ${tradeMode === "sell" ? "text-destructive border-destructive bg-destructive/5" : "text-muted-foreground border-transparent hover:bg-secondary/50"}`}
                onClick={() => setTradeMode("sell")}
              >
                Sell AGS
              </button>
            </div>
            
            <div className="p-6 flex flex-col gap-6">
              {/* Order Type */}
              <div className="flex gap-2">
                <Button variant="secondary" className="flex-1 h-8 text-[10px] font-mono font-bold tracking-wider rounded-none bg-secondary text-white border border-border">MARKET</Button>
                <Button variant="ghost" className="flex-1 h-8 text-[10px] font-mono font-bold tracking-wider rounded-none text-muted-foreground border border-transparent hover:border-border hover:bg-background">LIMIT</Button>
                <Button variant="ghost" className="flex-1 h-8 text-[10px] font-mono font-bold tracking-wider rounded-none text-muted-foreground border border-transparent hover:border-border hover:bg-background">TWAP</Button>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-mono font-bold tracking-wider uppercase text-muted-foreground">
                  <span>Order Size ({tradeMode === "buy" ? "ETH" : "AGS"})</span>
                  <span className="cursor-pointer hover:text-white transition-colors">Avail: 0.0000</span>
                </div>
                <div className="relative">
                  <Input 
                    type="number" 
                    placeholder="0.00" 
                    className="h-12 bg-background border-border text-white font-mono rounded-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary transition-none pl-4 pr-16 text-lg"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-muted-foreground">
                    {tradeMode === "buy" ? "ETH" : "AGS"}
                  </span>
                </div>
              </div>

              <div className="flex justify-center -my-3 relative z-10">
                <div className="bg-background border border-border p-1.5 text-muted-foreground rounded-none">
                  <ArrowRightLeft className="w-3 h-3 rotate-90" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-mono font-bold tracking-wider uppercase text-muted-foreground">
                  <span>Estimated Receive</span>
                </div>
                <div className="relative">
                  <Input 
                    type="text" 
                    readOnly
                    className="h-12 bg-secondary/30 border-border text-muted-foreground font-mono rounded-none transition-none pl-4 pr-16 text-lg"
                    value={amount ? (tradeMode === "buy" ? Number(amount) * 80645 : Number(amount) / 80645).toFixed(4) : "0.00"}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-muted-foreground">
                    {tradeMode === "buy" ? "AGS" : "ETH"}
                  </span>
                </div>
              </div>

              {/* Slippage & Info */}
              <div className="bg-background border border-border p-4 space-y-3 mt-2">
                <div className="flex justify-between text-[10px] font-mono font-bold tracking-wider text-muted-foreground">
                  <span className="uppercase">Est. Execution Price</span>
                  <span className="text-white">0.00001240 ETH</span>
                </div>
                <div className="flex justify-between text-[10px] font-mono font-bold tracking-wider text-muted-foreground">
                  <span className="uppercase">Price Impact</span>
                  <span className="text-primary">&lt; 0.01%</span>
                </div>
                <div className="flex justify-between text-[10px] font-mono font-bold tracking-wider text-muted-foreground">
                  <span className="uppercase">Max Slippage</span>
                  <span className="text-white border-b border-dashed border-muted-foreground cursor-pointer">0.5%</span>
                </div>
              </div>

              <Button className={`w-full h-14 text-sm font-mono tracking-widest font-bold uppercase rounded-none mt-2 transition-none shadow-none ${tradeMode === "buy" ? "bg-primary hover:bg-green-400 text-black" : "bg-destructive hover:bg-destructive/90 text-white"}`}>
                {tradeMode === "buy" ? "Execute Buy Order" : "Execute Sell Order"}
              </Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
