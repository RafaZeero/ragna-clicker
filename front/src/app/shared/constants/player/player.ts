import { AttributesAliases, AttributesList, Player } from '@shared/models';
import { noviceSkillsList } from '../skills';

export const defaultPlayer: Player = {
  name: 'Rafael',
  class: 'aprendiz',
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
    passive: noviceSkillsList,
    // active: null,
    skills_to_spend: 3,
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
      skills: 0,
    },
  },
};

export const attributeMapping: Record<AttributesList, AttributesAliases> = {
  strength: 'for',
  agility: 'agi',
  vitality: 'vit',
  inteligence: 'int',
  dexterity: 'des',
  luck: 'sor',
};
