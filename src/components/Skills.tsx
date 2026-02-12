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
      title: "Languages",
      skills: [
        { name: "JavaScript", level: 90, description: "Modern web development and ES6+" },
        { name: "HTML/CSS", level: 90, description: "Responsive web design and styling" },
        { name: "TypeScript", level: 85, description: "Type-safe JavaScript development" },
        { name: "Python", level: 85, description: "Scripting, automation, and ML" },
        { name: "C++", level: 80, description: "Systems programming and OOP" },
        { name: "C", level: 75, description: "Low-level systems programming" },
        { name: "SQL/MySQL", level: 80, description: "Database queries and data manipulation" }
      ]
    },
    {
      icon: Layers,
      title: "Frameworks",
      skills: [
        { name: "React", level: 90, description: "Component-based UI development" },
        { name: "Next.js", level: 85, description: "Full-stack React framework" },
        { name: "Node.js", level: 85, description: "Server-side JavaScript runtime" },
        { name: "Express.js", level: 80, description: "Minimal Node.js web framework" },
        { name: "Deno.js", level: 75, description: "Modern JavaScript/TypeScript runtime" },
        { name: "Tailwind CSS", level: 90, description: "Utility-first CSS framework" }
      ]
    },
    {
      icon: Wrench,
      title: "DevOps / Tools",
      skills: [
        { name: "Git", level: 90, description: "Version control and collaboration" },
        { name: "GitHub", level: 90, description: "Code hosting and CI/CD workflows" },
        { name: "VS Code", level: 90, description: "Primary code editor and extensions" },
        { name: "Supabase", level: 85, description: "Backend-as-a-service platform" },
        { name: "Vercel", level: 85, description: "Frontend deployment and hosting" },
        { name: "DigitalOcean", level: 75, description: "Cloud infrastructure and hosting" },
        { name: "Postman", level: 80, description: "API testing and documentation" },
        { name: "MongoDB", level: 75, description: "NoSQL document database" },
        { name: "Cloudinary", level: 75, description: "Media management and optimization" }
      ]
    },
    {
      icon: Package,
      title: "Libraries",
      skills: [
        { name: "pandas", level: 80, description: "Data manipulation and analysis" },
        { name: "NumPy", level: 80, description: "Numerical computing and arrays" },
        { name: "Tkinter", level: 80, description: "GUI development for Python applications" },
        { name: "PyTorch", level: 75, description: "Deep learning and neural networks" }
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
            <div className="text-3xl font-bold text-primary mb-2">7</div>
            <div className="text-sm text-muted-foreground">Languages</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">6</div>
            <div className="text-sm text-muted-foreground">Frameworks</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">9</div>
            <div className="text-sm text-muted-foreground">DevOps / Tools</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">4</div>
            <div className="text-sm text-muted-foreground">Libraries</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
