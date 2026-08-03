import { Github, Linkedin, Mail, FileText } from 'lucide-react';

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center bg-transparent overflow-hidden">
      <div className="relative z-10 container mx-auto px-6 py-20 md:py-32">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/2 text-center md:text-left">
            <div className="badge-tech mb-4">
              <span>Final-year B.Tech Computer Science Engineering Student</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Hi, I'm <span className="text-cyan-400">Aditya Sharma</span>
            </h1>
            <p className="text-xl md:text-2xl text-violet-400 mb-8 font-medium">
              Software Engineer & Technology Innovator
            </p>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl">
              Passionate about software development and technology innovation. Currently exploring web development,
              machine learning, and cloud computing.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <a
                href="/Aditya_Sharma_Resume.pdf"
                download="Aditya_Sharma_Resume.pdf"
                aria-label="Download Aditya Sharma's Resume PDF"
                className="flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white rounded-lg active:scale-95 transition-all duration-150 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none shadow-[0_0_20px_rgba(0,240,255,0.3)]"
              >
                <FileText size={20} />
                Download Resume
              </a>
              <a
                href="#contact"
                aria-label="Navigate to contact section"
                className="flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] border border-cyan-400/50 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 rounded-lg active:scale-95 transition-all duration-150 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
              >
                <Mail size={20} />
                Contact Me
              </a>
            </div>
            <div className="flex justify-center md:justify-start gap-6 mt-8">
              <a
                href="https://github.com/ADITYASHM"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-2.5 min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
              >
                <Github size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/adityashm/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-2.5 min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
            <div className="relative mx-auto max-w-full overflow-hidden p-6 glass-card-spotlight rounded-2xl">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-cyan-400/60 shadow-[0_0_30px_rgba(0,240,255,0.2)] mx-auto">
                <img
                  src="/IMG_1033.JPG"
                  alt="Aditya Sharma"
                  loading="eager"
                  fetchPriority="high"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-cyan-500/20 rounded-full opacity-20 max-w-full overflow-hidden pointer-events-none blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;