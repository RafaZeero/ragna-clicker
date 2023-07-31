import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import axios from 'axios';
import { pipe } from 'fp-ts/lib/function';
import { MonsterRequest, MonsterData } from './src/main';

const PORT = 3000 as const;
const app = express();

// Mocked data for now!
const mockedUsers = [
  {
    name: 'Rafael',
    username: 'rafa',
    password: 'Rafa1234',
    id: 0,
    attributes: {
      strength: 1,
      agility: 1,
      dexterity: 1,
      inteligence: 1,
      luck: 1,
      vitality: 1
    }
  }
];

// Download images
const createMonsterImageFromRequest = async (data: Array<string>) => {
  data.map(downloadImage);
};

const createMonsterDataFromRequest = async (data: Array<string>) => {
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

async function downloadImage(image: string) {
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
}

const pushToArray = (array: Array<any>) => (data: any) => {
  array.push(data);
  return array;
};

const monsterDBPath = path.resolve(__dirname, 'data', 'monsters', 'monsters.json');
async function monsterData(monster: string) {
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
}

const checkImageExists = (file: string): boolean => {
  const maybeFile = fs.existsSync(path.join(__dirname, `/images/monsters/${file}.png`));

  return maybeFile;
};

const imageFromFile = (file: string) => {
  return checkImageExists(file)
    ? 'data:image/png;base64,' +
        fs.readFileSync(path.join(__dirname, `/images/monsters/${file}.png`), 'base64')
    : 'data:image/png;base64,' +
        fs.readFileSync(path.join(__dirname, `/images/monsters/not-found.png`), 'base64');
};

app.use(cors());
app.use(express.json());

app.get('/ping', (_req: Request, res: Response) => {
  res.json({ pong: 'henlo' });
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

app.get('/monsters/:monsterID', (req: Request, res: Response) => {
  // Monster Id from params
  const { monsterID } = req.params;

  // Get image from file
  const monsterImage = imageFromFile(monsterID);

  if (!monsterImage) {
    return res.status(404).json({ response: 'Image not found' });
  }

  // Get data from file
  const monsterInfo = fs.readFileSync(monsterDBPath);
  const jsonData = JSON.parse(monsterInfo.toString()) as { monsters: Array<any> };

  const monsterData = jsonData.monsters.find(monster => monster.id === parseInt(monsterID));

  if (!monsterData) {
    return res.status(404).json({ response: 'Monster Data not found' });
  }

  // Send file back to front
  return res.status(200).json({ response: { monsterImage, monsterData } });
});

// TODO: proper endpoint for login
app.post('/users/:userID', (req: Request, res: Response) => {
  const { userID } = req.params;

  // TODO: find user in a db
  const user = mockedUsers.find(user => user.id === parseInt(userID));

  // TODO: proper login validation
  if (!(user?.username === req.body.username) || !(user?.password === req.body.password)) {
    return res.status(404).json({ data: 'Invalid credentials' });
  }

  // TODO: improve response messages
  return user
    ? res.status(200).json({ data: user })
    : res.status(404).json({ data: 'User not found' });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
