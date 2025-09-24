import React, { useRef } from 'react';
import { Hero } from './components/Hero';
import { ConverterTool } from './components/ConverterTool';
import { AboutSection } from './components/AboutSection';
import { GuideSection } from './components/GuideSection';
import { FAQSection } from './components/FAQSection';
import { ReviewsSection } from './components/ReviewsSection';
import { SocialSection } from './components/SocialSection';
import { Footer } from './components/Footer';
import { scrollToElement } from './utils/helpers';

function App() {
  const converterRef = useRef<HTMLElement>(null);

  const handleCTAClick = () => {
    scrollToElement(converterRef.current);
  };

  return (
    <>
      {/* Global Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        html { 
          scroll-behavior: smooth;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }
        
        body { 
          background-color: #FAFAFA;
          line-height: 1.6;
          color: #1F2937;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #F3F4F6;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #D1D5DB;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #9CA3AF;
        }

        /* Smooth focus styles */
        *:focus {
          outline: 2px solid #3B82F6;
          outline-offset: 2px;
        }

        /* Line clamp utility */
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      <main className="antialiased overflow-x-hidden">
        <Hero onCTAClick={handleCTAClick} />
        <ConverterTool ref={converterRef} />
        <AboutSection />
        <GuideSection />
        <FAQSection />
        <ReviewsSection />
        <SocialSection />
        <Footer />
      </main>
    </>
  );
}

export default App;