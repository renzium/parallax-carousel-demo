"use client";

import { useEffect, useRef, useState } from "react";

interface ParallaxLayer {
  speed: number;
  content: React.ReactNode;
  className?: string;
}

export default function ParallaxCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        setScrollY(window.scrollY);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Define layers with their speeds
  const layers: ParallaxLayer[] = [
    {
      speed: 0.3, // Background skyline: 0.3x
      content: (
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500 via-blue-400 to-blue-300">
          {/* Clouds */}
          <div className="absolute top-20 left-10 w-32 h-16 bg-white/30 rounded-full blur-sm"></div>
          <div className="absolute top-32 right-20 w-40 h-20 bg-white/25 rounded-full blur-sm"></div>
          <div className="absolute top-16 left-1/3 w-36 h-18 bg-white/20 rounded-full blur-sm"></div>
          
          {/* Distant skyline silhouette */}
          <div className="absolute bottom-0 left-0 right-0 h-80">
            <svg className="w-full h-full" viewBox="0 0 1200 300" preserveAspectRatio="none">
              <defs>
                <linearGradient id="skylineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#1e293b" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#0f172a" stopOpacity="0.6" />
                </linearGradient>
              </defs>
              <polygon 
                points="0,300 80,200 150,250 220,150 300,220 380,120 460,180 540,100 620,160 700,80 780,140 860,60 940,120 1020,40 1100,100 1180,20 1200,80 1200,300 0,300" 
                fill="url(#skylineGrad)" 
              />
            </svg>
          </div>
        </div>
      ),
      className: "z-0",
    },
    {
      speed: 1.0, // Buildings: 1.0x (normal scroll)
      content: (
        <div className="absolute inset-0 flex items-end justify-center">
          <div className="grid grid-cols-5 gap-3 mb-0 w-full max-w-6xl px-6 pb-0">
            {[
              { height: 180, color: "from-slate-600 to-slate-700", windows: 6 },
              { height: 240, color: "from-slate-500 to-slate-600", windows: 8 },
              { height: 280, color: "from-slate-600 to-slate-800", windows: 10 },
              { height: 200, color: "from-slate-500 to-slate-700", windows: 7 },
              { height: 220, color: "from-slate-600 to-slate-700", windows: 8 },
            ].map((building, i) => (
              <div
                key={i}
                className={`bg-gradient-to-t ${building.color} rounded-t-xl shadow-2xl relative overflow-hidden`}
                style={{
                  height: `${building.height}px`,
                }}
              >
                {/* Building structure */}
                <div className="h-full flex flex-col p-2">
                  {/* Windows grid */}
                  <div className="grid grid-cols-2 gap-1.5 flex-1 py-2">
                    {Array.from({ length: building.windows }).map((_, j) => {
                      // Deterministic lighting based on position
                      const isLit = (i * 10 + j) % 3 !== 0;
                      return (
                        <div
                          key={j}
                          className={`rounded-sm ${
                            isLit ? "bg-yellow-300" : "bg-slate-800"
                          } shadow-inner`}
                          style={{ 
                            minHeight: "24px",
                            opacity: isLit ? 0.8 : 0.2
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
                
                {/* Building top accent */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400"></div>
              </div>
            ))}
          </div>
        </div>
      ),
      className: "z-10",
    },
    {
      speed: 0.5, // Cars and trucks: 0.5x
      content: (
        <div className="absolute bottom-16 left-0 right-0 flex justify-between items-end px-8">
          {/* Car 1 - Blue sedan */}
          <div className="relative" style={{ transform: "translateX(-80px)" }}>
            <div className="relative">
              <div className="w-28 h-14 bg-gradient-to-b from-blue-500 to-blue-600 rounded-lg shadow-lg relative overflow-hidden">
                <div className="absolute top-1 left-2 right-2 h-7 bg-gradient-to-b from-blue-300 to-blue-400 rounded-t-md"></div>
                <div className="absolute top-2 left-3 w-2 h-2 bg-blue-200 rounded-full"></div>
                <div className="absolute top-2 right-3 w-2 h-2 bg-blue-200 rounded-full"></div>
                <div className="absolute bottom-0 left-2 w-9 h-5 bg-gray-900 rounded-full shadow-inner"></div>
                <div className="absolute bottom-0 right-2 w-9 h-5 bg-gray-900 rounded-full shadow-inner"></div>
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-700"></div>
              </div>
            </div>
          </div>
          
          {/* Truck - Red delivery truck */}
          <div className="relative" style={{ transform: "translateX(60px)" }}>
            <div className="relative">
              <div className="w-36 h-18 bg-gradient-to-b from-red-500 to-red-600 rounded-lg shadow-xl relative overflow-hidden">
                <div className="absolute top-2 left-2 w-20 h-9 bg-gradient-to-b from-red-300 to-red-400 rounded-t-md"></div>
                <div className="absolute top-3 left-4 w-3 h-3 bg-red-100 rounded-full"></div>
                <div className="absolute top-3 right-4 w-3 h-3 bg-red-100 rounded-full"></div>
                <div className="absolute bottom-0 left-3 w-11 h-6 bg-gray-900 rounded-full shadow-inner"></div>
                <div className="absolute bottom-0 right-3 w-11 h-6 bg-gray-900 rounded-full shadow-inner"></div>
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gray-700"></div>
                <div className="absolute top-0 right-0 w-8 h-6 bg-red-700 rounded-tr-lg"></div>
              </div>
            </div>
          </div>
          
          {/* Car 2 - Green compact */}
          <div className="relative" style={{ transform: "translateX(-40px)" }}>
            <div className="relative">
              <div className="w-24 h-12 bg-gradient-to-b from-emerald-500 to-emerald-600 rounded-lg shadow-lg relative overflow-hidden">
                <div className="absolute top-1 left-2 right-2 h-6 bg-gradient-to-b from-emerald-300 to-emerald-400 rounded-t-md"></div>
                <div className="absolute top-2 left-3 w-1.5 h-1.5 bg-emerald-100 rounded-full"></div>
                <div className="absolute top-2 right-3 w-1.5 h-1.5 bg-emerald-100 rounded-full"></div>
                <div className="absolute bottom-0 left-2 w-8 h-4 bg-gray-900 rounded-full shadow-inner"></div>
                <div className="absolute bottom-0 right-2 w-8 h-4 bg-gray-900 rounded-full shadow-inner"></div>
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-14 h-1 bg-gray-700"></div>
              </div>
            </div>
          </div>
        </div>
      ),
      className: "z-20",
    },
    {
      speed: 0.5, // Airplane: 0.5x
      content: (
        <div className="absolute top-24 right-16">
          <div className="relative">
            <svg width="140" height="70" viewBox="0 0 140 70" className="drop-shadow-2xl">
              <defs>
                <linearGradient id="planeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#64748b" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#475569" stopOpacity="0.9" />
                </linearGradient>
              </defs>
              {/* Main body */}
              <ellipse cx="70" cy="35" rx="50" ry="12" fill="url(#planeGrad)" />
              {/* Nose */}
              <ellipse cx="20" cy="35" rx="8" ry="10" fill="url(#planeGrad)" />
              {/* Tail */}
              <path d="M100 35 L120 25 L125 30 L120 35 Z" fill="url(#planeGrad)" />
              <path d="M100 35 L120 45 L125 40 L120 35 Z" fill="url(#planeGrad)" />
              {/* Windows */}
              <circle cx="50" cy="35" r="4" fill="#e2e8f0" opacity="0.9" />
              <circle cx="60" cy="35" r="4" fill="#e2e8f0" opacity="0.9" />
              <circle cx="70" cy="35" r="4" fill="#e2e8f0" opacity="0.9" />
              {/* Wings */}
              <ellipse cx="70" cy="35" rx="35" ry="3" fill="url(#planeGrad)" opacity="0.7" />
            </svg>
          </div>
        </div>
      ),
      className: "z-[15]",
    },
  ];

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden bg-white">
      {/* Parallax Container */}
      <div className="relative" style={{ height: "250vh" }}>
        {layers.map((layer, index) => (
          <div
            key={index}
            className={`fixed inset-0 ${layer.className || ""}`}
            style={{
              transform: `translateY(${scrollY * layer.speed}px)`,
              transition: "transform 0.1s ease-out",
            }}
          >
            {layer.content}
          </div>
        ))}
      </div>

      {/* Hero Section */}
      <div className="relative z-30 bg-gradient-to-b from-slate-50 via-white to-slate-100">
        <div className="min-h-screen flex items-center justify-center p-8 pt-32 border-b border-slate-200">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-6xl md:text-7xl font-extrabold mb-6 text-gray-900 text-shadow-lg">
                Parallax Carousel
              </h1>
              <p className="text-2xl md:text-3xl text-gray-700 mb-4 font-light">
                Vertical Scroll with Layered Parallax Movement
              </p>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Experience smooth, depth-creating parallax effects with precise layer speed control
              </p>
            </div>
            
            <div className="mt-12 bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-10 border border-slate-200">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Layer Speed Configuration</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-100">
                  <div className="text-3xl font-bold text-blue-600">0.3x</div>
                  <div>
                    <div className="font-semibold text-gray-900">Background Skyline</div>
                    <div className="text-sm text-gray-600">Slowest movement for depth</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg border border-slate-100">
                  <div className="text-3xl font-bold text-slate-600">1.0x</div>
                  <div>
                    <div className="font-semibold text-gray-900">Buildings</div>
                    <div className="text-sm text-gray-600">Normal scroll speed</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-lg border border-emerald-100">
                  <div className="text-3xl font-bold text-emerald-600">0.5x</div>
                  <div>
                    <div className="font-semibold text-gray-900">Cars & Trucks</div>
                    <div className="text-sm text-gray-600">Medium parallax speed</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg border border-amber-100">
                  <div className="text-3xl font-bold text-amber-600">0.5x</div>
                  <div>
                    <div className="font-semibold text-gray-900">Airplane</div>
                    <div className="text-sm text-gray-600">Medium parallax speed</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 animate-bounce">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 border border-slate-200 shadow-sm text-gray-700 font-medium">
                ↓ Scroll to experience the effect ↓
              </div>
            </div>
          </div>
        </div>

        {/* Feature Section 1 */}
        <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-b from-blue-50 via-white to-indigo-50 border-t border-b border-slate-200">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-5xl font-bold mb-6 text-gray-900">
                  Clean & Simple Design
                </h2>
                <p className="text-xl text-gray-700 mb-4 leading-relaxed">
                  The parallax effect is the star of the show. No heavy animations or distractions—just smooth, elegant layered movement that creates visual depth and engagement.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Built with React, Next.js, and modern CSS3 techniques for optimal performance and maintainability.
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8 shadow-xl border border-white/60">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 font-medium">React Component Architecture</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 font-medium">TypeScript for Type Safety</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 font-medium">CSS3 Transforms & Performance</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 font-medium">Responsive & Accessible</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Section 2 */}
        <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-b from-slate-50 via-white to-slate-100 border-t border-b border-slate-200">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-5xl font-bold mb-6 text-gray-900">
              Precise Layer Control
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Each element moves at its designated speed, creating a natural sense of depth and movement. The effect is subtle yet captivating, drawing users into the experience.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 shadow-lg border border-blue-100">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Precision</h3>
                <p className="text-gray-600">Exact speed ratios for each layer</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 shadow-lg border border-purple-100">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Performance</h3>
                <p className="text-gray-600">Smooth 60fps scrolling experience</p>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 shadow-lg border border-emerald-100">
                <div className="text-4xl mb-4">✨</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Elegance</h3>
                <p className="text-gray-600">Clean, readable, professional design</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white border-t border-slate-800">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-shadow-lg">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
              This parallax carousel demonstrates the core differentiator for your platform. Clean, performant, and ready for production.
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <p className="text-lg text-gray-200">
                Built with <span className="font-semibold text-white">React</span>, <span className="font-semibold text-white">Next.js</span>, and <span className="font-semibold text-white">TypeScript</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

