// app/users/page.tsx

import React from 'react';

export default async function UsersPage() {
  const res = await fetch('http://localhost:3000/api/users', { cache: 'no-store' });
  const users = await res.json();

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <ul>
        {users.map((user: any) => (
          <li key={user.id}>
            <a href={`/users/${user.id}`}>{user.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

