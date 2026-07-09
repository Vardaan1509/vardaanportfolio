// Procedurally-drawn sprites: tiles, characters, and pokemon.
// Everything is drawn with a tiny "pixel grid" per tile so it stays retro.

import { TILE_SIZE, TileType, Building } from "./world";
import { PokemonSpecies } from "./pokemon";

const PIX = TILE_SIZE / 10; // 10x10 pixel grid per tile => 4px per mini-cell at TILE_SIZE=40

const rect = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  color: string,
  gx: number,
  gy: number,
  w = 1,
  h = 1
) => {
  ctx.fillStyle = color;
  ctx.fillRect(x + gx * PIX, y + gy * PIX, w * PIX, h * PIX);
};

// ============ TILES ============

const drawGrass = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
  ctx.fillStyle = "#5eb85e";
  ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
  ctx.fillStyle = "#4ca44c";
  ctx.fillRect(x + 2 * PIX, y + 3 * PIX, PIX, PIX);
  ctx.fillRect(x + 6 * PIX, y + 2 * PIX, PIX, PIX);
  ctx.fillRect(x + 4 * PIX, y + 7 * PIX, PIX, PIX);
  ctx.fillRect(x + 8 * PIX, y + 6 * PIX, PIX, PIX);
};

const drawGrassTuft = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
  drawGrass(ctx, x, y);
  ctx.fillStyle = "#3a8a3a";
  ctx.fillRect(x + 3 * PIX, y + 4 * PIX, 2 * PIX, 2 * PIX);
  ctx.fillStyle = "#2f722f";
  ctx.fillRect(x + 3 * PIX, y + 5 * PIX, 2 * PIX, PIX);
};

const drawTallGrass = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
  ctx.fillStyle = "#3a8a3a";
  ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
  // Vertical stripes suggesting tall blades
  ctx.fillStyle = "#4ea54e";
  for (let i = 0; i < 5; i++) {
    ctx.fillRect(x + (i * 2) * PIX, y + 2 * PIX, PIX, 6 * PIX);
  }
  ctx.fillStyle = "#2b6d2b";
  for (let i = 0; i < 4; i++) {
    ctx.fillRect(x + (1 + i * 2) * PIX, y + 3 * PIX, PIX, 6 * PIX);
  }
  ctx.fillStyle = "#5cbf5c";
  ctx.fillRect(x + 2 * PIX, y, PIX, PIX);
  ctx.fillRect(x + 6 * PIX, y, PIX, PIX);
};

const drawPath = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
  ctx.fillStyle = "#d9c48a";
  ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
  ctx.fillStyle = "#c2ac70";
  ctx.fillRect(x + 2 * PIX, y + 6 * PIX, PIX, PIX);
  ctx.fillRect(x + 6 * PIX, y + 3 * PIX, PIX, PIX);
  ctx.fillStyle = "#b89b5a";
  ctx.fillRect(x + 4 * PIX, y + 8 * PIX, PIX, PIX);
};

const drawWater = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  animFrame: number
) => {
  ctx.fillStyle = "#3b82c4";
  ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
  const off = animFrame === 0 ? 0 : PIX;
  ctx.fillStyle = "#5aa0e0";
  ctx.fillRect(x + PIX + off, y + 2 * PIX, 3 * PIX, PIX);
  ctx.fillRect(x + 5 * PIX + off, y + 6 * PIX, 3 * PIX, PIX);
  ctx.fillStyle = "#84c1f0";
  ctx.fillRect(x + 2 * PIX + off, y + 2 * PIX, PIX, PIX);
};

const drawTree = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
  drawGrass(ctx, x, y);
  ctx.fillStyle = "#1f5f2a";
  ctx.fillRect(x + PIX, y, 8 * PIX, 7 * PIX);
  ctx.fillStyle = "#2b7d3a";
  ctx.fillRect(x + 2 * PIX, y + PIX, 6 * PIX, 5 * PIX);
  ctx.fillStyle = "#3a9a4d";
  ctx.fillRect(x + 3 * PIX, y + 2 * PIX, 2 * PIX, PIX);
  ctx.fillStyle = "#6b3f1e";
  ctx.fillRect(x + 4 * PIX, y + 7 * PIX, 2 * PIX, 2 * PIX);
};

const drawFlower = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
  drawGrass(ctx, x, y);
  ctx.fillStyle = "#e64980";
  ctx.fillRect(x + 3 * PIX, y + 3 * PIX, 3 * PIX, 3 * PIX);
  ctx.fillStyle = "#fabb6d";
  ctx.fillRect(x + 4 * PIX, y + 4 * PIX, PIX, PIX);
  ctx.fillStyle = "#3a8a3a";
  ctx.fillRect(x + 4 * PIX, y + 6 * PIX, PIX, 3 * PIX);
};

