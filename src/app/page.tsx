"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Activity, Zap, ShieldAlert, BarChart3, TrendingUp, Layers } from "lucide-react";

const MARKETS_DATA = [
  { id: "1", name: "Aegis Protocol", ticker: "AGS", marketCap: "$12.4M", volume: "$3.1M", price: "$0.1240", change: "+12.4%", progress: 100, status: "LIVE_DEX", image: "/tokens/aegis.png" },
  { id: "2", name: "Nexus Compute", ticker: "NEX", marketCap: "$8.2M", volume: "$1.4M", price: "$0.0820", change: "+5.2%", progress: 100, status: "LIVE_DEX", image: "/tokens/nexus.png" },
  { id: "3", name: "Quantis Yield", ticker: "QTY", marketCap: "$890K", volume: "$240K", price: "$0.0089", change: "+18.1%", progress: 85, status: "BONDING", image: "/tokens/quantis.png" },
  { id: "4", name: "Vanguard Vault", ticker: "VGV", marketCap: "$450K", volume: "$120K", price: "$0.0045", change: "+2.4%", progress: 42, status: "BONDING", image: "/tokens/vanguard.png" },
  { id: "5", name: "Vertex Liquidity", ticker: "VTX", marketCap: "$150K", volume: "$45K", price: "$0.0015", change: "-1.2%", progress: 12, status: "BONDING", image: "/tokens/vertex.png" },
  { id: "6", name: "Cipher Core", ticker: "CPH", marketCap: "$56K", volume: "$12K", price: "$0.0005", change: "+4.1%", progress: 5, status: "BONDING", image: "/tokens/cipher.png" },
  { id: "7", name: "Nova Syndicate", ticker: "NVA", marketCap: "$2.1M", volume: "$890K", price: "$0.0210", change: "+45.2%", progress: 100, status: "LIVE_DEX", image: "/tokens/nova.png" },
  { id: "8", name: "Zenith Prime", ticker: "ZPT", marketCap: "$780K", volume: "$320K", price: "$0.0078", change: "+22.4%", progress: 78, status: "BONDING", image: "/tokens/zenith.png" },
  { id: "9", name: "Aether Node", ticker: "AET", marketCap: "$340K", volume: "$95K", price: "$0.0034", change: "+8.9%", progress: 34, status: "BONDING", image: "/tokens/aether.png" },
  { id: "10", name: "Catalyst Finance", ticker: "CAT", marketCap: "$110K", volume: "$25K", price: "$0.0011", change: "-5.4%", progress: 11, status: "BONDING", image: "/tokens/catalyst.png" },
  { id: "11", name: "Solstice", ticker: "SOLS", marketCap: "$45K", volume: "$8K", price: "$0.0004", change: "+1.2%", progress: 4, status: "BONDING", image: "/tokens/solstice.png" },
  { id: "12", name: "Echo Protocol", ticker: "EKO", marketCap: "$12K", volume: "$2K", price: "$0.0001", change: "+50.1%", progress: 1, status: "BONDING", image: "/tokens/echo.png" },
];

