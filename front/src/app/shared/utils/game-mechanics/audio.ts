import { AudioControl, GameAudio } from '@shared/models';

/** Audio stuff */
const createAudio = (path: string, ID: string): GameAudio => {
  const audio = new Audio(`../../../assets/sounds/${path}`);

  // Audio config
  audio.volume = 0.25;
  audio.load();

  return { audio, ID };
};

const makePlayAudio = (audioList: Array<GameAudio>) => (sound: string) => {
  const audio = audioList.find(music => music.ID === sound)?.audio;

  if (!audio) throw Error('Áudio de jogo não implementada');
  return audio.play();
};

const makeSetVolume = (audioList: Array<GameAudio>) => (volume: number) => {
  audioList.forEach(({ audio }) => (audio.volume = volume));
};

export const makePlaySound = () => {
  const levelUp = createAudio('level-up-sound.mp3', 'levelUp');
  const prontera = createAudio('streamside.mp3', 'streamside');

  const effects = [levelUp];
  const gameMusics = [prontera];

  const audioControl = makeAudioControl(effects, gameMusics);

  return {
    effects: audioControl.effects,
    gameMusic: audioControl.gameMusic,
  };
};

type GameAudioControl = (
  effects: Array<GameAudio>,
  gameMusic: Array<GameAudio>,
) => {
  effects: AudioControl;
  gameMusic: AudioControl;
};

const makeAudioControl: GameAudioControl = (effects, gameMusic) => {
  // Effects
  const setEffectVolume = makeSetVolume(effects);
  const playEffect = makePlayAudio(effects);

  // Game musics
  const setGameMusicVolume = makeSetVolume(gameMusic);
  const playGameMusic = makePlayAudio(gameMusic);

  return {
    effects: {
      setVolume: setEffectVolume,
      playAudio: playEffect,
    },
    gameMusic: {
      setVolume: setGameMusicVolume,
      playAudio: playGameMusic,
    },
  };
};
