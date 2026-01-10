import { Github, Linkedin, Mail, FileText } from 'lucide-react';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6 py-20 md:py-32">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Hi, I'm <span className="text-blue-600 dark:text-blue-400">Aditya Sharma</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
              B.Tech Computer Science Engineering Student
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">
              Passionate about software development and technology innovation. Currently exploring web development,
              machine learning, and cloud computing.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <a
                href="/Aditya sharma resume.pdf"
                download="Aditya_Sharma_Resume.pdf"
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FileText size={20} />
                Download Resume
              </a>
              <a
                href="#contact"
                className="flex items-center gap-2 px-6 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
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
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                <Github size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/adityashm/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-blue-600 dark:border-blue-400">
                <img
                  src="https://raw.githubusercontent.com/adityashm/portfilio_website/main/public/IMG_1033.JPG"
                  alt="Aditya Sharma"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-600 dark:bg-blue-400 rounded-full opacity-20"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;