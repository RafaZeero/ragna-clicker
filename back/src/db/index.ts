import 'dotenv/config';
import mysql, { ConnectionOptions, RowDataPacket } from 'mysql2';

export const DB = () => {
  const localDB: ConnectionOptions = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    database: 'ragnadb',
    password: 'password'
  };

  const dbUrl = process.env['DATABASE_URL'];
  const development = process.env['DEVMODE'];

  const connectionValue = development ? localDB : dbUrl;

  // create the connection
  const connection = mysql.createConnection(connectionValue as unknown);
  return connection;
};
