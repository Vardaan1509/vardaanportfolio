// Procedurally-drawn sprites in a bright GBA-era overworld style.
// All art is drawn from scratch in code — no external assets.

import { TILE_SIZE, TileType, Building } from "./world";
import { PokemonSpecies } from "./pokemon";

const PIX = TILE_SIZE / 10;

const P = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  gx: number,
  gy: number,
  w: number,
  h: number,
  color: string
) => {
  ctx.fillStyle = color;
  ctx.fillRect(x + gx * PIX, y + gy * PIX, w * PIX, h * PIX);
};

// ============ GRASS FAMILY ============

const drawGrass = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
  // Bright saturated GBA-style green base
  ctx.fillStyle = "#78c850";
  ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
  // Dotted texture pattern (like the reference screenshot)
  const darker = "#5ea838";
  P(ctx, x, y, 1, 2, 1, 1, darker);
  P(ctx, x, y, 4, 1, 1, 1, darker);
  P(ctx, x, y, 7, 3, 1, 1, darker);
  P(ctx, x, y, 2, 5, 1, 1, darker);
  P(ctx, x, y, 5, 6, 1, 1, darker);
  P(ctx, x, y, 8, 7, 1, 1, darker);
  P(ctx, x, y, 0, 8, 1, 1, darker);
  // Occasional brighter highlight for depth
  P(ctx, x, y, 3, 3, 1, 1, "#98d868");
  P(ctx, x, y, 6, 8, 1, 1, "#98d868");
};

const drawGrassTuft = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
  drawGrass(ctx, x, y);
  // A small clump of taller blades
  P(ctx, x, y, 3, 4, 1, 3, "#387028");
  P(ctx, x, y, 4, 3, 1, 4, "#387028");
  P(ctx, x, y, 5, 4, 1, 3, "#387028");
  P(ctx, x, y, 4, 3, 1, 1, "#58a840");
};

const drawTallGrass = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
  // Darker, denser grass field (encounter zone)
  ctx.fillStyle = "#487830";
  ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
  // Vertical blade shapes suggesting height
  const blade = "#68a848";
  const bladeDark = "#305818";
  for (let i = 0; i < 5; i++) {
    P(ctx, x, y, i * 2, 2, 1, 6, blade);
    P(ctx, x, y, i * 2, 7, 1, 1, bladeDark);
  }
  for (let i = 0; i < 4; i++) {
    P(ctx, x, y, 1 + i * 2, 3, 1, 5, bladeDark);
    P(ctx, x, y, 1 + i * 2, 3, 1, 1, blade);
  }
  // Top edge highlight
  P(ctx, x, y, 0, 0, 10, 1, "#5a9038");
  P(ctx, x, y, 1, 0, 1, 1, "#78b850");
  P(ctx, x, y, 5, 0, 1, 1, "#78b850");
};

// ============ PATH / WATER ============

const drawPath = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
  ctx.fillStyle = "#e8c878";
  ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
  P(ctx, x, y, 2, 3, 1, 1, "#c8a858");
  P(ctx, x, y, 6, 6, 1, 1, "#c8a858");
  P(ctx, x, y, 5, 2, 1, 1, "#f0d888");
  P(ctx, x, y, 8, 5, 1, 1, "#f0d888");
};

const drawDoorStep = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
  drawGrass(ctx, x, y);
  // Warm-glow doorstep like in the reference
  P(ctx, x, y, 3, 3, 4, 4, "#f8e0a0");
  P(ctx, x, y, 3, 3, 4, 1, "#f0c878");
  P(ctx, x, y, 3, 6, 4, 1, "#d0a860");
};

const drawWater = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  animFrame: number
) => {
  ctx.fillStyle = "#3878c8";
  ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
  const off = animFrame === 0 ? 0 : 1;
  P(ctx, x, y, 1 + off, 2, 3, 1, "#5090d8");
  P(ctx, x, y, 5 + off, 6, 3, 1, "#5090d8");
  P(ctx, x, y, 2 + off, 2, 1, 1, "#a0c8f0");
  P(ctx, x, y, 6 + off, 6, 1, 1, "#a0c8f0");
};

// ============ TREES ============

