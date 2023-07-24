import { POINTS_PER_LEVEL, expToLevelUp } from '@shared/constants';
import { Damages, Player } from '@shared/models';
import { meleeAtk } from '@shared/utils';

export const expNeededToLevelUp = (currentPlayerLevel: Player['level']): Player['exp']['toLevelUp'] => ({
  base: expToLevelUp.base[currentPlayerLevel.base.toString()],
  job: expToLevelUp.job[currentPlayerLevel.job.toString()],
});

export const makeChangeLevelAndExp = (player: Player) => () => {
  const currentPlayerLevel: Player['level'] = player.level;
  const currentPlayerExp: Player['exp']['current'] = player.exp.current;
  // const expNeeded: Player['exp']['toLevelUp'] = expNeededToLevelUp(currentPlayerLevel);
  const expNeeded: Player['exp']['toLevelUp'] = {
    base: expToLevelUp.base[currentPlayerLevel.base.toString()],
    job: expToLevelUp.job[currentPlayerLevel.job.toString()],
  };

  const hasLeveled = { base: false, job: false };

  // Validations
  const checkExp = {
    base: currentPlayerExp.base >= expNeeded.base,
    job: currentPlayerExp.job >= expNeeded.job,
  };
  // Check base exp
  if (checkExp.base) {
    hasLeveled.base = true;
    currentPlayerExp.base -= expNeeded.base;
    currentPlayerLevel.base++;
  }

  // Check job exp
  if (checkExp.job) {
    hasLeveled.job = true;
    currentPlayerExp.job -= expNeeded.job;
    currentPlayerLevel.job++;
  }

  // Return new Player level if leveled up

  return { level: currentPlayerLevel, exp: currentPlayerExp, hasLeveled };
};

export const makeChangeAttributesAvailable = (player: Player) => () => {
  const currentPoints: Player['attributes_to_spend'] = player.attributes_to_spend;
  // Sum with points per level
  const updatedPoints = currentPoints + POINTS_PER_LEVEL.attributes;

  return updatedPoints;
};

export const makeChangeSkillPointsAvailable = (player: Player) => () => {
  // TODO!!
};

// TODO: check player class to define base attribute damage
export const makeCalculateDamage = (player: Player) => (): Damages => {
  const damage = player.stats.damage;
  const baseDamageByClass = checkClassDamage(player);

  // const baseDamageBySkills = checkSkillDamage(player);

  const totalDamage = baseDamageByClass;

  return { ...damage, base: totalDamage };
};

export const checkClassDamage = (player: Player) => {
  const { strength, agility, vitality, inteligence, dexterity, luck } = player.attributes;
  // TODO: check class to increase base damage
  switch (player.class) {
    case 'Aprendiz':
      // (BaseLevel ÷ 4) + Str + (Dex ÷ 5) + (Luk ÷ 3)
      const newDamage = meleeAtk(player.level.base, { strength, dexterity, luck });
      return newDamage;

    default:
      return player.stats.damage.base;
  }
};

export const checkSkillDamage = (player: Player) => {
  // TODO!!
};
