import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { ArrowUpRight, Activity, Zap, Shield, BarChart3, ChevronRight } from "lucide-react";

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
  },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Top Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "NETWORK TVL", value: "$42.5M", icon: Activity },
          { label: "24H VOLUME", value: "$12.1M", icon: BarChart3 },
          { label: "ACTIVE MARKETS", value: "1,240", icon: Zap },
          { label: "SECURITY AUDITS", value: "100%", icon: Shield },
        ].map((stat, i) => (
          <div key={i} className="border border-border bg-card p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-muted-foreground mb-4">
              <span className="text-xs font-mono font-bold tracking-wider">{stat.label}</span>
              <stat.icon className="w-4 h-4 opacity-50" />
            </div>
            <div className="text-2xl mono-num text-white">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Main Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Markets Table */}
        <div className="lg:col-span-2 border border-border bg-card flex flex-col">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h2 className="text-sm font-mono font-bold tracking-widest text-white uppercase">Primary Markets</h2>
            <Link href="/markets" className="text-xs font-mono text-primary hover:text-white transition-colors flex items-center">
              VIEW ALL <ArrowUpRight className="w-3 h-3 ml-1" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="text-xs text-muted-foreground font-mono bg-secondary/50 border-b border-border">
                <tr>
                  <th className="px-4 py-3 font-normal">ASSET</th>
                  <th className="px-4 py-3 font-normal text-right">PRICE</th>
                  <th className="px-4 py-3 font-normal text-right">24H CHG</th>
                  <th className="px-4 py-3 font-normal text-right">VOLUME</th>
                  <th className="px-4 py-3 font-normal text-right">MKT CAP</th>
                  <th className="px-4 py-3 font-normal w-32">BONDING</th>
                  <th className="px-4 py-3 font-normal"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {MARKETS_DATA.map((token) => (
                  <tr key={token.id} className="hover:bg-secondary/30 transition-colors group cursor-pointer">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-secondary border border-border flex items-center justify-center font-mono text-xs font-bold text-muted-foreground">
                          {token.ticker.substring(0,2)}
                        </div>
                        <div>
                          <div className="font-bold text-white text-sm">{token.name}</div>
                          <div className="text-xs text-muted-foreground font-mono">{token.ticker}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right mono-num text-white">{token.price}</td>
                    <td className={`px-4 py-4 text-right mono-num ${token.change.startsWith('+') ? 'text-green-500' : 'text-destructive'}`}>
                      {token.change}
                    </td>
                    <td className="px-4 py-4 text-right mono-num text-muted-foreground">{token.volume}</td>
                    <td className="px-4 py-4 text-right mono-num text-muted-foreground">{token.marketCap}</td>
                    <td className="px-4 py-4">
                      {token.status === "LIVE_DEX" ? (
                        <span className="text-xs font-mono text-green-500 border border-green-500/30 bg-green-500/10 px-2 py-1">LIVE DEX</span>
                      ) : (
                        <div className="w-full flex items-center gap-2">
                          <Progress value={token.progress} className="h-1.5 bg-secondary flex-1" />
                          <span className="text-xs font-mono text-muted-foreground">{token.progress}%</span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <Link href={`/token/${token.id}`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 rounded-none">
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Deployment & Info */}
        <div className="flex flex-col gap-6">
          <div className="border border-border bg-card p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors"></div>
            <h3 className="text-sm font-mono font-bold tracking-widest text-white mb-2 uppercase">Deploy Capital</h3>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Launch institutional-grade synthetic assets and automated market makers instantly on the Base network.
            </p>
            <Link href="/create" className="block">
              <Button className="w-full bg-primary text-black hover:bg-primary/90 font-mono font-bold tracking-wider rounded-none h-12 uppercase">
                Initialize Deployment
              </Button>
            </Link>
          </div>

          <div className="border border-border bg-card p-6">
            <h3 className="text-sm font-mono font-bold tracking-widest text-white mb-4 uppercase">System Status</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Base Network</span>
                <span className="font-mono text-green-500 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  OPERATIONAL
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Sequencer Sync</span>
                <span className="font-mono text-white">0.2s latency</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Contract Factory</span>
                <span className="font-mono text-white">v2.1.4</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