const drawSign = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
  drawGrass(ctx, x, y);
  ctx.fillStyle = "#8b5a2b";
  ctx.fillRect(x + 4 * PIX, y + 4 * PIX, PIX, 5 * PIX);
  ctx.fillStyle = "#b0763a";
  ctx.fillRect(x + PIX, y + PIX, 8 * PIX, 4 * PIX);
  ctx.fillStyle = "#6b4423";
  ctx.fillRect(x + PIX, y + PIX, 8 * PIX, PIX);
  ctx.fillRect(x + PIX, y + 4 * PIX, 8 * PIX, PIX);
};

const drawBuildingRoof = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  roof: string,
  accent: string
) => {
  ctx.fillStyle = roof;
  ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
  ctx.fillStyle = accent;
  ctx.fillRect(x, y, TILE_SIZE, PIX);
  ctx.fillRect(x, y + 8 * PIX, TILE_SIZE, PIX);
  // Shingle pattern
  ctx.fillStyle = accent;
  for (let i = 0; i < 5; i++) {
    ctx.fillRect(x + (i * 2) * PIX, y + 4 * PIX, PIX, PIX);
    ctx.fillRect(x + (1 + i * 2) * PIX, y + 6 * PIX, PIX, PIX);
  }
};

const drawBuildingWall = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  wall: string,
  accent: string
) => {
  ctx.fillStyle = wall;
  ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
  ctx.fillStyle = accent;
  ctx.fillRect(x, y, PIX / 2, TILE_SIZE);
  ctx.fillRect(x + TILE_SIZE - PIX / 2, y, PIX / 2, TILE_SIZE);
};

const drawBuildingWindow = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  wall: string,
  accent: string
) => {
  drawBuildingWall(ctx, x, y, wall, accent);
  ctx.fillStyle = accent;
  ctx.fillRect(x + 2 * PIX, y + 3 * PIX, 6 * PIX, 4 * PIX);
  ctx.fillStyle = "#a5c9e8";
  ctx.fillRect(x + 3 * PIX, y + 4 * PIX, 4 * PIX, 3 * PIX);
  ctx.fillStyle = "#c6dcf0";
  ctx.fillRect(x + 3 * PIX, y + 4 * PIX, 2 * PIX, PIX);
  // Window frame cross
  ctx.fillStyle = accent;
  ctx.fillRect(x + 5 * PIX, y + 4 * PIX, PIX / 2, 3 * PIX);
  ctx.fillRect(x + 3 * PIX, y + 5 * PIX, 4 * PIX, PIX / 2);
};

const drawBuildingDoor = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  wall: string,
  accent: string
) => {
  drawBuildingWall(ctx, x, y, wall, accent);
  ctx.fillStyle = "#4a2b16";
  ctx.fillRect(x + 3 * PIX, y + 2 * PIX, 4 * PIX, 7 * PIX);
  ctx.fillStyle = "#6b3f1e";
  ctx.fillRect(x + 3 * PIX + PIX / 2, y + 3 * PIX, 3 * PIX, 6 * PIX);
  // Door knob
  ctx.fillStyle = "#fbbf24";
  ctx.fillRect(x + 5 * PIX + PIX / 2, y + 6 * PIX, PIX / 2, PIX / 2);
};

export const drawTile = (
  ctx: CanvasRenderingContext2D,
  tile: TileType,
  x: number,
  y: number,
  animFrame: number,
  buildingLookup?: (px: number, py: number) => Building | undefined,
  tx?: number,
  ty?: number
) => {
  switch (tile) {
    case "grass":
      return drawGrass(ctx, x, y);
    case "grassTuft":
      return drawGrassTuft(ctx, x, y);
    case "path":
      return drawPath(ctx, x, y);
    case "water":
      return drawWater(ctx, x, y, animFrame);
    case "tree":
      return drawTree(ctx, x, y);
    case "flower":
      return drawFlower(ctx, x, y);
    case "sign":
      return drawSign(ctx, x, y);
    case "tallGrass":
      return drawTallGrass(ctx, x, y);
    case "buildingRoof":
    case "buildingWall":
    case "buildingWindow":
    case "buildingDoor": {
      const b =
        buildingLookup && tx !== undefined && ty !== undefined
          ? buildingLookup(tx, ty)
          : undefined;
      const wall = b?.wallColor ?? "#e6d3b3";
      const roof = b?.roofColor ?? "#8b3a3a";
      const accent = b?.accentColor ?? "#5b2323";
      if (tile === "buildingRoof") return drawBuildingRoof(ctx, x, y, roof, accent);
      if (tile === "buildingWall") return drawBuildingWall(ctx, x, y, wall, accent);
      if (tile === "buildingWindow")
        return drawBuildingWindow(ctx, x, y, wall, accent);
      return drawBuildingDoor(ctx, x, y, wall, accent);
    }
  }
};

