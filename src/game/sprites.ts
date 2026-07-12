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
// Detailed RSE-style character drawn on a 20x20 sub-pixel grid (half-PIX cells)
// with saturated palette, multi-tone shading, and centered single-color eyes.

export type OutfitStyle = "casual" | "trainer" | "labCoat" | "officeCoat";

export const drawCharacter = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  shirtColor: string,
  hairColor: string,
  direction: number,
  walkFrame: number,
  accessory?: "resume" | null,
  outfit: OutfitStyle = "casual"
) => {
  const bob = walkFrame === 1 ? PIX / 2 : 0;
  const cy = y + bob;
  const p = PIX / 2; // 2px sub-cell (20x20 grid)

  // Derived palette
  const skin = "#f8d0a8";
  const skinShadow = "#c48868";
  const skinLight = "#ffe4c0";
  const outline = "#1a1008";
  const hair = hairColor;
  const hairDark = shade(hairColor, -32);
  const shirt = shirtColor;
  const shirtDark = shade(shirtColor, -32);
  const shirtLight = shade(shirtColor, 18);
  const pants = "#385878";
  const pantsDark = "#1e3450";
  const shoe = "#1a1008";

  const Q = (gx: number, gy: number, w: number, h: number, c: string) => {
    ctx.fillStyle = c;
    ctx.fillRect(x + gx * p, cy + gy * p, w * p, h * p);
  };

  // Ground shadow (unbobbed)
  ctx.fillStyle = "rgba(0,0,0,0.28)";
  ctx.beginPath();
  ctx.ellipse(x + 10 * p, y + 19 * p, 6 * p, 1.2 * p, 0, 0, Math.PI * 2);
  ctx.fill();

  const palette: CharPalette = {
    skin,
    skinShadow,
    skinLight,
    outline,
    hair,
    hairDark,
    shirt,
    shirtDark,
    shirtLight,
    pants,
    pantsDark,
    shoe,
    walkFrame,
    outfit,
  };

  if (direction === 0) drawCharFront(Q, palette);
  else if (direction === 1) drawCharBack(Q, palette);
  else drawCharSide(Q, direction === 3, palette);

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

type CharPalette = {
  skin: string;
  skinShadow: string;
  skinLight?: string;
  outline: string;
  hair: string;
  hairDark: string;
  shirt: string;
  shirtDark: string;
  shirtLight: string;
  pants: string;
  pantsDark: string;
  shoe: string;
  walkFrame: number;
  outfit: OutfitStyle;
};

// ==== outfit overlays ====

type Q = (gx: number, gy: number, w: number, h: number, c: string) => void;

// Trainer cap covering the top of the head (rows 4-6).
// Uses the character's shirt color as the cap fabric.
function drawTrainerCapFront(q: Q, P: CharPalette) {
  const cap = P.shirt;
  const capDark = P.shirtDark;
  const capLight = P.shirtLight;
  // Cap fabric (rows 4-6)
  q(5, 4, 10, 1, cap);
  q(5, 5, 10, 2, cap);
  // Highlight on top
  q(7, 4, 3, 1, capLight);
  // Cap logo — small white square
  q(9, 5, 2, 1, "#ffffff");
  // Cap outlines
  q(5, 4, 1, 3, P.outline);
  q(14, 4, 1, 3, P.outline);
  q(5, 3, 10, 1, P.outline);
  // Brim shadow strip
  q(5, 7, 10, 1, capDark);
  // Brim outline at row 7
  q(5, 7, 10, 1, capDark);
  q(4, 7, 12, 1, P.outline);
  q(4, 7, 1, 1, capDark);
  q(15, 7, 1, 1, capDark);
}

function drawTrainerCapBack(q: Q, P: CharPalette) {
  const cap = P.shirt;
  const capDark = P.shirtDark;
  const capLight = P.shirtLight;
  q(5, 4, 10, 1, cap);
  q(5, 5, 10, 2, cap);
  q(7, 5, 3, 1, capLight);
  // Snapback band at back
  q(6, 6, 8, 1, capDark);
  q(9, 6, 2, 1, "#ffffff");
  q(5, 4, 1, 3, P.outline);
  q(14, 4, 1, 3, P.outline);
  q(5, 3, 10, 1, P.outline);
  q(5, 7, 10, 1, P.outline);
}

function drawTrainerCapSide(q: Q, facingRight: boolean, P: CharPalette) {
  const cap = P.shirt;
  const capLight = P.shirtLight;
  const capDark = P.shirtDark;
  q(5, 4, 10, 1, cap);
  q(5, 5, 10, 2, cap);
  q(facingRight ? 6 : 10, 4, 3, 1, capLight);
  q(9, 5, 2, 1, "#ffffff");
  q(5, 3, 10, 1, P.outline);
  q(5, 4, 1, 3, P.outline);
  q(14, 4, 1, 3, P.outline);
  // Brim projects out in the facing direction
  if (facingRight) {
    q(14, 6, 3, 1, capDark);
    q(14, 7, 3, 1, P.outline);
  } else {
    q(3, 6, 3, 1, capDark);
    q(3, 7, 3, 1, P.outline);
  }
  q(5, 7, 10, 1, capDark);
}

// Lab coat: off-white overlay with a V-neck opening showing the inner shirt,
// coat sleeves covering the arms, a chest pocket with a pen, and buttons.
function drawLabCoatFront(q: Q, P: CharPalette) {
  const coat = "#f6f6ee";
  const coatShade = "#d0d0c4";
  const coatDark = "#4a4a3e";
  const buttonColor = "#6a6a5c";
  const penBody = "#c83030";
  const penCap = "#ffe28a";

  // Sleeves covering the arms
  q(5, 12, 1.5, 3, coat);
  q(13.5, 12, 1.5, 3, coat);
  q(5, 12, 0.5, 3, P.outline);
  q(14.5, 12, 0.5, 3, P.outline);
  q(5.5, 14, 1, 0.5, coatShade);
  q(13.5, 14, 1, 0.5, coatShade);
  // Sleeve cuffs
  q(5, 14.5, 1.5, 0.5, coatDark);
  q(13.5, 14.5, 1.5, 0.5, coatDark);

  // Coat body outline + fill
  q(6, 11, 8, 1, P.outline);
  q(6, 12, 1, 3, P.outline);
  q(13, 12, 1, 3, P.outline);
  q(7, 11, 6, 4, coat);
  // Right-side subtle shading
  q(12, 12, 1, 3, coatShade);
  q(7, 14, 6, 1, coatShade);

  // V-neck opening — inner shirt visible, narrowing downward
  q(8, 11, 4, 0.5, P.shirtDark);
  q(8, 11.5, 4, 0.5, P.shirt);
  q(8.5, 12, 3, 0.5, P.shirt);
  q(9, 12.5, 2, 0.5, P.shirt);
  q(9.5, 13, 1, 0.5, P.shirt);

  // Lapel dark edges lining the V
  q(7.5, 11.5, 0.5, 1, coatDark);
  q(11.5, 11.5, 0.5, 1, coatDark);
  q(8, 12.5, 0.5, 0.5, coatDark);
  q(11, 12.5, 0.5, 0.5, coatDark);
  q(8.5, 13, 0.5, 0.5, coatDark);
  q(10.5, 13, 0.5, 0.5, coatDark);

  // Chest pocket on the left
  q(7, 13.5, 2, 1, coat);
  q(7, 13.5, 2, 0.5, coatDark); // top flap
  q(7, 13.5, 0.5, 1, coatDark); // left edge
  q(8.5, 13.5, 0.5, 1, coatDark); // right edge

  // Pen sticking out of the pocket
  q(7.5, 13, 0.5, 1, penBody);
  q(7.5, 13, 0.5, 0.5, penCap);

  // Two buttons on the right side
  q(11.5, 13.5, 0.5, 0.5, buttonColor);
  q(11.5, 14.5, 0.5, 0.5, buttonColor);
}

// Professor glasses — solid dark round-ish frames sitting over the eye row.
function drawGlassesFront(q: Q, P: CharPalette) {
  const frame = P.outline;
  const lens = "#5aa0d8";
  const shine = "#ffffff";

  // Left lens
  q(7.5, 7.5, 1.5, 1.5, frame);
  q(8, 8, 0.5, 0.5, lens);
  q(8, 7.5, 0.5, 0.5, shine);
  // Right lens
  q(10.5, 7.5, 1.5, 1.5, frame);
  q(11, 8, 0.5, 0.5, lens);
  q(11, 7.5, 0.5, 0.5, shine);
  // Bridge over the nose
  q(9, 8, 1.5, 0.5, frame);
  // Small temple arms extending outward
  q(7, 8, 0.5, 0.5, frame);
  q(12.5, 8, 0.5, 0.5, frame);
}

// Office blazer over shirt: dark jacket sides, inner white shirt, colored tie.
function drawOfficeCoatFront(q: Q, P: CharPalette) {
  const jacket = "#2a2a3a";
  const jacketShade = "#404055";
  const inner = "#f0f0f0";
  const tie = P.shirt;
  const tieDark = P.shirtDark;
  // Collar row
  q(6, 11, 8, 1, P.outline);
  q(7, 11, 6, 1, jacket);
  // Body
  q(6, 12, 1, 3, P.outline);
  q(13, 12, 1, 3, P.outline);
  q(7, 12, 6, 3, jacket);
  // Right side highlight (subtle)
  q(7, 12, 1, 3, jacketShade);
  // Inner shirt (white strip in center)
  q(9, 11, 2, 1, P.outline);
  q(9, 12, 2, 3, inner);
  // Lapels
  q(8, 11, 1, 1, jacketShade);
  q(11, 11, 1, 1, jacketShade);
  q(8.5, 12, 0.5, 1, jacketShade);
  q(11, 12, 0.5, 1, jacketShade);
  // Tie down the middle
  q(9.5, 12, 1, 2, tie);
  q(9.5, 14, 1, 1, tieDark);
  // Tie knot
  q(9.5, 12, 1, 1, tieDark);
}

// FRONT-FACING VIEW
function drawCharFront(
  Q: (gx: number, gy: number, w: number, h: number, c: string) => void,
  P: CharPalette
) {
  // Head hair block (rows 3-7, cols 6-13)
  Q(6, 3, 8, 1, P.outline);
  Q(5, 4, 10, 1, P.hairDark);
  Q(5, 5, 10, 1, P.hair);
  Q(5, 6, 10, 1, P.hair);
  // Hair highlight strip
  Q(7, 4, 2, 1, P.hair);
  Q(11, 4, 2, 1, P.hair);
  // Hair outline sides
  Q(5, 4, 1, 3, P.outline);
  Q(14, 4, 1, 3, P.outline);

  // Face skin (rows 7-10)
  Q(6, 7, 8, 1, P.outline); // hair fringe bottom outline
  Q(6, 7, 1, 3, P.outline);
  Q(13, 7, 1, 3, P.outline);
  // Skin fill
  Q(7, 7, 6, 1, P.hair); // last row of fringe over forehead
  Q(7, 8, 6, 2, P.skin);
  // Skin shadow on sides
  Q(7, 8, 1, 2, P.skinShadow);
  Q(12, 8, 1, 2, P.skinShadow);
  // Face bottom outline
  Q(7, 10, 6, 1, P.outline);

  // Eyes — single dark color, centered
  Q(8, 8, 1, 1, P.outline);
  Q(11, 8, 1, 1, P.outline);
  // Small mouth hint (chin dimple)
  Q(9, 9, 2, 1, P.skinShadow);

  // Neck
  Q(9, 10, 2, 1, P.skinShadow);

  // Shirt (rows 11-14)
  // Collar row
  Q(6, 11, 8, 1, P.outline);
  Q(7, 11, 6, 1, P.shirtDark);
  // Main shirt body
  Q(6, 12, 1, 3, P.outline);
  Q(13, 12, 1, 3, P.outline);
  Q(7, 12, 6, 3, P.shirt);
  Q(7, 12, 6, 1, P.shirtLight);
  Q(7, 14, 6, 1, P.shirtDark);
  // Arms (skin) on outside
  Q(5, 12, 1, 3, P.outline);
  Q(6, 12, 0.5, 3, P.skinShadow);
  Q(14, 12, 1, 3, P.outline);
  Q(13.5, 12, 0.5, 3, P.skinShadow);

  // Pants / legs (rows 15-17)
  Q(6, 15, 8, 1, P.outline);
  Q(7, 15, 6, 2, P.pants);
  Q(7, 15, 6, 1, P.pantsDark); // waistband
  // Leg separation
  Q(9, 15, 2, 2, P.pantsDark);

  // Walking animation — leg positions shift
  if (P.walkFrame === 0) {
    Q(7, 17, 2, 1, P.pants);
    Q(11, 17, 2, 1, P.pants);
    // Shoes
    Q(6, 18, 3, 1, P.shoe);
    Q(11, 18, 3, 1, P.shoe);
  } else {
    Q(7, 17, 2, 1, P.pants);
    Q(11, 17, 2, 1, P.pants);
    // Shoes shifted
    Q(6, 18, 3, 1, P.shoe);
    Q(11, 18, 3, 1, P.shoe);
    // One shoe raised slightly (bob effect handled via cy)
  }

  // Full body outline touch-ups
  Q(6, 17, 1, 2, P.outline);
  Q(13, 17, 1, 2, P.outline);

  // Outfit overlays
  if (P.outfit === "trainer") drawTrainerCapFront(Q, P);
  else if (P.outfit === "labCoat") {
    drawLabCoatFront(Q, P);
    drawGlassesFront(Q, P);
  } else if (P.outfit === "officeCoat") drawOfficeCoatFront(Q, P);
}

// BACK VIEW
function drawCharBack(
  Q: (gx: number, gy: number, w: number, h: number, c: string) => void,
  P: CharPalette
) {
  // Full hair back
  Q(6, 3, 8, 1, P.outline);
  Q(5, 4, 10, 6, P.hair);
  Q(5, 4, 10, 1, P.hairDark);
  // Hair highlights
  Q(7, 5, 2, 1, shade(P.hair, 15));
  Q(11, 5, 2, 1, shade(P.hair, 15));
  Q(5, 4, 1, 6, P.outline);
  Q(14, 4, 1, 6, P.outline);
  Q(5, 9, 10, 1, P.hairDark);

  // Neck strip
  Q(9, 10, 2, 1, P.skinShadow);

  // Shirt back
  Q(6, 11, 8, 1, P.outline);
  Q(7, 11, 6, 1, P.shirtDark);
  Q(6, 12, 1, 3, P.outline);
  Q(13, 12, 1, 3, P.outline);
  Q(7, 12, 6, 3, P.shirt);
  Q(7, 12, 6, 1, P.shirtLight);
  Q(7, 14, 6, 1, P.shirtDark);

  // Arms
  Q(5, 12, 1, 3, P.outline);
  Q(14, 12, 1, 3, P.outline);
  Q(6, 12, 0.5, 3, P.shirtDark);
  Q(13.5, 12, 0.5, 3, P.shirtDark);

  // Pants + shoes (same as front)
  Q(6, 15, 8, 1, P.outline);
  Q(7, 15, 6, 2, P.pants);
  Q(7, 15, 6, 1, P.pantsDark);
  Q(9, 15, 2, 2, P.pantsDark);
  Q(7, 17, 2, 1, P.pants);
  Q(11, 17, 2, 1, P.pants);
  Q(6, 18, 3, 1, P.shoe);
  Q(11, 18, 3, 1, P.shoe);
  Q(6, 17, 1, 2, P.outline);
  Q(13, 17, 1, 2, P.outline);

  if (P.outfit === "trainer") drawTrainerCapBack(Q, P);
}

// SIDE VIEW (left = false means facing left, true = facing right; drawn as left then mirrored)
function drawCharSide(
  Q: (gx: number, gy: number, w: number, h: number, c: string) => void,
  facingRight: boolean,
  P: CharPalette
) {
  // We draw a leftward-facing profile using cols 6-13 and let the caller flip via facingRight
  // by swapping x offsets. Simpler: draw the same profile but "eye" position + hair sweep
  // reflect based on facingRight.
  const eyeCol = facingRight ? 11 : 8;
  const fringeSide = facingRight ? 6 : 13;
  const backSide = facingRight ? 13 : 6;

  // Hair block
  Q(6, 3, 8, 1, P.outline);
  Q(5, 4, 10, 1, P.hairDark);
  Q(5, 5, 10, 2, P.hair);
  Q(5, 4, 1, 3, P.outline);
  Q(14, 4, 1, 3, P.outline);
  // Highlight
  Q(facingRight ? 9 : 7, 4, 2, 1, shade(P.hair, 15));

  // Head skin
  Q(6, 7, 8, 1, P.outline);
  Q(6, 7, 1, 3, P.outline);
  Q(13, 7, 1, 3, P.outline);
  Q(7, 7, 6, 1, P.hair);
  Q(7, 8, 6, 2, P.skin);
  // Nose hint on facing side
  Q(facingRight ? 13 : 6, 8, 1, 1, P.skinShadow);
  // Fringe sweep on back side
  Q(backSide, 6, 1, 2, P.hair);
  // Ear on non-facing side
  Q(fringeSide, 8, 1, 1, P.hair);
  // Eye
  Q(eyeCol, 8, 1, 1, P.outline);
  // Chin
  Q(7, 10, 6, 1, P.outline);
  Q(8, 9, 4, 1, P.skinShadow);

  // Neck
  Q(9, 10, 2, 1, P.skinShadow);

  // Shirt
  Q(6, 11, 8, 1, P.outline);
  Q(7, 11, 6, 1, P.shirtDark);
  Q(6, 12, 1, 3, P.outline);
  Q(13, 12, 1, 3, P.outline);
  Q(7, 12, 6, 3, P.shirt);
  Q(7, 12, 6, 1, P.shirtLight);
  Q(7, 14, 6, 1, P.shirtDark);

  // Walking arm swing
  const armFrontCol = facingRight ? 13 : 6;
  const armBackCol = facingRight ? 6 : 13;
  const armSwing = P.walkFrame === 1 ? 1 : 0;
  Q(armFrontCol, 12 + armSwing, 1, 2, P.shirt);
  Q(armBackCol, 12 - armSwing, 1, 2, P.shirtDark);

  // Pants + shoes with walking split
  Q(6, 15, 8, 1, P.outline);
  Q(7, 15, 6, 2, P.pants);
  Q(7, 15, 6, 1, P.pantsDark);
  if (P.walkFrame === 0) {
    Q(8, 17, 1, 1, P.pants);
    Q(11, 17, 1, 1, P.pants);
    Q(7, 18, 3, 1, P.shoe);
    Q(10, 18, 3, 1, P.shoe);
  } else {
    // Slight step shift
    Q(7, 17, 2, 1, P.pants);
    Q(10, 17, 2, 1, P.pants);
    Q(6, 18, 3, 1, P.shoe);
    Q(11, 18, 3, 1, P.shoe);
  }
  Q(6, 17, 1, 2, P.outline);
  Q(13, 17, 1, 2, P.outline);

  if (P.outfit === "trainer") drawTrainerCapSide(Q, facingRight, P);
}

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
