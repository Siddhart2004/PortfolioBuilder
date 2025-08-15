export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  profileImage: string;
  email: string;
  phone?: string;
  location?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  resume?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 1-100
  category: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description: string;
  current: boolean;
}

export interface PortfolioSection {
  id: string;
  type: 'hero' | 'about' | 'skills' | 'projects' | 'experience' | 'contact';
  title: string;
  visible: boolean;
  order: number;
  data?: any;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  sections: PortfolioSection[];
  skills: Skill[];
  projects: Project[];
  experience: Experience[];
  theme: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
  };
}