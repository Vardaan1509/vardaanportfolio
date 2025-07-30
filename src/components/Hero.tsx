import { Button } from "@/components/ui/button";
import { ChevronDown, Download, ArrowRight, Sparkles } from "lucide-react";
import Navigation from "./Navigation";
const vardaanHero = "/lovable-uploads/56e098bc-8089-4283-a76a-66802b121efe.png";
const Hero = () => {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return <section className="min-h-screen flex items-center justify-center bg-gradient-hero relative overflow-hidden">
      <Navigation />
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/3 to-secondary/5" />
      
      {/* Animated Background Orbs */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-pulse animation-delay-1000" />
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-secondary/8 rounded-full blur-2xl animate-pulse animation-delay-2000" />
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-30" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Enhanced Content */}
          <div className="text-center lg:text-left space-y-8 animate-fade-in">
            <div className="space-y-6">
              {/* Status Badge with Icon */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 text-primary rounded-full text-sm font-medium backdrop-blur-sm hover-scale">
                <Sparkles className="w-4 h-4" />
                Available for Opportunities
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              </div>
              
              {/* Enhanced Typography */}
              <h1 className="text-5xl lg:text-7xl font-bold text-foreground leading-tight">
                Hi, I'm{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent relative">
                  Vardaan
                  <div className="absolute -inset-1 bg-gradient-primary opacity-20 blur-lg rounded-lg"></div>
                </span>
              </h1>
              
              <h2 className="text-2xl lg:text-3xl text-muted-foreground font-medium leading-relaxed">
                Aspiring Computer Engineer with a 
                <span className="text-primary font-semibold"> Passion for Innovation</span>
              </h2>
              
              <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                Blending curiosity, creativity, and code to solve real-world problems. 
                <br className="hidden sm:block" />
                <span className="font-medium text-foreground">Incoming Computer Engineering student at the University of Waterloo.</span>
              </p>
            </div>
            
            {/* Enhanced Buttons */}
            <div className="flex justify-center lg:justify-start">
              <Button size="lg" className="group bg-gradient-primary hover:opacity-90 transition-all duration-300 shadow-elegant hover:shadow-glow hover:scale-105" onClick={scrollToAbout}>
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            
            {/* Stats or Social Proof */}
            
          </div>
          
          {/* Enhanced Image Section */}
          <div className="relative animate-fade-in animation-delay-300 flex justify-center">
            {/* Decorative Frame */}
            <div className="absolute -inset-4 bg-gradient-to-br from-orange-200/30 to-amber-200/30 rounded-3xl blur-xl"></div>
            <div className="absolute -inset-2 bg-gradient-to-r from-orange-100/40 to-amber-100/40 rounded-2xl"></div>
            
            {/* Main Image Container */}
            <div className="relative bg-background/90 backdrop-blur-sm rounded-2xl p-3 shadow-elegant max-w-md w-full border border-orange-100/30">
              <img src={vardaanHero} alt="Vardaan Mehandiratta" className="w-full h-auto aspect-square object-cover rounded-xl hover-scale transition-transform duration-500" />
              
              {/* Floating Elements */}
              
              
              
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 -translate-x-16">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs text-muted-foreground font-medium">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-muted-foreground/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;