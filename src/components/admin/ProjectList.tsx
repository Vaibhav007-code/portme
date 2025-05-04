
import React, { useState } from "react";
import { useProjects, type Project } from "@/context/ProjectContext";
import { useToast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Pencil, Trash2 } from "lucide-react";

const ProjectList: React.FC = () => {
  const { projects, deleteProject } = useProjects();
  const { toast } = useToast();
  const [deletingProject, setDeletingProject] = useState<Project | null>(null);
  
  const handleDeleteConfirm = () => {
    if (deletingProject) {
      deleteProject(deletingProject.id);
      toast({
        title: "Project deleted",
        description: "The project has been deleted successfully.",
      });
      setDeletingProject(null);
    }
  };
  
  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-white/60">No projects found. Add your first project!</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">Your Projects</h3>
      
      <div className="space-y-4">
        {projects.map((project) => (
          <div 
            key={project.id}
            className="p-4 bg-dark border border-white/10 rounded-lg flex justify-between items-center"
          >
            <div className="flex items-center space-x-4">
              <div 
                className="w-12 h-12 rounded overflow-hidden flex-shrink-0"
                style={{
                  backgroundImage: `url(${project.imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              <div>
                <h4 className="font-medium text-white">{project.title}</h4>
                <p className="text-sm text-white/60 truncate max-w-[400px]">
                  {project.description}
                </p>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                className="p-2 text-white/60 hover:text-white transition-colors"
                aria-label="Edit project"
              >
                <Pencil size={18} />
              </button>
              <button
                className="p-2 text-white/60 hover:text-red-500 transition-colors"
                onClick={() => setDeletingProject(project)}
                aria-label="Delete project"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <AlertDialog open={!!deletingProject} onOpenChange={() => setDeletingProject(null)}>
        <AlertDialogContent className="bg-dark-light border-white/10 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-white/60">
              This action cannot be undone. This will permanently delete the project.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent border border-white/10 text-white hover:bg-white/5">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-600 text-white hover:bg-red-700"
              onClick={handleDeleteConfirm}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProjectList;
