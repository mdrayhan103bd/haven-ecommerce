import type { Metadata } from "next";
import "./globals.css";
import AppProviders from "@/providers/AppProviders";
import StoreLayoutWrapper from "@/components/layout/StoreLayoutWrapper";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.cavrozone.com"),
  title: "Cavrozone | Premium Lifestyle & Online Shopping in Bangladesh",
  description: "Shop premium lifestyle products, trending footwear, fashion, audio, electronics, and home decor online in Bangladesh with 100% Cash on Delivery at Cavrozone.",
  openGraph: {
    title: "Cavrozone | Premium Lifestyle Store Bangladesh",
    description: "Shop quality lifestyle essentials with express Cash on Delivery shipping across Bangladesh at Cavrozone.",
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
