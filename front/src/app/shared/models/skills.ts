import { Classes } from './classes';

export type PassiveSkillNames = { aprendiz: 'Aumentar dano' /* | 'Aumentar exp' | 'Aumentar zeny' */ };

// Define what can be improve by skills
export type UpgradableBySkills = 'damage'; /* | 'exp' | 'zeny' */

// Type for all passive skills that do not required activation to trigger an effect
export type PassiveSkill<T extends 'aprendiz' = 'aprendiz'> = {
  // TODO: Update this to get all classes names
  name: PassiveSkillNames[T];
  description: string;
  upgrade: UpgradableBySkills;
  level: number;
  gameClass: Classes;
  icon: string;
};

// TODO: improve this. It should become a game but for now it will not have all this complex logic

// export type Skills =
//   | {
//       name: NoviceSkillsName;
//       description: string;
//       icon: string;
//       class: Classes;
//       level: number;
//     } & (PassiveSKill | ActiveSkill);

// export type PassiveSKill = {
//   type: 'passive';
// } & (
//   | {
//       statIncreased: AttributesList | StatsList;
//       amount: { level: number } & Partial<Record<AttributesList | StatsList, number>>;
//     }
//   | {
//       statIncreased: Array<Partial<AttributesList | StatsList>>;
//       amount: Array<{ level: number } & Partial<Record<AttributesList | StatsList, number>>>;
//     }
// );

// /**
//  * This will return me the Attribute increased and an object with the amount of value increased by level
//  */
// export type AttributeIncreased = {
//   [Attribute in keyof Attributes]: {
//     [P in Attribute]: {
//       amount: number;
//     }['amount'];
//   };
// }[keyof Attributes];

// export type ActiveSkill = { type: 'active'; cost: number; duration: number };

// export type NoviceSkillsName = (typeof noviceSkillsName)[number];
