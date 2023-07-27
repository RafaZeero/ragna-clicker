import { Damages, Experience, Level, Player } from '@shared/models';
import {
  makeCalculateDamage,
  makeChangeAttributesAvailable,
  makeChangeLevelAndExp,
  makeChangeSkillPointsAvailable,
  makeExpNeededToLevelUp,
} from './helpers';

type Calculate = (player: Player) => {
  levelAndExp: () => {
    level: Level;
    exp: Experience;
    hasLeveled: {
      base: boolean;
      job: boolean;
    };
  };
  expToNextLevel: () => Experience;
  attributesAvailable: () => number;
  skillPointsAvailable: () => number;
  atkDamage: () => Damages;
};

/**
 * Factory function to create functions to calculate changes in player level, exp, attributes, damage and much more!
 *
 * {@link changeLevelAndExp} - Update user level;
 *
 * {@link changeExp} - Update user exp;
 *
 * {@link changeAttributesAvailable} - Update user points attributes available;
 *
 * @param player Current player
 * @returns functions that calculate changes in the player properties
 */
export const makeCalculate: Calculate = player => {
  // Create functions
  const changeLevelAndExp = makeChangeLevelAndExp(player);
  const changeAttributesAvailable = makeChangeAttributesAvailable(player);
  const changeSkillPointsAvailable = makeChangeSkillPointsAvailable(player);
  const changeAtkDamage = makeCalculateDamage(player);
  const changeExpNeededToLevelUp = makeExpNeededToLevelUp(player);

  return {
    // Calculation functions to change player data
    levelAndExp: changeLevelAndExp,
    expToNextLevel: changeExpNeededToLevelUp,
    attributesAvailable: changeAttributesAvailable,
    skillPointsAvailable: changeSkillPointsAvailable,
    atkDamage: changeAtkDamage,
  };
};
