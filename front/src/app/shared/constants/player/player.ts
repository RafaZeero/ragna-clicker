import { Player } from '@shared/models';
import { novice } from '../skills';

export const defaultPlayer: Player = {
  name: 'Rafael',
  class: 'Aprendiz',
  attributes_to_spend: 9,
  attributes: {
    strength: 1,
    agility: 1,
    dexterity: 1,
    inteligence: 1,
    luck: 1,
    vitality: 1,
  },
  skills: {
    skill_list: {
      'Perícia com armas': novice['Perícia com armas'],
    },
    skill_points: 3,
    skills_player_has: [{ name: 'Perícia com armas', level: 1 }],
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
      base: 2,
      weapon: 0,
    },
  },
};
