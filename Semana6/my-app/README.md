### Guía detallada para construir una aplicación Next.js con REST y GraphQL

En este documento, exploraremos en detalle cómo construir una aplicación web utilizando Next.js que incorpora tanto una API REST como una API GraphQL. A lo largo de esta guía, cubriremos cómo iniciar un proyecto de Next.js, las dependencias necesarias, el uso de Apollo Server para GraphQL, y conceptos fundamentales como rutas dinámicas y endpoints. Utilizaremos el código proporcionado como base para nuestra explicación.

## Índice

1. [Introducción a Next.js](#introducción-a-nextjs)
2. [Configuración inicial del proyecto](#configuración-inicial-del-proyecto)
   - 2.1 [Instalación de Next.js](#instalación-de-nextjs)
   - 2.2 [Estructura del proyecto](#estructura-del-proyecto)
3. [Dependencias y configuraciones](#dependencias-y-configuraciones)
   - 3.1 [Dependencias esenciales](#dependencias-esenciales)
   - 3.2 [Configuración de Tailwind CSS](#configuración-de-tailwind-css)
   - 3.3 [Configuración de Apollo Server](#configuración-de-apollo-server)
4. [Implementación de la API REST](#implementación-de-la-api-rest)
   - 4.1 [Creación de endpoints REST](#creación-de-endpoints-rest)
   - 4.2 [Manejo de peticiones GET y POST](#manejo-de-peticiones-get-y-post)
5. [Rutas Dinámicas en Next.js](#rutas-dinámicas-en-nextjs)
   - 5.1 [Creación de páginas dinámicas](#creación-de-páginas-dinámicas)
   - 5.2 [Uso de parámetros en las rutas](#uso-de-parámetros-en-las-rutas)
6. [Implementación de la API GraphQL](#implementación-de-la-api-graphql)
   - 6.1 [Definición del esquema GraphQL](#definición-del-esquema-graphql)
   - 6.2 [Creación de Resolvers](#creación-de-resolvers)
   - 6.3 [Configuración del servidor Apollo](#configuración-del-servidor-apollo)
7. [Integración y pruebas](#integración-y-pruebas)
   - 7.1 [Probando la API REST](#probando-la-api-rest)
   - 7.2 [Probando la API GraphQL](#probando-la-api-graphql)
8. [Conclusiones](#conclusiones)

#### Introducción a Next.js

Next.js es un framework de React que permite la creación de aplicaciones web con renderizado del lado del servidor (SSR) y generación de sitios estáticos (SSG). Proporciona características como rutas automáticas, soporte para TypeScript, optimización de imágenes y más, lo que facilita el desarrollo de aplicaciones web modernas y eficientes.

#### Configuración inicial del proyecto

#### Instalación de Next.js

Para iniciar un nuevo proyecto de Next.js, necesitas tener instalado Node.js y npm en tu máquina. Puedes crear un nuevo proyecto utilizando el comando:

```bash
npx create-next-app my-app --typescript
```

Este comando crea una nueva carpeta `my-app` con una estructura básica de Next.js y soporte para TypeScript.

#### Estructura del proyecto

Una vez creado el proyecto, tendrás una estructura similar a la siguiente:

- **app**: Directorio principal de la aplicación.
  - **layout.tsx**: Define el diseño global de la aplicación.
  - **page.tsx**: Punto de entrada de la aplicación.
  - **globals.css**: Estilos globales.
  - **fonts/**: Fuentes personalizadas.
  - **favicon.ico**: Icono del sitio.
- **public**: Archivos estáticos (imágenes, fuentes, etc.).
- **next.config.ts**: Configuración del framework Next.js.
- **tailwind.config.ts**: Configuración de Tailwind CSS.
- **tsconfig.json**: Configuración de TypeScript.
- **node_modules**: Módulos de Node.js instalados.


#### Dependencias y configuraciones

#### Dependencias esenciales

Para este proyecto, necesitamos instalar algunas dependencias adicionales:

- **Tailwind CSS**: Para estilos rápidos y responsivos.
- **Apollo Server**: Para configurar nuestra API GraphQL.
- **graphql**: Necesario para Apollo Server.
- **@apollo/server**, **@as-integrations/next**, **graphql-tag**: Paquetes relacionados con Apollo Server y GraphQL.

Puedes instalarlos usando:

```bash
npm install tailwindcss @apollo/server @as-integrations/next graphql graphql-tag
```

#### Configuración de Tailwind CSS

Tailwind CSS es un framework de utilidades que permite diseñar rápidamente interfaces web. Después de instalarlo, necesitas configurar los archivos `tailwind.config.ts` y `globals.css`.

**tailwind.config.ts**:

```typescript
import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
```

Este archivo indica a Tailwind dónde buscar clases para generar los estilos y permite extender la configuración por defecto.

**globals.css**:

Asegúrate de importar Tailwind CSS en tu archivo `globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Puedes agregar estilos globales aquí */
```

#### Configuración de Apollo Server

Apollo Server es una implementación de GraphQL que facilita la creación de un servidor GraphQL en Next.js. Configuraremos Apollo Server en la sección de implementación de la API GraphQL.


### Implementación de la API REST

#### Creación de endpoints REST

Next.js permite crear rutas API fácilmente dentro del directorio `app/api`. Vamos a crear un endpoint para manejar usuarios.

**Estructura de archivos**:

- `app/api/users/route.ts`: Maneja peticiones a `/api/users`.
- `app/api/users/[id]/route.ts`: Maneja peticiones a `/api/users/:id`.

#### Manejo de peticiones GET y POST

**app/api/users/route.ts**:

```typescript
import { NextResponse } from 'next/server';

let users = [
  { id: 1, name: 'Juan', email: 'juan@example.com' },
  { id: 2, name: 'Maria', email: 'maria@example.com' },
];

// GET: Obtener la lista de usuarios
export async function GET() {
  return NextResponse.json(users);
}

// POST: Crear un nuevo usuario
export async function POST(request: Request) {
  const body = await request.json();
  const newUser = { id: users.length + 1, ...body };
  users.push(newUser);
  return NextResponse.json({ message: 'Usuario creado exitosamente', user: newUser });
}
```

Este archivo define dos funciones:

- **GET**: Devuelve la lista de usuarios en formato JSON.
- **POST**: Agrega un nuevo usuario a la lista.

**app/api/users/[id]/route.ts**:

```typescript
import { NextResponse } from 'next/server';

let users = [
  { id: 1, name: 'Juan', email: 'juan@example.com' },
  { id: 2, name: 'Maria', email: 'maria@example.com' },
];

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const user = users.find((user) => user.id === parseInt(id));

  if (!user) {
    return NextResponse.json({ message: 'Usuario no encontrado' }, { status: 404 });
  }

  return NextResponse.json(user);
}
```

Esta ruta dinámica permite obtener un usuario específico mediante su ID.


#### Rutas dinámicas en Next.js

#### Creación de páginas dinámicas

Next.js permite crear rutas dinámicas utilizando corchetes en el nombre del archivo. Por ejemplo, `[id].tsx` creará una ruta dinámica que acepta cualquier valor en lugar de `[id]`.

**app/users/[id]/page.tsx**:

```tsx
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
```

Esta página obtiene los detalles de un usuario específico utilizando su ID de la URL.

#### Uso de parámetros en las rutas

En Next.js, los parámetros de las rutas dinámicas se acceden a través de `params`. En el ejemplo anterior, `params.id` nos da el ID del usuario que se está solicitando.


#### Implementación de la API GraphQL

#### Definición del esquema GraphQL

GraphQL utiliza esquemas para definir los tipos de datos y las operaciones disponibles. Usaremos `gql` de `graphql-tag` para definir nuestro esquema.

**app/api/route.ts**:

```typescript
import { gql } from 'graphql-tag';

// Definición del esquema GraphQL
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    users: [User]
  }

  type Mutation {
    createUser(name: String!, email: String!): User
  }
`;
```

Este esquema define:

- **Tipos**:
  - `User`: Representa un usuario con `id`, `name` y `email`.
- **Consultas**:
  - `users`: Devuelve una lista de usuarios.
- **Mutaciones**:
  - `createUser`: Crea un nuevo usuario.

#### Creación de Resolvers

Los resolvers son funciones que manejan las operaciones definidas en el esquema.

```typescript
// Datos iniciales
let users = [
  { id: '1', name: 'Juan', email: 'juan@example.com' },
  { id: '2', name: 'Maria', email: 'maria@example.com' },
];

// Resolvers para manejar consultas y mutaciones
const resolvers = {
  Query: {
    users: () => users,
  },
  Mutation: {
    createUser: (_: any, { name, email }: { name: string; email: string }) => {
      const newUser = { id: `${users.length + 1}`, name, email };
      users.push(newUser);
      return newUser;
    },
  },
};
```

- **Query**:
  - `users`: Devuelve la lista de usuarios.
- **Mutation**:
  - `createUser`: Crea un nuevo usuario y lo agrega a la lista.

#### Configuración del servidor Apollo

Configuramos Apollo Server para que funcione con Next.js.

```typescript
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { NextRequest } from 'next/server';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

// Inicializar Apollo Server con el plugin para el Landing Page
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  plugins: [ApolloServerPluginLandingPageLocalDefault()],
});

// Crear manejador para Next.js
const handler = startServerAndCreateNextHandler(server);

// Exportar los métodos GET y POST
export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}
```

- **ApolloServer**: Inicializa el servidor con `typeDefs` y `resolvers`.
- **startServerAndCreateNextHandler**: Conecta Apollo Server con Next.js.
- **GET y POST**: Exportamos estas funciones para manejar peticiones HTTP.


#### Integración y pruebas

#### Probando la API REST

Puedes probar los endpoints REST utilizando herramientas como `curl` o Postman.

**Obtener todos los usuarios**:

```bash
curl http://localhost:3000/api/users
```

**Crear un nuevo usuario**:

```bash
curl -X POST http://localhost:3000/api/users -H "Content-Type: application/json" -d '{"name":"Luis","email":"luis@example.com"}'
```

**Obtener un usuario específico**:

```bash
curl http://localhost:3000/api/users/1
```

#### Probando la API GraphQL

Visita `http://localhost:3000/api` en tu navegador. Deberías ver la interfaz de Apollo Sandbox donde puedes ejecutar consultas y mutaciones.

**Consulta para obtener usuarios**:

```graphql
query {
  users {
    id
    name
    email
  }
}
```

**Mutación para crear un usuario**:

```graphql
mutation {
  createUser(name: "Ana", email: "ana@example.com") {
    id
    name
    email
  }
}
```


#### Conclusiones

Hemos explorado cómo construir una aplicación Next.js que incorpora tanto una API REST como una API GraphQL. A lo largo de esta guía, cubrimos:

- **Iniciar un proyecto Next.js**: Utilizando `create-next-app` con soporte para TypeScript.
- **Dependencias y configuraciones**: Instalamos y configuramos Tailwind CSS y Apollo Server.
- **Implementación de la API REST**: Creamos endpoints para manejar peticiones GET y POST.
- **Rutas dinámicas**: Utilizamos rutas dinámicas para mostrar detalles de usuarios individuales.
- **Implementación de la API GraphQL**: Definimos un esquema GraphQL, creamos resolvers y configuramos Apollo Server.
- **Pruebas**: Probamos nuestros endpoints utilizando herramientas como `curl` y la interfaz de Apollo Sandbox.

Este proyecto demuestra cómo Next.js puede ser una potente herramienta para desarrollar aplicaciones web modernas, combinando la flexibilidad de las APIs REST con la eficiencia y estructura de GraphQL.


#### Recursos adicionales

- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de Apollo Server](https://www.apollographql.com/docs/apollo-server/)
- [Introducción a GraphQL](https://graphql.org/learn/)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

#### Anexos

#### Archivo: next.config.ts

```typescript
import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    appDir: true,
  },
};

export default nextConfig;
```

Este archivo configura Next.js para utilizar la nueva característica experimental `appDir`, que permite estructurar la aplicación de manera más modular.

#### Archivo: app/api/hello/route.ts

```typescript
export async function GET() {
  return new Response(JSON.stringify({ message: 'Hello, World!' }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
```

Este es un ejemplo sencillo de un endpoint que devuelve un mensaje de saludo.

#### Detalles técnicos adicionales

#### Uso de `NextResponse`

`NextResponse` es una clase proporcionada por Next.js que facilita la creación de respuestas HTTP en las rutas API.

**Ejemplo**:

```typescript
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Hola Mundo' });
}
```

#### Fetch API en el lado del servidor

En las páginas Next.js, especialmente en `getServerSideProps` o en componentes asíncronos, podemos utilizar la API `fetch` para hacer peticiones a nuestros endpoints.

**Ejemplo**:

```tsx
const res = await fetch('http://localhost:3000/api/users', { cache: 'no-store' });
const users = await res.json();
```

- **cache: 'no-store'**: Evita que los datos sean almacenados en caché, asegurando que siempre obtenemos la información más reciente.

#### Rutas anidadas en Next.js

Next.js permite crear rutas anidadas simplemente organizando los archivos y carpetas dentro del directorio `app`.

**Ejemplo**:

- `app/users/page.tsx`: Ruta para `/users`.
- `app/users/[id]/page.tsx`: Ruta para `/users/:id`.

#### Tipado con TypeScript

El uso de TypeScript mejora la robustez del código al proporcionar tipado estático.

**Ejemplo**:

```typescript
type User = {
  id: number;
  name: string;
  email: string;
};

const users: User[] = [...];
```

#### Mejoras y consideraciones futuras

- **Persistencia de datos**: Actualmente, los datos de usuarios se almacenan en memoria. Para una aplicación real, deberíamos utilizar una base de datos como PostgreSQL, MongoDB o SQLite.
- **Autenticación y autorización**: Implementar mecanismos para asegurar las rutas y proteger la información sensible.
- **Validación de datos**: Antes de agregar un nuevo usuario, validar que los campos requeridos estén presentes y que los formatos sean correctos.
- **Manejo de errores**: Mejorar el manejo de errores para proporcionar feedback más útil a los usuarios y desarrolladores.

