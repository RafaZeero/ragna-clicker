import type { Environment } from './environment.d';

export const environment: Environment = {
  type: 'alpha',
  apiKey: { 'divine-pride': process.env['API_DIVINE_PRIDE'] as string },
  hash: { salt: 'ragzin' },
};
