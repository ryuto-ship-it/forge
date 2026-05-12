import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jbMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PrimeLaunch | Institutional Grade Token Platform",
  description: "Institutional-grade token launchpad and trading terminal on the Base network.",
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
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <Providers>
          {/* Navigation */}
          <header className="border-b border-border bg-card/95 backdrop-blur-md sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
              <div className="flex items-center gap-12">
                <Link href="/" className="font-mono text-xl font-black tracking-widest text-primary flex items-center hover:opacity-80 transition-opacity">
                  PRIME<span className="text-white">.LAUNCH</span>
                </Link>
                <nav className="hidden md:flex gap-1">
                  <Link href="/" className="px-4 py-2 text-xs font-mono font-bold text-muted-foreground hover:text-primary hover:bg-secondary rounded-sm transition-all uppercase tracking-widest">
                    Markets
                  </Link>
                  <Link href="/create" className="px-4 py-2 text-xs font-mono font-bold text-muted-foreground hover:text-primary hover:bg-secondary rounded-sm transition-all uppercase tracking-widest">
                    Deploy Asset
                  </Link>
                </nav>
              </div>
              <div className="flex items-center gap-4">
                <ConnectButton />
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 w-full max-w-[1600px] mx-auto px-6 py-6">
            {children}
          </main>

          {/* Footer */}
          <footer className="border-t border-border bg-card py-4 mt-auto">
            <div className="px-6 text-xs font-mono text-muted-foreground flex flex-col md:flex-row justify-between items-center gap-4 max-w-[1600px] mx-auto">
              <div>
                <span>SYS.TIME: {new Date().toISOString().split('T')[0]} | PRIMELAUNCH.PROTOCOL</span>
              </div>
              <div className="flex gap-6 uppercase tracking-widest">
                <a href="#" className="hover:text-white transition-colors">Terms</a>
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                <a href="#" className="hover:text-white transition-colors">API</a>
              </div>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
