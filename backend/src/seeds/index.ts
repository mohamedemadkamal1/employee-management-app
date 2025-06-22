import { AppDataSource } from '../data-source';
import { Role } from '../entities/Role';
import { Department } from '../entities/Department';

export default async function () {
  const roleRepo = AppDataSource.getRepository(Role);
  const departmentRepo = AppDataSource.getRepository(Department);

  const roleCount = await roleRepo.count();
  if (roleCount === 0) {
    await roleRepo.save([
      { name: 'Frontend Developer' },
      { name: 'Backend Developer' },
    ]);
  }

  const departmentCount = await departmentRepo.count();
  if (departmentCount === 0) {
    await departmentRepo.save([{ name: 'Engineering' }, { name: 'Marketing' }]);
  }
}
