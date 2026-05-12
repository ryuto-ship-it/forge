"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Copy, Share, Send, CheckCircle2, ImagePlus } from "lucide-react";
import Link from "next/link";

export default function CreateTokenPage() {
  const [name, setName] = useState("");
  const [ticker, setTicker] = useState("");
  const [description, setDescription] = useState("");
  const [isDeploying, setIsDeploying] = useState(false);
  const [isDeployed, setIsDeployed] = useState(false);

  const handleDeploy = () => {
    setIsDeploying(true);
    setTimeout(() => {
      setIsDeploying(false);
      setIsDeployed(true);
    }, 1500);
  };

  const generatedXPromo = `🚀 I just created a new coin: $${ticker || "TKR"}!

Protocol: ${name || "Unknown"}
Network: Base
Bonding Curve is LIVE!

Join the fun and trade instantly:
🔗 https://forge-rho-eight.vercel.app/token/${ticker || "TKR"}`;

  const generatedTelegramPromo = `🚀 NEW COIN LAUNCHED! 🚀

💎 Name: ${name || "Unknown"}
📈 Ticker: $${ticker || "TKR"}

The bonding curve is active! Get in early.
Provide liquidity and trade instantly with zero friction.

👉 Trade now: https://forge-rho-eight.vercel.app/token/${ticker || "TKR"}`;

  const xIntentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(generatedXPromo)}`;

  return (
    <div className="w-full max-w-[600px] mx-auto mt-12 flex flex-col items-center">
      
      {!isDeployed ? (
        <div className="w-full flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-white tracking-tight mb-2">Create new coin</h1>
            <p className="text-muted-foreground text-sm font-bold">Launch your coin instantly on the bonding curve.</p>
          </div>

          <div className="w-full space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-bold text-muted-foreground">Name</Label>
              <Input 
                id="name" 
                placeholder="e.g. Based Pepe" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-card border-border text-white rounded-xl h-14 px-4 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary transition-colors text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ticker" className="text-sm font-bold text-muted-foreground">Ticker</Label>
              <Input 
                id="ticker" 
                placeholder="e.g. PEPE" 
                value={ticker}
                onChange={(e) => setTicker(e.target.value)}
                className="bg-card border-border text-white rounded-xl h-14 px-4 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary transition-colors text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="desc" className="text-sm font-bold text-muted-foreground">Description</Label>
              <Textarea 
                id="desc" 
                placeholder="What is this coin about?" 
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-card border-border text-white rounded-xl focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary resize-none transition-colors p-4 text-base"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-bold text-muted-foreground">Image</Label>
              <div className="border-2 border-dashed border-border rounded-xl h-32 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors bg-card/50 hover:bg-card">
                <ImagePlus className="w-8 h-8 text-muted-foreground mb-2" />
                <span className="text-sm font-bold text-muted-foreground">Click to upload image</span>
              </div>
            </div>
            
            <div className="pt-4">
              <Button 
                onClick={handleDeploy}
                disabled={isDeploying || !name || !ticker}
                className="w-full h-14 text-lg font-bold bg-primary text-black hover:bg-green-400 rounded-full transition-transform active:scale-95 shadow-[0_0_20px_rgba(74,222,128,0.15)]"
              >
                {isDeploying ? "Deploying..." : "Create coin"}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        /* Success / Social Sharing State */
        <div className="w-full border border-border bg-card p-8 flex flex-col items-center text-center rounded-3xl animate-in fade-in zoom-in duration-500 shadow-2xl">
          <div className="w-20 h-20 bg-primary/20 flex items-center justify-center mb-6 rounded-full shadow-[0_0_40px_rgba(74,222,128,0.3)]">
            <CheckCircle2 className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight mb-3">Coin Created!</h2>
          <p className="text-base text-muted-foreground mb-8">The bonding curve is now active for <span className="text-white font-bold">${ticker}</span>.</p>
          
          <div className="w-full flex gap-4 mb-8">
            <Link href={`/token/${ticker || "TKR"}`} className="flex-1">
              <Button className="w-full h-12 bg-primary text-black hover:bg-green-400 font-bold rounded-full text-sm shadow-[0_0_15px_rgba(74,222,128,0.2)]">
                Go to trading page
              </Button>
            </Link>
          </div>

          <div className="w-full text-left space-y-6">
            {/* X / Twitter Promo */}
            <div className="bg-background rounded-2xl p-5 border border-border">
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <Share className="w-4 h-4 text-sky-500" /> Share on X
              </h3>
              <pre className="font-mono text-xs text-muted-foreground whitespace-pre-wrap leading-relaxed bg-card p-4 rounded-xl border border-border mb-4">
                {generatedXPromo}
              </pre>
              <div className="flex gap-3">
                <Button 
                  className="flex-1 bg-[#1d9bf0] text-white hover:bg-[#1a8cd8] h-12 rounded-full font-bold text-sm"
                  onClick={() => window.open(xIntentUrl, '_blank')}
                >
                  Post to X
                </Button>
                <Button 
                  variant="outline" 
                  className="h-12 px-6 rounded-full border-border bg-card hover:bg-secondary text-white font-bold text-sm"
                  onClick={() => navigator.clipboard.writeText(generatedXPromo)}
                >
                  <Copy className="w-4 h-4 mr-2" /> Copy
                </Button>
              </div>
            </div>

            {/* Telegram Promo */}
            <div className="bg-background rounded-2xl p-5 border border-border">
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <Send className="w-4 h-4 text-blue-400" /> Share on Telegram
              </h3>
              <pre className="font-mono text-xs text-muted-foreground whitespace-pre-wrap leading-relaxed bg-card p-4 rounded-xl border border-border mb-4">
                {generatedTelegramPromo}
              </pre>
              <Button 
                variant="outline" 
                className="w-full h-12 rounded-full border-border bg-card hover:bg-secondary text-white font-bold text-sm flex items-center justify-center gap-2"
                onClick={() => navigator.clipboard.writeText(generatedTelegramPromo)}
              >
                <Copy className="w-4 h-4" /> Copy Telegram Message
              </Button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
