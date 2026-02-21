import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Bot, Database, QrCode, Chrome, Activity, Globe, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const milestones = [
  {
    icon: Bot,
    title: "Medical AI Chatbot Concept",
    skills: ["System Design", "Healthcare AI", "Architecture"],
    tagline: "Where it all started — designing AI for impact",
    phase: "Ideation",
  },
  {
    icon: Database,
    title: "Shoe Management System",
    skills: ["Python", "SQL", "CRUD", "File I/O"],
    tagline: "First real build — learning to manage data",
    phase: "Foundations",
  },
  {
    icon: QrCode,
    title: "QR Code Generator App",
    skills: ["Desktop GUI", "CustomTkinter", "Libraries"],
    tagline: "Exploring desktop apps and user interfaces",
    phase: "Foundations",
  },
  {
    icon: Chrome,
    title: "UW Login Helper",
    skills: ["Chrome APIs", "JavaScript", "Local Storage"],
    tagline: "Solving a real daily problem with code",
    phase: "Building Tools",
  },
  {
    icon: Activity,
    title: "Hospital-Induced Delirium System",
    skills: ["Arduino", "Sensors", "Full-Stack", "C++"],
    tagline: "Bridging hardware and software for healthcare",
    phase: "Hardware + Software",
  },
  {
    icon: Globe,
    title: "AI Netflix Recommendation Engine",
    skills: ["React", "TypeScript", "Prompt Engineering", "Supabase"],
    tagline: "Diving into modern web dev and AI APIs",
    phase: "Modern Web",
  },
  {
    icon: Bot,
    title: "AInterview (McHacks 13)",
    skills: ["Voice AI", "ElevenLabs", "Gemini API", "Real-time"],
    tagline: "Shipping a polished product under pressure",
    phase: "Hackathons",
  },
  {
    icon: Activity,
    title: "CXR Triage (CXC AI Hackathon)",
    skills: ["PyTorch", "ResNet50", "FastAPI", "Medical Imaging"],
    tagline: "Building clinical-grade AI with real-world stakes",
    phase: "Hackathons",
  },
];

const ProjectRoadmap = () => {
  const [sectionRef, isSectionVisible] = useScrollAnimation();
  const [titleRef, isTitleVisible] = useScrollAnimation({ threshold: 0.3 });

  return (
    <section
      id="roadmap"
      ref={sectionRef}
      className={`py-16 bg-muted/30 transition-opacity duration-700 ${
        isSectionVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="container mx-auto px-6">
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 delay-100 ${
            isTitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 font-serif">
            My Project Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            How each project built on the last — from first concepts to production-grade AI
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical timeline line */}
          <div className="absolute left-[23px] md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          {milestones.map((m, i) => (
            <RoadmapItem key={i} milestone={m} index={i} isLeft={i % 2 === 0} />
          ))}

          {/* Terminal arrow */}
          <div className="flex justify-start md:justify-center mt-2">
            <div className="ml-[15px] md:ml-0 w-[17px] h-[17px] rounded-full bg-primary flex items-center justify-center">
              <ArrowRight className="w-3 h-3 text-primary-foreground" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3 text-center font-mono tracking-wide">
            More coming soon...
          </p>
        </div>
      </div>
    </section>
  );
};

interface RoadmapItemProps {
  milestone: (typeof milestones)[number];
  index: number;
  isLeft: boolean;
}

const RoadmapItem = ({ milestone, index, isLeft }: RoadmapItemProps) => {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.3 });
  const Icon = milestone.icon;

  return (
    <div
      ref={ref}
      className={`relative flex items-start mb-8 md:mb-14 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      {/* Timeline dot */}
      <div className="absolute left-[23px] md:left-1/2 -translate-x-1/2 top-6 z-10">
        <div className="w-[11px] h-[11px] rounded-full bg-primary ring-4 ring-background" />
      </div>

      {/* Connector arm (desktop only) */}
      <div
        className={`hidden md:block absolute top-[26px] w-8 h-px bg-border ${
          isLeft ? "left-[calc(50%+5px)]" : "right-[calc(50%+5px)]"
        }`}
        style={{ transform: isLeft ? "rotate(180deg)" : "none" }}
      />

      {/* Card */}
      <div
        className={`ml-14 md:ml-0 md:w-[calc(50%-3rem)] ${
          isLeft ? "md:mr-auto" : "md:ml-auto"
        }`}
      >
        <div className="glass rounded-xl p-5 hover-lift group">
          {/* Header row */}
          <div className={`flex items-center gap-3 mb-3 ${isLeft ? "md:flex-row-reverse md:text-right" : ""}`}>
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary/20 transition-colors">
              <Icon className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-widest">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                  {milestone.phase}
                </Badge>
              </div>
              <h3 className="text-sm font-semibold text-foreground leading-tight">{milestone.title}</h3>
            </div>
          </div>

          {/* Tagline */}
          <p className={`text-sm text-muted-foreground mb-3 ${isLeft ? "md:text-right" : ""}`}>
            {milestone.tagline}
          </p>

          {/* Skills gained */}
          <div className={`flex flex-wrap gap-1.5 ${isLeft ? "md:justify-end" : ""}`}>
            {milestone.skills.map((skill, si) => (
              <span
                key={si}
                className="text-[11px] px-2 py-0.5 rounded-full bg-primary/5 text-primary font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectRoadmap;
