import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Forge | Prime Token Launchpad",
  description: "Institutional-grade token launchpad on the Base network.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <Providers>
          {/* Navigation */}
          <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
              <div className="flex items-center gap-12">
                <Link href="/" className="font-mono text-2xl font-black tracking-widest text-primary flex items-center hover:scale-105 transition-transform">
                  FORGE<span className="text-white">.PRIME</span>
                </Link>
                <nav className="hidden md:flex gap-2">
                  <Link href="/" className="px-6 py-3 text-sm font-mono font-bold text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-all uppercase tracking-widest border border-transparent hover:border-primary/20">
                    Markets
                  </Link>
                  <Link href="/create" className="px-6 py-3 text-sm font-mono font-bold text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-all uppercase tracking-widest border border-transparent hover:border-primary/20">
                    Deploy
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
                <span>SYS.TIME: {new Date().toISOString().split('T')[0]} | FORGE.PROTOCOL</span>
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
