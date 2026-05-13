import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { SoundProvider } from "@/contexts/SoundContext";
import WhalesToast from "@/components/WhalesToast";
import WhaleSwimEffect from "@/components/WhaleSwimEffect";
import ConfettiBanner from "@/components/ConfettiBanner";
import NewTokenEffect from "@/components/NewTokenEffect";
import NavbarClient from "@/components/NavbarClient";
import LiveTicker from "@/components/LiveTicker";

export const metadata: Metadata = {
  title: "Prime.fun | The Most Dynamic Meme Launchpad on Base",
  description: "Launch, trade, and discover meme coins on Base. Features Charity Coins, AI Agent Tokens, Voice Chat, and real-time Callouts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Departure+Mono&family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ minHeight: "100vh", background: "#080808", color: "#ffffff" }}>
        <Providers>
          {/* ── Global Sound Context (wraps everything needing sound) ── */}
          <SoundProvider>

            {/* ── Sticky Top Navbar ─────────────────────────────────── */}
            <NavbarClient />

            {/* ── Live Ticker ───────────────────────────────────────── */}
            <LiveTicker />

            {/* ── Page Content ──────────────────────────────────────── */}
            <main
              style={{
                width: "100%",
                maxWidth: "1600px",
                margin: "0 auto",
                padding: "28px 24px",
                position: "relative",
                zIndex: 1,
              }}
            >
              {children}
            </main>

            {/* ── Phase 3 Global Effects ────────────────────────────── */}
            {/* Whale swim across screen */}
            <WhaleSwimEffect />
            {/* Bottom-right toast stack */}
            <WhalesToast />
            {/* Bottom-left new token announcements */}
            <NewTokenEffect />
            {/* Top-center charity milestone banner + confetti */}
            <ConfettiBanner />

          </SoundProvider>
        </Providers>
      </body>
    </html>
  );
}
