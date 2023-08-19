import { User } from '@interfaces';
import { addDays } from 'date-fns/fp';
import 'dotenv/config';
import * as jwt from 'jsonwebtoken';
import { uniqueId } from 'lodash';

export const generateSafeJWT = (user: Omit<User, 'password'>): string =>
  jwt.sign(JSON.stringify({ user, expires_at: validFor(30) }), uniqueId(process.env['SAFE_VALUE']));

const validFor = (time: number) => addDays(time)(new Date());
