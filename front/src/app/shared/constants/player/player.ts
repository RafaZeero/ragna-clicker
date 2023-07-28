import { Player } from '@shared/models';
import {
  DEFAULT_ATTRIBUTES,
  DEFAULT_SKILLS,
  DEFAULT_LEVELS,
  DEFAULT_EXP,
  DEFAULT_STATS,
} from '../initial-and-default-values';

export const defaultPlayer: Player = {
  name: 'Rafael',
  class: 'aprendiz',
  attributes: DEFAULT_ATTRIBUTES,
  skills: DEFAULT_SKILLS,
  level: DEFAULT_LEVELS,
  exp: DEFAULT_EXP,
  stats: DEFAULT_STATS,
  zenys: 0,
};

// Attributes points gained to spend per level
export const POINTS_PER_LEVEL = { attributes: 3, skills: 1 } as const;
