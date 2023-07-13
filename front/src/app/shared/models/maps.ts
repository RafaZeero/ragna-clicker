import { maps } from '../constants/maps';

export type Maps = (typeof maps)[keyof typeof maps];
