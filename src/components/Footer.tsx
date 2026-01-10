import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

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
      color: 'hover:text-gray-900 dark:hover:text-white'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/adityashm/',
      color: 'hover:text-blue-600 dark:hover:text-blue-400'
    },
    {
      icon: Mail,
      label: 'Email',
      href: 'mailto:aditi111106@gmail.com',
      color: 'hover:text-red-600 dark:hover:text-red-400'
    }
  ];

  return (
    <footer className="bg-gray-900 dark:bg-black text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-2">Aditya Sharma</h3>
            <p className="text-gray-400">
              Full Stack Developer | B.Tech CS Student
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Passionate about building web applications and solving problems with code.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <ExternalLink size={16} />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <div className="flex gap-6">
              {social.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={item.label}
                    className={`text-gray-400 transition-colors ${item.color}`}
                  >
                    <Icon size={24} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>&copy; {currentYear} Aditya Sharma. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="https://adityashm.me/sitemap.xml" className="hover:text-white transition-colors">
              Sitemap
            </a>
            <a href="https://adityashm.me/robots.txt" className="hover:text-white transition-colors">
              Robots
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
