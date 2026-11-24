import type { Metadata, Viewport } from "next";
import { Figtree, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "./provider";

const sans = Figtree({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ClipKar — Narrated short videos from a single topic",
    template: "%s · ClipKar",
  },
  description:
    "Pick a topic, an art style and a length. ClipKar writes the script, records the voiceover, times the captions and illustrates every scene.",
  icons: {
    icon: "/favicon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#141415",
  colorScheme: "dark",
};

const clerkAppearance = {
  variables: {
    colorPrimary: "#ededed",
    colorTextOnPrimaryBackground: "#141415",
    colorBackground: "#19191b",
    colorInputBackground: "#232325",
    colorInputText: "#ededed",
    colorText: "#ededed",
    colorTextSecondary: "#a1a1a6",
    colorNeutral: "#ededed",
    colorDanger: "#e5484d",
    colorSuccess: "#4cc38a",
    borderRadius: "10px",
    fontFamily: "var(--font-sans)",
  },
  elements: {
    card: { boxShadow: "none", border: "1px solid rgba(237,237,237,0.08)" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={clerkAppearance}>
      <html lang="en" className={`dark ${sans.variable} ${mono.variable}`}>
        <body className="min-h-screen font-sans">
          <Provider>{children}</Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
