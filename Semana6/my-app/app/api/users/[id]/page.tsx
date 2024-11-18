// app/users/[id]/page.tsx

import React from 'react';

async function getUser(id: string) {
  const res = await fetch(`http://localhost:3000/api/users/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    return null;
  }
  const user = await res.json();
  return user;
}

export default async function UserPage({ params }: { params: { id: string } }) {
  const user = await getUser(params.id);

  if (!user) return <div>Usuario no encontrado</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}

