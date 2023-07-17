import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

const PORT = 3000 as const;
const app = express();

// Mocked data for now!
const mockedUsers = [
  {
    name: 'Rafael',
    username: 'rafa',
    password: 'Rafa1234',
    id: 0
  }
];

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

app.get('/monsters/:monsterID', (req: Request, res: Response) => {
  // Monster Id from params
  const { monsterID } = req.params;

  // Get image from file
  const monsterImage = imageFromFile(monsterID);

  if (!monsterImage) {
    return res.status(404).json({ response: 'Image not found' });
  }

  // Send file back to front
  return res.status(200).json(monsterImage);
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
