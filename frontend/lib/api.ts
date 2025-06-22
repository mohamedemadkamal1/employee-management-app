// frontend/lib/api.ts

export async function getEmployees() {
  const res = await fetch('http://localhost:3001/employees');

  return res.json();
}

export async function createEmployee(data: unknown) {
  const res = await fetch('http://localhost:3001/employees', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateEmployee(id: number, data: unknown) {
  const res = await fetch(`http://localhost:3001/employees/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteEmployee(id: number) {
  const res = await fetch(`http://localhost:3001/employees/${id}`, {
    method: 'DELETE',
  });
  return res.json();
}

export async function getRoles() {
  const res = await fetch('http://localhost:3001/roles');
  return res.json();
}

export async function getDepartments() {
  const res = await fetch('http://localhost:3001/departments');
  return res.json();
}
