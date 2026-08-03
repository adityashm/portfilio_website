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
    title: 'Summer Internship - Technical Training Program',
    company: 'India Space Lab ',
    period: 'Jun 2025 - Jul 2025',
    description: [
      'Completed advanced training in Space Science and Technology',
      'Specialized modules: Advanced Drone Technology, CubeSat and Satellite Programs',
      'Studied Astronomy, Rocketry, Remote Sensing and Space Entrepreneurship',
      'Collaborated with industry experts and gained hands-on experience in space technology'
    ]
  },
  {
    title: 'Web Development Intern',
    company: 'Tech Innovators',
    period: 'Jun 2023 - Aug 2023',
    description: [
      'Developed and maintained responsive web applications using React.js and Node.js',
      'Implemented RESTful APIs and integrated third-party services',
      'Collaborated with senior developers on large-scale projects',
      'Improved application performance by 40% through code optimization'
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
    title: 'Programming Languages',
    iconName: 'Code2',
    skills: ['Python', 'JavaScript', 'TypeScript', 'C']
  },
  {
    title: 'Web Development',
    iconName: 'Layout',
    skills: ['React.js', 'Next.js', 'HTML5', 'CSS3', 'Tailwind CSS']
  },
  {
    title: 'Backend & Databases',
    iconName: 'Database',
    skills: ['Node.js', 'Express.js', 'MongoDB', 'PostgreSQL']
  },
  {
    title: 'Cloud & DevOps',
    iconName: 'Cloud',
    skills: ['AWS', 'Docker', 'Linux']
  },
  {
    title: 'Tools & Technologies',
    iconName: 'Terminal',
    skills: ['Git', 'VS Code', 'Postman', 'Figma']
  },
  {
    title: 'Version Control',
    iconName: 'GitBranch',
    skills: ['Git', 'GitHub', 'GitLab']
  }
];

export const aboutCardsData: AboutCard[] = [
  {
    iconName: 'Code2',
    title: 'Software Development',
    description: 'Passionate about creating efficient and scalable solutions through code. Experienced in web development and various programming languages.'
  },
  {
    iconName: 'Brain',
    title: 'Continuous Learning',
    description: 'Always eager to learn new technologies and stay updated with the latest developments in the tech industry.'
  },
  {
    iconName: 'Coffee',
    title: 'Problem Solving',
    description: 'Enjoy tackling complex problems and finding innovative solutions through analytical thinking and creativity.'
  }
];

export const aboutBioData = [
  "I'm a final-year B.Tech Computer Science Engineering student with a strong passion for technology and innovation. My journey in computer science began with curiosity about how software shapes our world, and it has evolved into a dedicated pursuit of knowledge and practical skills in various domains of computing.",
  "Currently, I'm focusing on web development, machine learning, and cloud computing, while maintaining a strong foundation in core computer science concepts. I believe in the power of technology to solve real-world problems and am always excited to work on projects that make a positive impact."
];

export { projects as projectsData };
export type { ProjectData };
