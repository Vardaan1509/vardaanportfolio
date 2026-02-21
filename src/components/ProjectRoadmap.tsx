import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Bot, Database, QrCode, Chrome, Activity, Globe, ArrowRight, Rocket } from "lucide-react";
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

const phaseColors: Record<string, string> = {
  Ideation: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  Foundations: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  "Building Tools": "bg-amber-500/15 text-amber-400 border-amber-500/30",
  "Hardware + Software": "bg-rose-500/15 text-rose-400 border-rose-500/30",
  "Modern Web": "bg-violet-500/15 text-violet-400 border-violet-500/30",
  Hackathons: "bg-orange-500/15 text-orange-400 border-orange-500/30",
};

const dotColors: Record<string, string> = {
  Ideation: "bg-blue-400 shadow-blue-400/50",
  Foundations: "bg-emerald-400 shadow-emerald-400/50",
  "Building Tools": "bg-amber-400 shadow-amber-400/50",
  "Hardware + Software": "bg-rose-400 shadow-rose-400/50",
  "Modern Web": "bg-violet-400 shadow-violet-400/50",
  Hackathons: "bg-orange-400 shadow-orange-400/50",
};

const ProjectRoadmap = () => {
  const [sectionRef, isSectionVisible] = useScrollAnimation();
  const [titleRef, isTitleVisible] = useScrollAnimation({ threshold: 0.3 });

  return (
    <section
      id="roadmap"
      ref={sectionRef}
      className={`py-20 bg-muted/30 transition-opacity duration-700 ${
        isSectionVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="container mx-auto px-6">
        <div
          ref={titleRef}
          className={`text-center mb-20 transition-all duration-700 delay-100 ${
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
          {/* Vertical timeline line - dashed with gradient */}
          <div className="absolute left-[23px] md:left-1/2 top-0 bottom-0 md:-translate-x-px">
            <div className="w-px h-full border-l-2 border-dashed border-primary/20" />
          </div>

          {milestones.map((m, i) => (
            <RoadmapItem key={i} milestone={m} index={i} isLeft={i % 2 === 0} />
          ))}

          {/* Terminal node */}
          <div className="flex justify-start md:justify-center mt-4">
            <div className={`ml-[14px] md:ml-0 w-[19px] h-[19px] rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30`}>
              <Rocket className="w-3 h-3 text-primary-foreground" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-3 text-center font-mono tracking-wide">
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
  const dotColor = dotColors[milestone.phase] || "bg-primary shadow-primary/50";
  const phaseColor = phaseColors[milestone.phase] || "";

  return (
    <div
      ref={ref}
      className={`relative flex items-start mb-10 md:mb-16 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Glowing timeline dot */}
      <div className="absolute left-[23px] md:left-1/2 -translate-x-1/2 top-7 z-10">
        <div className={`w-3 h-3 rounded-full ${dotColor} ring-4 ring-background shadow-lg transition-all duration-500 ${isVisible ? 'scale-100' : 'scale-0'}`} />
      </div>

      {/* Connector arm (desktop only) - animated dash */}
      <div
        className={`hidden md:block absolute top-[30px] h-px border-t border-dashed border-primary/30 ${
          isLeft ? "right-1/2 left-auto mr-1 w-10" : "left-1/2 ml-1 w-10"
        }`}
      />

      {/* Card */}
      <div
        className={`ml-14 md:ml-0 md:w-[calc(50%-3.5rem)] ${
          isLeft ? "md:mr-auto" : "md:ml-auto"
        }`}
      >
        <div className="glass rounded-xl p-5 hover-lift group border border-border/50 hover:border-primary/30 transition-colors duration-300">
          {/* Phase badge */}
          <div className={`flex ${isLeft ? "md:justify-end" : "justify-start"} mb-3`}>
            <Badge className={`text-[10px] px-2 py-0.5 border ${phaseColor} font-mono uppercase tracking-wider`}>
              {milestone.phase}
            </Badge>
          </div>

          {/* Header row */}
          <div className={`flex items-center gap-3 mb-3 ${isLeft ? "md:flex-row-reverse md:text-right" : ""}`}>
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
              <Icon className="w-[18px] h-[18px]" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-mono text-muted-foreground/50 tracking-widest">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-sm font-semibold text-foreground leading-tight">{milestone.title}</h3>
            </div>
          </div>

          {/* Tagline */}
          <p className={`text-sm text-muted-foreground mb-4 italic ${isLeft ? "md:text-right" : ""}`}>
            "{milestone.tagline}"
          </p>

          {/* Skills gained */}
          <div className={`flex flex-wrap gap-1.5 ${isLeft ? "md:justify-end" : ""}`}>
            {milestone.skills.map((skill, si) => (
              <span
                key={si}
                className="text-[11px] px-2.5 py-1 rounded-full bg-primary/5 text-primary font-medium border border-primary/10 hover:bg-primary/10 transition-colors duration-200"
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
