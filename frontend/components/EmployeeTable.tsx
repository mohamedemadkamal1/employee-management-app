'use client';

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';

type Employee = {
  id: number;
  name: string;
  email: string;
  roleId: number;
  departmentId: number;
};

const columnHelper = createColumnHelper<Employee>();

export function EmployeeTable({
  data,
  onEdit,
  onDelete,
}: {
  data: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: number) => void;
}) {
  const columns = [
    columnHelper.accessor('name', { header: 'Name' }),
    columnHelper.accessor('email', { header: 'Email' }),
    columnHelper.accessor('roleId', { header: 'Role ID' }),
    columnHelper.accessor('departmentId', { header: 'Department ID' }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="space-x-2">
          <button
            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
            onClick={() => onEdit(row.original)}
          >
            Edit
          </button>
          <button
            className="text-sm text-red-500 hover:text-red-700 font-medium"
            onClick={() => onDelete(row.original.id)}
          >
            Delete
          </button>
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto border border-gray-200 rounded-xl bg-white shadow-sm">
      <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
        <thead className="bg-gray-50 text-xs font-semibold text-gray-600">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="px-4 py-3">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="text-gray-800">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50 transition-colors">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-3 border-t">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
