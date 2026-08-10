import SEO from '../components/SEO';
import Hero from '../components/Hero';
import About from '../components/About';
import Education from '../components/Education';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Certifications from '../components/Certifications';
import Stats from '../components/Stats';
import GitHubStats from '../components/GitHubStats';
import Contact from '../components/Contact';
import Layout from '../components/Layout';

export default function HomePage() {
  return (
    <Layout>
      <SEO 
        title="Aditya Sharma | B.Tech CSE Student & Software Developer" 
        description="Portfolio of Aditya Sharma, final-year B.Tech CSE student. Projects & skills in Python, Go, machine learning, cybersecurity, and full-stack development." 
        url="https://adityashm.tech/" 
      />
      <Hero />
      <About />
      <Education />
      <Skills />
      <Projects />
      <Stats />
      <Experience />
      <Certifications />
      <GitHubStats />
      <Contact />
    </Layout>
  );
}

