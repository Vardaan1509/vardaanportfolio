import { Button } from "@/components/ui/button";
import { Mail, Github, Instagram, MessageCircle, Linkedin } from "lucide-react";

const Contact = () => {
  return (

    <section id="contact" className="py-16 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 font-serif">
            Let's Connect
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I'm always interested in discussing new opportunities, innovative projects, and potential collaborations.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-lg shadow-card border border-border p-8">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-foreground mb-2">Ready to Connect?</h3>
              <p className="text-muted-foreground">
                Feel free to reach out through any of these professional channels:
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 justify-items-center">
              <div className="flex flex-col items-center gap-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="border-primary/20 hover:bg-primary hover:text-primary-foreground w-12 h-12 transition-colors"
                  onClick={() => {
                    const linkedinUrl = 'https://www.linkedin.com/in/vardaan-mehandiratta-446215377/';
                    window.open(linkedinUrl, '_blank');
                  }}
                >
                  <Linkedin className="w-5 h-5" />
                </Button>
                <span className="text-xs text-muted-foreground">LinkedIn</span>
              </div>
              
              <div className="flex flex-col items-center gap-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="border-primary/20 hover:bg-primary hover:text-primary-foreground w-12 h-12 transition-colors"
                  onClick={() => window.open('https://github.com/Vardaan1509', '_blank')}
                >
                  <Github className="w-5 h-5" />
                </Button>
                <span className="text-xs text-muted-foreground">GitHub</span>
              </div>
              
              <div className="flex flex-col items-center gap-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="border-primary/20 hover:bg-primary hover:text-primary-foreground w-12 h-12 transition-colors"
                  onClick={() => window.open('mailto:vardaanmehandiratta926@gmail.com', '_blank')}
                >
                  <Mail className="w-5 h-5" />
                </Button>
                <span className="text-xs text-muted-foreground">Email</span>
              </div>
              
              <div className="flex flex-col items-center gap-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="border-primary/20 hover:bg-primary hover:text-primary-foreground w-12 h-12 transition-colors"
                  onClick={() => window.open('https://instagram.com/verdy1509', '_blank')}
                >
                  <Instagram className="w-5 h-5" />
                </Button>
                <span className="text-xs text-muted-foreground">Instagram</span>
              </div>
              
              <div className="flex flex-col items-center gap-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="border-primary/20 hover:bg-primary hover:text-primary-foreground w-12 h-12 transition-colors"
                  onClick={() => window.open('https://discord.com/users/verdy1509', '_blank')}
                >
                  <MessageCircle className="w-5 h-5" />
                </Button>
                <span className="text-xs text-muted-foreground">Discord</span>
              </div>
            </div>
            
            <div className="text-center mt-8 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground">
                
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
