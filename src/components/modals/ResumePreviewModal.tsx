import { useState, useEffect } from 'react';
import { X, Download, ExternalLink, FileText, CheckCircle2, Briefcase, GraduationCap, Code, Award, Mail, Github, Linkedin, MapPin, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ResumePreviewModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'interactive' | 'pdf'>('interactive');

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      window.dispatchEvent(new CustomEvent('unlock-achievement', { detail: 'recruiter-scout' }));
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('open-resume-preview', handleOpen);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('open-resume-preview', handleOpen);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-5xl bg-slate-950/95 border border-cyan-500/40 rounded-2xl shadow-[0_0_60px_rgba(0,240,255,0.25)] overflow-hidden flex flex-col max-h-[92vh]"
          >
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-white/10 bg-slate-900/80">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400">
                  <FileText size={22} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white tracking-tight">
                      Aditya Sharma — Interactive CV
                    </h3>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full">
                      <CheckCircle2 size={10} />
                      VERIFIED_CV
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">Full Stack Web &amp; Cybersecurity Systems Developer</p>
                </div>
              </div>

              {/* Toggle & Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Mode Toggle */}
                <div className="flex bg-slate-900 border border-white/10 p-0.5 rounded-lg text-xs font-mono">
                  <button
                    onClick={() => setViewMode('interactive')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all ${
                      viewMode === 'interactive'
                        ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Eye size={13} />
                    <span>Formatted Sheet</span>
                  </button>
                  <button
                    onClick={() => setViewMode('pdf')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all ${
                      viewMode === 'pdf'
                        ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <FileText size={13} />
                    <span>A4 Document Sheet</span>
                  </button>
                </div>

                <a
                  href="/Aditya_Sharma_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-white/10 rounded-lg transition-colors"
                >
                  <ExternalLink size={14} />
                  <span>Open PDF Tab</span>
                </a>
                <a
                  href="/Aditya_Sharma_Resume.pdf"
                  download="Aditya_Sharma_Resume.pdf"
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white rounded-lg shadow-md transition-all"
                >
                  <Download size={14} />
                  <span>Download PDF</span>
                </a>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close Resume Preview Modal"
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors ml-1"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6 bg-slate-950">
              {viewMode === 'interactive' ? (
                <div className="max-w-4xl mx-auto bg-slate-900/70 border border-white/10 rounded-2xl p-6 sm:p-10 space-y-8 shadow-2xl text-slate-200">
                  {/* Interactive CV Header */}
                  <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                        ADITYA SHARMA
                      </h2>
                      <p className="text-cyan-400 font-mono text-sm sm:text-base font-semibold mt-1">
                        Full-Stack &amp; Cybersecurity Systems Developer
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-3">
                        <span className="flex items-center gap-1">
                          <MapPin size={13} className="text-violet-400" /> India
                        </span>
                        <a href="#contact" className="flex items-center gap-1 hover:text-cyan-400 transition-colors">
                          <Mail size={13} className="text-cyan-400" /> aditya.sharma@space-lab.in
                        </a>
                        <a href="https://github.com/adityashm" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-cyan-400 transition-colors">
                          <Github size={13} /> github.com/adityashm
                        </a>
                        <a href="https://www.linkedin.com/in/adityashm/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-cyan-400 transition-colors">
                          <Linkedin size={13} /> linkedin.com/in/adityashm
                        </a>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-start sm:items-end gap-2 text-xs font-mono">
                      <span className="px-2.5 py-1 bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 rounded-lg font-bold">
                        B.TECH CSE • 8.6 CGPA
                      </span>
                      <span className="px-2.5 py-1 bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded-lg font-bold">
                        250+ LEETCODE DSA
                      </span>
                      <span className="text-slate-400">NTPC Dadri &amp; ISL Trained</span>
                    </div>
                  </div>

                  {/* Summary */}
                  <div>
                    <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Code size={14} /> Professional Summary
                    </h4>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      B.Tech Computer Science &amp; Engineering student at IMS Engineering College (8.6 CGPA) with strong algorithmic rigor (250+ LeetCode DSA solved) and practical experience in full-stack web architectures, industrial IT infrastructure, and applied machine learning (Pandas, Scikit-learn, TensorFlow). Proven hands-on experience in building scalable REST APIs, automated scraping pipelines, and enterprise data visualization dashboards.
                    </p>
                  </div>

                  {/* Experience */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider border-b border-white/10 pb-2 flex items-center gap-2">
                      <Briefcase size={14} /> Professional Experience &amp; Training
                    </h4>

                    {/* NTPC Dadri */}
                    <div className="p-4 bg-slate-950/60 border border-white/5 rounded-xl space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h5 className="font-bold text-white text-sm">
                          Vocational Trainee – Industrial IT &amp; Cybersecurity
                        </h5>
                        <span className="text-xs font-mono text-cyan-300 bg-slate-800 px-2 py-0.5 rounded">
                          June 2026 – June 2026
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-violet-400">NTPC Dadri</p>
                      <ul className="list-disc list-inside text-xs text-slate-300 space-y-1.5 leading-relaxed pt-1">
                        <li>Gaining hands-on exposure to industrial IT infrastructure, network operations, and cybersecurity practices in a large-scale power sector environment.</li>
                        <li>Working with Linux-based systems; learning OS-level performance monitoring and system reliability practices relevant to enterprise environments.</li>
                        <li>Observing SDLC/STLC workflows in industrial software deployments, including testing, lifecycle management, and performance validation.</li>
                      </ul>
                    </div>

                    {/* India Space Lab */}
                    <div className="p-4 bg-slate-950/60 border border-white/5 rounded-xl space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h5 className="font-bold text-white text-sm">
                          Summer Internship – Technical Training Program
                        </h5>
                        <span className="text-xs font-mono text-cyan-300 bg-slate-800 px-2 py-0.5 rounded">
                          June 2025 – July 2025
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-violet-400">India Space Lab</p>
                      <ul className="list-disc list-inside text-xs text-slate-300 space-y-1.5 leading-relaxed pt-1">
                        <li>Completed advanced training in Space Science, Technology, and embedded systems telemetry.</li>
                        <li>Specialized modules: Advanced Drone Technology, CubeSat, and Satellite communication programs.</li>
                        <li>Collaborated with industry experts and gained hands-on experience in high-reliability technical systems.</li>
                      </ul>
                    </div>
                  </div>

                  {/* Skills Grid */}
                  <div>
                    <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider border-b border-white/10 pb-2 mb-3 flex items-center gap-2">
                      <Award size={14} /> Technical Competencies &amp; Skills
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 bg-slate-950/40 border border-white/5 rounded-xl">
                        <span className="font-bold text-white block mb-1">Algorithmic Problem Solving</span>
                        <span className="text-slate-300 font-mono">250+ LeetCode DSA Solved, Data Structures, Dynamic Programming, Time/Space Optimization</span>
                      </div>
                      <div className="p-3 bg-slate-950/40 border border-white/5 rounded-xl">
                        <span className="font-bold text-white block mb-1">Data Science &amp; Applied ML</span>
                        <span className="text-slate-300 font-mono">Python, Pandas, NumPy, Scikit-learn, EDA, TensorFlow, Keras, Matplotlib</span>
                      </div>
                      <div className="p-3 bg-slate-950/40 border border-white/5 rounded-xl">
                        <span className="font-bold text-white block mb-1">Full-Stack Web Engineering</span>
                        <span className="text-slate-300 font-mono">TypeScript, React 18, Vite, Tailwind CSS, Node.js, Express, PostgreSQL, Supabase</span>
                      </div>
                      <div className="p-3 bg-slate-950/40 border border-white/5 rounded-xl">
                        <span className="font-bold text-white block mb-1">DevOps, Cloud &amp; Security</span>
                        <span className="text-slate-300 font-mono">Linux CLI, Industrial Cybersecurity, Git/GitHub, Docker, REST API Security</span>
                      </div>
                    </div>
                  </div>

                  {/* Projects */}
                  <div>
                    <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider border-b border-white/10 pb-2 mb-3 flex items-center gap-2">
                      <Code size={14} /> Featured Projects &amp; Demos
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 bg-slate-950/40 border border-white/5 rounded-xl">
                        <a href="/price-comparison" className="font-bold text-cyan-300 hover:underline block mb-1">
                          Price Comparison &amp; Deal Finder ↗
                        </a>
                        <p className="text-slate-400">Multi-platform scraping engine with real-time price history &amp; automated email drop alerts.</p>
                      </div>
                      <div className="p-3 bg-slate-950/40 border border-white/5 rounded-xl">
                        <a href="/expense-tracker" className="font-bold text-cyan-300 hover:underline block mb-1">
                          Smart Expense Tracker ↗
                        </a>
                        <p className="text-slate-400">Financial analytics SPA with interactive ₹50,000 demo budget, Recharts breakdown &amp; AI tips.</p>
                      </div>
                      <div className="p-3 bg-slate-950/40 border border-white/5 rounded-xl">
                        <a href="/data-dashboard" className="font-bold text-cyan-300 hover:underline block mb-1">
                          Data Analysis &amp; Visualization Dashboard ↗
                        </a>
                        <p className="text-slate-400">High-throughput telemetry monitor with p50/p95 latency histograms &amp; CSV export.</p>
                      </div>
                      <div className="p-3 bg-slate-950/40 border border-white/5 rounded-xl">
                        <a href="/web-scraper" className="font-bold text-cyan-300 hover:underline block mb-1">
                          Web Scraper with Database Console ↗
                        </a>
                        <p className="text-slate-400">Multi-threaded crawler terminal with exponential backoff &amp; SQLite record persistence.</p>
                      </div>
                    </div>
                  </div>

                  {/* Education */}
                  <div>
                    <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider border-b border-white/10 pb-2 mb-2 flex items-center gap-2">
                      <GraduationCap size={14} /> Education
                    </h4>
                    <div className="flex flex-wrap items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-white">Bachelor of Technology in Computer Science &amp; Engineering</span>
                        <p className="text-slate-400">IMS Engineering College, Ghaziabad (AKTU) • <strong className="text-cyan-300">8.6 CGPA</strong></p>
                      </div>
                      <span className="font-mono text-cyan-300">2027</span>
                    </div>
                  </div>
                </div>
              ) : (
                /* Instant A4 Document Preview Mode (Never Blocks or Downloads) */
                <div className="max-w-3xl mx-auto space-y-4">
                  <div className="p-3 sm:p-4 bg-slate-900/90 border border-cyan-500/30 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs">
                    <span className="text-slate-300 flex items-center gap-2">
                      <FileText size={15} className="text-cyan-400" />
                      <span>A4 Document Preview: <strong className="text-cyan-400 font-mono">Aditya_Sharma_Resume.pdf</strong></span>
                    </span>
                    <div className="flex items-center gap-2">
                      <a
                        href="/Aditya_Sharma_Resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg border border-white/10 transition-colors"
                      >
                        <ExternalLink size={14} />
                        Open PDF Tab
                      </a>
                      <a
                        href="/Aditya_Sharma_Resume.pdf"
                        download="Aditya_Sharma_Resume.pdf"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500 text-slate-950 hover:bg-cyan-400 font-bold rounded-lg transition-colors"
                      >
                        <Download size={14} />
                        Download PDF
                      </a>
                    </div>
                  </div>

                  {/* Clean A4 White Paper Document Replica */}
                  <div className="w-full bg-white text-slate-900 rounded-xl p-6 sm:p-10 shadow-2xl border border-slate-300 font-sans text-xs sm:text-sm leading-relaxed space-y-5">
                    {/* Header */}
                    <div className="border-b-2 border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">
                          Aditya Sharma
                        </h2>
                        <p className="text-slate-600 font-semibold text-xs mt-0.5">
                          Full-Stack &amp; Cybersecurity Systems Developer
                        </p>
                      </div>
                      <div className="text-slate-600 text-xs sm:text-right font-mono">
                        <p>+91 8130110355 | adityashm09@gmail.com</p>
                        <p>Ghaziabad / New Delhi, India</p>
                      </div>
                    </div>

                    {/* Summary Statement */}
                    <div>
                      <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider border-b border-slate-300 pb-1 mb-1.5">
                        Summary Statement
                      </h3>
                      <p className="text-slate-700 text-xs leading-normal">
                        Enthusiastic B.Tech CSE student at IMS Engineering College (8.6 CGPA) with a strong foundation in algorithmic problem-solving (<strong className="text-slate-900">250+ LeetCode DSA Solved</strong>) and full-stack web development. Experienced in industrial IT cybersecurity (NTPC Dadri) and autonomous systems (India Space Lab). Skilled in agile/scrum methodologies, data science, and systems engineering.
                      </p>
                    </div>

                    {/* Education and Training */}
                    <div>
                      <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider border-b border-slate-300 pb-1 mb-1.5">
                        Education and Training
                      </h3>
                      <div className="flex flex-wrap items-center justify-between text-xs font-semibold text-slate-900">
                        <span>B.Tech Computer Science &amp; Engineering</span>
                        <span>Expected Nov 2027</span>
                      </div>
                      <div className="flex flex-wrap items-center justify-between text-xs text-slate-700">
                        <span>IMS ENGINEERING COLLEGE, GHAZIABAD (AKTU)</span>
                        <span className="font-bold text-slate-900">8.6 CGPA</span>
                      </div>
                    </div>

                    {/* Technical Skills */}
                    <div>
                      <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider border-b border-slate-300 pb-1 mb-1.5">
                        Technical Skills
                      </h3>
                      <ul className="list-disc list-inside space-y-1 text-xs text-slate-700">
                        <li><strong className="text-slate-900">Algorithmic Problem Solving:</strong> 250+ LeetCode DSA Solved across Dynamic Programming, Trees, Graphs, and Complexity Optimization.</li>
                        <li><strong className="text-slate-900">Programming Languages:</strong> Python (Pandas, NumPy, Matplotlib, Scikit-learn), JavaScript, TypeScript, C++, SQL.</li>
                        <li><strong className="text-slate-900">Data Science &amp; ML:</strong> Data Wrangling, EDA, Data Visualization, Supervised/Unsupervised Learning, TensorFlow (beginner), Keras.</li>
                        <li><strong className="text-slate-900">Web Development:</strong> React 18, Vite, Tailwind CSS, HTML5, CSS3, Node.js, Express, PostgreSQL, Supabase.</li>
                        <li><strong className="text-slate-900">Cloud, DevOps &amp; Security:</strong> Linux CLI, Industrial Cybersecurity, Git/GitHub, Docker, REST API Security.</li>
                      </ul>
                    </div>

                    {/* Experience */}
                    <div>
                      <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider border-b border-slate-300 pb-1 mb-1.5">
                        Professional Experience &amp; Training
                      </h3>
                      <div className="space-y-3 text-xs">
                        <div>
                          <div className="flex justify-between font-bold text-slate-900">
                            <span>Vocational Trainee – Industrial IT &amp; Cybersecurity</span>
                            <span>June 2026 – June 2026</span>
                          </div>
                          <p className="text-slate-600 italic">NTPC Dadri</p>
                          <ul className="list-disc list-inside text-slate-700 mt-1 space-y-0.5">
                            <li>Gained hands-on exposure to industrial IT infrastructure, network operations, and cybersecurity practices.</li>
                            <li>Worked with Linux-based systems and OS-level performance monitoring in large-scale enterprise environments.</li>
                          </ul>
                        </div>
                        <div>
                          <div className="flex justify-between font-bold text-slate-900">
                            <span>Space Tech Intern</span>
                            <span>June 2025 – August 2025</span>
                          </div>
                          <p className="text-slate-600 italic">India Space Lab (ISL)</p>
                          <ul className="list-disc list-inside text-slate-700 mt-1 space-y-0.5">
                            <li>Designed and built UAV telemetry systems, CanSat / CubeSat student satellites, and ROS/Python control systems.</li>
                            <li>Collaborated with ISRO and DRDO mentors on space engineering prototypes and simulated mission exercises.</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Certifications & Profiles */}
                    <div>
                      <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider border-b border-slate-300 pb-1 mb-1.5">
                        Certifications &amp; Profiles
                      </h3>
                      <div className="flex flex-wrap items-center justify-between text-xs text-slate-700 gap-2">
                        <span>• Python for Everybody (Univ of Michigan) • HackerRank Python • Google Cloud Responsible AI</span>
                        <div className="flex gap-3 font-semibold text-slate-900">
                          <a href="https://github.com/adityashm" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
                          <a href="https://www.linkedin.com/in/adityashm/" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
                          <a href="https://leetcode.com/u/adityashm/" target="_blank" rel="noopener noreferrer" className="hover:underline">LeetCode</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-3 border-t border-white/10 bg-slate-900/80 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
              <span>
                Press <kbd className="px-1.5 py-0.5 bg-slate-800 border border-white/10 rounded text-slate-300 font-mono">ESC</kbd> to close
              </span>
              <div className="flex items-center gap-3">
                <span className="text-emerald-400 font-mono">● Active Verified Profile</span>
                <span className="font-mono text-cyan-400">adityashm.tech</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
