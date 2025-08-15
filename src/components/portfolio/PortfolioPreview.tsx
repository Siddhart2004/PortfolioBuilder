import React from 'react';
import { usePortfolio } from '@/hooks/usePortfolio';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  MapPin, 
  Phone,
  Download,
  Star
} from 'lucide-react';
import heroImage from '@/assets/hero-bg.jpg';
import projectPlaceholder from '@/assets/project-placeholder.jpg';

export function PortfolioPreview() {
  const { portfolioData } = usePortfolio();
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

  const renderSection = (section: typeof sections[0]) => {
    switch (section.type) {
      case 'hero':
        return (
          <section className="relative min-h-[600px] flex items-center justify-center bg-gradient-primary text-primary-foreground overflow-hidden">
            <div 
              className="absolute inset-0 opacity-10"
              style={{ 
                backgroundImage: `url(${heroImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
            <div className="relative z-10 container mx-auto px-6 text-center">
              <div className="max-w-4xl mx-auto">
                {personalInfo.profileImage && (
                  <div className="w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
                    <img 
                      src={personalInfo.profileImage} 
                      alt={personalInfo.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <h1 className="text-5xl md:text-6xl font-bold mb-4">
                  {personalInfo.name}
                </h1>
                <p className="text-xl md:text-2xl text-primary-foreground/90 mb-6">
                  {personalInfo.title}
                </p>
                <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8 leading-relaxed">
                  {personalInfo.bio}
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  {personalInfo.resume && (
                    <Button variant="secondary" size="lg">
                      <Download className="w-5 h-5 mr-2" />
                      Download Resume
                    </Button>
                  )}
                  <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                    <Mail className="w-5 h-5 mr-2" />
                    Get In Touch
                  </Button>
                </div>
              </div>
            </div>
          </section>
        );

      case 'about':
        return (
          <section className="py-20 bg-background">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-16 text-foreground">
                  About Me
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  <div className="lg:col-span-2">
                    <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                      {personalInfo.bio}
                    </p>
                    <div className="flex flex-wrap gap-6 text-sm">
                      {personalInfo.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-primary" />
                          <span>{personalInfo.location}</span>
                        </div>
                      )}
                      {personalInfo.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-primary" />
                          <span>{personalInfo.phone}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-primary" />
                        <span>{personalInfo.email}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    {personalInfo.github && (
                      <a 
                        href={personalInfo.github}
                        target="_blank"
                        rel="noopener noreferrer" 
                        className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:shadow-md transition-all duration-200 hover:-translate-y-1"
                      >
                        <Github className="w-6 h-6 text-primary" />
                        <span className="font-medium">GitHub</span>
                        <ExternalLink className="w-4 h-4 ml-auto text-muted-foreground" />
                      </a>
                    )}
                    {personalInfo.linkedin && (
                      <a 
                        href={personalInfo.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:shadow-md transition-all duration-200 hover:-translate-y-1"
                      >
                        <Linkedin className="w-6 h-6 text-primary" />
                        <span className="font-medium">LinkedIn</span>
                        <ExternalLink className="w-4 h-4 ml-auto text-muted-foreground" />
                      </a>
                    )}
                    {personalInfo.website && (
                      <a 
                        href={personalInfo.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:shadow-md transition-all duration-200 hover:-translate-y-1"
                      >
                        <ExternalLink className="w-6 h-6 text-primary" />
                        <span className="font-medium">Website</span>
                        <ExternalLink className="w-4 h-4 ml-auto text-muted-foreground" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        );

      case 'skills':
        return (
          <section className="py-20 bg-secondary/50">
            <div className="container mx-auto px-6">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-16 text-foreground">
                  Skills & Expertise
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                    <Card key={category} className="p-6 h-full">
                      <h3 className="text-xl font-semibold mb-6 text-primary">
                        {category}
                      </h3>
                      <div className="space-y-4">
                        {categorySkills.map((skill) => (
                          <div key={skill.id}>
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium text-sm">{skill.name}</span>
                              <span className="text-xs text-muted-foreground">{skill.level}%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div 
                                className="bg-gradient-primary h-2 rounded-full transition-all duration-500"
                                style={{ width: `${skill.level}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );

      case 'projects':
        return (
          <section className="py-20 bg-background">
            <div className="container mx-auto px-6">
              <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-16 text-foreground">
                  Featured Projects
                </h2>
                
                {/* Featured Projects */}
                {featuredProjects.length > 0 && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                    {featuredProjects.map((project) => (
                      <Card key={project.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300">
                        <div className="aspect-video bg-muted relative overflow-hidden">
                          <img 
                            src={project.image || projectPlaceholder}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {project.featured && (
                            <div className="absolute top-4 right-4">
                              <Badge variant="secondary" className="bg-yellow-500 text-white">
                                <Star className="w-3 h-3 mr-1 fill-current" />
                                Featured
                              </Badge>
                            </div>
                          )}
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                          <p className="text-muted-foreground mb-4 line-clamp-2">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.technologies.map((tech, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            {project.liveUrl && (
                              <Button variant="default" size="sm" asChild>
                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="w-4 h-4 mr-2" />
                                  Live Demo
                                </a>
                              </Button>
                            )}
                            {project.githubUrl && (
                              <Button variant="outline" size="sm" asChild>
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                  <Github className="w-4 h-4 mr-2" />
                                  Code
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}

                {/* Other Projects */}
                {otherProjects.length > 0 && (
                  <>
                    <h3 className="text-2xl font-semibold text-center mb-8 text-foreground">
                      Other Projects
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {otherProjects.map((project) => (
                        <Card key={project.id} className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                          <h4 className="text-lg font-semibold mb-2">{project.title}</h4>
                          <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-1 mb-4">
                            {project.technologies.slice(0, 3).map((tech, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                            {project.technologies.length > 3 && (
                              <span className="text-xs text-muted-foreground">
                                +{project.technologies.length - 3} more
                              </span>
                            )}
                          </div>
                          <div className="flex gap-2">
                            {project.liveUrl && (
                              <Button variant="outline" size="sm" asChild>
                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="w-3 h-3 mr-1" />
                                  Live
                                </a>
                              </Button>
                            )}
                            {project.githubUrl && (
                              <Button variant="outline" size="sm" asChild>
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                  <Github className="w-3 h-3 mr-1" />
                                  Code
                                </a>
                              </Button>
                            )}
                          </div>
                        </Card>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>
        );

      case 'contact':
        return (
          <section className="py-20 bg-gradient-primary text-primary-foreground">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl font-bold mb-8">Let's Work Together</h2>
                <p className="text-xl text-primary-foreground/90 mb-12">
                  I'm always interested in new opportunities and exciting projects.
                </p>
                <div className="flex flex-wrap gap-6 justify-center">
                  <Button variant="secondary" size="lg" asChild>
                    <a href={`mailto:${personalInfo.email}`}>
                      <Mail className="w-5 h-5 mr-2" />
                      Send Email
                    </a>
                  </Button>
                  {personalInfo.linkedin && (
                    <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20" asChild>
                      <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="w-5 h-5 mr-2" />
                        LinkedIn
                      </a>
                    </Button>
                  )}
                  {personalInfo.github && (
                    <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20" asChild>
                      <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-5 h-5 mr-2" />
                        GitHub
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {visibleSections.map((section) => (
        <div key={section.id}>
          {renderSection(section)}
        </div>
      ))}
      
      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-6">
          <div className="text-center text-muted-foreground">
            <p>© {new Date().getFullYear()} {personalInfo.name}. Built with Portfolio Builder.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
