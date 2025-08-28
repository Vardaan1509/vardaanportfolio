import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Database, Bot, Globe, Chrome, QrCode } from "lucide-react";
import { useState, useEffect } from "react";


const Projects = () => {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  
  useEffect(() => {
    console.log('PlayingIndex changed to:', playingIndex);
    if (playingIndex !== null) {
      console.log('Should show video for project:', projects[playingIndex]?.title);
    }
  }, [playingIndex]);
  
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
      youtubeId: "59pJQfIg8DA"
    },
    {
      icon: Globe,
      title: "Rapid Urbanization in African Cities",
      description: "Award-winning multimedia presentation analyzing urbanization patterns in Kigali, Casablanca, and Addis Ababa. Won first prize for comprehensive research and innovative presentation techniques.",
      technologies: ["Research", "Multimedia Design", "Data Analysis", "Presentation"],
      status: "Award Winner",
      image: "/lovable-uploads/63bac133-3ff4-43a1-ac86-2a60cbe6be68.png"
    },
    {
      icon: Chrome,
      title: "UW Login Helper",
      description: "A sleek Chrome extension that automates University of Waterloo portal login, securely saving credentials locally and auto-filling the login form in one click. Built with modern web technologies, it enhances student productivity by eliminating repetitive login processes while ensuring complete privacy.",
      technologies: ["JavaScript", "HTML", "CSS", "Chrome Extension"],
      status: "Completed",
      image: "/lovable-uploads/f829901a-efdf-456b-97aa-045a062bbe93.png"
    },
    {
      icon: QrCode,
      title: "QR Code Generator App",
      description: "A sleek desktop application built with Python and CustomTkinter that allows users to instantly generate QR codes from custom text or URLs in a single click. Features a clean, modern user interface with support for light and dark themes, real-time QR preview, and simple, intuitive controls for enhanced digital accessibility.",
      technologies: ["Python", "CustomTkinter", "PyQRCode", "Pillow"],
      status: "Completed",
      image: "/lovable-uploads/b3e561c3-8b76-430d-a9ce-d1988191cc2a.png"
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => {
            const IconComponent = project.icon;
            return (
              <Card key={index} className="bg-card shadow-card border-0 hover:shadow-elegant transition-all duration-300 group overflow-hidden">
                <div className="relative overflow-hidden">
                  {project.youtubeId ? (
                    playingIndex === index ? (
                      <div className="w-full h-48 bg-gray-100 rounded overflow-hidden">
                        <iframe
                          src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1`}
                          title={project.title}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    ) : (
                      <div
                        className="w-full h-48 bg-gray-100 rounded overflow-hidden cursor-pointer relative group"
                        onClick={() => {
                          console.log('Video clicked, setting playingIndex to:', index);
                          console.log('Video ID:', project.youtubeId);
                          setPlayingIndex(index);
                        }}
                      >
                        <img
                          src={`https://img.youtube.com/vi/${project.youtubeId}/hqdefault.jpg`}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                          <svg className="w-16 h-16 text-white opacity-80" fill="currentColor" viewBox="0 0 84 84">
                            <circle cx="42" cy="42" r="42" fill="currentColor" opacity="0.6" />
                            <polygon points="34,28 62,42 34,56" fill="#fff" />
                          </svg>
                        </div>
                      </div>
                    )
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
