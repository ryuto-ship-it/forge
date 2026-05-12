import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Home, Radio, Terminal, Plus, Search, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jbMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prime.fun | Launch and Trade Tokens instantly",
  description: "The most dynamic and fun token launchpad on Base.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jbMono.variable} antialiased dark`}
    >
      <body className="min-h-screen flex bg-background text-foreground">
        <Providers>
          
          {/* Left Sidebar */}
          <aside className="w-64 border-r border-border bg-card fixed inset-y-0 left-0 z-50 flex flex-col">
            <div className="p-6">
              <Link href="/" className="font-sans text-2xl font-black tracking-tight text-white flex items-center gap-2 hover:scale-105 transition-transform duration-300">
                <span className="w-6 h-6 rounded-full bg-gradient-to-tr from-primary to-emerald-300"></span>
                Prime.fun
              </Link>
            </div>
            
            <nav className="flex-1 px-4 space-y-2">
              <Link href="/" className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-white bg-secondary/50 rounded-xl hover:bg-secondary transition-colors">
                <Home className="w-5 h-5" /> Home
              </Link>
              <Link href="/" className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-muted-foreground hover:text-white hover:bg-secondary/50 rounded-xl transition-colors">
                <Radio className="w-5 h-5" /> Callouts
              </Link>
              <Link href="/" className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-muted-foreground hover:text-white hover:bg-secondary/50 rounded-xl transition-colors">
                <Terminal className="w-5 h-5" /> Terminal
              </Link>
            </nav>

            <div className="p-4 space-y-4">
              <Link href="/create" className="block">
                <Button className="w-full h-12 bg-primary hover:bg-green-400 text-black font-bold rounded-full text-base shadow-[0_0_20px_rgba(74,222,128,0.2)] hover:shadow-[0_0_30px_rgba(74,222,128,0.4)] transition-all">
                  Create
                </Button>
              </Link>
              <Button variant="outline" className="w-full h-12 rounded-full border-border bg-background text-white hover:bg-secondary transition-all">
                Try app
              </Button>
            </div>
          </aside>

          {/* Main Content Wrapper */}
          <div className="flex-1 ml-64 flex flex-col min-h-screen">
            
            {/* Top Header */}
            <header className="h-16 border-b border-border bg-background/95 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-6">
              <div className="flex-1 max-w-xl flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2">
                <Search className="w-4 h-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search for coins..." 
                  className="bg-transparent border-none outline-none text-sm w-full text-white placeholder:text-muted-foreground"
                />
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-mono bg-secondary px-2 py-1 rounded-md">
                  <span>⌘</span><span>K</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4 ml-4">
                <Button variant="ghost" className="rounded-full text-muted-foreground hover:text-white">
                  <Mic className="w-4 h-4 mr-2" /> Voice chat
                </Button>
                <Link href="/create">
                  <Button variant="ghost" className="rounded-full font-bold">
                    <Plus className="w-4 h-4 mr-1" /> Create
                  </Button>
                </Link>
                <ConnectButton />
              </div>
            </header>

            {/* Page Content */}
            <main className="flex-1 w-full max-w-[1600px] mx-auto p-6">
              {children}
            </main>
          </div>

        </Providers>
      </body>
    </html>
  );
}
