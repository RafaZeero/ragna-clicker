import express, { Request, Response } from 'express';
import cors from 'cors';
import { monstersRoute } from '@controllers';
import { DB } from '@db';
import { populateWithJson } from './db/create';

const PORT = 3000 as const;
const app = express();

const main = async () => {
  const connection = await DB();
  /** Middlewares */
  app.use(cors(), express.json());

  /** Test server endpoint */
  app.get('/ping', async (_req: Request, res: Response) => {
    /** Test DB connection */
    const [rows] = await connection.query(
      'Select name_english, level, hp FROM mob_db WHERE id = 1002;'
    );

    console.log(rows);

    /** Test API Connection */
    res.json({ pong: 'henlo' });
  });

  /** Helper to populate DB */
  app.get('/populate', (req: Request, res: Response) => {
    const credentials = req.body;

    if (credentials.pwd !== 'ragzin-populate') {
      return res.status(404).json({ response: 'No data' });
    }

    const {
      table: { monsters }
    } = populateWithJson();

    // monsters.forEach(monsterQuery => {
    //   Object.values(monsterQuery).forEach(query => connection().query(query));
    // });

    return res.status(200).json({ response: monsters });
  });

  // TODO: proper endpoint for login
  // app.post('/users/:userID', (req: Request, res: Response) => {
  //   const { userID } = req.params;

  //   // TODO: find user in a db
  //   const user = mockedUsers.find(user => user.id === parseInt(userID));

  //   // TODO: proper login validation
  //   if (!(user?.username === req.body.username) || !(user?.password === req.body.password)) {
  //     return res.status(404).json({ data: 'Invalid credentials' });
  //   }

  //   // TODO: improve response messages
  //   return user
  //     ? res.status(200).json({ data: user })
  //     : res.status(404).json({ data: 'User not found' });
  // });

  /** Routes */
  app.use('/monsters', monstersRoute);

  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
};

main();
