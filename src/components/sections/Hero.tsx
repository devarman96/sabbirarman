import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import Hero3D from '@/src/components/3d/Hero3D';
import Typewriter from 'typewriter-effect';

const Hero = () => {
  return (
    <section id="hero" className="relative h-screen w-full flex items-center overflow-hidden bg-slate-950 px-8 lg:px-24">
      <Hero3D />
      
      <div className="relative z-10 w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left relative"
        >
          <span className="inline-block px-3 py-1 mt-12 mb-6 text-[10px] font-bold tracking-[0.2em] text-indigo-400 uppercase bg-indigo-500/10 border border-indigo-500/20 rounded-full">
            Available for new opportunities
          </span>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight leading-[1.1]">
            Hi, I'm <br />
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Sabbir Arman
            </span>
          </h1>

          <div className="text-2xl md:text-3xl font-medium text-slate-300 mb-8 flex flex-wrap gap-x-2">
            <span>I'm a</span>
            <span className="text-indigo-400">
              <Typewriter
                options={{
                  strings: [
                    'Software Engineer',
                    'Python Programmer',
                    'Backend Engineer',
                    'Full-Stack Developer',
                    'Competitive Programmer',
                    'Problem Solver'
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 75,
                  deleteSpeed: 50,
                }}
              />
            </span>
          </div>

          <p className="text-lg text-slate-400 mb-10 max-w-lg leading-relaxed">
            Architecting robust network architectures and high-performance digital experiences. 
            Focused on high-availability infrastructure and streamlined technical operations.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a
              href="#projects"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 hover:scale-105 transition-all shadow-lg shadow-indigo-500/20"
            >
              Explore Projects
            </a>
            <a
              href="#contact"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 text-white border border-slate-800 font-bold hover:bg-slate-800 transition-colors"
            >
              Contact Me
            </a>
          </div>
        </motion.div>

        {/* Right side is intentionally left for 3D elements in Hero3D */}
        <div className="hidden lg:block h-[600px] pointer-events-none" />
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500"
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
};

export default Hero;
