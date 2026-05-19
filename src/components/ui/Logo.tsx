import { motion } from 'motion/react';

interface LogoProps {
  className?: string;
  size?: number;
}

const Logo = ({ className = "", size = 40 }: LogoProps) => {
  return (
    <div className={`flex items-center gap-3 group cursor-pointer ${className}`}>
      <div className="relative" style={{ width: size, height: size }}>
        {/* Animated Background Orbs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 bg-indigo-500/20 blur-lg rounded-xl"
        />
        
        {/* Geometric Icon Container */}
        <div className="relative w-full h-full bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center overflow-hidden shadow-2xl group-hover:border-indigo-500/50 transition-colors duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          
          {/* Stylized 'SA' SVG Icon */}
          <svg 
            width={size * 0.6} 
            height={size * 0.6} 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M4 16L12 4L20 16" 
              stroke="url(#logo-gradient)" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
            <path 
              d="M8 12H16" 
              stroke="white" 
              strokeWidth="2" 
              strokeLinecap="round" 
              className="group-hover:stroke-indigo-400 transition-colors"
            />
            <defs>
              <linearGradient id="logo-gradient" x1="4" y1="4" x2="20" y2="16" gradientUnits="userSpaceOnUse">
                <stop stopColor="#6366f1" />
                <stop offset="1" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      
      {/* Brand Name Text */}
      <div className="flex flex-col">
        <span className="text-xl font-black tracking-tighter text-white leading-none">
          SABBIR<span className="text-indigo-500">.</span>
        </span>
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] leading-tight mt-1">
          Engineer
        </span>
      </div>
    </div>
  );
};

export default Logo;