const drawTree = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
  drawGrass(ctx, x, y);
  // Round bushy canopy — top-down view like the reference
  const dark = "#204818";
  const mid = "#386828";
  const light = "#588838";
  const highlight = "#78a848";

  // Outline
  P(ctx, x, y, 1, 1, 8, 8, dark);
  // Main body
  P(ctx, x, y, 2, 1, 6, 8, mid);
  P(ctx, x, y, 1, 2, 8, 6, mid);
  // Lighter fill
  P(ctx, x, y, 2, 2, 6, 6, light);
  // Top-left highlight cluster
  P(ctx, x, y, 3, 2, 3, 2, highlight);
  P(ctx, x, y, 2, 3, 2, 2, highlight);
  // Small dark speckles suggesting leaf gaps
  P(ctx, x, y, 5, 5, 1, 1, mid);
  P(ctx, x, y, 6, 3, 1, 1, mid);
  P(ctx, x, y, 3, 6, 1, 1, mid);
  P(ctx, x, y, 7, 6, 1, 1, dark);
};

// ============ FLOWERS ============

const drawFlower = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
  drawGrass(ctx, x, y);
  // Red flower cluster like the reference screenshot
  const petal = "#e04848";
  const petalDark = "#a02020";
  const center = "#f8d038";
  // Small cross of red petals
  P(ctx, x, y, 4, 3, 2, 1, petal);
  P(ctx, x, y, 3, 4, 4, 2, petal);
  P(ctx, x, y, 4, 6, 2, 1, petal);
  // Dark accents
  P(ctx, x, y, 3, 4, 1, 1, petalDark);
  P(ctx, x, y, 6, 5, 1, 1, petalDark);
  // Yellow center
  P(ctx, x, y, 4, 4, 2, 2, center);
  P(ctx, x, y, 4, 4, 1, 1, "#ffe870");
  // Stem hint
  P(ctx, x, y, 4, 7, 2, 1, "#387028");
};

// ============ MAILBOX SIGN ============

const drawSign = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
  drawGrass(ctx, x, y);
  // Post
  P(ctx, x, y, 4, 6, 2, 3, "#584038");
  // Sign box — cool blue-grey like the mailboxes in the reference
  P(ctx, x, y, 2, 2, 6, 5, "#9098b8");
  P(ctx, x, y, 2, 2, 6, 1, "#585878");
  P(ctx, x, y, 2, 6, 6, 1, "#585878");
  P(ctx, x, y, 2, 2, 1, 5, "#585878");
  P(ctx, x, y, 7, 2, 1, 5, "#585878");
  // Envelope icon on the front
  P(ctx, x, y, 3, 3, 4, 3, "#f0f0f8");
  P(ctx, x, y, 3, 3, 4, 1, "#c8c8d0");
  P(ctx, x, y, 3, 3, 2, 2, "#c8c8d0");
  P(ctx, x, y, 5, 3, 2, 2, "#c8c8d0");
  P(ctx, x, y, 4, 4, 2, 1, "#585878");
};

// ============ BUILDINGS ============

const drawBuildingRoofTop = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  roof: string,
  shadow: string
) => {
  ctx.fillStyle = roof;
  ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
  // Dark outline on top
  P(ctx, x, y, 0, 0, 10, 1, shadow);
  // Ridge tiles across the top (Pokemon-house style horizontal cap)
  P(ctx, x, y, 0, 1, 10, 2, shadow);
  P(ctx, x, y, 1, 2, 8, 1, roof);
  // Small highlight along the top
  P(ctx, x, y, 2, 1, 2, 1, "#f8b878");
  P(ctx, x, y, 6, 1, 2, 1, "#f8b878");
  // Tile texture below the ridge
  P(ctx, x, y, 0, 6, 10, 1, shadow);
  for (let i = 0; i < 5; i++) {
    P(ctx, x, y, i * 2, 5, 1, 1, shadow);
  }
  for (let i = 0; i < 4; i++) {
    P(ctx, x, y, 1 + i * 2, 8, 1, 1, shadow);
  }
};

const drawBuildingRoofBase = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  roof: string,
  shadow: string
) => {
  ctx.fillStyle = roof;
  ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
  // Shingle rows
  const rowShade = shadow;
  P(ctx, x, y, 0, 1, 10, 1, rowShade);
  for (let i = 0; i < 5; i++) {
    P(ctx, x, y, i * 2, 0, 1, 1, rowShade);
  }
  P(ctx, x, y, 0, 4, 10, 1, rowShade);
  for (let i = 0; i < 4; i++) {
    P(ctx, x, y, 1 + i * 2, 3, 1, 1, rowShade);
  }
  P(ctx, x, y, 0, 7, 10, 1, rowShade);
  for (let i = 0; i < 5; i++) {
    P(ctx, x, y, i * 2, 6, 1, 1, rowShade);
  }
  // Bottom edge overhang
  P(ctx, x, y, 0, 9, 10, 1, "#4a2818");
  P(ctx, x, y, 0, 8, 10, 1, rowShade);
};

