import { Github, Linkedin, Mail, ExternalLink, Code2 } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = [
    { label: 'Home', href: '#' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' }
  ];

  const social = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/adityashm',
      glow: 'hover:border-cyan-400 hover:text-cyan-300 hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/adityashm/',
      glow: 'hover:border-violet-400 hover:text-violet-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]'
    },
    {
      icon: Code2,
      label: 'LeetCode',
      href: 'https://leetcode.com/u/adityashm/',
      glow: 'hover:border-amber-400 hover:text-amber-300 hover:shadow-[0_0_15px_rgba(245,158,11,0.3)]'
    },
    {
      icon: Mail,
      label: 'Email',
      href: 'mailto:adityashm09@gmail.com',
      glow: 'hover:border-rose-400 hover:text-rose-300 hover:shadow-[0_0_15px_rgba(244,63,94,0.3)]'
    }
  ];

  return (
    <footer className="bg-slate-950/90 backdrop-blur-md border-t border-white/10 text-white relative z-10 py-12">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400 mb-1">
              Aditya Sharma
            </h2>
            <p className="text-cyan-400 text-sm font-semibold mb-2">
              Full Stack Developer | B.Tech CS Student
            </p>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Passionate about building web applications and solving problems with code.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-mono uppercase tracking-widest text-slate-300 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-2 py-1 text-sm font-medium focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:outline-none rounded"
                  >
                    <ExternalLink size={14} className="text-cyan-500" />
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-sm font-mono uppercase tracking-widest text-slate-300 mb-4">
              Connect
            </h3>
            <div className="flex gap-3">
              {social.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={item.label}
                    aria-label={`Connect via ${item.label}`}
                    className={`p-3 rounded-xl bg-slate-900 border border-white/10 text-slate-300 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:outline-none ${item.glow}`}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-8"></div>

        {/* Copyright & Manifest links */}
        <div className="flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm gap-4">
          <p>&copy; {currentYear} Aditya Sharma. All rights reserved.</p>
          <div className="flex gap-6 font-mono text-xs">
            <a href="https://adityashm.tech/sitemap.xml" className="hover:text-cyan-300 transition-colors focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:outline-none rounded">
              Sitemap
            </a>
            <a href="https://adityashm.tech/robots.txt" className="hover:text-cyan-300 transition-colors focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:outline-none rounded">
              Robots
            </a>
            <a href="#contact" className="hover:text-cyan-300 transition-colors focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:outline-none rounded">
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
