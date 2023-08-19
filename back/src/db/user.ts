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

export const createOneUser = (user: Omit<User, 'register_date'>): string => {
  const query = `
  INSERT INTO users_db
  (username, email, password, register_date)
  VALUES ('${user.username}', '${user.email}', '${user.password}', now())`;
  return query;
};
