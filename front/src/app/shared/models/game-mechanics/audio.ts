import { SOUNDTRACKS_NAMES } from '@shared/constants';

// Type of audio created with ID
export type GameAudio = { audio: HTMLAudioElement; ID: string };

// Functions to control audio
export type SetVolume = (volume: number) => void;
// export type PlayAudio = (audio: string) => Promise<void>;
export type PlayAudio = (audio: string) => HTMLAudioElement;
export type PauseAudio = (audio: string) => void;
export type StopAudio = (audio: string) => void;

// Audio control group
export type AudioControl = {
  setVolume: SetVolume;
  playAudio: PlayAudio;
};

export type AudioConfig = { audio: { gameMusicVolume: number; effectsVolume: number } };

export type AudioNames = (typeof SOUNDTRACKS_NAMES)[keyof typeof SOUNDTRACKS_NAMES];
