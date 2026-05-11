"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Cpu, Terminal, Copy, CheckCircle2 } from "lucide-react";

export default function CreateTokenPage() {
  const [name, setName] = useState("");
  const [ticker, setTicker] = useState("");
  const [description, setDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);

  const handleGenerateAI = () => {
    if (!name) return alert("System requires Asset Name for initialization.");
    setIsGenerating(true);
    setTimeout(() => {
      setTicker(name.substring(0, 4).toUpperCase());
      setDescription(`Decentralized automated market maker and synthetic asset liquidity protocol for ${name}. Implements algorithmic bonding curves to ensure continuous liquidity depth and zero-slippage entry vectors for institutional capital. Initial supply distributed via smart contract locked liquidity pools.`);
      setIsGenerating(false);
    }, 1500);
  };

  const handleDeploy = async () => {
    if (!name || !ticker) return alert("Asset Name and Ticker are required.");
    setIsDeploying(true);
    try {
      const response = await fetch("/api/tweet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          ticker,
          description,
          telegram: "",
          twitter: "",
        }),
      });
      const data = await response.json();
      if (data.success) {
        alert(`✅ Token deployed and tweeted successfully!`);
      } else {
        alert(`❌ Tweet failed: ${data.error}`);
      }
    } catch (error) {
      alert(`❌ Error: ${error}`);
    } finally {
      setIsDeploying(false);
    }
  };

  const generatedPromo = `[SYS_UPDATE] New Market Initialized: $${ticker || "TKR"}
Protocol: ${name || "Unknown"}
Status: Bonding Curve Active
Network: Base L2

Access Terminal: https://forge-rho-eight.vercel.app/token/${ticker || "TKR"}`;

  return (
    <div className="max-w-[1200px] mx-auto w-full gap-8 grid grid-cols-1 lg:grid-cols-12">
      <div className="lg:col-span-8 flex flex-col gap-6">
        <div className="mb-2">
          <h1 className="text-2xl font-mono font-bold text-white mb-2 uppercase tracking-widest">Initialize New Market</h1>
          <p className="text-sm text-muted-foreground font-mono">Configure contract parameters for your synthetic asset deployment.</p>
        </div>

        <div className="border border-border bg-card p-8">
          <div className="flex items-center gap-2 mb-6 border-b border-border pb-4">
            <Cpu className="w-5 h-5 text-primary" />
            <h2 className="text-sm font-mono font-bold tracking-widest text-white uppercase">Contract Parameters</h2>
          </div>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs font-mono text-muted-foreground uppercase">Asset Name</Label>
                <Input 
                  id="name" 
                  placeholder="e.g. Aegis Protocol" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-background border-border text-white font-mono rounded-none h-12 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary transition-none"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ticker" className="text-xs font-mono text-muted-foreground uppercase">Ticker Symbol</Label>
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
              className="w-full border-border bg-background text-muted-foreground hover:bg-secondary hover:text-white transition-none rounded-none font-mono text-xs uppercase tracking-widest h-10"
              onClick={handleGenerateAI}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <Terminal className="w-4 h-4 mr-2 animate-pulse text-primary" />
              ) : (
                <Terminal className="w-4 h-4 mr-2" />
              )}
              {isGenerating ? "Processing..." : "Auto-Generate Technical Spec"}
            </Button>

            <div className="space-y-2">
              <Label htmlFor="desc" className="text-xs font-mono text-muted-foreground uppercase">Protocol Description</Label>
              <Textarea 
                id="desc" 
                placeholder="Technical specifications and utility details..." 
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-background border-border text-white font-mono text-sm rounded-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary resize-none transition-none"
              />
            </div>
          </div>
        </div>

        <Button 
          onClick={handleDeploy}
          disabled={isDeploying}
          className="w-full h-14 text-sm font-mono tracking-widest font-bold bg-primary text-black hover:bg-primary/90 rounded-none uppercase"
        >
          {isDeploying ? "Deploying & Tweeting..." : "Execute Deployment"}
        </Button>
      </div>

      <div className="lg:col-span-4 flex flex-col gap-6">
        <div className="border border-border bg-card p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-4 border-b border-border pb-4">
            <h2 className="text-sm font-mono font-bold tracking-widest text-white uppercase flex items-center gap-2">
              <Terminal className="w-4 h-4 text-primary" /> Output Console
            </h2>
          </div>

          <div className="flex-1 bg-background border border-border p-4 relative group">
            <pre className="font-mono text-xs text-muted-foreground whitespace-pre-wrap leading-relaxed">
              {generatedPromo}
            </pre>
            <Button 
              size="icon" 
              variant="ghost" 
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-secondary hover:text-white rounded-none h-8 w-8" 
              onClick={() => navigator.clipboard.writeText(generatedPromo)}
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>

          <div className="mt-6 space-y-4">
            <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Network Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="rounded-none border-border bg-background text-xs font-mono hover:text-white hover:bg-secondary">
                Publish Event
              </Button>
              <Button variant="outline" className="rounded-none border-border bg-background text-xs font-mono hover:text-white hover:bg-secondary">
                Broadcast
              </Button>
            </div>
          </div>

          <div className="mt-auto pt-8">
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
              <CheckCircle2 className="w-3 h-3 text-green-500" /> System Ready
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
