import { novice } from '../constants/skills';
import { Experience, Level } from './commons';
import { Skills } from './skills';

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
   * TODO: this
   */
  skills: {
    skill_points: number;
    // Change this
    skill_list: typeof novice;
    skills_player_has: [{ name: keyof typeof novice; level: number }];
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

export type AttributesAliases = 'str' | 'agi' | 'vit' | 'int' | 'dex' | 'luk';

export type Damages = {
  base: number;
  weapon: number;
};
