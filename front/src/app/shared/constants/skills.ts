import { PassiveSKill, Skills } from '@shared/models';

// Mocked skills for testing in frontend
export const novice: Array<Skills> = [
  {
    name: 'Perícia com armas',
    class: 'Novice',
    description: 'Increase damage for 7 seconds',
    icon: '',
    type: 'passive',
    statIncreased: ['agility'],
    amount: [
      { level: 1, strength: 3 },
      { level: 5, luck: 2 },
      { level: 15, dexterity: 6 },
    ],
  },
];
