import { Player } from '@shared/models';

export const defaultPlayer: Player = {
  name: 'Rafael',
  class: 'Sicário',
  attributes: {
    strength: 3,
    agility: 5,
    dexterity: 3,
    inteligence: 4,
    luck: 1,
    vitality: 1,
  },
  level: {
    base: 1,
    job: 1,
  },
  exp: {
    current: { base: 0, job: 0 },
    toLevelUp: { base: 30, job: 270 },
  },
  stats: {
    damage: {
      base: 13,
      weapon: 0,
    },
  },
};

export const expToLevelUp: Record<'base' | 'job', Record<string, number>> = {
  base: {
    // Level: expToLevelUp
    '1': 30,
    '2': 55,
    '3': 80,
  },
  job: {
    '1': 80,
    '2': 121,
    '3': 153,
  },
};
