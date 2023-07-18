import { Experience, Level, Player } from '@shared/models';
import { makeChangeAttributesAvailable, makeChangeExp, makeChangeLevel } from './helpers';

export type Calculate = (player: Player) => {
  level: () => Level & { hasLeveled: { base: boolean; job: boolean } };
  exp: () => Experience;
  attributesAvailable: () => number;
};
export const calculate: Calculate = player => {
  const changeLevel = makeChangeLevel(player);
  const changeExp = makeChangeExp(player);
  const changeAttributesAvailable = makeChangeAttributesAvailable(player);
  return {
    level: changeLevel,
    exp: changeExp,
    attributesAvailable: changeAttributesAvailable,
  };
};

// TODO: check player class to define base attribute damage
export const calculateDamage = () => {};
