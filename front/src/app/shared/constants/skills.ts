// import { NoviceSkillsName, PassiveSKill, Skills } from '@shared/models';

import { Classes, NoviceSkillsName, PassiveSkill, PassiveSkillNames, UpgradableBySkills } from '@shared/models';

/**
 * Mocked skills
 * TODO: Create all novice skills
 * TODO: Create all other classes skills (Passive & Active)
 * TODO: Get all skills from backend
 */
export const noviceSkillsName: ReadonlyArray<PassiveSkillNames['aprendiz']> = [
  'Aumentar dano',
  'Ataque Duplo',
] as const;

// Mocked skills for testing in frontend
export const noviceSkillsList: Record<NoviceSkillsName, PassiveSkill> = {
  'Aumentar dano': {
    name: 'Aumentar dano',
    gameClass: 'aprendiz',
    description: `Aumenta a perícia com armas aumentando o seu dano a cada level.
    Ganha +3 de dano por nível.`,
    increaseAmount: 3,
    level: 0,
    icon: '',
    upgrade: 'damage',
  },
  'Ataque Duplo': {
    name: 'Ataque Duplo',
    gameClass: 'aprendiz',
    description: `Aumenta a chance de realizar um ataque duplo a cada level.
    Chance +2% por nível.`,
    increaseAmount: 2,
    level: 0,
    icon: '',
    upgrade: 'chance',
  },

  // 'Aumentar exp recebida': {
  //   name: 'Aumentar exp recebida',
  //   class: 'Novice',
  //   description: `Aumenta a exp recebida a cada level de skill.
  //     A partir do level 1, ganhará +5% de exp por monstro derrotado.
  //     A partir do level 5, além dos +15% de exp por monstro derrotado.
  //     A partir do level 15, ganhará +50% de exp por monstro derrotado.`,
  //   level: 0,
  //   icon: '',
  //   type: 'passive',
  //   statIncreased: ['exp'],
  //   amount: [
  //     { level: 1, exp: 5 },
  //     { level: 5, exp: 15 },
  //     { level: 15, exp: 50 },
  //   ],
  // },
};

// TODO: Remove partial later when all classes are done
export const skillEffectAlias: Partial<Record<Classes, Record<UpgradableBySkills, string>>> = {
  aprendiz: {
    damage: 'dano',
    chance: 'chance',
  },
};
