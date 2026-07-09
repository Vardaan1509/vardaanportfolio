// Pokemon data: species definitions + wild encounter helpers.

export type PokemonType = "electric" | "fire" | "water" | "grass" | "rock" | "tech";

export interface PokemonSpecies {
  id: string;
  name: string;
  type: PokemonType;
  // Two body colors used by the sprite renderer.
  primary: string;
  secondary: string;
  // "shape" hint drives which sprite variant is drawn.
  shape: "blob" | "bug" | "sparky" | "aqua" | "brick" | "leaf";
}

// A caught / owned pokemon: species + rolled level.
export interface Pokemon {
  species: PokemonSpecies;
  level: number;
  uid: string;
}

export const SPECIES: Record<string, PokemonSpecies> = {
  // NPC-gift pokemon — themed to each contact
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

  // Wild pokemon — found in tall grass
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
};

export const WILD_POOL: string[] = [
  "leafling",
  "emberling",
  "aquapaw",
  "sparkbee",
  "weedie",
];

let uidCounter = 1;
export const makePokemon = (
  speciesId: string,
  levelOverride?: number
): Pokemon => {
  const species = SPECIES[speciesId];
  const level = levelOverride ?? randomLevel();
  return { species, level, uid: `${species.id}-${uidCounter++}` };
};

export const randomLevel = (): number => 1 + Math.floor(Math.random() * 10); // 1..10

export const rollWildEncounter = (): Pokemon => {
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
