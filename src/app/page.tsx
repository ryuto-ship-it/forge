"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Flame, Settings, Zap, ArrowRight, PlaySquare } from "lucide-react";

const CHARITY_COINS = [
  { ticker: "boob", name: "boob", mcap: "$6.70M", change: "+0.0%", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&q=80", color: "text-pink-500" },
  { ticker: "Punch", name: "パンチ", mcap: "$3.02M", change: "+0.1%", image: "https://images.unsplash.com/photo-1546527868-0e47c15af8a4?w=100&q=80", color: "text-red-500" },
  { ticker: "Apple", name: "Apple", mcap: "$261K", change: "-2.3%", image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6faa6?w=100&q=80", color: "text-red-400" },
  { ticker: "Wish", name: "Make A Wish", mcap: "$250K", change: "-", image: "https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?w=100&q=80", color: "text-blue-400" },
  { ticker: "pngu", name: "PENGU", mcap: "$208K", change: "-", image: "https://images.unsplash.com/photo-1598439210625-5067c578f3f6?w=100&q=80", color: "text-blue-200" },
];

const TRENDING_COINS = [
  { id: "t1", name: "GoblinCoin Goblin", ticker: "GoblinCoin", mcap: "$20.6M", desc: "Sam Altman wants to name the next OpenAI model 'Goblin'", image: "https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?w=600&q=80" },
  { id: "t2", name: "TROLL Troll", ticker: "TROLL", mcap: "$117M", desc: "Bears Get Trolled After $120M Market Cap Rally", image: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=600&q=80" },
  { id: "t3", name: "Hantavirus HANTA", ticker: "Hantavirus", mcap: "$3.31M", desc: "Is Lockdown 2.0 Loading?", image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=600&q=80" },
  { id: "t4", name: "boob boob", ticker: "boob", mcap: "$6.70M", desc: "Boob Connects Simple Meme to a Real-World Cause", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80" },
];

// Generate 24 mock items for the massive grid
const EXPLORE_COINS = Array.from({ length: 24 }).map((_, i) => {
  const isLive = Math.random() > 0.7;
  return {
    id: `e${i}`,
    name: `MemeCoin ${i}`,
    ticker: `MEME${i}`,
    marketCap: `$${(Math.random() * 500).toFixed(1)}K`,
    creator: `0x${Math.floor(Math.random()*10000).toString(16)}`,
    time: `${Math.floor(Math.random() * 59) + 1}m ago`,
    progress: isLive ? 100 : Math.floor(Math.random() * 95) + 1,
    image: `https://picsum.photos/seed/${i + 100}/300/300`, // Random images
  };
});

export default function Home() {
  return (
    <div className="flex flex-col w-full pb-20 gap-8">
      
      {/* Charity Coins Banner */}
      <div className="w-full">
        <div className="flex items-center justify-between mb-3">
          <h2 className="flex items-center gap-2 font-bold text-white"><Heart className="w-4 h-4 text-pink-500" fill="currentColor" /> Charity coins</h2>
          <Button variant="ghost" className="text-xs text-muted-foreground hover:text-white uppercase font-bold tracking-widest">VIEW ALL &gt;</Button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {CHARITY_COINS.map((coin, i) => (
            <div key={i} className="flex-shrink-0 flex items-center gap-3 bg-secondary/30 hover:bg-secondary/50 transition-colors border border-border rounded-xl p-2 px-4 cursor-pointer min-w-[200px]">
              <span className="text-xs text-muted-foreground font-mono">{i + 1}</span>
              <div className="w-8 h-8 rounded-full bg-background overflow-hidden relative border border-border">
                <Image src={coin.image} alt={coin.name} fill className="object-cover" />
                <Heart className={`absolute bottom-0 right-0 w-3 h-3 ${coin.color}`} fill="currentColor" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1"><span className="font-bold text-white text-sm">${coin.ticker}</span></div>
                <div className="text-[10px] text-muted-foreground">{coin.name}</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-white text-sm">{coin.mcap}</div>
                <div className={`text-[10px] font-bold ${coin.change.startsWith('+') ? 'text-primary' : 'text-red-400'}`}>{coin.change}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Now */}
      <div className="w-full">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-white text-lg">Trending now</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="w-8 h-8 rounded-full border-border bg-transparent hover:bg-secondary">&lt;</Button>
            <Button variant="outline" size="icon" className="w-8 h-8 rounded-full border-border bg-transparent hover:bg-secondary">&gt;</Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {TRENDING_COINS.map((coin) => (
            <Link key={coin.id} href={`/token/${coin.id}`}>
              <div className="group cursor-pointer">
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-2 border border-border group-hover:border-primary/50 transition-colors">
                  <Image src={coin.image} alt={coin.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="font-bold text-white text-xl mb-0.5">{coin.mcap}</div>
                    <div className="text-sm font-bold text-white/90 truncate">{coin.name}</div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">{coin.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Explore Coins */}
      <div className="w-full">
        <h2 className="font-bold text-white text-lg mb-3">Explore coins</h2>
        
        {/* Filters */}
        <div className="flex items-center justify-between gap-4 mb-4 overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex items-center gap-2">
            <Button className="h-9 bg-primary/20 text-primary hover:bg-primary/30 rounded-lg font-bold text-xs"><Zap className="w-3 h-3 mr-1" fill="currentColor"/> Movers</Button>
            <Button variant="ghost" className="h-9 text-muted-foreground hover:text-white rounded-lg font-bold text-xs"><Heart className="w-3 h-3 mr-1 text-pink-500" fill="currentColor"/> Charities</Button>
            <Button variant="ghost" className="h-9 text-muted-foreground hover:text-white rounded-lg font-bold text-xs"><Flame className="w-3 h-3 mr-1 text-orange-500" fill="currentColor"/> Mayhem</Button>
            <Button variant="ghost" className="h-9 text-muted-foreground hover:text-white rounded-lg font-bold text-xs">Live</Button>
            <Button variant="ghost" className="h-9 text-muted-foreground hover:text-white rounded-lg font-bold text-xs text-green-400">🌱 New</Button>
            <Button variant="ghost" className="h-9 text-muted-foreground hover:text-white rounded-lg font-bold text-xs">💰 Market cap</Button>
            <Button variant="ghost" className="h-9 text-muted-foreground hover:text-white rounded-lg font-bold text-xs">🤖 Agents</Button>
            <Button variant="ghost" className="h-9 text-muted-foreground hover:text-white rounded-lg font-bold text-xs">🪐 Oldest</Button>
            <Button variant="ghost" className="h-9 text-muted-foreground hover:text-white rounded-lg font-bold text-xs">💥 Last trade</Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="w-9 h-9 rounded-lg border-border bg-transparent"><Zap className="w-4 h-4" /></Button>
            <Button variant="outline" size="icon" className="w-9 h-9 rounded-lg border-border bg-transparent"><Settings className="w-4 h-4" /></Button>
          </div>
        </div>

        {/* Massive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {EXPLORE_COINS.map((token, i) => (
            <motion.div
              key={token.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.02 }}
              className="group"
            >
              <Link href={`/token/${token.id}`}>
                <div className="bg-card rounded-2xl overflow-hidden cursor-pointer hover:bg-secondary/50 transition-all border border-border hover:border-primary/50 flex flex-col h-full">
                  
                  {/* Image */}
                  <div className="w-full aspect-square relative bg-secondary overflow-hidden">
                    <Image src={token.image} alt={token.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    {token.progress === 100 && (
                      <div className="absolute top-2 right-2 bg-primary text-black text-[9px] font-bold px-2 py-0.5 rounded-full shadow-lg">
                        DEX
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="p-3 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-white text-sm truncate pr-2 group-hover:text-primary transition-colors">${token.ticker}</h3>
                      <span className="text-[10px] text-muted-foreground whitespace-nowrap">{token.time}</span>
                    </div>
                    
                    <div className="text-[10px] text-muted-foreground mb-2">By {token.creator}</div>
                    
                    <div className="mt-auto">
                      <div className="flex justify-between items-end mb-1">
                        <span className="text-[10px] font-bold text-muted-foreground">MCAP</span>
                        <span className="text-xs font-mono font-bold text-primary">{token.marketCap}</span>
                      </div>
                      
                      {token.progress < 100 && (
                        <div className="w-full h-1 bg-background rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: `${token.progress}%` }}></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
}
