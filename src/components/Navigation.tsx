import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 right-0 z-50 p-4">
      {/* Hamburger Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="relative z-50 bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-background/90 transition-all duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </Button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-background/95 backdrop-blur-md border border-border/50 rounded-lg shadow-lg overflow-hidden">
          <div className="py-2">
            <button
              onClick={() => scrollToSection('experience')}
              className="w-full px-4 py-3 text-left text-sm hover:bg-accent/50 transition-colors duration-200 flex items-center justify-between group"
            >
              <span>Experience</span>
              <div className="w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="w-full px-4 py-3 text-left text-sm hover:bg-accent/50 transition-colors duration-200 flex items-center justify-between group"
            >
              <span>Projects</span>
              <div className="w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="w-full px-4 py-3 text-left text-sm hover:bg-accent/50 transition-colors duration-200 flex items-center justify-between group"
            >
              <span>Connect</span>
              <div className="w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation; 