// ============ CHARACTER ============

export const drawCharacter = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  shirtColor: string,
  hairColor: string,
  direction: number,
  walkFrame: number,
  accessory?: "resume" | "clipboard" | null
) => {
  const bob = walkFrame === 1 ? PIX / 2 : 0;
  const cy = y + bob;

  // Shadow
  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.fillRect(x + 2 * PIX, y + 9 * PIX, 6 * PIX, PIX / 2);

  // Head
  ctx.fillStyle = "#f4c9a3";
  ctx.fillRect(x + 3 * PIX, cy + PIX, 4 * PIX, 4 * PIX);

  // Hair
  ctx.fillStyle = hairColor;
  if (direction === 1) {
    ctx.fillRect(x + 3 * PIX, cy + PIX, 4 * PIX, 3 * PIX);
  } else {
    ctx.fillRect(x + 3 * PIX, cy + PIX, 4 * PIX, 2 * PIX);
    if (direction === 2) ctx.fillRect(x + 3 * PIX, cy + PIX, PIX, 3 * PIX);
    if (direction === 3) ctx.fillRect(x + 6 * PIX, cy + PIX, PIX, 3 * PIX);
  }

  // Eyes
  if (direction !== 1) {
    ctx.fillStyle = "#1e293b";
    if (direction === 0) {
      ctx.fillRect(x + 4 * PIX, cy + 3 * PIX, PIX / 2, PIX / 2);
      ctx.fillRect(x + 5.5 * PIX, cy + 3 * PIX, PIX / 2, PIX / 2);
    } else if (direction === 2) {
      ctx.fillRect(x + 4 * PIX, cy + 3 * PIX, PIX / 2, PIX / 2);
    } else if (direction === 3) {
      ctx.fillRect(x + 5.5 * PIX, cy + 3 * PIX, PIX / 2, PIX / 2);
    }
  }

  // Shirt/torso
  ctx.fillStyle = shirtColor;
  ctx.fillRect(x + 2.5 * PIX, cy + 5 * PIX, 5 * PIX, 3 * PIX);
  ctx.fillStyle = shade(shirtColor, -25);
  ctx.fillRect(x + 2.5 * PIX, cy + 7 * PIX, 5 * PIX, PIX);

  // Arms
  ctx.fillStyle = "#f4c9a3";
  ctx.fillRect(x + 2 * PIX, cy + 5 * PIX, PIX, 2 * PIX);
  ctx.fillRect(x + 7 * PIX, cy + 5 * PIX, PIX, 2 * PIX);

  // Legs
  ctx.fillStyle = "#1e3a5f";
  if (walkFrame === 0) {
    ctx.fillRect(x + 3 * PIX, cy + 8 * PIX, PIX, 2 * PIX);
    ctx.fillRect(x + 6 * PIX, cy + 8 * PIX, PIX, 2 * PIX);
  } else {
    ctx.fillRect(x + 2.5 * PIX, cy + 8 * PIX, PIX, 2 * PIX);
    ctx.fillRect(x + 6.5 * PIX, cy + 8 * PIX, PIX, 2 * PIX);
  }

  // Accessory (item held / bobbing above head)
  if (accessory === "resume") {
    // Paper icon above head
    ctx.fillStyle = "#fefefe";
    ctx.fillRect(x + 4 * PIX, y - 2 * PIX + Math.sin(Date.now() / 300) * 1, 3 * PIX, 4 * PIX);
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(x + 4.5 * PIX, y - PIX + Math.sin(Date.now() / 300) * 1, 2 * PIX, PIX / 2);
    ctx.fillRect(x + 4.5 * PIX, y + Math.sin(Date.now() / 300) * 1, 2 * PIX, PIX / 2);
    ctx.fillRect(x + 4.5 * PIX, y + PIX + Math.sin(Date.now() / 300) * 1, PIX, PIX / 2);
  }
};

// ============ POKEMON ============

