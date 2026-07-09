import { useEffect, useRef, useState } from "react";
import { Pokemon, resolveBattle } from "./pokemon";
import { drawPokemon } from "./sprites";
import { sounds } from "./sounds";

interface BattleScreenProps {
  team: Pokemon[];
  wild: Pokemon;
  onEnd: (result: "win" | "lose") => void;
}

type Phase = "select" | "intro" | "attack" | "faint" | "sendNext" | "victory" | "defeat";

const BattleScreen = ({ team, wild, onEnd }: BattleScreenProps) => {
  const wildCanvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<Phase>(team.length > 1 ? "select" : "intro");
  const [selected, setSelected] = useState<Pokemon[]>(team.length === 1 ? [team[0]] : []);
  const [activeIdx, setActiveIdx] = useState(0);
  const [message, setMessage] = useState<string>(
    `A wild ${wild.species.name} (Lv ${wild.level}) appeared!`
  );
  const [attackShake, setAttackShake] = useState(false);
  const [wildDefeated, setWildDefeated] = useState(false);
  const [activeFainted, setActiveFainted] = useState(false);

  // Play the wild's cry once when it appears
  useEffect(() => {
    sounds.pokemonCry(wild.species.id, wild.species.shape, wild.species.isLegendary);
  }, [wild]);

  // Draw the wild sprite. Re-runs whenever phase changes so we catch the moment
  // the canvas becomes mounted (after party select).
  useEffect(() => {
    const wc = wildCanvasRef.current;
    if (!wc) return;
    const g = wc.getContext("2d");
    if (!g) return;
    g.imageSmoothingEnabled = false;
    g.clearRect(0, 0, 160, 160);
    drawPokemon(g, 0, 0, 160, wild.species);
    if (wild.species.isLegendary) {
      drawLegendaryAura(g, 160);
    }
  }, [wild, phase]);

  // Auto-start battle when the player only has one Pokemon (no party select needed).
  // "A wild X appeared!" is shown from initial state; then "Go, Y!"; then attack.
  useEffect(() => {
    if (team.length !== 1) return;
    const t1 = setTimeout(() => setMessage(`Go, ${team[0].species.name}!`), 800);
    const t2 = setTimeout(() => runAttack(0), 1600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Toggle a pokemon in the selection list (order preserved by insertion time)
  const toggleSelect = (p: Pokemon) => {
    const idx = selected.findIndex((s) => s.uid === p.uid);
    if (idx !== -1) {
      setSelected(selected.filter((s) => s.uid !== p.uid));
    } else if (selected.length < 3) {
      setSelected([...selected, p]);
    }
  };

  const startBattle = () => {
    if (selected.length === 0) return;
    sounds.select();
    setPhase("intro");
    setMessage(`Go, ${selected[0].species.name}!`);
    setTimeout(() => runAttack(0), 1000);
  };

  const runAttack = (idx: number) => {
    const active = selected[idx];
    setPhase("attack");
    setActiveIdx(idx);
    setAttackShake(true);
    setMessage(`${active.species.name} attacks!`);
    sounds.pokemonCry(active.species.id, active.species.shape);
    setTimeout(() => {
      setAttackShake(false);
      const r = resolveBattle(active, wild);
      if (r === "win") {
        setPhase("victory");
        setWildDefeated(true);
        setMessage(
          wild.species.isLegendary
            ? `You defeated a legendary ${wild.species.name}! Caught!`
            : `You won! ${wild.species.name} was caught!`
        );
        sounds.victory();
        setTimeout(() => sounds.catchSound(), 700);
        setTimeout(() => onEnd("win"), 2400);
      } else {
        setPhase("faint");
        setActiveFainted(true);
        setMessage(`${active.species.name} fainted!`);
        sounds.faint();
        setTimeout(() => {
          setActiveFainted(false);
          if (idx + 1 < selected.length) {
            setPhase("sendNext");
            setMessage(`Go, ${selected[idx + 1].species.name}!`);
            setTimeout(() => runAttack(idx + 1), 900);
          } else {
            setPhase("defeat");
            setMessage(`You have no more Pokemon! You lost!`);
            sounds.defeat();
            setTimeout(() => onEnd("lose"), 1800);
          }
        }, 1200);
      }
    }, 900);
  };

  if (phase === "select") {
    return (
      <PartySelectScreen
        team={team}
        selected={selected}
        wild={wild}
        onToggle={toggleSelect}
        onStart={startBattle}
      />
    );
  }

  const active = selected[activeIdx];
  return (
    <div className="fixed inset-0 z-30 flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 animate-in fade-in duration-300">
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
              isLegendary={wild.species.isLegendary}
            />
            <canvas
              ref={wildCanvasRef}
              width={160}
              height={160}
              style={{ imageRendering: "pixelated" }}
              className={`${phase === "attack" ? "translate-x-2 -translate-y-2" : ""} transition-transform duration-150 ${
                wildDefeated ? "opacity-30 scale-90" : ""
              }`}
            />
          </div>
        </div>

        {/* Your active pokemon (bottom-left) */}
        <div className="flex justify-start items-end gap-4">
          <ActivePokemonCanvas
            pokemon={active}
            attackShake={attackShake}
            fainted={activeFainted}
          />
          {/* Party queue indicator */}
          {selected.length > 1 && (
            <div className="flex flex-col gap-1 mb-6">
              {selected.map((p, i) => (
                <div
                  key={p.uid}
                  className={`px-2 py-0.5 text-xs font-mono rounded ${
                    i === activeIdx
                      ? "bg-blue-600 text-white"
                      : i < activeIdx
                      ? "bg-slate-800 text-slate-500 line-through"
                      : "bg-slate-700 text-slate-300"
                  }`}
                >
                  {i + 1}. {p.species.name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Message box */}
        <div className="mt-4 bg-slate-950/90 border-4 border-slate-700 rounded-lg p-5 shadow-2xl backdrop-blur">
          <p className="text-white text-lg font-mono">{message}</p>
        </div>
      </div>
    </div>
  );
};

interface ActivePokemonCanvasProps {
  pokemon: Pokemon;
  attackShake: boolean;
  fainted: boolean;
}

const ActivePokemonCanvas = ({ pokemon, attackShake, fainted }: ActivePokemonCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const g = c.getContext("2d");
    if (!g) return;
    g.imageSmoothingEnabled = false;
    g.clearRect(0, 0, 160, 160);
    drawPokemon(g, 0, 0, 160, pokemon.species);
  }, [pokemon]);

  return (
    <div className="flex flex-col items-center gap-2">
      <canvas
        ref={canvasRef}
        width={160}
        height={160}
        style={{ imageRendering: "pixelated" }}
        className={`${attackShake ? "animate-bounce" : ""} ${
          fainted ? "opacity-30 scale-90 rotate-12" : ""
        } transition-all duration-200`}
      />
      <StatBar
        label={pokemon.species.name}
        level={pokemon.level}
        side="yours"
        type={pokemon.species.type}
      />
    </div>
  );
};

interface StatBarProps {
  label: string;
  level: number;
  side: "yours" | "wild";
  type: string;
  isLegendary?: boolean;
}

const StatBar = ({ label, level, side, type, isLegendary }: StatBarProps) => {
  return (
    <div
      className={`bg-slate-950/90 border-2 rounded-lg px-4 py-2 min-w-[180px] ${
        isLegendary
          ? "border-yellow-400 shadow-lg shadow-yellow-500/40"
          : side === "yours"
          ? "border-blue-500/50"
          : "border-red-500/50"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-white font-bold text-sm">
          {isLegendary && "★ "}
          {label}
        </span>
        <span
          className={`text-xs uppercase tracking-wider ${
            isLegendary ? "text-yellow-300" : "text-slate-400"
          }`}
        >
          {type}
        </span>
      </div>
      <div className="text-yellow-400 text-xs font-mono mt-1">Lv {level}</div>
    </div>
  );
};

// ============ PARTY SELECT ============

interface PartySelectScreenProps {
  team: Pokemon[];
  selected: Pokemon[];
  wild: Pokemon;
  onToggle: (p: Pokemon) => void;
  onStart: () => void;
}

const PartySelectScreen = ({
  team,
  selected,
  wild,
  onToggle,
  onStart,
}: PartySelectScreenProps) => {
  return (
    <div className="fixed inset-0 z-30 flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 animate-in fade-in duration-300 p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,64,175,0.2),transparent_60%)]" />

      <div className="relative w-full max-w-4xl flex flex-col gap-4">
        <div className="text-center">
          <p className="text-yellow-300 text-sm mb-1 uppercase tracking-widest">Wild Encounter</p>
          <h2 className="text-white text-2xl font-bold">
            {wild.species.isLegendary && "★ "}
            {wild.species.name} <span className="text-yellow-400">Lv {wild.level}</span>
          </h2>
          <p className="text-slate-400 mt-2 text-sm">
            Choose up to 3 Pokemon for your battle team. They'll fight in the order picked.
          </p>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {team.map((p) => {
            const order = selected.findIndex((s) => s.uid === p.uid);
            const isSelected = order !== -1;
            return (
              <button
                key={p.uid}
                onClick={() => onToggle(p)}
                className={`relative flex items-center gap-2 p-2 rounded-lg border-2 transition-all ${
                  isSelected
                    ? "border-yellow-400 bg-yellow-400/10"
                    : "border-slate-700 bg-slate-900/70 hover:border-slate-500"
                }`}
              >
                <PokemonThumbnail species={p.species} />
                <div className="flex-1 text-left min-w-0">
                  <div className="text-white text-xs font-bold truncate flex items-center gap-1">
                    {p.species.isLegendary && "★"}
                    {p.species.name}
                  </div>
                  <div className="text-yellow-400 text-[10px] font-mono">Lv {p.level}</div>
                </div>
                {isSelected && (
                  <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-yellow-400 text-slate-950 text-xs font-bold flex items-center justify-center">
                    {order + 1}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Action row */}
        <div className="flex justify-center gap-3 mt-4">
          <button
            onClick={onStart}
            disabled={selected.length === 0}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-bold rounded-lg shadow-lg transition-colors"
          >
            FIGHT ({selected.length}/3)
          </button>
        </div>
      </div>
    </div>
  );
};

const PokemonThumbnail = ({ species }: { species: Pokemon["species"] }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const g = c.getContext("2d");
    if (!g) return;
    g.imageSmoothingEnabled = false;
    g.clearRect(0, 0, 40, 40);
    drawPokemon(g, 0, 0, 40, species);
  }, [species]);
  return (
    <canvas
      ref={canvasRef}
      width={40}
      height={40}
      style={{ imageRendering: "pixelated" }}
      className="shrink-0"
    />
  );
};

// Legendary sparkle overlay on the wild pokemon canvas
function drawLegendaryAura(ctx: CanvasRenderingContext2D, size: number) {
  const sparkles = 8;
  ctx.fillStyle = "#fef08a";
  for (let i = 0; i < sparkles; i++) {
    const x = (i * 41 + 13) % size;
    const y = (i * 29 + 7) % size;
    ctx.fillRect(x, y, 2, 2);
  }
}

export default BattleScreen;
