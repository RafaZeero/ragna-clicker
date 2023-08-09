/** Sample to create the mySQL schema */

const create = `
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
