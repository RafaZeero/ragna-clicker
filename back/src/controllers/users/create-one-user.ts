import { Request, Response } from 'express';
import { generateSafeJWT, hashPassword } from '@utils';
import { getOneUserByEmail, getOneUserByUsername, createOneUser as createOneUserDB, DB } from '@db';
import { pipe } from 'fp-ts/lib/function';
import * as E from 'fp-ts/lib/Either';
import { User } from '@interfaces';
import { userCodec } from './helpers';
import { failure } from 'io-ts/PathReporter';
import { isEmpty } from 'lodash';

export const createOneUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body as User;

  const connection = await DB();

  const userOrError = pipe(
    // * Validate user values
    req.body as User,
    userCodec.decode,
    E.mapLeft(err => `Error: ${failure(err).join('::::')}`)
  );

  if (E.isLeft(userOrError)) {
    return res.status(400).json({ response: userOrError.left });
  }

  /** Check if an account with email already exists */
  try {
    // Error for email taken
    const rawUserQueryEmail = await connection.query(getOneUserByEmail(userOrError.right.email));
    const rawUserEmail = (rawUserQueryEmail[0] as any)[0] as User;

    if (!isEmpty(rawUserEmail)) {
      return res.status(404).json({ response: 'This email is already in use' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ respose: 'An error has ocurred' });
  }

  /** Check if an account with username already exists */
  try {
    // Error for username taken
    const rawUserQueryUsername = await connection.query(
      getOneUserByUsername(userOrError.right.username)
    );
    const rawUserUsername = (rawUserQueryUsername[0] as any)[0] as User;
    if (!isEmpty(rawUserUsername)) {
      return res.status(404).json({ response: 'This username is already in use' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ respose: 'An error has ocurred' });
  }

  /** Encrypt values */
  // Error for encrypt
  const hashedpassword = hashPassword(password);

  /** Add values to DB */
  try {
    // Error for DB query
    await connection.query(
      createOneUserDB({
        username,
        email,
        password: await hashedpassword()
      })
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({ respose: 'An error has ocurred' });
  }

  const user: Omit<User, 'password'> = { email, username, register_date: new Date() };

  // * Generate token to log user in the app
  let token: string;
  try {
    token = generateSafeJWT(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ respose: 'An error has ocurred' });
  }

  return res.status(201).json({ response: { token, message: `Account created for ${username}` } });
};
