import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { usePortfolio } from '@/hooks/usePortfolio';
import { Download, Loader2 } from 'lucide-react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export function ExportPortfolio() {
  const [isExporting, setIsExporting] = useState(false);
  const { portfolioData } = usePortfolio();

  const generateCSS = () => {
    return `
/* Portfolio Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #ffffff;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Hero Section */
.hero {
  background: linear-gradient(135deg, #0F4C75, #3282B8);
  color: white;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero-content {
  position: relative;
  z-index: 10;
  max-width: 800px;
  margin: 0 auto;
}

.profile-image {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid rgba(255, 255, 255, 0.2);
  margin: 0 auto 2rem;
  display: block;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.hero h1 {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.hero .subtitle {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  opacity: 0.9;
}

.hero .description {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  opacity: 0.8;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

/* Section Styles */
section {
  padding: 5rem 0;
}

.section-light {
  background-color: #ffffff;
}

.section-gray {
  background-color: #f8fafc;
}

.section-primary {
  background: linear-gradient(135deg, #0F4C75, #3282B8);
  color: white;
}

h2 {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
}

/* Button Styles */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  font-size: 1rem;
}

.btn-primary {
  background: linear-gradient(135deg, #0F4C75, #3282B8);
  color: white;
  box-shadow: 0 4px 15px rgba(15, 76, 117, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(15, 76, 117, 0.4);
}

.btn-secondary {
  background: white;
  color: #0F4C75;
  border: 2px solid #0F4C75;
}

.btn-secondary:hover {
  background: #0F4C75;
  color: white;
  transform: translateY(-2px);
}

.btn-outline {
  background: transparent;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.btn-outline:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

/* Card Styles */
.card {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  height: 100%;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.project-card {
  overflow: hidden;
  border-radius: 1rem;
  background: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
}

.project-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.project-card:hover .project-image {
  transform: scale(1.05);
}

.project-content {
  padding: 1.5rem;
}

.project-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #0F4C75;
}

.project-description {
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.6;
}

/* Grid Layouts */
.grid {
  display: grid;
  gap: 2rem;
}

.grid-2 {
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
}

.grid-3 {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

/* Skills */
.skill-item {
  margin-bottom: 1.5rem;
}

.skill-name {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.skill-bar {
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
}

.skill-progress {
  height: 100%;
  background: linear-gradient(135deg, #0F4C75, #3282B8);
  border-radius: 4px;
  transition: width 0.8s ease;
}

/* Tags */
.tag {
  display: inline-block;
  background: rgba(15, 76, 117, 0.1);
  color: #0F4C75;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  margin: 0.25rem;
  font-weight: 500;
}

.tag-container {
  margin: 1rem 0;
}

/* Contact Links */
.contact-links {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 2rem;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

/* Footer */
footer {
  background: #1a1a1a;
  color: white;
  text-align: center;
  padding: 2rem 0;
}

/* Responsive */
@media (max-width: 768px) {
  .hero h1 {
    font-size: 2.5rem;
  }
  
  .hero .subtitle {
    font-size: 1.25rem;
  }
  
  h2 {
    font-size: 2rem;
  }
  
  .grid-2,
  .grid-3 {
    grid-template-columns: 1fr;
  }
  
  .contact-links {
    flex-direction: column;
    align-items: center;
  }
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out;
}
`;
  };

  const generateHTML = () => {
    const { personalInfo, sections, skills, projects } = portfolioData;
    
    const visibleSections = sections
      .filter(section => section.visible)
      .sort((a, b) => a.order - b.order);

    const featuredProjects = projects.filter(p => p.featured);
    const otherProjects = projects.filter(p => !p.featured);

    const skillsByCategory = skills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    }, {} as Record<string, typeof skills>);

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${personalInfo.name} - Portfolio</title>
    <meta name="description" content="${personalInfo.bio}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    ${visibleSections.map(section => {
      switch (section.type) {
        case 'hero':
          return `
    <!-- Hero Section -->
    <section class="hero">
        <div class="container">
            <div class="hero-content animate-fade-in">
                ${personalInfo.profileImage ? `<img src="data:image/jpeg;base64,${personalInfo.profileImage.split(',')[1]}" alt="${personalInfo.name}" class="profile-image">` : ''}
                <h1>${personalInfo.name}</h1>
                <p class="subtitle">${personalInfo.title}</p>
                <p class="description">${personalInfo.bio}</p>
                <div class="contact-links">
                    ${personalInfo.resume ? `<a href="#" class="btn btn-secondary">📄 Download Resume</a>` : ''}
                    <a href="mailto:${personalInfo.email}" class="btn btn-outline">✉️ Get In Touch</a>
                </div>
            </div>
        </div>
    </section>`;
        
        case 'about':
          return `
    <!-- About Section -->
    <section class="section-light">
        <div class="container">
            <h2>About Me</h2>
            <div class="grid grid-2">
                <div>
                    <p style="font-size: 1.1rem; line-height: 1.8; color: #666; margin-bottom: 2rem;">${personalInfo.bio}</p>
                    <div style="display: flex; flex-wrap: wrap; gap: 1rem; font-size: 0.9rem;">
                        ${personalInfo.location ? `<div>📍 ${personalInfo.location}</div>` : ''}
                        ${personalInfo.phone ? `<div>📞 ${personalInfo.phone}</div>` : ''}
                        <div>✉️ ${personalInfo.email}</div>
                    </div>
                </div>
                <div>
                    <div style="display: flex; flex-direction: column; gap: 1rem;">
                        ${personalInfo.github ? `<a href="${personalInfo.github}" class="social-link" target="_blank" rel="noopener noreferrer" style="color: #0F4C75; background: rgba(15, 76, 117, 0.1);">🔗 GitHub</a>` : ''}
                        ${personalInfo.linkedin ? `<a href="${personalInfo.linkedin}" class="social-link" target="_blank" rel="noopener noreferrer" style="color: #0F4C75; background: rgba(15, 76, 117, 0.1);">🔗 LinkedIn</a>` : ''}
                        ${personalInfo.website ? `<a href="${personalInfo.website}" class="social-link" target="_blank" rel="noopener noreferrer" style="color: #0F4C75; background: rgba(15, 76, 117, 0.1);">🔗 Website</a>` : ''}
                    </div>
                </div>
            </div>
        </div>
    </section>`;
        
        case 'skills':
          return `
    <!-- Skills Section -->
    <section class="section-gray">
        <div class="container">
            <h2>Skills & Expertise</h2>
            <div class="grid grid-3">
                ${Object.entries(skillsByCategory).map(([category, categorySkills]) => `
                <div class="card">
                    <h3 style="color: #0F4C75; margin-bottom: 1.5rem; font-size: 1.25rem;">${category}</h3>
                    ${categorySkills.map(skill => `
                    <div class="skill-item">
                        <div class="skill-name">
                            <span>${skill.name}</span>
                            <span>${skill.level}%</span>
                        </div>
                        <div class="skill-bar">
                            <div class="skill-progress" style="width: ${skill.level}%"></div>
                        </div>
                    </div>
                    `).join('')}
                </div>
                `).join('')}
            </div>
        </div>
    </section>`;
        
        case 'projects':
          return `
    <!-- Projects Section -->
    <section class="section-light">
        <div class="container">
            <h2>Featured Projects</h2>
            ${featuredProjects.length > 0 ? `
            <div class="grid grid-2" style="margin-bottom: 4rem;">
                ${featuredProjects.map(project => `
                <div class="project-card">
                    ${project.image ? `<img src="data:image/jpeg;base64,${project.image.split(',')[1] || ''}" alt="${project.title}" class="project-image">` : ''}
                    <div class="project-content">
                        <h3 class="project-title">${project.title} ⭐</h3>
                        <p class="project-description">${project.description}</p>
                        <div class="tag-container">
                            ${project.technologies.map(tech => `<span class="tag">${tech}</span>`).join('')}
                        </div>
                        <div style="display: flex; gap: 1rem; margin-top: 1rem;">
                            ${project.liveUrl ? `<a href="${project.liveUrl}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">🔗 Live Demo</a>` : ''}
                            ${project.githubUrl ? `<a href="${project.githubUrl}" class="btn btn-secondary" target="_blank" rel="noopener noreferrer">💻 Code</a>` : ''}
                        </div>
                    </div>
                </div>
                `).join('')}
            </div>
            ` : ''}
            ${otherProjects.length > 0 ? `
            <h3 style="text-align: center; margin-bottom: 2rem; font-size: 1.5rem;">Other Projects</h3>
            <div class="grid grid-3">
                ${otherProjects.map(project => `
                <div class="card">
                    <h4 style="color: #0F4C75; margin-bottom: 0.5rem;">${project.title}</h4>
                    <p style="color: #666; margin-bottom: 1rem; font-size: 0.9rem;">${project.description}</p>
                    <div class="tag-container">
                        ${project.technologies.slice(0, 3).map(tech => `<span class="tag">${tech}</span>`).join('')}
                        ${project.technologies.length > 3 ? `<span style="color: #666; font-size: 0.8rem;">+${project.technologies.length - 3} more</span>` : ''}
                    </div>
                    <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
                        ${project.liveUrl ? `<a href="${project.liveUrl}" style="color: #0F4C75; text-decoration: none; font-size: 0.9rem;" target="_blank" rel="noopener noreferrer">🔗 Live</a>` : ''}
                        ${project.githubUrl ? `<a href="${project.githubUrl}" style="color: #0F4C75; text-decoration: none; font-size: 0.9rem;" target="_blank" rel="noopener noreferrer">💻 Code</a>` : ''}
                    </div>
                </div>
                `).join('')}
            </div>
            ` : ''}
        </div>
    </section>`;
        
        case 'contact':
          return `
    <!-- Contact Section -->
    <section class="section-primary">
        <div class="container">
            <div style="text-align: center; max-width: 600px; margin: 0 auto;">
                <h2>Let's Work Together</h2>
                <p style="font-size: 1.2rem; margin-bottom: 2rem; opacity: 0.9;">
                    I'm always interested in new opportunities and exciting projects.
                </p>
                <div class="contact-links">
                    <a href="mailto:${personalInfo.email}" class="btn btn-secondary">✉️ Send Email</a>
                    ${personalInfo.linkedin ? `<a href="${personalInfo.linkedin}" class="btn btn-outline" target="_blank" rel="noopener noreferrer">🔗 LinkedIn</a>` : ''}
                    ${personalInfo.github ? `<a href="${personalInfo.github}" class="btn btn-outline" target="_blank" rel="noopener noreferrer">💻 GitHub</a>` : ''}
                </div>
            </div>
        </div>
    </section>`;
        
        default:
          return '';
      }
    }).join('')}

    <!-- Footer -->
    <footer>
        <div class="container">
            <p>© ${new Date().getFullYear()} ${personalInfo.name}. Built with Portfolio Builder.</p>
        </div>
    </footer>

    <script>
        // Simple animation on scroll
        const animateElements = document.querySelectorAll('.animate-fade-in');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        });
        
        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });
    </script>
