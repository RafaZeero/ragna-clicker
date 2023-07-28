import { AttributesAliases, AttributesList } from '@shared/models';

// Attribute List
export const attributesList = ['strength', 'agility', 'vitality', 'inteligence', 'dexterity', 'luck'] as const;

export const statsList = ['exp', 'zeny'] as const;

export const attributeAliases = {
  strength: 'str',
  agility: 'agi',
  vitality: 'vit',
  inteligence: 'int',
  dexterity: 'dex',
  luck: 'luk',
} as const;

export const attributeMapping: Record<AttributesList, AttributesAliases> = {
  strength: 'for',
  agility: 'agi',
  vitality: 'vit',
  inteligence: 'int',
  dexterity: 'des',
  luck: 'sor',
};
