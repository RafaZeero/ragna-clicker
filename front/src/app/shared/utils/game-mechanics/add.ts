import { MAX_LEVEL } from '@shared/constants';
import { Attributes, Experience, MonsterData, NoviceSkillsName, Player } from '@shared/models';

type Add = (player: Player) => {
  expToPlayer: (monsterExp: MonsterData['exp']) => Experience;
  attributeToPlayer: (attribute: keyof Attributes) => Attributes;
  skillToPlayer: (skillName: NoviceSkillsName) => Player['skills']['passive'];
  zenyToPlayer: (monster: MonsterData) => Player['zenys'];
};

export const makeAdd: Add = player => {
  const addExpToPlayer = makeAddExpToPlayer(player);
  const addAttributeToPlayer = makeAddAttributeToPlayer(player);
  const addSkillToPlayer = makeAddSkillToPlayer(player);
  const addZenyToPlayer = makeAddZenyToPlayer(player);

  return {
    expToPlayer: addExpToPlayer,
    attributeToPlayer: addAttributeToPlayer,
    skillToPlayer: addSkillToPlayer,
    zenyToPlayer: addZenyToPlayer,
  };
};

const makeAddExpToPlayer =
  (player: Player) =>
  (
    monsterExp: MonsterData['exp'],
  ): { base: Player['exp']['current']['base']; job: Player['exp']['current']['job'] } => {
    /** Check if base and job are MAX LEVEL */
    if (
      player.level.base >= MAX_LEVEL[player.classGroup].base &&
      player.level.job >= MAX_LEVEL[player.classGroup].job
    ) {
      console.log('não deve upar mais BASE nem JOB!!');
      /** Return current exp */
      return {
        base: player.exp.current.base,
        job: player.exp.current.job,
      };
    }

    const sumBaseExp = player.exp.current.base + monsterExp.base;
    const sumJobExp = player.exp.current.job + monsterExp.job;

    /** Check if base is MAX LEVEL and job is not */
    if (player.level.base >= MAX_LEVEL[player.classGroup].base) {
      console.log('não deve upar mais BASE!!');
      /** Base exp cannot increase, but job exp can */
      return {
        base: player.exp.current.base,
        job: sumJobExp,
      };
    }

    /** Check if job is MAX LEVEL and base is not */
    if (player.level.job >= MAX_LEVEL[player.classGroup].job) {
      console.log('não deve upar mais JOB!!');

      /** Job exp cannot increase, but base exp can */
      return {
        base: sumBaseExp,
        job: player.exp.current.job,
      };
    }

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

const makeAddZenyToPlayer = (player: Player) => (monster: MonsterData) => {
  const currentZenys = player.zenys;

  // TODO: add bonus from skill or other buff
  const fromMonster =
    Math.floor(monster.stats.hp * 0.4) + Math.floor(monster.exp.base * 0.2) + Math.floor(monster.exp.job * 0.1);

  const totalZenys = currentZenys + fromMonster;
  return totalZenys;
};
