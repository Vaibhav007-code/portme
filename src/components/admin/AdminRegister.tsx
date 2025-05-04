
import React, { useState } from "react";
import { useAdmin } from "@/context/AdminContext";
import { useToast } from "@/hooks/use-toast";

interface AdminRegisterProps {
  onSwitch: () => void;
}

const AdminRegister: React.FC<AdminRegisterProps> = ({ onSwitch }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAdmin();
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await register(email, password);
      if (success) {
        toast({
          title: "Registration successful",
          description: "You can now log in to your admin dashboard.",
        });
        onSwitch();
      } else {
        toast({
          title: "Registration failed",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gradient">Create Admin Account</h2>
        <p className="text-white/60 mt-2">Set up your portfolio administrator access</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-white/80 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 bg-dark border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-electric-blue/50"
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-white/80 mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 bg-dark border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-electric-blue/50"
          />
        </div>
        
        <div>
          <label htmlFor="confirmPassword" className="block text-white/80 mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-4 py-3 bg-dark border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-electric-blue/50"
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full px-6 py-3 bg-electric-blue text-white rounded-lg hover-scale shadow-lg shadow-electric-blue/20 transition-all ${
            isLoading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Creating account..." : "Register"}
        </button>
        
        <p className="text-center text-white/60 mt-4">
          Already registered?{" "}
          <button
            type="button"
            onClick={onSwitch}
            className="text-electric-blue hover:underline"
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default AdminRegister;
