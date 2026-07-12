import { Mail, Github, Linkedin, Instagram, MessageCircle } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const links = [
  {
    label: "LinkedIn",
    icon: Linkedin,
    href: "https://www.linkedin.com/in/vardaan-mehandiratta-446215377/",
    color: "hover:border-blue-500/40 hover:text-blue-500 hover:shadow-blue-500/10",
  },
  {
    label: "GitHub",
    icon: Github,
    href: "https://github.com/Vardaan1509",
    color: "hover:border-foreground/40 hover:shadow-foreground/5",
  },
  {
    label: "Email",
    icon: Mail,
    href: "mailto:vmehandi@uwaterloo.ca",
    color: "hover:border-red-500/40 hover:text-red-500 hover:shadow-red-500/10",
  },
  {
    label: "Instagram",
    icon: Instagram,
    href: "https://instagram.com/verdy1509",
    color: "hover:border-pink-500/40 hover:text-pink-500 hover:shadow-pink-500/10",
  },
  {
    label: "Discord",
    icon: MessageCircle,
    href: "https://discord.com/users/verdy1509",
    color: "hover:border-indigo-500/40 hover:text-indigo-500 hover:shadow-indigo-500/10",
  },
];

const Contact = () => {
  const [sectionRef, isSectionVisible] = useScrollAnimation();
  const [contentRef, isContentVisible] = useScrollAnimation({ threshold: 0.3 });

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`py-24 bg-muted/30 relative overflow-hidden transition-opacity duration-700 ${
        isSectionVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/3 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 max-w-2xl text-center relative">
        <div
          ref={contentRef}
          className={`transition-all duration-700 ${
            isContentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground tracking-tight mb-4">
            Let's connect.
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-md mx-auto">
            Always open to new opportunities, collaborations, or just talking about interesting problems.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {links.map((link, i) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center gap-2.5 px-5 py-3 bg-card border border-border rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${link.color}`}
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <Icon className="w-4.5 h-4.5 text-muted-foreground group-hover:scale-110 transition-all duration-200" />
                  <span className="text-sm font-medium text-foreground">{link.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
