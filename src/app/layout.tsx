import type { Metadata } from "next";
import "./globals.css";
import AppProviders from "@/providers/AppProviders";
import StoreLayoutWrapper from "@/components/layout/StoreLayoutWrapper";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.cavrozone.com"),
  title: "Cavrozone | Good Things. Brighter Days.",
  description: "Discover curated lifestyle essentials, modern electronics, fashion, and home goods at Cavrozone.",
  openGraph: {
    title: "Cavrozone | Modern E-Commerce Store",
    description: "Shop quality essentials with fast shipping and seamless checkout at Cavrozone.",
    url: "https://www.cavrozone.com",
    siteName: "Cavrozone",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col bg-[#fcfcfc]">
        <AppProviders>
          <StoreLayoutWrapper>
            {children}
          </StoreLayoutWrapper>
        </AppProviders>
      </body>
    </html>
  );
}
