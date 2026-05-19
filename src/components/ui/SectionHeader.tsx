import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  highlight?: string;
  align?: 'left' | 'center';
  className?: string;
}

const SectionHeader = ({ title, subtitle, highlight, align = 'center', className }: SectionHeaderProps) => {
  return (
    <div className={cn(
      "mb-20 space-y-4",
      align === 'center' ? "text-center mx-auto" : "text-left",
      className
    )}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-[10px] font-bold uppercase tracking-widest"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
        {subtitle || "Section"}
      </motion.div>
      
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight"
      >
        {title} {highlight && <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">{highlight}</span>}
      </motion.h2>

      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: '80px' }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className={cn(
          "h-1 bg-gradient-to-r from-indigo-500 to-indigo-500/0 rounded-full mt-6",
          align === 'center' ? "mx-auto" : ""
        )}
      />
    </div>
  );
};

export default SectionHeader;
