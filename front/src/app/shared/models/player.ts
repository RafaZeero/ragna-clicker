import { attributesList, statsList } from '@shared/constants';
import { NoviceSkillsName } from './classes';
import { Experience, Level } from './commons';
import { PassiveSkill } from './skills';

export type Player = {
  /**
   * Player name
   */
  name: string;
  // Todo: make classes with skills
  class: string;
  /**
   * TODO: Move to attributes type
   * How many points player have to add in attributes when level up
   */
  attributes_to_spend: number;
  /**
   * List of attributes to create you own build
   */
  attributes: Attributes;

  /**
   * List of skills that player acumulates by upgrading from novice to the other classes
   */
  skills: {
    passive: Record<NoviceSkillsName, PassiveSkill>;
    // TODO: active skills
    // active: ActiveSkill;
    skills_to_spend: number;
  };

  /**
   * Secondary stats to do damage, resist spells, drop chance, etc
   * TODO: Improve this
   */
  stats: Stats;
  /**
   * Experience points.
   * Current experience points value
   * Total experience needed to level up
   */
  exp: {
    current: Experience;
    toLevelUp: Experience;
  };
  /**
   * Current level. Base level and Job level
   */
  level: Level;
};

export type Stats = {
  damage: Damages;
};

export type Attributes = {
  strength: number;
  agility: number;
  vitality: number;
  inteligence: number;
  dexterity: number;
  luck: number;
};

export type AttributesList = (typeof attributesList)[number];
export type StatsList = (typeof statsList)[number];

export type AttributesAliases = 'str' | 'agi' | 'vit' | 'int' | 'dex' | 'luk';

export type Damages = {
  base: number;
  weapon: number;
};
