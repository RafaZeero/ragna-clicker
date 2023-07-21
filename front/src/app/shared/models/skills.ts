import { attributesList } from '../constants/player';
import { Classes } from './classes';
import { Attributes } from './player';

export type Skills =
  | {
      name: string;
      description: string;
      icon: string;
      class: Classes;
    } & (PassiveSKill | ActiveSkill);

export type PassiveSKill = {
  type: 'passive';
} & (
  | {
      statIncreased: (typeof attributesList)[number];
      amount: { level: number } & Partial<Record<(typeof attributesList)[number], number>>;
    }
  | {
      statIncreased: Array<Partial<(typeof attributesList)[number]>>;
      amount: Array<{ level: number } & Partial<Record<(typeof attributesList)[number], number>>>;
    }
);

/**
 * This will return me the Attribute increased and an object with the amount of value increased by level
 */
export type AttributeIncreased = {
  [Attribute in keyof Attributes]: {
    [P in Attribute]: {
      amount: number;
    }['amount'];
  };
}[keyof Attributes];

export type ActiveSkill = { type: 'active'; cost: number; duration: number };
