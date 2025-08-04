import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Stundenlohn Rechner (Brutto & Netto)",
  description:
    "Berechnen Sie Ihren echten Netto-Stundenlohn. Unser kostenloser Rechner zeigt Ihnen, was nach Steuern & Abgaben wirklich pro Stunde übrig bleibt.",
  keywords: [
    "stundenlohn rechner",
    "stundenlohn berechnen",
    "brutto netto stundenlohn",
    "gehaltsrechner stundenlohn",
    "mindestlohn rechner",
    "netto stundenlohn rechner",
    "stundenlohn aus monatsgehalt berechnen",
    "was ist ein guter stundenlohn",
    "stundenlohn deutschland",
    "lohnrechner stundenlohn",
    "steuern stundenlohn",
    "steuerklasse stundenlohn",
  ].join(", "),
  authors: [{ name: "Stundenlohn Rechner Team" }],
  creator: "Stundenlohn Rechner",
  publisher: "Stundenlohn Rechner",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://stundenlohn-rechner.de",
    title: "Stundenlohn Rechner (Brutto & Netto)",
    description:
      "Berechnen Sie Ihren echten Netto-Stundenlohn. Unser kostenloser Rechner zeigt Ihnen, was nach Steuern & Abgaben wirklich pro Stunde übrig bleibt.",
    siteName: "Stundenlohn Rechner",
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "Stundenlohn Rechner - Kostenlos für Deutschland",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stundenlohn Rechner (Brutto & Netto)",
    description:
      "Berechnen Sie Ihren echten Netto-Stundenlohn. Unser kostenloser Rechner zeigt Ihnen, was nach Steuern & Abgaben wirklich pro Stunde übrig bleibt.",
    images: ["/android-chrome-512x512.png"],
  },
  alternates: {
    canonical: "https://stundenlohn-rechner.de",
    languages: {
      "de-DE": "https://stundenlohn-rechner.de",
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
  category: "Finance",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      { rel: "android-chrome-192x192", url: "/android-chrome-192x192.png" },
      { rel: "android-chrome-512x512", url: "/android-chrome-512x512.png" },
    ],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className="scroll-smooth">
      <head>
        <link rel="canonical" href="https://stundenlohn-rechner.de" />
        <meta name="geo.region" content="DE" />
        <meta name="geo.country" content="Germany" />
        <meta name="language" content="German" />
        <meta name="revisit-after" content="7 days" />
        <meta name="rating" content="general" />
        <meta name="distribution" content="global" />
        <meta name="theme-color" content="#4A69E2" />

        {/* 优化图标加载 */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* 移动端优化 */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />

        {/* 预加载关键资源 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />

        {/* 预加载关键CSS */}
        <link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

        {/* 性能提示 */}
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
        <link rel="prefetch" href="/android-chrome-192x192.png" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>

        {/* 延迟加载Google Analytics */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // 延迟加载GA以提升初始加载速度
              window.addEventListener('load', function() {
                setTimeout(function() {
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'GA_MEASUREMENT_ID');
                }, 2000);
              });
            `,
          }}
        />
      </body>
    </html>
  )
}
