import { useEffect, useRef, useState } from "react";
import { Pokemon, resolveBattle } from "./pokemon";
import { drawPokemon } from "./sprites";
import { sounds } from "./sounds";

interface BattleScreenProps {
  yours: Pokemon;
  wild: Pokemon;
  onEnd: (result: "win" | "lose") => void;
}

type BattlePhase = "intro" | "attack" | "result";

const BattleScreen = ({ yours, wild, onEnd }: BattleScreenProps) => {
  const yourCanvasRef = useRef<HTMLCanvasElement>(null);
  const wildCanvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<BattlePhase>("intro");
  const [message, setMessage] = useState<string>(
    `A wild ${wild.species.name} (Lv ${wild.level}) appeared!`
  );
  const [result, setResult] = useState<"win" | "lose" | null>(null);
  const [attackShake, setAttackShake] = useState(false);

  // Draw pokemon sprites
  useEffect(() => {
    const size = 160;
    const yc = yourCanvasRef.current;
    const wc = wildCanvasRef.current;
    if (yc) {
      const g = yc.getContext("2d");
      if (g) {
        g.imageSmoothingEnabled = false;
        g.clearRect(0, 0, size, size);
        drawPokemon(g, 0, 0, size, yours.species);
      }
    }
    if (wc) {
      const g = wc.getContext("2d");
      if (g) {
        g.imageSmoothingEnabled = false;
        g.clearRect(0, 0, size, size);
        drawPokemon(g, 0, 0, size, wild.species);
      }
    }
  }, [yours, wild]);

  // Battle sequence
  useEffect(() => {
    let t1: ReturnType<typeof setTimeout>;
    let t2: ReturnType<typeof setTimeout>;
    let t3: ReturnType<typeof setTimeout>;

    t1 = setTimeout(() => {
      setPhase("attack");
      setMessage(`${yours.species.name} charges in!`);
      setAttackShake(true);
      sounds.select();
    }, 1400);

    t2 = setTimeout(() => {
      setAttackShake(false);
      const r = resolveBattle(yours, wild);
      setResult(r);
      setPhase("result");
      if (r === "win") {
        setMessage(`You won! ${wild.species.name} was caught!`);
        sounds.victory();
        setTimeout(() => sounds.catchSound(), 700);
      } else {
        setMessage(`${yours.species.name} was overpowered. You lost!`);
        sounds.defeat();
      }
    }, 2600);

    t3 = setTimeout(() => {
      const r = resolveBattle(yours, wild);
      onEnd(r);
    }, 4600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed inset-0 z-30 flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 animate-in fade-in duration-300">
      {/* Battle backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,64,175,0.2),transparent_60%)]" />
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.02)_2px,rgba(255,255,255,0.02)_3px)]" />

      <div className="relative w-full max-w-4xl px-8 flex flex-col gap-6">
        {/* Wild pokemon (top-right) */}
        <div className="flex justify-end">
          <div className="flex flex-col items-center gap-2">
            <StatBar
              label={wild.species.name}
              level={wild.level}
              side="wild"
              type={wild.species.type}
            />
            <canvas
              ref={wildCanvasRef}
              width={160}
              height={160}
              style={{ imageRendering: "pixelated" }}
              className={`${phase === "attack" && result !== "lose" ? "translate-x-2 -translate-y-2" : ""} transition-transform duration-150 ${
                result === "win" ? "opacity-30 scale-90" : ""
              }`}
            />
          </div>
        </div>

        {/* Your pokemon (bottom-left) */}
        <div className="flex justify-start">
          <div className="flex flex-col items-center gap-2">
            <canvas
              ref={yourCanvasRef}
              width={160}
              height={160}
              style={{ imageRendering: "pixelated" }}
              className={`${attackShake ? "animate-bounce" : ""} ${
                result === "lose" ? "opacity-30 scale-90" : ""
              } transition-all duration-200`}
            />
            <StatBar
              label={yours.species.name}
              level={yours.level}
              side="yours"
              type={yours.species.type}
            />
          </div>
        </div>

        {/* Message box */}
        <div className="mt-4 bg-slate-950/90 border-4 border-slate-700 rounded-lg p-5 shadow-2xl backdrop-blur">
          <p className="text-white text-lg font-mono">{message}</p>
        </div>
      </div>
    </div>
  );
};

interface StatBarProps {
  label: string;
  level: number;
  side: "yours" | "wild";
  type: string;
}

const StatBar = ({ label, level, side, type }: StatBarProps) => {
  return (
    <div
      className={`bg-slate-950/90 border-2 border-slate-600 rounded-lg px-4 py-2 min-w-[180px] ${
        side === "yours" ? "border-blue-500/50" : "border-red-500/50"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-white font-bold text-sm">{label}</span>
        <span className="text-slate-400 text-xs uppercase tracking-wider">{type}</span>
      </div>
      <div className="text-yellow-400 text-xs font-mono mt-1">Lv {level}</div>
    </div>
  );
};

export default BattleScreen;
