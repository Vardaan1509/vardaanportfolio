import { Button } from "@/components/ui/button";
import { Mail, Github, Instagram, MessageCircle, Linkedin } from "lucide-react";

const Contact = () => {

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Let's Connect
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to collaborate on exciting projects or discuss opportunities? Let's start a conversation.
          </p>
        </div>

        <div className="flex justify-center space-x-6">
          <Button 
            variant="outline" 
            size="icon" 
            className="border-primary/20 hover:bg-primary/5 w-12 h-12"
            onClick={() => window.open('https://instagram.com/verdy1509', '_blank')}
          >
            <Instagram className="w-5 h-5" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="border-primary/20 hover:bg-primary/5 w-12 h-12"
            onClick={() => window.open('https://github.com/Vardaan1509', '_blank')}
          >
            <Github className="w-5 h-5" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="border-primary/20 hover:bg-primary/5 w-12 h-12"
            onClick={() => {
              const linkedinUrl = 'https://www.linkedin.com/in/Vardaan-Mehandiratta-926b382b4';
              console.log('Attempting to open LinkedIn URL:', linkedinUrl);
              try {
                window.open(linkedinUrl, '_blank');
              } catch (error) {
                console.error('Error opening LinkedIn URL:', error);
              }
            }}
          >
            <Linkedin className="w-5 h-5" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="border-primary/20 hover:bg-primary/5 w-12 h-12"
            onClick={() => window.open('https://discord.com/users/verdy1509', '_blank')}
          >
            <MessageCircle className="w-5 h-5" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="border-primary/20 hover:bg-primary/5 w-12 h-12"
            onClick={() => window.open('mailto:vardaanmehandiratta926@gmail.com', '_blank')}
          >
            <Mail className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Contact;