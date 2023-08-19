import { verify, hash } from 'argon2';
import type { Task } from 'fp-ts/lib/Task';
import { isNil } from 'lodash';

export const verifyPasswordHash =
  (passwordHash: string, userPassword: string): Task<boolean> =>
  async () => {
    // If the password is null means that user is logging with social providers
    return verify(passwordHash, userPassword);
  };

export const hashPassword =
  (passwordRaw: string | undefined): Task<string | undefined> =>
  async () => {
    return isNil(passwordRaw) ? passwordRaw : hash(passwordRaw);
  };

export const isPasswordValid = (password: string): boolean =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,32}$/.test(password);
