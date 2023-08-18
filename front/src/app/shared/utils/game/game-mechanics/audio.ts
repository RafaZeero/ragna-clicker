import { AudioControl, GameAudio, PauseAudio, StopAudio } from '@shared/models';

/** Audio stuff */
const createAudio = (path: string, ID: string): GameAudio => {
  const audio = new Audio(`../../../assets/sounds/${path}`);

  // Audio config
  // audio.volume = 0.25;
  audio.load();

  return { audio, ID };
};

const makePlayAudio = (audioList: Array<GameAudio>, replayable?: boolean) => (sound: string) => {
  const audio = audioList.find(music => music.ID === sound)?.audio;

  if (!audio) throw Error('Áudio de jogo não implementada');
  audio.play();

  if (replayable) {
    audio.onended = () => audio.play();
  }
  return audio;
};

const makeSetVolume = (audioList: Array<GameAudio>) => (volume: number) => {
  audioList.forEach(({ audio }) => (audio.volume = volume));
};

const makePauseAudio = (audioList: Array<GameAudio>) => (sound: string) => {
  const audio = audioList.find(music => music.ID === sound)?.audio;

  if (!audio) throw Error('Áudio de jogo não implementada');
  return audio.pause();
};

const makeStopAudio = (audioList: Array<GameAudio>) => (sound: string) => {
  const audio = audioList.find(music => music.ID === sound)?.audio;

  if (!audio) throw Error('Áudio de jogo não implementada');
  audio.pause();
  audio.currentTime = 0;
  return;
};

export const makePlaySound = () => {
  const levelUp = createAudio('level-up-sound.mp3', 'levelUp');
  const prontera = createAudio('streamside.mp3', 'streamside');
  const pronteraSewer = createAudio('under-the-ground.mp3', 'under-the-ground');

  const effects = [levelUp];
  const gameMusics = [prontera, pronteraSewer];

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
  gameMusic: AudioControl & { pauseAudio: PauseAudio; stopAudio: StopAudio };
};

const makeAudioControl: GameAudioControl = (effects, gameMusic) => {
  // Effects
  const setEffectVolume = makeSetVolume(effects);
  const playEffect = makePlayAudio(effects);

  // Game musics
  const setGameMusicVolume = makeSetVolume(gameMusic);
  const playGameMusic = makePlayAudio(gameMusic, true);
  const pauseGameMusic = makePauseAudio(gameMusic);
  const stopGameMusic = makeStopAudio(gameMusic);

  return {
    effects: {
      setVolume: setEffectVolume,
      playAudio: playEffect,
    },
    gameMusic: {
      setVolume: setGameMusicVolume,
      playAudio: playGameMusic,
      pauseAudio: pauseGameMusic,
      stopAudio: stopGameMusic,
    },
  };
};

export const gameSoundTrack = ['streamside', 'under-the-ground'] as const;
