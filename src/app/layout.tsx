import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "malai & co | Crafted Happiness in Every Scoop",
  description: "Experience the art of artisanal desserts. From hand-churned kulfis to luxurious faloodas, malai & co brings a taste of pure bliss to your soul.",
  keywords: ["ice cream", "kulfi", "falooda", "dessert", "premium", " artisanal"],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "malai & co",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport = {
  themeColor: "#FDFBF0",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${playfair.variable} ${outfit.variable} antialiased selection:bg-mali-gold selection:text-white`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
