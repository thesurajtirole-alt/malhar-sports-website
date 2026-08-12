import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { FloatingEnquireButton } from "@/components/ui/FloatingEnquireButton";
import { RippleEffect } from "@/components/ui/RippleEffect";
import { AuthSessionProvider } from "@/components/auth/AuthSessionProvider";
import { AuthSync } from "@/components/auth/AuthSync";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { business } from "@/lib/business";
import { getLocalBusinessSchema } from "@/lib/schema";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
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
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const schema = getLocalBusinessSchema();

  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <head>
        {/* General Sans — Fontshare (not on Google Fonts), used as --font-display */}
        <link
          rel="preconnect"
          href="https://api.fontshare.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-body">
        <GoogleAnalytics />
        <AuthSessionProvider>
          <AuthSync />
          <ScrollProgress />
          <CustomCursor />
          <RippleEffect />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
          <FloatingEnquireButton />
        </AuthSessionProvider>
      </body>
    </html>
  );
}
