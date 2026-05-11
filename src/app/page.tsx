"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Activity, Zap, Shield, BarChart3, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

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

const FAKE_TRADES = [
  "🟢 0x7f4... bought 2.5 ETH of $AGS",
  "🔴 0x1a2... sold 0.8 ETH of $NEX",
  "🟢 0x9b8... bought 5.0 ETH of $NVA",
  "🚀 $QTY just hit 85% bonding curve!",
  "🟢 0x3c4... bought 1.2 ETH of $ZPT",
  "🔥 $AGS trending #1 on Base",
  "🔴 0x5e6... sold 3.1 ETH of $VGV",
  "🟢 0x8d9... bought 10.0 ETH of $EKO",
];

export default function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-background pb-20 overflow-hidden">
      
      {/* 1. HERO VIDEO SECTION */}
      <section className="relative w-full h-[70vh] min-h-[600px] flex items-center justify-center border-b border-border overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover filter brightness-150 contrast-125"
          >
            <source src="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4" type="video/mp4" />
          </video>
          {/* Fallback gradient if video fails */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl font-black font-mono tracking-tighter text-white mb-6 uppercase drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              The Next Evolution of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-primary animate-pulse">
                On-Chain Markets
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-mono max-w-2xl mx-auto mb-10">
              Launch, trade, and scale institutional-grade synthetic assets on Base. Lightning fast execution, automated liquidity, zero friction.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/create">
                <Button className="h-16 px-10 text-lg bg-primary text-black hover:bg-white font-mono font-bold tracking-widest uppercase rounded-none transition-all duration-300 shadow-[0_0_40px_rgba(212,175,55,0.4)] hover:shadow-[0_0_60px_rgba(255,255,255,0.6)] hover:scale-105">
                  Launch Token <Zap className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="#markets">
                <Button variant="outline" className="h-16 px-10 text-lg border-primary/50 text-white hover:bg-primary/10 font-mono font-bold tracking-widest uppercase rounded-none backdrop-blur-md transition-all hover:border-primary">
                  Explore Markets
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Floating Stats */}
        <motion.div 
          initial={{ opacity: 0, bottom: -50 }}
          animate={{ opacity: 1, bottom: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="absolute bottom-0 left-0 w-full bg-background/80 backdrop-blur-xl border-t border-border grid grid-cols-2 md:grid-cols-4 divide-x divide-border"
        >
          {[
            { label: "NETWORK TVL", value: "$42.5M" },
            { label: "24H VOLUME", value: "$12.1M" },
            { label: "ACTIVE MARKETS", value: "1,240" },
            { label: "SECURITY AUDITS", value: "100%" },
          ].map((stat, i) => (
            <div key={i} className="p-4 md:p-6 text-center hover:bg-primary/5 transition-colors cursor-default">
              <div className="text-xs font-mono font-bold tracking-wider text-muted-foreground mb-1">{stat.label}</div>
              <div className="text-xl md:text-2xl mono-num text-primary drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]">{stat.value}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* 2. LIVE TRADING MARQUEE */}
      <div className="w-full bg-primary/10 border-b border-primary/20 py-2 overflow-hidden flex relative z-20">
        <div className="absolute left-0 w-32 h-full bg-gradient-to-r from-background to-transparent z-10"></div>
        <div className="absolute right-0 w-32 h-full bg-gradient-to-l from-background to-transparent z-10"></div>
        <motion.div 
          className="flex whitespace-nowrap items-center gap-12 font-mono text-sm tracking-widest font-bold"
          animate={{ x: [0, -2000] }}
          transition={{ ease: "linear", duration: 30, repeat: Infinity }}
        >
          {[...FAKE_TRADES, ...FAKE_TRADES, ...FAKE_TRADES].map((trade, i) => (
            <span key={i} className={trade.includes("sold") ? "text-destructive" : "text-green-400"}>
              {trade}
            </span>
          ))}
        </motion.div>
      </div>

      <div className="container mx-auto px-4 mt-16" id="markets">
        
        {/* 3. TRENDING SECTION */}
        <div className="mb-16">
          <h2 className="text-2xl font-mono font-black tracking-widest text-white uppercase flex items-center gap-3 mb-8">
            <TrendingUp className="w-8 h-8 text-primary" /> Hot Right Now
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MARKETS_DATA.slice(0, 3).map((token, i) => (
              <motion.div
                key={token.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <Link href={`/token/${token.id}`}>
                  <div className="h-full border border-primary/30 bg-card p-6 relative overflow-hidden group shadow-[0_0_30px_rgba(0,255,255,0.02)] hover:shadow-[0_0_40px_rgba(212,175,55,0.15)] transition-all cursor-pointer">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/20 rounded-full blur-[80px] group-hover:opacity-100 opacity-50 transition-opacity pointer-events-none"></div>
                    
                    <div className="flex items-start justify-between relative z-10 mb-6">
                      <div className="w-24 h-24 relative shadow-[0_0_20px_rgba(0,0,0,0.5)] border border-border bg-background group-hover:border-primary/50 transition-colors">
                        <Image src={token.image} alt={token.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                      </div>
                      <div className="bg-primary/20 text-primary border border-primary/30 px-3 py-1 font-mono text-xs font-bold uppercase animate-pulse">
                        Trending #{i+1}
                      </div>
                    </div>
                    
                    <div className="relative z-10">
                      <h3 className="text-2xl font-black text-white mb-1 group-hover:text-primary transition-colors">{token.name}</h3>
                      <div className="text-muted-foreground font-mono mb-4 text-sm">${token.ticker}</div>
                      
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                        <div>
                          <div className="text-[10px] text-muted-foreground font-mono uppercase">Price</div>
                          <div className="font-mono text-green-400 text-lg">{token.price}</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-muted-foreground font-mono uppercase">24h Chg</div>
                          <div className="font-mono text-green-400 text-lg">{token.change}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 4. ALL MARKETS GRID */}
        <div>
          <h2 className="text-2xl font-mono font-black tracking-widest text-white uppercase flex items-center gap-3 mb-8">
            <Activity className="w-8 h-8 text-primary" /> Active Deployments
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {MARKETS_DATA.map((token, i) => (
              <motion.div
                key={token.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: (i % 4) * 0.1, duration: 0.4 }}
              >
                <Link href={`/token/${token.id}`}>
                  <div className="border border-border bg-card p-4 relative overflow-hidden group hover:border-primary/50 transition-all cursor-pointer h-full flex flex-col justify-between">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                    
                    <div className="flex items-center gap-4 relative z-10 mb-4">
                      <div className="w-12 h-12 relative border border-border bg-background shrink-0">
                        <Image src={token.image} alt={token.name} fill className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-white truncate group-hover:text-primary transition-colors">{token.name}</h3>
                        <div className="text-xs text-muted-foreground font-mono truncate">${token.ticker}</div>
                      </div>
                    </div>

                    <div className="space-y-4 relative z-10">
                      <div className="flex justify-between items-end">
                        <div>
                          <div className="text-[10px] text-muted-foreground font-mono uppercase">Market Cap</div>
                          <div className="font-mono text-white text-sm">{token.marketCap}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] text-muted-foreground font-mono uppercase">Price</div>
                          <div className={`font-mono text-sm ${token.change.startsWith('-') ? 'text-destructive' : 'text-green-400'}`}>
                            {token.price}
                          </div>
                        </div>
                      </div>

                      {token.status === "LIVE_DEX" ? (
                        <div className="w-full bg-green-500/10 border border-green-500/30 text-green-500 text-xs font-mono py-1.5 text-center font-bold">
                          TRADING LIVE ON DEX
                        </div>
                      ) : (
                        <div>
                          <div className="flex justify-between text-[10px] font-mono mb-1">
                            <span className="text-muted-foreground">BONDING CURVE</span>
                            <span className="text-primary">{token.progress}%</span>
                          </div>
                          <Progress value={token.progress} className="h-1 bg-secondary" />
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
