import { DB } from '@db';

const db = DB();

export const getOneMonster = (id: number) => {
  const query = `
  SELECT name_english, level, hp, base_exp, job_exp, str, agi, vit, \`int\`, dex, luk 
  FROM mob_db 
  WHERE id = ${id};`;

  const a = db.query(query);
  console.log(a);

  return a;
};
