import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import { useState } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

interface Project {
  title: string;
  event?: string;
  description: string;
  highlights: string[];
  technologies: string[];
  image?: string;
  github?: string;
  link?: string;
}

const projects: Project[] = [
  {
    title: "CXR-Triage",
    event: "CXC AI Hackathon",
    description:
      "Full-stack medical triage system that prioritizes critical cases for radiologists using AI-powered chest X-ray classification.",
    highlights: [
      "Integrated a Python inference engine with a Next.js frontend in a 36-hour sprint",
      "Trained a custom CNN with PyTorch achieving 80% classification accuracy on chest X-ray datasets",
      "Implemented privacy-focused data controls with row-level authorization and append-only audit trails",
    ],
    technologies: ["Next.js", "TypeScript", "Python", "PyTorch", "Supabase"],
    // TODO: Add actual screenshot — place as /lovable-uploads/cxr-triage.png
  },
  {
    title: "AInterview",
    event: "McHacks 13",
    description:
      "High-fidelity interview simulation platform with real-time performance dashboards and AI-driven assessments.",
    highlights: [
      "Real-time dashboard tracking 11+ performance metrics, reducing page load time by 0.8s",
      "Integrated Gemini Pro and ElevenLabs APIs achieving 88% speech-to-text success rate",
      "Built during a 24-hour sprint with full end-to-end functionality",
    ],
    technologies: ["React", "TypeScript", "Gemini API", "ElevenLabs", "Supabase"],
    // TODO: Add actual screenshot — place as /lovable-uploads/ainterview.png
  },
  {
    title: "AI Netflix Recommendation Engine",
    description:
      "Intelligent questionnaire app with AI-driven conversational flow that generates personalized recommendations based on user mood.",
    highlights: [
      "Reduced content search time by 48% through personalized AI recommendations",
      "Context-aware feedback loop to refine results and prevent duplicates",
      "Achieved 92% recommendation accuracy with scalable Supabase backend",
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Supabase"],
    // TODO: Add actual screenshot — place as /lovable-uploads/netflix-recommendation.png
  },
  {
    title: "UW Login Helper",
    description:
      "Chrome extension that automates University of Waterloo portal login. Securely stores credentials locally and auto-fills in one click for daily student productivity.",
    highlights: [
      "Credentials stored locally on device, never sent externally",
      "One-click auto-fill for Waterloo Learn, Quest, and other UW portals",
      "Built for daily use by engineering students",
    ],
    technologies: ["JavaScript", "Chrome APIs", "HTML/CSS"],
    image: "/lovable-uploads/f829901a-efdf-456b-97aa-045a062bbe93.png",
  },
  {
    title: "Hospital-Induced Delirium Prevention",
    description:
      "IoT + full-stack system combining Arduino sensors with a web dashboard to monitor and prevent hospital-induced delirium in patients through real-time environmental tracking.",
    highlights: [
      "Bridged hardware data collection with real-time web alerts",
      "Arduino sensors monitoring light, noise, and movement patterns",
      "Dashboard for healthcare staff to track patient environment status",
    ],
    technologies: ["Arduino", "C++", "Sensors", "Full-Stack"],
  },
];

const Projects = () => {
  const [sectionRef, isSectionVisible] = useScrollAnimation();
  const [titleRef, isTitleVisible] = useScrollAnimation({ threshold: 0.3 });
  const [gridRef, isGridVisible] = useScrollAnimation({ threshold: 0.1 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={`py-24 bg-muted/30 relative overflow-hidden transition-opacity duration-700 ${
        isSectionVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Background accent */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/3 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative">
        {/* Header */}
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
            Some things I've built recently.
          </p>
        </div>

        {/* Project Grid */}
        <div
          ref={gridRef}
          className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 delay-200 ${
            isGridVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              index={index}
              isHovered={hoveredIndex === index}
              onHover={() => setHoveredIndex(index)}
              onLeave={() => setHoveredIndex(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: Project;
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

const ProjectCard = ({ project, index, isHovered, onHover, onLeave }: ProjectCardProps) => {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.2 });
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`group relative bg-card border border-border rounded-xl overflow-hidden flex flex-col transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${isHovered ? "border-primary/40 shadow-xl shadow-primary/5 -translate-y-1" : "hover:border-border/80"}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,.03)_1px,transparent_1px)] bg-[size:16px_16px]" />
            <span className="text-2xl font-bold text-primary/20">{project.title.charAt(0)}</span>
          </div>
        )}
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Event badge */}
        {project.event && (
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 bg-black/70 backdrop-blur-sm text-white text-xs font-medium rounded-md">
              {project.event}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>

        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
          {project.description}
        </p>

        {/* Expandable highlights */}
        <div className="mb-4 flex-1">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-primary font-medium hover:underline mb-2"
          >
            {expanded ? "Show less" : "Key highlights ↓"}
          </button>
          {expanded && (
            <ul className="space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
              {project.highlights.map((h, i) => (
                <li key={i} className="text-xs text-muted-foreground leading-relaxed flex gap-2">
                  <span className="text-primary/70 shrink-0">▸</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border/50 mt-auto">
          {project.technologies.map((tech, i) => (
            <Badge key={i} variant="secondary" className="text-xs font-medium">
              {tech}
            </Badge>
          ))}
        </div>

        {/* Links */}
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
  );
};

export default Projects;
