import { ICON_ID } from '@shared/constants';

export type IconID = (typeof ICON_ID)[keyof typeof ICON_ID];

/* The type of Icon to be used in the source [src] in the image tag */
export type AssetsPath<T extends IconID = IconID> = `/assets/icons/${T}.svg`;
