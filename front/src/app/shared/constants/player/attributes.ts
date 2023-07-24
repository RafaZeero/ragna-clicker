import { Attributes, AttributesAliases } from '@shared/models';

// Attribute List
export const attributesList = ['strength', 'agility', 'vitality', 'inteligence', 'dexterity', 'luck'] as const;

export const statsList = ['exp', 'gold'] as const;

export const attributeAliases = {
  strength: 'str',
  agility: 'agi',
  vitality: 'vit',
  inteligence: 'int',
  dexterity: 'dex',
  luck: 'luk',
} as const;

// Attributes points gained to spend per level
export const POINTS_PER_LEVEL = { attributes: 3, skills: 1 } as const;
