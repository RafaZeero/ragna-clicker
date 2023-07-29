import { Point } from '@angular/cdk/drag-drop';

export type HudControl = {
  char: boolean;
  attr: boolean;
  skills: boolean;
  equip: boolean;
  config: boolean;
  maps: boolean;
};
export type HudInitPosition = { info: Point; attr: Point; skills: Point; equip: Point; config: Point; maps: Point };
