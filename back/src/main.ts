export type Attributes = {
  strength: number;
  agility: number;
  vitality: number;
  inteligence: number;
  dexterity: number;
  luck: number;
};

export type MonsterRequestStats = {
  attackRange: number;
  level: number;
  health: number;
  str: number;
  int: number;
  vit: number;
  dex: number;
  agi: number;
  luk: number;
  defense: number;
  baseExperience: number;
  jobExperience: number;
  aggroRange: number;
  escapeRange: number;
  movementSpeed: number;
  attackSpeed: number;
  attackedSpeed: number;
  element: number;
  scale: number;
  race: number;
  magicDefense: number;
  hit: number;
  flee: number;
  ai: string;
  mvp: number;
  class: number;
};

// Monster Data
export type MonsterData = {
  name: string;
  id: number;
  exp: {
    base: number;
    job: number;
  };
  stats: {
    hp: number;
    defense: number;
    attributes: Attributes;
  };
};

// Monster request from Divine-Pride
export type MonsterRequest = {
  id: number;
  name: string;
  stats: MonsterRequestStats;
};
