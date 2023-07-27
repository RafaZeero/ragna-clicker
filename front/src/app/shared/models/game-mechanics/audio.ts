// Type of audio created with ID
export type GameAudio = { audio: HTMLAudioElement; ID: string };

// Functions to control audio
export type SetVolume = (volume: number) => void;
export type PlayAudio = (audio: string) => Promise<void>;

// Audio control group
export type AudioControl = {
  setVolume: SetVolume;
  playAudio: PlayAudio;
};
