import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, ChevronRight, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import SectionHeader from '../ui/SectionHeader';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tech: string[];
  image: string;
  liveLink: string;
  githubLink: string;
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => setProjects(data));
  }, []);

  const categories = ['All', ...new Set(projects.map(p => p.category))];
  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-24 bg-slate-900 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionHeader 
          title="Digital" 
          highlight="Masterpieces" 
          subtitle="Portfolio" 
        />

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 border active:scale-95",
                filter === cat
                  ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                  : "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedProject(project)}
                className="cursor-pointer group relative bg-slate-800/30 backdrop-blur-sm rounded-[2rem] overflow-hidden border border-slate-800 hover:border-indigo-500/40 transition-all duration-500 shadow-lg hover:shadow-indigo-500/10"
              >
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
                  
                  {/* Floating Tech Badges on Image */}
                  <div className="absolute bottom-3 left-4 flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 2).map((t) => (
                      <span key={t} className="text-[10px] font-bold text-white bg-indigo-600/80 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10 uppercase tracking-tighter">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* HOVER OVERLAY */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-slate-950/40 backdrop-blur-[1px]">
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileHover={{ scale: 1.1 }}
                      animate={selectedProject?.id === project.id ? { scale: 1.1, opacity: 1 } : {}}
                      className="w-12 h-12 rounded-full bg-white text-indigo-600 flex items-center justify-center shadow-2xl"
                    >
                      <ChevronRight size={24} />
                    </motion.div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400/80">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              layoutId={`project-${selectedProject.id}`}
              className="relative w-full max-w-4xl bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-800 flex flex-col md:flex-row max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-20 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-md"
              >
                <X size={24} />
              </button>
              
              <div className="md:w-1/2 overflow-hidden h-64 md:h-auto">
                <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
              </div>
              
              <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto scrollbar-hide">
                <div className="mb-8">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-widest border border-indigo-500/20 mb-4">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">{selectedProject.title}</h3>
                  <p className="text-slate-400 text-lg leading-relaxed">{selectedProject.description}</p>
                </div>

                <div className="mb-10">
                  <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full" /> Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map(t => (
                      <span key={t} className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 rounded-lg border border-slate-700">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <Link 
                    to={`/project/${selectedProject.id}`}
                    className="flex-1 flex items-center justify-center gap-2 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-indigo-500/20"
                  >
                    <ExternalLink size={18} /> Live Demo
                  </Link>
                  <a 
                    href={selectedProject.githubLink}
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="flex-1 flex items-center justify-center gap-2 py-4 bg-slate-800 text-white rounded-2xl font-bold hover:bg-slate-700 transition-all border border-slate-700 hover:scale-[1.02] active:scale-95"
                  >
                    <Github size={18} /> Source
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