const drawBuildingWall = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  wall: string,
  shadow: string
) => {
  ctx.fillStyle = wall;
  ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
  // Top strip (cornice under the roof)
  P(ctx, x, y, 0, 0, 10, 1, shadow);
  // Foundation stones at the bottom
  P(ctx, x, y, 0, 8, 10, 2, "#787868");
  P(ctx, x, y, 0, 8, 10, 1, "#a8a898");
  // Stone segments
  for (let i = 0; i < 5; i++) {
    P(ctx, x, y, i * 2, 9, 1, 1, "#585848");
  }
};

const drawBuildingWindow = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  wall: string,
  shadow: string
) => {
  drawBuildingWall(ctx, x, y, wall, shadow);
  // Window frame
  P(ctx, x, y, 1, 2, 8, 5, "#403830");
  P(ctx, x, y, 2, 3, 6, 3, "#68a0d8");
  // Glass highlights
  P(ctx, x, y, 2, 3, 3, 1, "#a8c8f0");
  P(ctx, x, y, 2, 3, 1, 2, "#a8c8f0");
  // Muntin cross
  P(ctx, x, y, 4, 3, 1, 3, "#403830");
  P(ctx, x, y, 2, 4, 6, 1, "#403830");
  // Sill
  P(ctx, x, y, 1, 6, 8, 1, "#585048");
};

const drawBuildingDoor = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  wall: string,
  shadow: string
) => {
  drawBuildingWall(ctx, x, y, wall, shadow);
  // Door frame (darker wood)
  P(ctx, x, y, 2, 1, 6, 7, "#3a2010");
  // Door panel (lighter wood)
  P(ctx, x, y, 3, 2, 4, 6, "#8a5828");
  P(ctx, x, y, 3, 2, 4, 1, "#a87038");
  // Wood grain lines
  P(ctx, x, y, 3, 4, 4, 1, "#6a4018");
  P(ctx, x, y, 3, 6, 4, 1, "#6a4018");
  // Doorknob
  P(ctx, x, y, 6, 5, 1, 1, "#f0d060");
  // Doorstep on top of foundation
  P(ctx, x, y, 2, 8, 6, 1, "#a89078");
};

