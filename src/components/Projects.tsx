import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Database, Bot, Globe } from "lucide-react";


const Projects = () => {
  const projects = [
    {
      icon: Database,
      title: "Shoe Management System",
      description: "A comprehensive inventory management system built with Python and SQL for tracking footwear inventory, sales, and stock management with real-time updates and reporting features.",
      technologies: ["Python", "SQL", "Database Design", "File Handling"],
      status: "Completed",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=300&fit=crop"
    },
    {
      icon: Bot,
      title: "Medical AI Chatbot Concept",
      description: "Conceptual design for a scalable, hardware-deployable healthcare AI system targeting rural India. Features include disease tracking, prediction algorithms, and medical advice delivery through accessible interfaces.",
      technologies: ["AI/ML", "Healthcare Tech", "Scalable Architecture", "Rural Technology"],
      status: "Concept Stage",
      videoUrl: "https://youtu.be/59pJQfIg8DA"
    },
    {
      icon: Globe,
      title: "Rapid Urbanization in African Cities",
      description: "Award-winning multimedia presentation analyzing urbanization patterns in Kigali, Casablanca, and Addis Ababa. Won first prize for comprehensive research and innovative presentation techniques.",
      technologies: ["Research", "Multimedia Design", "Data Analysis", "Presentation"],
      status: "Award Winner",
      image: "/lovable-uploads/63bac133-3ff4-43a1-ac86-2a60cbe6be68.png"
    }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      "Completed": "bg-green-100 text-green-700",
      "Concept Stage": "bg-blue-100 text-blue-700",
      "Award Winner": "bg-yellow-100 text-yellow-700"
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-700";
  };

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Innovative solutions showcasing technical skills and creative problem-solving
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const IconComponent = project.icon;
            return (
              <Card key={index} className="bg-card shadow-card border-0 hover:shadow-elegant transition-all duration-300 group overflow-hidden">
                <div className="relative overflow-hidden">
                  {project.videoUrl ? (
                    <a 
                      href={project.videoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <div className="relative w-full h-48 bg-gray-900 rounded overflow-hidden group cursor-pointer">
                        <img 
                          src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=300&fit=crop" 
                          alt="AI Medical Chatbot Concept" 
                          className="w-full h-full object-cover opacity-80"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <div className="w-0 h-0 border-l-[20px] border-l-white border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1"></div>
                          </div>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <p className="text-white text-sm font-medium">Watch Video Presentation</p>
                          <p className="text-white/80 text-xs">Click to open in YouTube</p>
                        </div>
                      </div>
                    </a>
                  ) : (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <div className="w-10 h-10 bg-white/90 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;