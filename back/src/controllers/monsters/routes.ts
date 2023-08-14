import { Router } from 'express';
import { getOneMonsterByID } from './get-monster-by-id';
/**
 * Route prefix: "/monsters"
 */

const route = Router();

route.get('/:monsterID', getOneMonsterByID);

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

export { route as monstersRoute };
