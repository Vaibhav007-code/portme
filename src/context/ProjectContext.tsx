
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

interface ProjectContextType {
  projects: Project[];
  addProject: (project: Omit<Project, "id">) => void;
  updateProject: (id: string, project: Partial<Omit<Project, "id">>) => void;
  deleteProject: (id: string) => void;
  getProject: (id: string) => Project | undefined;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

const initialProjects: Project[] = [
  {
    id: "1",
    title: "Collaborative Resource Academic Platform (CRAP)",
    description: "Developed a study platform using HTML, CSS, JS, SQLite, Node.js.",
    technologies: ["HTML", "CSS", "JavaScript", "SQLite", "Node.js"],
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
    liveUrl: "https://crap-for-you.onrender.com",
    featured: true
  },
  {
    id: "2",
    title: "Dabria - Digital Diary",
    description: "Created a secure digital diary using React, Node.js, and SQLite.",
    technologies: ["React", "Node.js", "SQLite"],
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    liveUrl: "https://journal-dabria.vercel.app",
    featured: true
  }
];

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  
  // Load projects from localStorage on component mount
  useEffect(() => {
    const storedProjects = localStorage.getItem("projects");
    if (storedProjects) {
      try {
        const parsedProjects = JSON.parse(storedProjects);
        setProjects(parsedProjects);
        console.log("Projects loaded from localStorage:", parsedProjects.length);
      } catch (error) {
        console.error("Error parsing projects from localStorage:", error);
        setProjects(initialProjects);
        localStorage.setItem("projects", JSON.stringify(initialProjects));
      }
    } else {
      // Use initial projects if nothing in localStorage
      console.log("No projects in localStorage, using initial projects");
      setProjects(initialProjects);
      localStorage.setItem("projects", JSON.stringify(initialProjects));
    }
  }, []);
  
  const addProject = (project: Omit<Project, "id">) => {
    const newProject = {
      ...project,
      id: Date.now().toString(),
    };
    
    setProjects((currentProjects) => {
      const updatedProjects = [...currentProjects, newProject];
      localStorage.setItem("projects", JSON.stringify(updatedProjects));
      console.log("Project added:", newProject.title);
      return updatedProjects;
    });
  };
  
  const updateProject = (id: string, updatedFields: Partial<Omit<Project, "id">>) => {
    setProjects((currentProjects) => {
      const updatedProjects = currentProjects.map((project) =>
        project.id === id ? { ...project, ...updatedFields } : project
      );
      localStorage.setItem("projects", JSON.stringify(updatedProjects));
      return updatedProjects;
    });
  };
  
  const deleteProject = (id: string) => {
    setProjects((currentProjects) => {
      const updatedProjects = currentProjects.filter((project) => project.id !== id);
      localStorage.setItem("projects", JSON.stringify(updatedProjects));
      return updatedProjects;
    });
  };
  
  const getProject = (id: string) => {
    return projects.find((project) => project.id === id);
  };
  
  return (
    <ProjectContext.Provider
      value={{
        projects,
        addProject,
        updateProject,
        deleteProject,
        getProject
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error("useProjects must be used within a ProjectProvider");
  }
  return context;
};
