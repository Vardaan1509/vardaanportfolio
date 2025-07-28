import { Button } from "@/components/ui/button";
import { Mail, Github, Instagram, MessageCircle } from "lucide-react";

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
          <Button variant="outline" size="icon" className="border-primary/20 hover:bg-primary/5 w-12 h-12">
            <Instagram className="w-5 h-5" />
          </Button>
          <Button variant="outline" size="icon" className="border-primary/20 hover:bg-primary/5 w-12 h-12">
            <Github className="w-5 h-5" />
          </Button>
          <Button variant="outline" size="icon" className="border-primary/20 hover:bg-primary/5 w-12 h-12">
            <MessageCircle className="w-5 h-5" />
          </Button>
          <Button variant="outline" size="icon" className="border-primary/20 hover:bg-primary/5 w-12 h-12">
            <Mail className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Contact;