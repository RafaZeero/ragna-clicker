import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

const PORT = 3000 as const;
const app = express();

const imageFromFile = (file: string) => {
  return (
    'data:image/png;base64,' +
    fs.readFileSync(path.join(__dirname, `/images/monsters/${file}.png`), 'base64')
  );
};

app.use(cors());
app.use(express.json());

app.get('/ping', (_req: Request, res: Response) => {
  res.json({ pong: 'henlo' });
});

app.get('/monsters/:monsterID', (req: Request, res: Response) => {
  // Monster Id from params
  const { monsterID } = req.params;

  // Get image from file
  const monsterImage = imageFromFile(monsterID);

  // Send file back to front
  res.status(200).json(monsterImage);
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
