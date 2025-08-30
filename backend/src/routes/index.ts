import { Router } from 'express';
import { health } from './health.js';
import { patterns } from './patterns.js';

export const api = Router();

api.use(health);
api.use('/patterns', patterns);
