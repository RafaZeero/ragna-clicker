import { Point } from '@angular/cdk/drag-drop';

export type HudControl = { char: boolean; attr: boolean; skills: boolean; equip: boolean };
export type HudInitPosition = { info: Point; attr: Point; skills: Point; equip: Point };
