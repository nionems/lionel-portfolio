'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

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
            <button 
              onClick={toggleMobileMenu}
              className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors p-2"
              aria-label="Toggle mobile menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-lg mt-2 shadow-lg border border-gray-200 dark:border-gray-700">
            <Link 
              href="/" 
              onClick={closeMobileMenu}
              className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium text-sm rounded-md"
            >
              Home
            </Link>
            <Link 
              href="/portfolio" 
              onClick={closeMobileMenu}
              className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium text-sm rounded-md"
            >
              Portfolio
            </Link>
            <Link 
              href="/case-studies" 
              onClick={closeMobileMenu}
              className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium text-sm rounded-md"
            >
              Case Studies
            </Link>
            <Link 
              href="/about" 
              onClick={closeMobileMenu}
              className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium text-sm rounded-md"
            >
              About
            </Link>
            <Link 
              href="/contact" 
              onClick={closeMobileMenu}
              className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium text-sm rounded-md"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
