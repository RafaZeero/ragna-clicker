import { maps } from '@shared/constants';
import { GameMaps } from '@shared/models';

type MakeMapFileURL = (map: (typeof maps)[keyof typeof maps]) => {
  css: `url("/assets/maps/${typeof map}.png")`;
  url: `/assets/maps/${typeof map}.png`;
};

export const makeMapFileURL: MakeMapFileURL = map => ({
  css: `url("/assets/maps/${map}.png")`,
  url: `/assets/maps/${map}.png`,
});

export const monstersInMap: Record<GameMaps, Array<number>> = {
  'prontera-south': [1002, 1007, 1018, 1063],
  'prontera-sewer': [1048, 1005, 1175, 1014],
};
