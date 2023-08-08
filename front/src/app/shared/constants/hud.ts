import { HudAttributesComponent, HudCharComponent, PlayerAttributesComponent } from '@components';
import { HudControl, HudInitPosition } from '@shared/models';

const DEFAULT_HUD_SIZE = { x: 360, y: 160 };

export const DEFAULT_HUD: HudControl = {
  char: false,
  attr: false,
  skills: false,
  equip: false,
  config: false,
  maps: false,
};

export const INITIAL_POSITION: HudInitPosition = {
  char: { x: 0, y: DEFAULT_HUD_SIZE.y + (DEFAULT_HUD_SIZE.y + 24) + 1 + 300 },
  attr: { x: 0, y: DEFAULT_HUD_SIZE.y + 1 },
  info: { x: 0, y: 0 },
  equip: { x: 0, y: DEFAULT_HUD_SIZE.y + (DEFAULT_HUD_SIZE.y + 24) + 1 + 150 },
  skills: { x: 400, y: 0 },
  config: { x: 800, y: 0 },
  maps: { x: 200, y: 200 },
};
