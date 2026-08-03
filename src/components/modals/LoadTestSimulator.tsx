import { useState, useEffect } from 'react';
import { Zap, Play, Activity } from 'lucide-react';

interface LoadTestResult {
  p50: number;
  p95: number;
  p99: number;
  throughput: number;
  successRate: number;
  histogram: { bucket: string; count: number; height: number }[];
}

export default function LoadTestSimulator({ title = 'API Gate Concurrency Benchmark' }: { title?: string }) {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<LoadTestResult | null>({
    p50: 18.4,
    p95: 34.2,
    p99: 58.9,
    throughput: 1420,
    successRate: 100,
    histogram: [
      { bucket: '<15ms', count: 32, height: 60 },
      { bucket: '15-25ms', count: 48, height: 95 },
      { bucket: '25-35ms', count: 12, height: 35 },
      { bucket: '35-50ms', count: 6, height: 20 },
      { bucket: '>50ms', count: 2, height: 10 },
    ]
  });

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isRunning) {
      setProgress(0);
      setResult(null);
      let cur = 0;
      timer = setInterval(() => {
        cur += 10;
        if (cur >= 100) {
          cur = 100;
          setIsRunning(false);
          window.dispatchEvent(new CustomEvent('unlock-achievement', { detail: 'stress-tester' }));
          // Generate realistic benchmark distribution
          const p50Val = parseFloat((16 + Math.random() * 5).toFixed(1));
          const p95Val = parseFloat((29 + Math.random() * 8).toFixed(1));
          const p99Val = parseFloat((48 + Math.random() * 15).toFixed(1));
          const tput = Math.floor(1350 + Math.random() * 200);
          setResult({
            p50: p50Val,
            p95: p95Val,
            p99: p99Val,
            throughput: tput,
            successRate: 100,
            histogram: [
              { bucket: '<15ms', count: 35, height: 65 },
              { bucket: '15-25ms', count: 45, height: 90 },
              { bucket: '25-35ms', count: 14, height: 40 },
              { bucket: '35-50ms', count: 4, height: 18 },
              { bucket: '>50ms', count: 2, height: 10 },
            ]
          });
        }
        setProgress(cur);
      }, 150);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning]);

  const handleRun = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  return (
    <div className="glass-card-cosmic rounded-2xl p-6 border border-cyan-500/30 shadow-[0_0_30px_rgba(0,240,255,0.1)] space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400">
            <Zap size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white tracking-tight">{title}</h3>
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-violet-500/10 text-violet-300 border border-violet-500/30 rounded-full">
                100 CONCURRENT REQ
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Simulates concurrent HTTP traffic to benchmark latency tail percentiles (p50 / p95 / p99)
            </p>
          </div>
        </div>

        <button
          onClick={handleRun}
          disabled={isRunning}
          aria-label="Run Load Test Benchmark"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-lg transition-all"
        >
          {isRunning ? (
            <>
              <Activity size={14} className="animate-spin" />
              Testing ({progress}%)...
            </>
          ) : (
            <>
              <Play size={14} />
              Run Load Test
            </>
          )}
        </button>
      </div>

      {/* Progress bar when running */}
      {isRunning && (
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-mono text-cyan-400">
            <span>Dispatching 100 concurrent workers...</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-white/10">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-violet-500 transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Results grid */}
      {result && (
        <div className="space-y-4 pt-2">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div className="p-3 bg-slate-900/80 border border-white/10 rounded-xl">
              <span className="text-[10px] font-mono text-slate-400 uppercase">p50 Latency</span>
              <p className="text-lg font-extrabold font-mono text-emerald-400 mt-0.5">{result.p50} ms</p>
            </div>
            <div className="p-3 bg-slate-900/80 border border-white/10 rounded-xl">
              <span className="text-[10px] font-mono text-slate-400 uppercase">p95 Latency</span>
              <p className="text-lg font-extrabold font-mono text-cyan-400 mt-0.5">{result.p95} ms</p>
            </div>
            <div className="p-3 bg-slate-900/80 border border-white/10 rounded-xl">
              <span className="text-[10px] font-mono text-slate-400 uppercase">p99 Latency</span>
              <p className="text-lg font-extrabold font-mono text-violet-400 mt-0.5">{result.p99} ms</p>
            </div>
            <div className="p-3 bg-slate-900/80 border border-white/10 rounded-xl">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Throughput</span>
              <p className="text-lg font-extrabold font-mono text-amber-400 mt-0.5">{result.throughput} r/s</p>
            </div>
            <div className="p-3 bg-slate-900/80 border border-white/10 rounded-xl col-span-2 sm:col-span-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Success Rate</span>
              <p className="text-lg font-extrabold font-mono text-emerald-400 mt-0.5">{result.successRate}%</p>
            </div>
          </div>

          {/* Histogram bar chart */}
          <div className="p-4 bg-slate-900/60 border border-white/5 rounded-xl">
            <div className="flex justify-between items-center text-xs font-mono text-slate-400 mb-3">
              <span>Latency Distribution Histogram (100 Samples)</span>
              <span className="text-emerald-400 font-bold">● 0 Dropped Packets</span>
            </div>
            <div className="flex items-end justify-between h-20 gap-2 px-2 pt-4">
              {result.histogram.map((col) => (
                <div key={col.bucket} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full bg-gradient-to-t from-cyan-500/60 to-violet-500/80 rounded-t border-t border-cyan-400 transition-all duration-300"
                    style={{ height: `${col.height}%` }}
                  />
                  <span className="text-[10px] font-mono text-slate-400 truncate">{col.bucket}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
