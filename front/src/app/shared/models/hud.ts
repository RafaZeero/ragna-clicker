import { Point } from '@angular/cdk/drag-drop';

export type HudControl = {
  /** Cannot control info, I want it to be always opened */
  char: boolean;
  attr: boolean;
  skills: boolean;
  equip: boolean;
  config: boolean;
  maps: boolean;
};
export type HudInitPosition = {
  info: Point;
  char: Point;
  attr: Point;
  skills: Point;
  equip: Point;
  config: Point;
  maps: Point;
};
