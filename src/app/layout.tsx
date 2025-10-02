import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../index.css'

// const inter = Inter({ 
//   subsets: ['latin'],
//   weight: ['300', '400', '500', '600', '700', '800', '900'],
//   display: 'swap',
// })

export const metadata: Metadata = {
  title: 'PIXORA - Image & Video Converter',
  description: 'Convert and compress images and videos with ease',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // <html lang="en" className={inter.className} style={{ scrollBehavior: 'smooth' }}>
    <html lang="en" style={{ scrollBehavior: 'smooth' }}>
      <body className="antialiased overflow-x-hidden bg-[#FAFAFA] text-[#1F2937]">
        <style dangerouslySetInnerHTML={{ __html: `
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
        `}} />
        {children}
      </body>
    </html>
  )
}
