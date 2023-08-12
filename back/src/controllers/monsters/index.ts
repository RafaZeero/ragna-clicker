import { Request, Response, Router } from 'express';
import { imageFromFile, monsterDBPath } from '@utils';
import * as fs from 'fs';
import * as O from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/function';
import path from 'path';
import { DB } from '@db';
import { getOneMonster } from '@repositories';

/**
 * Route prefix: "/monsters"
 */

const route = Router();

route.get('/:monsterID', (req: Request, res: Response) => {
  // Monster Id from params
  const monsterID = pipe(req.params['monsterID'], O.fromNullable);

  if (O.isNone(monsterID)) {
    return res.status(404).json({ response: 'Missing monster ID' });
  }

  // Get image from file
  const monsterImage = imageFromFile(monsterID.value);

  if (!monsterImage) {
    return res.status(404).json({ response: 'Image not found' });
  }

  // Get data from file
  // const monsterInfo = fs.readFileSync(path.join(process.cwd(), 'src/data/monsters/monsters.json'));
  // const jsonData = JSON.parse(monsterInfo.toString()) as { monsters: Array<any> };
  // const monsterData = jsonData.monsters.find(monster => monster.id === parseInt(monsterID.value));

  // Get data from DB
  // DB().query('SELECT * ')
  const monsterData = getOneMonster(+monsterID.value);

  if (!monsterData) {
    return res.status(404).json({ response: 'Monster Data not found' });
  }

  // Send file back to front
  return res.status(200).json({ response: { monsterImage, monsterData } });
});

export { route as monstersRoute };
