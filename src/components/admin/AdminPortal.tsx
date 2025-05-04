
import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useAdmin } from "@/context/AdminContext";
import AdminLogin from "./AdminLogin";
import AdminRegister from "./AdminRegister";
import AdminDashboard from "./AdminDashboard";

const AdminPortal: React.FC = () => {
  const { isAdminModalOpen, closeAdminModal, admin, isRegistered } = useAdmin();
  const [activeView, setActiveView] = useState<'login' | 'register'>('login');
  
  return (
    <Dialog open={isAdminModalOpen} onOpenChange={closeAdminModal}>
      <DialogContent className="sm:max-w-[600px] bg-dark-light border-white/10 text-white p-0 overflow-hidden">
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-electric-blue/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>
        
        {admin.isAuthenticated ? (
          <AdminDashboard />
        ) : isRegistered ? (
          <AdminLogin />
        ) : (
          activeView === 'register' ? (
            <AdminRegister onSwitch={() => setActiveView('login')} />
          ) : (
            <AdminLogin onSwitch={() => setActiveView('register')} />
          )
        )}
        
        <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-white/40 px-4">
          Admin data is synchronized across all your devices when you're signed in
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminPortal;
