import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { BarChart3, TrendingUp, Database, Download, RefreshCw, Filter, FileText, ArrowUpRight } from 'lucide-react';
import Layout from '../components/Layout';
import SectionReveal from '../components/animations/SectionReveal';
import TiltCard from '../components/animations/TiltCard';

interface DataRecord {
  id: string;
  metric: string;
  category: 'Infrastructure' | 'Revenue' | 'Security' | 'Performance';
  value: number;
  change: number;
  status: 'optimal' | 'warning' | 'critical';
  timestamp: string;
}

const INITIAL_DATA: DataRecord[] = [
  { id: '1', metric: 'API Request Latency', category: 'Performance', value: 24.5, change: -12.4, status: 'optimal', timestamp: '10:45 AM' },
  { id: '2', metric: 'Database Write Throughput', category: 'Infrastructure', value: 1420, change: 8.7, status: 'optimal', timestamp: '10:45 AM' },
  { id: '3', metric: 'Threat Detection Accuracy', category: 'Security', value: 99.8, change: 0.4, status: 'optimal', timestamp: '10:44 AM' },
  { id: '4', metric: 'Cloud Compute Cost', category: 'Infrastructure', value: 482.5, change: -3.2, status: 'optimal', timestamp: '10:43 AM' },
  { id: '5', metric: 'SQL Query Optimize Rate', category: 'Performance', value: 94.2, change: 4.1, status: 'optimal', timestamp: '10:42 AM' },
  { id: '6', metric: 'Unusual Packet Requests', category: 'Security', value: 12, change: 15.0, status: 'warning', timestamp: '10:40 AM' },
  { id: '7', metric: 'Monthly Recurring Spend', category: 'Revenue', value: 12450, change: 11.8, status: 'optimal', timestamp: '10:35 AM' },
  { id: '8', metric: 'Memory Cache Hit Rate', category: 'Performance', value: 98.1, change: 1.5, status: 'optimal', timestamp: '10:30 AM' },
];

