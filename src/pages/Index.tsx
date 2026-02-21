import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import ProjectRoadmap from "@/components/ProjectRoadmap";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import RobotMascot from "@/components/RobotMascot";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Experience />
      <Projects />
      <ProjectRoadmap />
      <Skills />
      <Contact />
      <RobotMascot />
    </div>
  );
};

export default Index;