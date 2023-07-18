import { Attributes, AttributesAliases } from '@shared/models';

// Attribute List
export const attributesList: Array<keyof Attributes> = [
  'strength',
  'agility',
  'vitality',
  'inteligence',
  'dexterity',
  'luck',
];

export const attributeAliases = {
  strength: 'str',
  agility: 'agi',
  vitality: 'vit',
  inteligence: 'int',
  dexterity: 'dex',
  luck: 'luk',
} as const;