export const drawPokemon = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  species: PokemonSpecies
) => {
  // "size" is the pokemon's rendered box (square).
  const p = size / 10;
  const P = (gx: number, gy: number, w: number, h: number, c: string) => {
    ctx.fillStyle = c;
    ctx.fillRect(x + gx * p, y + gy * p, w * p, h * p);
  };
  // Shadow
  ctx.fillStyle = "rgba(0,0,0,0.28)";
  ctx.beginPath();
  ctx.ellipse(x + size / 2, y + size - p, size / 3, p / 1.5, 0, 0, Math.PI * 2);
  ctx.fill();

  const { primary, secondary, shape } = species;

  switch (shape) {
    case "blob":
      P(2, 3, 6, 6, primary);
      P(2, 3, 6, 2, secondary);
      P(3, 5, PIX, PIX, "#fff");
      P(3, 5, 1, 1, "#fff");
      P(6, 5, 1, 1, "#fff");
      P(3, 5, 0.5, 0.5, "#000");
      P(6.5, 5, 0.5, 0.5, "#000");
      P(4, 7, 2, 1, secondary);
      break;
    case "bug":
      P(1, 4, 8, 4, primary);
      P(3, 3, 4, 2, primary);
      P(0, 3, 2, 3, secondary); // left wing
      P(8, 3, 2, 3, secondary); // right wing
      P(3, 4, 1, 1, "#fff");
      P(6, 4, 1, 1, "#fff");
      P(3.3, 4.3, 0.4, 0.4, "#000");
      P(6.3, 4.3, 0.4, 0.4, "#000");
      P(2, 8, 1, 1, secondary);
      P(7, 8, 1, 1, secondary);
      break;
    case "sparky":
      P(2, 3, 6, 5, primary);
      P(3, 8, 1, 1, primary);
      P(6, 8, 1, 1, primary);
      // Zigzag pattern
      P(4, 5, 2, 1, secondary);
      P(3, 6, 1, 1, secondary);
      P(6, 6, 1, 1, secondary);
      // Eyes
      P(3.5, 4, 0.6, 0.6, "#000");
      P(5.9, 4, 0.6, 0.6, "#000");
      // Bolt tail
      P(8, 4, 1, 1, "#fde047");
      P(8.5, 5, 1, 1, "#fde047");
      P(9, 6, 1, 1, "#fde047");
      break;
    case "aqua":
      P(2, 4, 6, 5, primary);
      P(2, 3, 6, 2, secondary);
      P(4, 2, 2, 2, primary); // fin
      P(3.5, 5, 0.6, 0.6, "#fff");
      P(5.9, 5, 0.6, 0.6, "#fff");
      P(3.7, 5.2, 0.4, 0.4, "#000");
      P(6.1, 5.2, 0.4, 0.4, "#000");
      P(4, 7, 2, 1, secondary);
      // Water drops
      P(1, 6, 1, 1, "#7dd3fc");
      P(8, 6, 1, 1, "#7dd3fc");
      break;
    case "brick":
      // Rocky boxy body
      P(1, 3, 8, 6, primary);
      P(1, 3, 8, 1, secondary);
      P(1, 8, 8, 1, secondary);
      P(1, 3, 1, 6, secondary);
      P(8, 3, 1, 6, secondary);
      // Brick lines
      P(1, 5, 8, 0.4, secondary);
      P(4, 3, 0.4, 2, secondary);
      P(6, 5.5, 0.4, 2, secondary);
      // Eyes
      P(2.5, 6, 1, 1, "#fff");
      P(6.5, 6, 1, 1, "#fff");
      P(2.9, 6.3, 0.5, 0.5, "#000");
      P(6.9, 6.3, 0.5, 0.5, "#000");
      break;
    case "leaf":
      P(2, 4, 6, 5, primary);
      // Leaf on top
      P(4, 1, 2, 3, secondary);
      P(3, 2, 1, 2, secondary);
      P(6, 2, 1, 2, secondary);
      // Eyes
      P(3.5, 5.5, 0.6, 0.6, "#000");
      P(5.9, 5.5, 0.6, 0.6, "#000");
      P(4, 7, 2, 0.6, secondary);
      P(2, 8, 1, 1, primary);
      P(7, 8, 1, 1, primary);
      break;
  }
};

// Building label draw (called after tiles so labels sit on top of roof)
export const drawBuildingLabel = (
  ctx: CanvasRenderingContext2D,
  b: Building,
  camPxX: number,
  camPxY: number
) => {
  const cx = (b.x + b.w / 2) * TILE_SIZE - camPxX;
  const cy = b.y * TILE_SIZE - camPxY - 6;
  ctx.font = "bold 12px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";
  // Sign background
  const textWidth = ctx.measureText(b.label).width;
  ctx.fillStyle = "rgba(15,23,42,0.85)";
  ctx.fillRect(cx - textWidth / 2 - 6, cy - 14, textWidth + 12, 16);
  ctx.strokeStyle = b.roofColor;
  ctx.lineWidth = 1;
  ctx.strokeRect(cx - textWidth / 2 - 6, cy - 14, textWidth + 12, 16);
  ctx.fillStyle = "#f8fafc";
  ctx.fillText(b.label, cx, cy);
};

function shade(hex: string, amt: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  let r = (num >> 16) + amt;
  let g = ((num >> 8) & 0xff) + amt;
  let b = (num & 0xff) + amt;
  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}
