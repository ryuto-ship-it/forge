"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Cpu, Terminal, Copy, Share, Send, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function CreateTokenPage() {
  const [name, setName] = useState("");
  const [ticker, setTicker] = useState("");
  const [description, setDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [isDeployed, setIsDeployed] = useState(false);

  const handleGenerateAI = () => {
    if (!name) return alert("System requires Asset Name for initialization.");
    setIsGenerating(true);
    setTimeout(() => {
      setTicker(name.substring(0, 4).toUpperCase());
      setDescription(`Decentralized automated market maker and synthetic asset liquidity protocol for ${name}. Implements algorithmic bonding curves to ensure continuous liquidity depth and zero-slippage entry vectors for institutional capital. Initial supply distributed via smart contract locked liquidity pools.`);
      setIsGenerating(false);
    }, 1000);
  };

  const handleDeploy = () => {
    setIsDeploying(true);
    setTimeout(() => {
      setIsDeploying(false);
      setIsDeployed(true);
    }, 1500);
  };

  const generatedXPromo = `[SYS_UPDATE] New Market Initialized: $${ticker || "TKR"}
Protocol: ${name || "Unknown"}
Status: Bonding Curve Active
Network: Base L2

Access Terminal: https://forge-rho-eight.vercel.app/token/${ticker || "TKR"}`;

  const generatedTelegramPromo = `🚀 NEW ASSET DEPLOYED ON PRIMELAUNCH

💎 Protocol: ${name || "Unknown"}
📈 Ticker: $${ticker || "TKR"}
🌐 Network: Base L2

The bonding curve is now active.
Provide liquidity and trade instantly via the terminal.

👉 Trade now: https://forge-rho-eight.vercel.app/token/${ticker || "TKR"}`;

  const xIntentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(generatedXPromo)}`;

  return (
    <div className="w-full gap-6 grid grid-cols-1 lg:grid-cols-12 items-start mt-4">
      
      {/* Left Column: Form or Success */}
      <div className="lg:col-span-8 flex flex-col gap-4">
        
        {!isDeployed ? (
          <>
            <div className="mb-2">
              <h1 className="text-2xl font-mono font-bold text-white uppercase tracking-widest">Deploy Asset</h1>
              <p className="text-sm text-muted-foreground font-mono">Configure contract parameters for synthetic asset deployment.</p>
            </div>

            <div className="border border-border bg-card">
              <div className="flex items-center gap-2 p-4 border-b border-border bg-secondary/50">
                <Cpu className="w-4 h-4 text-primary" />
                <h2 className="text-xs font-mono font-bold tracking-widest text-white uppercase">Contract Parameters</h2>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-[10px] font-mono text-muted-foreground uppercase font-bold tracking-wider">Asset Name</Label>
                    <Input 
                      id="name" 
                      placeholder="e.g. Aegis Protocol" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-background border-border text-white font-mono rounded-none h-12 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary transition-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ticker" className="text-[10px] font-mono text-muted-foreground uppercase font-bold tracking-wider">Ticker Symbol</Label>
                    <Input 
                      id="ticker" 
                      placeholder="e.g. AGS" 
                      value={ticker}
                      onChange={(e) => setTicker(e.target.value)}
                      className="bg-background border-border text-white font-mono rounded-none h-12 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary transition-none"
                    />
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full border-border bg-background text-muted-foreground hover:bg-secondary hover:text-white transition-none rounded-none font-mono text-[10px] uppercase tracking-widest h-10 shadow-none"
                  onClick={handleGenerateAI}
                  disabled={isGenerating}
                >
                  {isGenerating ? <Terminal className="w-3 h-3 mr-2 animate-pulse text-primary" /> : <Terminal className="w-3 h-3 mr-2" />}
                  {isGenerating ? "Processing..." : "Auto-Generate Technical Spec"}
                </Button>

                <div className="space-y-2">
                  <Label htmlFor="desc" className="text-[10px] font-mono text-muted-foreground uppercase font-bold tracking-wider">Protocol Description</Label>
                  <Textarea 
                    id="desc" 
                    placeholder="Technical specifications and utility details..." 
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="bg-background border-border text-white font-mono text-xs rounded-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary resize-none transition-none p-4"
                  />
                </div>
              </div>
            </div>

            <Button 
              onClick={handleDeploy}
              disabled={isDeploying || !name || !ticker}
              className="w-full h-14 text-sm font-mono tracking-widest font-bold bg-primary text-black hover:bg-green-400 rounded-none uppercase transition-none mt-2"
            >
              {isDeploying ? "Deploying Contract..." : "Execute Deployment"}
            </Button>
          </>
        ) : (
          /* Success / Social Sharing State */
          <div className="border border-border bg-card p-8 flex flex-col items-center text-center animate-in fade-in zoom-in duration-500">
            <div className="w-16 h-16 bg-primary/10 border border-primary/30 flex items-center justify-center mb-6 rounded-full">
              <CheckCircle2 className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-black font-sans text-white uppercase tracking-tight mb-2">Deployment Successful</h2>
            <p className="text-sm font-mono text-muted-foreground mb-8">Smart contract initialized and bonding curve is now active for <span className="text-white font-bold">${ticker}</span>.</p>
            
            <div className="w-full flex gap-4 mb-8">
              <Link href={`/token/${ticker || "TKR"}`} className="flex-1">
                <Button className="w-full h-12 bg-secondary text-white hover:bg-secondary/80 font-mono text-xs uppercase tracking-widest rounded-none border border-border">
                  View Terminal
                </Button>
              </Link>
              <Link href="/" className="flex-1">
                <Button variant="outline" className="w-full h-12 bg-background border-border text-white hover:bg-secondary font-mono text-xs uppercase tracking-widest rounded-none">
                  Back to Markets
                </Button>
              </Link>
            </div>

            <div className="w-full text-left space-y-6">
              {/* X / Twitter Promo */}
              <div className="border border-border bg-background p-4 relative group">
                <h3 className="text-[10px] font-mono font-bold uppercase text-muted-foreground mb-3 flex items-center gap-2">
                  <Share className="w-3 h-3" /> X / Twitter Announcement
                </h3>
                <pre className="font-mono text-xs text-white whitespace-pre-wrap leading-relaxed bg-secondary/30 p-3 border border-border mb-3">
                  {generatedXPromo}
                </pre>
                <div className="flex gap-2">
                  <Button 
                    className="flex-1 bg-black border border-[#333] text-white hover:bg-[#111] h-10 rounded-none font-mono text-xs"
                    onClick={() => window.open(xIntentUrl, '_blank')}
                  >
                    Share on X
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-10 w-10 p-0 rounded-none border-border bg-background hover:bg-secondary hover:text-white"
                    onClick={() => navigator.clipboard.writeText(generatedXPromo)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Telegram Promo */}
              <div className="border border-border bg-background p-4 relative group">
                <h3 className="text-[10px] font-mono font-bold uppercase text-muted-foreground mb-3 flex items-center gap-2">
                  <Send className="w-3 h-3" /> Telegram Announcement
                </h3>
                <pre className="font-mono text-xs text-white whitespace-pre-wrap leading-relaxed bg-secondary/30 p-3 border border-border mb-3">
                  {generatedTelegramPromo}
                </pre>
                <Button 
                  variant="outline" 
                  className="w-full h-10 rounded-none border-border bg-background hover:bg-secondary hover:text-white font-mono text-xs flex items-center justify-center gap-2"
                  onClick={() => navigator.clipboard.writeText(generatedTelegramPromo)}
                >
                  <Copy className="w-3 h-3" /> Copy Telegram Message
                </Button>
              </div>
            </div>

          </div>
        )}
      </div>

      {/* Right Column: Console & Status */}
      <div className="lg:col-span-4 flex flex-col h-[calc(100vh-140px)] sticky top-24">
        <div className="border border-border bg-card flex flex-col h-full">
          <div className="flex items-center gap-2 p-4 border-b border-border bg-secondary/50">
            <Terminal className="w-4 h-4 text-primary" /> 
            <h2 className="text-xs font-mono font-bold tracking-widest text-white uppercase">System Log</h2>
          </div>

          <div className="flex-1 bg-[#09090b] p-4 relative overflow-y-auto">
            <div className="font-mono text-[10px] space-y-2 text-muted-foreground">
              <div><span className="text-primary">[SYS]</span> Terminal ready.</div>
              {isGenerating && <div><span className="text-primary animate-pulse">[AI]</span> Analyzing parameters... generating spec...</div>}
              {ticker && <div><span className="text-green-500">[OK]</span> Parsed Ticker: ${ticker}</div>}
              {isDeploying && <div><span className="text-primary animate-pulse">[NET]</span> Broadcasting contract creation...</div>}
              {isDeployed && (
                <>
                  <div><span className="text-green-500">[OK]</span> Contract deployed successfully.</div>
                  <div><span className="text-green-500">[OK]</span> Bonding curve initialized.</div>
                  <div><span className="text-white">[INFO]</span> Awaiting initial liquidity events.</div>
                </>
              )}
            </div>
          </div>

          <div className="p-4 border-t border-border bg-card mt-auto">
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase font-bold tracking-wider text-muted-foreground">
              Status: {isDeploying ? <span className="text-primary animate-pulse">DEPLOYING</span> : isDeployed ? <span className="text-green-500">ACTIVE</span> : <span className="text-white">IDLE</span>}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
