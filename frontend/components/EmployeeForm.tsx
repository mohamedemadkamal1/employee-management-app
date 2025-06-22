'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { employeeSchema, EmployeeFormData } from '@/lib/schema';
import { getRoles, getDepartments } from '@/lib/api';

export function EmployeeForm({
  onSubmit,
  defaultValues,
}: {
  onSubmit: (data: EmployeeFormData) => void;
  defaultValues?: Partial<EmployeeFormData>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    defaultValues,
  });

  const [roles, setRoles] = useState<{ id: number; name: string }[]>([]);
  const [departments, setDepartments] = useState<
    { id: number; name: string }[]
  >([]);

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  useEffect(() => {
    getRoles()
      .then(setRoles)
      .catch(() => setRoles([]));
    getDepartments()
      .then(setDepartments)
      .catch(() => setDepartments([]));
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 bg-white border border-gray-200 shadow-sm rounded-xl p-6"
    >
      <h2 className="text-lg font-semibold text-gray-800">
        {defaultValues ? 'Edit Employee' : 'Create New Employee'}
      </h2>

      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          {...register('name')}
          placeholder="Enter full name"
          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-black text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.name && (
          <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          {...register('email')}
          placeholder="Enter email"
          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-black text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Role */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Role</label>
        <select
          {...register('roleId')}
          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select role</option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
        {errors.roleId && (
          <p className="text-sm text-red-500 mt-1">{errors.roleId.message}</p>
        )}
      </div>

      {/* Department */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Department
        </label>
        <select
          {...register('departmentId')}
          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select department</option>
          {departments.map((dept) => (
            <option key={dept.id} value={dept.id}>
              {dept.name}
            </option>
          ))}
        </select>
        {errors.departmentId && (
          <p className="text-sm text-red-500 mt-1">
            {errors.departmentId.message}
          </p>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition-all"
        >
          {defaultValues ? 'Update Employee' : 'Add Employee'}
        </button>
      </div>
    </form>
  );
}
