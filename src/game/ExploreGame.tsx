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
import { drawTileCached, drawCharacter, drawBuildingLabel } from "./sprites";
import type { OutfitStyle } from "./sprites";
import { npcs, findNPCAt, type NPC } from "./npcs";
import {
  makePokemon,
  rollWildEncounter,
  addToTeam,
  hasLegendary,
  type Pokemon,
} from "./pokemon";
import { sounds } from "./sounds";
import BattleScreen from "./BattleScreen";
import PokemonHUD from "./PokemonHUD";
import NamePromptModal from "./NamePromptModal";
import TouchControls, { type TouchDir } from "./TouchControls";

// Per-static-NPC outfit
const NPC_OUTFITS: Record<string, OutfitStyle> = {
  apiGroup: "officeCoat",
  waterloo: "labCoat",
  bharatDenim: "officeCoat",
  hackathon: "casual",
  resumeGuy: "trainer",
  devRoom: "casual",
};

type Direction = 0 | 1 | 2 | 3;
const DIRS: Record<Direction, { dx: number; dy: number }> = {
  0: { dx: 0, dy: 1 },
  1: { dx: 0, dy: -1 },
  2: { dx: -1, dy: 0 },
  3: { dx: 1, dy: 0 },
};

const MOVE_MS = 160;
const CUSTOM_NPC_MOVE_MS = 260;
const RESUME_URL = "/Vardaan_Resume.pdf";
const ENCOUNTER_CHANCE = 0.28;
const REPELLENT_MS = 30_000;
const CUSTOM_NPC_SPAWN = { x: 18, y: 12 };

const buildingAt = (tx: number, ty: number): Building | undefined =>
  buildings.find(
    (b) => tx >= b.x && tx < b.x + b.w && ty >= b.y && ty < b.y + b.h
  );

interface DialogueState {
  npc: NPC;
  line: number;
  extraLines: string[] | null;
  choiceShown: boolean;
  finished: boolean;
  isLegendaryReview?: boolean;
}

interface CustomNPC {
  id: string;
  name: string;
  tileX: number;
  tileY: number;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  moveStart: number;
  moving: boolean;
  facing: Direction;
  walkFrame: number;
  color: string;
  hair: string;
  outfit: OutfitStyle;
  lastMoveTime: number;
  lastGreetTime: number;
}

const CUSTOM_NPC_COLORS = ["#f87171", "#60a5fa", "#a3e635", "#fbbf24", "#c084fc"];

const ExploreGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dialogue, setDialogue] = useState<DialogueState | null>(null);
  const [team, setTeam] = useState<Pokemon[]>([]);
  const [battle, setBattle] = useState<{ team: Pokemon[]; wild: Pokemon } | null>(null);
  const [muted, setMuted] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [fainted, setFainted] = useState(false);
  const [repellentExpires, setRepellentExpires] = useState<number | null>(null);
  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const [customNPCs, setCustomNPCs] = useState<CustomNPC[]>([]);
  const [legendaryReviewed, setLegendaryReviewed] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const talkedTo = useRef<Set<string>>(new Set());
  const giftGiven = useRef<Set<string>>(new Set());

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
  const repellentExpiresRef = useRef<number | null>(null);
  repellentExpiresRef.current = repellentExpires;
  const customNPCsRef = useRef<CustomNPC[]>([]);
  customNPCsRef.current = customNPCs;
  const legendaryReviewedRef = useRef(false);
  legendaryReviewedRef.current = legendaryReviewed;
  const showNamePromptRef = useRef(false);
  showNamePromptRef.current = showNamePrompt;

  // Detect touch-capable devices to show on-screen controls.
  useEffect(() => {
    const coarse =
      typeof window !== "undefined" &&
      (window.matchMedia?.("(pointer: coarse)").matches || "ontouchstart" in window);
    setIsTouch(!!coarse);
  }, []);

  // Map a touch direction to the same key the movement loop already listens for.
  const TOUCH_KEY: Record<TouchDir, string> = {
    up: "arrowup",
    down: "arrowdown",
    left: "arrowleft",
    right: "arrowright",
  };
  const pressDir = useCallback((dir: TouchDir) => {
    keysRef.current.add(TOUCH_KEY[dir]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const releaseDir = useCallback((dir: TouchDir) => {
    keysRef.current.delete(TOUCH_KEY[dir]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // If a battle or name prompt begins while a D-pad direction is held, the touch
  // controls unmount before their pointer-up fires. Clear any held keys so the
  // player doesn't keep walking after returning to the map.
  useEffect(() => {
    if (battle || showNamePrompt) {
      keysRef.current.clear();
    }
  }, [battle, showNamePrompt]);

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

  const findCustomNPCAt = useCallback((x: number, y: number): CustomNPC | undefined => {
    return customNPCsRef.current.find((c) => c.tileX === x && c.tileY === y);
  }, []);

  const startEncounter = useCallback(() => {
    // Skip encounters while repellent is active
    if (
      repellentExpiresRef.current &&
      Date.now() < repellentExpiresRef.current
    ) {
      return;
    }
    const roster = teamRef.current;
    if (roster.length === 0) {
      sounds.faint();
      setFainted(true);
      setTimeout(() => {
        respawn();
        setFainted(false);
        showToast("You fainted with no Pokemon. Talk to an NPC first!");
      }, 900);
      return;
    }
    const wild = rollWildEncounter();
    sounds.encounter();
    setBattle({ team: roster, wild });
  }, [respawn, showToast]);

  const onStepComplete = useCallback(() => {
    const p = playerRef.current;
    const tile = worldMap[p.tileY]?.[p.tileX];
    if (tile && isTallGrass(tile)) {
      if (Math.random() < ENCOUNTER_CHANCE) {
        startEncounter();
      }
    }
  }, [startEncounter]);

  const tryMove = useCallback((direction: Direction) => {
    const p = playerRef.current;
    if (p.moving) return;
    p.facing = direction;
    const { dx, dy } = DIRS[direction];
    const nx = p.tileX + dx;
    const ny = p.tileY + dy;
    if (nx < 0 || nx >= MAP_WIDTH || ny < 0 || ny >= MAP_HEIGHT) return;
    if (isSolid(worldMap[ny][nx])) return;
    if (worldMap[ny][nx] === "buildingDoor") return;
    if (findNPCAt(nx, ny)) return;
    if (findCustomNPCAt(nx, ny)) return;
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
  }, [findCustomNPCAt]);

  const finishDialogueWithNPC = useCallback((npc: NPC) => {
    if (npc.givesPokemon && !giftGiven.current.has(npc.id)) {
      giftGiven.current.add(npc.id);
      const pk = makePokemon(npc.givesPokemon);
      setTeam((prev) => addToTeam(prev, pk));
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

  const advanceDialogue = useCallback(() => {
    const state = dialogueRef.current;
    if (!state) return;

    const currentLines = state.extraLines ?? state.npc.dialogue;
    const isLast = state.line >= currentLines.length - 1;

    if (!isLast) {
      setDialogue({ ...state, line: state.line + 1 });
      sounds.talk();
      return;
    }

    if (!state.extraLines && state.npc.choice && !state.choiceShown) {
      setDialogue({ ...state, choiceShown: true });
      return;
    }

    // Close
    const finishingNPC = state.npc;
    const wasLegendaryReview = !!state.isLegendaryReview;
    setDialogue(null);
    talkedTo.current.add(finishingNPC.id);
    if (!finishingNPC.choice) {
      finishDialogueWithNPC(finishingNPC);
    }
    if (wasLegendaryReview) {
      setLegendaryReviewed(true);
      setShowNamePrompt(true);
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
          setTeam((prev) => addToTeam(prev, pk));
          sounds.give();
          showToast(`Got ${pk.species.name} (Lv ${pk.level})!`);
        }
      }
      setDialogue({
        ...state,
        line: 0,
        extraLines: option.responseLines,
        choiceShown: false,
      });
    },
    [downloadResume, showToast]
  );

  const openCustomNPCDialogue = useCallback((custom: CustomNPC) => {
    const tempNPC: NPC = {
      id: `custom-${custom.id}`,
      name: custom.name,
      role: "Trainer",
      x: custom.tileX,
      y: custom.tileY,
      color: custom.color,
      hair: custom.hair,
      dialogue: [
        `Hey! I'm ${custom.name}.`,
        "Prof. Chen registered me after I caught a legendary too. Small world.",
        "Good luck out there.",
      ],
    };
    sounds.talk();
    setDialogue({
      npc: tempNPC,
      line: 0,
      extraLines: null,
      choiceShown: false,
      finished: false,
    });
  }, []);

  const interact = useCallback(() => {
    if (dialogueRef.current) {
      if (dialogueRef.current.choiceShown) return;
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
      // Special: Prof. Chen legendary review path.
      // Only trigger after the player has already met her (so they don't miss the starter offer).
      if (
        npc.id === "waterloo" &&
        talkedTo.current.has("waterloo") &&
        !legendaryReviewedRef.current &&
        hasLegendary(teamRef.current) &&
        npc.legendaryReview
      ) {
        setDialogue({
          npc,
          line: 0,
          extraLines: npc.legendaryReview,
          choiceShown: false,
          finished: false,
          isLegendaryReview: true,
        });
        return;
      }
      const useRepeat = talkedTo.current.has(npc.id) && !!npc.dialogueRepeat;
      setDialogue({
        npc,
        line: 0,
        extraLines: useRepeat ? npc.dialogueRepeat! : null,
        choiceShown: false,
        finished: false,
      });
      return;
    }

    const custom = findCustomNPCAt(nx, ny);
    if (custom) {
      openCustomNPCDialogue(custom);
    }
  }, [advanceDialogue, findCustomNPCAt, openCustomNPCDialogue]);

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
      if (battleRef.current || faintedRef.current || showNamePromptRef.current) return;
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

  // Canvas sizing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      // Cap DPR at 1.5 — the art is chunky pixel art, so higher density just
      // burns fill-rate and causes choppiness on mobile with no visual gain.
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
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

  // Wandering AI update — called from the main loop
  const updateCustomNPCs = useCallback((now: number) => {
    const player = playerRef.current;
    for (const c of customNPCsRef.current) {
      if (c.moving) {
        const t = Math.min(1, (now - c.moveStart) / CUSTOM_NPC_MOVE_MS);
        if (t >= 1) {
          c.moving = false;
          c.fromX = c.toX;
          c.fromY = c.toY;
        }
        continue;
      }
      // Try to move every 2.5-4 seconds
      if (now - c.lastMoveTime > 2500 + Math.random() * 1500) {
        c.lastMoveTime = now;
        const dir = Math.floor(Math.random() * 4) as Direction;
        const { dx, dy } = DIRS[dir];
        const nx = c.tileX + dx;
        const ny = c.tileY + dy;
        c.facing = dir;
        const validTile =
          nx > 0 &&
          nx < MAP_WIDTH - 1 &&
          ny > 0 &&
          ny < MAP_HEIGHT - 1 &&
          !isSolid(worldMap[ny][nx]) &&
          !isTallGrass(worldMap[ny][nx]) &&
          worldMap[ny][nx] !== "buildingDoor" &&
          !findNPCAt(nx, ny) &&
          !customNPCsRef.current.some(
            (o) => o !== c && o.tileX === nx && o.tileY === ny
          ) &&
          !(player.tileX === nx && player.tileY === ny);
        if (validTile) {
          c.fromX = c.tileX;
          c.fromY = c.tileY;
          c.toX = nx;
          c.toY = ny;
          c.tileX = nx;
          c.tileY = ny;
          c.moveStart = now;
          c.moving = true;
          c.walkFrame = c.walkFrame === 0 ? 1 : 0;
        }
      }
    }
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

      const blocked =
        !!dialogueRef.current ||
        !!battleRef.current ||
        faintedRef.current ||
        showNamePromptRef.current;

      if (!p.moving && !blocked) {
        const keys = keysRef.current;
        if (keys.has("arrowup") || keys.has("w")) tryMove(1);
        else if (keys.has("arrowdown") || keys.has("s")) tryMove(0);
        else if (keys.has("arrowleft") || keys.has("a")) tryMove(2);
        else if (keys.has("arrowright") || keys.has("d")) tryMove(3);
      }

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

      // Update wandering NPCs (they animate even when player is talking)
      if (!blocked) updateCustomNPCs(now);

      const logicalW = window.innerWidth;
      const logicalH = window.innerHeight;
      const viewTilesW = logicalW / TILE_SIZE;
      const viewTilesH = logicalH / TILE_SIZE;
      let camX = renderX - viewTilesW / 2 + 0.5;
      let camY = renderY - viewTilesH / 2 + 0.5;
      camX = Math.max(0, Math.min(MAP_WIDTH - viewTilesW, camX));
      camY = Math.max(0, Math.min(MAP_HEIGHT - viewTilesH, camY));
      if (MAP_WIDTH < viewTilesW) camX = (MAP_WIDTH - viewTilesW) / 2;
      if (MAP_HEIGHT < viewTilesH) camY = (MAP_HEIGHT - viewTilesH) / 2;
      // Round the camera offset so the tile grid stays pixel-aligned (avoids
      // seams between blitted tiles) while the player still glides smoothly.
      const camPxX = Math.round(camX * TILE_SIZE);
      const camPxY = Math.round(camY * TILE_SIZE);

      ctx.fillStyle = "#0f172a";
      ctx.fillRect(0, 0, logicalW, logicalH);

      const startTx = Math.max(0, Math.floor(camX) - 1);
      const endTx = Math.min(MAP_WIDTH, Math.ceil(camX + viewTilesW) + 1);
      const startTy = Math.max(0, Math.floor(camY) - 1);
      const endTy = Math.min(MAP_HEIGHT, Math.ceil(camY + viewTilesH) + 1);

      for (let ty = startTy; ty < endTy; ty++) {
        for (let tx = startTx; tx < endTx; tx++) {
          const px = tx * TILE_SIZE - camPxX;
          const py = ty * TILE_SIZE - camPxY;
          const tile = worldMap[ty][tx];
          const b = tile.startsWith("building") ? buildingAt(tx, ty) : undefined;
          drawTileCached(ctx, tile, px, py, animFrameRef.current, b);
        }
      }

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

      // Static NPCs
      for (const npc of npcs) {
        if (
          npc.x < startTx - 1 ||
          npc.x > endTx ||
          npc.y < startTy - 1 ||
          npc.y > endTy
        )
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

      // Custom NPCs (wandering)
      for (const c of customNPCsRef.current) {
        // Compute interpolated render position
        let cRenderX = c.tileX;
        let cRenderY = c.tileY;
        if (c.moving) {
          const t = Math.min(1, (now - c.moveStart) / CUSTOM_NPC_MOVE_MS);
          cRenderX = c.fromX + (c.toX - c.fromX) * t;
          cRenderY = c.fromY + (c.toY - c.fromY) * t;
        }
        if (
          cRenderX < startTx - 1 ||
          cRenderX > endTx ||
          cRenderY < startTy - 1 ||
          cRenderY > endTy
        )
          continue;
        const npx = cRenderX * TILE_SIZE - camPxX;
        const npy = cRenderY * TILE_SIZE - camPxY;
        drawCharacter(
          ctx,
          npx,
          npy,
          c.color,
          c.hair,
          c.facing,
          c.moving ? c.walkFrame : 0,
          null,
          c.outfit
        );
        // Name floating above
        ctx.font = "bold 10px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        const nameText = c.name;
        const w = ctx.measureText(nameText).width;
        const nameY = npy - 4;
        ctx.fillStyle = "rgba(15,23,42,0.85)";
        ctx.fillRect(npx + TILE_SIZE / 2 - w / 2 - 4, nameY - 12, w + 8, 14);
        ctx.fillStyle = "#facc15";
        ctx.fillText(nameText, npx + TILE_SIZE / 2, nameY);

        // Occasional "Hi!" bubble when player is near
        const dxp = c.tileX - p.tileX;
        const dyp = c.tileY - p.tileY;
        const nearby = Math.abs(dxp) <= 3 && Math.abs(dyp) <= 3;
        if (nearby && now - c.lastGreetTime > 6000) {
          c.lastGreetTime = now;
        }
        if (nearby && now - c.lastGreetTime < 1800) {
          drawSpeechBubble(ctx, npx + TILE_SIZE / 2, npy - 22, "Hi!");
        }

        if (!blocked) {
          const dx = c.tileX - p.tileX;
          const dy = c.tileY - p.tileY;
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
        "#0891b2",
        "#0f172a",
        p.facing,
        p.moving ? p.walkFrame : 0,
        null,
        "trainer"
      );

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [tryMove, onStepComplete, updateCustomNPCs]);

  const handleBattleEnd = useCallback(
    (r: "win" | "lose") => {
      if (r === "win" && battle) {
        setTeam((prev) => addToTeam(prev, battle.wild));
        const legendaryNote = battle.wild.species.isLegendary
          ? " Show it to Prof. Chen!"
          : "";
        showToast(
          `Caught ${battle.wild.species.name} (Lv ${battle.wild.level})!${legendaryNote}`
        );
      } else if (r === "lose") {
        showToast("You lost the battle. Returning to spawn.");
        respawn();
      }
      setBattle(null);
    },
    [battle, respawn, showToast]
  );

  const handleTradeForRepellent = useCallback(
    (traded: Pokemon) => {
      if (traded.species.isLegendary) {
        showToast("You can't trade a legendary!");
        return;
      }
      setTeam((prev) => prev.filter((p) => p.uid !== traded.uid));
      setRepellentExpires(Date.now() + REPELLENT_MS);
      sounds.give();
      showToast(`Traded ${traded.species.name} for Repel Spray!`);
    },
    [showToast]
  );

  const handleNameSubmit = useCallback((name: string) => {
    // Pick a color at random from the palette
    const c =
      CUSTOM_NPC_COLORS[
        Math.floor(Math.random() * CUSTOM_NPC_COLORS.length)
      ];
    const now = performance.now();
    const newNPC: CustomNPC = {
      id: `${Date.now()}`,
      name,
      tileX: CUSTOM_NPC_SPAWN.x,
      tileY: CUSTOM_NPC_SPAWN.y,
      fromX: CUSTOM_NPC_SPAWN.x,
      fromY: CUSTOM_NPC_SPAWN.y,
      toX: CUSTOM_NPC_SPAWN.x,
      toY: CUSTOM_NPC_SPAWN.y,
      moveStart: now,
      moving: false,
      facing: 0,
      walkFrame: 0,
      color: c,
      hair: "#1a1008",
      outfit: "trainer",
      lastMoveTime: now,
      lastGreetTime: 0,
    };
    setCustomNPCs((prev) => [...prev, newNPC]);
    setShowNamePrompt(false);
    sounds.victory();
    showToast(`Welcome to the world, ${name}!`);
  }, [showToast]);

  const toggleMute = () => {
    const m = sounds.toggle();
    setMuted(m);
  };

  return (
    <div className="fixed inset-0 bg-slate-950 overflow-hidden select-none">
      <canvas ref={canvasRef} className="block w-full h-full" />

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

      <PokemonHUD
        team={team}
        repellentExpires={repellentExpires}
        onTradeForRepellent={handleTradeForRepellent}
      />

      {!isTouch && (
        <div className="absolute bottom-4 left-4 z-10 flex flex-col gap-1 text-slate-400 text-xs bg-slate-900/70 border border-slate-700 rounded-lg px-3 py-2 backdrop-blur-sm">
          <div className="inline-flex items-center gap-1.5 text-slate-200">
            <Keyboard className="w-3.5 h-3.5" /> Controls
          </div>
          <div>WASD / Arrows — move</div>
          <div>Space / E — talk &amp; advance</div>
        </div>
      )}

      {fainted && (
        <div className="absolute inset-0 z-20 bg-red-600/40 pointer-events-none animate-pulse" />
      )}

      {toast && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 bg-slate-900/95 border-2 border-yellow-400 rounded-lg px-4 py-2 text-yellow-200 text-sm font-mono shadow-lg animate-in fade-in slide-in-from-top-4 duration-200">
          {toast}
        </div>
      )}

      {dialogue && (
        <DialogueBox
          state={dialogue}
          onAdvance={advanceDialogue}
          onChoose={chooseOption}
        />
      )}

      {battle && (
        <BattleScreen
          team={battle.team}
          wild={battle.wild}
          onEnd={handleBattleEnd}
        />
      )}

      {showNamePrompt && <NamePromptModal onSubmit={handleNameSubmit} />}

      {/* On-screen controls for touch devices. Hidden during battle, name entry,
          and dialogue (those have their own UI; tap the dialogue box to advance). */}
      {isTouch && !battle && !showNamePrompt && !dialogue && (
        <TouchControls
          onPress={pressDir}
          onRelease={releaseDir}
          onAction={interact}
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

const drawSpeechBubble = (
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  text: string
) => {
  ctx.font = "bold 10px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const w = ctx.measureText(text).width;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(cx - w / 2 - 4, cy - 10, w + 8, 14);
  ctx.strokeStyle = "#1e293b";
  ctx.lineWidth = 1;
  ctx.strokeRect(cx - w / 2 - 4, cy - 10, w + 8, 14);
  ctx.fillStyle = "#1e293b";
  ctx.fillText(text, cx, cy - 3);
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
            <p className="text-slate-400 text-xs mb-2">
              {state.npc.choice.question}
            </p>
            <div className="flex flex-wrap gap-2">
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
