import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/components/AuthProvider";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Lionel Coevoet - Full Stack Developer Portfolio",
    template: "%s | Lionel Coevoet"
  },
  description: "Full Stack Developer with 4+ years of experience in React, Next.js, Node.js, Python, Java, Firebase, MongoDB, and AWS. Specializing in mobile app development and innovative technology solutions.",
  keywords: [
    "Lionel Coevoet",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Mobile App Developer",
    "Node.js Developer",
    "Python Developer",
    "Java Developer",
    "Firebase Developer",
    "MongoDB Developer",
    "AWS Developer",
    "Portfolio",
    "Web Development",
    "Mobile Development",
    "Sydney Developer",
    "Australian Developer"
  ],
  authors: [{ name: "Lionel Coevoet" }],
  creator: "Lionel Coevoet",
  publisher: "Lionel Coevoet",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://lionel-portfolio.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://lionel-portfolio.vercel.app',
    title: 'Lionel Coevoet - Full Stack Developer Portfolio',
    description: 'Full Stack Developer with 4+ years of experience in React, Next.js, Node.js, Python, Java, Firebase, MongoDB, and AWS. Specializing in mobile app development and innovative technology solutions.',
    siteName: 'Lionel Coevoet Portfolio',
    images: [
      {
        url: '/images/FA2_5340_2_edited.png',
        width: 1200,
        height: 630,
        alt: 'Lionel Coevoet - Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lionel Coevoet - Full Stack Developer Portfolio',
    description: 'Full Stack Developer with 4+ years of experience in React, Next.js, Node.js, Python, Java, Firebase, MongoDB, and AWS.',
    images: ['/images/FA2_5340_2_edited.png'],
    creator: '@lionelcoevoet',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
};

function Navigation() {
  return (
    <nav className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl sm:text-2xl font-bold gradient-text hover:scale-105 transition-transform">
            Lionel&apos;s Portfolio
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium text-sm lg:text-base">
              Home
            </Link>
            <Link href="/portfolio" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium text-sm lg:text-base">
              Portfolio
            </Link>
            <Link href="/case-studies" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium text-sm lg:text-base">
              Case Studies
            </Link>
            <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium text-sm lg:text-base">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium text-sm lg:text-base">
              Contact
            </Link>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-2">
            <button className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu (Hidden by default) */}
        <div className="md:hidden hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-lg mt-2 shadow-lg">
            <Link href="/" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium text-sm">
              Home
            </Link>
            <Link href="/portfolio" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium text-sm">
              Portfolio
            </Link>
            <Link href="/case-studies" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium text-sm">
              Case Studies
            </Link>
            <Link href="/about" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium text-sm">
              About
            </Link>
            <Link href="/contact" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium text-sm">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') || 'light';
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const finalTheme = theme === 'dark' || (!theme && prefersDark) ? 'dark' : 'light';
                document.documentElement.classList.toggle('dark', finalTheme === 'dark');
                document.documentElement.setAttribute('data-theme', finalTheme);
              } catch (e) {}
            `,
          }}
        />
        <StructuredData />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 min-h-screen transition-colors duration-300`}>
        <ThemeProvider>
          <AuthProvider>
            <Navigation />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
              {children}
            </main>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
