
import React, { useRef, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import { Linkedin, Twitter, Github } from "lucide-react";

// Hardcoded projects data
const projects = [
  {
    id: "1",
    title: "Collaborative Resource Academic Platform (CRAP)",
    description: "Developed a study platform using HTML, CSS, JS, SQLite, Node.js that helps students collaborate on academic resources.",
    technologies: ["HTML", "CSS", "JavaScript", "SQLite", "Node.js"],
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
    liveUrl: "https://crap-for-you.onrender.com",
    featured: true
  },
  {
    id: "2",
    title: "Dabria - Digital Diary",
    description: "Created a secure digital diary using React, Node.js, and SQLite with end-to-end encryption for privacy.",
    technologies: ["React", "Node.js", "SQLite"],
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    liveUrl: "https://journal-dabria.vercel.app",
    featured: true
  },
  {
    id: "3",
    title: "Portfolio Website",
    description: "Personal portfolio website built with React and Tailwind CSS featuring light and dark mode.",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    liveUrl: "#",
    featured: true
  }
];

const Projects: React.FC = () => {
  const projectsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!projectsRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const projectElements = projectsRef.current.querySelectorAll('.project-card');
    projectElements.forEach(el => observer.observe(el));
    
    return () => {
      projectElements.forEach(el => observer.unobserve(el));
    };
  }, []);
  
  return (
    <section id="projects" className="py-28 px-6 bg-gradient-to-b from-background to-background/50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute w-64 h-64 rounded-full bg-primary/5 blur-3xl -top-32 -left-20 dark:bg-primary/10"></div>
        <div className="absolute w-96 h-96 rounded-full bg-secondary/5 blur-3xl -bottom-40 -right-32 dark:bg-secondary/10"></div>
      </div>
      
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent">Projects</h2>
        <p className="text-center text-foreground/70 mb-16 max-w-2xl mx-auto">
          Explore my latest work and projects. Each one represents a unique challenge and solution.
        </p>
        
        <div 
          ref={projectsRef} 
          className="grid gap-16 md:grid-cols-2 lg:grid-cols-3"
        >
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <div 
                key={project.id} 
                className="project-card transform transition-all duration-700 opacity-0 translate-y-12"
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <ProjectCard project={project} index={index} />
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-16">
              <p className="text-foreground/50 text-lg">No projects added yet.</p>
            </div>
          )}
        </div>
        
        <div className="text-center mt-20">
          <p className="text-foreground/70 mb-6">Looking to collaborate on a project?</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="https://linkedin.com/in/vaibhav-pathak-8b8991214"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-background border border-border rounded-full hover:bg-primary/10 transition-all duration-300 hover:border-primary/50 group"
            >
              <Linkedin className="text-primary group-hover:scale-110 transition-transform duration-300" size={18} />
              <span className="text-foreground/90 group-hover:text-foreground transition-colors duration-300">Connect on LinkedIn</span>
            </a>
            <a 
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-background border border-border rounded-full hover:bg-primary/10 transition-all duration-300 hover:border-primary/50 group"
            >
              <Github className="text-primary group-hover:scale-110 transition-transform duration-300" size={18} />
              <span className="text-foreground/90 group-hover:text-foreground transition-colors duration-300">Follow on GitHub</span>
            </a>
            <a 
              href="https://x.com/007Vaibhav_"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-background border border-border rounded-full hover:bg-primary/10 transition-all duration-300 hover:border-primary/50 group"
            >
              <Twitter className="text-primary group-hover:scale-110 transition-transform duration-300" size={18} />
              <span className="text-foreground/90 group-hover:text-foreground transition-colors duration-300">Follow on Twitter</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
