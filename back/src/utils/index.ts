import path from 'path';
import fs from 'fs';
import axios from 'axios';
import { pipe } from 'fp-ts/lib/function';
import { MonsterData, MonsterRequest } from '@interfaces';

// Download images
export const createMonsterImageFromRequest = async (data: Array<string>) => {
  data.map(downloadImage);
};

export const createMonsterDataFromRequest = async (data: Array<string>) => {
  data.map(monsterData);
};

export const mapMonsterData = (monster: MonsterRequest): MonsterData => ({
  id: monster.id,
  name: monster.name,
  stats: {
    hp: monster.stats.health,
    attributes: {
      agility: monster.stats.agi,
      dexterity: monster.stats.dex,
      inteligence: monster.stats.int,
      luck: monster.stats.luk,
      strength: monster.stats.str,
      vitality: monster.stats.vit
    },
    defense: monster.stats.defense
  },
  exp: {
    base: monster.stats.baseExperience,
    job: monster.stats.jobExperience
  }
});

// createMonsterImageFromRequest([]);

export const downloadImage = async (image: string) => {
  const url = `https://db.irowiki.org/image/monster/${image}.png`;
  const outputPath = path.resolve(__dirname, 'images', 'monsters', `${image}.png`);
  const writer = fs.createWriteStream(outputPath);

  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream'
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
};

export const pushToArray = (array: Array<any>) => (data: any) => {
  array.push(data);
  return array;
};

export const monsterDBPath = path.join(__dirname, '../data/monsters/monsters.json');

export const monsterData = async (monster: string) => {
  const url = `https://www.divine-pride.net/api/database/Monster/${monster}?apiKey=1aa1f34e90e8afdcadcb3c61b6d5fcd9`;
  const writer = (data: string) => fs.writeFileSync(monsterDBPath, data, { encoding: 'utf-8' });

  const response = await axios({
    url,
    method: 'GET'
  });

  const data = fs.readFileSync(monsterDBPath);

  const jsonData = JSON.parse(data.toString()) as { monsters: Array<any> };

  pipe(
    response.data,
    mapMonsterData,
    pushToArray(jsonData.monsters),
    () => jsonData,
    JSON.stringify,
    writer
  );
};

const monsterImagesPath = path.join(__dirname, `../images/monsters`);

export const checkImageExists = (file: string): boolean => {
  const maybeFile = fs.existsSync(path.join(monsterImagesPath, `${file}.png`));

  return maybeFile;
};

export const imageFromFile = (file: string) => {
  return checkImageExists(file)
    ? 'data:image/png;base64,' +
        fs.readFileSync(path.join(monsterImagesPath, `${file}.png`), 'base64')
    : 'data:image/png;base64,' +
        fs.readFileSync(path.join(monsterImagesPath, `not-found.png`), 'base64');
};
