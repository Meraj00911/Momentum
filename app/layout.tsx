import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";




const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://momentum-drab-mu.vercel.app"),
  title: "Momentum — Digital Growth Studio | Mumbai",
  description:
    "Momentum is a digital growth studio in Mumbai building strategy, creative and performance systems for ambitious D2C brands.",
  keywords: [
    "Momentum",
    "digital growth studio",
    "D2C agency",
    "performance marketing",
    "creative agency",
    "Mumbai",
  ],
  openGraph: {
    title: "Momentum — Digital Growth Studio | Mumbai",
    description:
      "Strategy, creative and performance systems for ambitious D2C brands.",
    type: "website",
    siteName: "Momentum",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Momentum — Digital Growth Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Momentum — Digital Growth Studio | Mumbai",
    description:
      "Strategy, creative and performance systems for ambitious D2C brands.",
    images: ["/og-image.png"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col"><Script
  src="https://www.googletagmanager.com/gtag/js?id=G-9WP8MDLWR8"
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-9WP8MDLWR8');
  `}
</Script>{children}</body>
    </html>
  );
}