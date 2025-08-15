import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { usePortfolio } from '@/hooks/usePortfolio';
import { Plus, Edit, Trash2, Code, Server, Palette, Brain } from 'lucide-react';

const skillCategories = [
  { value: 'Frontend', icon: Code, color: 'text-blue-600' },
  { value: 'Backend', icon: Server, color: 'text-green-600' },
  { value: 'Design', icon: Palette, color: 'text-purple-600' },
  { value: 'Other', icon: Brain, color: 'text-orange-600' },
];

export function SkillsEditor() {
  const { portfolioData, addSkill, updateSkill, deleteSkill } = usePortfolio();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingSkill, setEditingSkill] = useState<string | null>(null);
  const [newSkill, setNewSkill] = useState({
    name: '',
    level: 50,
    category: 'Frontend',
  });

  const handleAddSkill = () => {
    if (newSkill.name) {
      addSkill(newSkill);
      setNewSkill({
        name: '',
        level: 50,
        category: 'Frontend',
      });
      setShowAddForm(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    const cat = skillCategories.find(c => c.value === category);
    return cat ? cat.icon : Code;
  };

  const getCategoryColor = (category: string) => {
    const cat = skillCategories.find(c => c.value === category);
    return cat ? cat.color : 'text-blue-600';
  };

  const groupedSkills = portfolioData.skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof portfolioData.skills>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Skills</h3>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Skill
        </Button>
      </div>

      {/* Add New Skill Form */}
      {showAddForm && (
        <Card className="p-4 border-2 border-dashed border-primary/30">
          <div className="space-y-4">
            <h4 className="font-medium">Add New Skill</h4>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label>Skill Name</Label>
                <Input
                  value={newSkill.name}
                  onChange={(e) => setNewSkill(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., JavaScript, Python, UI/UX Design"
                />
              </div>

              <div className="space-y-2">
                <Label>Category</Label>
                <Select 
                  value={newSkill.category} 
                  onValueChange={(value) => setNewSkill(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {skillCategories.map((category) => {
                      const Icon = category.icon;
                      return (
                        <SelectItem key={category.value} value={category.value}>
                          <div className="flex items-center gap-2">
                            <Icon className={`w-4 h-4 ${category.color}`} />
                            {category.value}
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Proficiency Level: {newSkill.level}%</Label>
                <Slider
                  value={[newSkill.level]}
                  onValueChange={([value]) => setNewSkill(prev => ({ ...prev, level: value }))}
                  max={100}
                  min={1}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Beginner</span>
                  <span>Intermediate</span>
                  <span>Advanced</span>
                  <span>Expert</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleAddSkill}>Add Skill</Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
            </div>
          </div>
        </Card>
      )}

      {/* Skills by Category */}
      <div className="space-y-6">
        {Object.entries(groupedSkills).map(([category, skills]) => {
          const Icon = getCategoryIcon(category);
          const colorClass = getCategoryColor(category);
          
          return (
            <div key={category}>
              <div className="flex items-center gap-2 mb-4">
                <Icon className={`w-5 h-5 ${colorClass}`} />
                <h4 className="font-medium">{category}</h4>
                <span className="text-sm text-muted-foreground">({skills.length})</span>
              </div>
              
              <div className="space-y-3">
                {skills.map((skill) => (
                  <Card key={skill.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        {editingSkill === skill.id ? (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <Input
                                value={skill.name}
                                onChange={(e) => updateSkill(skill.id, { name: e.target.value })}
                                placeholder="Skill name"
                              />
                              <Select 
                                value={skill.category}
                                onValueChange={(value) => updateSkill(skill.id, { category: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {skillCategories.map((cat) => {
                                    const Icon = cat.icon;
                                    return (
                                      <SelectItem key={cat.value} value={cat.value}>
                                        <div className="flex items-center gap-2">
                                          <Icon className={`w-4 h-4 ${cat.color}`} />
                                          {cat.value}
                                        </div>
                                      </SelectItem>
                                    );
                                  })}
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div className="space-y-2">
                              <Label>Proficiency Level: {skill.level}%</Label>
                              <Slider
                                value={[skill.level]}
                                onValueChange={([value]) => updateSkill(skill.id, { level: value })}
                                max={100}
                                min={1}
                                step={5}
                                className="w-full"
                              />
                            </div>
                            
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setEditingSkill(null)}
                            >
                              Done Editing
                            </Button>
                          </div>
                        ) : (
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium">{skill.name}</span>
                              <span className="text-sm text-muted-foreground">{skill.level}%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div 
                                className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                                style={{ width: `${skill.level}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {editingSkill !== skill.id && (
                        <div className="flex gap-1 ml-4">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setEditingSkill(skill.id)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => deleteSkill(skill.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {portfolioData.skills.length === 0 && !showAddForm && (
        <Card className="p-8 text-center border-2 border-dashed">
          <p className="text-muted-foreground mb-4">No skills added yet</p>
          <Button onClick={() => setShowAddForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Skill
          </Button>
        </Card>
      )}
    </div>
  );
}