import { User } from '@interfaces';

export const getOneUserByUsername = (username: string): string => {
  const query = `
  SELECT username 
  FROM users_db 
  WHERE username = '${username}';`;
  return query;
};

export const getOneUserByEmail = (email: string): string => {
  const query = `
  SELECT email 
  FROM users_db 
  WHERE email = '${email}';`;
  return query;
};

export const createOneUser = (user: User): string => {
  const query = `
  INSERT INTO users_db
  (username, email, password)
  VALUES ('${user.username}', '${user.email}', '${user.password}')`;
  return query;
};
