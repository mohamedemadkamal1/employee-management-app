import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './data-source';
import employeeRoutes from './routes/employees';
import roleRoutes from './routes/roles';
import departmentRoutes from './routes/departments';
import seeds from './seeds';

const app = express();
app.use(
  cors({
    origin: '*',
  })
);
app.use(express.json());

app.use('/employees', employeeRoutes);
app.use('/roles', roleRoutes);
app.use('/departments', departmentRoutes);

AppDataSource.initialize().then(async () => {
  await seeds();
  app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
  });
});
