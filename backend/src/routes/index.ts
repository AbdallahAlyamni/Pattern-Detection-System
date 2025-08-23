import { Router } from 'express';
import { users } from './users.js';
import { health } from './health.js';
import { patterns } from './patterns.js';

export const api = Router();

api.use(health);
api.use('/users', users);
api.use('/patterns', patterns);