</body>
</html>`;
  };

  const handleExport = async () => {
    setIsExporting(true);
    
    try {
      const zip = new JSZip();
      
      // Add HTML file
      zip.file('index.html', generateHTML());
      
      // Add CSS file
      zip.file('style.css', generateCSS());
      
      // Add README
      const readme = `# ${portfolioData.personalInfo.name}'s Portfolio

This portfolio was created using Portfolio Builder.

## Files Included
- index.html - Main portfolio page
- style.css - Stylesheet with responsive design
- README.md - This file

## Hosting
You can host this portfolio on:
- GitHub Pages
- Netlify
- Vercel
- Any web hosting service

Simply upload the files to your hosting provider.

## Customization
You can edit the HTML and CSS files to further customize your portfolio.

Built with ❤️ using Portfolio Builder
`;
      zip.file('README.md', readme);
      
      // Generate and download the zip file
      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, `${portfolioData.personalInfo.name.replace(/\s+/g, '-').toLowerCase()}-portfolio.zip`);
      
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button 
      variant="hero" 
      size="lg" 
      onClick={handleExport}
      disabled={isExporting}
    >
      {isExporting ? (
        <>
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          Exporting...
        </>
      ) : (
        <>
          <Download className="w-5 h-5 mr-2" />
          Export Portfolio
        </>
      )}
    </Button>
  );
}