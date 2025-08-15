import React, { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePortfolio } from '@/hooks/usePortfolio';
import { PortfolioPreview } from './PortfolioPreview';
import { SectionEditor } from './SectionEditor';
import { ExportPortfolio } from './ExportPortfolio';
import { PersonalInfoEditor } from './PersonalInfoEditor';
import { ProjectsEditor } from './ProjectsEditor';
import { SkillsEditor } from './SkillsEditor';
import { SortableSection } from './SortableSection';
import { Eye, Edit, Download, Plus, Settings, Palette, Layout } from 'lucide-react';
import heroImage from '@/assets/hero-bg.jpg';
import type { DragEndEvent } from '@dnd-kit/core';

export function PortfolioBuilder() {
  const [activeTab, setActiveTab] = useState('edit');
  const { portfolioData, updateSections } = usePortfolio();
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const visibleSections = portfolioData.sections
    .filter(section => section.visible)
    .sort((a, b) => a.order - b.order);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active && over && active.id !== over.id) {
      const oldIndex = visibleSections.findIndex(section => section.id === active.id);
      const newIndex = visibleSections.findIndex(section => section.id === over.id);
      
      const newSections = arrayMove(visibleSections, oldIndex, newIndex).map((section, index) => ({
        ...section,
        order: index
      }));
      
      // Update all sections with new order
      const updatedSections = portfolioData.sections.map(section => {
        const newSection = newSections.find(s => s.id === section.id);
        return newSection ? newSection : section;
      });
      
      updateSections(updatedSections);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-light">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Layout className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Portfolio Builder</h1>
                <p className="text-muted-foreground text-sm">Create your professional portfolio in minutes</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ExportPortfolio />
              
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
            <TabsTrigger value="edit" className="flex items-center gap-2">
              <Edit className="w-4 h-4" />
              Edit
            </TabsTrigger>
            <TabsTrigger value="customize" className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Design
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Preview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="edit" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Editor Panel */}
            <div className="space-y-6">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Content Editor</h2>
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Section
                  </Button>
                </div>
                
                <Tabs defaultValue="personal" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="personal">Personal</TabsTrigger>
                    <TabsTrigger value="projects">Projects</TabsTrigger>
                    <TabsTrigger value="skills">Skills</TabsTrigger>
                    <TabsTrigger value="sections">Layout</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="personal">
                    <PersonalInfoEditor />
                  </TabsContent>
                  
                  <TabsContent value="projects">
                    <ProjectsEditor />
                  </TabsContent>
                  
                  <TabsContent value="skills">
                    <SkillsEditor />
                  </TabsContent>
                  
                  <TabsContent value="sections">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Section Order</h3>
                      <p className="text-sm text-muted-foreground">
                        Drag and drop to reorder sections in your portfolio
                      </p>
                      
                      <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                      >
                        <SortableContext
                          items={visibleSections.map(s => s.id)}
                          strategy={verticalListSortingStrategy}
                        >
                          <div className="space-y-2">
                            {visibleSections.map((section) => (
                              <SortableSection key={section.id} section={section} />
                            ))}
                          </div>
                        </SortableContext>
                      </DndContext>
                    </div>
                  </TabsContent>
                </Tabs>
              </Card>
            </div>

            {/* Live Preview Panel */}
            <div className="space-y-6">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Live Preview</h2>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      Desktop
                    </Button>
                    <Button variant="ghost" size="sm">
                      Mobile
                    </Button>
                  </div>
                </div>
                <div className="border border-border rounded-lg overflow-hidden bg-background">
                  <PortfolioPreview />
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="customize" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Design Customization</h2>
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Color Scheme</label>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="w-full h-12 bg-gradient-primary rounded-lg border-2 border-primary cursor-pointer"></div>
                    <div className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg border-2 border-transparent cursor-pointer hover:border-muted-foreground"></div>
                    <div className="w-full h-12 bg-gradient-to-r from-green-600 to-teal-600 rounded-lg border-2 border-transparent cursor-pointer hover:border-muted-foreground"></div>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Typography</label>
                  <select className="w-full p-2 border border-border rounded-lg bg-background">
                    <option>Inter (Default)</option>
                    <option>Roboto</option>
                    <option>Open Sans</option>
                    <option>Lato</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Layout Style</label>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 border-2 border-primary rounded-lg cursor-pointer bg-primary/5">
                      <div className="text-sm font-medium">Modern</div>
                      <div className="text-xs text-muted-foreground">Clean & minimal</div>
                    </div>
                    <div className="p-4 border-2 border-transparent rounded-lg cursor-pointer hover:border-muted-foreground">
                      <div className="text-sm font-medium">Creative</div>
                      <div className="text-xs text-muted-foreground">Bold & artistic</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Preview</h2>
              <div className="border border-border rounded-lg overflow-hidden bg-background">
                <PortfolioPreview />
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="preview">
            <Card className="p-0 overflow-hidden">
              <PortfolioPreview />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}