// ============ DISPATCH ============

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
    case "doorStep":
      return drawDoorStep(ctx, x, y);
    case "buildingRoofTop":
    case "buildingRoofBase":
    case "buildingWall":
    case "buildingWindow":
    case "buildingDoor": {
      const b =
        buildingLookup && tx !== undefined && ty !== undefined
          ? buildingLookup(tx, ty)
          : undefined;
      const wall = b?.wallColor ?? "#f0dcb4";
      const wallShadow = b?.wallShadow ?? "#a88860";
      const roof = b?.roofColor ?? "#e88a4a";
      const roofShadow = b?.roofShadow ?? "#a85220";
      if (tile === "buildingRoofTop")
        return drawBuildingRoofTop(ctx, x, y, roof, roofShadow);
      if (tile === "buildingRoofBase")
        return drawBuildingRoofBase(ctx, x, y, roof, roofShadow);
      if (tile === "buildingWall")
        return drawBuildingWall(ctx, x, y, wall, wallShadow);
      if (tile === "buildingWindow")
        return drawBuildingWindow(ctx, x, y, wall, wallShadow);
      return drawBuildingDoor(ctx, x, y, wall, wallShadow);
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
  accessory?: "resume" | null
) => {
  const bob = walkFrame === 1 ? PIX / 2 : 0;
  const cy = y + bob;

  ctx.fillStyle = "rgba(0,0,0,0.28)";
  ctx.fillRect(x + 2 * PIX, y + 9 * PIX, 6 * PIX, PIX / 2);

  // Head
  P(ctx, x, cy, 3, 1, 4, 4, "#f4c9a3");

  // Hair
  ctx.fillStyle = hairColor;
  if (direction === 1) {
    ctx.fillRect(x + 3 * PIX, cy + PIX, 4 * PIX, 3 * PIX);
  } else {
    ctx.fillRect(x + 3 * PIX, cy + PIX, 4 * PIX, 2 * PIX);
    if (direction === 2) ctx.fillRect(x + 3 * PIX, cy + PIX, PIX, 3 * PIX);
    if (direction === 3) ctx.fillRect(x + 6 * PIX, cy + PIX, PIX, 3 * PIX);
  }

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

  // Shirt
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

  if (accessory === "resume") {
    const bobOffset = Math.sin(Date.now() / 300) * 1;
    ctx.fillStyle = "#fefefe";
    ctx.fillRect(x + 4 * PIX, y - 2 * PIX + bobOffset, 3 * PIX, 4 * PIX);
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(x + 4.5 * PIX, y - PIX + bobOffset, 2 * PIX, PIX / 2);
    ctx.fillRect(x + 4.5 * PIX, y + bobOffset, 2 * PIX, PIX / 2);
    ctx.fillRect(x + 4.5 * PIX, y + PIX + bobOffset, PIX, PIX / 2);
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
  const p = size / 10;
  const Q = (gx: number, gy: number, w: number, h: number, c: string) => {
    ctx.fillStyle = c;
    ctx.fillRect(x + gx * p, y + gy * p, w * p, h * p);
  };
  ctx.fillStyle = "rgba(0,0,0,0.28)";
  ctx.beginPath();
  ctx.ellipse(x + size / 2, y + size - p, size / 3, p / 1.5, 0, 0, Math.PI * 2);
  ctx.fill();

  const { primary, secondary, shape } = species;

  switch (shape) {
    case "blob":
      Q(2, 3, 6, 6, primary);
      Q(2, 3, 6, 2, secondary);
      Q(3, 5, 1, 1, "#fff");
      Q(6, 5, 1, 1, "#fff");
      Q(3.3, 5.3, 0.5, 0.5, "#000");
      Q(6.3, 5.3, 0.5, 0.5, "#000");
      Q(4, 7, 2, 1, secondary);
      break;
    case "bug":
      Q(1, 4, 8, 4, primary);
      Q(3, 3, 4, 2, primary);
      Q(0, 3, 2, 3, secondary);
      Q(8, 3, 2, 3, secondary);
      Q(3, 4, 1, 1, "#fff");
      Q(6, 4, 1, 1, "#fff");
      Q(3.3, 4.3, 0.4, 0.4, "#000");
      Q(6.3, 4.3, 0.4, 0.4, "#000");
      Q(2, 8, 1, 1, secondary);
      Q(7, 8, 1, 1, secondary);
      break;
    case "sparky":
      Q(2, 3, 6, 5, primary);
      Q(3, 8, 1, 1, primary);
      Q(6, 8, 1, 1, primary);
      Q(4, 5, 2, 1, secondary);
      Q(3, 6, 1, 1, secondary);
      Q(6, 6, 1, 1, secondary);
      Q(3.5, 4, 0.6, 0.6, "#000");
      Q(5.9, 4, 0.6, 0.6, "#000");
      Q(8, 4, 1, 1, "#fde047");
      Q(8.5, 5, 1, 1, "#fde047");
      Q(9, 6, 1, 1, "#fde047");
      break;
    case "aqua":
      Q(2, 4, 6, 5, primary);
      Q(2, 3, 6, 2, secondary);
      Q(4, 2, 2, 2, primary);
      Q(3.5, 5, 0.6, 0.6, "#fff");
      Q(5.9, 5, 0.6, 0.6, "#fff");
      Q(3.7, 5.2, 0.4, 0.4, "#000");
      Q(6.1, 5.2, 0.4, 0.4, "#000");
      Q(4, 7, 2, 1, secondary);
      Q(1, 6, 1, 1, "#7dd3fc");
      Q(8, 6, 1, 1, "#7dd3fc");
      break;
    case "brick":
      Q(1, 3, 8, 6, primary);
      Q(1, 3, 8, 1, secondary);
      Q(1, 8, 8, 1, secondary);
      Q(1, 3, 1, 6, secondary);
      Q(8, 3, 1, 6, secondary);
      Q(1, 5, 8, 0.4, secondary);
      Q(4, 3, 0.4, 2, secondary);
      Q(6, 5.5, 0.4, 2, secondary);
      Q(2.5, 6, 1, 1, "#fff");
      Q(6.5, 6, 1, 1, "#fff");
      Q(2.9, 6.3, 0.5, 0.5, "#000");
      Q(6.9, 6.3, 0.5, 0.5, "#000");
      break;
    case "leaf":
      Q(2, 4, 6, 5, primary);
      Q(4, 1, 2, 3, secondary);
      Q(3, 2, 1, 2, secondary);
      Q(6, 2, 1, 2, secondary);
      Q(3.5, 5.5, 0.6, 0.6, "#000");
      Q(5.9, 5.5, 0.6, 0.6, "#000");
      Q(4, 7, 2, 0.6, secondary);
      Q(2, 8, 1, 1, primary);
      Q(7, 8, 1, 1, primary);
      break;
  }
};

// ============ BUILDING LABEL ============

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
