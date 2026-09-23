import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Haven | Good Things. Brighter Days.",
  description: "Essentials for a Happier You",
};

import AppProviders from "@/providers/AppProviders";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col bg-[#fcfcfc]">
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
