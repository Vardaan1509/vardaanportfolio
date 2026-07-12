import { Badge } from "@/components/ui/badge";
import { Briefcase, GraduationCap, MapPin, Calendar } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  type: "work" | "education";
  current?: boolean;
  bullets: string[];
  technologies?: string[];
}

const experiences: ExperienceItem[] = [
  {
    role: "Full Stack Developer",
    company: "APi Group (Habtech Division)",
    location: "Mississauga, ON",
    period: "Apr 2026 – Present",
    type: "work",
    current: true,
    bullets: [
      "Built a field reporting platform tracking 1,000+ site assets. Cut manual coordination by 90%.",
      "Architected a payroll system for 500+ employees. Replaced spreadsheet operations.",
      "Built an AI documentation tool with Claude API. Cut docs effort by 75% per release.",
    ],
    technologies: ["Next.js", "C#", ".NET", "AWS", "DynamoDB", "Azure", "Claude API"],
  },
  {
    role: "Software Engineering Intern",
    company: "Bharat Denim",
    location: "Remote",
    period: "May 2025 – Aug 2025",
    type: "work",
    bullets: [
      "Built backend features for an inventory system serving 10,000+ customers.",
      "Refactored MySQL and PostgreSQL schemas. Cut daily processing time by 15%.",
      "Drove Git workflows for a 5-person backend team.",
    ],
    technologies: ["Python", "MySQL", "PostgreSQL", "Git"],
  },
  {
    role: "BASc, Computer Engineering",
    company: "University of Waterloo",
    location: "Waterloo, ON",
    period: "2025 – 2030",
    type: "education",
    bullets: [
      "President's Scholarship of Distinction.",
      "David Johnston International Student Entrance Scholarship.",
      "Coursework: Data Structures, Algorithms, Digital Systems.",
    ],
  },
];

const Experience = () => {
  const [sectionRef, isSectionVisible] = useScrollAnimation();
  const [titleRef, isTitleVisible] = useScrollAnimation({ threshold: 0.3 });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className={`py-24 bg-background relative transition-opacity duration-700 ${
        isSectionVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/3 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 max-w-4xl relative">
        <div
          ref={titleRef}
          className={`mb-16 transition-all duration-700 delay-100 ${
            isTitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
            Experience
          </h2>
          <p className="mt-3 text-muted-foreground text-lg">
            Where I've worked and what I've been building.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-primary/50 via-border to-border" />

          <div className="space-y-10">
            {experiences.map((exp, index) => (
              <TimelineCard key={index} experience={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface TimelineCardProps {
  experience: ExperienceItem;
  index: number;
}

const TimelineCard = ({ experience, index }: TimelineCardProps) => {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.3 });
  const Icon = experience.type === "work" ? Briefcase : GraduationCap;

  return (
    <div
      ref={ref}
      className={`relative pl-12 transition-all duration-600 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className="absolute left-0 top-1 flex items-center justify-center">
        <div
          className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
            experience.current
              ? "bg-primary/20 border-primary shadow-[0_0_12px_rgba(var(--primary-rgb),0.3)]"
              : "bg-primary/10 border-primary/60"
          }`}
        >
          <Icon className="w-4 h-4 text-primary" />
        </div>
      </div>

      <div className="group bg-card border border-border rounded-xl p-5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-0.5">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-lg font-semibold text-foreground">{experience.role}</h3>
              {experience.current && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-medium rounded-full">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  Current
                </span>
              )}
            </div>
            <p className="text-primary font-medium text-sm">{experience.company}</p>
          </div>
          <div className="flex flex-col sm:items-end gap-0.5 text-xs text-muted-foreground shrink-0">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-3 h-3" />
              {experience.period}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-3 h-3" />
              {experience.location}
            </span>
          </div>
        </div>

        <ul className="space-y-1.5 mb-3">
          {experience.bullets.map((bullet, i) => (
            <li key={i} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
              <span className="text-primary/70 mt-1 shrink-0">▸</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        {experience.technologies && (
          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/50">
            {experience.technologies.map((tech, i) => (
              <Badge
                key={i}
                variant="secondary"
                className="text-[10px] font-medium hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
              >
                {tech}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Experience;
