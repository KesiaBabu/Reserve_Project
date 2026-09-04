import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  title: "Reserve Financial Services | Disciplined Proprietary Trading",
  description:
    "Reserve Financial Services combines technology, data, and discipline to support internal trading decisions. UK-based proprietary trading firm.",
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className="dark"
      suppressHydrationWarning
      style={{
        overflowX: "hidden",
        width: "100%",
        maxWidth: "100%",
      }}
    >
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-[#0a0a0f]`}
        style={{
          overflowX: "hidden",
          overflowY: "auto",
          width: "100%",
          maxWidth: "100%",
          minHeight: "100vh",
          position: "relative",
          overscrollBehavior: "none",
          touchAction: "pan-y pinch-zoom",
        }}
      >
        <div className="scanline opacity-30" />
        <div
          className="overflow-wrapper overflow-x-clip"
          style={{
            overflowX: "hidden",
            width: "100%",
            maxWidth: "100%",
          }}
        >
          <main
            style={{
              overflowX: "hidden",
              width: "100%",
              maxWidth: "100%",
            }}
          >
            {children}
          </main>
        </div>
        <Analytics />
      </body>
    </html>
  )
}
