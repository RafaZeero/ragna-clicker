import { Router } from 'express';
import { createOneUser } from './create-one-user';

/**
 * Route prefix: "/users"
 */

const route = Router();

route.post('/signup', createOneUser);

export { route as usersRoute };
