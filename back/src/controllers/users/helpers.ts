import { isEmailValid, isPasswordValid, isUsernameValid } from '@utils';
import * as t from 'io-ts';
import { withMessage } from 'io-ts-types';

export const usernameCodec = t.refinement(t.string, value => isUsernameValid(value), 'Username');
export const emailCodec = t.refinement(t.string, value => isEmailValid(value), 'Email');
export const passwordCodec = t.refinement(t.string, value => isPasswordValid(value), 'Password');

export const userCodec = t.type({
  username: withMessage(
    usernameCodec,
    () => 'Invalid username. Username must be between 3 and 28 characters, but cannot contain ;:<>'
  ),
  email: withMessage(emailCodec, () => 'Invalid email'),
  password: withMessage(
    passwordCodec,
    () =>
      'Invalid password. Password must have a least 8 characters, one uppercase letter, one lowercase letter and one number'
  )
});

export const userLoginCodec = t.type({
  email: withMessage(emailCodec, () => 'Invalid email'),
  password: withMessage(
    passwordCodec,
    () =>
      'Invalid password. Password must have a least 8 characters, one uppercase letter, one lowercase letter and one number'
  )
});
