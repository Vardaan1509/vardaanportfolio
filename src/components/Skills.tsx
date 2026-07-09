import { Code, Layers, Wrench, Package } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useState } from "react";

interface SkillCategory {
  icon: typeof Code;
  title: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    icon: Code,
    title: "Languages",
    skills: ["JavaScript", "TypeScript", "Python", "C#", "Go", "C++", "C", "SQL"],
  },
  {
    icon: Layers,
    title: "Frameworks",
    skills: ["React", "Next.js", "Node.js", "Express.js", ".NET", "FastAPI", "Tailwind CSS"],
  },
  {
    icon: Wrench,
    title: "DevOps & Tools",
    skills: ["AWS", "Azure", "Docker", "Git", "CI/CD", "MongoDB", "Supabase", "Vercel", "DigitalOcean", "Jest", "Postman"],
  },
  {
    icon: Package,
    title: "Libraries",
    skills: ["PyTorch", "pandas", "NumPy", "ElevenLabs API", "Gemini API", "Claude API"],
  },
];

const Skills = () => {
  const [sectionRef, isSectionVisible] = useScrollAnimation();
  const [titleRef, isTitleVisible] = useScrollAnimation({ threshold: 0.3 });
  const [gridRef, isGridVisible] = useScrollAnimation({ threshold: 0.2 });

  return (
    <section
      id="skills"
      ref={sectionRef}
      className={`py-24 bg-background relative transition-opacity duration-700 ${
        isSectionVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Background accent */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/3 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="container mx-auto px-6 max-w-5xl relative">
        {/* Header */}
        <div
          ref={titleRef}
          className={`mb-14 transition-all duration-700 delay-100 ${
            isTitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
            Technical Skills
          </h2>
          <p className="mt-3 text-muted-foreground text-lg">
            Technologies I use to build things.
          </p>
        </div>

        {/* Skill Grid */}
        <div
          ref={gridRef}
          className={`grid md:grid-cols-2 gap-6 transition-all duration-700 delay-200 ${
            isGridVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {skillCategories.map((category, i) => (
            <SkillCard key={i} category={category} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface SkillCardProps {
  category: SkillCategory;
  index: number;
}

const SkillCard = ({ category, index }: SkillCardProps) => {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.2 });
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const Icon = category.icon;

  return (
    <div
      ref={ref}
      className={`group bg-card border border-border rounded-xl p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-0.5 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <Icon className="w-4 h-4 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">{category.title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill, j) => (
          <span
            key={j}
            onMouseEnter={() => setHoveredSkill(skill)}
            onMouseLeave={() => setHoveredSkill(null)}
            className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-all duration-200 cursor-default ${
              hoveredSkill === skill
                ? "bg-primary text-primary-foreground scale-105 shadow-md"
                : "bg-secondary text-secondary-foreground hover:bg-primary/10 hover:text-primary"
            }`}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Skills;
