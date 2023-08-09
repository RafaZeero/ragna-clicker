import express, { Request, Response } from 'express';
import cors from 'cors';
import { monstersRoute } from '@controllers';
import { DB } from '@db';
import { populateWithJson } from './db/create';

const PORT = 3000 as const;
const app = express();

const main = () => {
  /** Middlewares */
  app.use(cors(), express.json());

  /** Test server endpoint */
  app.get('/ping', (_req: Request, res: Response) => {
    res.json({ pong: 'henlo' });
  });

  /** Helper to populate DB */
  app.get('/populate', (_req: Request, res: Response) => {
    const {
      table: { monsters }
    } = populateWithJson();

    // monsters.forEach(monsterQuery => connection().query(monsterQuery));

    res.json({ response: monsters });
  });

  // # downloads
  // app.get('/monsters/download/images', (req: Request, res: Response) => {
  //   const monsters = req.body.monsters as Array<string>;

  //   if (!monsters) return res.status(400).json({ message: 'No monsters provided' });

  //   createMonsterImageFromRequest(monsters);

  //   res.status(200).json({ message: 'Monster(s) file(s) created', monsters });
  // });

  // app.get('/monsters/download/data', (req: Request, res: Response) => {
  //   const monsters = req.body.monsters as Array<string>;

  //   if (!monsters) return res.status(400).json({ message: 'No monsters provided' });

  //   createMonsterDataFromRequest(monsters);

  //   res.status(200).json({ message: 'Monster(s) file(s) created', monsters });
  // });
  // # downloads end

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

  const connection = DB;

  connection();

  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
};

main();
