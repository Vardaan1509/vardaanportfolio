// Tile-based world for the explore game.
// Gen 3 Pokemon-inspired styling: 5-tile-wide houses with 2-row tiled roofs.

export const TILE_SIZE = 40;
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
  | "buildingRoofTop"
  | "buildingRoofBase"
  | "buildingWall"
  | "buildingWindow"
  | "buildingDoor"
  | "doorStep";

export interface Building {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  roofColor: string;
  roofShadow: string;
  wallColor: string;
  wallShadow: string;
}

// Ruby/Sapphire-style palette per building
export const buildings: Building[] = [
  {
    x: 4,
    y: 3,
    w: 5,
    h: 4,
    label: "APi Group HQ",
    roofColor: "#e88a4a",
    roofShadow: "#a85220",
    wallColor: "#f0dcb4",
    wallShadow: "#a88860",
  },
  {
    x: 17,
    y: 3,
    w: 6,
    h: 4,
    label: "University of Waterloo",
    roofColor: "#c86868",
    roofShadow: "#803838",
    wallColor: "#e8dcc4",
    wallShadow: "#907864",
  },
  {
    x: 31,
    y: 3,
    w: 5,
    h: 4,
    label: "Bharat Denim",
    roofColor: "#8878b8",
    roofShadow: "#504878",
    wallColor: "#eee0e8",
    wallShadow: "#8878a0",
  },
  {
    x: 17,
    y: 16,
    w: 6,
    h: 4,
    label: "Hackathon Arena",
    roofColor: "#e8a860",
    roofShadow: "#a06830",
    wallColor: "#f0d8a8",
    wallShadow: "#a88060",
  },
];

function generate(): TileType[][] {
  const map: TileType[][] = [];
  for (let y = 0; y < MAP_HEIGHT; y++) {
    const row: TileType[] = [];
    for (let x = 0; x < MAP_WIDTH; x++) {
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

  // Vertical paths connecting each building's door
  for (const b of buildings) {
    const doorX = b.x + Math.floor(b.w / 2);
    const doorY = b.y + b.h - 1;
    if (b.y < 13) {
      fillRect(doorX, doorY + 1, 1, 13 - (doorY + 1), "path");
    } else {
      fillRect(doorX, 15, 1, b.y - 15, "path");
    }
  }

  // Water pond
  fillRect(24, 8, 4, 3, "water");

  // Tall grass encounter zones
  fillRect(3, 21, 10, 6, "tallGrass");
  fillRect(27, 21, 10, 6, "tallGrass");
  fillRect(15, 21, 8, 3, "tallGrass");

  // Flowers in patches (like the screenshot)
  const flowerPatches: [number, number][] = [
    [2, 10], [3, 10], [2, 11],
    [10, 11], [11, 11],
    [14, 10], [15, 10],
    [29, 11], [30, 11],
    [35, 10], [36, 10], [35, 11],
    [2, 17], [3, 17], [2, 18],
    [12, 18], [13, 18],
    [24, 17], [25, 17],
    [37, 18], [36, 18],
    [5, 28], [6, 28],
    [34, 28], [35, 28],
  ];
  const tufts: [number, number][] = [
    [10, 5], [22, 5], [14, 12], [26, 12], [4, 19], [33, 19], [8, 25], [30, 25],
  ];
  for (const [x, y] of flowerPatches) {
    if (map[y]?.[x] === "grass") map[y][x] = "flower";
  }
  for (const [x, y] of tufts) {
    if (map[y]?.[x] === "grass") map[y][x] = "grassTuft";
  }

  // Paint building tiles
  for (const b of buildings) {
    for (let dy = 0; dy < b.h; dy++) {
      for (let dx = 0; dx < b.w; dx++) {
        const x = b.x + dx;
        const y = b.y + dy;
        if (dy === 0) map[y][x] = "buildingRoofTop";
        else if (dy === 1) map[y][x] = "buildingRoofBase";
        else if (dy === b.h - 1 && dx === Math.floor(b.w / 2))
          map[y][x] = "buildingDoor";
        else if (
          dy === b.h - 2 &&
          (dx === 1 || dx === b.w - 2)
        )
          map[y][x] = "buildingWindow";
        else map[y][x] = "buildingWall";
      }
    }
    // Doorstep tile directly in front of the door
    const doorX = b.x + Math.floor(b.w / 2);
    const stepY = b.y + b.h;
    if (stepY < MAP_HEIGHT - 1 && map[stepY][doorX] !== "path") {
      map[stepY][doorX] = "doorStep";
    }
  }

  // A mailbox-style sign near spawn
  if (map[12][21] === "grass") map[12][21] = "sign";
  if (map[15][6] === "path") {
    // small sign placed on grass instead
  }
  if (map[15][10] === "grass") map[15][10] = "sign";
  if (map[15][30] === "grass") map[15][30] = "sign";

  // ============ HIDDEN DEV ROOM ============
  // A small enclosed clearing in the SE corner accessed by finding one lone
  // tall-grass tile amid the regular grass south of the SE encounter zone.
  const setTile = (x: number, y: number, t: TileType) => {
    if (map[y]?.[x] !== undefined) map[y][x] = t;
  };
  // Frame trees around the entrance and room
  setTile(33, 26, "tree");
  setTile(37, 26, "tree");
  setTile(34, 27, "tree");
  setTile(36, 27, "tree");
  setTile(33, 28, "tree");
  setTile(37, 28, "tree");
  // The hidden path — a single tall-grass tile that keeps going south
  setTile(35, 27, "tallGrass");

  return map;
}

export const worldMap: TileType[][] = generate();

export const isSolid = (tile: TileType): boolean =>
  tile === "tree" ||
  tile === "water" ||
  tile === "sign" ||
  tile === "buildingRoofTop" ||
  tile === "buildingRoofBase" ||
  tile === "buildingWall" ||
  tile === "buildingWindow";

export const isTallGrass = (tile: TileType): boolean => tile === "tallGrass";

export const SPAWN = { x: 20, y: 14 };
