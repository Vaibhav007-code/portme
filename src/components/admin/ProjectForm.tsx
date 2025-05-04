
import React, { useState } from "react";
import { useProjects } from "@/context/ProjectContext";
import { useToast } from "@/hooks/use-toast";

const ProjectForm: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: "",
    imageUrl: "",
    liveUrl: "",
    githubUrl: "",
    featured: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addProject } = useProjects();
  const { toast } = useToast();
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Convert comma separated technologies to array
      const technologiesArray = formData.technologies
        .split(",")
        .map((tech) => tech.trim())
        .filter((tech) => tech !== "");
      
      addProject({
        title: formData.title,
        description: formData.description,
        technologies: technologiesArray,
        imageUrl: formData.imageUrl,
        liveUrl: formData.liveUrl || undefined,
        githubUrl: formData.githubUrl || undefined,
        featured: formData.featured,
      });
      
      toast({
        title: "Project added",
        description: "Your project has been added successfully.",
      });
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        technologies: "",
        imageUrl: "",
        liveUrl: "",
        githubUrl: "",
        featured: false,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add project. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4 pb-24 md:pb-8">
      <div>
        <label htmlFor="title" className="block text-white/80 mb-2">
          Project Title*
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-dark border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-electric-blue/50"
        />
      </div>
      
      <div>
        <label htmlFor="description" className="block text-white/80 mb-2">
          Description*
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={3}
          className="w-full px-4 py-3 bg-dark border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-electric-blue/50 resize-none"
        />
      </div>
      
      <div>
        <label htmlFor="technologies" className="block text-white/80 mb-2">
          Technologies* (comma separated)
        </label>
        <input
          type="text"
          id="technologies"
          name="technologies"
          value={formData.technologies}
          onChange={handleChange}
          required
          placeholder="React, Node.js, MongoDB"
          className="w-full px-4 py-3 bg-dark border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-electric-blue/50"
        />
      </div>
      
      <div>
        <label htmlFor="imageUrl" className="block text-white/80 mb-2">
          Image URL*
        </label>
        <input
          type="url"
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          required
          placeholder="https://example.com/image.jpg"
          className="w-full px-4 py-3 bg-dark border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-electric-blue/50"
        />
      </div>
      
      <div>
        <label htmlFor="liveUrl" className="block text-white/80 mb-2">
          Live URL (optional)
        </label>
        <input
          type="url"
          id="liveUrl"
          name="liveUrl"
          value={formData.liveUrl}
          onChange={handleChange}
          placeholder="https://example.com"
          className="w-full px-4 py-3 bg-dark border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-electric-blue/50"
        />
      </div>
      
      <div>
        <label htmlFor="githubUrl" className="block text-white/80 mb-2">
          GitHub URL (optional)
        </label>
        <input
          type="url"
          id="githubUrl"
          name="githubUrl"
          value={formData.githubUrl}
          onChange={handleChange}
          placeholder="https://github.com/username/repo"
          className="w-full px-4 py-3 bg-dark border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-electric-blue/50"
        />
      </div>
      
      <div className="flex items-center">
        <input
          type="checkbox"
          id="featured"
          name="featured"
          checked={formData.featured}
          onChange={handleChange}
          className="w-4 h-4 text-electric-blue bg-dark border-white/30 rounded focus:ring-electric-blue/50"
        />
        <label htmlFor="featured" className="ml-2 text-white/80">
          Featured Project
        </label>
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="fixed bottom-0 left-0 right-0 md:static px-6 py-3 w-full md:w-auto bg-electric-blue text-white rounded-none md:rounded-lg hover-scale shadow-lg shadow-electric-blue/20 transition-all z-10 md:z-auto"
      >
        {isSubmitting ? "Adding Project..." : "Add Project"}
      </button>
    </form>
  );
};

export default ProjectForm;
