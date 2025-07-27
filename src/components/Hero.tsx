import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import vardaanHero from "@/assets/vardaan-hero.jpg";

const Hero = () => {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-hero relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
      <div className="absolute top-20 right-20 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                Available for Opportunities
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold text-foreground leading-tight">
                Hi, I'm{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Vardaan
                </span>
              </h1>
              <h2 className="text-2xl lg:text-3xl text-muted-foreground font-medium">
                Aspiring Computer Engineer with a Passion for Innovation
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Blending curiosity, creativity, and code to solve real-world problems. 
                Incoming Computer Engineering student at University of Waterloo.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="bg-gradient-primary hover:opacity-90 transition-opacity shadow-elegant"
                onClick={scrollToAbout}
              >
                Learn More
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-primary/20 hover:bg-primary/5"
              >
                Download CV
              </Button>
            </div>
          </div>
          
          {/* Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src={vardaanHero}
                alt="Vardaan Mehandiratta"
                className="w-full max-w-md mx-auto rounded-2xl shadow-elegant"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-primary opacity-20 rounded-2xl blur-3xl transform rotate-6"></div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-muted-foreground" />
      </div>
    </section>
  );
};

export default Hero;