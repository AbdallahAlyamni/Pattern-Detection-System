import { Router } from 'express';
// pretend in-memory data
const USERS = [
  { id: 1, name: 'Aisha' },
  { id: 2, name: 'Omar' }
];

export const users = Router();

users.get('/', (_req, res) => res.json(USERS));

users.post('/', (req, res) => {
  const { name } = req.body as { name?: string };
  if (!name) return res.status(400).json({ error: 'name is required' });
  const user = { id: USERS.length + 1, name };
  USERS.push(user);
  res.status(201).json(user);
});
