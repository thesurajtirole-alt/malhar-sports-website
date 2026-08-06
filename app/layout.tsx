import type { Metadata } from "next";
import { Anton, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { business } from "@/lib/business";
import { getLocalBusinessSchema } from "@/lib/schema";

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl),
  title: {
    default: "Malhar Sports and Shoes | Indore Ka Sports Adda",
    template: "%s | Malhar Sports and Shoes",
  },
  description:
    "Indore ka favourite sports store — cricket, football, badminton, running aur gym gear. Sahi advice, sahi shoes, real Indori vibe. Dravid Nagar, Indore mein visit karo.",
  keywords: [
    "sports shop Indore",
    "running shoes Indore",
    "cricket bat Indore",
    "sports shoes near me",
    "badminton racket Indore",
    "football shoes Indore",
    "sports accessories Indore",
  ],
  openGraph: {
    title: "Malhar Sports and Shoes | Indore Ka Sports Adda",
    description:
      "Indore ka favourite sports store — cricket, football, badminton, running aur gym gear.",
    url: business.siteUrl,
    siteName: "Malhar Sports and Shoes",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/logo.png", width: 500, height: 500 }],
  },
  icons: {
    icon: "/favicon-32.png",
    apple: "/apple-touch-icon.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Malhar Sports and Shoes | Indore Ka Sports Adda",
    description:
      "Indore ka favourite sports store — cricket, football, badminton, running aur gym gear.",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const schema = getLocalBusinessSchema();

  return (
    <html
      lang="en"
      className={`${anton.variable} ${jakarta.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-body">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
