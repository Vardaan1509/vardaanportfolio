import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Trophy, Heart } from "lucide-react";
const About = () => {
  return <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            About Me
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A journey of academic excellence, leadership, and technological passion
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <p className="text-lg text-foreground leading-relaxed">As an incoming Computer Engineering student at the University of Waterloo (Class of 2030), I bring a strong academic foundation from Springdales School, New Delhi, where I graduated in the year 2025.</p>
            
            <p className="text-lg text-foreground leading-relaxed">
              My journey is driven by an insatiable curiosity for technology, particularly 
              in computer hardware and software development. Beyond academics, I'm passionate 
              about leadership, physics, coding, gaming, and singing.
            </p>
            
            <p className="text-lg text-foreground leading-relaxed">
              My ultimate aspiration is to become a software engineer who creates meaningful 
              solutions that bridge the gap between complex technology and real-world applications.
            </p>
          </div>
          
          <div className="relative">
            <img src="/lovable-uploads/aafe5eb9-c7a7-4c06-884b-08a58baafbe9.png" alt="Modern University Building" className="w-full rounded-2xl shadow-card" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
          </div>
        </div>

        {/* Academic Achievements */}
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-gradient-card shadow-card border-0 hover:shadow-elegant transition-all duration-300">
            <CardContent className="p-8 text-center">
              <GraduationCap className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Academic Excellence</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>Grade 10: <span className="font-bold text-primary">95%</span></p>
                <p>Grade 12: <span className="font-bold text-primary">97%</span></p>
                <p>IELTS: <span className="font-bold text-primary">Band 8</span></p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card shadow-card border-0 hover:shadow-elegant transition-all duration-300">
            <CardContent className="p-8 text-center">
              <Trophy className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Leadership & Awards</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>School Prefect (Grade 12)</p>
                <p>Head of Physics Department</p>
                <p>Major Pankaj Batra Trophy Winner</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card shadow-card border-0 hover:shadow-elegant transition-all duration-300">
            <CardContent className="p-8 text-center">
              <Heart className="w-12 h-12 text-destructive mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Passions & Interests</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>Software Development</p>
                <p>Gaming & Technology</p>
                <p>Singing & Physics</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>;
};
export default About;