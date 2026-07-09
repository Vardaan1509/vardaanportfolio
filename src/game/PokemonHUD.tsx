import { useEffect, useRef, useState } from "react";
import { Pokemon } from "./pokemon";
import { drawPokemon } from "./sprites";
import { ChevronDown, ChevronUp, ShieldAlert, X } from "lucide-react";

interface PokemonHUDProps {
  team: Pokemon[];
  repellentExpires: number | null;
  onTradeForRepellent: (pokemon: Pokemon) => void;
}

const PokemonHUD = ({ team, repellentExpires, onTradeForRepellent }: PokemonHUDProps) => {
  const [open, setOpen] = useState(true);
  const [showTrade, setShowTrade] = useState(false);
  const [now, setNow] = useState(Date.now());

  // Tick to update countdown display
  useEffect(() => {
    if (!repellentExpires) return;
    const t = setInterval(() => setNow(Date.now()), 500);
    return () => clearInterval(t);
  }, [repellentExpires]);

  const repellentActive = !!repellentExpires && now < repellentExpires;
  const repellentSecs = repellentActive
    ? Math.ceil((repellentExpires! - now) / 1000)
    : 0;

  return (
    <>
      {/* Repellent timer badge (top-right corner, above the team) */}
      {repellentActive && (
        <div className="absolute top-4 right-4 z-20 bg-emerald-900/90 border-2 border-emerald-400 rounded-lg px-3 py-1.5 backdrop-blur-sm shadow-lg flex items-center gap-2">
          <ShieldAlert className="w-3.5 h-3.5 text-emerald-300" />
          <span className="text-emerald-100 text-xs font-mono font-bold">
            Repel: {repellentSecs}s
          </span>
        </div>
      )}

      <div
        className="absolute right-4 z-10 bg-slate-900/85 border border-slate-700 rounded-lg backdrop-blur-sm shadow-lg overflow-hidden max-w-[280px]"
        style={{ top: repellentActive ? 60 : 16 }}
      >
        {team.length === 0 ? (
          <div className="px-3 py-2">
            <p className="text-slate-400 text-xs font-mono">No Pokemon yet</p>
            <p className="text-slate-500 text-[10px]">Talk to NPCs to get one</p>
          </div>
        ) : (
          <>
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
                <button
                  onClick={() => setShowTrade(true)}
                  disabled={repellentActive}
                  className="w-full mt-2 py-1.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-900 hover:bg-emerald-800 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-emerald-100 rounded transition-colors"
                >
                  Trade for Repel Spray
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {showTrade && (
        <TradeModal
          team={team}
          onCancel={() => setShowTrade(false)}
          onConfirm={(p) => {
            setShowTrade(false);
            onTradeForRepellent(p);
          }}
        />
      )}
    </>
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
    <div className={`flex items-center gap-2 rounded px-2 py-1.5 ${
      pokemon.species.isLegendary
        ? "bg-yellow-500/10 border border-yellow-400/40"
        : "bg-slate-800/60"
    }`}>
      <canvas
        ref={canvasRef}
        width={40}
        height={40}
        style={{ imageRendering: "pixelated" }}
      />
      <div className="flex-1 min-w-0">
        <div className="text-slate-100 text-xs font-bold truncate flex items-center gap-1">
          {pokemon.species.isLegendary && "★"}
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

// ============ TRADE MODAL ============

interface TradeModalProps {
  team: Pokemon[];
  onCancel: () => void;
  onConfirm: (p: Pokemon) => void;
}

const TradeModal = ({ team, onCancel, onConfirm }: TradeModalProps) => {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-in fade-in duration-200 p-4">
      <div className="w-[min(92vw,500px)] bg-slate-900 border-4 border-emerald-500 rounded-lg p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-emerald-300 text-xs uppercase tracking-widest mb-1">Repel Shop</p>
            <h2 className="text-white text-xl font-bold">Trade a Pokemon</h2>
          </div>
          <button
            onClick={onCancel}
            className="text-slate-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="text-slate-400 text-sm mb-4">
          Trade one Pokemon for a Wild Repel Spray. Keeps wild encounters away for 30 seconds.
          You cannot trade a legendary.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[50vh] overflow-y-auto">
          {team.map((p) => (
            <button
              key={p.uid}
              onClick={() => onConfirm(p)}
              disabled={!!p.species.isLegendary}
              className={`flex flex-col items-center gap-1 p-3 rounded-lg border-2 transition-all ${
                p.species.isLegendary
                  ? "border-slate-800 bg-slate-800/60 cursor-not-allowed opacity-50"
                  : "border-slate-700 bg-slate-800/60 hover:border-emerald-400 hover:bg-emerald-500/10"
              }`}
            >
              <TradeThumbnail species={p.species} />
              <div className="text-white text-xs font-bold flex items-center gap-1">
                {p.species.isLegendary && "★"}
                {p.species.name}
              </div>
              <div className="text-yellow-400 text-[10px] font-mono">Lv {p.level}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const TradeThumbnail = ({ species }: { species: Pokemon["species"] }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const g = c.getContext("2d");
    if (!g) return;
    g.imageSmoothingEnabled = false;
    g.clearRect(0, 0, 48, 48);
    drawPokemon(g, 0, 0, 48, species);
  }, [species]);
  return (
    <canvas
      ref={canvasRef}
      width={48}
      height={48}
      style={{ imageRendering: "pixelated" }}
    />
  );
};

export default PokemonHUD;
