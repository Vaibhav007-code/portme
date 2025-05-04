
import React, { useState } from "react";
import { motion } from "framer-motion";

// Define skill categories and their items
const skillCategories = [
  {
    name: "Frontend",
    skills: [
      { name: "HTML", level: 90 },
      { name: "CSS", level: 85 },
      { name: "JavaScript", level: 80 },
      { name: "React", level: 85 },
      { name: "Bootstrap", level: 75 },
    ]
  },
  {
    name: "Backend",
    skills: [
      { name: "Python", level: 75 },
      { name: "SQL", level: 70 },
      { name: "Node.js", level: 65 },
    ]
  },
  {
    name: "Tools & Platforms",
    skills: [
      { name: "Git", level: 80 },
      { name: "GitHub", level: 85 },
      { name: "Render", level: 70 },
      { name: "Vercel", level: 75 },
    ]
  },
  {
    name: "Other",
    skills: [
      { name: "C++", level: 75 },
    ]
  }
];

const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].name);
  
  return (
    <section id="skills" className="py-28 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute w-64 h-64 rounded-full bg-primary/5 blur-3xl -top-32 -right-20 dark:bg-primary/10"></div>
        <div className="absolute w-96 h-96 rounded-full bg-secondary/5 blur-3xl -bottom-40 -left-32 dark:bg-secondary/10"></div>
      </div>
      
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent">Skills</h2>
        <p className="text-center text-foreground/70 mb-16 max-w-2xl mx-auto">
          Here are my technical skills and competencies that I've developed over the years.
        </p>
        
        {/* Category Navigation */}
        <div className="flex justify-center mb-12 overflow-x-auto no-scrollbar">
          <div className="flex space-x-2 p-1 rounded-full border border-border bg-background/50 backdrop-blur-sm">
            {skillCategories.map(category => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                  activeCategory === category.name 
                    ? "bg-primary text-white shadow-lg" 
                    : "text-foreground/70 hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* Skills Display */}
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-8">
          {skillCategories
            .filter(category => category.name === activeCategory)
            .map(category => (
              <React.Fragment key={category.name}>
                {category.skills.map((skill, index) => (
                  <motion.div 
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative"
                  >
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-foreground">{skill.name}</span>
                      <span className="text-foreground/60 text-sm">{skill.level}%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-primary to-secondary"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </React.Fragment>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
