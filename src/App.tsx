import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import TechStack from './components/sections/TechStack';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
import Testimonials from './components/sections/Testimonials';
import Contact from './components/sections/Contact';
import Footer from './components/sections/Footer';
import CustomCursor from './components/ui/CustomCursor';
import ParallaxBackground from './components/ui/ParallaxBackground';
import PageLoader from './components/ui/PageLoader';
import ProjectShowcase from './pages/ProjectShowcase';

function HomePage({ isLoading }: { isLoading: boolean }) {
  return (
    <>
      <PageLoader isLoading={isLoading} />
      <ParallaxBackground />
      <CustomCursor />
      <Navbar />
      <div className="relative z-10">
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Experience />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
    </>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading or wait for window load event
    const handleLoad = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000); // Wait 2 seconds for the loader experience
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      // Fallback timeout in case load event doesn't fire
      const timeout = setTimeout(handleLoad, 3000);
      return () => {
        window.removeEventListener('load', handleLoad);
        clearTimeout(timeout);
      };
    }
  }, []);

  useEffect(() => {
    // Prevent scrolling when loading
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isLoading]);

  useEffect(() => {
    const originalTitle = document.title;
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = "Come back soon! 👋";
      } else {
        document.title = originalTitle;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Reveal animations on scroll
    const observerOptions = {
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      observer.disconnect();
    };
  }, []);

  return (
    <BrowserRouter>
      <main className="bg-slate-950 text-slate-50 min-h-screen selection:bg-indigo-500/30 selection:text-indigo-200 cursor-none relative">
        <Routes>
          <Route path="/" element={<HomePage isLoading={isLoading} />} />
          <Route path="/project/:id" element={<ProjectShowcase />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

