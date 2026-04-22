import type { Metadata } from "next";
import { Bebas_Neue, Space_Grotesk } from "next/font/google";
import "./globals.css";

import RouteHeader from "@/components/portfolio/RouteHeader";
import MotionOrchestrator from "@/components/portfolio/MotionOrchestrator";
import CursorController from "@/components/portfolio/CursorController";
import FixedFooter from "@/components/portfolio/FixedFooter";
import { ViewTransitions } from "next-view-transitions";

const bebasNeue = Bebas_Neue({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mason Liu | Portfolio",
  description: "Portfolio for Mason Liu, focused on systems, games, and interfaces.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="root-theme" suppressHydrationWarning>
      <body
        className={`${bebasNeue.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <MotionOrchestrator />
        <CursorController />
        <div className="cursor-blob" aria-hidden="true" />
        <ViewTransitions>
          <RouteHeader />
          <FixedFooter />
          {children}
        </ViewTransitions>
      </body>
    </html>
  );
}
