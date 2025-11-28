import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Database, Bot, Globe, Chrome, QrCode, Activity } from "lucide-react";
import { useState, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";


const Projects = () => {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [sectionRef, isSectionVisible] = useScrollAnimation();
  const [titleRef, isTitleVisible] = useScrollAnimation({ threshold: 0.3 });
  const [projectsRef, isProjectsVisible] = useScrollAnimation({ threshold: 0.2 });
  
  const handleVideoClick = (index: number) => {
    console.log('Video clicked, index:', index);
    setPlayingIndex(playingIndex === index ? null : index);
  };
  
  const projects = [
    {
      icon: Chrome,
      title: "UW Login Helper",
      description: "A sleek Chrome extension that automates University of Waterloo portal login, securely saving credentials locally and auto-filling the login form in one click. Built with modern web technologies, it enhances student productivity by eliminating repetitive login processes while ensuring complete privacy.",
      technologies: ["JavaScript", "HTML", "CSS", "Chrome Extension"],
      status: "Completed",
      image: "/lovable-uploads/f829901a-efdf-456b-97aa-045a062bbe93.png"
    },
    {
      icon: Bot,
      title: "AI-Powered Netflix Recommendation Engine",
      description: "Intelligent questionnaire application leveraging AI-driven conversation flow to generate personalized Netflix recommendations based on user mood, preferences, and viewing context. Features context-aware AI with custom prompt engineering and confidence thresholds for highly personalized content suggestions.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Supabase", "Lovable AI"],
      status: "Completed",
      image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=600&h=300&fit=crop"
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
      icon: Database,
      title: "Shoe Management System",
      description: "A comprehensive inventory management system built with Python and SQL for tracking footwear inventory, sales, and stock management with real-time updates and reporting features.",
      technologies: ["Python", "SQL", "Database Design", "File Handling"],
      status: "Completed",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=300&fit=crop"
    },
    {
      icon: Activity,
      title: "Hospital-Induced Delirium Detection & Prevention System",
      description: "Engineered a delirium prevention ecosystem utilizing Arduino telemetry and custom gamified assessments tailored across 4 age demographics. Validated by medical professionals to reduce manual cognitive screening time by 40%, streamlining ICU workflows. Built a secure, scalable backend to archive patient telemetry, powering individualized dashboards for 25+ user profiles tracking long-term cognitive scores.",
      technologies: ["Arduino", "Sensors", "C++", "TypeScript", "HTML", "CSS"],
      status: "Completed",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=300&fit=crop"
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
    <section 
      id="projects" 
      ref={sectionRef}
      className={`py-16 bg-muted/30 transition-opacity duration-700 ${
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
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my technical projects demonstrating programming skills and innovative problem-solving
          </p>
        </div>

        <div 
          ref={projectsRef}
          className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto transition-all duration-700 delay-200 ${
            isProjectsVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {projects.map((project, index) => {
            const IconComponent = project.icon;
            return (
              <Card 
                key={index} 
                className={`bg-card shadow-card border-0 hover:shadow-elegant transition-all duration-300 group overflow-hidden ${
                  isProjectsVisible ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="relative overflow-hidden">
                  {project.youtubeId ? (
                    playingIndex === index ? (
                      <div className="w-full h-48 bg-black">
                        <iframe
                          src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1`}
                          title={project.title}
                          className="w-full h-full"
                          allow="autoplay; encrypted-media"
                          allowFullScreen
                        />
                      </div>
                    ) : (
                      <div
                        className="w-full h-48 bg-gray-800 cursor-pointer relative"
                        onClick={() => handleVideoClick(index)}
                      >
                        <img
                          src={`https://img.youtube.com/vi/${project.youtubeId}/hqdefault.jpg`}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                              <polygon points="9,5 20,12 9,19" />
                            </svg>
                          </div>
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
                  {!project.youtubeId && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  )}
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
