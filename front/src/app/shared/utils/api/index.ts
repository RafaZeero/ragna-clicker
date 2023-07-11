import { MonsterRequest } from '@shared/models';

export const mapMonsterData = (monster: MonsterRequest) => ({
  name: monster.name,
  stats: {
    hp: monster.stats.health,
    exp: {
      base: monster.stats.baseExperience,
      job: monster.stats.jobExperience,
    },
  },
});
