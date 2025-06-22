'use client';

import { useEffect, useState } from 'react';
import { EmployeeTable } from '@/components/EmployeeTable';
import { EmployeeForm } from '@/components/EmployeeForm';
import { EmployeeFormData } from '@/lib/schema';
import {
  createEmployee,
  getEmployees,
  deleteEmployee,
  updateEmployee,
} from '@/lib/api';

type Employee = {
  id: number;
  name: string;
  email: string;
  roleId: number;
  departmentId: number;
};

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  const fetchEmployees = async () => {
    const res = await getEmployees();
    setEmployees(res);
  };

  const handleCreate = async (data: EmployeeFormData) => {
    const result = await createEmployee(data);
    if (result?.success) {
      await fetchEmployees();
      alert('Employee created!');
    } else {
      alert('Failed to create employee');
    }
  };

  const handleEdit = async (data: EmployeeFormData) => {
    if (!editingEmployee) return;
    const result = await updateEmployee(editingEmployee.id, data);
    if (result?.success) {
      await fetchEmployees();
      alert('Employee updated!');
      setEditingEmployee(null);
    } else {
      alert('Failed to update employee');
    }
  };

  const handleDelete = async (id: number) => {
    await deleteEmployee(id);
    await fetchEmployees();
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Employees</h1>
      <EmployeeForm
        key={editingEmployee?.id || 'new'}
        onSubmit={editingEmployee ? handleEdit : handleCreate}
        defaultValues={editingEmployee || undefined}
      />
      <EmployeeTable
        data={employees}
        onEdit={setEditingEmployee}
        onDelete={handleDelete}
      />
    </div>
  );
}
