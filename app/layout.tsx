import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "./provider";

const figTree = Figtree({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ClipKar",
  description: "AI shorts video generator web app",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={figTree.className}>
          <Provider>{children}</Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
