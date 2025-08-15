import { useState, useEffect } from 'react';
import { PortfolioData, PortfolioSection } from '@/types/portfolio';

const defaultPortfolioData: PortfolioData = {
  personalInfo: {
    name: "Your Name",
    title: "Full Stack Developer",
    bio: "Passionate developer creating amazing digital experiences. I love building modern web applications with clean, efficient code.",
    profileImage: "",
    email: "hello@yourname.com",
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
  },
  sections: [
    { id: '1', type: 'hero', title: 'Hero Section', visible: true, order: 0 },
    { id: '2', type: 'about', title: 'About Me', visible: true, order: 1 },
    { id: '3', type: 'skills', title: 'Skills', visible: true, order: 2 },
    { id: '4', type: 'projects', title: 'Projects', visible: true, order: 3 },
    { id: '5', type: 'experience', title: 'Experience', visible: false, order: 4 },
    { id: '6', type: 'contact', title: 'Contact', visible: true, order: 5 },
  ],
  skills: [
    { id: '1', name: 'JavaScript', level: 90, category: 'Frontend' },
    { id: '2', name: 'React', level: 85, category: 'Frontend' },
    { id: '3', name: 'TypeScript', level: 80, category: 'Frontend' },
    { id: '4', name: 'Node.js', level: 75, category: 'Backend' },
    { id: '5', name: 'Python', level: 70, category: 'Backend' },
    { id: '6', name: 'CSS/Tailwind', level: 88, category: 'Frontend' },
  ],
  projects: [
    {
      id: '1',
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with React, Node.js, and Stripe integration.',
      image: '',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
      featured: true,
    },
    {
      id: '2',
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates.',
      image: '',
      technologies: ['Vue.js', 'Firebase', 'Tailwind CSS'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
      featured: true,
    },
    {
      id: '3',
      title: 'Weather Dashboard',
      description: 'A responsive weather dashboard with location-based forecasts.',
      image: '',
      technologies: ['React', 'OpenWeather API', 'Chart.js'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
      featured: false,
    },
  ],
  experience: [
    {
      id: '1',
      company: 'Tech Startup Inc.',
      position: 'Senior Frontend Developer',
      startDate: '2022-01',
      description: 'Led frontend development team and implemented modern React applications.',
      current: true,
    },
    {
      id: '2',
      company: 'Digital Agency',
      position: 'Web Developer',
      startDate: '2020-06',
      endDate: '2021-12',
      description: 'Developed client websites and web applications using various technologies.',
      current: false,
    },
  ],
  theme: {
    primaryColor: '#0F4C75',
    secondaryColor: '#3282B8',
    fontFamily: 'Inter',
  },
};

export function usePortfolio(projectId: string = 'default') {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(defaultPortfolioData);
  const storageKey = `portfolio-data-${projectId}`;

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        setPortfolioData(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to load portfolio data:', error);
      }
    }
  }, [storageKey]);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(portfolioData));
  }, [portfolioData, storageKey]);

  const updatePersonalInfo = (updates: Partial<typeof portfolioData.personalInfo>) => {
    setPortfolioData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...updates }
    }));
  };

  const updateSections = (sections: PortfolioSection[]) => {
    setPortfolioData(prev => ({
      ...prev,
      sections
    }));
  };

  const addProject = (project: Omit<typeof portfolioData.projects[0], 'id'>) => {
    const newProject = {
      ...project,
      id: Date.now().toString(),
    };
    setPortfolioData(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }));
  };

  const updateProject = (id: string, updates: Partial<typeof portfolioData.projects[0]>) => {
    setPortfolioData(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === id ? { ...p, ...updates } : p)
    }));
  };

  const deleteProject = (id: string) => {
    setPortfolioData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
  };

  const addSkill = (skill: Omit<typeof portfolioData.skills[0], 'id'>) => {
    const newSkill = {
      ...skill,
      id: Date.now().toString(),
    };
    setPortfolioData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));
  };

  const updateSkill = (id: string, updates: Partial<typeof portfolioData.skills[0]>) => {
    setPortfolioData(prev => ({
      ...prev,
      skills: prev.skills.map(s => s.id === id ? { ...s, ...updates } : s)
    }));
  };

  const deleteSkill = (id: string) => {
    setPortfolioData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s.id !== id)
    }));
  };

  return {
    portfolioData,
    updatePersonalInfo,
    updateSections,
    addProject,
    updateProject,
    deleteProject,
    addSkill,
    updateSkill,
    deleteSkill,
  };
}