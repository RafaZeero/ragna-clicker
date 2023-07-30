import { maps } from '../constants/maps';

type MakeMapFileURL = (map: (typeof maps)[keyof typeof maps]) => {
  css: `url("/assets/maps/${typeof map}.png")`;
  url: `/assets/maps/${typeof map}.png`;
};

export const makeMapFileURL: MakeMapFileURL = map => ({
  css: `url("/assets/maps/${map}.png")`,
  url: `/assets/maps/${map}.png`,
});
