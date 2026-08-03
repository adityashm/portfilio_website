import { Helmet } from 'react-helmet-async';
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
      <Helmet>
        <title>Aditya Sharma | B.Tech CSE Student & Software Developer</title>
        <meta name="description" content="Portfolio of Aditya Sharma, final-year B.Tech CSE student. Projects & skills in Python, Go, machine learning, cybersecurity, and full-stack development." />
        <link rel="canonical" href="https://adityashm.tech/" />
        <meta property="og:title" content="Aditya Sharma | B.Tech CSE Student & Software Developer" />
        <meta property="og:description" content="Portfolio of Aditya Sharma, final-year B.Tech CSE student with projects in Python, Go, machine learning, cybersecurity, and full-stack web development." />
        <meta property="og:url" content="https://adityashm.tech/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Aditya Sharma | B.Tech CSE Student & Software Developer" />
        <meta name="twitter:description" content="Portfolio of Aditya Sharma, final-year B.Tech CSE student with projects in Python, Go, ML, cybersecurity, and web development." />
      </Helmet>
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

