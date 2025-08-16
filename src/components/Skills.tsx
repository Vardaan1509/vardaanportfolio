import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Code, Wrench, Users, Presentation } from "lucide-react";

const Skills = () => {
  const skillCategories = [
    {
      icon: Code,
      title: "Technical Skills",
      skills: [
        { name: "Python", level: 85, description: "DSA, File Handling, SQL Integration" },
        { name: "C++", level: 70, description: "Basic programming concepts,data structres and syntax" },
        { name: "MySQL", level: 75, description: "Database design and query optimization" },
        { name: "Data Structures", level: 80, description: "Algorithms and problem solving" }
      ]
    },
    {
      icon: Wrench,
      title: "Development Tools",
      skills: [
        { name: "Database Design", level: 75, description: "Relational database modeling" },
        { name: "Software Architecture", level: 70, description: "System design principles" },
        { name: "Problem Solving", level: 90, description: "Analytical and creative thinking" },
        { name: "Research & Analysis", level: 85, description: "Data analysis and presentation" }
      ]
    },
    {
      icon: Users,
      title: "Leadership & Soft Skills",
      skills: [
        { name: "Team Leadership", level: 90, description: "Leading school initiatives and projects" },
        { name: "Public Speaking", level: 85, description: "Presentations and choir performances" },
        { name: "Project Management", level: 80, description: "Organizing and executing initiatives" },
        { name: "Mentoring", level: 75, description: "Guiding peers and junior students" }
      ]
    },
    {
      icon: Presentation,
      title: "Creative & Performance",
      skills: [
        { name: "Multimedia Design", level: 80, description: "Award-winning presentation design" },
        { name: "Vocal Performance", level: 85, description: "Lead singer in school choir" },
        { name: "Creative Problem Solving", level: 85, description: "Innovative approach to challenges" },
        { name: "Content Creation", level: 75, description: "Video production and storytelling" }
      ]
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Skills & Expertise
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A diverse skill set spanning technical development, leadership, and creative expression
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => {
            const IconComponent = category.icon;
            return (
              <Card key={categoryIndex} className="bg-card shadow-card border-0 hover:shadow-elegant transition-all duration-300">
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">4+</div>
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
