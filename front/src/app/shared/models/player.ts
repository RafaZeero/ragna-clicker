import { Experience, Level } from './commons';

export type Player = {
  attributes: Attributes;
  stats: {
    damage: {
      base: number;
      weapon: number;
    };
  };
  exp: {
    current: Experience;
    toLevelUp: Experience;
  };
  level: Level;
};

export type Stats = {
  // TODO
};

export type Attributes = {
  strength: number;
  agility: number;
  vitality: number;
  inteligence: number;
  dexterity: number;
  luck: number;
};
