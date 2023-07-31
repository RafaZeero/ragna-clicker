import { HudControl, HudInitPosition } from '@shared/models';

export const DEFAULT_HUD: HudControl = {
  char: false,
  attr: false,
  skills: false,
  equip: false,
  config: false,
  maps: false,
};

export const INITIAL_POSITION: HudInitPosition = {
  attr: { x: 0, y: 184 },
  info: { x: 0, y: 0 },
  equip: { x: 0, y: 367 },
  skills: { x: 400, y: 0 },
  config: { x: 800, y: 0 },
  maps: { x: 200, y: 200 },
};
