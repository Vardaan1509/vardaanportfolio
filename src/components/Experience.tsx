import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Trophy, 
  Users, 
  Mic, 
  Award, 
  Presentation, 
  TrendingUp, 
  Heart,
  Film,
  Star,
  Code,
  GraduationCap
} from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      icon: Code,
      title: "Software Intern",
      period: "Jul 2025",
      description: "Contributed to development and enhancement of inventory management software using Python and SQL. Assisted in design, implementation, and optimization to streamline inventory workflows. Collaborated with the technical team, improving system efficiency and data accuracy.",
      type: "Professional Experience",
      company: "Bharat Denim, Ahmedabad, Gujarat, India"
    },
    {
      icon: GraduationCap,
      title: "David Johnston International Student Entrance Scholarship",
      period: "2025",
      description: "Received prestigious entrance scholarship from University of Waterloo recognizing academic excellence and international student achievement.",
      type: "Scholarship"
    },
    {
      icon: Award,
      title: "President's Scholarship of Distinction",
      period: "2025",
      description: "Awarded University of Waterloo's President's Scholarship of Distinction for outstanding academic performance and leadership potential.",
      type: "Scholarship"
    },
    {
      icon: Users,
      title: "School Prefect",
      period: "Grade 12",
      description: "Led student body initiatives and represented student interests in administrative decisions.",
      type: "Leadership"
    },
    {
      icon: Star,
      title: "Head of Physics Department",
      period: "Teacher's Day",
      description: "Organized and led physics department activities, demonstrating subject mastery and leadership.",
      type: "Academic Leadership"
    },
    {
      icon: Mic,
      title: "Lead Singer, School Choir",
      period: "Multiple Years",
      description: "Performed in multiple zonal competitions, leading the school choir to various achievements.",
      type: "Arts & Performance"
    },
    {
      icon: Trophy,
      title: "Major Pankaj Batra Memorial Trophy",
      period: "2024",
      description: "Winner of prestigious award recognizing bravery, courage, and discipline.",
      type: "Award"
    },
    {
      icon: Presentation,
      title: "School Presentation Team",
      period: "Multiple Years",
      description: "First position winner in multimedia and science investigatory competitions across various years.",
      type: "Academic Excellence"
    },
    {
      icon: TrendingUp,
      title: "National Entrepreneurship Competition",
      period: "2024",
      description: "Achieved top 1,000 placement in national-level entrepreneurship competition.",
      type: "Innovation"
    },
    {
      icon: Heart,
      title: "Community Service",
      period: "Ongoing",
      description: "Regular volunteer work at local temples, contributing to community welfare initiatives.",
      type: "Service"
    },
    {
      icon: Film,
      title: "Movie Making Competition",
      period: "2024",
      description: "Winner of school movie making competition, showcasing creativity and technical skills.",
      type: "Creative"
    },
    {
      icon: Award,
      title: "National Education Event",
      period: "2024",
      description: "Attended prestigious national education event with Hon. Prime Minister Narendra Modi.",
      type: "Recognition"
    }
  ];

  const getTypeColor = (type: string) => {
    const colors = {
      "Professional Experience": "bg-primary/10 text-primary",
      "Scholarship": "bg-accent/10 text-accent",
      "Leadership": "bg-primary/10 text-primary",
      "Academic Leadership": "bg-accent/10 text-accent",
      "Arts & Performance": "bg-pink-100 text-pink-700",
      "Award": "bg-yellow-100 text-yellow-700",
      "Academic Excellence": "bg-green-100 text-green-700",
      "Innovation": "bg-purple-100 text-purple-700",
      "Service": "bg-red-100 text-red-700",
      "Creative": "bg-orange-100 text-orange-700",
      "Recognition": "bg-blue-100 text-blue-700"
    };
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-700";
  };

  return (
    <section id="experience" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Experience & Achievements
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A track record of leadership, academic excellence, and community involvement
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((experience, index) => {
            const IconComponent = experience.icon;
            return (
              <Card key={index} className="bg-card shadow-card border-0 hover:shadow-elegant transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-foreground line-clamp-1">
                          {experience.title}
                        </h3>
                      </div>
                      <Badge className={`mb-3 text-xs ${getTypeColor(experience.type)}`}>
                        {experience.type}
                      </Badge>
                      <p className="text-sm text-muted-foreground mb-2">
                        {experience.period}
                      </p>
                      {experience.company && (
                        <p className="text-xs text-muted-foreground mb-2 font-medium">
                          {experience.company}
                        </p>
                      )}
                      <p className="text-sm text-foreground leading-relaxed">
                        {experience.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;