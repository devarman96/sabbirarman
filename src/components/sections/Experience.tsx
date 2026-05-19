import { motion } from 'motion/react';
import { Briefcase, Code, Globe, GraduationCap, School } from 'lucide-react';
import { EXPERIENCE, EDUCATION } from '@/src/constants';
import SectionHeader from '../ui/SectionHeader';

const icons = {
  briefcase: <Briefcase size={20} />,
  code: <Code size={20} />,
  globe: <Globe size={20} />,
  graduation: <GraduationCap size={20} />,
  school: <School size={20} />,
};

const TimelineItem = ({ item, index, type }: { item: any, index: number, type: 'job' | 'edu' }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="relative pl-8 sm:pl-10 pb-12 last:pb-0"
  >
    {/* Line */}
    <div className="absolute left-0 top-0 bottom-0 w-px bg-slate-800" />
    
    {/* Dot/Icon */}
    <div className="absolute left-0 top-0 -translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full border border-slate-700 bg-slate-900 text-indigo-500 shadow-lg z-10">
      {icons[item.icon as keyof typeof icons] || icons.briefcase}
    </div>

    <div className="p-5 sm:p-6 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-indigo-500/30 transition-all shadow-xl group hover:bg-slate-900 overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
        <div>
          <h4 className="font-bold text-white text-lg group-hover:text-indigo-400 transition-colors leading-tight">
            {type === 'job' ? item.company : item.institution}
          </h4>
          <div className="text-indigo-400 text-sm font-medium mt-1">
            {type === 'job' ? item.role : item.degree}
          </div>
        </div>
        <time className="shrink-0 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-800/50 px-2.5 py-1.5 rounded-lg border border-slate-700/50 h-fit self-start sm:self-auto">
          {item.duration}
        </time>
      </div>
      <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-line">
        {item.description}
      </p>
    </div>
  </motion.div>
);

const Experience = () => {
  return (
    <section id="experience" className="py-24 bg-slate-950 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader 
          title="Professional" 
          highlight="Timeline" 
          subtitle="Experience" 
        />

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Work Experience */}
          <div className="space-y-10">
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-bold text-white flex items-center gap-4 mb-12"
            >
              <div className="p-2 bg-indigo-500/10 rounded-lg">
                <Briefcase className="text-indigo-500" size={24} />
              </div>
              Job Experience
            </motion.h3>
            <div className="ml-4">
              {EXPERIENCE.map((exp, index) => (
                <TimelineItem key={exp.company} item={exp} index={index} type="job" />
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-10">
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold text-white flex items-center gap-4 mb-12"
            >
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <GraduationCap className="text-purple-500" size={24} />
              </div>
              Education Details
            </motion.h3>
            <div className="ml-4">
              {EDUCATION.map((edu, index) => (
                <TimelineItem key={edu.institution} item={edu} index={index + 3} type="edu" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
