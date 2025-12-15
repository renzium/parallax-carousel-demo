# Parallax Carousel Demo

A Next.js 16 + React 19.2 demonstration of a vertical scroll parallax carousel with layered movement effects.

## 🎯 Core Feature

**Vertical scroll with layered parallax movement** - The core differentiator of this platform.

### Layer Speeds:
- **Cars and trucks**: 0.5x
- **Buildings**: 1.0x (normal scroll)
- **Airplane**: 0.5x
- **Background skyline**: 0.3x

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser and scroll to experience the parallax effect.

## 🛠️ Technology Stack

- **Next.js 16.0.6** (App Router)
- **React 19.2**
- **TypeScript**
- **Tailwind CSS 4+**
- **CSS3** with modern scroll-based transforms

## 📋 Design Philosophy

- **Clean and simple** - No heavy animations
- **Readable** - Focus on clarity
- **Parallax-focused** - The effect itself is the star

## 🎨 Implementation Details

The parallax effect is achieved using:
- Fixed positioning for layers
- Scroll event listeners with passive scrolling
- CSS transforms based on scroll position
- Different transform speeds for each layer

## 📦 Project Structure

```
src/
  app/
    layout.tsx          # Root layout
    page.tsx            # Landing page with carousel
    globals.css         # Global styles
  components/
    ParallaxCarousel.tsx # Main parallax component
```

## 🎯 Requirements Met

✅ Vertical scroll parallax carousel  
✅ Layered movement with specified speeds  
✅ Clean, simple, readable design  
✅ React component-based architecture  
✅ CSS3 with modern techniques  
✅ No heavy animations - parallax focus  

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

