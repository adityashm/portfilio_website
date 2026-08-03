import { useState, useEffect } from 'react';
import { Search, Terminal, FileText, ArrowRight, Home, Briefcase, Code, Award, Mail, ExternalLink, Cpu, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'NAVIGATION' | 'DEMOS' | 'ACTIONS';
  icon: typeof Search;
  action: () => void;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const navigateTo = (pathOrId: string) => {
    setIsOpen(false);
    if (pathOrId.startsWith('/')) {
      window.location.href = pathOrId;
    } else {
      const element = document.getElementById(pathOrId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = `/#${pathOrId}`;
      }
    }
  };

  const commandItems: CommandItem[] = [
    // Demos
    {
      id: 'demo-price',
      title: 'Price Comparison & Deal Finder Demo',
      subtitle: 'Live multi-platform tracker with offline fallback & price drop alerts',
      category: 'DEMOS',
      icon: Cpu,
      action: () => navigateTo('/price-comparison')
    },
    {
      id: 'demo-expense',
      title: 'Smart Expense Tracker Demo',
      subtitle: 'Interactive Demo Budget (₹50,000), Recharts pie breakdown & AI tips',
      category: 'DEMOS',
      icon: Cpu,
      action: () => navigateTo('/expense-tracker')
    },
    {
      id: 'demo-data',
      title: 'Data Analysis & Visualization Dashboard',
      subtitle: 'Real-time simulated telemetry streams, latency histograms & CSV export',
      category: 'DEMOS',
      icon: Cpu,
      action: () => navigateTo('/data-dashboard')
    },
    {
      id: 'demo-scraper',
      title: 'Web Scraper with Database Console',
      subtitle: 'Interactive multi-threaded crawler terminal & SQLite rows preview',
      category: 'DEMOS',
      icon: Cpu,
      action: () => navigateTo('/web-scraper')
    },
    {
      id: 'demo-api',
      title: 'REST API Backend & Auth Documentation',
      subtitle: 'Swagger-style interactive API tester with Bearer tokens & HTTP headers',
      category: 'DEMOS',
      icon: Cpu,
      action: () => navigateTo('/rest-api')
    },
    // Actions
    {
      id: 'action-resume-preview',
      title: 'Preview Resume (Integrated PDF Viewer)',
      subtitle: 'Open inline PDF reader without leaving the browser tab',
      category: 'ACTIONS',
      icon: FileText,
      action: () => {
        setIsOpen(false);
        window.dispatchEvent(new CustomEvent('open-resume-preview'));
      }
    },
    {
      id: 'action-resume-download',
      title: 'Download Resume PDF',
      subtitle: 'Save Aditya_Sharma_Resume.pdf to your local disk',
      category: 'ACTIONS',
      icon: FileText,
      action: () => {
        setIsOpen(false);
        const link = document.createElement('a');
        link.href = '/Aditya_Sharma_Resume.pdf';
        link.download = 'Aditya_Sharma_Resume.pdf';
        link.click();
      }
    },
    {
      id: 'action-cabinet',
      title: 'View Developer Trophy Cabinet & Achievements',
      subtitle: 'Check unlocked engineering badges, XP progress, and hint cabinet',
      category: 'ACTIONS',
      icon: Trophy,
      action: () => {
        setIsOpen(false);
        window.dispatchEvent(new CustomEvent('open-achievement-cabinet'));
      }
    },
    {
      id: 'action-github',
      title: 'Open GitHub Profile (@adityashm)',
      subtitle: 'Explore full repositories, commit activity, and open-source contributions',
      category: 'ACTIONS',
      icon: ExternalLink,
      action: () => {
        setIsOpen(false);
        window.open('https://github.com/adityashm', '_blank');
      }
    },
    {
      id: 'action-email',
      title: 'Send an Email to Aditya Sharma',
      subtitle: 'Get in touch for engineering roles or technical collaborations',
      category: 'ACTIONS',
      icon: Mail,
      action: () => {
        setIsOpen(false);
        navigateTo('contact');
      }
    },
    // Navigation
    {
      id: 'nav-home',
      title: 'Home / Hero Section',
      subtitle: 'Cyber Obsidian 3D Portfolio top view',
      category: 'NAVIGATION',
      icon: Home,
      action: () => navigateTo('hero')
    },
    {
      id: 'nav-experience',
      title: 'Experience & NTPC Dadri Training',
      subtitle: 'Industrial IT, Cybersecurity, Linux systems, and Space Lab internship',
      category: 'NAVIGATION',
      icon: Briefcase,
      action: () => navigateTo('experience')
    },
    {
      id: 'nav-projects',
      title: 'Full Stack & Systems Projects',
      subtitle: 'Explore all 5 featured projects and their interactive demos',
      category: 'NAVIGATION',
      icon: Code,
      action: () => navigateTo('projects')
    },
    {
      id: 'nav-skills',
      title: 'Technical Competencies & Skills',
      subtitle: 'Frontend, Backend, Databases, Cloud & DevOps, Security',
      category: 'NAVIGATION',
      icon: Terminal,
      action: () => navigateTo('skills')
    },
    {
      id: 'nav-certifications',
      title: 'Certifications & Credentials',
      subtitle: 'Verified professional certificates and industrial achievements',
      category: 'NAVIGATION',
      icon: Award,
      action: () => navigateTo('certifications')
    }
  ];

  const filteredItems = commandItems.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen(prev => {
          if (!prev) {
            window.dispatchEvent(new CustomEvent('unlock-achievement', { detail: 'power-user' }));
          }
          return !prev;
        });
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      } else if (isOpen && filteredItems.length > 0) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex(prev => (prev + 1) % filteredItems.length);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
        } else if (e.key === 'Enter') {
          e.preventDefault();
          filteredItems[selectedIndex]?.action();
        }
      }
    };

    const handleOpenCustom = () => {
      setIsOpen(true);
      window.dispatchEvent(new CustomEvent('unlock-achievement', { detail: 'power-user' }));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-cmd-k', handleOpenCustom);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-cmd-k', handleOpenCustom);
    };
  }, [isOpen, filteredItems, selectedIndex]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-start justify-center pt-[15vh] p-4 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="w-full max-w-2xl bg-slate-950/95 border border-cyan-500/40 rounded-2xl shadow-[0_0_60px_rgba(0,240,255,0.25)] overflow-hidden flex flex-col"
          >
            {/* Input Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 bg-slate-900/60">
              <Search className="text-cyan-400 shrink-0" size={20} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search projects, skills, NTPC Dadri..."
                className="w-full bg-transparent text-white placeholder-slate-500 text-sm focus:outline-none font-mono"
                autoFocus
              />
              <kbd className="px-2 py-0.5 text-[10px] font-mono bg-slate-800 border border-white/10 rounded text-slate-400">
                ESC
              </kbd>
            </div>

            {/* Results List */}
            <div className="max-h-[60vh] overflow-y-auto p-2 space-y-1 divide-y divide-white/5">
              {filteredItems.length === 0 ? (
                <div className="py-12 text-center text-slate-500 font-mono text-sm">
                  No commands found matching &quot;{query}&quot;
                </div>
              ) : (
                filteredItems.map((item, idx) => {
                  const Icon = item.icon;
                  const isSelected = idx === selectedIndex;
                  return (
                    <button
                      key={item.id}
                      onClick={() => item.action()}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all ${
                        isSelected
                          ? 'bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border border-cyan-500/50 text-white'
                          : 'hover:bg-white/5 text-slate-300 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div
                          className={`p-2 rounded-lg border ${
                            isSelected
                              ? 'bg-cyan-500/20 border-cyan-400/50 text-cyan-300'
                              : 'bg-slate-900 border-white/10 text-slate-400'
                          }`}
                        >
                          <Icon size={18} />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm tracking-tight truncate">
                              {item.title}
                            </span>
                            <span
                              className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${
                                item.category === 'DEMOS'
                                  ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
                                  : item.category === 'ACTIONS'
                                  ? 'bg-violet-500/10 text-violet-400 border-violet-500/30'
                                  : 'bg-slate-800 text-slate-400 border-white/10'
                              }`}
                            >
                              {item.category}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 truncate mt-0.5">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>
                      <ArrowRight
                        size={16}
                        className={`shrink-0 transition-transform ${
                          isSelected ? 'text-cyan-400 translate-x-0.5' : 'text-slate-600'
                        }`}
                      />
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer Tips */}
            <div className="px-5 py-2.5 bg-slate-900/80 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <div className="flex items-center gap-4">
                <span>
                  <kbd className="px-1.5 py-0.5 bg-slate-800 border border-white/10 rounded text-slate-300">↑↓</kbd> navigate
                </span>
                <span>
                  <kbd className="px-1.5 py-0.5 bg-slate-800 border border-white/10 rounded text-slate-300">ENTER</kbd> select
                </span>
              </div>
              <span className="text-cyan-400 font-bold">Cyber Obsidian Cmd+K</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
