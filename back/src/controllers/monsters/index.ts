import { Request, Response, Router } from 'express';
import { imageFromFile, mapMonsterData } from '@utils';
import * as fs from 'fs';
import * as O from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/function';
import { isEmpty } from 'lodash';
import { DB } from '@db';
import { getOneMonster } from '@repositories';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { MonsterRequest } from '@interfaces';

/**
 * Route prefix: "/monsters"
 */

const route = Router();

route.get('/:monsterID', async (req: Request, res: Response) => {
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

  // connect to DB
  const connection = await DB();

  // Get data from DB
  const rawMonsterQuery = await connection.query(getOneMonster(+monsterID.value));
  const rawMonsterData = (rawMonsterQuery[0] as any)[0] as MonsterRequest;

  /** Validate Monster Data */
  if (isEmpty(rawMonsterData)) {
    return res.status(404).json({ response: 'Monster Data not found' });
  }

  // Parse monster data
  const monsterData = mapMonsterData(rawMonsterData, +monsterID.value);

  // Send file back to front
  return res.status(200).json({
    response: {
      /** Monster image string */
      monsterImage,
      /** Monster data object */
      monsterData
    }
  });
});

export { route as monstersRoute };
