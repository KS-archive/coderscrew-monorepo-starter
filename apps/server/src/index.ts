import express from 'express';

import { increment } from '@ccms/utils';

import { log } from '@/utils/log';

const app = express();
const port = increment(3001);

app.get('/', (_, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  log(`Example app listening at http://localhost:${port}`);
});
