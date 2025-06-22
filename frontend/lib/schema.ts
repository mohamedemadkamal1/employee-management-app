import { z } from 'zod';

export const employeeSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  roleId: z.coerce.number().int(),
  departmentId: z.coerce.number().int(),
});

export type EmployeeFormData = z.infer<typeof employeeSchema>;
