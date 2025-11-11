import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Code, Wrench, Users, Layers, Package } from "lucide-react";
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
        { name: "Python", level: 90, description: "Advanced proficiency in Python development" },
        { name: "C++", level: 85, description: "Object-oriented programming and system development" },
        { name: "JavaScript", level: 85, description: "Modern web development and ES6+" },
        { name: "TypeScript", level: 80, description: "Type-safe JavaScript development" },
        { name: "SQL/MySQL", level: 80, description: "Database queries and data manipulation" },
        { name: "HTML/CSS", level: 85, description: "Responsive web design and styling" }
      ]
    },
    {
      icon: Layers,
      title: "Frameworks",
      skills: [
        { name: "React", level: 85, description: "Component-based UI development" },
        { name: "Node.js", level: 80, description: "Server-side JavaScript runtime" },
        { name: "Vue.js", level: 75, description: "Progressive JavaScript framework" }
      ]
    },
    {
      icon: Wrench,
      title: "Developer Tools",
      skills: [
        { name: "Git", level: 90, description: "Version control and collaboration" },
        { name: "GitHub", level: 90, description: "Code hosting and team collaboration" },
        { name: "VS Code", level: 85, description: "Primary code editor and extensions" },
        { name: "Visual Studio", level: 80, description: "Integrated development environment" },
        { name: "PyCharm", level: 85, description: "Python IDE for complex projects" },
        { name: "Microsoft PowerPoint", level: 85, description: "Professional presentations and design" }
      ]
    },
    {
      icon: Package,
      title: "Libraries",
      skills: [
        { name: "pandas", level: 80, description: "Data manipulation and analysis" },
        { name: "NumPy", level: 80, description: "Numerical computing and arrays" },
        { name: "Tkinter", level: 85, description: "GUI development for Python applications" }
      ]
    }
  ];

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className={`py-16 bg-background transition-opacity duration-700 ${
        isSectionVisible ? 'opacity-100' : 'opacity-0'
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
          className={`grid lg:grid-cols-2 gap-8 transition-all duration-700 delay-200 ${
            isSkillsVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {skillCategories.map((category, categoryIndex) => {
            const IconComponent = category.icon;
            return (
              <Card 
                key={categoryIndex} 
                className={`bg-card shadow-card border-0 hover:shadow-elegant transition-all duration-300 ${
                  isSkillsVisible ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <CardHeader className="pb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-primary-foreground" />
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
          className={`grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 transition-all duration-700 delay-300 ${
            isSkillsVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">6+</div>
            <div className="text-sm text-muted-foreground">Programming Languages</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">3+</div>
            <div className="text-sm text-muted-foreground">Frameworks</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">6+</div>
            <div className="text-sm text-muted-foreground">Developer Tools</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">3+</div>
            <div className="text-sm text-muted-foreground">Libraries</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
