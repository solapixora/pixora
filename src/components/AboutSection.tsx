import React from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper, SectionTitle } from './ui/SectionWrapper';

export const AboutSection: React.FC = () => {
  return (
    <SectionWrapper id="about" background="white" padding="xl">
      <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <SectionTitle className="text-left mb-8" size="lg">
            About PIXORA
          </SectionTitle>
          
          <div className="space-y-6 text-lg leading-relaxed text-gray-700">
            <p>
              At PIXORA, we believe your most precious memories deserve to be displayed beautifully. 
              Our digital frames are designed with elegance and simplicity in mind, bringing your 
              photos and videos to life in stunning clarity.
            </p>
            
            <p>
              This converter tool ensures your files are perfectly optimized for your PIXORA frame, 
              providing smooth playback and crystal-clear display quality. Whether it's family 
              vacation photos or special moment videos, we make sure they look their absolute best.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="relative">
            {/* Background decoration */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-3xl opacity-50 blur-2xl" />
            
            {/* Main image */}
            <img
              src="https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
              alt="PIXORA Digital Frame"
              className="relative w-full h-80 md:h-96 object-cover rounded-2xl shadow-2xl"
            />
            
            {/* Floating elements */}
            <motion.div
              className="absolute -top-6 -right-6 bg-white p-4 rounded-full shadow-lg"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="text-2xl">📸</span>
            </motion.div>
            
            <motion.div
              className="absolute -bottom-6 -left-6 bg-white p-4 rounded-full shadow-lg"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
            >
              <span className="text-2xl">🎥</span>
            </motion.div>
          </div>

          {/* Feature badges */}
          <div className="absolute top-4 left-4 space-y-2">
            <span className="inline-block bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-800">
              4K Display
            </span>
            <span className="block bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-800">
              WiFi Enabled
            </span>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};