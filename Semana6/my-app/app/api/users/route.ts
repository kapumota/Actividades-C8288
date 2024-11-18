// app/api/users/route.ts

import { NextResponse } from 'next/server';

let users = [
  { id: 1, name: 'Juan', email: 'juan@example.com' },
  { id: 2, name: 'Maria', email: 'maria@example.com' },
];

// GET Request: Obtener la lista de usuarios
export async function GET() {
  return NextResponse.json(users);
}

// POST Request: Crear un nuevo usuario
export async function POST(request: Request) {
  const body = await request.json();
  const newUser = { id: users.length + 1, ...body };
  users.push(newUser);
  return NextResponse.json({ message: 'Usuario creado exitosamente', user: newUser });
}

