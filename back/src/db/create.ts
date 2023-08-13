import { mapMonsterData } from '@utils';
import * as fs from 'fs';
import { pipe } from 'fp-ts/function';
import type { Connection } from 'mysql2';
import path from 'path';
import { MonsterData } from '@interfaces';

/** Sample to create the mySQL schema */

const createTables = `
CREATE TABLE monsters (
  id INT,
  name VARCHAR(255),
  PRIMARY KEY (id)
);

CREATE TABLE monsters_stats (
  monster_id INT,
  id INT,
  hp INT,
  defense INT,
  PRIMARY KEY (id),
  FOREIGN KEY (monster_id) REFERENCES monsters(id)
);

CREATE TABLE monsters_stats_attributes (
  monster_stats_id INT,
  id INT,
  agility INT,
  dexterity INT,
  inteligence INT,
  luck INT,
  strength INT,
  vitality INT,
  PRIMARY KEY (id),
  FOREIGN KEY (monster_stats_id) REFERENCES monsters_stats(id)
);

CREATE TABLE monsters_exp (
  monster_id INT,
  id INT,
  base INT,
  job INT,
  PRIMARY KEY (id),
  FOREIGN KEY (monster_id) REFERENCES monsters(id)
);
`;

const makeMonsterQueries = (monster: MonsterData) => {
  const monsters = `INSERT INTO monsters (id, name) VALUES (${monster.id}, '${monster.name}');`;
  const monsters_stats = `INSERT INTO monsters_stats (monster_id, id, hp, defense) VALUES (${monster.id}, ${monster.id}, ${monster.stats.hp}, '${monster.stats.defense}');`;
  const monsters_stats_attributes = `INSERT INTO monsters_stats_attributes (monster_stats_id, id, agility, dexterity, inteligence, luck, strength, vitality)
    VALUES (${monster.id}, ${monster.id},
     ${monster.stats.attributes.agility}, ${monster.stats.attributes.dexterity},
     ${monster.stats.attributes.inteligence}, ${monster.stats.attributes.luck},
     ${monster.stats.attributes.strength}, ${monster.stats.attributes.vitality}
     );`;
  const monsters_exp = `INSERT INTO monsters_exp (monster_id, id, base, job)
    VALUES (${monster.id}, ${monster.id}, ${monster.exp.base}, ${monster.exp.job});`;

  return { monsters, monsters_stats, monsters_stats_attributes, monsters_exp };
};

const monsterJsonPath = path.join(__dirname, 'monsters.json');

export const populateWithJson = () => {
  const data = fs.readFileSync(monsterJsonPath);

  const dbJson = JSON.parse(data.toString()) as { monsters: Array<MonsterData> };

  const monsters = dbJson.monsters.map(makeMonsterQueries);

  return { table: { monsters } };
};

export const populateFromRequest = (data: MonsterData, db: Connection) =>
  pipe(
    /** Make queries with monster data */
    makeMonsterQueries(data),
    /** Put monster in the DB */
    queries => Object.values(queries).forEach(query => db.query(query))
  );
