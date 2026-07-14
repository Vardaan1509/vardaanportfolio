import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

export type TouchDir = "up" | "down" | "left" | "right";

interface TouchControlsProps {
  onPress: (dir: TouchDir) => void;
  onRelease: (dir: TouchDir) => void;
  onAction: () => void;
}

// On-screen D-pad (bottom-left) + action button (bottom-right).
// Shown only on touch devices. Uses pointer events so a held direction
// keeps the character walking, matching keyboard behaviour.
const TouchControls = ({ onPress, onRelease, onAction }: TouchControlsProps) => {
  const dirBtn = (dir: TouchDir, Icon: typeof ChevronUp, extra: string) => (
    <button
      aria-label={dir}
      onContextMenu={(e) => e.preventDefault()}
      onPointerDown={(e) => {
        e.preventDefault();
        e.currentTarget.setPointerCapture?.(e.pointerId);
        onPress(dir);
      }}
      onPointerUp={(e) => {
        e.preventDefault();
        onRelease(dir);
      }}
      onPointerCancel={() => onRelease(dir)}
      onPointerLeave={() => onRelease(dir)}
      className={`flex items-center justify-center bg-slate-800/70 active:bg-primary/70 border border-slate-600/60 text-white rounded-xl backdrop-blur-sm transition-colors ${extra}`}
      style={{ touchAction: "none", WebkitUserSelect: "none", userSelect: "none" }}
    >
      <Icon className="w-7 h-7" />
    </button>
  );

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[25] pointer-events-none"
      style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
    >
      <div className="flex items-end justify-between px-5 pb-4">
        {/* D-pad */}
        <div
          className="grid grid-cols-3 grid-rows-3 gap-1.5 pointer-events-auto"
          style={{ width: 168, height: 168 }}
        >
          <div />
          {dirBtn("up", ChevronUp, "")}
          <div />
          {dirBtn("left", ChevronLeft, "")}
          <div className="rounded-lg bg-slate-800/40 border border-slate-700/40" />
          {dirBtn("right", ChevronRight, "")}
          <div />
          {dirBtn("down", ChevronDown, "")}
          <div />
        </div>

        {/* Action button */}
        <button
          aria-label="Action / Talk"
          onContextMenu={(e) => e.preventDefault()}
          onPointerDown={(e) => {
            e.preventDefault();
            onAction();
          }}
          className="pointer-events-auto flex items-center justify-center w-20 h-20 rounded-full bg-primary/80 active:bg-primary border-2 border-white/30 text-primary-foreground font-bold text-2xl shadow-lg backdrop-blur-sm"
          style={{ touchAction: "none", WebkitUserSelect: "none", userSelect: "none" }}
        >
          A
        </button>
      </div>
    </div>
  );
};

export default TouchControls;
