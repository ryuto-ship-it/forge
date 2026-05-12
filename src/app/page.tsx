"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const MARKETS_DATA = [
  { id: "1", name: "Red Kitten Crew", ticker: "RKC", marketCap: "$6.71M", creator: "1nc1ne", time: "6h ago", progress: 100, status: "LIVE", image: "/tokens/aegis.png" },
  { id: "2", name: "Based Pepe", ticker: "PEPE", marketCap: "$2.1M", creator: "0xFrog", time: "1h ago", progress: 45, status: "BONDING", image: "/tokens/nexus.png" },
  { id: "3", name: "Cat on Base", ticker: "COB", marketCap: "$890K", creator: "basecat", time: "12m ago", progress: 85, status: "BONDING", image: "/tokens/quantis.png" },
  { id: "4", name: "Degen Shiba", ticker: "DSHIB", marketCap: "$450K", creator: "shibarmy", time: "2h ago", progress: 42, status: "BONDING", image: "/tokens/vanguard.png" },
  { id: "5", name: "Alien Inu", ticker: "ALIEN", marketCap: "$150K", creator: "area51", time: "5m ago", progress: 12, status: "BONDING", image: "/tokens/vertex.png" },
  { id: "6", name: "Turbo Toad", ticker: "TOAD", marketCap: "$56K", creator: "ribbit", time: "1m ago", progress: 5, status: "BONDING", image: "/tokens/cipher.png" },
];

export default function Home() {
  return (
    <div className="flex flex-col w-full pb-20">
      
      {/* Search / Filters Bar (Pump.fun style) */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-white cursor-pointer bg-card px-4 py-2 rounded-xl transition-colors">
          <span>Sort: Market Cap</span>
        </div>
        <div className="flex items-center gap-2 text-sm font-bold text-white bg-secondary px-4 py-2 rounded-xl transition-colors cursor-pointer">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          Live
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MARKETS_DATA.map((token, i) => (
          <motion.div
            key={token.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -5, scale: 1.01 }}
            className="group"
          >
            <Link href={`/token/${token.id}`}>
              <div className="bg-card rounded-2xl p-4 cursor-pointer hover:bg-secondary/50 transition-all border border-transparent hover:border-primary/20 shadow-lg relative overflow-hidden">
                
                {/* Status Badge */}
                <div className="absolute top-4 right-4 z-10">
                  {token.progress === 100 ? (
                    <span className="text-[10px] font-bold bg-primary text-black px-2 py-1 rounded-full flex items-center gap-1 shadow-[0_0_10px_rgba(74,222,128,0.5)]">
                      DEX LIVE
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold bg-secondary/80 text-muted-foreground backdrop-blur-md px-2 py-1 rounded-full">
                      Bonding: {token.progress}%
                    </span>
                  )}
                </div>

                <div className="flex gap-4 items-start relative z-10">
                  {/* Token Image */}
                  <div className="w-16 h-16 rounded-xl bg-secondary flex-shrink-0 relative overflow-hidden group-hover:scale-105 transition-transform">
                    {token.image ? (
                      <Image src={token.image} alt={token.name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-bold text-muted-foreground">{token.ticker}</div>
                    )}
                  </div>
                  
                  {/* Token Info */}
                  <div className="flex-1 pt-1">
                    <h3 className="font-bold text-white text-lg leading-none mb-1 group-hover:text-primary transition-colors">{token.name}</h3>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                      <span className="text-white font-mono bg-secondary px-1.5 py-0.5 rounded-md">${token.ticker}</span>
                      <span>•</span>
                      <span>By <span className="hover:underline">{token.creator}</span></span>
                      <span>•</span>
                      <span>{token.time}</span>
                    </div>
                    
                    <div className="flex items-end justify-between">
                      <div>
                        <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mb-0.5">Market Cap</div>
                        <div className="text-white font-mono font-bold">{token.marketCap}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bonding Curve Progress */}
                {token.progress < 100 && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <Progress value={token.progress} className="h-1.5 bg-background [&>div]:bg-primary" />
                  </div>
                )}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

    </div>
  );
}
