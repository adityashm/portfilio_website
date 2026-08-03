import { useState, useEffect, useRef, MouseEvent } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export interface NavbarProps {
  isDark?: boolean;
  toggleTheme?: () => void;
}

export default function Navbar({ isDark: propIsDark, toggleTheme: propToggleTheme }: NavbarProps) {
  const themeContext = useTheme();
  const isDark = propIsDark !== undefined ? propIsDark : themeContext.isDark;
  const toggleTheme = propToggleTheme || themeContext.toggleTheme;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const drawerRef = useRef<HTMLDivElement>(null);

  // Framer Motion scroll progress indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);

          if (window.scrollY < 200) {
            setActiveSection('hero');
            ticking = false;
            return;
          }

          const sections = ['hero', 'about', 'education', 'skills', 'projects', 'experience', 'certifications', 'stats', 'contact'];
          let currentSection = 'hero';
          for (const section of sections) {
            const element = document.getElementById(section);
            if (element) {
              const rect = element.getBoundingClientRect();
              if (rect.top <= 150 && rect.bottom >= 150) {
                currentSection = section;
                break;
              }
            }
          }
          setActiveSection(currentSection);
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  // Focus trap inside mobile drawer
  useEffect(() => {
    if (!isMenuOpen || !drawerRef.current) return;
    const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length > 0) focusable[0].focus();

    const handleTabTrap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', handleTabTrap);
    return () => window.removeEventListener('keydown', handleTabTrap);
  }, [isMenuOpen]);

  const handleSmoothScroll = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    const targetId = href.replace('#', '');
    if (targetId === '' || targetId === 'hero') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsMenuOpen(false);
      return;
    }
    const element = document.getElementById(targetId);
    if (element) {
      e.preventDefault();
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMenuOpen(false);
    } else {
      window.location.href = `/${href}`;
    }
  };

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Education', href: '#education' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled
        ? 'bg-[#030712]/80 dark:bg-[#030712]/80 bg-white/80 backdrop-blur-md border-b border-white/10 shadow-lg'
        : 'bg-transparent'
    }`}>
      {/* Top Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-400 via-violet-500 to-cyan-400 z-50 origin-left"
        style={{ scaleX }}
      />

      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a
            href="#"
            onClick={(e) => handleSmoothScroll(e, '#hero')}
            aria-label="Aditya Sharma Portfolio Home"
            className="text-2xl font-bold tracking-tight text-white dark:text-white focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none rounded"
          >
            AS
          </a>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const sectionId = item.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleSmoothScroll(e, item.href)}
                  className={`transition-all font-medium py-1.5 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none rounded ${
                    isActive
                      ? 'text-cyan-400 border-b-2 border-cyan-400 font-semibold shadow-[0_4px_12px_rgba(0,240,255,0.3)]'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}

            <button
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
              className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
            >
              {isDark ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-cyan-400" />}
            </button>
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
              className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
            >
              {isDark ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-cyan-400" />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-drawer"
              className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Overlay & Content */}
        {isMenuOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMenuOpen(false)}
              aria-hidden="true"
            />
            <div
              id="mobile-drawer"
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation Menu"
              className="md:hidden absolute top-full left-0 right-0 bg-[#0b0f19] border-b border-white/10 shadow-2xl z-50 py-4 px-6"
            >
              <div className="flex flex-col space-y-3">
                {navItems.map((item) => {
                  const sectionId = item.href.replace('#', '');
                  const isActive = activeSection === sectionId;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => handleSmoothScroll(e, item.href)}
                      className={`py-2.5 min-h-[44px] inline-flex items-center transition-all font-medium rounded-lg px-4 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none ${
                        isActive
                          ? 'text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 font-semibold'
                          : 'text-slate-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}
