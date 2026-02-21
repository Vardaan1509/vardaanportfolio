import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import * as THREE from "three";

/* ─── section messages ─── */
const sectionMessages: Record<string, string> = {
  hero: "Hey! I'm Robo 🤖 Scroll down to explore!",
  experience: "Check out where I've worked! 💼",
  projects: "These are my top builds! 🚀",
  roadmap: "My journey from idea to production ✨",
  skills: "Tools & tech I work with 🛠️",
  contact: "Let's connect! Drop a message 📬",
};

/* ─── 3-D Robot built from primitives ─── */
const Robot = () => {
  const groupRef = useRef<THREE.Group>(null);
  const eyeL = useRef<THREE.Mesh>(null);
  const eyeR = useRef<THREE.Mesh>(null);
  const [blink, setBlink] = useState(false);

  // blink every few seconds
  useEffect(() => {
    const id = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 150);
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(id);
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    // gentle idle sway
    groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.6) * 0.06;

    // eye scale for blink
    const yScale = blink ? 0.15 : 1;
    eyeL.current?.scale.set(1, yScale, 1);
    eyeR.current?.scale.set(1, yScale, 1);
  });

  const headMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#6C63FF", metalness: 0.3, roughness: 0.4 }), []);
  const bodyMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#5A54D4", metalness: 0.3, roughness: 0.5 }), []);
  const accentMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#A5B4FC", metalness: 0.2, roughness: 0.3 }), []);
  const eyeMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#ffffff", emissive: "#ffffff", emissiveIntensity: 0.8 }), []);
  const antennaMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#F97316", emissive: "#F97316", emissiveIntensity: 0.6 }), []);

  return (
    <Float speed={2} rotationIntensity={0.15} floatIntensity={0.4}>
      <group ref={groupRef} scale={1.1}>
        {/* Head */}
        <RoundedBox args={[1.1, 0.9, 0.8]} radius={0.18} position={[0, 0.85, 0]} material={headMat} />

        {/* Eyes */}
        <mesh ref={eyeL} position={[-0.24, 0.92, 0.41]} material={eyeMat}>
          <sphereGeometry args={[0.12, 16, 16]} />
        </mesh>
        <mesh ref={eyeR} position={[0.24, 0.92, 0.41]} material={eyeMat}>
          <sphereGeometry args={[0.12, 16, 16]} />
        </mesh>

        {/* Visor / mouth area */}
        <RoundedBox args={[0.5, 0.12, 0.1]} radius={0.04} position={[0, 0.62, 0.4]} material={accentMat} />

        {/* Antenna */}
        <mesh position={[0, 1.45, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.3, 8]} />
          <meshStandardMaterial color="#A5B4FC" />
        </mesh>
        <mesh position={[0, 1.65, 0]} material={antennaMat}>
          <sphereGeometry args={[0.08, 16, 16]} />
        </mesh>

        {/* Body */}
        <RoundedBox args={[0.9, 0.7, 0.65]} radius={0.15} position={[0, 0.05, 0]} material={bodyMat} />

        {/* Chest light */}
        <mesh position={[0, 0.1, 0.34]}>
          <circleGeometry args={[0.1, 16]} />
          <meshStandardMaterial color="#34D399" emissive="#34D399" emissiveIntensity={1} />
        </mesh>

        {/* Arms */}
        <RoundedBox args={[0.2, 0.5, 0.2]} radius={0.08} position={[-0.65, 0.05, 0]} material={accentMat} />
        <RoundedBox args={[0.2, 0.5, 0.2]} radius={0.08} position={[0.65, 0.05, 0]} material={accentMat} />

        {/* Legs */}
        <RoundedBox args={[0.25, 0.35, 0.25]} radius={0.08} position={[-0.22, -0.52, 0]} material={accentMat} />
        <RoundedBox args={[0.25, 0.35, 0.25]} radius={0.08} position={[0.22, -0.52, 0]} material={accentMat} />
      </group>
    </Float>
  );
};

/* ─── Speech bubble ─── */
const SpeechBubble = ({ message }: { message: string }) => (
  <div className="absolute -top-3 right-0 translate-x-[calc(100%+8px)] md:-top-4 md:right-auto md:left-0 md:-translate-x-[calc(100%+12px)] w-48 pointer-events-none">
    <div className="glass rounded-xl px-3 py-2 text-xs text-foreground border border-primary/20 shadow-lg relative">
      {message}
      {/* triangle */}
      <div className="absolute top-4 -left-1.5 md:left-auto md:-right-1.5 w-3 h-3 rotate-45 bg-background/60 border-l border-b md:border-l-0 md:border-r md:border-b border-primary/20 backdrop-blur-md" />
    </div>
  </div>
);

/* ─── Main Mascot wrapper ─── */
const RobotMascot = () => {
  const [currentSection, setCurrentSection] = useState("hero");
  const [isVisible, setIsVisible] = useState(true);
  const [showBubble, setShowBubble] = useState(true);

  // Detect which section is in view
  useEffect(() => {
    const sectionIds = ["hero", "experience", "projects", "roadmap", "skills", "contact"];

    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setCurrentSection(id);
            setShowBubble(true);
          }
        },
        { threshold: 0.3 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Auto-hide bubble after a delay
  useEffect(() => {
    if (!showBubble) return;
    const t = setTimeout(() => setShowBubble(false), 5000);
    return () => clearTimeout(t);
  }, [showBubble, currentSection]);

  const toggleBubble = useCallback(() => setShowBubble((v) => !v), []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-4 z-50 flex flex-col items-end">
      {/* Speech bubble */}
      <div
        className={`mb-2 transition-all duration-300 ${
          showBubble ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
        }`}
      >
        <div className="glass rounded-xl px-3.5 py-2.5 text-xs text-foreground border border-primary/20 shadow-lg max-w-[200px]">
          {sectionMessages[currentSection] || "Keep exploring! 🚀"}
        </div>
      </div>

      {/* Robot canvas */}
      <div
        className="w-20 h-20 md:w-24 md:h-24 cursor-pointer"
        onClick={toggleBubble}
        title="Click me!"
      >
        <Canvas
          camera={{ position: [0, 0.3, 3.8], fov: 35 }}
          gl={{ alpha: true, antialias: true }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.7} />
          <directionalLight position={[3, 3, 5]} intensity={1} />
          <pointLight position={[-2, 2, 3]} intensity={0.5} color="#A5B4FC" />
          <Robot />
        </Canvas>
      </div>

      {/* Close button */}
      <button
        onClick={() => setIsVisible(false)}
        className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-muted text-muted-foreground text-[10px] flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground transition-colors"
        aria-label="Hide mascot"
      >
        ✕
      </button>
    </div>
  );
};

export default RobotMascot;
