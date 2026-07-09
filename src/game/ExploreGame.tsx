import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Keyboard, Volume2, VolumeX } from "lucide-react";
import {
  TILE_SIZE,
  MAP_WIDTH,
  MAP_HEIGHT,
  worldMap,
  isSolid,
  isTallGrass,
  buildings,
  SPAWN,
  type Building,
} from "./world";
import { drawTile, drawCharacter, drawBuildingLabel } from "./sprites";
import { npcs, findNPCAt, type NPC } from "./npcs";
// per-NPC outfit lookup (drawn on top of the base body)
const NPC_OUTFITS: Record<string, OutfitStyle> = {
  apiGroup: "officeCoat",
  waterloo: "labCoat",
  bharatDenim: "officeCoat",
  hackathon: "casual",
  resumeGuy: "trainer",
  devRoom: "casual",
};
import {
  makePokemon,
  rollWildEncounter,
  type Pokemon,
} from "./pokemon";
import type { OutfitStyle } from "./sprites";
import { sounds } from "./sounds";
import BattleScreen from "./BattleScreen";
import PokemonHUD from "./PokemonHUD";

type Direction = 0 | 1 | 2 | 3; // down, up, left, right
const DIRS: Record<Direction, { dx: number; dy: number }> = {
  0: { dx: 0, dy: 1 },
  1: { dx: 0, dy: -1 },
  2: { dx: -1, dy: 0 },
  3: { dx: 1, dy: 0 },
};

const MOVE_MS = 160;
const RESUME_URL = "/Resume_VardaanMehandiratta (4).pdf";
const ENCOUNTER_CHANCE = 0.28; // per step into tall grass

// Lookup used by sprite renderer to color per-building.
const buildingAt = (tx: number, ty: number): Building | undefined =>
  buildings.find(
    (b) => tx >= b.x && tx < b.x + b.w && ty >= b.y && ty < b.y + b.h
  );

interface DialogueState {
  npc: NPC;
  line: number; // index into current line list
  extraLines: string[] | null; // if we're mid-choice-response
  choiceShown: boolean;
  finished: boolean;
}

const ExploreGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dialogue, setDialogue] = useState<DialogueState | null>(null);
  const [team, setTeam] = useState<Pokemon[]>([]);
  const [battle, setBattle] = useState<{ yours: Pokemon; wild: Pokemon } | null>(null);
  const [muted, setMuted] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [fainted, setFainted] = useState(false);
  const talkedTo = useRef<Set<string>>(new Set()); // NPCs whose full dialogue has completed at least once
  const giftGiven = useRef<Set<string>>(new Set()); // NPCs whose gift pokemon has been awarded

  const playerRef = useRef({
    tileX: SPAWN.x,
    tileY: SPAWN.y,
    facing: 0 as Direction,
    fromX: SPAWN.x,
    fromY: SPAWN.y,
    toX: SPAWN.x,
    toY: SPAWN.y,
    moveStart: 0,
    moving: false,
    walkFrame: 0,
  });
  const keysRef = useRef<Set<string>>(new Set());
  const animFrameRef = useRef(0);
  const dialogueRef = useRef<DialogueState | null>(null);
  dialogueRef.current = dialogue;
  const battleRef = useRef<typeof battle>(null);
  battleRef.current = battle;
  const teamRef = useRef<Pokemon[]>([]);
  teamRef.current = team;
  const faintedRef = useRef(false);
  faintedRef.current = fainted;

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2400);
  }, []);

  const respawn = useCallback(() => {
    const p = playerRef.current;
    p.tileX = SPAWN.x;
    p.tileY = SPAWN.y;
    p.fromX = SPAWN.x;
    p.fromY = SPAWN.y;
    p.toX = SPAWN.x;
    p.toY = SPAWN.y;
    p.moving = false;
    p.facing = 0;
  }, []);

  const startEncounter = useCallback(() => {
    const roster = teamRef.current;
    if (roster.length === 0) {
      // Died — no pokemon to defend you
      sounds.faint();
      setFainted(true);
      setTimeout(() => {
        respawn();
        setFainted(false);
        showToast("You fainted with no Pokemon. Talk to an NPC first!");
      }, 900);
      return;
    }
    // Use highest-level pokemon in your roster
    const yours = [...roster].sort((a, b) => b.level - a.level)[0];
    const wild = rollWildEncounter();
    sounds.encounter();
    setBattle({ yours, wild });
  }, [respawn, showToast]);

  // Called whenever the player finishes a tile step
  const onStepComplete = useCallback(() => {
    const p = playerRef.current;
    const tile = worldMap[p.tileY]?.[p.tileX];
    if (tile && isTallGrass(tile)) {
      if (Math.random() < ENCOUNTER_CHANCE) {
        startEncounter();
      }
    }
  }, [startEncounter]);

  const tryMove = useCallback(
    (direction: Direction) => {
      const p = playerRef.current;
      if (p.moving) return;
      p.facing = direction;
      const { dx, dy } = DIRS[direction];
      const nx = p.tileX + dx;
      const ny = p.tileY + dy;
      if (nx < 0 || nx >= MAP_WIDTH || ny < 0 || ny >= MAP_HEIGHT) return;
      if (isSolid(worldMap[ny][nx])) return;
      if (worldMap[ny][nx] === "buildingDoor") return; // block doors (no interior yet)
      if (findNPCAt(nx, ny)) return;
      p.fromX = p.tileX;
      p.fromY = p.tileY;
      p.toX = nx;
      p.toY = ny;
      p.tileX = nx;
      p.tileY = ny;
      p.moveStart = performance.now();
      p.moving = true;
      p.walkFrame = p.walkFrame === 0 ? 1 : 0;
      sounds.step();
    },
    []
  );

  // Give the player their gift pokemon after finishing an NPC's dialogue for the first time
  const finishDialogueWithNPC = useCallback((npc: NPC) => {
    if (npc.givesPokemon && !giftGiven.current.has(npc.id)) {
      giftGiven.current.add(npc.id);
      const pk = makePokemon(npc.givesPokemon);
      setTeam((prev) => [...prev, pk]);
      sounds.give();
      showToast(`Got ${pk.species.name} (Lv ${pk.level})!`);
    }
  }, [showToast]);

  const downloadResume = useCallback(() => {
    const a = document.createElement("a");
    a.href = RESUME_URL;
    a.download = "Vardaan_Mehandiratta_Resume.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    sounds.give();
    showToast("Resume downloaded!");
  }, [showToast]);

  // Advance / close dialogue
  const advanceDialogue = useCallback(() => {
    const state = dialogueRef.current;
    if (!state) return;

    // If we've finished the last line, close.
    const currentLines = state.extraLines ?? state.npc.dialogue;
    const isLast = state.line >= currentLines.length - 1;

    if (!isLast) {
      setDialogue({ ...state, line: state.line + 1 });
      sounds.talk();
      return;
    }

    // At the end of main dialogue. If there's a choice and it hasn't been shown yet,
    // do NOT close — surface the choice UI instead.
    if (!state.extraLines && state.npc.choice && !state.choiceShown) {
      setDialogue({ ...state, choiceShown: true });
      return;
    }

    // Otherwise close the dialogue.
    const finishingNPC = state.npc;
    setDialogue(null);
    talkedTo.current.add(finishingNPC.id); // remember completed conversation for repeat dialogue
    // Grant pokemon if applicable (only for NPCs without a choice, since resume NPC handles its own end).
    if (!finishingNPC.choice) {
      finishDialogueWithNPC(finishingNPC);
    }
  }, [finishDialogueWithNPC]);

  const chooseOption = useCallback(
    (optionIndex: number) => {
      const state = dialogueRef.current;
      if (!state || !state.npc.choice) return;
      const option = state.npc.choice.options[optionIndex];
      sounds.select();
      if (option.action === "giveResume") downloadResume();
      if (option.action === "givePokemon" && option.pokemonId) {
        const npc = state.npc;
        if (!giftGiven.current.has(npc.id)) {
          giftGiven.current.add(npc.id);
          const pk = makePokemon(option.pokemonId);
          setTeam((prev) => [...prev, pk]);
          sounds.give();
          showToast(`Got ${pk.species.name} (Lv ${pk.level})!`);
        }
      }
      setDialogue({
        ...state,
        line: 0,
        extraLines: option.responseLines,
        choiceShown: false, // hide the choice UI now
      });
    },
    [downloadResume, showToast]
  );

  const interact = useCallback(() => {
    // Consumed by dialogue (via click/keyboard); otherwise try to talk.
    if (dialogueRef.current) {
      if (dialogueRef.current.choiceShown) return; // wait for choice click
      advanceDialogue();
      return;
    }
    const p = playerRef.current;
    const { dx, dy } = DIRS[p.facing];
    const nx = p.tileX + dx;
    const ny = p.tileY + dy;
    const npc = findNPCAt(nx, ny);
    if (npc) {
      sounds.talk();
      const useRepeat =
        talkedTo.current.has(npc.id) && !!npc.dialogueRepeat;
      setDialogue({
        npc,
        line: 0,
        extraLines: useRepeat ? npc.dialogueRepeat! : null,
        choiceShown: false,
        finished: false,
      });
    }
  }, [advanceDialogue]);

  // Keyboard
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (
        [
          "arrowup",
          "arrowdown",
          "arrowleft",
          "arrowright",
          "w",
          "a",
          "s",
          "d",
          " ",
          "e",
          "enter",
        ].includes(k)
      ) {
        e.preventDefault();
      }
      keysRef.current.add(k);
      if (battleRef.current || faintedRef.current) return;
      if (k === " " || k === "e" || k === "enter") interact();
    };
    const up = (e: KeyboardEvent) => {
      keysRef.current.delete(e.key.toLowerCase());
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [interact]);

  // Fullscreen canvas sizing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.imageSmoothingEnabled = false;
      }
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // Main render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.imageSmoothingEnabled = false;

    let raf = 0;
    let lastAnimTick = 0;

    const loop = (now: number) => {
      const p = playerRef.current;

      if (now - lastAnimTick > 400) {
        animFrameRef.current = (animFrameRef.current + 1) % 2;
        lastAnimTick = now;
      }

      // Continued walking if key held (only while not in dialogue/battle/fainted)
      const blocked =
        !!dialogueRef.current || !!battleRef.current || faintedRef.current;
      if (!p.moving && !blocked) {
        const keys = keysRef.current;
        if (keys.has("arrowup") || keys.has("w")) tryMove(1);
        else if (keys.has("arrowdown") || keys.has("s")) tryMove(0);
        else if (keys.has("arrowleft") || keys.has("a")) tryMove(2);
        else if (keys.has("arrowright") || keys.has("d")) tryMove(3);
      }

      // Movement interpolation
      let renderX = p.tileX;
      let renderY = p.tileY;
      if (p.moving) {
        const t = Math.min(1, (now - p.moveStart) / MOVE_MS);
        renderX = p.fromX + (p.toX - p.fromX) * t;
        renderY = p.fromY + (p.toY - p.fromY) * t;
        if (t >= 1) {
          p.moving = false;
          p.fromX = p.toX;
          p.fromY = p.toY;
          onStepComplete();
        }
      }

      // Camera: center on player, clamp to map bounds
      const logicalW = window.innerWidth;
      const logicalH = window.innerHeight;
      const viewTilesW = logicalW / TILE_SIZE;
      const viewTilesH = logicalH / TILE_SIZE;
      let camX = renderX - viewTilesW / 2 + 0.5;
      let camY = renderY - viewTilesH / 2 + 0.5;
      camX = Math.max(0, Math.min(MAP_WIDTH - viewTilesW, camX));
      camY = Math.max(0, Math.min(MAP_HEIGHT - viewTilesH, camY));
      // If map smaller than viewport (unlikely at 40x30), just clamp to 0
      if (MAP_WIDTH < viewTilesW) camX = (MAP_WIDTH - viewTilesW) / 2;
      if (MAP_HEIGHT < viewTilesH) camY = (MAP_HEIGHT - viewTilesH) / 2;
      const camPxX = camX * TILE_SIZE;
      const camPxY = camY * TILE_SIZE;

      // Background fill (outside map area)
      ctx.fillStyle = "#0f172a";
      ctx.fillRect(0, 0, logicalW, logicalH);

      // Draw visible tiles
      const startTx = Math.max(0, Math.floor(camX) - 1);
      const endTx = Math.min(MAP_WIDTH, Math.ceil(camX + viewTilesW) + 1);
      const startTy = Math.max(0, Math.floor(camY) - 1);
      const endTy = Math.min(MAP_HEIGHT, Math.ceil(camY + viewTilesH) + 1);

      for (let ty = startTy; ty < endTy; ty++) {
        for (let tx = startTx; tx < endTx; tx++) {
          const px = tx * TILE_SIZE - camPxX;
          const py = ty * TILE_SIZE - camPxY;
          drawTile(
            ctx,
            worldMap[ty][tx],
            px,
            py,
            animFrameRef.current,
            buildingAt,
            tx,
            ty
          );
        }
      }

      // Building labels (only for visible ones)
      for (const b of buildings) {
        if (
          b.x + b.w >= startTx &&
          b.x < endTx &&
          b.y + b.h >= startTy &&
          b.y < endTy
        ) {
          drawBuildingLabel(ctx, b, camPxX, camPxY);
        }
      }

      // NPCs
      for (const npc of npcs) {
        if (npc.x < startTx - 1 || npc.x > endTx || npc.y < startTy - 1 || npc.y > endTy)
          continue;
        const npx = npc.x * TILE_SIZE - camPxX;
        const npy = npc.y * TILE_SIZE - camPxY;
        drawCharacter(
          ctx,
          npx,
          npy,
          npc.color,
          npc.hair,
          0,
          0,
          npc.accessory,
          NPC_OUTFITS[npc.id] ?? "casual"
        );
        if (!blocked) {
          const dx = npc.x - p.tileX;
          const dy = npc.y - p.tileY;
          const isAdjacent =
            (dx === 0 && Math.abs(dy) === 1) ||
            (Math.abs(dx) === 1 && dy === 0);
          const faces =
            (dx === 0 && dy === 1 && p.facing === 0) ||
            (dx === 0 && dy === -1 && p.facing === 1) ||
            (dx === -1 && dy === 0 && p.facing === 2) ||
            (dx === 1 && dy === 0 && p.facing === 3);
          if (isAdjacent && faces) {
            drawHint(ctx, npx + TILE_SIZE / 2, npy - 6, now);
          }
        }
      }

      // Player
      const playerPx = renderX * TILE_SIZE - camPxX;
      const playerPy = renderY * TILE_SIZE - camPxY;
      drawCharacter(
        ctx,
        playerPx,
        playerPy,
        "#0891b2", // cyan shirt for the player
        "#0f172a",
        p.facing,
        p.moving ? p.walkFrame : 0,
        null,
        "trainer" // Player is a Pokemon trainer
      );

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [tryMove, onStepComplete]);

  // Battle result handler
  const handleBattleEnd = useCallback(
    (r: "win" | "lose") => {
      if (r === "win" && battle) {
        setTeam((prev) => [...prev, battle.wild]);
        showToast(`Caught ${battle.wild.species.name} (Lv ${battle.wild.level})!`);
      } else if (r === "lose") {
        showToast("You lost the battle. Returning to spawn.");
        respawn();
      }
      setBattle(null);
    },
    [battle, respawn, showToast]
  );

  const toggleMute = () => {
    const m = sounds.toggle();
    setMuted(m);
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-slate-950 overflow-hidden select-none"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />

      {/* HUD overlays */}
      <Link
        to="/"
        className="absolute top-4 left-4 z-10 inline-flex items-center gap-2 px-3 py-2 bg-slate-900/80 hover:bg-slate-800 text-white text-sm rounded-lg border border-slate-700 backdrop-blur-sm transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to portfolio
      </Link>

      <button
        onClick={toggleMute}
        className="absolute top-4 left-1/2 -translate-x-1/2 z-10 inline-flex items-center gap-2 px-3 py-2 bg-slate-900/80 hover:bg-slate-800 text-white text-sm rounded-lg border border-slate-700 backdrop-blur-sm transition-colors"
        aria-label={muted ? "Unmute" : "Mute"}
      >
        {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>

      <PokemonHUD team={team} />

      {/* Controls hint (bottom-left) */}
      <div className="absolute bottom-4 left-4 z-10 flex flex-col gap-1 text-slate-400 text-xs bg-slate-900/70 border border-slate-700 rounded-lg px-3 py-2 backdrop-blur-sm">
        <div className="inline-flex items-center gap-1.5 text-slate-200">
          <Keyboard className="w-3.5 h-3.5" /> Controls
        </div>
        <div>WASD / Arrows — move</div>
        <div>Space / E — talk & advance</div>
      </div>

      {/* Fainted flash */}
      {fainted && (
        <div className="absolute inset-0 z-20 bg-red-600/40 pointer-events-none animate-pulse" />
      )}

      {/* Toast */}
      {toast && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 bg-slate-900/95 border-2 border-yellow-400 rounded-lg px-4 py-2 text-yellow-200 text-sm font-mono shadow-lg animate-in fade-in slide-in-from-top-4 duration-200">
          {toast}
        </div>
      )}

      {/* Dialogue */}
      {dialogue && (
        <DialogueBox
          state={dialogue}
          onAdvance={advanceDialogue}
          onChoose={chooseOption}
        />
      )}

      {/* Battle */}
      {battle && (
        <BattleScreen
          yours={battle.yours}
          wild={battle.wild}
          onEnd={handleBattleEnd}
        />
      )}
    </div>
  );
};

