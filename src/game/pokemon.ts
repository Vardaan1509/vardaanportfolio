// Pokemon data: species definitions, encounters, battles, team management.

export type PokemonType =
  | "electric"
  | "fire"
  | "water"
  | "grass"
  | "rock"
  | "flying"
  | "tech"
  | "legendary";

export interface PokemonSpecies {
  id: string;
  name: string;
  type: PokemonType;
  primary: string;
  secondary: string;
  shape: "blob" | "bug" | "sparky" | "aqua" | "brick" | "leaf";
  // Used to color the pokemon frame; overrides shape color when set.
  isLegendary?: boolean;
}

export interface Pokemon {
  species: PokemonSpecies;
  level: number;
  uid: string;
}

export const SPECIES: Record<string, PokemonSpecies> = {
  // Starters offered by Prof. Chen
  reactle: {
    id: "reactle",
    name: "Reactle",
    type: "tech",
    primary: "#22d3ee",
    secondary: "#0e7490",
    shape: "blob",
  },
  nodemin: {
    id: "nodemin",
    name: "Nodemin",
    type: "grass",
    primary: "#84cc16",
    secondary: "#365314",
    shape: "sparky",
  },
  cloudpup: {
    id: "cloudpup",
    name: "Cloudpup",
    type: "water",
    primary: "#94a3b8",
    secondary: "#475569",
    shape: "aqua",
  },

  // NPC-gift pokemon
  codeling: {
    id: "codeling",
    name: "Codeling",
    type: "tech",
    primary: "#38bdf8",
    secondary: "#0369a1",
    shape: "blob",
  },
  deploybug: {
    id: "deploybug",
    name: "Deploybug",
    type: "tech",
    primary: "#f472b6",
    secondary: "#831843",
    shape: "bug",
  },
  datamouse: {
    id: "datamouse",
    name: "Datamouse",
    type: "electric",
    primary: "#facc15",
    secondary: "#854d0e",
    shape: "sparky",
  },
  buildo: {
    id: "buildo",
    name: "Buildo",
    type: "rock",
    primary: "#a3a3a3",
    secondary: "#3f3f46",
    shape: "brick",
  },
  bytebit: {
    id: "bytebit",
    name: "Bytebit",
    type: "tech",
    primary: "#e879f9",
    secondary: "#86198f",
    shape: "brick",
  },

  // Wild-only pokemon
  leafling: {
    id: "leafling",
    name: "Leafling",
    type: "grass",
    primary: "#4ade80",
    secondary: "#166534",
    shape: "leaf",
  },
  emberling: {
    id: "emberling",
    name: "Emberling",
    type: "fire",
    primary: "#fb923c",
    secondary: "#9a3412",
    shape: "blob",
  },
  aquapaw: {
    id: "aquapaw",
    name: "Aquapaw",
    type: "water",
    primary: "#60a5fa",
    secondary: "#1e40af",
    shape: "aqua",
  },
  sparkbee: {
    id: "sparkbee",
    name: "Sparkbee",
    type: "electric",
    primary: "#fde047",
    secondary: "#713f12",
    shape: "sparky",
  },
  weedie: {
    id: "weedie",
    name: "Weedie",
    type: "grass",
    primary: "#84cc16",
    secondary: "#365314",
    shape: "leaf",
  },
  // Flying-type wild
  skyling: {
    id: "skyling",
    name: "Skyling",
    type: "flying",
    primary: "#a5f3fc",
    secondary: "#0e7490",
    shape: "bug",
  },
  // Rock-type wild
  rockjaw: {
    id: "rockjaw",
    name: "Rockjaw",
    type: "rock",
    primary: "#a8a29e",
    secondary: "#44403c",
    shape: "brick",
  },

  // LEGENDARY — 1 in 30 wild encounter, always high-level
  compileon: {
    id: "compileon",
    name: "Compileon",
    type: "legendary",
    primary: "#fde047", // brilliant gold
    secondary: "#78350f",
    shape: "sparky",
    isLegendary: true,
  },
};

export const WILD_POOL: string[] = [
  "leafling",
  "emberling",
  "aquapaw",
  "sparkbee",
  "weedie",
  "codeling",
  "skyling",
  "rockjaw",
];

export const LEGENDARY_POOL: string[] = ["compileon"];
export const LEGENDARY_CHANCE = 1 / 30;

let uidCounter = 1;
export const makePokemon = (
  speciesId: string,
  levelOverride?: number
): Pokemon => {
  const species = SPECIES[speciesId];
  const level = levelOverride ?? randomLevel();
  return { species, level, uid: `${species.id}-${uidCounter++}` };
};

export const randomLevel = (): number => 1 + Math.floor(Math.random() * 10);

export const rollWildEncounter = (): Pokemon => {
  const isLegendary = Math.random() < LEGENDARY_CHANCE;
  if (isLegendary) {
    const id = LEGENDARY_POOL[Math.floor(Math.random() * LEGENDARY_POOL.length)];
    const level = 12 + Math.floor(Math.random() * 8); // 12..19
    return makePokemon(id, level);
  }
  const id = WILD_POOL[Math.floor(Math.random() * WILD_POOL.length)];
  return makePokemon(id);
};

// Battle rule: higher level wins. Ties go to the player.
export const resolveBattle = (
  yours: Pokemon,
  wild: Pokemon
): "win" | "lose" => {
  if (yours.level >= wild.level) return "win";
  return "lose";
};

// Adds a caught pokemon to the team. If a same-species pokemon already exists,
// their levels stack (up to a soft cap of 99 so numbers stay readable).
export const addToTeam = (team: Pokemon[], caught: Pokemon): Pokemon[] => {
  const existingIdx = team.findIndex((p) => p.species.id === caught.species.id);
  if (existingIdx === -1) return [...team, caught];
  return team.map((p, i) =>
    i === existingIdx ? { ...p, level: Math.min(99, p.level + caught.level) } : p
  );
};

export const hasLegendary = (team: Pokemon[]): boolean =>
  team.some((p) => p.species.isLegendary);
