import { Experience, Level } from './commons';

export type Player = {
  /**
   * Player name
   */
  name: string;
  // Todo: make classes with skills
  class: string;
  /**
   * How many points player have to add in attributes when level up
   */
  attributes_to_spend: number;
  /**
   * List of attributes to create you own build
   */
  attributes: Attributes;
  /**
   * Secondary stats to do damage, resist spells, drop chance, etc
   * TODO: Improve this
   */
  stats: {
    damage: {
      base: number;
      weapon: number;
    };
  };
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

export type AttributesAliases = 'str' | 'agi' | 'vit' | 'int' | 'dex' | 'luk';
