
import React, { useState } from "react";
import { useAdmin } from "@/context/AdminContext";
import { Tab } from "@headlessui/react";
import { useToast } from "@/hooks/use-toast";
import ProjectForm from "./ProjectForm";
import ProjectList from "./ProjectList";

const AdminDashboard: React.FC = () => {
  const { admin, logout } = useAdmin();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState(0);
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been logged out of the admin portal.",
    });
  };
  
  return (
    <div className="p-0 bg-dark-light text-white">
      <div className="flex justify-between items-center p-6 border-b border-white/10">
        <h2 className="text-xl font-bold text-gradient">Admin Dashboard</h2>
        <div className="flex items-center space-x-4">
          <p className="text-sm text-white/60">
            Logged in as: <span className="text-white/90">{admin.email}</span>
          </p>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-md text-sm"
          >
            Logout
          </button>
        </div>
      </div>
      
      <Tab.Group selectedIndex={activeTab} onChange={setActiveTab}>
        <Tab.List className="flex border-b border-white/10">
          <Tab
            className={({ selected }) =>
              `flex-1 py-3 text-sm font-medium outline-none ${
                selected
                  ? "text-electric-blue border-b-2 border-electric-blue"
                  : "text-white/60 hover:text-white"
              }`
            }
          >
            Add Project
          </Tab>
          <Tab
            className={({ selected }) =>
              `flex-1 py-3 text-sm font-medium outline-none ${
                selected
                  ? "text-electric-blue border-b-2 border-electric-blue"
                  : "text-white/60 hover:text-white"
              }`
            }
          >
            Manage Projects
          </Tab>
        </Tab.List>
        
        <Tab.Panels className="p-6">
          <Tab.Panel>
            <ProjectForm />
          </Tab.Panel>
          <Tab.Panel>
            <ProjectList />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default AdminDashboard;
