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
      "Built a field reporting platform with floor-plan mapping and technician dispatch workflows using Next.js, C#, .NET, AWS, and DynamoDB, streamlining inspections across 1,000+ site assets and cutting manual coordination by 90%.",
      "Architected a company-wide payroll and timesheet system with multi-stage approval workflows, Azure authentication, and batch processing, replacing spreadsheet-based operations for 500+ employees.",
      "Built an AI documentation automation tool using web scraping, automated screenshot generation, and Claude API, reducing manual documentation effort by 75% after product releases.",
    ],
    technologies: ["Next.js", "C#", ".NET", "AWS", "DynamoDB", "Azure", "Claude API"],
  },
  {
    role: "Software Engineering Intern",
    company: "Bharat Denim",
    location: "Remote, Canada",
    period: "May 2025 – Aug 2025",
    type: "work",
    bullets: [
      "Built backend features for an inventory management system serving 10,000+ customers, optimizing SQL queries and resolving data-flow issues to improve reliability across inventory and order workflows.",
      "Refactored MySQL and PostgreSQL schemas for inventory, orders, and product data by normalizing tables, adding indexes, and tightening constraints, contributing to a 15% reduction in daily processing time.",
      "Drove Git workflows on a backend team of 5, including branching strategy, PR reviews, and merge conflict resolution, improving code quality and reducing integration issues.",
    ],
    technologies: ["Python", "MySQL", "PostgreSQL", "Git"],
  },
  {
    role: "Bachelor of Applied Science, Computer Engineering",
    company: "University of Waterloo",
    location: "Waterloo, ON",
    period: "2025 – 2030",
    type: "education",
    bullets: [
      "President's Scholarship of Distinction recipient.",
      "David Johnston International Student Entrance Scholarship recipient.",
      "Relevant coursework: Data Structures, Algorithms, Digital Systems, Linear Algebra.",
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
      {/* Subtle background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/3 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 max-w-4xl relative">
        {/* Section Header */}
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

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-primary/50 via-border to-border" />

          <div className="space-y-12">
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
      {/* Timeline dot */}
      <div className="absolute left-0 top-1 flex items-center justify-center">
        <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
          experience.current 
            ? "bg-primary/20 border-primary shadow-[0_0_12px_rgba(var(--primary-rgb),0.3)]" 
            : "bg-primary/10 border-primary/60"
        }`}>
          <Icon className="w-4 h-4 text-primary" />
        </div>
      </div>

      {/* Content */}
      <div className="group bg-card border border-border rounded-xl p-6 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-0.5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-foreground">{experience.role}</h3>
              {experience.current && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-medium rounded-full">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  Current
                </span>
              )}
            </div>
            <p className="text-primary font-medium">{experience.company}</p>
          </div>
          <div className="flex flex-col sm:items-end gap-1 text-sm text-muted-foreground shrink-0">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {experience.period}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              {experience.location}
            </span>
          </div>
        </div>

        {/* Bullets */}
        <ul className="space-y-2.5 mb-4">
          {experience.bullets.map((bullet, i) => (
            <li key={i} className="text-sm text-muted-foreground leading-relaxed flex gap-2.5">
              <span className="text-primary/70 mt-1 shrink-0">▸</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        {/* Technologies */}
        {experience.technologies && (
          <div className="flex flex-wrap gap-2 pt-3 border-t border-border/50">
            {experience.technologies.map((tech, i) => (
              <Badge
                key={i}
                variant="secondary"
                className="text-xs font-medium hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
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
