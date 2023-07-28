import { Attributes, Experience, MonsterData, NoviceSkillsName, Player } from '@shared/models';

type Add = (player: Player) => {
  expToPlayer: (monsterExp: MonsterData['exp']) => Experience;
  attributeToPlayer: (attribute: keyof Attributes) => Attributes;
  skillToPlayer: (skillName: NoviceSkillsName) => Player['skills']['passive'];
};

export const makeAdd: Add = player => {
  const addExpToPlayer = makeAddExpToPlayer(player);
  const addAttributeToPlayer = makeAddAttributeToPlayer(player);
  const addSkillToPlayer = makeAddSkillToPlayer(player);

  return {
    expToPlayer: addExpToPlayer,
    attributeToPlayer: addAttributeToPlayer,
    skillToPlayer: addSkillToPlayer,
  };
};

const makeAddExpToPlayer =
  (player: Player) =>
  (
    monsterExp: MonsterData['exp'],
  ): { base: Player['exp']['current']['base']; job: Player['exp']['current']['job'] } => {
    const sumBaseExp = player.exp.current.base + monsterExp.base;
    const sumJobExp = player.exp.current.job + monsterExp.job;

    return {
      base: sumBaseExp,
      job: sumJobExp,
    };
  };

const makeAddAttributeToPlayer =
  (player: Player) =>
  (attribute: keyof Attributes): Attributes => {
    ++player.attributes.values[attribute];
    return player.attributes.values;
  };

const makeAddSkillToPlayer =
  (player: Player) =>
  (skillName: NoviceSkillsName): Player['skills']['passive'] => {
    ++player.skills.passive[skillName].level;
    return player.skills.passive;
  };
