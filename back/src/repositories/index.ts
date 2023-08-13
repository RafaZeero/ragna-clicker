export const getOneMonster = (id: number) => {
  const query = `
  SELECT name_english, level, hp, base_exp, job_exp, str, agi, vit, \`int\`, dex, luk, defense, magic_defense, size, race, element, element_level
  FROM mob_db 
  WHERE id = ${id};`;

  return query;
};
