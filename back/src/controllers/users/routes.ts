import { Router } from 'express';
import { createOneUser } from './create-one-user';
import { getOneUser } from './get-one-user';

/**
 * Route prefix: "/users"
 */

const route = Router();

route.post('/signup', createOneUser);
route.post('/login', getOneUser);

export { route as usersRoute };
