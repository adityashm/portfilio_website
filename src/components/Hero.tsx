import { Github, Linkedin, Mail, FileText, Code2, Download, Sparkles } from 'lucide-react';
import Silk from './3d/Silk';

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center bg-transparent overflow-hidden">
      {/* Refined Atmospheric Cosmic Cyber-Silk WebGL Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-45">
        <Silk 
          speed={1.2} 
          scale={1.1} 
          color="#00f0ff" 
          noiseIntensity={0.6} 
          rotation={0.3} 
          lightMode={false}
        />
      </div>

      {/* Atmospheric Soft Cosmic Voids for Maximum Text Readability */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-t from-[#030712] via-[#030712]/60 to-[#030712]/30" />
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,_transparent_0%,_#030712_85%)]" />

      <div className="relative z-10 container mx-auto px-6 py-24 md:py-32">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Left Column: Bio & Hero Details */}
          <div className="w-full lg:w-7/12 text-center lg:text-left">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-medium backdrop-blur-md mb-6 shadow-[0_0_15px_rgba(0,240,255,0.15)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
              </span>
              <span>Final-year B.Tech CSE • Class of 2027</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12] mb-4">
              Hi, I'm{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-100 to-white">
                Aditya Sharma
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 mb-5">
              Software Engineer &amp; Technology Innovator
            </p>

            {/* Bio Description */}
            <p className="text-base sm:text-lg text-slate-300 mb-6 max-w-xl leading-relaxed">
              Passionate about scalable systems, full-stack platforms, and algorithmic problem-solving.
              Experienced in industrial IT cybersecurity, space telemetry systems, and machine learning architectures.
            </p>

            {/* Metric Chips */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2.5 mb-8 text-xs font-mono">
              <span className="px-3 py-1.5 bg-cyan-950/50 text-cyan-300 border border-cyan-500/30 rounded-full font-semibold shadow-[0_0_12px_rgba(0,240,255,0.15)]">
                B.TECH CSE • 8.31 CGPA
              </span>
              <span className="px-3 py-1.5 bg-slate-900/80 text-amber-300 border border-amber-500/30 rounded-full font-semibold shadow-[0_0_12px_rgba(245,158,11,0.15)]">
                ⚡ 250+ LEETCODE DSA (1500+ RATING)
              </span>
              <span className="px-3 py-1.5 bg-slate-900/80 text-cyan-200 border border-cyan-400/20 rounded-full font-medium">
                NTPC Dadri &amp; ISL Trained
              </span>
            </div>

            {/* Action Buttons (Strict 2-Tier Hierarchy) */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5">
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-resume-preview'))}
                aria-label="Preview Aditya Sharma's Resume PDF inline"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[46px] bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl active:scale-95 transition-all duration-200 shadow-[0_0_25px_rgba(0,240,255,0.4)] focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
              >
                <FileText size={18} />
                <span>Preview Resume</span>
              </button>

              <a
                href="/Aditya_Sharma_Resume.pdf"
                download="Aditya_Sharma_Resume.pdf"
                aria-label="Download Aditya Sharma's Resume PDF"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[46px] bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-white/10 hover:border-cyan-400/50 font-semibold rounded-xl active:scale-95 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none backdrop-blur-md"
              >
                <Download size={18} />
                <span>Download CV</span>
              </a>

              <a
                href="#contact"
                aria-label="Navigate to contact section"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[46px] border border-cyan-500/20 hover:border-cyan-400/60 text-cyan-300 hover:text-cyan-200 hover:bg-cyan-950/30 font-medium rounded-xl active:scale-95 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
              >
                <Mail size={18} />
                <span>Contact Me</span>
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center justify-center lg:justify-start gap-4 mt-8">
              <a
                href="https://github.com/ADITYASHM"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-2.5 min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-xl text-slate-400 hover:text-cyan-300 bg-slate-900/60 hover:bg-slate-900 border border-white/5 hover:border-cyan-400/40 shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com/in/adityashm"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-2.5 min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-xl text-slate-400 hover:text-cyan-300 bg-slate-900/60 hover:bg-slate-900 border border-white/5 hover:border-cyan-400/40 shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://leetcode.com/u/adityashm/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LeetCode Profile (250+ DSA Solved)"
                title="LeetCode (250+ DSA Solved)"
                className="p-2.5 min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-xl text-slate-400 hover:text-amber-400 bg-slate-900/60 hover:bg-slate-900 border border-white/5 hover:border-amber-400/40 shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
              >
                <Code2 size={20} />
              </a>
            </div>
          </div>

          {/* Right Column: Cyber Orbital Portal & Telemetry Hub */}
          <div className="w-full lg:w-5/12 flex justify-center items-center">
            <div className="relative flex items-center justify-center w-72 h-72 sm:w-88 sm:h-88 lg:w-96 lg:h-96">
              {/* Ambient Radial Backlight Glow */}
              <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

              {/* Outer Dashed Cyber Ring */}
              <div className="absolute -inset-2 sm:-inset-4 rounded-full border border-dashed border-cyan-400/25 animate-[spin_40s_linear_infinite] pointer-events-none" />

              {/* Secondary Glowing Ring */}
              <div className="absolute -inset-5 sm:-inset-8 rounded-full border border-cyan-500/10 pointer-events-none" />

              {/* Main Avatar Circular Frame */}
              <div className="relative w-60 h-60 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full p-1.5 bg-gradient-to-b from-cyan-400 via-cyan-500/40 to-blue-600 shadow-[0_0_45px_rgba(0,240,255,0.3)]">
                <div className="w-full h-full rounded-full overflow-hidden relative bg-slate-950">
                  <img
                    src="/IMG_1033.JPG"
                    alt="Aditya Sharma"
                    loading="eager"
                    fetchPriority="high"
                    className="w-full h-full object-cover object-center transform scale-105"
                  />
                  {/* Subtle dark gradient overlay to integrate background */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Floating Frosted Telemetry Badge 1: Role Availability */}
              <div className="absolute -top-3 -right-2 sm:-top-2 sm:right-2 glass-card-cosmic px-3.5 py-1.5 rounded-full border border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.25)] flex items-center gap-2 backdrop-blur-xl z-20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                </span>
                <span className="text-[11px] font-mono font-semibold text-emerald-300">Open to Roles</span>
              </div>

              {/* Floating Frosted Telemetry Badge 2: LeetCode Stat */}
              <div className="absolute -bottom-3 -left-3 sm:bottom-4 sm:-left-6 glass-card-cosmic px-3.5 py-1.5 rounded-full border border-cyan-500/40 shadow-[0_0_20px_rgba(0,240,255,0.25)] flex items-center gap-2 backdrop-blur-xl z-20">
                <span className="text-amber-400 text-xs font-bold font-mono">⚡ 250+</span>
                <span className="text-[11px] font-mono text-cyan-200">LeetCode Solved</span>
              </div>

              {/* Floating Frosted Telemetry Badge 3: Tech Stack */}
              <div className="absolute -bottom-4 right-2 sm:bottom-0 sm:right-0 glass-card-cosmic px-3.5 py-1.5 rounded-full border border-indigo-500/40 shadow-[0_0_20px_rgba(99,102,241,0.2)] flex items-center gap-1.5 backdrop-blur-xl z-20">
                <Sparkles className="w-3 h-3 text-cyan-300" />
                <span className="text-[11px] font-mono text-slate-200">Full-Stack &amp; ML</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;