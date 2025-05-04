
import React, { useState, FormEvent } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // In a real application, you'd send this data to a server
    console.log("Form submitted:", formData);
    
    // Show success toast
    toast({
      title: "Message sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
    });
    
    // Reset form
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };
  
  return (
    <section id="contact" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-gradient">Get in Touch</h2>
        <p className="text-center text-white/70 mb-12 max-w-2xl mx-auto">
          Have a project in mind or want to collaborate? Feel free to reach out and let's discuss how we can work together.
        </p>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="glass-panel p-8 animate-fade-in">
            <h3 className="text-2xl font-semibold mb-6 text-white">Contact Info</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-medium mb-2 text-white/90">Email</h4>
                <a 
                  href="mailto:pathakvaibhav755@gmail.com"
                  className="text-electric-blue hover:underline"
                >
                  pathakvaibhav755@gmail.com
                </a>
              </div>
              
              <div>
                <h4 className="text-lg font-medium mb-2 text-white/90">Social</h4>
                <div className="space-y-2">
                  <p>
                    <a 
                      href="https://linkedin.com/in/vaibhav-pathak-8b8991214"
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      LinkedIn
                    </a>
                  </p>
                  <p>
                    <a 
                      href="https://github.com"
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      Github
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white/80 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-dark-light border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-electric-blue/50"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-white/80 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-dark-light border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-electric-blue/50"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-white/80 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-dark-light border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-electric-blue/50 resize-none"
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-6 py-3 bg-electric-blue text-white rounded-lg hover-scale shadow-lg shadow-electric-blue/20 transition-all ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
