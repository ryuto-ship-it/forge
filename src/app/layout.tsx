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
          <header className="border-b border-border bg-background sticky top-0 z-50">
            <div className="px-6 h-14 flex items-center justify-between max-w-[1600px] mx-auto">
              <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <span className="font-mono font-bold text-lg tracking-widest text-white">FORGE<span className="text-primary">.PRIME</span></span>
              </Link>
              <nav className="hidden md:flex items-center gap-6 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                <Link href="/" className="hover:text-white transition-colors">
                  Markets
                </Link>
                <Link href="/create" className="hover:text-white transition-colors">
                  Deploy
                </Link>
              </nav>
              <div className="flex items-center gap-4 scale-90 origin-right">
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
