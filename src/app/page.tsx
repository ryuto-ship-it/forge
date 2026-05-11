import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Activity, Zap, Shield, BarChart3, ChevronRight, Droplets } from "lucide-react";

const MARKETS_DATA = [
  {
    id: "1",
    name: "Aegis Protocol",
    ticker: "AGS",
    marketCap: "$12.4M",
    volume: "$3.1M",
    price: "$0.1240",
    change: "+12.4%",
    progress: 100,
    status: "LIVE_DEX",
    image: "/tokens/aegis.png"
  },
  {
    id: "2",
    name: "Nexus Compute",
    ticker: "NEX",
    marketCap: "$8.2M",
    volume: "$1.4M",
    price: "$0.0820",
    change: "+5.2%",
    progress: 100,
    status: "LIVE_DEX",
    image: "/tokens/nexus.png"
  },
  {
    id: "3",
    name: "Quantis Yield",
    ticker: "QTY",
    marketCap: "$890K",
    volume: "$240K",
    price: "$0.0089",
    change: "+18.1%",
    progress: 85,
    status: "BONDING",
    image: "/tokens/quantis.png"
  },
  {
    id: "4",
    name: "Vanguard Vault",
    ticker: "VGV",
    marketCap: "$450K",
    volume: "$120K",
    price: "$0.0045",
    change: "+2.4%",
    progress: 42,
    status: "BONDING",
    image: "/tokens/vanguard.png"
  },
  {
    id: "5",
    name: "Vertex Liquidity",
    ticker: "VTX",
    marketCap: "$150K",
    volume: "$45K",
    price: "$0.0015",
    change: "-1.2%",
    progress: 12,
    status: "BONDING",
    image: "/tokens/vertex.png"
  },
  {
    id: "6",
    name: "Cipher Core",
    ticker: "CPH",
    marketCap: "$56K",
    volume: "$12K",
    price: "$0.0005",
    change: "+4.1%",
    progress: 5,
    status: "BONDING",
    image: "/tokens/cipher.png"
  },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Top Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "NETWORK TVL", value: "$42.5M", icon: Activity },
          { label: "24H VOLUME", value: "$12.1M", icon: BarChart3 },
          { label: "ACTIVE MARKETS", value: "1,240", icon: Zap },
          { label: "SECURITY AUDITS", value: "100%", icon: Shield },
        ].map((stat, i) => (
          <div key={i} className="border border-border bg-card p-4 flex flex-col justify-between relative overflow-hidden group hover:border-primary/50 transition-colors">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center justify-between text-muted-foreground mb-4 relative z-10">
              <span className="text-xs font-mono font-bold tracking-wider">{stat.label}</span>
              <stat.icon className="w-4 h-4 opacity-50" />
            </div>
            <div className="text-2xl mono-num text-white relative z-10">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Main Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Column: Markets Grid */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <h2 className="text-lg font-mono font-bold tracking-widest text-white uppercase flex items-center gap-2">
              <Droplets className="w-5 h-5 text-primary" /> Active Deployments
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MARKETS_DATA.map((token) => (
              <Link href={`/token/${token.id}`} key={token.id}>
                <div className="border border-border bg-card p-5 relative overflow-hidden group cursor-pointer hover:border-primary/50 transition-all duration-300">
                  {/* Glassmorphism Glow */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  
                  <div className="flex items-start justify-between mb-6 relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-background border border-border overflow-hidden relative shadow-[0_0_15px_rgba(0,255,255,0.1)] group-hover:shadow-[0_0_20px_rgba(0,255,255,0.2)] transition-shadow">
                        <Image 
                          src={token.image} 
                          alt={token.name} 
                          fill 
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-lg group-hover:text-primary transition-colors">{token.name}</h3>
                        <div className="text-xs text-muted-foreground font-mono flex items-center gap-2 mt-1">
                          <span className="bg-secondary px-1.5 py-0.5 text-white">${token.ticker}</span>
                          <span className={`${token.change.startsWith('+') ? 'text-green-500' : 'text-destructive'}`}>
                            {token.change}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-5 relative z-10">
                    <div className="bg-background border border-border p-3">
                      <div className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest mb-1">Market Cap</div>
                      <div className="font-mono text-white text-sm">{token.marketCap}</div>
                    </div>
                    <div className="bg-background border border-border p-3">
                      <div className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest mb-1">Price</div>
                      <div className="font-mono text-green-400 text-sm">{token.price}</div>
                    </div>
                  </div>

                  <div className="space-y-2 relative z-10">
                    {token.status === "LIVE_DEX" ? (
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-muted-foreground uppercase">Status</span>
                        <span className="text-green-500 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                          Trading Live
                        </span>
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-muted-foreground uppercase">Liquidity Curve</span>
                          <span className="font-bold text-primary">{token.progress}%</span>
                        </div>
                        <Progress value={token.progress} className="h-1 bg-secondary" />
                      </>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Column: Deployment & Info */}
        <div className="flex flex-col gap-6 sticky top-20">
          <div className="border border-primary/30 bg-card p-6 relative overflow-hidden group shadow-[0_0_30px_rgba(0,255,255,0.05)]">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors duration-700 pointer-events-none"></div>
            <div className="relative z-10">
              <h3 className="text-lg font-mono font-bold tracking-widest text-white mb-2 uppercase flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" /> Initialize Protocol
              </h3>
              <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
                Deploy your own institutional-grade synthetic asset and automated market maker instantly on the Base network.
              </p>
              <Link href="/create" className="block">
                <Button className="w-full bg-primary text-black hover:bg-primary/90 font-mono font-bold tracking-wider rounded-none h-14 uppercase shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] transition-all">
                  Launch Terminal <ArrowUpRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="border border-border bg-card p-6">
            <h3 className="text-sm font-mono font-bold tracking-widest text-white mb-4 uppercase">System Diagnostics</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Network Node</span>
                <span className="font-mono text-green-500 flex items-center gap-2 text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  CONNECTED
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Block Latency</span>
                <span className="font-mono text-white text-xs">154ms</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Smart Contracts</span>
                <span className="font-mono text-white text-xs">v2.4.0 (Audited)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
