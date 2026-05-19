import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { Menu, X, Download, ChevronRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { NAV_LINKS, CV_URL } from '@/src/constants';
import Logo from '../ui/Logo';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Section tracking
      if (location.pathname === '/') {
        const sections = NAV_LINKS.map(link => link.href.replace('#', ''));
        const scrollPosition = window.scrollY + 100;

        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const { offsetTop, offsetHeight } = element;
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              setActiveSection(section);
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    if (location.pathname !== '/') {
      navigate('/');
      // Give react-router time to switch
      setTimeout(() => {
        const targetId = href.replace('#', '');
        const element = document.getElementById(targetId);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: elementPosition - offset,
            behavior: 'smooth'
          });
        }
      }, 100);
      return;
    }

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const isMobile = window.innerWidth < 768;
      
      if (isMobile && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
      
      // Calculate position
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      // Use a slight delay for mobile to let the menu close first
      const delay = isMobile ? 350 : 0;
      
      setTimeout(() => {
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }, delay);
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        isScrolled 
          ? "bg-slate-950/80 backdrop-blur-md border-slate-800 py-3" 
          : "bg-transparent border-transparent py-5"
      )}
    >
      {/* Scroll Progress Bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 origin-left"
        style={{ scaleX }}
      />

      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#hero" onClick={(e) => scrollToSection(e, '#hero')}>
          <Logo size={42} />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={cn(
                  "text-sm font-medium transition-all relative py-1",
                  isActive ? "text-white" : "text-slate-400 hover:text-white"
                )}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-indigo-500"
                  />
                )}
              </a>
            );
          })}
          <a
            href={CV_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
          >
            <Download size={16} /> CV
          </a>
        </div>


        {/* Mobile Toggle */}
        <button
          className="md:hidden text-slate-300 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col space-y-1">
              {NAV_LINKS.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  whileTap={{ scale: 0.98 }}
                  className="text-base font-medium text-slate-300 py-3 px-4 hover:bg-slate-800/50 rounded-xl flex items-center justify-between group transition-colors"
                  onClick={(e) => scrollToSection(e, link.href)}
                >
                  <span>{link.name}</span>
                  <ChevronRight size={16} className="text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
