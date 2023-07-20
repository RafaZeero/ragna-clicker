export type Environment = Readonly<{
  type: 'development' | 'alpha' | 'production';
  apiKey: {
    'divine-pride': string;
  };
  hash: {
    salt: string;
  };
  apiURL: string;
}>;
