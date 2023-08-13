import 'dotenv/config';
import mysql, { ConnectionOptions, RowDataPacket } from 'mysql2';

export const DB = async () => {
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

  // Create the pool connection
  const pool = mysql.createPool(dbUrl);
  // Wrap in a promise
  const connection = pool.promise();

  return connection;
};
