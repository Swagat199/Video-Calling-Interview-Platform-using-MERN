import express from 'express';
import { ENV } from './lib/env.js';

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({ msg: 'Server is running 12456' });
});
app.listen(ENV.PORT, () => {
  console.log(`Server is running on port ${ENV.PORT}`);
});
console.log(ENV.PORT);
