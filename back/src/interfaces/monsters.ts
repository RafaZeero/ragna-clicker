import { Attributes } from './attributes';

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
    magicDefense: number;
    attributes: Attributes;
  };
  type: {
    element: string;
    elementLevel: number;
  };
};

// Monster request from Planet-scale DB
export type MonsterRequest = {
  name_english: string;
  level: number;
  hp: number;
  /** Stats */
  str: number | null;
  int: number | null;
  vit: number | null;
  dex: number | null;
  agi: number | null;
  luk: number | null;
  /** Secondary stats */
  defense: number;
  magic_defense: number;
  /** Experience */
  base_exp: number;
  job_exp: number;
  /** Monster type */
  element: string /** TODO: monster elements type */;
  element_level: number;
};
