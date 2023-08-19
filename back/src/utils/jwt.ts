import 'dotenv/config';
import * as jwt from 'jsonwebtoken';
import { uniqueId } from 'lodash';

export const generateSafeJWT = (username: string): string =>
  jwt.sign(username, uniqueId(process.env['SAFE_VALUE']));
