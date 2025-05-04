
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface Admin {
  isAuthenticated: boolean;
  email: string | null;
}

interface AdminContextType {
  admin: Admin;
  isAdminModalOpen: boolean;
  isRegistered: boolean;
  clickCount: number;
  incrementClickCount: () => void;
  resetClickCount: () => void;
  openAdminModal: () => void;
  closeAdminModal: () => void;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (email: string, password: string) => Promise<boolean>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [admin, setAdmin] = useState<Admin>({ isAuthenticated: false, email: null });
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [isRegistered, setIsRegistered] = useState(false);
  
  // Check if admin exists in localStorage on mount
  // For Supabase integration: Replace this with a Supabase auth check
  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");
    const hasRegistered = localStorage.getItem("isRegistered");
    
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }
    
    if (hasRegistered) {
      setIsRegistered(true);
    }
    
    // With Supabase, you would have code like:
    // const checkSession = async () => {
    //   const { data: { session } } = await supabase.auth.getSession();
    //   if (session) {
    //     setAdmin({ isAuthenticated: true, email: session.user.email });
    //     setIsRegistered(true);
    //   }
    // };
    // checkSession();
  }, []);
  
  const incrementClickCount = () => {
    setClickCount((prev) => {
      const newCount = prev + 1;
      if (newCount === 3) {
        openAdminModal();
        return 0;
      }
      return newCount;
    });
    
    // Reset click count after 2 seconds if not reaching 3
    setTimeout(() => {
      setClickCount(0);
    }, 2000);
  };
  
  const resetClickCount = () => setClickCount(0);
  
  const openAdminModal = () => setIsAdminModalOpen(true);
  
  const closeAdminModal = () => setIsAdminModalOpen(false);
  
  const login = async (email: string, password: string): Promise<boolean> => {
    // For Supabase integration: Replace with Supabase auth.signInWithPassword
    // const { data, error } = await supabase.auth.signInWithPassword({
    //   email,
    //   password
    // });
    
    // if (error) return false;
    // if (data.user) {
    //   setAdmin({ isAuthenticated: true, email: data.user.email });
    //   return true;
    // }
    
    // Using localStorage for now
    const storedCredentials = JSON.parse(localStorage.getItem("adminCredentials") || "{}");
    
    if (storedCredentials.email === email && storedCredentials.password === password) {
      const loggedInAdmin = { isAuthenticated: true, email };
      setAdmin(loggedInAdmin);
      localStorage.setItem("admin", JSON.stringify(loggedInAdmin));
      return true;
    }
    
    return false;
  };
  
  const register = async (email: string, password: string): Promise<boolean> => {
    // For Supabase integration: Replace with Supabase auth.signUp
    // const { data, error } = await supabase.auth.signUp({
    //   email,
    //   password
    // });
    
    // if (error) return false;
    // if (data.user) {
    //   setIsRegistered(true);
    //   return true;
    // }
    
    // Using localStorage for now
    try {
      localStorage.setItem("adminCredentials", JSON.stringify({ email, password }));
      localStorage.setItem("isRegistered", "true");
      setIsRegistered(true);
      return true;
    } catch (error) {
      console.error("Registration failed", error);
      return false;
    }
  };
  
  const logout = () => {
    // For Supabase integration: Replace with Supabase auth.signOut
    // await supabase.auth.signOut();
    
    setAdmin({ isAuthenticated: false, email: null });
    localStorage.removeItem("admin");
    closeAdminModal();
  };
  
  return (
    <AdminContext.Provider
      value={{
        admin,
        isAdminModalOpen,
        isRegistered,
        clickCount,
        incrementClickCount,
        resetClickCount,
        openAdminModal,
        closeAdminModal,
        login,
        logout,
        register
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};
