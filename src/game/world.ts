// Tile-based world for the explore game.
// Larger map with buildings, tall-grass encounter zones, water, and paths.

export const TILE_SIZE = 40; // pixels per tile in the logical canvas
export const MAP_WIDTH = 40;
export const MAP_HEIGHT = 30;

export type TileType =
  | "grass"
  | "grassTuft"
  | "path"
  | "water"
  | "tree"
  | "flower"
  | "sand"
  | "sign"
  | "tallGrass"
  | "buildingRoof"
  | "buildingWall"
  | "buildingWindow"
  | "buildingDoor";

export interface Building {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  roofColor: string;
  wallColor: string;
  accentColor: string;
}

export const buildings: Building[] = [
  {
    x: 4,
    y: 3,
    w: 5,
    h: 4,
    label: "APi Group HQ",
    roofColor: "#8b3a3a",
    wallColor: "#e6d3b3",
    accentColor: "#5b2323",
  },
  {
    x: 17,
    y: 3,
    w: 6,
    h: 4,
    label: "Waterloo Hall",
    roofColor: "#324b6b",
    wallColor: "#d1dae5",
    accentColor: "#1f2f45",
  },
  {
    x: 31,
    y: 3,
    w: 5,
    h: 4,
    label: "Bharat Denim",
    roofColor: "#5b3a80",
    wallColor: "#e8ddf0",
    accentColor: "#3a2154",
  },
  {
    x: 17,
    y: 16,
    w: 6,
    h: 4,
    label: "Hackathon Arena",
    roofColor: "#a4571c",
    wallColor: "#f0dfc4",
    accentColor: "#6b3811",
  },
];

// Build the base tile grid procedurally so we don't have to hand-draw 1200 chars.
function generate(): TileType[][] {
  const map: TileType[][] = [];
  for (let y = 0; y < MAP_HEIGHT; y++) {
    const row: TileType[] = [];
    for (let x = 0; x < MAP_WIDTH; x++) {
      // Tree border
      if (x === 0 || y === 0 || x === MAP_WIDTH - 1 || y === MAP_HEIGHT - 1) {
        row.push("tree");
      } else {
        row.push("grass");
      }
    }
    map.push(row);
  }

  const fillRect = (
    x: number,
    y: number,
    w: number,
    h: number,
    tile: TileType
  ) => {
    for (let dy = 0; dy < h; dy++) {
      for (let dx = 0; dx < w; dx++) {
        if (
          y + dy > 0 &&
          y + dy < MAP_HEIGHT - 1 &&
          x + dx > 0 &&
          x + dx < MAP_WIDTH - 1
        ) {
          map[y + dy][x + dx] = tile;
        }
      }
    }
  };

  // Main horizontal path across the middle
  fillRect(1, 13, MAP_WIDTH - 2, 2, "path");

  // Vertical paths connecting each building's door to the main path
  for (const b of buildings) {
    const doorX = b.x + Math.floor(b.w / 2);
    // Path from below the building down to the main path (or up from it for south building)
    const doorY = b.y + b.h - 1; // door row
    if (b.y < 13) {
      fillRect(doorX, doorY + 1, 1, 13 - (doorY + 1), "path");
    } else {
      // south building: path goes from y=15 (below main path) down to building top
      fillRect(doorX, 15, 1, b.y - 15, "path");
    }
  }

  // Water pond (northeast of center)
  fillRect(24, 8, 4, 3, "water");

  // Tall-grass encounter zones (south of main path — the "wild area")
  fillRect(3, 21, 10, 6, "tallGrass");
  fillRect(27, 21, 10, 6, "tallGrass");

  // Smaller intro grass patch just south of the main path — easier to stumble into
  fillRect(15, 21, 8, 3, "tallGrass");

  // Sprinkle grass tufts and flowers
  const scatter: [number, number, TileType][] = [
    [2, 10, "flower"],
    [10, 11, "grassTuft"],
    [14, 10, "flower"],
    [22, 5, "grassTuft"],
    [29, 11, "flower"],
    [35, 10, "grassTuft"],
    [2, 17, "grassTuft"],
    [12, 18, "flower"],
    [24, 17, "grassTuft"],
    [37, 18, "flower"],
    [5, 28, "flower"],
    [35, 28, "flower"],
  ];
  for (const [x, y, t] of scatter) {
    if (map[y]?.[x] === "grass") map[y][x] = t;
  }

  // A wooden sign near spawn
  if (map[12][21] === "grass") map[12][21] = "sign";

  // Paint building tiles into the grid
  for (const b of buildings) {
    for (let dy = 0; dy < b.h; dy++) {
      for (let dx = 0; dx < b.w; dx++) {
        const x = b.x + dx;
        const y = b.y + dy;
        if (dy === 0) map[y][x] = "buildingRoof";
        else if (dy === b.h - 1 && dx === Math.floor(b.w / 2))
          map[y][x] = "buildingDoor";
        else if (dy === 1 && (dx === 1 || dx === b.w - 2))
          map[y][x] = "buildingWindow";
        else map[y][x] = "buildingWall";
      }
    }
  }

  return map;
}

export const worldMap: TileType[][] = generate();

export const isSolid = (tile: TileType): boolean =>
  tile === "tree" ||
  tile === "water" ||
  tile === "sign" ||
  tile === "buildingRoof" ||
  tile === "buildingWall" ||
  tile === "buildingWindow";

// Doors are technically solid for movement (no interiors yet) but rendered differently.
// Adjust here if you later add interiors.

export const isTallGrass = (tile: TileType): boolean => tile === "tallGrass";

// Player spawn — on the main path near the center
export const SPAWN = { x: 20, y: 14 };
