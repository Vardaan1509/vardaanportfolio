import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Code, Wrench, Users, Presentation, Database, Cpu } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const Skills = () => {
  const [sectionRef, isSectionVisible] = useScrollAnimation();
  const [titleRef, isTitleVisible] = useScrollAnimation({ threshold: 0.3 });
  const [skillsRef, isSkillsVisible] = useScrollAnimation({ threshold: 0.2 });

  const skillCategories = [
    {
      icon: Code,
      title: "Programming Languages",
      skills: [
        { name: "Python", level: 85, description: "Advanced proficiency in Python development" },
        { name: "C++", level: 75, description: "Object-oriented programming and system development" },
        { name: "C", level: 70, description: "System programming and memory management" },
        { name: "SQL/MySQL", level: 80, description: "Database queries and data manipulation" }
      ]
    },
    {
      icon: Wrench,
      title: "Tools & Technologies",
      skills: [
        { name: "GitHub", level: 85, description: "Version control and collaborative development" },
        { name: "CustomTkinter", level: 75, description: "GUI development for Python applications" },
        { name: "PyQRCode", level: 70, description: "QR code generation and integration" },
        { name: "Development Tools", level: 80, description: "IDE setup and debugging tools" }
      ]
    },
    {
      icon: Cpu,
      title: "Core Concepts",
      skills: [
        { name: "Data Structures & Algorithms", level: 85, description: "Problem solving and optimization" },
        { name: "System Design", level: 75, description: "Architecture and scalability planning" },
        { name: "GUI Development", level: 80, description: "User interface design and implementation" },
        { name: "File Handling", level: 85, description: "Data persistence and file operations" }
      ]
    },
    {
      icon: Users,
      title: "Leadership & Soft Skills",
      skills: [
        { name: "Team Leadership", level: 90, description: "Leading school initiatives and student body" },
        { name: "Public Speaking", level: 85, description: "Presentations and performance experience" },
        { name: "Creative Problem Solving", level: 85, description: "Innovative approach to challenges" },
        { name: "Project Management", level: 80, description: "Organizing and executing initiatives" }
      ]
    }
  ];

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className={`py-16 bg-background transition-all duration-1000 ${
        isSectionVisible ? 'animate-fade-in' : 'opacity-0'
      }`}
    >
      <div className="container mx-auto px-6">
        <div 
          ref={titleRef}
          className={`text-center mb-12 transition-all duration-700 delay-100 ${
            isTitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 font-serif">
            Technical Skills & Expertise
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive skill set spanning programming languages, development tools, and core computer science concepts
          </p>
        </div>

        <div 
          ref={skillsRef}
          className={`grid lg:grid-cols-2 gap-8 transition-all duration-1000 delay-400 ${
            isSkillsVisible ? 'animate-fade-in' : 'opacity-0'
          }`}
        >
          {skillCategories.map((category, categoryIndex) => {
            const IconComponent = category.icon;
            return (
              <Card 
                key={categoryIndex} 
                className={`bg-card shadow-card border-0 hover:shadow-elegant transition-all duration-300 ${
                  isSkillsVisible ? `animate-fade-in` : 'opacity-0'
                }`}
                style={{ 
                  animationDelay: isSkillsVisible ? `${600 + categoryIndex * 150}ms` : '0ms',
                  animationFillMode: 'forwards'
                }}
              >
                <CardHeader className="pb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <CardTitle className="text-xl text-foreground">
                      {category.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-6">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium text-foreground">
                            {skill.name}
                          </h4>
                          <span className="text-xs text-muted-foreground">
                            {skill.level}%
                          </span>
                        </div>
                        <Progress 
                          value={skill.level} 
                          className="h-2"
                        />
                        <p className="text-xs text-muted-foreground">
                          {skill.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div 
          className={`grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 transition-all duration-1000 delay-600 ${
            isSkillsVisible ? 'animate-fade-in' : 'opacity-0'
          }`}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">5+</div>
            <div className="text-sm text-muted-foreground">Programming Languages</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">10+</div>
            <div className="text-sm text-muted-foreground">Leadership Roles</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">10+</div>
            <div className="text-sm text-muted-foreground">Awards & Recognitions</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">97%</div>
            <div className="text-sm text-muted-foreground">Academic Performance</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
