import type { Metadata } from "next";
import { Fira_Code} from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "./provider";

const firaCode = Fira_Code({
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: "ClipKar",
  description: "AI shorts video generator web app",
  icons: {
    icon: "/logo_without_name.png",
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
        <body className={firaCode.className}>
          <Provider>{children}</Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
