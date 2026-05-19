import { motion } from 'motion/react';
import { Target, Zap, Cpu, Code2, User } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';

const About = () => {
  const stats = [
    { label: "Systems Built", value: "25+", icon: Zap },
    { label: "Role", value: "Software Engineer", icon: Code2 },
    { label: "Specialization", value: "Scalable Arch", icon: Cpu },
  ];

  return (
    <section id="about" className="py-24 bg-slate-950 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        <SectionHeader title="Technical" highlight="Identity" subtitle="Professional Profile" align="left" className="mb-12" />
        
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4 tracking-tight"
            >
              Building the future of <br />
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">software ecosystems.</span>
            </motion.h2>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-6 text-lg text-slate-400 leading-relaxed max-w-xl"
            >
              <p>
                As a **Software Engineer at Samsung R&D**, I focus on developing high-performance applications and innovative system architectures. My work involves optimizing complex workflows and contributing to large-scale technology frameworks.
              </p>
              <p>
                I thrive at the intersection of technical precision and creative problem-solving, ensuring that every line of code contributes to a robust, scalable, and user-centric digital experience.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i + 0.2 }}
                  className="p-5 rounded-2xl bg-slate-900/40 backdrop-blur-sm border border-slate-800 hover:border-indigo-500/30 transition-all group"
                >
                  <stat.icon className="text-indigo-500 mb-3 group-hover:scale-110 transition-transform" size={20} />
                  <div className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors uppercase tracking-tight">{stat.value}</div>
                  <div className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em] mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative lg:max-w-md ml-auto group"
          >
            {/* Image Container with Backdrop Glow */}
            <div className="absolute -inset-4 bg-indigo-500/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
            
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
              {/* Overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60 z-10" />
              
              {/* Placeholder/User Image */}
              <img 
                src="https://i.postimg.cc/VNzvpzcg/my-profile.png" 
                alt="Sabbir Arman" 
                className="w-full h-full object-cover transition-all duration-700 scale-110 group-hover:scale-100"
              />

              {/* Status Badge */}
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <div className="bg-slate-900/80 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Currently At</p>
                    <p className="text-sm font-bold text-white">Samsung R&D</p>
                  </div>
                  <div className="flex items-center gap-2 bg-indigo-500/20 px-3 py-1 rounded-full border border-indigo-500/30">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-bold text-indigo-400 uppercase">Active</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 border-t-2 border-r-2 border-indigo-500/20 rounded-tr-3xl -z-10 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 border-b-2 border-l-2 border-indigo-500/20 rounded-bl-3xl -z-10 group-hover:-translate-x-2 group-hover:translate-y-2 transition-transform duration-500" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
