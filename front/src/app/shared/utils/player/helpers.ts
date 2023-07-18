import { POINTS_PER_LEVEL, expToLevelUp } from '@shared/constants';
import { Player } from '@shared/models';

export const expNeededToLevelUp = (currentPlayerLevel: Player['level']) => ({
  base: expToLevelUp.base[currentPlayerLevel.base],
  job: expToLevelUp.job[currentPlayerLevel.job],
});

export const makeChangeLevel = (player: Player) => () => {
  const currentPlayerLevel: Player['level'] = player.level;
  const currentPlayerExp: Player['exp']['current'] = player.exp.current;
  const expNeeded: Player['exp']['toLevelUp'] = expNeededToLevelUp(currentPlayerLevel);

  const hasLeveled = { base: false, job: false };

  // Validations
  const checkExp = {
    base: currentPlayerExp.base >= expNeeded.base,
    job: currentPlayerExp.job >= expNeeded.job,
  };
  // Check base exp
  if (checkExp.base) {
    hasLeveled.base = true;
    ++currentPlayerLevel.base;
  }

  // Check job exp
  if (checkExp.job) {
    hasLeveled.job = true;
    ++currentPlayerLevel.job;
  }

  // Return new Player level if leveled up

  return { ...currentPlayerLevel, hasLeveled };
};

export const makeChangeExp = (player: Player) => () => {
  const currentPlayerLevel: Player['level'] = player.level;
  const currentPlayerExp: Player['exp']['current'] = player.exp.current;
  const expNeeded: Player['exp']['toLevelUp'] = expNeededToLevelUp(currentPlayerLevel);

  // Validations
  const checkExp = {
    base: currentPlayerExp.base >= expNeeded.base,
    job: currentPlayerExp.job >= expNeeded.job,
  };

  // Check base exp
  if (checkExp.base) {
    console.log('BEFORE add base EXP', currentPlayerExp.base);
    currentPlayerExp.base -= expNeeded.base;
    console.log('add base EXP', currentPlayerExp.base);
  }

  // Check job exp
  if (checkExp.job) {
    currentPlayerExp.job -= expNeeded.job;
  }

  // Return new Player exp if leveled up
  return currentPlayerExp;
};

export const makeChangeAttributesAvailable = (player: Player) => () => {
  const currentPoints: Player['attributes_to_spend'] = player.attributes_to_spend;
  // Sum with points per level
  const updatedPoints = currentPoints + POINTS_PER_LEVEL;

  return updatedPoints;
};
