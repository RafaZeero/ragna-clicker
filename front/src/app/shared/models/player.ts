import { attributesList, statsList } from '@shared/constants';
import { ClassGroup, Classes, NoviceSkillsName } from './classes';
import { Experience, Level } from './commons';
import { PassiveSkill } from './skills';

export type Player = {
  /**
   * Player name
   */
  name: string;
  // Todo: make classes with skills
  class: Classes;
  classGroup: ClassGroup;

  /**
   * List of attributes to create you own build
   */
  attributes: {
    /**
     * How many points player have to add in attributes when level up
     */
    attributes_to_spend: number;
    values: Attributes;
  };

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
  /**
   * The currency of the game: Zenys
   */
  zenys: number;
  /**
   * TODO: Equipments
   */
  equips?: {
    head: {
      upper: Equip | null;
      middle: Equip | null;
      lower: Equip | null;
    };
    armor: Equip | null;
    hand: {
      right_hand: Equip | null;
      left_hand: Equip | null;
      both?: Equip | null;
    };
    shoes: Equip | null;
    garment: Equip | null;
    accessory: {
      left: Equip | null;
      right: Equip | null;
    };
  };
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

export type AttributesAliases = 'for' | 'agi' | 'vit' | 'int' | 'des' | 'sor';

export type Damages = {
  base: number;
  weapon: number;
  /**
   * For the sake of simplicity, I'm adding just the total number for the skills instead of
   * an object with specific value for each skill
   */
  skills: number;
};

export type Equip = {
  id: number;
  name: string;
  description: string;
  slots: 0 | 1 | 2 | 3 | 4;
  attack: number | null;
  defense: number | null;
  requiredLevel: number | null;
  location: EquipLocation;
};

export type EquipLocation =
  | 'upper'
  | 'middle'
  | 'lower'
  | 'armor'
  | 'garment'
  | 'shoes'
  | 'accessory'
  | 'right'
  | 'left'
  | 'both';
