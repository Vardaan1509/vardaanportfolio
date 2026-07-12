import { Button } from "@/components/ui/button";
import { ChevronDown, Download, ArrowRight, Gamepad2, Sparkles } from "lucide-react";
import Navigation from "./Navigation";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useEffect, useState, useRef } from "react";

const vardaanHero = "/lovable-uploads/56e098bc-8089-4283-a76a-66802b121efe.png";

const Hero = () => {
  const [heroRef, isHeroVisible] = useScrollAnimation();
  const [contentRef, isContentVisible] = useScrollAnimation({ threshold: 0.2 });
  const [imageRef, isImageVisible] = useScrollAnimation({ threshold: 0.3 });
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const photoWrapperRef = useRef<HTMLDivElement>(null);
  const [photoTilt, setPhotoTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handlePhotoMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = photoWrapperRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = (e.clientX - rect.left) / rect.width;
    const cy = (e.clientY - rect.top) / rect.height;
    setPhotoTilt({ x: (cx - 0.5) * 14, y: (cy - 0.5) * -14 });
  };
  const handlePhotoLeave = () => setPhotoTilt({ x: 0, y: 0 });

  const scrollToExperience = () => {
    document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={heroRef}
      className={`min-h-screen flex items-center justify-center bg-background relative overflow-hidden pt-16 transition-opacity duration-700 ${
        isHeroVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <Navigation />

      {/* Aurora — animated gradient blobs (behind everything) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full opacity-40 blur-3xl animate-aurora-1"
          style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.5), transparent 65%)" }}
        />
        <div
          className="absolute top-1/3 -right-32 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl animate-aurora-2"
          style={{ background: "radial-gradient(circle, #a855f7 0%, transparent 65%)" }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-[480px] h-[480px] rounded-full opacity-25 blur-3xl animate-aurora-3"
          style={{ background: "radial-gradient(circle, #06b6d4 0%, transparent 65%)" }}
        />
      </div>

      {/* Cursor-following spotlight */}
      <div
        className="absolute inset-0 opacity-40 transition-all duration-700 ease-out pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, hsl(var(--primary) / 0.12), transparent 60%)`,
        }}
      />

      {/* Dot grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,.04)_1px,transparent_1px)] bg-[size:32px_32px] dark:bg-[radial-gradient(circle,rgba(255,255,255,.03)_1px,transparent_1px)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div
            ref={contentRef}
            className={`text-center lg:text-left space-y-8 transition-all duration-700 ${
              isContentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="space-y-5">
              {/* Status pills */}
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-border rounded-full text-sm text-muted-foreground bg-background/60 backdrop-blur-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  SWE Intern @ APi Group
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-primary/40 rounded-full text-sm text-primary bg-primary/5 backdrop-blur-sm shadow-sm shadow-primary/10">
                  <Sparkles className="w-3.5 h-3.5" />
                  Looking for Winter 2027 internships
                </div>
              </div>

              {/* Name — with subtle gradient */}
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight tracking-tight">
                <span className="bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
                  Vardaan Mehandiratta
                </span>
              </h1>

              {/* Tagline */}
              <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed">
                Computer Engineering @ Waterloo.{" "}
                <span className="text-foreground">
                  I build full-stack products that solve real problems
                </span>{" "}
                with AI, cloud infrastructure, and clean code.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-200 hover:-translate-y-0.5"
                onClick={scrollToExperience}
              >
                See my work
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <a
                href="Vardaan_Resume.pdf"
                download
                className="inline-flex items-center justify-center px-5 py-2.5 border border-border rounded-lg text-foreground hover:bg-accent hover:border-primary/30 transition-all duration-200 text-sm font-medium hover:-translate-y-0.5"
              >
                <Download className="mr-2 h-4 w-4" />
                Resume
              </a>
              <Link
                to="/explore"
                className="inline-flex items-center justify-center px-5 py-2.5 border border-primary/40 bg-primary/5 rounded-lg text-primary hover:bg-primary/10 transition-all duration-200 text-sm font-medium hover:-translate-y-0.5"
              >
                <Gamepad2 className="mr-2 h-4 w-4" />
                See my portfolio the fun way
              </Link>
            </div>
          </div>

          {/* Photo with 3D tilt */}
          <div
            ref={imageRef}
            className={`relative flex justify-center transition-all duration-700 ${
              isImageVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
            style={{ perspective: "1200px" }}
          >
            <div
              ref={photoWrapperRef}
              onMouseMove={handlePhotoMove}
              onMouseLeave={handlePhotoLeave}
              className="relative max-w-sm w-full group transition-transform duration-300 ease-out"
              style={{
                transform: `rotateY(${photoTilt.x}deg) rotateX(${photoTilt.y}deg)`,
                transformStyle: "preserve-3d",
              }}
            >
              {/* Glow behind image */}
              <div className="absolute -inset-6 bg-gradient-to-br from-primary/30 via-fuchsia-500/20 to-cyan-500/20 rounded-3xl blur-3xl opacity-40 group-hover:opacity-70 transition-opacity duration-500" />
              <div className="relative overflow-hidden rounded-2xl border border-border shadow-2xl shadow-black/10 group-hover:border-primary/40 transition-all duration-300">
                <img
                  src={vardaanHero}
                  alt="Vardaan Mehandiratta"
                  className="w-full h-auto aspect-square object-cover"
                  style={{ transform: "translateZ(20px)" }}
                />
                {/* Shine sweep on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <ChevronDown className="w-5 h-5 text-muted-foreground/40 animate-bounce" />
      </div>
    </section>
  );
};

export default Hero;
