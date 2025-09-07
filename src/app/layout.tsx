import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/components/AuthProvider";
import Navigation from "@/components/Navigation";
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
    default: "Lionel Coevoet - Full Stack Developer & Mobile App Developer | Sydney, Australia",
    template: "%s | Lionel Coevoet - Full Stack Developer"
  },
  description: "Lionel Coevoet is a Full Stack Developer with 4+ years of experience specializing in React, Next.js, Node.js, Python, Java, Firebase, MongoDB, and AWS. Based in Sydney, Australia. Available for freelance projects and full-time opportunities.",
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
    "Australian Developer",
    "Freelance Developer",
    "Software Engineer",
    "Frontend Developer",
    "Backend Developer",
    "JavaScript Developer",
    "TypeScript Developer",
    "React Native Developer",
    "API Development",
    "Cloud Computing",
    "Database Design",
    "UI/UX Development",
    "Responsive Design",
    "Progressive Web Apps",
    "E-commerce Development"
  ],
  authors: [{ name: "Lionel Coevoet", url: "https://lionel-portfolio.vercel.app" }],
  creator: "Lionel Coevoet",
  publisher: "Lionel Coevoet",
  category: "Technology",
  classification: "Portfolio Website",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://lionel-portfolio.vercel.app'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://lionel-portfolio.vercel.app',
    title: 'Lionel Coevoet - Full Stack Developer & Mobile App Developer',
    description: 'Full Stack Developer with 4+ years of experience in React, Next.js, Node.js, Python, Java, Firebase, MongoDB, and AWS. Based in Sydney, Australia.',
    siteName: 'Lionel Coevoet Portfolio',
    images: [
      {
        url: '/images/FA2_5340_2_edited.png',
        width: 1200,
        height: 630,
        alt: 'Lionel Coevoet - Full Stack Developer and Mobile App Developer',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lionel Coevoet - Full Stack Developer & Mobile App Developer',
    description: 'Full Stack Developer with 4+ years of experience in React, Next.js, Node.js, Python, Java, Firebase, MongoDB, and AWS. Based in Sydney, Australia.',
    images: ['/images/FA2_5340_2_edited.png'],
    creator: '@lionelcoevoet',
    site: '@lionelcoevoet',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
    other: {
      'msvalidate.01': 'your-bing-verification-code',
    },
  },
  manifest: '/manifest.json',
  other: {
    'theme-color': '#8B5CF6',
    'color-scheme': 'light dark',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Lionel Coevoet Portfolio',
    'application-name': 'Lionel Coevoet Portfolio',
    'msapplication-TileColor': '#8B5CF6',
    'msapplication-config': '/browserconfig.xml',
  },
};


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
