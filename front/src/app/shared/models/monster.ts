// Monster Data
export type MonsterData = {
  life: number;
  id: number;
  exp: {
    base: number;
    job: number;
  };
};

// Monster request from Divine-Pride
export type MonsterRequest = {
  id: number;
  name: string;
  stats: MonsterRequestStats;
  slaves: any[];
  sounds: string[];
  questObjective: number[];
  drops: Drop[];
  mvpdrops: any[];
  spawn: Spawn[];
  skill: Skill[];
};

export type MonsterRequestStats = {
  attackRange: number;
  level: number;
  health: number;
  str: number;
  _int: number;
  vit: number;
  dex: number;
  agi: number;
  luk: number;
  attack: Attack;
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
  _class: number;
};

export type Attack = {
  minimum: number;
  maximum: number;
};

export type Drop = {
  itemId: number;
  chance: number;
  stealProtected: boolean;
};

export type Spawn = {
  mapname: string;
  amount: number;
  respawnTime: number;
};

export type Skill = {
  skillId: number;
  status: string;
  level: number;
  chance: number;
  casttime: number;
  delay: number;
  interruptable: boolean;
  condition: any;
  conditionValue: any;
};
