import { ProjectData } from '../types/project';

export const projects: ProjectData[] = [
  {
    title: 'Price Comparison & Deal Finder',
    description: 'Multi-platform price comparison tool with web scraping, 7-day price trends, and real-time deal alerts. Helps users find the best prices across e-commerce platforms.',
    technologies: ['Python', 'FastAPI', 'BeautifulSoup4', 'SQLite3', 'React', 'TypeScript'],
    github: 'https://github.com/adityashm/price-comparison-api',
    live: '/price-comparison',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80'
  },
  {
    title: 'Smart Expense Tracker',
    description: 'AI-powered expense tracking with budget recommendations, category-wise analytics, and spending insights. Intelligent financial management at your fingertips.',
    technologies: ['Python', 'FastAPI', 'SQLite3', 'React', 'TypeScript', 'Recharts'],
    github: 'https://github.com/adityashm/expense-tracker-api',
    live: '/expense-tracker',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80'
  },
  {
    title: 'Data Analysis & Visualization Dashboard',
    description: 'Professional data analytics dashboard with real-time charts, KPI metrics, and business intelligence. Built with Flask and Plotly for interactive visualizations.',
    technologies: ['Python', 'Flask', 'Plotly', 'SQLite'],
    github: 'https://github.com/adityashm/data-analysis-dashboard',
    live: 'https://web-production-9b7c.up.railway.app',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80'
  },
  {
    title: 'Web Scraper with Database',
    description: 'Production-ready web scraper that collects data from multiple sources and stores in SQLite. Features scheduled scraping, data management, and comprehensive logging.',
    technologies: ['Python', 'BeautifulSoup4', 'SQLite3', 'Requests', 'Schedule'],
    github: 'https://github.com/adityashm/web-scraper-project',
    live: 'https://github.com/adityashm/web-scraper-project',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80'
  },
  {
    title: 'REST API Backend with Authentication',
    description: 'Enterprise-grade REST API with JWT authentication, SQLAlchemy ORM, and comprehensive documentation. Includes user management, products, and order systems.',
    technologies: ['Python', 'FastAPI', 'SQLAlchemy', 'JWT', 'Pydantic'],
    github: 'https://github.com/adityashm/rest-api-backend',
    live: 'https://restapii.up.railway.app/docs',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80'
  }
];