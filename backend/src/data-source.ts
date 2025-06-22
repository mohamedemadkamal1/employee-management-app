import { DataSource } from 'typeorm';
import { Employee } from './entities/Employee';
import { Role } from './entities/Role';
import { Department } from './entities/Department';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'employee_db',
  synchronize: true,
  logging: false,
  entities: [Employee, Role, Department],
});
