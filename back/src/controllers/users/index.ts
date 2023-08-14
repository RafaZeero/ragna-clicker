import { Request, Response, Router } from 'express';
/**
 * Route prefix: "/monsters"
 */

const route = Router();

route.post('/signup', (req: Request, res: Response) => {
  const { username, email } = req.body;

  /** Validate username & email values */
  // Error for invalid email
  // Error for invalid username

  /** Check if an account with email already exists */
  // Error for email taken

  /** Check if an account with username already exists */
  // Error for username taken

  /** Encrypt values */
  // Error for encrypt

  /** Add values to DB */
  // Error for DB query
  // Add UUID for account

  /** Generate token */
  // Error for token generation

  /** Log user in the app */
  // Create jwt token

  return res
    .status(201)
    .json({ response: { token: '', message: `Account created for ${username}` } });
});

export { route as usersRoute };
