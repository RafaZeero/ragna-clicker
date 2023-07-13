export interface MonsterRequest {
  id: number;
  name: string;
  stats: Stats;
  slaves: any[];
  sounds: string[];
  questObjective: number[];
  drops: Drop[];
  mvpdrops: any[];
  spawn: Spawn[];
  skill: Skill[];
}

export interface Stats {
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
}

export interface Attack {
  minimum: number;
  maximum: number;
}

export interface Drop {
  itemId: number;
  chance: number;
  stealProtected: boolean;
}

export interface Spawn {
  mapname: string;
  amount: number;
  respawnTime: number;
}

export interface Skill {
  skillId: number;
  status: string;
  level: number;
  chance: number;
  casttime: number;
  delay: number;
  interruptable: boolean;
  condition: any;
  conditionValue: any;
}
