import { maps } from '../constants/maps';

export type GameMaps = (typeof maps)[keyof typeof maps];
