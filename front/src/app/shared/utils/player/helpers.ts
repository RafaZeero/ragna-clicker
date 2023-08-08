import { MAX_LEVEL, POINTS_PER_LEVEL, expToLevelUp } from '@shared/constants';
import { Damages, Player } from '@shared/models';
import { meleeAtk } from '@shared/utils';

export const makeExpNeededToLevelUp = (player: Player) => (): Player['exp']['toLevelUp'] => {
  const currentPlayerLevel: Player['level'] = player.level;
  return {
    base: expToLevelUp.base[currentPlayerLevel.base.toString()],
    job: expToLevelUp.job[currentPlayerLevel.job.toString()],
  };
};

export const makeChangeLevelAndExp = (player: Player) => () => {
  const currentPlayerLevel: Player['level'] = player.level;
  const currentPlayerExp: Player['exp']['current'] = player.exp.current;

  /** For one level */
  const expNeededToLevelUp: Player['exp']['toLevelUp'] = {
    base: expToLevelUp.base[currentPlayerLevel.base.toString()],
    job: expToLevelUp.job[currentPlayerLevel.job.toString()],
  };

  /** For two levels */
  const expNeededToLevelUpTwice: Player['exp']['toLevelUp'] = {
    base: expToLevelUp.base[(currentPlayerLevel.base + 1).toString()],
    job: expToLevelUp.job[(currentPlayerLevel.job + 1).toString()],
  };

  const hasLeveled = { base: false, job: false };

  // Validations
  const checkExp = {
    base: currentPlayerExp.base >= expNeededToLevelUp.base,
    job: currentPlayerExp.job >= expNeededToLevelUp.job,
  };
  // Check base exp
  if (checkExp.base) {
    hasLeveled.base = true;
    currentPlayerExp.base -= expNeededToLevelUp.base;
    currentPlayerLevel.base = currentPlayerLevel.base + 1;
  }

  // Check job exp
  if (checkExp.job) {
    hasLeveled.job = true;
    currentPlayerExp.job -= expNeededToLevelUp.job;
    currentPlayerLevel.job = currentPlayerLevel.job + 1;

    if (currentPlayerExp.job >= expNeededToLevelUpTwice.job) {
      currentPlayerExp.job -= expNeededToLevelUpTwice.job;
      currentPlayerLevel.job = currentPlayerLevel.job + 1;
    }
  }

  // Return new Player level if leveled up
  return { level: currentPlayerLevel, exp: currentPlayerExp, hasLeveled };
};

export const makeChangeAttributesAvailable = (player: Player) => (): number => {
  const currentPoints: Player['attributes']['attributes_to_spend'] = player.attributes.attributes_to_spend;

  // Sum with points per level
  const updatedPoints = currentPoints + POINTS_PER_LEVEL.attributes;

  // Return updated total points
  return updatedPoints;
};

export const makeChangeSkillPointsAvailable = (player: Player) => (): number => {
  const currentPoints: Player['skills']['skills_to_spend'] = player.skills.skills_to_spend;

  // Sum with points per level
  const updatedPoints = currentPoints + POINTS_PER_LEVEL.skills;

  // Return updated total points
  return updatedPoints;
};

// TODO: check player class to define base attribute damage
export const makeCalculateDamage = (player: Player) => (): Damages => {
  // Get player all damage
  const damage = player.stats.damage;

  // Get player damage by the class
  const baseDamageByClass = checkClassDamage(player);

  // Get player damage by the skills
  const baseDamageBySkills = checkSkillDamage(player);

  // Sum up all damages
  const totalDamage = baseDamageByClass;

  // return the object of all player damages
  return { ...damage, base: totalDamage, skills: baseDamageBySkills };
};

export const checkClassDamage = (player: Player): number => {
  const { strength, agility, vitality, inteligence, dexterity, luck } = player.attributes.values;
  // TODO: check class to increase base damage
  switch (player.class) {
    case 'aprendiz':
      // (BaseLevel ÷ 4) + Str + (Dex ÷ 5) + (Luk ÷ 3)
      const newDamage = meleeAtk(player.level.base, { strength, dexterity, luck });
      return newDamage;

    default:
      return player.stats.damage.base;
  }
};

export const checkSkillDamage = (player: Player): number => {
  // Each skill that increase damage will update this value with the correct calculations
  let increasedDamage = 0;
  // Check for novice skills
  if (player.class === 'aprendiz') {
    const noviceSkills = player.skills.passive;
    // Update damage for each novice skill
    if (noviceSkills['Aumentar Dano']) {
      const skillDamage = skillAtk(noviceSkills['Aumentar Dano'].level, noviceSkills['Aumentar Dano'].increaseAmount);
      increasedDamage += skillDamage;
    }
  }

  return increasedDamage;
};

// Calculate skill attack damage based on level
export const skillAtk = (skillLevel: number, damage: number) => skillLevel * damage;
