import { motion } from 'motion/react';
import SectionHeader from '../ui/SectionHeader';
import { TECH_STACK } from '@/src/constants';

const StackCard = ({ tech, index }: { tech: { name: string, icon: string }, index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.05 }}
    whileHover={{ 
      y: -5,
      scale: 1.05,
      transition: { duration: 0.2 }
    }}
    className="flex flex-col items-center justify-center p-6 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl group hover:border-indigo-500/50 hover:bg-slate-900 transition-all shadow-xl active:scale-95"
  >
    <div className="w-12 h-12 mb-4 flex items-center justify-center relative">
      <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
      <img src={tech.icon} alt={tech.name} className="w-10 h-10 object-contain relative z-10 transition-transform duration-500 group-hover:scale-110" />
    </div>
    <span className="text-slate-400 text-sm font-medium group-hover:text-white transition-colors">
      {tech.name}
    </span>
  </motion.div>
);

const TechStack = () => {
  return (
    <section id="tech" className="py-24 bg-slate-950 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader 
          title="Top-Tier" 
          highlight="Tech Stack" 
          subtitle="Engineering"
        />

        <div className="space-y-16">
          {Object.entries(TECH_STACK).map(([category, items], catIndex) => (
            <div key={category}>
              <motion.h3 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-xl font-bold text-slate-300 mb-8 uppercase tracking-widest border-l-4 border-indigo-600 pl-4"
              >
                {category}
              </motion.h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
                {items.map((tech, index) => (
                  <StackCard key={tech.name} tech={tech} index={index + catIndex * 10} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
