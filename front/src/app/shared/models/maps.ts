import { maps } from '@shared/constants';

export type GameMaps = (typeof maps)[keyof typeof maps];
