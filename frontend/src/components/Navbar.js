import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="relative z-50">
      <div className="bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center"
            >
              <div className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
                  TrendLens AI
                </span>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-200">
                  Home
                </a>
                <a href="/dashboard" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-200">
                  Dashboard
                </a>
                <a href="/trends" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-200">
                  Trends
                </a>
                <a href="/analytics" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-200">
                  Analytics
                </a>
                <a href="/pricing" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-200">
                  Pricing
                </a>
              </div>
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-200">
                  Get Started
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-black/30 backdrop-blur-md"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="/" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                Home
              </a>
              <a href="/dashboard" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                Dashboard
              </a>
              <a href="/trends" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                Trends
              </a>
              <a href="/analytics" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                Analytics
              </a>
              <a href="/pricing" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                Pricing
              </a>
              <div className="px-3 py-2">
                <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-200">
                  Get Started
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
