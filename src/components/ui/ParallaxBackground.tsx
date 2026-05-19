import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

const ParallaxBackground = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const x = useSpring((mousePos.x - window.innerWidth / 2) / 25, { damping: 20 });
  const y = useSpring((mousePos.y - window.innerHeight / 2) / 25, { damping: 20 });

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <motion.div 
        style={{ x, y }}
        className="absolute inset-[-10%] opacity-20"
      >
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundImage: `radial-gradient(circle at 1px 1px, #6366f1 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} 
        />
        
        {/* Linear Gradient Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </motion.div>
      
      {/* Dynamic Glow */}
      <motion.div
        className="absolute w-[800px] h-[800px] bg-indigo-500/10 blur-[150px] rounded-full"
        animate={{
          left: mousePos.x - 400,
          top: mousePos.y - 400,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 200 }}
      />
    </div>
  );
};

export default ParallaxBackground;
