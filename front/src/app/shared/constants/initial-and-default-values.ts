import { Player } from '@shared/models';
import { noviceSkillsList } from './skills';

/** *** EXPERIENCE *** **/
export const DEFAULT_EXP: Player['exp'] = {
  current: { base: 0, job: 0 },
  toLevelUp: { base: 350, job: 30 },
};

/** *** LEVELS *** **/
export const DEFAULT_LEVELS = {
  base: 1,
  job: 1,
};

/** *** SKILLS *** **/
// Skill points for level 1 Player
export const INITIAL_SKILL_POINTS = 3 as const;
export const DEFAULT_SKILLS: Player['skills'] = {
  passive: noviceSkillsList,
  // active: null,
  skills_to_spend: INITIAL_SKILL_POINTS,
};

/** *** ATTRIBUTES *** **/
// Attributes points for level 1 Player
export const INITIAL_ATTRIBUTES_POINTS = 1 as const;
export const INITIAL_ATTRIBUTES_TO_SPEND = 3 as const;
export const DEFAULT_ATTRIBUTES: Player['attributes'] = {
  values: {
    strength: INITIAL_ATTRIBUTES_POINTS,
    agility: INITIAL_ATTRIBUTES_POINTS,
    dexterity: INITIAL_ATTRIBUTES_POINTS,
    inteligence: INITIAL_ATTRIBUTES_POINTS,
    luck: INITIAL_ATTRIBUTES_POINTS,
    vitality: INITIAL_ATTRIBUTES_POINTS,
  },
  attributes_to_spend: INITIAL_ATTRIBUTES_TO_SPEND,
};

/** *** STATS *** **/
// Stats points for level 1 Player
export const INITIAL_BASE_DAMAGE = 3 as const;
export const INITIAL_WEAPON_DAMAGE = 0 as const;
export const INITIAL_SKILLS_DAMAGE = 0 as const;

export const DEFAULT_STATS: Player['stats'] = {
  damage: {
    base: INITIAL_BASE_DAMAGE,
    weapon: INITIAL_WEAPON_DAMAGE,
    skills: INITIAL_SKILLS_DAMAGE,
  },
};
