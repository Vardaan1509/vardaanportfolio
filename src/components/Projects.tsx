import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Activity } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";


const Projects = () => {
  const [sectionRef, isSectionVisible] = useScrollAnimation();
  const [titleRef, isTitleVisible] = useScrollAnimation({ threshold: 0.3 });
  const [projectsRef, isProjectsVisible] = useScrollAnimation({ threshold: 0.2 });
  
  const projects = [
    {
      icon: Bot,
      title: "AInterview (McHacks 13)",
      description: "Architected a high-fidelity React and TypeScript frontend featuring a dynamic interview interface and real-time dashboard tracking 10+ performance metrics. Integrated Gemini 2.5 Flash and ElevenLabs APIs to deliver automated technical assessments, achieving a 98% successful response rate for voice-to-text processing. Leveraged Supabase for secure, low-latency data persistence of interview transcripts and analytics.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Gemini API", "ElevenLabs", "Supabase"],
      image: "/lovable-uploads/ainterview.png"
    },
    {
      icon: Activity,
      title: "CXR Triage (CXC AI Hackathon)",
      description: "An AI-powered chest X-ray triage system for emergency departments. A ResNet50 model screens for pneumothorax, pneumonia, and lung nodules, flagging cases as URGENT, REVIEW, or ROUTINE. Gemini 2.5 Flash generates structured clinical reports, while a clinically-weighted similarity algorithm matches new cases against resolved ones to build institutional knowledge. Includes OCR-powered patient intake, full audit trail, and Supabase-backed persistent storage.",
      technologies: ["Next.js", "React", "TypeScript", "PyTorch", "FastAPI", "Gemini API", "Supabase"],
      image: "/lovable-uploads/cxr-triage.png"
    },
    {
      icon: Bot,
      title: "AI-Powered Netflix Recommendation Engine",
      description: "Intelligent questionnaire application leveraging AI-driven conversation flow to generate personalized Netflix recommendations based on user mood, preferences, and viewing context. Features context-aware AI with custom prompt engineering and confidence thresholds for highly personalized content suggestions.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Supabase", "Lovable AI"],
      image: "/lovable-uploads/netflix-recommendation.png"
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
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
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
