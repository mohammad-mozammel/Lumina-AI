import type { Metadata, Viewport } from "next"
import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"

export const metadata: Metadata = {
  metadataBase: new URL("https://web-lumina-ai.vercel.app"),
  title: {
    default: "Lumina AI — AI Image Creation Studio",
    template: "%s | Lumina AI",
  },
  description: "Create, transform, restore, and refine images with AI-powered creative tools. All-in-one workspace for generative fill, background removal, object removal, recoloring, and image enhancement.",
  keywords: ["AI image generation", "image editing", "background removal", "generative fill", "object removal", "image enhancement", "creative tools"],
  authors: [{ name: "Lumina AI" }],
  creator: "Lumina AI",
  publisher: "Lumina AI",
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
    locale: "en_US",
    url: "https://web-lumina-ai.vercel.app",
    siteName: "Lumina AI",
    title: "Lumina AI — AI Image Creation Studio",
    description: "Create, transform, restore, and refine images with AI-powered creative tools.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Lumina AI - AI Image Creation Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumina AI — AI Image Creation Studio",
    description: "Create, transform, restore, and refine images with AI-powered creative tools.",
    images: ["/og-image.png"],
    creator: "@luminaai",
  },
  icons: {
    icon: [
      { url: "/lumina-icon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/lumina-icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/lumina-icon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/lumina-icon-64.png", sizes: "64x64", type: "image/png" },
    ],
    apple: [
      { url: "/lumina-icon-180.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "icon", url: "/lumina-favicon.svg", type: "image/svg+xml" },
      { rel: "manifest", url: "/manifest.json" },
    ],
  },
  manifest: "/manifest.json",
}

export const viewport: Viewport = {
  themeColor: "#0B0B0C",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

const fontPreloads = [
  { href: "/fonts/Satoshi-Regular.ttf", as: "font", type: "font/ttf", crossOrigin: "anonymous" as const },
  { href: "/fonts/TestSohneBreit-Regular.otf", as: "font", type: "font/otf", crossOrigin: "anonymous" as const },
  { href: "/fonts/lunema-regular.ttf", as: "font", type: "font/ttf", crossOrigin: "anonymous" as const },
]

const dnsPrefetch = [
  "https://res.cloudinary.com",
  "https://api.stripe.com",
  "https://clerk.lumina.ai",
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#C7F36B",
          colorTextOnPrimaryBackground: "#0B0B0C",
        },
      }}
    >
      <html lang="en" className="scroll-smooth">
        <head>
          <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
          <link rel="preconnect" href="https://api.stripe.com" crossOrigin="anonymous" />
          <link rel="dns-prefetch" href="https://res.cloudinary.com" />
          <link rel="dns-prefetch" href="https://api.stripe.com" />
          {dnsPrefetch.map((href, i) => (
            <link key={i} rel="dns-prefetch" href={href} />
          ))}
          {fontPreloads.map((font, i) => (
            <link
              key={i}
              rel="preload"
              href={font.href}
              as={font.as}
              type={font.type}
              crossOrigin={font.crossOrigin}
            />
          ))}
          <link rel="prefetch" href="/dashboard" />
          <link rel="prefetch" href="/transformations/add/fill" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#0B0B0C" />
        </head>
        <body className="antialiased">
          {children}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                if ('serviceWorker' in navigator) {
                  window.addEventListener('load', () => {
                    navigator.serviceWorker.register('/service-worker.js')
                      .then(reg => console.log('SW registered:', reg.scope))
                      .catch(err => console.log('SW registration failed:', err));
                  });
                }
              `,
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  )
}