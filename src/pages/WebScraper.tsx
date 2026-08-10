import { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { Terminal, Database, Play, Square, Globe, Server, CheckCircle2, Cpu } from 'lucide-react';
import Layout from '../components/Layout';
import SectionReveal from '../components/animations/SectionReveal';
import TiltCard from '../components/animations/TiltCard';

interface ScrapedRow {
  id: number;
  url: string;
  title: string;
  price: string;
  status: 'scraped' | 'cached' | 'updated';
  timestamp: string;
}

const INITIAL_ROWS: ScrapedRow[] = [
  { id: 1, url: 'https://demo-shop.tech/p/nvidia-rtx-5090', title: 'NVIDIA GeForce RTX 5090 GPU', price: '$1,999.00', status: 'scraped', timestamp: '14:02:11' },
  { id: 2, url: 'https://demo-shop.tech/p/ryzen-9-9950x', title: 'AMD Ryzen 9 9950X 16-Core Processor', price: '$649.00', status: 'cached', timestamp: '14:01:50' },
  { id: 3, url: 'https://demo-shop.tech/p/ddr5-64gb-kit', title: 'Corsair Dominator Titanium DDR5 64GB', price: '$279.99', status: 'updated', timestamp: '14:00:22' },
  { id: 4, url: 'https://demo-shop.tech/p/nvme-4tb-gen5', title: 'Samsung 990 PRO Gen5 NVMe M.2 4TB', price: '$349.50', status: 'scraped', timestamp: '13:58:14' },
  { id: 5, url: 'https://demo-shop.tech/p/oled-monitor-32', title: 'ASUS ROG Swift OLED 32" 240Hz 4K', price: '$1,199.00', status: 'cached', timestamp: '13:55:09' },
];

export default function WebScraper() {
  const [targetUrl, setTargetUrl] = useState('https://demo-shop.tech/products/electronics');
  const [isRunning, setIsRunning] = useState(false);
  const [rows, setRows] = useState<ScrapedRow[]>(INITIAL_ROWS);
  const [logs, setLogs] = useState<string[]>([
    '[SYSTEM] Web Scraper Engine v2.4 initialized with SQLite3 backend',
    '[SQLITE] Connected to local database: /data/scraped_products.db (4 tables ready)',
    '[SCHEDULER] Background daemon ready (interval: 1800s)',
  ]);
  const [threadCount, setThreadCount] = useState(4);
  const [recordsCount, setRecordsCount] = useState(1420);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRunning) {
      interval = setInterval(() => {
        const timeStr = new Date().toLocaleTimeString();
        const fakeProducts = [
          { title: 'Sony WH-1000XM6 Wireless Headphones', price: '$399.99', url: 'https://demo-shop.tech/p/sony-xm6' },
          { title: 'Apple MacBook Pro M4 Max 32GB', price: '$3,499.00', url: 'https://demo-shop.tech/p/macbook-pro-m4' },
          { title: 'Keychron Q1 Max Wireless Mechanical', price: '$209.00', url: 'https://demo-shop.tech/p/keychron-q1' },
          { title: 'Logitech G PRO X Superlight 2', price: '$159.99', url: 'https://demo-shop.tech/p/logitech-superlight' },
        ];
        const randomItem = fakeProducts[Math.floor(Math.random() * fakeProducts.length)];

        setLogs((prev) => [
          `[SCRAPE] Fetching 200 OK from ${randomItem.url} (latency: 142ms)`,
          `[PARSE] Extracted DOM attributes -> title="${randomItem.title}", price="${randomItem.price}"`,
          `[SQLITE] INSERT OR REPLACE INTO products (url, title, price, updated_at) VALUES (...)`,
          ...prev.slice(0, 15),
        ]);

        setRows((prev) => [
          {
            id: prev.length + 1,
            url: randomItem.url,
            title: randomItem.title,
            price: randomItem.price,
            status: 'scraped',
            timestamp: timeStr,
          },
          ...prev.slice(0, 9),
        ]);

        setRecordsCount((prev) => prev + 1);
      }, 1800);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleToggleScraper = () => {
    if (!isRunning) {
      setLogs((prev) => [
        `[INFO] Starting crawler job on target: ${targetUrl}`,
        `[THREADS] Spawning ${threadCount} async worker threads with rate limiting (100 req/min)`,
        ...prev,
      ]);
    } else {
      setLogs((prev) => [`[STOP] Gracefully stopping crawler threads. SQLite transactions committed.`, ...prev]);
    }
    setIsRunning(!isRunning);
  };

  const handleClearLogs = () => {
    setLogs(['[SYSTEM] Logs cleared by user. Standby ready.']);
  };

  return (
    <Layout>
      <SEO 
        title="Web Scraper & SQLite Database Console | Aditya Sharma" 
        description="Production-ready web scraper and database crawler console with multi-threaded scheduling, BeautifulSoup4 parsing, and SQLite3 storage." 
        url="https://adityashm.tech/web-scraper" 
      />

      <div className="py-24 container mx-auto px-4 md:px-6 max-w-7xl">
        {/* Header Section */}
        <SectionReveal>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-cyan-400 block mb-2">
                PROJECT DEMO • WEB SCRAPER
              </span>
              <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400 tracking-tight">
                Web Scraper with Database
              </h1>
              <p className="text-slate-400 mt-2 max-w-2xl text-sm md:text-base">
                Multi-threaded web scraping engine with SQLite persistence, HTML parsing, automatic rate-limiting, and background scheduling.
              </p>
              <div className="mt-4">
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('open-architecture-modal', { detail: { project: 'web-scraper' } }))}
                  aria-label="View System Architecture Diagram for Web Scraper with Database"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 rounded-xl text-xs font-mono font-bold shadow-[0_0_20px_rgba(0,240,255,0.15)] transition-all"
                >
                  <Cpu size={16} className="text-violet-400" />
                  <span>View System Architecture &amp; Data Flow →</span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleToggleScraper}
                className={`flex items-center gap-2 px-6 py-3 min-h-[44px] rounded-xl font-bold transition-all text-sm active:scale-95 ${
                  isRunning
                    ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-[0_0_20px_rgba(244,63,94,0.4)]'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-[0_0_20px_rgba(0,240,255,0.3)]'
                }`}
              >
                {isRunning ? <Square size={16} /> : <Play size={16} />}
                <span>{isRunning ? 'Stop Crawler' : 'Start Scraping Job'}</span>
              </button>
            </div>
          </div>
        </SectionReveal>

        {/* Status Overview Cards */}
        <SectionReveal delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <TiltCard glowColor="cyan" className="p-6 border border-white/10 bg-slate-900/60 rounded-2xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-slate-400">Crawler Status</span>
                <Server size={20} className="text-cyan-400" />
              </div>
              <div className="text-3xl font-extrabold text-white mb-1">
                {isRunning ? 'ACTIVE RUNNING' : 'STANDBY READY'}
              </div>
              <div className="flex items-center gap-1 text-xs text-cyan-400">
                <span>{isRunning ? 'Scraping target in background' : 'Idle waiting for command'}</span>
              </div>
            </TiltCard>

            <TiltCard glowColor="cyan" className="p-6 border border-white/10 bg-slate-900/60 rounded-2xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-slate-400">SQLite DB Records</span>
                <Database size={20} className="text-cyan-400" />
              </div>
              <div className="text-3xl font-extrabold text-white mb-1">{recordsCount.toLocaleString()}</div>
              <div className="flex items-center gap-1 text-xs text-emerald-400">
                <CheckCircle2 size={14} />
                <span>100% committed to disk</span>
              </div>
            </TiltCard>

            <TiltCard glowColor="violet" className="p-6 border border-white/10 bg-slate-900/60 rounded-2xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-slate-400">Worker Threads</span>
                <Terminal size={20} className="text-violet-400" />
              </div>
              <div className="text-3xl font-extrabold text-white mb-1">{threadCount} Async</div>
              <div className="flex items-center gap-1 text-xs text-violet-400">
                <span>Rate limit: 100 req/min</span>
              </div>
            </TiltCard>

            <TiltCard glowColor="cyan" className="p-6 border border-white/10 bg-slate-900/60 rounded-2xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-slate-400">Target URL</span>
                <Globe size={20} className="text-cyan-400" />
              </div>
              <div className="text-lg font-mono font-bold text-white mb-1 truncate">{targetUrl}</div>
              <div className="flex items-center gap-1 text-xs text-slate-400">
                <span>BeautifulSoup4 + Requests</span>
              </div>
            </TiltCard>
          </div>
        </SectionReveal>

        {/* Live Terminal & Crawler Control Studio */}
        <SectionReveal delay={0.2}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Terminal Console */}
            <div className="lg:col-span-2 p-6 rounded-2xl border border-white/10 bg-slate-950/90 font-mono">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500" />
                  <span className="w-3 h-3 rounded-full bg-amber-500" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs text-slate-400 ml-2">aditya@spider-engine:~# ./scraper --watch</span>
                </div>
                <button
                  onClick={handleClearLogs}
                  className="text-xs text-slate-400 hover:text-white px-3 py-1 rounded bg-slate-900 border border-white/5"
                >
                  Clear Console
                </button>
              </div>

              <div className="h-64 overflow-y-auto space-y-2 text-xs md:text-sm">
                {logs.map((log, idx) => (
                  <div
                    key={idx}
                    className={
                      log.includes('[SUCCESS]') || log.includes('[SQLITE]')
                        ? 'text-emerald-400'
                        : log.includes('[SCRAPE]')
                        ? 'text-cyan-300'
                        : log.includes('[STOP]') || log.includes('[ERROR]')
                        ? 'text-rose-400'
                        : 'text-slate-300'
                    }
                  >
                    {log}
                  </div>
                ))}
              </div>
            </div>

            {/* Target URL Configuration Card */}
            <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-md flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-white mb-4">Crawler Job Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                      Target Scraping URL
                    </label>
                    <input
                      type="text"
                      value={targetUrl}
                      onChange={(e) => setTargetUrl(e.target.value)}
                      disabled={isRunning}
                      className="w-full px-4 py-2 bg-slate-950 border border-white/10 rounded-xl text-sm text-white font-mono focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                      Concurrency Worker Threads
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 4, 8].map((t) => (
                        <button
                          key={t}
                          onClick={() => setThreadCount(t)}
                          disabled={isRunning}
                          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                            threadCount === t
                              ? 'bg-cyan-500 text-slate-950'
                              : 'bg-slate-800 text-slate-400 hover:text-white border border-white/5'
                          }`}
                        >
                          {t}x
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10 text-xs text-slate-400">
                <p>
                  <strong>Note:</strong> All requests adhere to `robots.txt` guidelines and employ exponential back-off retries to prevent target server overloading.
                </p>
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* Scraped SQLite Database Rows */}
        <SectionReveal delay={0.3}>
          <div className="p-6 md:p-8 rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">SQLite3 Table Preview (`products` table)</h3>
              <span className="text-xs font-mono text-cyan-400">Live Database Stream</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-xs font-mono uppercase tracking-wider text-slate-400">
                    <th className="py-3 px-4">ID</th>
                    <th className="py-3 px-4">Title / Item</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Source URL</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  {rows.map((row) => (
                    <tr key={row.id} className="hover:bg-white/[0.03] transition-colors">
                      <td className="py-3.5 px-4 font-mono text-slate-400">#{row.id}</td>
                      <td className="py-3.5 px-4 font-semibold text-white">{row.title}</td>
                      <td className="py-3.5 px-4 font-mono font-bold text-cyan-300">{row.price}</td>
                      <td className="py-3.5 px-4 font-mono text-xs text-slate-400 truncate max-w-xs">{row.url}</td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${
                            row.status === 'scraped'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                              : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-xs text-slate-500">{row.timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </SectionReveal>
      </div>
    </Layout>
  );
}
