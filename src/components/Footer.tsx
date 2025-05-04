
import React from "react";
import { Github, Linkedin, Twitter } from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a href="#" className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Vaibhav Pathak</a>
            <p className="text-foreground/50 mt-2">Full Stack Developer</p>
          </div>
          
          <div className="flex space-x-8">
            <a 
              href="#about" 
              className="text-foreground/60 hover:text-foreground transition-colors"
            >
              About
            </a>
            <a 
              href="#skills" 
              className="text-foreground/60 hover:text-foreground transition-colors"
            >
              Skills
            </a>
            <a 
              href="#projects" 
              className="text-foreground/60 hover:text-foreground transition-colors"
            >
              Projects
            </a>
          </div>
          
          <div className="flex flex-col space-y-6 mt-8 md:mt-0">
            <div className="flex space-x-6 justify-center md:justify-end">
              <a
                href="https://linkedin.com/in/vaibhav-pathak-8b8991214"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-foreground transition-colors hover:scale-110 transform duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-foreground transition-colors hover:scale-110 transform duration-200"
                aria-label="GitHub"
              >
                <Github size={24} />
              </a>
              <a
                href="https://x.com/007Vaibhav_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-foreground transition-colors hover:scale-110 transform duration-200"
                aria-label="Twitter"
              >
                <Twitter size={24} />
              </a>
            </div>
            <p className="text-center md:text-right text-foreground/40 text-sm">
              &copy; {currentYear} Vaibhav Pathak. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
