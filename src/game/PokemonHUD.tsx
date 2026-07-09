import { useEffect, useRef, useState } from "react";
import { Pokemon } from "./pokemon";
import { drawPokemon } from "./sprites";
import { ChevronDown, ChevronUp } from "lucide-react";

interface PokemonHUDProps {
  team: Pokemon[];
}

const PokemonHUD = ({ team }: PokemonHUDProps) => {
  const [open, setOpen] = useState(true);

  if (team.length === 0) {
    return (
      <div className="absolute top-4 right-4 z-10 bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 backdrop-blur-sm">
        <p className="text-slate-400 text-xs font-mono">No Pokemon yet</p>
        <p className="text-slate-500 text-[10px]">Talk to NPCs to get one</p>
      </div>
    );
  }

  return (
    <div className="absolute top-4 right-4 z-10 bg-slate-900/85 border border-slate-700 rounded-lg backdrop-blur-sm shadow-lg overflow-hidden max-w-[260px]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-2 px-3 py-2 border-b border-slate-700 hover:bg-slate-800/50 transition-colors"
      >
        <span className="text-slate-200 text-xs font-bold uppercase tracking-wider">
          Team ({team.length})
        </span>
        {open ? (
          <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
        ) : (
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        )}
      </button>
      {open && (
        <div className="p-2 space-y-1.5">
          {team.map((p) => (
            <PokemonRow key={p.uid} pokemon={p} />
          ))}
        </div>
      )}
    </div>
  );
};

const PokemonRow = ({ pokemon }: { pokemon: Pokemon }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const g = c.getContext("2d");
    if (!g) return;
    g.imageSmoothingEnabled = false;
    g.clearRect(0, 0, 40, 40);
    drawPokemon(g, 0, 0, 40, pokemon.species);
  }, [pokemon]);

  return (
    <div className="flex items-center gap-2 bg-slate-800/60 rounded px-2 py-1.5">
      <canvas
        ref={canvasRef}
        width={40}
        height={40}
        style={{ imageRendering: "pixelated" }}
      />
      <div className="flex-1 min-w-0">
        <div className="text-slate-100 text-xs font-bold truncate">
          {pokemon.species.name}
        </div>
        <div className="flex items-center gap-2 text-[10px]">
          <span className="text-yellow-400 font-mono">Lv {pokemon.level}</span>
          <span className="text-slate-500 uppercase">{pokemon.species.type}</span>
        </div>
      </div>
    </div>
  );
};

export default PokemonHUD;
