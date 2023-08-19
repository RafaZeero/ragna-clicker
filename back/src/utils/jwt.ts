import { User } from '@interfaces';
import 'dotenv/config';
import * as jwt from 'jsonwebtoken';
import { uniqueId } from 'lodash';

export const generateSafeJWT = (user: Omit<User, 'password'>): string =>
  jwt.sign(JSON.stringify(user), uniqueId(process.env['SAFE_VALUE']));
