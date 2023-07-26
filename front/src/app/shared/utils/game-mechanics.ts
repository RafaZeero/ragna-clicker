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

const createAudio = (path: string, ID: string) => {
  const audio = new Audio(`../../../assets/sounds/${path}`);
  audio.volume = 0.5;
  audio.load();
  return { audio, ID };
};

export const makePlaySound = () => {
  const levelUp = createAudio('level-up-sound.mp3', 'levelUp');
  const prontera = createAudio('streamside.mp3', 'streamside');

  const effects = [levelUp];
  const gameMusic = [prontera];

  return {
    effects: {
      set: (volume: number) => effects.forEach(effect => (effect.audio.volume = volume)),
      play: (sound: string) => {
        const effect = effects.find(effect => effect.ID === sound);
        if (!effect) throw Error('Audio não implementado');
        return effect.audio.play();
      },
    },
    gameMusic: {
      set: (volume: number) => gameMusic.forEach(music => (music.audio.volume = volume)),
      play: (sound: string) => {
        const music = gameMusic.find(music => music.ID === sound);
        if (!music) throw Error('Música de jogo não implementada');
        return music.audio.play();
      },
    },
  };
};

// Create instances of sounds to play
export const playSound = makePlaySound();
