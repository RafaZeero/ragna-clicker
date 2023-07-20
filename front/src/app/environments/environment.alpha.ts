import type { Environment } from './environment.d';
import 'dotenv';

export const environment: Environment = {
  type: 'alpha',
  apiKey: { 'divine-pride': '1aa1f34e90e8afdcadcb3c61b6d5fcd9' },
  hash: { salt: 'ragzin' },
  apiURL: 'http://localhost:3000',
};
