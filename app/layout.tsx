import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://katiho.milanprajapati.com.np"),
  title: {
    default: "Kati Ho? | Compare Product Prices in Nepal",
    template: "%s | Kati Ho?",
  },
  description:
    "Kati Ho? helps you compare product prices across Nepali stores and find the best deals on mobiles, gadgets, electronics, and accessories before you buy.",
  keywords: [
    "Kati Ho",
    "Kati Ho Nepal",
    "price comparison Nepal",
    "Nepal product price comparison",
    "mobile price Nepal",
    "laptop price Nepal",
    "gadget price Nepal",
    "compare prices Nepal",
    "best deals Nepal",
    "sasto price Nepal",
  ],
  authors: [
    {
      name: "Kati Ho?",
    },
  ],
  creator: "Kati Ho?",
  publisher: "Kati Ho?",
  applicationName: "Kati Ho?",
  category: "Shopping",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Kati Ho? | Compare Product Prices in Nepal",
    description:
      "Search once and compare prices across trusted Nepali stores. Find the best deals before you buy.",
    url: "https://katiho.milanprajapati.com.np",
    siteName: "Kati Ho?",
    images: [
      {
        url: "/katiho-logoo.png",
        width: 1200,
        height: 630,
        alt: "Kati Ho? - Nepal Product Price Comparison Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kati Ho? | Compare Product Prices in Nepal",
    description:
      "Compare prices for mobiles, gadgets, electronics, and accessories across Nepali stores.",
    images: ["/katiho-logoo.png"],
  },
  icons: {
    icon: "/katiho-logoo.png",
    shortcut: "/katiho-logoo.png",
    apple: "/katiho-logoo.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-white text-slate-950 flex flex-col">
        {children}
      </body>
    </html>
  );
}
