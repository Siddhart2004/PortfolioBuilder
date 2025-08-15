import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { PortfolioSection } from '@/types/portfolio';
import { usePortfolio } from '@/hooks/usePortfolio';
import { 
  GripVertical, 
  User, 
  FileText, 
  Code, 
  FolderOpen, 
  Briefcase, 
  Mail,
  Eye,
  EyeOff 
} from 'lucide-react';

interface SortableSectionProps {
  section: PortfolioSection;
}

const sectionIcons = {
  hero: User,
  about: FileText,
  skills: Code,
  projects: FolderOpen,
  experience: Briefcase,
  contact: Mail,
};

export function SortableSection({ section }: SortableSectionProps) {
  const { portfolioData, updateSections } = usePortfolio();
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const Icon = sectionIcons[section.type] || FileText;

  const toggleVisibility = (visible: boolean) => {
    const updatedSections = portfolioData.sections.map(s =>
      s.id === section.id ? { ...s, visible } : s
    );
    updateSections(updatedSections);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${isDragging ? 'opacity-50' : ''}`}
    >
      <Card className="p-4 bg-card hover:bg-accent/50 transition-colors">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="cursor-grab active:cursor-grabbing p-1 h-auto"
              {...attributes}
              {...listeners}
            >
              <GripVertical className="w-4 h-4 text-muted-foreground" />
            </Button>
            
            <Icon className="w-5 h-5 text-primary" />
            
            <div>
              <span className="font-medium">{section.title}</span>
              <span className="text-sm text-muted-foreground ml-2">
                ({section.type})
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {section.visible ? (
                <Eye className="w-4 h-4 text-green-600" />
              ) : (
                <EyeOff className="w-4 h-4 text-muted-foreground" />
              )}
              <Switch
                checked={section.visible}
                onCheckedChange={toggleVisibility}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}