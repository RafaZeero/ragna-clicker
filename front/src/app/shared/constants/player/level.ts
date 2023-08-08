import { ClassGroup, Experience } from '@shared/models';

export const levelTypes: Array<keyof Experience> = ['base', 'job'];

export const MAX_LEVEL: Record<ClassGroup, { base: number; job: number }> = {
  'aprendiz': { base: 30, job: 15 },
  '1-1': { base: 99, job: 50 },
  /** TODO: future patches */
  // 'class-1-1': { base: 99, job: 50 },
  // 'class-2-1': { base: 99, job: 50 },
  // 'class-2-2': { base: 99, job: 50 },
  /** TODO: future patches */
  // 'class-1-1-trans': { base: 99, job: 50 },
  // 'class-2-1-trans': { base: 99, job: 70 },
  // 'class-2-2-trans': { base: 99, job: 70 },
};
