import { Player } from '@shared/models';
import { random } from 'lodash';

export const useSKill = (player: Player) => {
  // Creating code for double atk
  // const baseDamage = player.stats.damage.base;
  return {
    doubleAttack: (currentDamage: number) => {
      // Get chance
      const chance = player.skills.passive['Ataque Duplo'].level * player.skills.passive['Ataque Duplo'].increaseAmount;
      const test = random(0, 100);

      const castSkill = chance > test;

      // Calculate damage
      const damage = castSkill ? currentDamage * 2 : currentDamage;

      console.log({ chance, test, damage });
      return { damage, castSkill };
    },
  };
};
