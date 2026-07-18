import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'LEWITT SIGNS | Premium Printing & Branding Solutions',
  description:
    'Transform your brand with Lewitt Signs. Expert printing, signage, and branding services that make your business stand out.',
  keywords: ['printing', 'branding', 'signage', 'logo design', 'business cards', 'banners', 'vehicle branding'],
  authors: [{ name: 'LEWITT SIGNS' }],
  creator: 'LEWITT SIGNS',
  publisher: 'LEWITT SIGNS',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'LEWITT SIGNS',
    title: 'LEWITT SIGNS | Premium Printing & Branding Solutions',
    description: 'Transform your brand with Lewitt Signs. Expert printing, signage, and branding services.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LEWITT SIGNS | Premium Printing & Branding Solutions',
    description: 'Transform your brand with Lewitt Signs. Expert printing, signage, and branding services.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#0B0F19',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
