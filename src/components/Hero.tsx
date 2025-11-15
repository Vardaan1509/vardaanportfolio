import { Button } from "@/components/ui/button";
import { ChevronDown, Download, ArrowRight, Briefcase } from "lucide-react";
import Navigation from "./Navigation";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const vardaanHero = "/lovable-uploads/56e098bc-8089-4283-a76a-66802b121efe.png";

const Hero = () => {
  const [heroRef, isHeroVisible] = useScrollAnimation();
  const [contentRef, isContentVisible] = useScrollAnimation({ threshold: 0.2 });
  const [imageRef, isImageVisible] = useScrollAnimation({ threshold: 0.3 });

  const scrollToExperience = () => {
    document.getElementById('experience')?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <section 
      ref={heroRef}
      className={`min-h-screen flex items-center justify-center bg-gradient-hero relative overflow-hidden pt-16 transition-opacity duration-700 ${
        isHeroVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <Navigation />
      
      {/* Modern Background with Depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/3 to-transparent" />
      
      {/* Modern Grid Pattern with Blur */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.015)_1px,transparent_1px)] bg-[size:60px_60px] opacity-60" />
      
      {/* Floating Elements for Modern Touch */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl opacity-30 animate-pulse" />
      <div className="absolute bottom-32 left-16 w-96 h-96 bg-gradient-to-tr from-accent/8 to-primary/8 rounded-full blur-3xl opacity-25 animate-pulse" style={{ animationDelay: '2s' }} />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Professional Content */}
          <div 
            ref={contentRef}
            className={`text-center lg:text-left space-y-8 transition-all duration-700 ${
              isContentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
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
                <strong>Actively seeking summer 2026 internship opportunities</strong> to apply and grow my technical skills while contributing to impactful projects.


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
              <a
  href="/Vardaan_Mehandiratta_Resume_1 (7).pdf"
  download
  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-4 py-2 rounded shadow transition flex items-center"
>
  <Download className="mr-2 h-4 w-4" />
  Download Resume
</a>

            </div>
          </div>
          
          {/* Modern Image Section with Glass Effect */}
          <div 
            ref={imageRef}
            className={`relative flex justify-center transition-all duration-700 ${
              isImageVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            <div className="relative glass rounded-3xl p-8 shadow-elegant max-w-md w-full hover-lift">
              <div className="relative overflow-hidden rounded-2xl">
                <img 
                  src={vardaanHero} 
                  alt="Vardaan Mehandiratta - Computer Engineering Student" 
                  className="w-full h-auto aspect-square object-cover transition-all duration-500 hover:scale-105" 
                />
                {/* Modern overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Professional Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <ChevronDown className="w-6 h-6 text-muted-foreground/60 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
