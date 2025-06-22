import express from 'express';
import { AppDataSource } from '../data-source';
import { Employee } from '../entities/Employee';
import { Role } from '../entities/Role';
import { Department } from '../entities/Department';

const router = express.Router();

router.get('/', async (req, res) => {
  const repo = AppDataSource.getRepository(Employee);
  const data = await repo.find();

  const response = data.map((employee) => ({
    id: employee.id,
    name: employee.name,
    email: employee.email,
    role: employee.role!.id,
    department: employee.department!.id,
  }));

  res.json(response);
});

router.post('/', async (req: any, res: any) => {
  const repo = AppDataSource.getRepository(Employee);
  const { name, email, roleId, departmentId } = req.body;

  const role = await AppDataSource.getRepository(Role).findOneBy({
    id: roleId,
  });

  const dept = await AppDataSource.getRepository(Department).findOneBy({
    id: departmentId,
  });

  if (!role || !dept) {
    return res.status(400).json({ error: 'Invalid roleId or departmentId' });
  }

  const employee = repo.create({
    name,
    email,
    role: role.id,
    department: dept.id,
  } as any);

  const saved = await repo.save(employee);
  res.json(saved);
});

router.put('/:id', async (req: any, res: any) => {
  const repo = AppDataSource.getRepository(Employee);
  const employee = await repo.findOneBy({ id: Number(req.params.id) });

  if (!employee) return res.status(404).send('Not found');

  const { name, email, roleId, departmentId } = req.body;

  const role = await AppDataSource.getRepository(Role).findOneBy({
    id: roleId,
  });
  const dept = await AppDataSource.getRepository(Department).findOneBy({
    id: departmentId,
  });

  Object.assign(employee, { name, email, role, department: dept });
  const updated = await repo.save(employee);
  res.json(updated);
});

router.delete('/:id', async (req, res) => {
  const repo = AppDataSource.getRepository(Employee);
  await repo.delete(req.params.id);
  res.json({ success: true });
});

export default router;
