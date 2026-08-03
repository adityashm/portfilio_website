import { ExperienceData } from '../types/experience';
import { ProjectData } from '../types/project';
import { projects } from './projects';

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  link: string;
}

export interface SkillCategory {
  title: string;
  iconName: 'Code2' | 'Layout' | 'Database' | 'Cloud' | 'Terminal' | 'GitBranch';
  skills: string[];
}

export interface AboutCard {
  iconName: 'Code2' | 'Brain' | 'Coffee';
  title: string;
  description: string;
}

export const certificationsData: Certification[] = [
  {
    title: 'Deloitte Australia - Cyber Job Simulation',
    issuer: 'Forage',
    date: 'Jul 2025',
    credentialId: 'ttwEQC4uXrticcRDL',
    link: 'https://forage.com/simulations/ttwEQC4uXrticcRDL'
  },
  {
    title: 'Deloitte Australia - Data Analytics Job Simulation',
    issuer: 'Forage',
    date: 'Jul 2025',
    credentialId: 'avYGWxfBtoGzkTfRp',
    link: 'https://forage.com/simulations/avYGWxfBtoGzkTfRp'
  },
  {
    title: 'Tata - Data Visualisation: Empowering Business with Effective Insights Job Simulation',
    issuer: 'Forage',
    date: 'Jul 2025',
    credentialId: 'XrxgqYdQ7fTTWPrdd',
    link: 'https://forage.com/simulations/XrxgqYdQ7fTTWPrdd'
  },
  {
    title: 'Programming for Everybody',
    issuer: 'University of Michigan',
    date: 'Apr 2024',
    credentialId: 'TQNT2TS885BR',
    link: 'https://www.coursera.org/account/accomplishments/verify/TQNT2TS885BR'
  },
  {
    title: 'Python (Basic)',
    issuer: 'Hacker Rank',
    date: 'Apr 2024',
    credentialId: '99cd52db45dd',
    link: 'https://www.hackerrank.com/certificates/99cd52db45dd'
  },
  {
    title: 'Responsible AI: Applying AI Principles with Google Cloud',
    issuer: 'Google',
    date: 'May 2024',
    credentialId: 'GOOGLE-8957127',
    link: 'https://www.cloudskillsboost.google/public_profiles/244b393c-66e4-4e6b-9155-5ecfcd510c75/badges/8957127'
  },
  {
    title: 'Introduction to Large Language Models',
    issuer: 'Google',
    date: 'May 2024',
    credentialId: 'GOOGLE-8858720',
    link: 'https://www.cloudskillsboost.google/public_profiles/244b393c-66e4-4e6b-9155-5ecfcd510c75/badges/8858720'
  }
];

export const experiencesData: ExperienceData[] = [
  {
    title: 'Vocational Trainee – Industrial IT & Cybersecurity',
    company: 'NTPC Dadri',
    period: '1 June 2026 - 30 June 2026',
    description: [
      'Gained hands-on exposure to industrial IT infrastructure, network operations, and cybersecurity practices in a large-scale power sector environment',
      'Worked with Linux-based systems; learned OS-level performance monitoring and system reliability practices relevant to enterprise environments',
      'Observed SDLC/STLC workflows in industrial software deployments, including testing, lifecycle management, and performance validation'
    ]
  },
  {
    title: 'Space Tech Intern',
    company: 'India Space Lab (under India Space Week)',
    period: 'Jun 2025 - Aug 2025',
    description: [
      'Gained hands‑on experience in Advanced Drone Technology: UAV design, aerodynamics, materials, and ROS/Python-based autonomous control systems',
      'Designed, built, and launched model rockets—covering propulsion, staging mechanisms, and mission deployment',
      'Developed a student‑satellite (CanSat / CubeSat), implementing electronics, mission planning, and data telemetry',
      'Collaborated with ISRO and DRDO mentors and worked alongside peers from IITs, IIM-A, and IIST on space entrepreneurship modules',
      'Presented project prototypes and participated in simulated mission exercises, strengthening problem-solving & teamwork skills'
    ]
  },
  {
    title: 'Technical Team Lead',
    company: 'College Technical Society',
    period: 'Aug 2022 - Present',
    description: [
      'Lead a team of 10 students in various technical projects',
      'Organized workshops and technical events',
      'Mentored junior members in web development and programming',
      'Managed project timelines and deliverables'
    ]
  }
];

export const skillsData: SkillCategory[] = [
  {
    title: 'Programming & Algorithms',
    iconName: 'Code2',
    skills: ['Python', 'JavaScript', 'TypeScript', 'C', 'Data Structures & Algorithms (250+ LeetCode)']
  },
  {
    title: 'Data Science & Machine Learning',
    iconName: 'Database',
    skills: ['Pandas & NumPy', 'Scikit-learn', 'Data Wrangling & EDA', 'TensorFlow & Keras', 'Matplotlib']
  },
  {
    title: 'Web Development & Full-Stack',
    iconName: 'Layout',
    skills: ['React.js', 'Next.js', 'HTML5 & CSS3', 'Tailwind CSS', 'Node.js & Express']
  },
  {
    title: 'Cloud, DevOps & Systems',
    iconName: 'Cloud',
    skills: ['AWS', 'Docker', 'Linux Systems', 'Agile & Scrum Workflow']
  },
  {
    title: 'Tools & Technologies',
    iconName: 'Terminal',
    skills: ['Git & GitHub', 'VS Code', 'Postman', 'Figma']
  },
  {
    title: 'Core Competencies',
    iconName: 'GitBranch',
    skills: ['Algorithmic Optimization', 'Analytical Thinking', 'System Reliability', 'Team Collaboration']
  }
];

export const aboutCardsData: AboutCard[] = [
  {
    iconName: 'Code2',
    title: 'Full-Stack Software Engineering',
    description: 'Experienced in React, TypeScript, Node.js, and Agile/Scrum methodologies. Focused on building scalable, reliable enterprise web applications.'
  },
  {
    iconName: 'Brain',
    title: 'Algorithmic Problem Solving (250+ LeetCode)',
    description: 'Completed 250+ Data Structures & Algorithms (DSA) challenges on LeetCode across dynamic programming, trees, graphs, and system complexity optimization.'
  },
  {
    iconName: 'Coffee',
    title: 'Data Science & Applied ML',
    description: 'Proficient in Python (Pandas, NumPy, Scikit-learn), Exploratory Data Analysis (EDA), and neural network foundations with TensorFlow & Keras.'
  }
];

export const aboutBioData = [
  "I'm a B.Tech Computer Science Engineering student at IMS Engineering College, Ghaziabad, maintaining an 8.6 CGPA with a strong foundation in algorithmic problem-solving, full-stack development, and data systems.",
  "I have solved 250+ Data Structures & Algorithms (DSA) problems on LeetCode, sharpening my ability to design time- and space-efficient software. Alongside algorithmic rigor, I bring practical hands-on experience in Linux systems, industrial IT cybersecurity (NTPC Dadri), and autonomous telemetry systems (India Space Lab)."
];

export { projects as projectsData };
export type { ProjectData };
