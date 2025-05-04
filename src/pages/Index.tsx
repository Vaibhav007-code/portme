
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import { ThemeProvider } from "@/hooks/use-theme";

const Index = () => {
  useEffect(() => {
    // Set page title
    document.title = "Vaibhav Pathak | Full Stack Developer";
    
    // Add some scrolling animations
    const handleScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100;
        
        if (isVisible) {
          el.classList.add('animate-fade-in');
          el.classList.remove('opacity-0');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Cursor />
        <Navbar />
        
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
        </main>
        
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;
