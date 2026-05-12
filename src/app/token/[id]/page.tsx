"use client";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Copy, Terminal, ShieldAlert, FileCode2, Wallet, Layers, ArrowRightLeft, Activity, MessageCircle, Mic, ArrowUpRight, ArrowDownRight, MoreHorizontal, Settings } from "lucide-react";
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
  { name: "9o2F...twBf", time: "4 days ago", calledAt: "$4.59M", change: "+40%", msg: "hey4" },
  { name: "4a3Y...pGfj", time: "1 day ago", calledAt: "$4.88M", change: "+40%", msg: "" },
  { name: "Dxv3...yVUK", time: "11 days ago", calledAt: "$5.11M", change: "+20%", msg: "If autism hit 25 mil i will eat 3500 mc nuggets live on stream" },
  { name: "9qCp...iFCp", time: "about 1 month ago", calledAt: "$2.92M", change: "2.1x", msg: "" }
];

export default function TokenPage() {
  const params = useParams();
  const id = params.id as string;
  const [tradeMode, setTradeMode] = useState<"buy" | "sell">("buy");
  const [amount, setAmount] = useState("");

  return (
    <div className="w-full">
      
      {/* Top Breadcrumb / Stats Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground font-bold">
          <span className="hover:text-white cursor-pointer transition-colors">Search for coins...</span>
          <span>/</span>
          <span className="text-white">Red Kitten Crew</span>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase font-bold text-muted-foreground">Market Cap</span>
            <span className="text-lg font-bold text-primary">$6.63M</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase font-bold text-muted-foreground">24h Vol</span>
            <span className="text-lg font-bold text-white">216.67K</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: Chart, About, Trades */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Chart Header (TradingView Style) */}
          <div className="border border-border bg-card rounded-2xl flex flex-col overflow-hidden">
            <div className="p-2 border-b border-border flex items-center justify-between bg-background/50">
              <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground">
                <span className="text-white cursor-pointer">24h</span>
                <span className="cursor-pointer hover:text-white">Trade Display</span>
                <span className="cursor-pointer hover:text-white">Hide All Bubbles</span>
                <span className="text-primary cursor-pointer">Price/MCap</span>
                <span className="text-primary cursor-pointer">USD/ETH</span>
              </div>
            </div>
            
            <div className="flex-1 relative h-[450px] bg-[#121212] flex">
              {/* Left Toolbar Mock */}
              <div className="w-10 border-r border-border flex flex-col items-center py-2 gap-4 text-muted-foreground">
                <div className="cursor-pointer hover:text-white"><Activity className="w-4 h-4"/></div>
                <div className="cursor-pointer hover:text-white"><ArrowUpRight className="w-4 h-4"/></div>
                <div className="cursor-pointer hover:text-white"><Terminal className="w-4 h-4"/></div>
              </div>
              
              <div className="flex-1 relative">
                {/* Grid Lines */}
                <div className="absolute inset-0" style={{backgroundImage: "linear-gradient(to right, #18181b 1px, transparent 1px), linear-gradient(to bottom, #18181b 1px, transparent 1px)", backgroundSize: "60px 40px"}}></div>
                
                {/* Chart Mock */}
                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 300">
                  <g strokeWidth="2">
                    {[...Array(60)].map((_, i) => {
                      // Simulating an uptrend
                      const isGreen = Math.random() > 0.3 || i > 40;
                      const color = isGreen ? "#4ade80" : "#ef4444";
                      const x = i * 16 + 10;
                      const base = 250 - (i * 2); 
                      const y1 = base - Math.random() * 80;
                      const y2 = y1 + Math.random() * 60 + 10;
                      const cy1 = y1 + Math.random() * 10;
                      const cy2 = y2 - Math.random() * 10;
                      return (
                        <g key={i}>
                          <line x1={x} y1={y1} x2={x} y2={y2} stroke={color} strokeOpacity={0.8} />
                          <rect x={x - 3} y={cy1} width="6" height={Math.max(1, cy2 - cy1)} fill={color} />
                        </g>
                      );
                    })}
                  </g>
                </svg>

                {/* Callout Bubbles Mock */}
                <div className="absolute top-20 right-40 w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500 flex items-center justify-center text-[10px] text-purple-400 font-bold">C</div>
                <div className="absolute top-40 right-60 w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500 flex items-center justify-center text-[10px] text-purple-400 font-bold">C</div>
                <div className="absolute top-32 left-40 w-6 h-6 rounded-full bg-primary/20 border border-primary flex items-center justify-center text-[10px] text-primary font-bold">DB</div>
              </div>
            </div>
            
            {/* Chart Footer Toolabr */}
            <div className="p-2 border-t border-border flex items-center justify-between bg-background/50 text-[10px] font-bold text-muted-foreground">
              <div className="flex gap-4">
                <span className="cursor-pointer hover:text-white">1D</span>
                <span className="cursor-pointer hover:text-white">5D</span>
                <span className="text-white cursor-pointer">1M</span>
              </div>
              <div className="flex gap-4">
                <span>04:24:06 UTC</span>
                <span className="text-blue-400 cursor-pointer">%</span>
                <span className="text-blue-400 cursor-pointer">log</span>
                <span className="text-blue-400 cursor-pointer">auto</span>
              </div>
            </div>
          </div>

          {/* About & Filter Section */}
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 items-center">
              <div className="text-sm font-bold text-white bg-card border border-border px-3 py-1.5 rounded-full flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                Filter by size
              </div>
              <Input className="w-24 h-8 rounded-full bg-card text-xs font-mono" placeholder="0.05" />
              <span className="text-xs text-muted-foreground font-bold">(showing trades greater than 0.05 ETH)</span>
            </div>
          </div>

          {/* Trades Table */}
          <div className="border border-border bg-card rounded-2xl overflow-hidden">
            <div className="grid grid-cols-6 gap-4 p-4 border-b border-border text-xs font-bold text-muted-foreground">
              <div className="col-span-2">Account</div>
              <div>Type</div>
              <div>Amount (ETH)</div>
              <div>Amount (RKC)</div>
              <div>Time</div>
              <div>Txn</div>
            </div>
            
            <div className="flex flex-col">
              {TRADES.map((trade, i) => (
                <div key={trade.id} className={`grid grid-cols-6 gap-4 p-3 items-center text-sm font-bold border-b border-border/50 hover:bg-secondary/30 transition-colors ${i % 2 === 0 ? "bg-background/20" : ""}`}>
                  <div className="col-span-2 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-secondary overflow-hidden border border-border">
                      <Image src={trade.avatar} alt="avatar" width={24} height={24} className="object-cover"/>
                    </div>
                    <span className="text-white hover:underline cursor-pointer">{trade.account}</span>
                  </div>
                  <div className={trade.type === "Buy" ? "text-primary" : "text-destructive"}>{trade.type}</div>
                  <div className="text-white">{trade.sol}</div>
                  <div className="text-white">{trade.token}</div>
                  <div className="text-muted-foreground text-xs">{trade.time}</div>
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
          
          {/* Quick Connect Panel */}
          <div className="border border-border bg-card rounded-2xl p-4 flex flex-col gap-4">
            <div className="flex justify-between text-sm font-bold text-white px-4">
              <span className="cursor-pointer hover:text-primary">$25</span>
              <span className="cursor-pointer hover:text-primary">$100</span>
              <span className="cursor-pointer hover:text-primary">$250</span>
              <span className="cursor-pointer text-muted-foreground"><Settings className="w-4 h-4" /></span>
            </div>
            <Button className="w-full h-14 bg-primary text-black hover:bg-green-400 font-bold text-base rounded-xl transition-transform active:scale-95 shadow-[0_0_15px_rgba(74,222,128,0.2)]">
              Connect wallet to trade
            </Button>
            <div className="text-center text-xs font-bold text-muted-foreground flex justify-center items-center gap-1">
              <Settings className="w-3 h-3" /> 2% • Turbo
            </div>
          </div>

          {/* Voice Chat */}
          <div className="border border-border bg-card rounded-2xl p-4 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center"><Mic className="w-4 h-4 text-primary" /></div>
              <div>
                <div className="text-sm font-bold text-white">Voice chat</div>
                <div className="text-[10px] font-bold text-muted-foreground">Talk live with other $RKC holders</div>
              </div>
            </div>
            <Button className="w-full h-10 bg-primary/20 text-primary hover:bg-primary/30 font-bold rounded-xl text-sm transition-colors">
              Join voice chat
            </Button>
            <div className="text-center text-[10px] font-bold text-muted-foreground">Sign in to join the conversation.</div>
          </div>

          {/* Top Callouts */}
          <div className="border border-border bg-card rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-border flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center"><MessageCircle className="w-3 h-3 text-primary" /></div>
              <h3 className="text-sm font-bold text-white">Top callouts</h3>
              <span className="text-xs bg-secondary text-muted-foreground px-2 py-0.5 rounded-full font-bold ml-1">7</span>
            </div>
            
            <div className="flex flex-col">
              {CALLOUTS.map((call, i) => (
                <div key={i} className="p-4 border-b border-border/50 hover:bg-secondary/30 transition-colors flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center text-[10px] font-bold text-white mt-1">
                    {call.name.substring(0,2)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <div className="text-sm font-bold text-white hover:underline cursor-pointer">{call.name} <span className="text-xs text-muted-foreground font-normal ml-1">{call.time}</span></div>
                        <div className="text-xs text-muted-foreground font-bold">called at {call.calledAt}</div>
                      </div>
                      <div className="bg-primary/20 text-primary px-2 py-0.5 rounded-full text-xs font-bold border border-primary/30">
                        {call.change}
                      </div>
                    </div>
                    {call.msg && (
                      <div className="text-sm text-white/90 mt-2">{call.msg}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bonding Curve Progress */}
          <div className="border border-border bg-card rounded-2xl p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-bold text-white">Bonding curve progress</h3>
              <span className="text-primary font-bold text-sm">100.0%</span>
            </div>
            <Progress value={100} className="h-2 bg-secondary rounded-full [&>div]:bg-primary mb-2" />
            <p className="text-xs text-muted-foreground font-bold">Coin has graduated!</p>
          </div>

          {/* Text Chat */}
          <div className="border border-border bg-card rounded-2xl p-4 flex items-center justify-between cursor-pointer hover:bg-secondary/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500 flex items-center justify-center"><MessageCircle className="w-5 h-5 text-purple-400" /></div>
              <div>
                <div className="text-sm font-bold text-white">RKC chat</div>
                <div className="text-xs font-bold text-muted-foreground">52 members</div>
              </div>
            </div>
            <Button variant="secondary" className="rounded-xl font-bold h-9">Join chat</Button>
          </div>

        </div>

      </div>
    </div>
  );
}
