import { MonsterData, MonsterRequest } from '@shared/models';

export const mapMonsterData = (monster: MonsterRequest): MonsterData => ({
  id: monster.id,
  name: monster.name,
  stats: {
    hp: monster.stats.health,
    attributes: {
      agility: monster.stats.agi,
      dexterity: monster.stats.dex,
      inteligence: monster.stats.int,
      luck: monster.stats.luk,
      strength: monster.stats.str,
      vitality: monster.stats.vit,
    },
    defense: monster.stats.defense,
  },
  exp: {
    base: monster.stats.baseExperience,
    job: monster.stats.jobExperience,
  },
});
