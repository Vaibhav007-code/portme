
import React, { useState, useRef, useEffect } from "react";
import { ArrowRight, Github } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // For 3D card effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };
  
  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    setIsHovered(false);
  };
  
  return (
    <div 
      ref={cardRef}
      className="card-3d border border-border bg-card overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ 
        animationDelay: `${index * 0.2}s`
      }}
    >
      <div className="relative w-full h-full">
        {/* Image overlay */}
        <div className="relative w-full h-64 overflow-hidden">
          <div 
            className={`absolute inset-0 bg-gradient-to-b from-transparent to-card transition-opacity duration-300 ${isHovered ? 'opacity-80' : 'opacity-95'}`}
          />
          <img 
            src={project.imageUrl} 
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 ease-out"
            style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}
          />
          
          {/* Project title */}
          <h3 className="absolute bottom-0 left-0 p-6 text-foreground text-xl font-bold">{project.title}</h3>
        </div>
        
        {/* Project description and details */}
        <div className="p-6 space-y-4">
          <p className="text-foreground/70 leading-relaxed">{project.description}</p>
          
          <div className="flex flex-wrap gap-2 pt-2">
            {project.technologies.slice(0, 3).map((tech) => (
              <span 
                key={tech}
                className="px-2 py-1 bg-muted text-foreground/60 text-xs rounded-md"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-2 py-1 bg-muted text-foreground/60 text-xs rounded-md">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
          
          <div className="flex justify-between items-center pt-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-primary hover:text-primary/80 transition-colors"
              >
                Live Demo <ArrowRight size={16} className="ml-1" />
              </a>
            )}
            
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-foreground transition-colors"
              >
                <Github size={18} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
