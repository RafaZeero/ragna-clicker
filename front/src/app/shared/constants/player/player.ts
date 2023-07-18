import { Player } from '@shared/models';

export const defaultPlayer: Player = {
  name: 'Rafael',
  class: 'Sicário',
  attributes_to_spend: 5,
  attributes: {
    strength: 1,
    agility: 1,
    dexterity: 1,
    inteligence: 1,
    luck: 1,
    vitality: 1,
  },
  level: {
    base: 1,
    job: 1,
  },
  exp: {
    current: { base: 0, job: 0 },
    toLevelUp: { base: 350, job: 30 },
  },
  stats: {
    damage: {
      base: 13,
      weapon: 0,
    },
  },
};