export default function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-background pb-20">
      
      {/* 1. HERO INSTITUTIONAL TERMINAL */}
      <section className="w-full flex items-center border-b border-border bg-card p-8 md:p-12 mt-4 relative overflow-hidden">
        {/* Terminal Grid Background */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{backgroundImage: "linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)", backgroundSize: "20px 20px"}}></div>

        <div className="relative z-10 w-full flex flex-col items-start max-w-5xl">
          <div className="flex items-center gap-2 mb-4 text-xs font-mono font-bold text-muted-foreground tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Systems Operational | Base L2
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black font-sans tracking-tight text-white mb-4 uppercase">
            Institutional <span className="text-primary">Liquidity</span> <br /> Terminal
          </h1>
          
          <p className="text-sm text-muted-foreground font-mono max-w-2xl mb-8 leading-relaxed">
            Execute high-frequency token deployments and liquidity provisioning on the Base network. Fully automated bonding curves and immediate DEX transitions. Unrivaled execution for the on-chain economy.
          </p>
          
          <div className="flex gap-4">
            <Link href="/create">
              <Button className="h-12 px-8 text-sm bg-primary text-black hover:bg-green-400 font-mono font-bold tracking-widest uppercase rounded-none transition-none shadow-none">
                Deploy Asset <Zap className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="#markets">
              <Button variant="outline" className="h-12 px-8 text-sm border-border bg-background text-white hover:bg-secondary font-mono font-bold tracking-widest uppercase rounded-none transition-none shadow-none">
                View Markets
              </Button>
            </Link>
          </div>
        </div>

        {/* Terminal Data Side Panel */}
        <div className="hidden lg:flex flex-col gap-4 absolute right-12 top-12 z-10 w-64">
          <div className="border border-border bg-background p-4">
            <div className="text-[10px] font-mono text-muted-foreground uppercase mb-1">Network TVL</div>
            <div className="text-xl font-mono text-primary font-bold">$42.5M</div>
          </div>
          <div className="border border-border bg-background p-4">
            <div className="text-[10px] font-mono text-muted-foreground uppercase mb-1">24H Volume</div>
            <div className="text-xl font-mono text-white font-bold">$12.1M</div>
          </div>
          <div className="border border-border bg-background p-4">
            <div className="text-[10px] font-mono text-muted-foreground uppercase mb-1">Active Markets</div>
            <div className="text-xl font-mono text-white font-bold">1,240</div>
          </div>
        </div>
      </section>

      {/* 2. LIVE TRADES FEED */}
      <div className="w-full border-b border-border bg-background flex text-[10px] font-mono tracking-widest uppercase text-muted-foreground divide-x divide-border overflow-x-auto whitespace-nowrap">
        <div className="px-4 py-2 bg-secondary text-white font-bold flex items-center gap-2">
          <Activity className="w-3 h-3 text-primary" /> Live Trades
        </div>
        <div className="px-4 py-2 flex items-center gap-2"><span className="text-green-500">BUY</span> 0x7f4... 2.5 ETH $AGS</div>
        <div className="px-4 py-2 flex items-center gap-2"><span className="text-destructive">SELL</span> 0x1a2... 0.8 ETH $NEX</div>
        <div className="px-4 py-2 flex items-center gap-2"><span className="text-green-500">BUY</span> 0x9b8... 5.0 ETH $NVA</div>
        <div className="px-4 py-2 flex items-center gap-2"><span className="text-primary">SYS</span> $QTY hit 85% curve</div>
        <div className="px-4 py-2 flex items-center gap-2"><span className="text-green-500">BUY</span> 0x3c4... 1.2 ETH $ZPT</div>
      </div>

      <div className="mt-8" id="markets">
        
        {/* 3. TRENDING DATA TABLE */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border">
            <TrendingUp className="w-5 h-5 text-primary" /> 
            <h2 className="text-sm font-mono font-bold tracking-widest text-white uppercase">Top Volume (24H)</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {MARKETS_DATA.slice(0, 3).map((token, i) => (
              <Link key={token.id} href={`/token/${token.id}`}>
                <div className="border border-border bg-card hover:border-primary/50 transition-none cursor-pointer flex flex-col group">
                  <div className="p-4 border-b border-border flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-secondary border border-border flex items-center justify-center font-mono text-[10px] text-muted-foreground overflow-hidden relative">
                        {token.image ? <Image src={token.image} alt={token.name} fill className="object-cover opacity-80 group-hover:opacity-100 grayscale group-hover:grayscale-0 transition-all" /> : token.ticker}
                      </div>
                      <div>
                        <h3 className="font-bold text-white uppercase tracking-wider text-sm">{token.name}</h3>
                        <div className="text-[10px] text-muted-foreground font-mono mt-0.5">{token.ticker}/ETH</div>
                      </div>
                    </div>
                    <div className="bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 font-mono text-[10px] font-bold uppercase">
                      RANK #{i+1}
                    </div>
                  </div>
                  <div className="p-4 grid grid-cols-2 gap-4 bg-background">
                    <div>
                      <div className="text-[10px] text-muted-foreground font-mono uppercase mb-1">Last Price</div>
                      <div className="font-mono text-white text-sm font-bold">{token.price}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-muted-foreground font-mono uppercase mb-1">24h Chg</div>
                      <div className={`font-mono text-sm font-bold ${token.change.startsWith('-') ? 'text-destructive' : 'text-green-500'}`}>{token.change}</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 4. ALL MARKETS PANEL */}
        <div>
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border">
            <Layers className="w-5 h-5 text-primary" /> 
            <h2 className="text-sm font-mono font-bold tracking-widest text-white uppercase">Market Overview</h2>
          </div>
          
          <div className="border border-border bg-card overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 p-3 bg-secondary border-b border-border text-[10px] font-mono text-muted-foreground uppercase font-bold tracking-wider">
              <div className="col-span-4">Asset</div>
              <div className="col-span-2 text-right">Price</div>
              <div className="col-span-2 text-right">24H Chg</div>
              <div className="col-span-2 text-right">Market Cap</div>
              <div className="col-span-2 text-right">Status</div>
            </div>
            
            {/* Table Rows */}
            <div className="divide-y divide-border">
              {MARKETS_DATA.map((token) => (
                <Link key={token.id} href={`/token/${token.id}`}>
                  <div className="grid grid-cols-12 gap-4 p-3 items-center hover:bg-secondary/50 transition-none cursor-pointer group">
                    <div className="col-span-4 flex items-center gap-3">
                      <div className="w-8 h-8 bg-background border border-border flex-shrink-0 relative overflow-hidden">
                        {token.image && <Image src={token.image} alt={token.name} fill className="object-cover opacity-70 group-hover:opacity-100 grayscale group-hover:grayscale-0" />}
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-white text-xs truncate group-hover:text-primary transition-colors">{token.name}</div>
                        <div className="text-[10px] text-muted-foreground font-mono truncate">{token.ticker}</div>
                      </div>
                    </div>
                    
                    <div className="col-span-2 text-right font-mono text-xs font-bold text-white">
                      {token.price}
                    </div>
                    
                    <div className={`col-span-2 text-right font-mono text-xs font-bold ${token.change.startsWith('-') ? 'text-destructive' : 'text-green-500'}`}>
                      {token.change}
                    </div>
                    
                    <div className="col-span-2 text-right font-mono text-xs text-muted-foreground">
                      {token.marketCap}
                    </div>
                    
                    <div className="col-span-2 flex justify-end">
                      {token.status === "LIVE_DEX" ? (
                        <span className="text-[10px] font-mono bg-green-500/10 text-green-500 border border-green-500/30 px-2 py-0.5">
                          DEX LIVE
                        </span>
                      ) : (
                        <div className="w-24 flex flex-col gap-1">
                          <div className="flex justify-between text-[8px] font-mono">
                            <span className="text-muted-foreground">BONDING</span>
                            <span className="text-primary">{token.progress}%</span>
                          </div>
                          <Progress value={token.progress} className="h-1 bg-background" />
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
