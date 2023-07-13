import { maps } from '../constants/maps';

type MakeMapFileURL = (map: (typeof maps)[keyof typeof maps]) => `url("/assets/maps/${typeof map}.png")`;

export const makeMapFileURL: MakeMapFileURL = map => `url("/assets/maps/${map}.png")`;
