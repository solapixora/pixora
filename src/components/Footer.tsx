'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpIcon } from './ui/Icons';
import { scrollToTop } from '../utils/helpers';

export const Footer: React.FC = () => {
  return (
    <>
      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-2xl hover:bg-blue-700 transition-all duration-300 hover:scale-110 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowUpIcon size={24} />
      </motion.button>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Brand Section */}
            <div className="md:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  PIXORA
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed max-w-md">
                  Making your precious memories beautiful and accessible. 
                  Digital frames designed with elegance, powered by innovation.
                </p>
              </motion.div>
            </div>

            {/* Quick Links */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h4 className="text-xl font-semibold mb-6">Quick Links</h4>
                <ul className="space-y-3">
                  {[
                    { name: 'Converter Tool', href: '#converter' },
                    { name: 'How It Works', href: '#guide' },
                    { name: 'FAQ', href: '#faq' },
                    { name: 'Reviews', href: '#reviews' },
                  ].map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors duration-200 hover:underline"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Support */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h4 className="text-xl font-semibold mb-6">Support</h4>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="https://wa.me/967734444726"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-green-400 transition-colors duration-200 hover:underline"
                    >
                      WhatsApp Support
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:solapixora@gmail.com"
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-200 hover:underline"
                    >
                      Email Support
                    </a>
                  </li>
                  <li>
                    <span className="text-gray-400">Free File Conversion</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>

          {/* Bottom Section */}
          <motion.div
            className="border-t border-gray-800 pt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-gray-400 text-center md:text-left">
                <p>© {new Date().getFullYear()} PIXORA. All rights reserved.</p>
                <p className="text-sm mt-1">Memories, Made Timeless.</p>
              </div>

              <div className="flex flex-wrap gap-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Privacy Policy
                </a>
              </div>
            </div>

            {/* Made with love */}
            <div className="text-center mt-8 text-gray-500">
              <p className="flex items-center justify-center gap-2">
                Made with <span className="text-red-400 animate-pulse">❤️</span> for preserving memories
              </p>
            </div>
          </motion.div>
        </div>
      </footer>
    </>
  );
};