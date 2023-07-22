import { PassiveSKill, Skills } from '@shared/models';

// Mocked skills for testing in frontend
export const novice = {
  'Perícia com armas': {
    name: 'Perícia com armas',
    class: 'Novice',
    description: `Aumenta a perícia com armas aumentando o seu dano a cada level.
      A partir do level 1, ganhará +3 str. 
      A partir do level 5, além dos +3 str, ganhará +2 luk. 
      A partir do level 15, ganhará +6 dex.`,
    icon: '',
    type: 'passive',
    statIncreased: ['strength', 'luck', 'dexterity'],
    amount: [
      { level: 1, strength: 3 },
      { level: 5, luck: 2 },
      { level: 15, dexterity: 6 },
    ],
  },
};
