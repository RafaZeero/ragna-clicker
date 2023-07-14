import { Player } from '@shared/models';
import { expToLevelUp } from '../constants/player';

export const calculateLevel = (player: Player): { baseLevel: number; jobLevel: number } => {
  const currentPlayerLevel = {
    baseLevel: player.level.base,
    jobLevel: player.level.job,
  };

  const currentPlayerExp = {
    baseExp: player.exp.current.base,
    jobExp: player.exp.current.job,
  };

  const expNeeded = {
    base: expToLevelUp.base[currentPlayerLevel.baseLevel],
    job: expToLevelUp.job[currentPlayerLevel.jobLevel],
  };

  // Check base exp
  if (currentPlayerExp.baseExp >= expNeeded.base) {
    ++currentPlayerLevel.baseLevel;
  }

  // Check job exp
  if (currentPlayerExp.jobExp >= expNeeded.job) {
    ++currentPlayerLevel.jobLevel;
  }

  return currentPlayerLevel;
};

export const calculateExpAfterLevelUp = (player: Player): { baseExp: number; jobExp: number } => {
  const currentPlayerLevel = {
    baseLevel: player.level.base,
    jobLevel: player.level.job,
  };

  const currentPlayerExp = {
    baseExp: player.exp.current.base,
    jobExp: player.exp.current.job,
  };

  const expNeeded = {
    base: expToLevelUp.base[currentPlayerLevel.baseLevel],
    job: expToLevelUp.job[currentPlayerLevel.jobLevel],
  };

  // Check base exp
  if (currentPlayerExp.baseExp >= expNeeded.base) {
    currentPlayerExp.baseExp -= expNeeded.base;
  }

  // Check job exp
  if (currentPlayerExp.jobExp >= expNeeded.job) {
    currentPlayerExp.jobExp -= expNeeded.job;
  }

  return currentPlayerExp;
};
