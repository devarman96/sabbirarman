import { motion, AnimatePresence } from 'motion/react';
import Logo from './Logo';

interface PageLoaderProps {
  isLoading: boolean;
}

const PageLoader = ({ isLoading }: PageLoaderProps) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950"
        >
          <div className="relative flex flex-col items-center">
            {/* Background Pulsing Circles */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ 
                scale: [0.5, 1.2, 0.8],
                opacity: [0, 0.3, 0.1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"
            />
            
            {/* The Logo with Animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8,
                ease: "easeOut"
              }}
              className="relative z-10"
            >
              <Logo size={80} />
            </motion.div>

            {/* Bottom Progress Bar (Visual only) */}
            <div className="mt-12 w-48 h-[2px] bg-slate-900 rounded-full overflow-hidden">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-full h-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent"
              />
            </div>

            {/* Subtle Text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-slate-500 text-[10px] uppercase tracking-[0.4em] font-mono"
            >
              Initializing Digital Experience
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;
