import React from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper, SectionTitle } from './ui/SectionWrapper';

export const GuideSection: React.FC = () => {
  const steps = [
    {
      number: 1,
      title: 'Upload Your Files',
      description: 'Drag and drop or select your photos and videos from any device',
      icon: '📁',
    },
    {
      number: 2,
      title: 'Automatic Conversion',
      description: 'Our tool converts and compresses files to PIXORA-compatible formats',
      icon: '⚡',
    },
    {
      number: 3,
      title: 'Download & Enjoy',
      description: 'Get your optimized files and transfer them to your PIXORA frame',
      icon: '✨',
    },
  ];

  return (
    <SectionWrapper id="guide" background="gray" padding="xl">
      <div className="max-w-6xl mx-auto">
        <SectionTitle>How It Works</SectionTitle>
        
        <motion.p 
          className="text-xl text-gray-600 max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Follow this simple 3-step process to prepare your media for the PIXORA frame
        </motion.p>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className="relative text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-blue-300 to-purple-300 -z-10" />
              )}
              
              {/* Step Circle */}
              <div className="relative inline-flex items-center justify-center w-32 h-32 bg-white rounded-full shadow-2xl mb-6 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full opacity-10" />
                <span className="text-4xl">{step.icon}</span>
                <div className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  {step.number}
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {step.title}
              </h3>
              
              <p className="text-gray-600 text-lg leading-relaxed max-w-sm mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Video Tutorial */}
        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Watch Our Quick Tutorial
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See the conversion process in action and learn pro tips for the best results
            </p>
          </div>

          <div className="relative group">
            {/* Video Container */}
            <div className="relative w-full bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-video">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="PIXORA Converter Tutorial"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Video Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};