const drawHint = (
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  now: number
) => {
  const bob = Math.sin(now / 200) * 2;
  ctx.fillStyle = "#facc15";
  ctx.beginPath();
  ctx.arc(cx, cy + bob, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#1e293b";
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.fillStyle = "#1e293b";
  ctx.font = "bold 12px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("!", cx, cy + bob + 1);
};

interface DialogueBoxProps {
  state: DialogueState;
  onAdvance: () => void;
  onChoose: (index: number) => void;
}

const DialogueBox = ({ state, onAdvance, onChoose }: DialogueBoxProps) => {
  const currentLines = state.extraLines ?? state.npc.dialogue;
  const isLast = state.line >= currentLines.length - 1;
  const hasChoice = !!state.npc.choice && !state.extraLines;
  const showingChoices = state.choiceShown;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-20 w-[min(92vw,760px)]">
      <div
        onClick={!showingChoices ? onAdvance : undefined}
        className={`bg-slate-950/95 border-4 border-slate-700 rounded-lg p-5 shadow-2xl backdrop-blur ${
          !showingChoices ? "cursor-pointer" : ""
        }`}
      >
        <div className="flex items-center gap-2 mb-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: state.npc.color }}
          />
          <span className="text-white font-bold text-sm">{state.npc.name}</span>
          <span className="text-slate-500 text-xs">— {state.npc.role}</span>
        </div>
        <p className="text-slate-100 text-base leading-relaxed min-h-[3rem]">
          {currentLines[state.line]}
        </p>

        {showingChoices && state.npc.choice ? (
          <div className="mt-4 pt-3 border-t border-slate-700">
            <p className="text-slate-400 text-xs mb-2">{state.npc.choice.question}</p>
            <div className="flex gap-2">
              {state.npc.choice.options.map((o, i) => (
                <button
                  key={i}
                  onClick={() => onChoose(i)}
                  className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 hover:border-yellow-400 text-white text-sm rounded transition-colors"
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex justify-end mt-2">
            <span className="text-slate-500 text-xs animate-pulse">
              {isLast && !hasChoice ? "▸ close" : "▸ continue"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreGame;
