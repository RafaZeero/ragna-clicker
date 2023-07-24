import { noviceSkillsName } from '@shared/constants';

export type Classes = 'aprendiz' | 'espadachim' | 'arqueiro' | 'mago' | 'mercador' | 'gatuno' | 'noviço';

export type NoviceSkillsName = (typeof noviceSkillsName)[number];
