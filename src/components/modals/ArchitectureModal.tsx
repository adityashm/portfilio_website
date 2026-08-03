import { useState, useEffect } from 'react';
import { X, Cpu, Database, Server, Globe, ArrowRight, ShieldCheck, CheckCircle2, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export type ArchitectureProjectId =
  | 'price-comparison'
  | 'expense-tracker'
  | 'data-dashboard'
  | 'web-scraper'
  | 'rest-api';

interface ArchNode {
  id: string;
  label: string;
  desc: string;
  icon: typeof Server;
  badge: string;
}

interface ArchConfig {
  title: string;
  subtitle: string;
  nodes: ArchNode[];
  techTags: string[];
  description: string;
}

const ARCH_MAP: Record<ArchitectureProjectId, ArchConfig> = {
  'price-comparison': {
    title: 'Price Comparison & Deal Finder — System Architecture',
    subtitle: 'Distributed Scraping & Price Alert Engine',
    description:
      'Engineered to track e-commerce prices across multiple vendors in real-time. A background scraper worker pool fetches product listings, caches results in Redis, and stores price history in PostgreSQL while firing automated email notifications when target drop thresholds are reached.',
    nodes: [
      {
        id: 'c1',
        label: 'React 18 SPA (Vite)',
        desc: 'Interactive search, filter & price drop alert UI',
        icon: Globe,
        badge: 'Client Layer'
      },
      {
        id: 'c2',
        label: 'API Gateway & Cache',
        desc: 'Express REST endpoints + Redis query caching',
        icon: Server,
        badge: 'API / Cache'
      },
      {
        id: 'c3',
        label: 'Scraper Worker Pool',
        desc: 'Multi-threaded crawlers for Amazon, Flipkart & Chroma',
        icon: Cpu,
        badge: 'Background Workers'
      },
      {
        id: 'c4',
        label: 'PostgreSQL DB + Queue',
        desc: 'Stores price history & triggers alert notifications',
        icon: Database,
        badge: 'Data Layer'
      }
    ],
    techTags: ['React 18', 'TypeScript', 'Node.js', 'Redis', 'PostgreSQL', 'Puppeteer']
  },
  'expense-tracker': {
    title: 'Smart Expense Tracker — System Architecture',
    subtitle: 'Real-Time Financial Analytics & AI Budget Engine',
    description:
      'Designed for high-reliability financial tracking. Users submit transactions through an authenticated SPA, which are validated via REST APIs and processed through a real-time analytics engine to generate category percentages, SVG pie charts, and AI-driven budget recommendations.',
    nodes: [
      {
        id: 'e1',
        label: 'React SPA + Recharts',
        desc: 'Interactive category breakdown & pie visualization UI',
        icon: Globe,
        badge: 'Frontend'
      },
      {
        id: 'e2',
        label: 'Auth & API Service',
        desc: 'Node.js Express + JWT RBAC Middleware',
        icon: ShieldCheck,
        badge: 'Security Layer'
      },
      {
        id: 'e3',
        label: 'AI Recommendation Engine',
        desc: 'Evaluates category spending against ₹50,000 budget limits',
        icon: Cpu,
        badge: 'Analytics Engine'
      },
      {
        id: 'e4',
        label: 'PostgreSQL Store',
        desc: 'ACID-compliant transaction logging & user schemas',
        icon: Database,
        badge: 'Relational DB'
      }
    ],
    techTags: ['React 18', 'TypeScript', 'Recharts', 'Express', 'JWT', 'PostgreSQL']
  },
  'data-dashboard': {
    title: 'Data Analysis & Visualization Dashboard — System Architecture',
    subtitle: 'High-Throughput Telemetry & Streaming Pipeline',
    description:
      'A low-latency dashboard architecture that ingests simulated system telemetry streams. Decoupled ingest pipelines pass metrics into an aggregation service that pushes live latency, throughput, and security threat distributions to client charts.',
    nodes: [
      {
        id: 'd1',
        label: 'Dashboard Client SPA',
        desc: 'Live Recharts histograms, KPI metrics & CSV export',
        icon: Globe,
        badge: 'Client SPA'
      },
      {
        id: 'd2',
        label: 'Streaming Telemetry Gateway',
        desc: 'WebSocket / SSE server pushing 24.5ms latency updates',
        icon: Server,
        badge: 'Streaming Gate'
      },
      {
        id: 'd3',
        label: 'Kafka / Redis Event Bus',
        desc: 'Decouples high-volume ingest from aggregation workers',
        icon: Layers,
        badge: 'Event Bus'
      },
      {
        id: 'd4',
        label: 'Time-Series Database',
        desc: 'Stores 14k+ data points with sub-30ms query latency',
        icon: Database,
        badge: 'TSDB Layer'
      }
    ],
    techTags: ['React 18', 'WebSockets', 'Recharts', 'Redis', 'Kafka', 'TSDB']
  },
  'web-scraper': {
    title: 'Web Scraper with Database Console — System Architecture',
    subtitle: 'Fault-Tolerant Multi-Threaded Crawler & Proxy Pipeline',
    description:
      'An industrial-grade crawler architecture featuring worker thread pooling, proxy rotation, and exponential backoff rate limiting. Scraped product rows are normalized and upserted into SQLite/PostgreSQL with automatic cache expiration.',
    nodes: [
      {
        id: 'w1',
        label: 'Scraper Console UI',
        desc: 'Live terminal logs, crawler start/stop toggle & SQLite preview',
        icon: Globe,
        badge: 'Console UI'
      },
      {
        id: 'w2',
        label: 'Worker Pool & Limiter',
        desc: 'Concurrency manager with exponential backoff & proxies',
        icon: Cpu,
        badge: 'Worker Pool'
      },
      {
        id: 'w3',
        label: 'HTML Parsing & ETL',
        desc: 'Extracts price, availability, & vendor metadata',
        icon: Layers,
        badge: 'ETL Pipeline'
      },
      {
        id: 'w4',
        label: 'SQLite3 / Postgres Store',
        desc: 'Upserts scraped records & manages status tags',
        icon: Database,
        badge: 'Storage'
      }
    ],
    techTags: ['TypeScript', 'Node.js', 'Cheerio', 'Worker Threads', 'SQLite3', 'PostgreSQL']
  },
  'rest-api': {
    title: 'REST API Backend with Authentication — System Architecture',
    subtitle: 'Secure Production API Gateway with RBAC & Rate Limiting',
    description:
      'A secure backend architecture demonstrating production API standards. Every request passes through security middleware (Helmet, CORS, IP Rate Limiting), JWT Bearer token authentication, Zod schema validation, and ORM query optimization.',
    nodes: [
      {
        id: 'r1',
        label: 'Swagger API Tester',
        desc: 'Interactive documentation & Bearer token header injection',
        icon: Globe,
        badge: 'Client Sandbox'
      },
      {
        id: 'r2',
        label: 'Express Security Gateway',
        desc: 'CORS, Helmet, Rate Limiting & JWT Auth validation',
        icon: ShieldCheck,
        badge: 'Security Gate'
      },
      {
        id: 'r3',
        label: 'Zod Validation Layer',
        desc: 'Strict type validation & business logic controllers',
        icon: Server,
        badge: 'Service Layer'
      },
      {
        id: 'r4',
        label: 'Relational ORM + Pool',
        desc: 'Prisma / TypeORM connection pool to PostgreSQL',
        icon: Database,
        badge: 'Database Layer'
      }
    ],
    techTags: ['Node.js', 'Express', 'TypeScript', 'JWT', 'Zod', 'PostgreSQL']
  }
};

export default function ArchitectureModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [projectId, setProjectId] = useState<ArchitectureProjectId>('price-comparison');

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{ project: ArchitectureProjectId }>;
      if (customEvent.detail?.project && ARCH_MAP[customEvent.detail.project]) {
        setProjectId(customEvent.detail.project);
        setIsOpen(true);
        window.dispatchEvent(new CustomEvent('unlock-achievement', { detail: 'system-architect' }));
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('open-architecture-modal', handleOpen);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('open-architecture-modal', handleOpen);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const config = ARCH_MAP[projectId] || ARCH_MAP['price-comparison'];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-4xl bg-slate-950/95 border border-cyan-500/40 rounded-2xl shadow-[0_0_60px_rgba(0,240,255,0.25)] overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-900/60">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400">
                  <Cpu size={22} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white tracking-tight">
                      {config.title}
                    </h3>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-full">
                      <CheckCircle2 size={10} />
                      SYSTEM_ARCH
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{config.subtitle}</p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close Architecture Modal"
                className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-950/50">
              {/* Overview Description */}
              <div className="p-4 bg-slate-900/80 border border-cyan-500/20 rounded-xl">
                <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-1">
                  Architecture Overview
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {config.description}
                </p>
              </div>

              {/* Diagram Flow Nodes */}
              <div>
                <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-4">
                  End-to-End Data &amp; Execution Pipeline
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                  {config.nodes.map((node, idx) => {
                    const Icon = node.icon;
                    return (
                      <div
                        key={node.id}
                        className="relative flex flex-col bg-slate-900/90 border border-white/10 hover:border-cyan-400/50 p-4 rounded-xl shadow-lg transition-all"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-slate-800 text-cyan-300 border border-cyan-500/30 rounded-full">
                            {node.badge}
                          </span>
                          <span className="text-xs font-mono text-slate-500">
                            0{idx + 1}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <Icon size={18} className="text-violet-400" />
                          <h5 className="font-bold text-sm text-white tracking-tight">
                            {node.label}
                          </h5>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {node.desc}
                        </p>
                        {idx < config.nodes.length - 1 && (
                          <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 items-center justify-center bg-slate-950 rounded-full border border-cyan-500/40 text-cyan-400">
                            <ArrowRight size={14} />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Technology Stack Tags */}
              <div>
                <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                  Production Technology Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {config.techTags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-mono font-medium bg-slate-900 border border-white/10 rounded-lg text-slate-300 hover:border-cyan-500/40 hover:text-cyan-300 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-3 border-t border-white/10 bg-slate-900/60 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Production Architecture Standard</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-1.5 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-white/10 transition-colors"
              >
                Close Diagram
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
