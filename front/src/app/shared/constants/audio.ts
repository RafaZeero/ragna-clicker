import { AudioNames, GameMaps } from '@shared/models';

export const SOUNDTRACKS_NAMES = {
  'streamside': 'streamside',
  'under-the-ground': 'under-the-ground',
} as const;

export const SOUND_NAMES = {
  levelUp: 'levelUp',
} as const;

export const mappingAudioByMapName: Record<GameMaps, AudioNames> = {
  'prontera-sewer': 'streamside',
  'prontera-south': 'under-the-ground',
};
