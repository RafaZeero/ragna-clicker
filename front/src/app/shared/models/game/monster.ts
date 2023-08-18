import { Experience } from './commons';
import { Attributes } from './player';

// Monster Data

export interface MonsterData {
  id: number;
  name: string;
  stats: Stats;
  exp: Experience;
}
export type MonsterResponseFromAPI = {
  response: {
    monsterImage: string;
    monsterData: MonsterData;
  };
};

type Stats = {
  hp: number;
  attributes: Attributes;
  defense: number;
};
