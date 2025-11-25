'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
            <div className="relative w-8 h-8">
              <Image
                src="/logo.png"
                alt="Muneem Ji Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="font-bold text-xl text-gray-900 tracking-tight">Muneem Ji</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors">
              Pricing
            </Link>
            <Link href="#contact" className="text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors">
              Contact
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center px-5 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all hover:scale-105"
            >
              Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-orange-600 focus:outline-none"
            >
              {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              <Link
                href="#features"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-50"
              >
                Features
              </Link>
              <Link
                href="#pricing"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-50"
              >
                Pricing
              </Link>
              <Link
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-50"
              >
                Contact
              </Link>
              <div className="pt-4">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center px-5 py-3 rounded-full shadow-sm text-base font-medium text-white bg-orange-600 hover:bg-orange-700"
                >
                  Login
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
