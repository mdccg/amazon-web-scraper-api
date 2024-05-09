import { app } from './app';
import dotenv from 'dotenv';

dotenv.config();

const { PORT } = process.env;

const server = app.listen(PORT, () =>
  console.log(`App listening to port ${PORT}`)
);

process.on('SIGINT', () => {
  server.close();
  console.log('Server closed');
});