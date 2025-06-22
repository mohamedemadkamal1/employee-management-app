import express from 'express';
import { AppDataSource } from '../data-source';
import { Role } from '../entities/Role';

const router = express.Router();

router.get('/', async (req, res) => {
  const data = await AppDataSource.getRepository(Role).find();
  res.json(data);
});

export default router;
