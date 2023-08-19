import { Request, Response, Router } from 'express';
import {
  generateSafeJWT,
  hashPassword,
  isEmailValid,
  isUsernameValid,
  verifyPasswordHash
} from '@utils';
import { getOneUserByEmail, getOneUserByUsername, createOneUser as createOneUserDB, DB } from '@db';
import { pipe } from 'fp-ts/lib/function';
import * as E from 'fp-ts/lib/Either';
import { User } from '@interfaces';
import { userLoginCodec } from './helpers';
import { failure } from 'io-ts/PathReporter';
import { isEmpty } from 'lodash';

export const getOneUser = async (req: Request, res: Response) => {
  const { email, password } = req.body as Omit<User, 'username' | 'register_date'>;

  const connection = await DB();

  const userOrError = pipe(
    // * Validate user values
    req.body as User,
    userLoginCodec.decode,
    E.mapLeft(err => `Error: ${failure(err).join('::::')}`)
  );

  if (E.isLeft(userOrError)) {
    return res.status(400).json({ response: userOrError.left });
  }

  let user: User;

  /** Check if account exists */
  try {
    const rawUserQueryEmail = await connection.query(getOneUserByEmail(email));
    user = (rawUserQueryEmail[0] as any)[0] as User;

    console.log(user);

    if (isEmpty(user)) {
      return res.status(400).json({ response: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ respose: 'An error has ocurred' });
  }

  /** Encrypt values */
  // Error for encrypt
  const isPwdValid = await verifyPasswordHash(user.password, password)();

  if (!isPwdValid) {
    return res.status(400).json({ response: 'Invalid credentials.' });
  }

  // * Generate token to log user in the app
  const token = generateSafeJWT({
    email: user.email,
    username: user.username,
    register_date: user.register_date
  });

  return res.status(201).json({ response: { token, message: `Logged with ${email}` } });
};
