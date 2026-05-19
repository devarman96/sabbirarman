import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ExternalLink, Github, Monitor, Smartphone, Tablet, Globe } from 'lucide-react';

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

const ProjectShowcase = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        const found = data.find((p: Project) => p.id === Number(id));
        setProject(found);
      });
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-indigo-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500/30">
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/')}
              className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="font-bold text-lg leading-none">{project.title}</h1>
              <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">{project.category}</span>
            </div>
          </div>

          {/* View Modes */}
          <div className="hidden md:flex items-center bg-slate-950/50 rounded-xl p-1 border border-slate-800">
            <button 
              onClick={() => setViewMode('desktop')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'desktop' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <Monitor size={18} />
            </button>
            <button 
              onClick={() => setViewMode('tablet')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'tablet' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <Tablet size={18} />
            </button>
            <button 
              onClick={() => setViewMode('mobile')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'mobile' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <Smartphone size={18} />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href={project.githubLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl transition-all border border-slate-700"
            >
              <Github size={20} />
            </a>
            <button className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20 active:scale-95">
              <Globe size={18} />
              <span>Visit Actual Site</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="pt-24 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr,350px] gap-12">
          
          {/* Main Preview Container */}
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Project Live Preview</h2>
                <p className="text-slate-400">Interactive demonstration of the {project.title} interface.</p>
              </div>
            </div>

            {/* Browser Mockup */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mx-auto transition-all duration-500 ease-in-out border border-slate-800 rounded-2xl overflow-hidden bg-slate-900 shadow-2xl ${
                viewMode === 'desktop' ? 'w-full' : 
                viewMode === 'tablet' ? 'max-w-[768px]' : 'max-w-[375px]'
              }`}
            >
              {/* Browser Bar */}
              <div className="bg-slate-800/80 px-4 py-3 flex items-center gap-3 border-b border-slate-700/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex-1 bg-slate-950/50 rounded-lg py-1 px-4 text-xs text-slate-500 font-mono flex items-center gap-2">
                  <Globe size={12} />
                  <span>https://{project.title.toLowerCase().replace(/\s+/g, '-')}.portfolio.dev</span>
                </div>
              </div>

              {/* Mock Website Content */}
              <div className="bg-white min-h-[600px] max-h-[80vh] overflow-y-auto scrollbar-hide relative group">
                {/* Hero Section of the Project */}
                <div className="relative aspect-video">
                  <img src={project.image} alt="Hero" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-10 text-center">
                    <motion.h3 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-2xl"
                    >
                      {project.title}
                    </motion.h3>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-white/80 text-lg max-w-xl hidden md:block"
                    >
                      Experience the next generation of {project.category.toLowerCase()} with our cutting-edge solution.
                    </motion.p>
                  </div>
                </div>

                {/* Features Placeholder */}
                <div className="p-10 text-slate-900 space-y-12">
                  <div className="grid md:grid-cols-3 gap-8">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="space-y-4">
                        <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600">
                          <Globe size={24} />
                        </div>
                        <h4 className="font-bold text-xl">Core Feature {i}</h4>
                        <p className="text-slate-500 text-sm leading-relaxed">
                          Implementing state-of-the-art architectures using {project.tech[i % project.tech.length]} for maximum efficiency.
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Content Block */}
                  <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                      <h3 className="text-3xl font-bold tracking-tight">Technical Overview</h3>
                      <p className="text-slate-600 leading-relaxed">
                        {project.description}
                      </p>
                      <ul className="space-y-3">
                        {project.tech.map(t => (
                          <li key={t} className="flex items-center gap-3 text-slate-700 font-medium">
                            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="aspect-square bg-slate-100 rounded-3xl overflow-hidden border">
                      <img src={project.image} alt="Detail" className="w-full h-full object-cover grayscale opacity-50 transition-all hover:grayscale-0 hover:opacity-100" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar UI */}
          <aside className="space-y-8 h-fit lg:sticky lg:top-24">
            <div className="bg-slate-900/50 rounded-3xl p-8 border border-slate-800 space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                Project Stats
              </h3>
              
              <div className="grid gap-4">
                <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800">
                  <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest block mb-1">Complexity</span>
                  <div className="flex gap-1.5 mt-2">
                    {[1, 2, 3, 4, 5].map(i => (
                      <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= 4 ? 'bg-indigo-500' : 'bg-slate-800'}`} />
                    ))}
                  </div>
                </div>
                
                <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800">
                  <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest block mb-1">Status</span>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                    <span className="font-bold text-sm">Production Ready</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-800/50">
                <h4 className="font-bold text-sm text-slate-300">Share Project</h4>
                <div className="flex gap-2">
                  {['Twitter', 'LinkedIn', 'Copy'].map(social => (
                    <button key={social} className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-xl transition-all border border-slate-700">
                      {social}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-3xl transition-transform group-hover:scale-150 duration-700" />
              <h3 className="text-2xl font-black mb-2">Hire Me?</h3>
              <p className="text-white/80 text-sm mb-6 leading-relaxed">Like this project? Let's discuss your next big idea together.</p>
              <button 
                onClick={() => navigate('/#contact')}
                className="w-full py-4 bg-white text-indigo-600 rounded-2xl font-bold transition-all hover:scale-[1.02] active:scale-95 shadow-xl"
              >
                Start a Project
              </button>
            </div>
          </aside>

        </div>
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-10 text-center">
        <p className="text-slate-500 text-xs uppercase tracking-[0.2em]">Designed by Sabbir Arman &copy; 2024</p>
      </footer>
    </div>
  );
};

export default ProjectShowcase;
