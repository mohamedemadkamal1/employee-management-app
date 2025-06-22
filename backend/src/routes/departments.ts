import express from 'express';
import { AppDataSource } from '../data-source';
import { Department } from '../entities/Department';

const router = express.Router();

router.get('/', async (req, res) => {
  const data = await AppDataSource.getRepository(Department).find();
  res.json(data);
});

export default router;
