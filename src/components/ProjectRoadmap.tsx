import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Bot, Database, QrCode, Chrome, Activity, Globe } from "lucide-react";

const milestones = [
  {
    icon: Bot,
    title: "Medical AI Chatbot Concept",
    learned: "System design thinking, healthcare AI architecture, scalable deployment planning",
    tagline: "Where it all started — designing AI for impact",
  },
  {
    icon: Database,
    title: "Shoe Management System",
    learned: "Python fundamentals, SQL databases, CRUD operations, file handling",
    tagline: "First real build — learning to manage data",
  },
  {
    icon: QrCode,
    title: "QR Code Generator App",
    learned: "Desktop GUI development, Python libraries, UI/UX design principles",
    tagline: "Exploring desktop apps and user interfaces",
  },
  {
    icon: Chrome,
    title: "UW Login Helper",
    learned: "Browser extension APIs, Chrome development, local storage security",
    tagline: "Solving a real daily problem with code",
  },
  {
    icon: Activity,
    title: "Hospital-Induced Delirium System",
    learned: "Arduino & hardware integration, sensor data, full-stack with real users",
    tagline: "Bridging hardware and software for healthcare",
  },
  {
    icon: Globe,
    title: "AI Netflix Recommendation Engine",
    learned: "React & TypeScript, AI prompt engineering, Supabase backend",
    tagline: "Diving into modern web dev and AI APIs",
  },
  {
    icon: Bot,
    title: "AInterview (McHacks 13)",
    learned: "Real-time voice AI, ElevenLabs & Gemini APIs, hackathon-speed delivery",
    tagline: "Shipping a polished product under pressure",
  },
  {
    icon: Activity,
    title: "CXR Triage (CXC AI Hackathon)",
    learned: "PyTorch & ResNet50, medical imaging, FastAPI, production-grade AI systems",
    tagline: "Building clinical-grade AI with real-world stakes",
  },
];

const ProjectRoadmap = () => {
  const [sectionRef, isSectionVisible] = useScrollAnimation();
  const [titleRef, isTitleVisible] = useScrollAnimation({ threshold: 0.3 });

  return (
    <section
      id="roadmap"
      ref={sectionRef}
      className={`py-16 transition-opacity duration-700 ${
        isSectionVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="container mx-auto px-6">
        <div
          ref={titleRef}
          className={`text-center mb-14 transition-all duration-700 delay-100 ${
            isTitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 font-serif">
            My Project Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A roadmap of how each project built on the last — and what I took away from each one
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          {milestones.map((m, i) => {
            const Icon = m.icon;
            const isLeft = i % 2 === 0;

            return (
              <RoadmapItem
                key={i}
                index={i}
                icon={<Icon className="w-4 h-4" />}
                title={m.title}
                tagline={m.tagline}
                learned={m.learned}
                isLeft={isLeft}
              />
            );
          })}

          {/* End dot */}
          <div className="absolute left-6 md:left-1/2 bottom-0 w-3 h-3 rounded-full bg-primary -translate-x-1/2 translate-y-1/2 md:-translate-x-1/2" />
        </div>
      </div>
    </section>
  );
};

interface RoadmapItemProps {
  index: number;
  icon: React.ReactNode;
  title: string;
  tagline: string;
  learned: string;
  isLeft: boolean;
}

const RoadmapItem = ({ index, icon, title, tagline, learned, isLeft }: RoadmapItemProps) => {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.3 });

  return (
    <div
      ref={ref}
      className={`relative flex items-start mb-10 md:mb-12 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Dot on the line */}
      <div className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full bg-primary border-2 border-background -translate-x-1/2 top-5 z-10" />

      {/* Content card — mobile always right, desktop alternates */}
      <div
        className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${
          isLeft ? "md:mr-auto md:pr-0 md:text-right" : "md:ml-auto md:pl-0"
        }`}
      >
        <div className="glass rounded-xl p-5 hover-lift">
          <div className={`flex items-center gap-2 mb-2 ${isLeft ? "md:justify-end" : ""}`}>
            <span className="text-xs font-mono text-muted-foreground">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              {icon}
            </span>
          </div>

          <h3 className="text-base font-semibold text-foreground mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground italic mb-3">{tagline}</p>

          <div
            className={`flex items-start gap-2 text-xs text-muted-foreground ${
              isLeft ? "md:justify-end" : ""
            }`}
          >
            <span className="font-medium text-primary shrink-0">Learned:</span>
            <span>{learned}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectRoadmap;
