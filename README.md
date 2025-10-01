# PIXORA - Next.js Application

A modern web application for converting and compressing images and videos for PIXORA Digital Frames.

## 🚀 Migration to Next.js

This project has been successfully migrated from Vite to Next.js 14 with App Router.

## 📋 Prerequisites

- Node.js 18.x or later
- npm, yarn, pnpm, or bun

## 🛠️ Installation

```bash
# Install dependencies
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

## 🏃 Running the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🏗️ Building for Production

```bash
npm run build
npm run start
```

## 📁 Project Structure

```
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Home page
│   ├── components/       # React components
│   ├── data/            # Static data
│   ├── styles/          # Style files
│   ├── types/           # TypeScript types
│   └── utils/           # Utility functions
├── public/              # Static assets
├── next.config.js       # Next.js configuration
└── tailwind.config.js   # Tailwind CSS configuration
```

## 🎨 Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Backend**: Supabase

## 📝 Key Changes from Vite

1. **App Router**: Migrated to Next.js 14 App Router structure
2. **Client Components**: Added `'use client'` directive to components using hooks/browser APIs
3. **Font Optimization**: Using Next.js `next/font` for optimized font loading
4. **Configuration**: Replaced `vite.config.ts` with `next.config.js`
5. **TypeScript**: Updated `tsconfig.json` for Next.js

## 🔧 Development Notes

- All interactive components use the `'use client'` directive
- Global styles are imported in `app/layout.tsx`
- Custom fonts are loaded via `next/font/google`
- Static assets are served from the `public/` directory

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🐛 Known Issues

- Some TypeScript type conflicts with Framer Motion (pre-existing, does not affect functionality)

## 📄 License

This project is private and proprietary.