export default function DataDashboard() {
  const [data, setData] = useState<DataRecord[]>(INITIAL_DATA);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeChartTab, setActiveChartTab] = useState<'latency' | 'throughput' | 'security'>('latency');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const categories = ['All', 'Performance', 'Infrastructure', 'Security', 'Revenue'];

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchCat = selectedCategory === 'All' || item.category === selectedCategory;
      const matchSearch = item.metric.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [data, selectedCategory, searchQuery]);

  const handleRefreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setData((prev) =>
        prev.map((item) => ({
          ...item,
          value: +(item.value * (0.95 + Math.random() * 0.1)).toFixed(1),
          change: +((Math.random() - 0.45) * 10).toFixed(1),
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }))
      );
      setIsRefreshing(false);
    }, 600);
  };

  const handleExportCsv = () => {
    const headers = ['Metric', 'Category', 'Value', 'Change (%)', 'Status', 'Timestamp'];
    const rows = filteredData.map((d) => [d.metric, d.category, d.value, d.change, d.status, d.timestamp]);
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'analytics_dashboard_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Layout>
      <Helmet>
        <title>Data Analysis & Visualization Dashboard | Aditya Sharma</title>
        <meta
          name="description"
          content="Interactive full-stack data analytics and visualization dashboard built with Python, Flask, SQLite, and React."
        />
      </Helmet>

      <div className="py-24 container mx-auto px-4 md:px-6 max-w-7xl">
        {/* Header Section */}
        <SectionReveal>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-cyan-400 block mb-2">
                PROJECT DEMO • DATA ANALYTICS
              </span>
              <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400 tracking-tight">
                Data Analysis & Visualization Dashboard
              </h1>
              <p className="text-slate-400 mt-2 max-w-2xl text-sm md:text-base">
                Real-time performance monitoring, statistical aggregations, and customizable CSV exporting powered by SQL & data analytics pipelines.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleRefreshData}
                disabled={isRefreshing}
                className="flex items-center gap-2 px-4 py-2.5 min-h-[44px] bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-white/10 rounded-xl font-medium transition-all text-sm active:scale-95"
              >
                <RefreshCw size={16} className={isRefreshing ? 'animate-spin text-cyan-400' : ''} />
                <span>Simulate Real-Time Stream</span>
              </button>
              <button
                onClick={handleExportCsv}
                className="flex items-center gap-2 px-4 py-2.5 min-h-[44px] bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl font-medium transition-all text-sm shadow-[0_0_20px_rgba(0,240,255,0.3)] active:scale-95"
              >
                <Download size={16} />
                <span>Export CSV</span>
              </button>
            </div>
          </div>
        </SectionReveal>

        {/* KPI Overview Cards */}
        <SectionReveal delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <TiltCard glowColor="cyan" className="p-6 border border-white/10 bg-slate-900/60 rounded-2xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-slate-400">Total Records Analyzed</span>
                <Database size={20} className="text-cyan-400" />
              </div>
              <div className="text-3xl font-extrabold text-white mb-1">14,820</div>
              <div className="flex items-center gap-1 text-xs text-emerald-400">
                <TrendingUp size={14} />
                <span>+18.4% compared to last week</span>
              </div>
            </TiltCard>

            <TiltCard glowColor="cyan" className="p-6 border border-white/10 bg-slate-900/60 rounded-2xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-slate-400">Avg API Response</span>
                <BarChart3 size={20} className="text-cyan-400" />
              </div>
              <div className="text-3xl font-extrabold text-white mb-1">24.5 ms</div>
              <div className="flex items-center gap-1 text-xs text-emerald-400">
                <TrendingUp size={14} />
                <span>-12.4% latency reduction</span>
              </div>
            </TiltCard>

            <TiltCard glowColor="violet" className="p-6 border border-white/10 bg-slate-900/60 rounded-2xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-slate-400">Query Optimization</span>
                <FileText size={20} className="text-violet-400" />
              </div>
              <div className="text-3xl font-extrabold text-white mb-1">94.2%</div>
              <div className="flex items-center gap-1 text-xs text-emerald-400">
                <TrendingUp size={14} />
                <span>+4.1% index hit ratio</span>
              </div>
            </TiltCard>

            <TiltCard glowColor="cyan" className="p-6 border border-white/10 bg-slate-900/60 rounded-2xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-slate-400">Active Pipelines</span>
                <ArrowUpRight size={20} className="text-cyan-400" />
              </div>
              <div className="text-3xl font-extrabold text-white mb-1">8 / 8</div>
              <div className="flex items-center gap-1 text-xs text-cyan-400">
                <span>100% operational uptime</span>
              </div>
            </TiltCard>
          </div>
        </SectionReveal>

        {/* Interactive Visualization Studio */}
        <SectionReveal delay={0.2}>
          <div className="mb-12 p-6 md:p-8 rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-md">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-xl font-bold text-white">Interactive Metric Visualizer</h2>
                <p className="text-sm text-slate-400">Toggle telemetry streams to inspect performance distributions</p>
              </div>
              <div className="flex gap-2 p-1 bg-slate-950/60 rounded-xl border border-white/5">
                <button
                  onClick={() => setActiveChartTab('latency')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                    activeChartTab === 'latency'
                      ? 'bg-cyan-500 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  System Latency (ms)
                </button>
                <button
                  onClick={() => setActiveChartTab('throughput')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                    activeChartTab === 'throughput'
                      ? 'bg-cyan-500 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Query Throughput (req/s)
                </button>
                <button
                  onClick={() => setActiveChartTab('security')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                    activeChartTab === 'security'
                      ? 'bg-cyan-500 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Threat Score (%)
                </button>
              </div>
            </div>

            {/* Simulated Responsive Bar Chart Component */}
            <div className="h-64 md:h-72 w-full flex items-end justify-between gap-2 md:gap-6 pt-8 pb-4 px-2 border-b border-white/10">
              {(activeChartTab === 'latency'
                ? [28, 24, 21, 32, 18, 25, 22, 19, 24.5]
                : activeChartTab === 'throughput'
                ? [1100, 1350, 1420, 1280, 1500, 1410, 1390, 1450, 1420]
                : [98, 99.2, 99.5, 99.8, 98.9, 99.4, 99.7, 99.8, 99.8]
              ).map((val, idx) => {
                const maxVal = activeChartTab === 'latency' ? 40 : activeChartTab === 'throughput' ? 1800 : 100;
                const heightPercent = Math.min(100, Math.max(15, (val / maxVal) * 100));
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                    <span className="text-[10px] font-mono text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity">
                      {val}
                    </span>
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className="w-full max-w-[40px] rounded-t-lg bg-gradient-to-t from-cyan-600/40 via-cyan-500/80 to-cyan-400 group-hover:from-cyan-500 group-hover:to-cyan-300 transition-all duration-500 shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                    />
                    <span className="text-[11px] font-mono text-slate-500">
                      {'0' + (idx + 1) + ':00'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </SectionReveal>

        {/* Data Filter and Table Section */}
        <SectionReveal delay={0.3}>
          <div className="p-6 md:p-8 rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-md">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
              <div className="flex flex-wrap items-center gap-2">
                <Filter size={18} className="text-cyan-400 mr-1" />
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                      selectedCategory === cat
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-sm'
                        : 'bg-slate-800/60 text-slate-400 hover:text-white border border-white/5'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="w-full md:w-64">
                <input
                  type="text"
                  placeholder="Filter by metric name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-950/70 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                />
              </div>
            </div>

            {/* Responsive Data Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-xs font-mono uppercase tracking-wider text-slate-400">
                    <th className="py-3 px-4">Metric</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Current Value</th>
                    <th className="py-3 px-4">24h Change</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Last Updated</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  {filteredData.map((record) => (
                    <tr key={record.id} className="hover:bg-white/[0.03] transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-white">{record.metric}</td>
                      <td className="py-3.5 px-4 text-slate-400">
                        <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-slate-800/80 text-slate-300 border border-white/5">
                          {record.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-cyan-300">{record.value}</td>
                      <td className="py-3.5 px-4 font-mono">
                        <span
                          className={
                            record.change > 0
                              ? 'text-emerald-400 font-semibold'
                              : record.change < 0
                              ? 'text-cyan-400 font-semibold'
                              : 'text-slate-400'
                          }
                        >
                          {record.change > 0 ? `+${record.change}%` : `${record.change}%`}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${
                            record.status === 'optimal'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                              : record.status === 'warning'
                              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                              : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current" />
                          {record.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-xs text-slate-500">{record.timestamp}</td>
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
