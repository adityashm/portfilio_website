import { useState, useEffect, useRef, MouseEvent } from 'react';
import { Menu, X, Search, FileText, Trophy } from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';

export interface NavbarProps {
  isDark?: boolean;
  toggleTheme?: () => void;
}

export default function Navbar() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [unlockedCount, setUnlockedCount] = useState(0);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateCount = () => {
      try {
        const stored = localStorage.getItem('unlocked_achievements');
        const list = stored ? JSON.parse(stored) : [];
        setUnlockedCount(list.length);
      } catch {
        setUnlockedCount(0);
      }
    };
    updateCount();
    window.addEventListener('achievements-updated', updateCount);
    return () => window.removeEventListener('achievements-updated', updateCount);
  }, []);

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
              onClick={() => window.dispatchEvent(new CustomEvent('open-cmd-k'))}
              aria-label="Open Command Palette Search (Cmd+K)"
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-900/80 hover:bg-slate-800 border border-white/10 hover:border-cyan-500/40 rounded-xl text-xs font-mono text-slate-300 transition-all focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
            >
              <Search size={14} className="text-cyan-400" />
              <span className="hidden lg:inline">Search...</span>
              <kbd className="px-1.5 py-0.5 text-[10px] bg-slate-800 border border-white/10 rounded text-slate-400">⌘K</kbd>
            </button>

            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-resume-preview'))}
              aria-label="Preview Resume PDF inline"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-bold rounded-xl transition-all focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
            >
              <FileText size={14} />
              <span>Resume</span>
            </button>

            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-achievement-cabinet'))}
              aria-label="View Developer Trophy Cabinet"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold rounded-xl transition-all"
            >
              <Trophy size={14} className="text-amber-400" />
              <span>{unlockedCount}/5</span>
            </button>
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-cmd-k'))}
              aria-label="Open Search (Cmd+K)"
              className="p-2 min-w-[38px] min-h-[38px] flex items-center justify-center rounded-full bg-slate-900/80 border border-white/10 text-cyan-400"
            >
              <Search size={18} />
            </button>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-resume-preview'))}
              aria-label="Preview Resume PDF"
              className="p-2 min-w-[38px] min-h-[38px] flex items-center justify-center rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300"
            >
              <FileText size={18} />
            </button>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-achievement-cabinet'))}
              aria-label="View Trophy Cabinet"
              className="p-2 min-w-[38px] min-h-[38px] flex items-center justify-center rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300"
            >
              <Trophy size={18} />
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
