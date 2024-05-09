import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import { router } from './routes';

export const app = express();

app.use(express.json());
app.use(cors());
app.use(logger('dev'));
app.use('/', router);
app.get('/', (_, res) => res.send('Amazon Web Scraper API'));