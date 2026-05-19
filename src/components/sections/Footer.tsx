import { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ArrowUpCircle, ExternalLink, MapPin, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import Logo from '../ui/Logo';
import { NAV_LINKS } from '@/src/constants';

const Footer = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const dhakaTime = time.toLocaleTimeString('en-US', {
    timeZone: 'Asia/Dhaka',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socials = [
    { icon: <Github size={20} />, href: "https://github.com/sabbirarmaan96", label: "GitHub" },
    { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/sabbirarmaan96", label: "LinkedIn" },
    { icon: <Mail size={20} />, href: "mailto:sabbirarmanbd99@gmail.com", label: "Email" },
  ];

  return (
    <footer className="relative bg-slate-950 pt-32 pb-10 px-6 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-indigo-500/10 blur-[120px] rounded-full -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Top Section: CTA */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-28">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-[1.1]">
              Ready to bring your <br />
              <span className="text-indigo-400">ideas to life?</span>
            </h2>
            <p className="mt-6 text-slate-400 text-lg max-w-md leading-relaxed">
              I'm currently available for freelance projects and full-time inquiries. 
              Let's build something exceptional together.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-start lg:items-end gap-8"
          >
            <a 
              href="mailto:sabbirarmanbd99@gmail.com"
              className="group relative inline-flex items-center gap-4 bg-white text-slate-950 px-8 py-5 rounded-2xl font-bold text-xl hover:bg-indigo-500 hover:text-white transition-all duration-500 shadow-2xl shadow-white/5"
            >
              Start a Conversation
              <div className="w-10 h-10 bg-slate-950/10 group-hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors">
                <ExternalLink size={20} />
              </div>
            </a>
            
            <div className="flex flex-wrap gap-4">
              {socials.map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -5 }}
                  className="w-14 h-14 bg-slate-900/50 backdrop-blur-md border border-slate-800 flex items-center justify-center rounded-2xl text-slate-400 hover:text-indigo-400 hover:border-indigo-400/50 transition-all"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Middle Section: Links & Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 py-20 border-t border-slate-900">
          <div className="col-span-2">
            <Logo size={42} />
            <p className="mt-6 text-slate-500 text-sm max-w-xs leading-relaxed font-sans">
              Software Engineer at Samsung R&D, focused on building high-performance, 
              scalable digital products that solve real-world problems.
            </p>
            
            <div className="mt-8 flex flex-col gap-3">
              <div className="flex items-center gap-3 text-slate-400 text-sm">
                <MapPin size={16} className="text-indigo-500" />
                <span>Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400 text-sm">
                <Clock size={16} className="text-indigo-500" />
                <span>{dhakaTime} Local Time</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-sm">Sitemap</h4>
            <ul className="space-y-3">
              {NAV_LINKS.slice(0, 4).map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-slate-500 hover:text-white transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-sm">Resources</h4>
            <ul className="space-y-3 text-slate-500 text-sm">
              <li><a href="/Sabbir_Arman_CV.pdf" target="_blank" className="hover:text-white transition-colors">Download CV</a></li>
              <li><a href="#projects" className="hover:text-white transition-colors">Latest Work</a></li>
              <li><a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a></li>
              <li><a href="#tech" className="hover:text-white transition-colors">Tech Stack</a></li>
            </ul>
          </div>

          <div className="hidden lg:block">
            <h4 className="text-white font-bold mb-6 text-sm">Legal</h4>
            <ul className="space-y-3 text-slate-500 text-sm font-mono uppercase tracking-tighter">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>©{new Date().getFullYear()} Arman</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: Copyright & Scroll Top */}
        <div className="pt-10 border-t border-slate-900/50 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-slate-500 text-[10px] uppercase tracking-[0.2em] font-mono">
            <span>Sabbir Arman</span>
            <span className="w-1 h-1 bg-slate-800 rounded-full" />
            <span>sabbirarman.v1.0</span>
            <span className="w-1 h-1 bg-slate-800 rounded-full" />
            <span>Digital Portfolio</span>
          </div>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-3 bg-slate-900 border border-slate-800 py-3 px-6 rounded-full text-slate-400 hover:text-white hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all text-xs font-bold uppercase tracking-widest"
          >
            Back to top
            <ArrowUpCircle size={18} className="text-indigo-400 group-hover:animate-bounce" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
