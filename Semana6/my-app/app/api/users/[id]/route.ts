// app/api/users/[id]/route.ts

import { NextResponse } from 'next/server';

let users = [
  { id: 1, name: 'Juan', email: 'juan@example.com' },
  { id: 2, name: 'Maria', email: 'maria@example.com' },
  // Asegúrate de que los IDs sean números
];

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const user = users.find((user) => user.id === parseInt(id));

  if (!user) {
    return NextResponse.json({ message: 'Usuario no encontrado' }, { status: 404 });
  }

  return NextResponse.json(user);
}


