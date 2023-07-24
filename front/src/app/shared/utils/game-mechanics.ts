import { Attributes, MonsterData, NoviceSkillsName, Player } from '@shared/models';

// TODO: Make a factory function like make***

export const addExp = (
  player: Player,
  monsterExp: MonsterData['exp'],
): { base: Player['exp']['current']['base']; job: Player['exp']['current']['job'] } => {
  const sumBaseExp = player.exp.current.base + monsterExp.base;
  const sumJobExp = player.exp.current.job + monsterExp.job;

  return {
    base: sumBaseExp,
    job: sumJobExp,
  };
};

export const addAttributeToPlayer = (attribute: keyof Attributes, player: Player): Attributes => {
  ++player.attributes[attribute];
  return player.attributes;
};

export const addSkillLevelToPlayer = (skillName: NoviceSkillsName, player: Player): Player['skills']['passive'] => {
  ++player.skills.passive[skillName].level;
  return player.skills.passive;
};

export const meleeAtk = (
  baseLevel: Player['level']['base'],
  { strength, dexterity, luck }: Pick<Player['attributes'], 'strength' | 'dexterity' | 'luck'>,
) => Math.ceil(baseLevel / 4 + strength + dexterity / 5 + luck / 3);
