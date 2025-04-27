'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-white overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-black/30 backdrop-blur-md border-b border-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2"
            >
              <Link href="/" className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                Moksh
              </Link>
            </motion.div>

            <div className="flex space-x-8 items-center">
              {['About', 'Projects', 'Skills', 'Contact'].map((item, idx) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-300 hover:text-white transition-all relative group text-lg font-medium"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Social Icons */}
            <div className="hidden md:flex space-x-4">
              <motion.a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                className="text-gray-300 hover:text-white"
              >
                <FaGithub size={22} />
              </motion.a>
              <motion.a
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                className="text-gray-300 hover:text-white"
              >
                <FaLinkedin size={22} />
              </motion.a>
              <motion.a
                href="mailto:your.email@example.com"
                whileHover={{ scale: 1.2 }}
                className="text-gray-300 hover:text-white"
              >
                <FaEnvelope size={22} />
              </motion.a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>

      {/* Background Blurs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500/20 rounded-full filter blur-3xl opacity-50 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-500/20 rounded-full filter blur-3xl opacity-50 animate-pulse" />
    </div>
  );
};

export default Layout;
