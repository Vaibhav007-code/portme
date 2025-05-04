
import React from "react";

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 px-6">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent">About Me</h2>
        
        <div className="animate-fade-in space-y-6">
          <h3 className="text-2xl font-semibold mb-4 text-foreground">Professional Summary</h3>
          <p className="text-foreground/70 leading-relaxed">
            Aspiring Full Stack Developer with expertise in HTML, CSS, JavaScript, React, Python, and SQL.
            Skilled in responsive and user-friendly application development with collaborative tools like Git and
            GitHub.
          </p>
          <p className="text-foreground/70 leading-relaxed">
            Looking to leverage problem-solving skills for impactful projects. My focus is on creating seamless user experiences
            and building applications that solve real-world problems.
          </p>
          
          <div className="pt-4">
            <h3 className="text-xl font-semibold mb-3 text-foreground">Let's Connect</h3>
            <p className="text-foreground/70 mb-4">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            <a 
              href="mailto:pathakvaibhav755@gmail.com" 
              className="text-primary hover:underline"
            >
              pathakvaibhav755@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
