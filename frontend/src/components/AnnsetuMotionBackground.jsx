import React from 'react';
import { 
  Heart, 
  Utensils, 
  Leaf, 
  Package, 
  HandHeart, 
  Building2, 
  Truck, 
  Users, 
  Sparkles, 
  Globe,
  CircleDot
} from 'lucide-react';

const AnnsetuMotionBackground = ({ type = 'default' }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none annsetu-motion-bg-container">
      
      {/* 1. SOFT GRADIENT BLOBS (Deep Green, Warm Orange, Golden Yellow, Cream) */}
      <div className="absolute -top-20 -left-20 w-96 sm:w-[32rem] h-96 sm:h-[32rem] bg-orange-400/20 rounded-full filter blur-3xl animate-blob-1 mobile-bg-opacity"></div>
      <div className="absolute top-1/3 -right-20 w-[28rem] sm:w-[36rem] h-[28rem] sm:h-[36rem] bg-emerald-500/15 rounded-full filter blur-3xl animate-blob-2 mobile-bg-opacity"></div>
      <div className="absolute bottom-10 left-1/4 w-96 sm:w-[30rem] h-96 sm:h-[30rem] bg-amber-400/15 rounded-full filter blur-3xl animate-blob-3 mobile-bg-opacity"></div>
      
      {/* 2. PAGE SPECIFIC ANIMATED LAYER */}

      {/* --- HOMEPAGE BACKGROUND LAYER --- */}
      {type === 'home' && (
        <>
          {/* Floating Theme Icons */}
          <div className="absolute top-36 left-12 text-orange-500/25 animate-float-icon-1 hidden sm:block">
            <Utensils className="w-16 h-16" />
          </div>
          <div className="absolute top-1/2 right-16 text-emerald-600/25 animate-float-icon-2 hidden sm:block">
            <HandHeart className="w-20 h-20" />
          </div>
          <div className="absolute top-3/4 left-1/3 text-amber-500/25 animate-float-icon-3 hidden sm:block">
            <Package className="w-14 h-14" />
          </div>
          <div className="absolute top-1/4 right-1/4 text-red-400/25 animate-float-icon-1 hide-on-mobile-bg">
            <Heart className="w-12 h-12 fill-red-400/10" />
          </div>
          <div className="absolute bottom-40 right-12 text-green-600/25 animate-float-icon-2 hide-on-mobile-bg">
            <Leaf className="w-14 h-14" />
          </div>

          {/* Slow Circular Glow Rings */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full border-2 border-orange-400/20 animate-pulse-ring hide-on-mobile-bg"></div>
          <div className="absolute top-2/3 right-1/3 w-64 h-64 rounded-full border border-emerald-400/20 animate-pulse-ring hide-on-mobile-bg"></div>

          {/* Connected Network Nodes Overlay (Donor -> Annsetu -> NGO -> People Served) */}
          <svg className="absolute inset-0 w-full h-full opacity-30 hide-on-mobile-bg" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="homeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f97316" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#064e3b" stopOpacity="0.4" />
              </linearGradient>
            </defs>

            <path 
              d="M 100,300 Q 400,150 800,350 T 1400,250" 
              fill="none" 
              stroke="url(#homeGrad)" 
              strokeWidth="2" 
              strokeDasharray="8,8"
              className="animate-dash-flow" 
            />
            
            <circle cx="100" cy="300" r="5" fill="#f97316" className="animate-travel-dot" />
            <circle cx="400" cy="150" r="6" fill="#f59e0b" className="animate-travel-dot" />
            <circle cx="800" cy="350" r="5" fill="#064e3b" className="animate-travel-dot" />
            <circle cx="1400" cy="250" r="6" fill="#f97316" className="animate-travel-dot" />
          </svg>
        </>
      )}

      {/* --- DONOR DASHBOARD BACKGROUND LAYER --- */}
      {type === 'donor' && (
        <>
          <div className="absolute top-32 right-12 text-orange-500/25 animate-float-icon-1 hidden sm:block">
            <Package className="w-16 h-16" />
          </div>
          <div className="absolute top-1/2 left-8 text-red-400/25 animate-float-icon-2 hidden sm:block">
            <Heart className="w-14 h-14 fill-red-400/10" />
          </div>
          <div className="absolute bottom-32 right-1/3 text-emerald-600/25 animate-float-icon-3 hidden sm:block">
            <Utensils className="w-16 h-16" />
          </div>
          <div className="absolute top-2/3 right-10 text-amber-500/20 animate-float-icon-1 hide-on-mobile-bg">
            <Leaf className="w-12 h-12" />
          </div>
        </>
      )}

      {/* --- NGO DASHBOARD BACKGROUND LAYER --- */}
      {type === 'ngo' && (
        <>
          <div className="absolute top-28 left-10 text-green-700/25 animate-float-icon-1 hidden sm:block">
            <Building2 className="w-16 h-16" />
          </div>
          <div className="absolute bottom-40 right-10 text-orange-500/25 animate-float-icon-2 hidden sm:block">
            <HandHeart className="w-16 h-16" />
          </div>

          {/* Connection Nodes Network Overlay */}
          <svg className="absolute inset-0 w-full h-full opacity-35 hide-on-mobile-bg" xmlns="http://www.w3.org/2000/svg">
            <line x1="150" y1="200" x2="450" y2="350" stroke="#064e3b" strokeWidth="2" strokeDasharray="6,6" className="animate-dash-flow" />
            <line x1="450" y1="350" x2="850" y2="220" stroke="#f97316" strokeWidth="2" strokeDasharray="6,6" className="animate-dash-flow" />
            <line x1="850" y1="220" x2="1200" y2="400" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6,6" className="animate-dash-flow" />

            <circle cx="150" cy="200" r="6" fill="#064e3b" className="animate-travel-dot" />
            <circle cx="450" cy="350" r="7" fill="#f97316" className="animate-travel-dot" />
            <circle cx="850" cy="220" r="6" fill="#f59e0b" className="animate-travel-dot" />
            <circle cx="1200" cy="400" r="7" fill="#064e3b" className="animate-travel-dot" />
          </svg>
        </>
      )}

      {/* --- TRACKING DASHBOARD BACKGROUND LAYER --- */}
      {type === 'track' && (
        <>
          <div className="absolute top-36 right-16 text-blue-600/20 animate-float-icon-1 hidden sm:block">
            <Truck className="w-16 h-16" />
          </div>

          {/* Animated Route Line from Donor -> NGO -> Delivery */}
          <svg className="absolute inset-0 w-full h-full opacity-40 hide-on-mobile-bg" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M 120,250 C 350,100 650,450 950,200 C 1150,100 1350,300 1550,220" 
              fill="none" 
              stroke="#f97316" 
              strokeWidth="2.5" 
              strokeDasharray="10,8"
              className="animate-dash-flow"
            />
            
            <circle cx="120" cy="250" r="7" fill="#064e3b" />
            <circle cx="950" cy="200" r="8" fill="#f59e0b" />
            <circle cx="1550" cy="220" r="7" fill="#f97316" />
            
            {/* Traveling dots */}
            <circle cx="450" cy="220" r="5" fill="#f97316" className="animate-travel-dot" />
            <circle cx="1250" cy="180" r="5" fill="#064e3b" className="animate-travel-dot" />
          </svg>
        </>
      )}

      {/* --- ADMIN DASHBOARD BACKGROUND LAYER --- */}
      {type === 'admin' && (
        <>
          {/* Subtle Data-Grid & Dot Pattern Overlay */}
          <svg className="absolute inset-0 w-full h-full opacity-20 hide-on-mobile-bg" xmlns="http://www.w3.org/2000/svg">
            <pattern id="adminGrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#064e3b" strokeWidth="0.75" />
              <circle cx="30" cy="30" r="1.5" fill="#f97316" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#adminGrid)" />
          </svg>

          <div className="absolute top-40 left-12 text-purple-600/20 animate-float-icon-1 hidden sm:block">
            <Globe className="w-16 h-16" />
          </div>
        </>
      )}

      {/* --- IMPACT PAGE BACKGROUND LAYER --- */}
      {type === 'impact' && (
        <>
          <div className="absolute top-36 left-12 text-red-500/25 animate-float-icon-1 hidden sm:block">
            <Heart className="w-20 h-20 fill-red-400/10" />
          </div>
          <div className="absolute top-1/2 right-12 text-amber-500/25 animate-float-icon-2 hidden sm:block">
            <Utensils className="w-16 h-16" />
          </div>
          <div className="absolute bottom-32 left-1/3 text-green-600/25 animate-float-icon-3 hidden sm:block">
            <Leaf className="w-16 h-16" />
          </div>
        </>
      )}

    </div>
  );
};

export default AnnsetuMotionBackground;
