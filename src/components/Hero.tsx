import { Button } from "@/components/ui/button";
import { ChevronDown, Download, ArrowRight, Briefcase } from "lucide-react";
import Navigation from "./Navigation";

const vardaanHero = "/lovable-uploads/56e098bc-8089-4283-a76a-66802b121efe.png";

const Hero = () => {
  const scrollToExperience = () => {
    document.getElementById('experience')?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-hero relative overflow-hidden pt-16">
      <Navigation />
      
      {/* Subtle Professional Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-accent/5" />
      
      {/* Minimal Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Professional Content */}
          <div className="text-center lg:text-left space-y-8 animate-fade-in">
            <div className="space-y-6">
              {/* Professional Status Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary border border-border text-foreground rounded-full text-sm font-medium">
                <Briefcase className="w-4 h-4" />
                Open to Opportunities
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              </div>
              
              {/* Professional Typography */}
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight font-serif">
                Vardaan{" "}
                <span className="text-primary">
                  Mehandiratta
                </span>
              </h1>
              
              <h2 className="text-xl lg:text-2xl text-muted-foreground font-medium leading-relaxed">
                Computer Engineering Student | University of Waterloo
              </h2>
              
              <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                Passionate about technology and innovation with a strong foundation in software development. 
                Seeking internship opportunities to apply technical skills and contribute to meaningful projects.
              </p>
            </div>
            
            {/* Professional CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary-light text-primary-foreground shadow-elegant transition-all duration-200"
                onClick={scrollToExperience}
              >
                View Experience
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </Button>
            </div>
          </div>
          
          {/* Professional Image Section */}
          <div className="relative animate-fade-in flex justify-center">
            <div className="relative bg-card rounded-2xl p-6 shadow-elegant max-w-md w-full border border-border">
              <img 
                src={vardaanHero} 
                alt="Vardaan Mehandiratta - Computer Engineering Student" 
                className="w-full h-auto aspect-square object-cover rounded-xl transition-transform duration-300 hover:scale-[1.02]" 
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Professional Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs text-muted-foreground font-medium">Scroll to explore</span>
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </div>
      </div>
    </section>
  );
};

export default Hero;