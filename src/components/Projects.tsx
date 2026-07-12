import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import { useRef, useState } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

interface Project {
  title: string;
  event?: string;
  description: string;
  technologies: string[];
  image?: string;
  github?: string;
  link?: string;
}

const projects: Project[] = [
  {
    title: "AInterview",
    event: "McHacks 13",
    description: "Real-time AI interview simulator with live performance analytics.",
    technologies: ["React", "TypeScript", "Gemini API", "ElevenLabs", "Supabase"],
    image: "/lovable-uploads/ainterview.png",
  },
  {
    title: "CXR-Triage",
    event: "CXC AI Hackathon",
    description: "AI chest X-ray triage that flags critical cases for radiologists.",
    technologies: ["Next.js", "TypeScript", "PyTorch", "Supabase"],
    image: "/lovable-uploads/cxr-triage.png",
  },
  {
    title: "AI Netflix Engine",
    description: "Mood-based recommendations powered by conversational AI.",
    technologies: ["React", "TypeScript", "Tailwind", "Supabase"],
    image: "/lovable-uploads/netflix-recommendation.png",
  },
];

const Projects = () => {
  const [sectionRef, isSectionVisible] = useScrollAnimation();
  const [titleRef, isTitleVisible] = useScrollAnimation({ threshold: 0.3 });
  const [gridRef, isGridVisible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={`py-24 bg-muted/30 relative overflow-hidden transition-opacity duration-700 ${
        isSectionVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Ambient background accents */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[420px] h-[420px] bg-fuchsia-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative">
        <div
          ref={titleRef}
          className={`mb-14 transition-all duration-700 delay-100 ${
            isTitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
            Projects
          </h2>
          <p className="mt-3 text-muted-foreground text-lg">
            A few things I've built recently.
          </p>
        </div>

        <div
          ref={gridRef}
          className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700 delay-200 ${
            isGridVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.2 });
  const tiltRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, mx: 50, my: 50 });
  const [hovering, setHovering] = useState(false);

  const MAX_TILT = 16;

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = tiltRef.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    setTilt({
      ry: (nx - 0.5) * MAX_TILT * 2, // left/right
      rx: (ny - 0.5) * -MAX_TILT * 2, // up/down
      mx: nx * 100,
      my: ny * 100,
    });
  };

  const handleEnter = () => setHovering(true);
  const handleLeave = () => {
    setHovering(false);
    setTilt({ rx: 0, ry: 0, mx: 50, my: 50 });
  };

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 120}ms`, perspective: "1000px" }}
    >
      <div
        ref={tiltRef}
        onMouseMove={handleMove}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className="group relative bg-card border border-border rounded-2xl overflow-hidden flex flex-col h-full"
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${hovering ? 1.04 : 1})`,
          transformStyle: "preserve-3d",
          transition: hovering
            ? "transform 80ms ease-out, box-shadow 300ms ease"
            : "transform 500ms cubic-bezier(0.22,1,0.36,1), box-shadow 300ms ease",
          boxShadow: hovering
            ? "0 30px 60px -20px hsl(var(--primary) / 0.35), 0 0 0 1px hsl(var(--primary) / 0.25)"
            : "0 8px 24px -12px rgba(0,0,0,0.15)",
        }}
      >
        {/* Cursor spotlight */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
          style={{
            background: `radial-gradient(500px circle at ${tilt.mx}% ${tilt.my}%, rgba(255,255,255,0.12), transparent 45%)`,
          }}
        />
        {/* Glossy glare sweep that shifts against the tilt */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 mix-blend-overlay"
          style={{
            background: `linear-gradient(${105 + tilt.ry * 2}deg, transparent 30%, rgba(255,255,255,0.35) ${
              48 + (tilt.mx - 50) * 0.3
            }%, transparent 62%)`,
          }}
        />

        {/* Image — lifted highest for parallax depth */}
        <div
          className="relative overflow-hidden h-52"
          style={{ transform: "translateZ(60px)", transformStyle: "preserve-3d" }}
        >
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/10 via-primary/5 to-fuchsia-500/10 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,.03)_1px,transparent_1px)] bg-[size:16px_16px]" />
              <span className="text-3xl font-bold text-primary/25">{project.title.charAt(0)}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {project.event && (
            <div
              className="absolute top-3 left-3"
              style={{ transform: "translateZ(30px)" }}
            >
              <span className="px-2.5 py-1 bg-black/70 backdrop-blur-sm text-white text-xs font-medium rounded-md">
                {project.event}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div
          className="p-5 flex flex-col flex-1 relative"
          style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}
        >
          <h3
            className="text-lg font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors"
            style={{ transform: "translateZ(20px)" }}
          >
            {project.title}
          </h3>

          <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
            {project.description}
          </p>

          <div
            className="flex flex-wrap gap-1.5 pt-3 border-t border-border/50 mt-auto"
            style={{ transform: "translateZ(15px)" }}
          >
            {project.technologies.map((tech, i) => (
              <Badge key={i} variant="secondary" className="text-xs font-medium">
                {tech}
              </Badge>
            ))}
          </div>

          {(project.link || project.github) && (
            <div className="flex gap-3 mt-3 pt-3 border-t border-border/50">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  <Github className="w-3.5 h-3.5" /> Code
                </a>
              )}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Live
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
