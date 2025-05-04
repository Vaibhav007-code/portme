
import { useEffect, useRef } from "react";

const Hero = () => {
  const textRef = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    const animateText = () => {
      const text = textRef.current;
      if (!text) return;
      
      text.classList.add("animate-fade-in");
    };
    
    animateText();
  }, []);
  
  return (
    <section 
      className="min-h-screen flex flex-col justify-center items-center px-6 relative"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-primary/10 filter blur-3xl animate-float dark:bg-primary/20"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-secondary/10 filter blur-3xl animate-float dark:bg-secondary/20" style={{ animationDelay: "1s" }}></div>
      </div>
      
      <div className="text-center relative z-10 max-w-3xl">
        <p className="text-primary mb-2 font-semibold tracking-wider animate-fade-in">Hello, I'm</p>
        <h1 
          ref={textRef} 
          className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent"
        >
          Vaibhav Pathak
        </h1>
        <h2 className="text-xl md:text-2xl mb-6 text-foreground/80 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          Full Stack Developer
        </h2>
        <p className="text-lg text-foreground/60 mb-10 leading-relaxed animate-fade-in" style={{ animationDelay: "0.6s" }}>
          I build responsive and user-friendly applications, leveraging 
          problem-solving skills for impactful projects.
        </p>
        <div className="flex flex-wrap justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.9s" }}>
          <a 
            href="#projects" 
            className="px-8 py-3 bg-primary text-white rounded-full hover:scale-105 transition-transform shadow-lg shadow-primary/20"
          >
            View Projects
          </a>
          <a 
            href="#skills" 
            className="px-8 py-3 bg-transparent border border-border text-foreground rounded-full hover:scale-105 hover:bg-foreground/5 transition-all"
          >
            My Skills
          </a>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-foreground/30 flex justify-center pt-2">
          <div className="w-1 h-2 bg-foreground/60 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
