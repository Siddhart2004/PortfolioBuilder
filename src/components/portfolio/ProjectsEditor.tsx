import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { usePortfolio } from '@/hooks/usePortfolio';
import { Plus, Edit, Trash2, Upload, ExternalLink, Github, Star } from 'lucide-react';
import projectPlaceholder from '@/assets/project-placeholder.jpg';

export function ProjectsEditor() {
  const { portfolioData, addProject, updateProject, deleteProject } = usePortfolio();
  const [editingProject, setEditingProject] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    image: '',
    technologies: [],
    liveUrl: '',
    githubUrl: '',
    featured: false,
  });

  const handleAddProject = () => {
    if (newProject.title && newProject.description) {
      addProject({
        ...newProject,
        image: newProject.image || projectPlaceholder,
      });
      setNewProject({
        title: '',
        description: '',
        image: '',
        technologies: [],
        liveUrl: '',
        githubUrl: '',
        featured: false,
      });
      setShowAddForm(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, projectId?: string) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        if (projectId) {
          updateProject(projectId, { image: imageUrl });
        } else {
          setNewProject(prev => ({ ...prev, image: imageUrl }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTechnologiesChange = (value: string, projectId?: string) => {
    const technologies = value.split(',').map(tech => tech.trim()).filter(Boolean);
    if (projectId) {
      updateProject(projectId, { technologies });
    } else {
      setNewProject(prev => ({ ...prev, technologies }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Projects</h3>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>

      {/* Add New Project Form */}
      {showAddForm && (
        <Card className="p-4 border-2 border-dashed border-primary/30">
          <div className="space-y-4">
            <h4 className="font-medium">Add New Project</h4>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label>Project Image</Label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-muted border border-border rounded-lg overflow-hidden flex items-center justify-center">
                    {newProject.image ? (
                      <img 
                        src={newProject.image} 
                        alt="Project" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Upload className="w-6 h-6 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e)}
                      className="hidden"
                      id="new-project-upload"
                    />
                    <label htmlFor="new-project-upload">
                      <Button variant="outline" size="sm" asChild>
                        <span className="cursor-pointer">
                          <Upload className="w-4 h-4 mr-2" />
                          Upload
                        </span>
                      </Button>
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={newProject.title}
                  onChange={(e) => setNewProject(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Project title"
                />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={newProject.description}
                  onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description of your project..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Technologies (comma-separated)</Label>
                <Input
                  value={newProject.technologies.join(', ')}
                  onChange={(e) => handleTechnologiesChange(e.target.value)}
                  placeholder="React, TypeScript, Node.js"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Live URL (Optional)</Label>
                  <Input
                    value={newProject.liveUrl}
                    onChange={(e) => setNewProject(prev => ({ ...prev, liveUrl: e.target.value }))}
                    placeholder="https://project-demo.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label>GitHub URL (Optional)</Label>
                  <Input
                    value={newProject.githubUrl}
                    onChange={(e) => setNewProject(prev => ({ ...prev, githubUrl: e.target.value }))}
                    placeholder="https://github.com/user/repo"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={newProject.featured}
                  onCheckedChange={(checked) => setNewProject(prev => ({ ...prev, featured: checked }))}
                />
                <Label htmlFor="featured">Featured Project</Label>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleAddProject}>Add Project</Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
            </div>
          </div>
        </Card>
      )}

      {/* Existing Projects */}
      <div className="space-y-4">
        {portfolioData.projects.map((project) => (
          <Card key={project.id} className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex gap-4 flex-1">
                <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src={project.image || projectPlaceholder} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium truncate">{project.title}</h4>
                    {project.featured && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <span 
                        key={index}
                        className="inline-block px-2 py-1 text-xs bg-primary/10 text-primary rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-xs text-muted-foreground">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2 mt-2">
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline flex items-center gap-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Live
                      </a>
                    )}
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline flex items-center gap-1"
                      >
                        <Github className="w-3 h-3" />
                        Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-1">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setEditingProject(editingProject === project.id ? null : project.id)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => deleteProject(project.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Inline Edit Form */}
            {editingProject === project.id && (
              <div className="mt-4 pt-4 border-t border-border space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <Input
                    value={project.title}
                    onChange={(e) => updateProject(project.id, { title: e.target.value })}
                    placeholder="Project title"
                  />
                  
                  <Textarea
                    value={project.description}
                    onChange={(e) => updateProject(project.id, { description: e.target.value })}
                    placeholder="Project description"
                    rows={3}
                  />
                  
                  <Input
                    value={project.technologies.join(', ')}
                    onChange={(e) => handleTechnologiesChange(e.target.value, project.id)}
                    placeholder="Technologies (comma-separated)"
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      value={project.liveUrl || ''}
                      onChange={(e) => updateProject(project.id, { liveUrl: e.target.value })}
                      placeholder="Live URL"
                    />
                    <Input
                      value={project.githubUrl || ''}
                      onChange={(e) => updateProject(project.id, { githubUrl: e.target.value })}
                      placeholder="GitHub URL"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={project.featured}
                      onCheckedChange={(checked) => updateProject(project.id, { featured: checked })}
                    />
                    <Label>Featured Project</Label>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setEditingProject(null)}
                >
                  Done Editing
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>

      {portfolioData.projects.length === 0 && !showAddForm && (
        <Card className="p-8 text-center border-2 border-dashed">
          <p className="text-muted-foreground mb-4">No projects added yet</p>
          <Button onClick={() => setShowAddForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Project
          </Button>
        </Card>
      )}
    </div>
  );
}
