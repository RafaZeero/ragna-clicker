import { noviceSkillsName } from '@shared/constants';

export type Classes = 'aprendiz' | 'espadachim' | 'arqueiro' | 'mago' | 'mercador' | 'gatuno' | 'noviço';

export type ClassGroup = 'aprendiz' | '1-1' /* | '2-1' | '2-2' */;

export type NoviceSkillsName = (typeof noviceSkillsName)[number];
