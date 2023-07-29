// Type of audio created with ID
export type GameAudio = { audio: HTMLAudioElement; ID: string };

// Functions to control audio
export type SetVolume = (volume: number) => void;
// export type PlayAudio = (audio: string) => Promise<void>;
export type PlayAudio = (audio: string) => HTMLAudioElement;
export type PauseAudio = (audio: string) => void;

// Audio control group
export type AudioControl = {
  setVolume: SetVolume;
  playAudio: PlayAudio;
};

export type AudioConfig = { audio: { gameMusicVolume: number; effectsVolume: number } };
