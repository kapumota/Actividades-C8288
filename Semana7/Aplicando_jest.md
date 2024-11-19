### Añadiendo pruebas unitarias e integración con Jest en un proyecto Next.js

En esta sección, ampliaremos el proyecto previamente descrito para incluir pruebas unitarias e integración utilizando Jest. 
También exploraremos cómo utilizar **mocks**, **stubs** y **fakes** para simular dependencias y aislar el código bajo prueba.

#### Índice

1. [Introducción a Jest](#introducción-a-jest)
2. [Configuración de Jest en Next.js](#configuración-de-jest-en-nextjs)
   - 2.1 [Instalación de dependencias](#instalación-de-dependencias)
   - 2.2 [Configuración de archivos](#configuración-de-archivos)
3. [Escribiendo pruebas unitarias](#escribiendo-pruebas-unitarias)
   - 3.1 [Pruebas para la API REST](#pruebas-para-la-api-rest)
   - 3.2 [Pruebas para la API GraphQL](#pruebas-para-la-api-graphql)
4. [Mocks, Stubs y Fakes en Jest](#mocks-stubs-y-fakes-en-jest)
   - 4.1 [Uso de Mocks](#uso-de-mocks)
   - 4.2 [Uso de Stubs](#uso-de-stubs)
   - 4.3 [Uso de Fakes](#uso-de-fakes)
5. [Pruebas de integración](#pruebas-de-integración)
   - 5.1 [Probando rutas de Next.js](#probando-rutas-de-nextjs)
6. [Ejecutando las pruebas](#ejecutando-las-pruebas)


#### Introducción a Jest

Jest es un popular framework de pruebas en JavaScript que facilita la escritura de pruebas unitarias y de integración. Proporciona una sintaxis sencilla y herramientas poderosas para realizar **mocks**, **stubs** y **fakes**.


#### Configuración de Jest en Next.js

#### Instalación de dependencias

Para comenzar, necesitamos instalar Jest y algunas dependencias relacionadas:

```bash
npm install --save-dev jest @types/jest ts-jest babel-jest @babel/core @babel/preset-env @babel/preset-typescript
```

- **jest**: El framework de pruebas en sí.
- **@types/jest**: Tipos de TypeScript para Jest.
- **ts-jest**: Permite ejecutar pruebas escritas en TypeScript.
- **babel-jest**, **@babel/core**, **@babel/preset-env**, **@babel/preset-typescript**: Necesarios para transpilar el código TypeScript durante las pruebas.

#### Configuración de archivos

#### 1. Configurar Babel

Crea un archivo `.babelrc` en la raíz del proyecto:

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-typescript"]
}
```

#### 2. Configurar Jest

Crea un archivo `jest.config.js`:

```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  testMatch: ['**/__tests__/**/*.test.ts'],
};
```

- **preset**: Usamos `ts-jest` para soportar TypeScript.
- **testEnvironment**: Establecemos el entorno de pruebas en `node`.
- **moduleNameMapper**: Configuración para resolver rutas absolutas si las utilizamos.
- **testMatch**: Patrón para encontrar archivos de pruebas.



#### Escribiendo pruebas unitarias

Crearemos pruebas unitarias para nuestras funciones y componentes.

#### Pruebas para la API REST

#### Estructura de archivos

Crearemos una carpeta `__tests__` en la raíz del proyecto o dentro de `app/api/users` para organizar las pruebas.

#### Prueba de la función GET

**Archivo**: `__tests__/usersApi.test.ts`

```typescript
import { GET, POST } from '@/app/api/users/route';
import { NextRequest } from 'next/server';

describe('API REST - Users', () => {
  it('Debe devolver la lista de usuarios', async () => {
    const response = await GET();
    const users = await response.json();
    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBeGreaterThan(0);
  });

  it('Debe crear un nuevo usuario', async () => {
    const newUser = { name: 'Luis', email: 'luis@example.com' };
    const request = new NextRequest('http://localhost:3000/api/users', {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: { 'Content-Type': 'application/json' },
    });
    const response = await POST(request);
    const data = await response.json();
    expect(data.message).toBe('Usuario creado exitosamente');
    expect(data.user.name).toBe('Luis');
  });
});
```

**Explicación**:

- Usamos `describe` para agrupar las pruebas relacionadas.
- En el primer test, llamamos a `GET()` y verificamos que devuelve un array de usuarios.
- En el segundo test, simulamos una petición `POST` para crear un nuevo usuario.

#### Pruebas para la API GraphQL

#### Prueba de la consulta de usuarios

**Archivo**: `__tests__/graphqlApi.test.ts`

```typescript
import { ApolloServer } from '@apollo/server';
import { resolvers, typeDefs } from '@/app/api/route';
import { createTestClient } from 'apollo-server-testing';

describe('API GraphQL - Users', () => {
  let server: ApolloServer;

  beforeAll(() => {
    server = new ApolloServer({ typeDefs, resolvers });
  });

  it('Debe devolver la lista de usuarios', async () => {
    const { query } = createTestClient(server);
    const GET_USERS = `
      query {
        users {
          id
          name
          email
        }
      }
    `;
    const res = await query({ query: GET_USERS });
    expect(res.data?.users.length).toBeGreaterThan(0);
  });

  it('Debe crear un nuevo usuario', async () => {
    const { mutate } = createTestClient(server);
    const CREATE_USER = `
      mutation {
        createUser(name: "Ana", email: "ana@example.com") {
          id
          name
          email
        }
      }
    `;
    const res = await mutate({ mutation: CREATE_USER });
    expect(res.data?.createUser.name).toBe('Ana');
  });
});
```

**Explicación**:

- Utilizamos `createTestClient` de `apollo-server-testing` para simular peticiones al servidor Apollo.
- Probamos tanto la consulta de usuarios como la mutación para crear un usuario.


#### Mocks, Stubs y Fakes en Jest

#### Uso de Mocks

Los **mocks** son objetos o funciones simuladas que reemplazan el comportamiento real, permitiendo controlar el entorno de pruebas.

#### Ejemplo: Mock de `fetch`

Supongamos que queremos probar una función que utiliza `fetch` para obtener datos.

**Función a probar**:

```typescript
export async function getData() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();
  return data;
}
```

**Prueba con Mock**:

```typescript
import { getData } from '@/utils/data';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: 'mocked data' }),
  })
);

test('Debe obtener datos simulados', async () => {
  const data = await getData();
  expect(data).toEqual({ data: 'mocked data' });
});
```

**Explicación**:

- Reemplazamos `fetch` globalmente con una función simulada que devuelve datos predefinidos.
- Esto nos permite probar `getData` sin hacer una petición real.

#### Uso de Stubs

Los **stubs** son similares a los mocks, pero generalmente se utilizan para reemplazar funciones o métodos que tienen efectos secundarios.

#### Ejemplo: Stub de una función de base de datos

Supongamos que tenemos una función que guarda datos en una base de datos.

**Función a probar**:

```typescript
export async function saveUser(user: User) {
  return database.save(user);
}
```

**Prueba con Stub**:

```typescript
import { saveUser } from '@/utils/user';
import * as database from '@/utils/database';

jest.spyOn(database, 'save').mockImplementation(async (user) => {
  return { id: 1, ...user };
});

test('Debe guardar un usuario usando un stub', async () => {
  const user = { name: 'Test', email: 'test@example.com' };
  const savedUser = await saveUser(user);
  expect(savedUser.id).toBe(1);
  expect(database.save).toHaveBeenCalledWith(user);
});
```

**Explicación**:

- Usamos `jest.spyOn` para espiar y reemplazar la implementación de `database.save`.
- Ahora, `database.save` devolverá un usuario simulado sin interactuar con una base de datos real.

#### Uso de Fakes

Los **fakes** son objetos o implementaciones completas que simulan componentes reales.

#### Ejemplo: Fake de una Base de Datos

Creamos una implementación de una base de datos en memoria para pruebas.

**Fake Database**:

```typescript
class FakeDatabase {
  private data: any[] = [];

  async save(item: any) {
    this.data.push({ id: this.data.length + 1, ...item });
    return this.data[this.data.length - 1];
  }

  async findAll() {
    return this.data;
  }
}

export const database = new FakeDatabase();
```

**Uso en pruebas**:

```typescript
import { database } from '@/utils/fakeDatabase';
import { saveUser } from '@/utils/user';

test('Debe usar una base de datos fake', async () => {
  const user = { name: 'Fake', email: 'fake@example.com' };
  const savedUser = await saveUser(user);
  expect(savedUser.id).toBe(1);
  const allUsers = await database.findAll();
  expect(allUsers.length).toBe(1);
});
```

**Explicación**:

- En lugar de usar una base de datos real, usamos una implementación en memoria.
- Esto nos permite probar el comportamiento del código en un entorno controlado.


#### Pruebas de integración

Las pruebas de integración verifican que diferentes partes del sistema funcionan juntas correctamente.

#### Probando Rutas de Next.js

Podemos utilizar herramientas como `supertest` para realizar peticiones HTTP a nuestra aplicación.

#### Instalación de Supertest

```bash
npm install --save-dev supertest
```

#### Prueba de una ruta

**Archivo**: `__tests__/integration.test.ts`

```typescript
import request from 'supertest';
import { createServer } from 'http';
import next from 'next';

const app = next({ dev: true });
const handler = app.getRequestHandler();

let server: any;

beforeAll(async () => {
  await app.prepare();
  server = createServer((req, res) => {
    handler(req, res);
  });
  server.listen(3001);
});

afterAll(() => {
  server.close();
});

test('Debe responder al endpoint /api/users', async () => {
  const response = await request('http://localhost:3001').get('/api/users');
  expect(response.status).toBe(200);
  expect(Array.isArray(response.body)).toBe(true);
});
```

**Explicación**:

- Creamos un servidor HTTP que utiliza el manejador de Next.js.
- Usamos `supertest` para hacer peticiones al servidor.
- Probamos que el endpoint `/api/users` devuelve un estado 200 y un array de usuarios.


#### Ejecutando las pruebas

Para ejecutar las pruebas, añade el siguiente script a tu `package.json`:

```json
"scripts": {
  "test": "jest"
}
```

Luego, puedes correr:

```bash
npm test
```

Esto ejecutará todas las pruebas en los archivos que coincidan con el patrón `**/*.test.ts`.



Hemos ampliado el proyecto para incluir pruebas unitarias e integración utilizando Jest. También exploramos cómo utilizar **mocks**, **stubs** y **fakes** para simular dependencias y aislar el código bajo prueba.

- **Pruebas Unitarias**: Escribimos pruebas para funciones individuales, asegurándonos de que funcionen como se espera.
- **Mocks**: Simulamos dependencias como `fetch` para controlar el entorno de pruebas.
- **Stubs**: Reemplazamos implementaciones de funciones con versiones controladas.
- **Fakes**: Usamos implementaciones completas pero simplificadas para pruebas (como una base de datos en memoria).
- **Pruebas de Integración**: Probamos que diferentes partes del sistema funcionen juntas correctamente.

Incorporar pruebas en tu proyecto mejora la calidad del código y facilita el mantenimiento a largo plazo. Jest proporciona una herramienta poderosa y flexible para lograr esto en proyectos de JavaScript y TypeScript.


#### Recursos adicionales

- [Documentación de Jest](https://jestjs.io/docs/getting-started)
- [Testing en Next.js](https://nextjs.org/docs/testing)
- [Mocks y Spies en Jest](https://jestjs.io/docs/mock-functions)
- [Supertest para pruebas de integración](https://github.com/visionmedia/supertest)

---

### Anexos

#### Actualizaciones al código existente

Para integrar las pruebas, es posible que necesites exportar ciertos módulos o ajustar el código para que sea más testeable.

#### Exportando Resolvers y TypeDefs

En `app/api/route.ts`, exporta los `typeDefs` y `resolvers` para usarlos en las pruebas:

```typescript
export { typeDefs, resolvers };
```

#### Ajustes en las funciones API

Para poder importar y probar las funciones `GET` y `POST`, asegúrate de exportarlas desde sus respectivos archivos:

**app/api/users/route.ts**

```typescript
export { GET, POST };
```


#### Consideraciones finales

Al escribir pruebas, es importante:

- **Mantener las pruebas independientes**: Cada prueba debe poder ejecutarse de forma aislada.
- **Limpiar después de las pruebas**: Si modificas datos globales, restáuralos después de cada prueba.
- **Evitar pruebas frágiles**: Las pruebas no deben depender de la implementación interna, sino del comportamiento esperado.

Con una suite de pruebas sólida, puedes refactorizar y expandir tu aplicación con confianza, sabiendo que cualquier regresión será detectada rápidamente.

---

### Ejemplos adicionales de pruebas unitarias e integración con Jest en Next.js

En esta sección, proporcionaremos ejemplos más extensos  que ilustran cómo implementar pruebas unitarias, de integración, y el uso de **mocks**, **stubs** y **fakes** en un proyecto Next.js utilizando Jest. Estos ejemplos ampliarán los conceptos previamente discutidos y te proporcionarán una referencia práctica para aplicarlos en tus proyectos.

#### Pruebas unitarias detalladas para un componente Next.js

#### Descripción del componente

Vamos a crear un componente React en Next.js que muestra una lista de usuarios y permite agregar un nuevo usuario mediante un formulario. Este componente interactúa con la API REST que creamos anteriormente.

**Archivo**: `app/components/UserList.tsx`

```tsx
import React, { useState, useEffect } from 'react';

type User = {
  id: number;
  name: string;
  email: string;
};

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const res = await fetch('/api/users');
    const data = await res.json();
    setUsers(data);
  }

  async function addUser(e: React.FormEvent) {
    e.preventDefault();
    const newUser = { name, email };
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    });
    const data = await res.json();
    setUsers([...users, data.user]);
    setName('');
    setEmail('');
  }

  return (
    <div>
      <h1>Usuarios</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name} ({user.email})</li>
        ))}
      </ul>
      <h2>Agregar Usuario</h2>
      <form onSubmit={addUser}>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          data-testid="name-input"
        />
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          data-testid="email-input"
        />
        <button type="submit">Agregar</button>
      </form>
    </div>
  );
}
```

#### Escribiendo pruebas unitarias

Utilizaremos `@testing-library/react` para probar nuestro componente.

#### Instalación de dependencias adicionales

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom
```

#### Configuración de Jest para soportar JSX

Actualiza tu `jest.config.js`:

```javascript
module.exports = {
  // ... configuración existente ...
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jsdom',
};
```

Crea un archivo `jest.setup.ts`:

```typescript
import '@testing-library/jest-dom';
```

#### Pruebas del componente

**Archivo**: `__tests__/UserList.test.tsx`

```tsx
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import UserList from '@/app/components/UserList';

global.fetch = jest.fn();

describe('Componente UserList', () => {
  const users = [
    { id: 1, name: 'Juan', email: 'juan@example.com' },
    { id: 2, name: 'Maria', email: 'maria@example.com' },
  ];

  beforeEach(() => {
    (fetch as jest.Mock).mockImplementation((url, options) => {
      if (url === '/api/users' && !options) {
        return Promise.resolve({
          json: () => Promise.resolve(users),
        });
      }

      if (url === '/api/users' && options?.method === 'POST') {
        const newUser = JSON.parse(options.body);
        return Promise.resolve({
          json: () =>
            Promise.resolve({
              message: 'Usuario creado exitosamente',
              user: { id: 3, ...newUser },
            }),
        });
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Debe mostrar una lista de usuarios', async () => {
    const { getByText } = render(<UserList />);

    await waitFor(() => {
      expect(getByText('Juan (juan@example.com)')).toBeInTheDocument();
      expect(getByText('Maria (maria@example.com)')).toBeInTheDocument();
    });
  });

  it('Debe agregar un nuevo usuario', async () => {
    const { getByText, getByTestId } = render(<UserList />);

    const nameInput = getByTestId('name-input') as HTMLInputElement;
    const emailInput = getByTestId('email-input') as HTMLInputElement;
    const addButton = getByText('Agregar');

    fireEvent.change(nameInput, { target: { value: 'Luis' } });
    fireEvent.change(emailInput, { target: { value: 'luis@example.com' } });

    fireEvent.click(addButton);

    await waitFor(() => {
      expect(getByText('Luis (luis@example.com)')).toBeInTheDocument();
    });
  });

  it('Debe limpiar los campos después de agregar un usuario', async () => {
    const { getByTestId, getByText } = render(<UserList />);

    const nameInput = getByTestId('name-input') as HTMLInputElement;
    const emailInput = getByTestId('email-input') as HTMLInputElement;
    const addButton = getByText('Agregar');

    fireEvent.change(nameInput, { target: { value: 'Ana' } });
    fireEvent.change(emailInput, { target: { value: 'ana@example.com' } });

    fireEvent.click(addButton);

    await waitFor(() => {
      expect(nameInput.value).toBe('');
      expect(emailInput.value).toBe('');
    });
  });
});
```

**Explicación**:

- Usamos `jest.fn()` para mockear `fetch`.
- En `beforeEach`, configuramos la implementación de `fetch` para responder según la URL y las opciones.
- Probamos que el componente muestra los usuarios iniciales.
- Probamos que se puede agregar un nuevo usuario y que los campos del formulario se limpian después.


#### Pruebas de integración complejas

#### Configuración del entorno de pruebas

Para pruebas de integración más realistas, podemos utilizar `supertest` junto con un servidor Next.js configurado para pruebas.

#### Instalación de dependencias

Ya deberías tener `supertest` instalado. Si no, instálalo:

```bash
npm install --save-dev supertest
```

#### Escribiendo pruebas de integración

**Archivo**: `__tests__/integration.test.ts`

```typescript
import request from 'supertest';
import { createServer } from 'http';
import next from 'next';

const app = next({ dev: false });
const handle = app.getRequestHandler();

let server: any;

beforeAll(async () => {
  await app.prepare();
  server = createServer((req, res) => {
    handle(req, res);
  });
  server.listen(3001);
});

afterAll(() => {
  server.close();
});

describe('Pruebas de Integración', () => {
  it('Debe obtener la lista de usuarios', async () => {
    const res = await request('http://localhost:3001').get('/api/users');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('Debe crear un nuevo usuario y luego obtenerlo', async () => {
    const newUser = { name: 'Carlos', email: 'carlos@example.com' };
    const postRes = await request('http://localhost:3001')
      .post('/api/users')
      .send(newUser)
      .set('Accept', 'application/json');
    expect(postRes.status).toBe(200);
    expect(postRes.body.user.name).toBe('Carlos');

    const userId = postRes.body.user.id;
    const getRes = await request('http://localhost:3001').get(`/api/users/${userId}`);
    expect(getRes.status).toBe(200);
    expect(getRes.body.name).toBe('Carlos');
  });

  it('Debe manejar un usuario no existente', async () => {
    const res = await request('http://localhost:3001').get('/api/users/999');
    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Usuario no encontrado');
  });
});
```

**Explicación**:

- Creamos un servidor Next.js que escucha en el puerto `3001` para pruebas.
- Probamos que podemos obtener la lista de usuarios.
- Probamos que podemos crear un nuevo usuario y luego obtenerlo por su ID.
- Probamos el manejo de errores al solicitar un usuario que no existe.


#### Uso avanzado de Mocks y Stubs

#### Mock de módulos externos

Supongamos que nuestro código utiliza una librería externa para enviar correos electrónicos, y queremos evitar enviar correos reales durante las pruebas.

**Archivo**: `utils/emailService.ts`

```typescript
import nodemailer from 'nodemailer';

export async function sendEmail(to: string, subject: string, text: string) {
  let transporter = nodemailer.createTransport({
    // Configuración del transporte
  });

  await transporter.sendMail({
    from: '"Nuestro App" <no-reply@example.com>',
    to,
    subject,
    text,
  });
}
```

#### Stub de funciones asíncronas

**Prueba**: `__tests__/emailService.test.ts`

```typescript
import { sendEmail } from '@/utils/emailService';
import nodemailer from 'nodemailer';

jest.mock('nodemailer');

describe('Servicio de Email', () => {
  it('Debe enviar un correo electrónico', async () => {
    const sendMailMock = jest.fn().mockResolvedValue(true);
    (nodemailer.createTransport as jest.Mock).mockReturnValue({
      sendMail: sendMailMock,
    });

    await sendEmail('test@example.com', 'Prueba', 'Este es un mensaje de prueba');

    expect(nodemailer.createTransport).toHaveBeenCalled();
    expect(sendMailMock).toHaveBeenCalledWith({
      from: '"Nuestro App" <no-reply@example.com>',
      to: 'test@example.com',
      subject: 'Prueba',
      text: 'Este es un mensaje de prueba',
    });
  });
});
```

**Explicación**:

- Mockeamos el módulo `nodemailer` para evitar enviar correos reales.
- Reemplazamos `createTransport` para que devuelva un objeto con un `sendMail` simulado.
- Verificamos que `sendMail` fue llamado con los parámetros correctos.


#### Creando un fake complejo para pruebas

#### Implementación de una base de datos Fake

En lugar de utilizar una base de datos real, crearemos una base de datos en memoria que simula operaciones CRUD.

**Archivo**: `utils/fakeDatabase.ts`

```typescript
type User = {
  id: number;
  name: string;
  email: string;
};

export class FakeDatabase {
  private users: User[] = [];
  private currentId = 1;

  async createUser(user: Omit<User, 'id'>): Promise<User> {
    const newUser = { id: this.currentId++, ...user };
    this.users.push(newUser);
    return newUser;
  }

  async getUserById(id: number): Promise<User | null> {
    return this.users.find((user) => user.id === id) || null;
  }

  async getAllUsers(): Promise<User[]> {
    return this.users;
  }

  async updateUser(id: number, user: Partial<User>): Promise<User | null> {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) return null;
    this.users[index] = { ...this.users[index], ...user };
    return this.users[index];
  }

  async deleteUser(id: number): Promise<boolean> {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) return false;
    this.users.splice(index, 1);
    return true;
  }

  async resetDatabase() {
    this.users = [];
    this.currentId = 1;
  }
}

export const database = new FakeDatabase();
```

#### Pruebas utilizando la base de datos Fake

**Archivo**: `__tests__/fakeDatabase.test.ts`

```typescript
import { database } from '@/utils/fakeDatabase';

describe('Base de Datos Fake', () => {
  beforeEach(async () => {
    await database.resetDatabase();
  });

  it('Debe crear un usuario', async () => {
    const user = await database.createUser({ name: 'Test', email: 'test@example.com' });
    expect(user.id).toBe(1);
    expect(user.name).toBe('Test');
  });

  it('Debe obtener un usuario por ID', async () => {
    const user = await database.createUser({ name: 'Test', email: 'test@example.com' });
    const fetchedUser = await database.getUserById(user.id);
    expect(fetchedUser).toEqual(user);
  });

  it('Debe actualizar un usuario', async () => {
    const user = await database.createUser({ name: 'Test', email: 'test@example.com' });
    const updatedUser = await database.updateUser(user.id, { name: 'Updated' });
    expect(updatedUser?.name).toBe('Updated');
  });

  it('Debe eliminar un usuario', async () => {
    const user = await database.createUser({ name: 'Test', email: 'test@example.com' });
    const success = await database.deleteUser(user.id);
    expect(success).toBe(true);
    const fetchedUser = await database.getUserById(user.id);
    expect(fetchedUser).toBeNull();
  });

  it('Debe manejar la eliminación de un usuario no existente', async () => {
    const success = await database.deleteUser(999);
    expect(success).toBe(false);
  });
});
```

**Explicación**:

- Probamos todas las operaciones CRUD en nuestra base de datos fake.
- Utilizamos `beforeEach` para resetear la base de datos antes de cada prueba.
- Verificamos el comportamiento al interactuar con usuarios existentes y no existentes.



#### Recursos Adicionales

- [Testing Library para React](https://testing-library.com/docs/react-testing-library/intro)
- [Mocking Modules con Jest](https://jestjs.io/docs/manual-mocks)
- [Pruebas de Integración con Next.js](https://nextjs.org/docs/testing#jest-and-react-testing-library)
- [Patrones de Diseño para Pruebas](https://martinfowler.com/bliki/TestDouble.html)


#### Anexos

#### Archivo completo de `UserList.test.tsx`

Para referencia, aquí está el archivo completo de las pruebas del componente `UserList`:

```tsx
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import UserList from '@/app/components/UserList';

global.fetch = jest.fn();

describe('Componente UserList', () => {
  const users = [
    { id: 1, name: 'Juan', email: 'juan@example.com' },
    { id: 2, name: 'Maria', email: 'maria@example.com' },
  ];

  beforeEach(() => {
    (fetch as jest.Mock).mockImplementation((url, options) => {
      if (url === '/api/users' && !options) {
        return Promise.resolve({
          json: () => Promise.resolve(users),
        });
      }

      if (url === '/api/users' && options?.method === 'POST') {
        const newUser = JSON.parse(options.body);
        return Promise.resolve({
          json: () =>
            Promise.resolve({
              message: 'Usuario creado exitosamente',
              user: { id: users.length + 1, ...newUser },
            }),
        });
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Debe mostrar una lista de usuarios', async () => {
    const { getByText } = render(<UserList />);

    await waitFor(() => {
      expect(getByText('Juan (juan@example.com)')).toBeInTheDocument();
      expect(getByText('Maria (maria@example.com)')).toBeInTheDocument();
    });
  });

  it('Debe agregar un nuevo usuario', async () => {
    const { getByText, getByTestId } = render(<UserList />);

    const nameInput = getByTestId('name-input') as HTMLInputElement;
    const emailInput = getByTestId('email-input') as HTMLInputElement;
    const addButton = getByText('Agregar');

    fireEvent.change(nameInput, { target: { value: 'Luis' } });
    fireEvent.change(emailInput, { target: { value: 'luis@example.com' } });

    fireEvent.click(addButton);

    await waitFor(() => {
      expect(getByText('Luis (luis@example.com)')).toBeInTheDocument();
    });
  });

  it('Debe limpiar los campos después de agregar un usuario', async () => {
    const { getByTestId, getByText } = render(<UserList />);

    const nameInput = getByTestId('name-input') as HTMLInputElement;
    const emailInput = getByTestId('email-input') as HTMLInputElement;
    const addButton = getByText('Agregar');

    fireEvent.change(nameInput, { target: { value: 'Ana' } });
    fireEvent.change(emailInput, { target: { value: 'ana@example.com' } });

    fireEvent.click(addButton);

    await waitFor(() => {
      expect(nameInput.value).toBe('');
      expect(emailInput.value).toBe('');
    });
  });
});
```


#### Archivo completo de `fakeDatabase.ts`

Para referencia, aquí está el archivo completo de la base de datos fake:

```typescript
type User = {
  id: number;
  name: string;
  email: string;
};

export class FakeDatabase {
  private users: User[] = [];
  private currentId = 1;

  async createUser(user: Omit<User, 'id'>): Promise<User> {
    const newUser = { id: this.currentId++, ...user };
    this.users.push(newUser);
    return newUser;
  }

  async getUserById(id: number): Promise<User | null> {
    return this.users.find((user) => user.id === id) || null;
  }

  async getAllUsers(): Promise<User[]> {
    return this.users;
  }

  async updateUser(id: number, user: Partial<User>): Promise<User | null> {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) return null;
    this.users[index] = { ...this.users[index], ...user };
    return this.users[index];
  }

  async deleteUser(id: number): Promise<boolean> {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) return false;
    this.users.splice(index, 1);
    return true;
  }

  async resetDatabase() {
    this.users = [];
    this.currentId = 1;
  }
}

export const database = new FakeDatabase();
```


### Ejercicios

**Jest** es un framework de pruebas de JavaScript mantenido por Facebook. Es ampliamente utilizado para probar aplicaciones React, Node.js y más. Proporciona un entorno sencillo para escribir y ejecutar pruebas, con características como mocks integrados, cobertura de código y una sintaxis amigable.


### Instalación de Jest

Primero, necesitas tener instalado Node.js y npm. Luego, crea un nuevo directorio para tu proyecto y ejecuta los siguientes comandos:

```bash
mkdir jest-tutorial
cd jest-tutorial
npm init -y
```

Esto inicializa un nuevo proyecto npm. Ahora, instala Jest:

```bash
npm install --save-dev jest
```

#### Configuración de Jest

Agrega un script en tu `package.json` para ejecutar Jest:

```json
"scripts": {
  "test": "jest"
}
```

Crea una carpeta `src` para tu código fuente y una carpeta `__tests__` para tus pruebas:

```bash
mkdir src
mkdir __tests__
```


#### Pruebas unitarias


Las **pruebas unitarias** son pruebas que se enfocan en pequeñas unidades de código, como funciones individuales, para asegurarse de que funcionan correctamente.

### Ejercicio práctico

Vamos a escribir una función simple y su prueba unitaria.

#### Paso 1: Escribir la Función

**Archivo**: `src/calculator.js`

```javascript
function add(a, b) {
  return a + b;
}

module.exports = { add };
```

#### Paso 2: Escribir la prueba unitaria

**Archivo**: `__tests__/calculator.test.js`

```javascript
const { add } = require('../src/calculator');

test('La función add debe sumar dos números correctamente', () => {
  expect(add(2, 3)).toBe(5);
  expect(add(-1, 1)).toBe(0);
  expect(add(0, 0)).toBe(0);
});
```

#### Paso 3: Ejecutar la prueba

Ejecuta el siguiente comando:

```bash
npm test
```

Deberías ver que la prueba pasa exitosamente.


#### Mocks en Jest

#### Entendiendo los Mocks

Los **mocks** son objetos o funciones simuladas que reemplazan el comportamiento de componentes reales para aislar el código bajo prueba.

#### Ejercicio con Mocks

Supongamos que tenemos una función que depende de una API externa.

#### Paso 1: Escribir la función

**Archivo**: `src/userService.js`

```javascript
const axios = require('axios');

async function getUserData(userId) {
  const response = await axios.get(`https://api.example.com/users/${userId}`);
  return response.data;
}

module.exports = { getUserData };
```

#### Paso 2: Escribir la prueba con Mock

Necesitamos evitar hacer una llamada real a la API externa.

**Archivo**: `__tests__/userService.test.js`

```javascript
const { getUserData } = require('../src/userService');
const axios = require('axios');

jest.mock('axios');

test('getUserData debe devolver los datos del usuario', async () => {
  const userData = { id: 1, name: 'John Doe' };
  axios.get.mockResolvedValue({ data: userData });

  const data = await getUserData(1);
  expect(data).toEqual(userData);
  expect(axios.get).toHaveBeenCalledWith('https://api.example.com/users/1');
});
```

#### Paso 3: Ejecutar la prueba

```bash
npm test
```

La prueba debería pasar, y hemos simulado la respuesta de la API externa.

#### Stubs en Jest

#### Diferencia entre Mocks y Stubs

Un **stub** es una función que reemplaza una implementación, generalmente para evitar efectos secundarios. Los **mocks** pueden incluir expectativas sobre cómo se usan, mientras que los stubs simplemente devuelven valores predefinidos.

#### Ejercicio con Stubs

Supongamos que tenemos una función que escribe en una base de datos.

#### Paso 1: Escribir la función

**Archivo**: `src/dbService.js`

```javascript
function saveUser(user) {
  // Simula guardar en una base de datos
  console.log('Usuario guardado en la base de datos');
}

module.exports = { saveUser };
```

**Archivo**: `src/userController.js`

```javascript
const { saveUser } = require('./dbService');

function registerUser(name) {
  const user = { name };
  saveUser(user);
  return user;
}

module.exports = { registerUser };
```

#### Paso 2: Escribir la prueba con Stub

Queremos probar `registerUser` sin realmente escribir en la base de datos.

**Archivo**: `__tests__/userController.test.js`

```javascript
const { registerUser } = require('../src/userController');
const dbService = require('../src/dbService');

jest.spyOn(dbService, 'saveUser').mockImplementation(() => {
  console.log('Stub: Usuario guardado');
});

test('registerUser debe crear un usuario', () => {
  const user = registerUser('Kapumota');
  expect(user).toEqual({ name: 'Kapumota' });
  expect(dbService.saveUser).toHaveBeenCalledWith({ name: 'Kapumota' });
});
```

#### Paso 3: Ejecutar la prueba

```bash
npm test
```

La prueba debería pasar, y hemos evitado el efecto secundario de escribir en la base de datos real.


#### Pruebas de integración


Las **pruebas de integración** verifican que diferentes componentes del sistema funcionen juntos correctamente.

#### Ejercicio práctico

Vamos a probar la integración entre dos módulos.

#### Paso 1: Modificar `dbService.js` para retornar datos

**Archivo**: `src/dbService.js`

```javascript
let database = [];

function saveUser(user) {
  database.push(user);
}

function getUser(name) {
  return database.find((user) => user.name === name);
}

module.exports = { saveUser, getUser };
```

#### Paso 2: Modificar `userController.js` para incluir obtener usuario

**Archivo**: `src/userController.js`

```javascript
const { saveUser, getUser } = require('./dbService');

function registerUser(name) {
  const user = { name };
  saveUser(user);
  return user;
}

function findUser(name) {
  return getUser(name);
}

module.exports = { registerUser, findUser };
```

#### Paso 3: Escribir la prueba de integración

**Archivo**: `__tests__/integration.test.js`

```javascript
const { registerUser, findUser } = require('../src/userController');

test('Debe registrar y encontrar un usuario', () => {
  registerUser('Alice');
  const user = findUser('Alice');
  expect(user).toEqual({ name: 'Alice' });
});
```

#### Paso 4: Ejecutar la prueba

```bash
npm test
```

La prueba debería pasar, confirmando que `registerUser` y `findUser` funcionan correctamente juntos.



#### Pruebas de extremo a extremo (End-to-End)

#### Introducción a las pruebas E2E

Las pruebas de **extremo a extremo** simulan el comportamiento del usuario y verifican que el sistema completo funcione correctamente. Herramientas como **Puppeteer** y **Cypress** son populares para este tipo de pruebas.

#### Ejercicio con Puppeteer

Vamos a utilizar Puppeteer para automatizar un navegador y probar una aplicación web simple.

#### Paso 1: Crear una aplicación web simple

Crea un archivo `index.html`:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Prueba E2E</title>
</head>
<body>
  <h1 id="greeting">Hola, Mundo!</h1>
</body>
</html>
```

Inicia un servidor local para servir este archivo. Puedes usar `serve`:

```bash
npm install --global serve
serve .
```

Esto servirá el archivo en `http://localhost:5000` (o similar).

#### Paso 2: Instalar Puppeteer

```bash
npm install --save-dev puppeteer
```

#### Paso 3: Escribir la prueba E2E

**Archivo**: `__tests__/e2e.test.js`

```javascript
const puppeteer = require('puppeteer');

jest.setTimeout(30000);

describe('Prueba E2E con Puppeteer', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  afterAll(() => {
    browser.close();
  });

  test('Debe mostrar el saludo correcto', async () => {
    await page.goto('http://localhost:5000');
    const greeting = await page.$eval('#greeting', (el) => el.textContent);
    expect(greeting).toBe('Hola, Mundo!');
  });
});
```

#### Paso 4: Ejecutar la prueba

Asegúrate de que el servidor esté ejecutándose y luego:

```bash
npm test
```

La prueba debería pasar, verificando que el saludo se muestra correctamente.

aplicaciones.


#### Recursos adicionales

- [Documentación Oficial de Jest](https://jestjs.io/)
- [Jest Cheatsheet](https://devhints.io/jest)
- [Testing JavaScript Applications](https://www.pluralsight.com/courses/testing-javascript-applications)
- [Puppeteer Documentation](https://pptr.dev/)


#### Apéndice: Ejercicios adicionales

#### Ejercicio 1: Pruebas asíncronas

**Objetivo**: Practicar pruebas unitarias con funciones asíncronas.

#### Paso 1: Escribir una función asíncrona

**Archivo**: `src/asyncFunction.js`

```javascript
function fetchData(callback) {
  setTimeout(() => {
    callback('Datos recibidos');
  }, 1000);
}

module.exports = { fetchData };
```

#### Paso 2: Escribir la prueba

**Archivo**: `__tests__/asyncFunction.test.js`

```javascript
const { fetchData } = require('../src/asyncFunction');

test('fetchData devuelve los datos esperados', (done) => {
  function callback(data) {
    expect(data).toBe('Datos recibidos');
    done();
  }

  fetchData(callback);
});
```

#### Paso 3: Ejecutar la prueba

```bash
npm test
```

**Explicación**: Utilizamos `done` para indicar a Jest que la prueba es asíncrona y debe esperar a que se llame.

#### Ejercicio 2: Pruebas con promesas

#### Paso 1: Modificar la función para usar promesas

**Archivo**: `src/asyncFunction.js`

```javascript
function fetchDataPromise() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Datos recibidos');
    }, 1000);
  });
}

module.exports = { fetchDataPromise };
```

#### Paso 2: Escribir la prueba con promesas

**Archivo**: `__tests__/asyncFunction.test.js`

```javascript
const { fetchDataPromise } = require('../src/asyncFunction');

test('fetchDataPromise devuelve los datos esperados', () => {
  return fetchDataPromise().then((data) => {
    expect(data).toBe('Datos recibidos');
  });
});
```

#### Paso 3: Ejecutar la prueba

```bash
npm test
```

**Explicación**: Al retornar la promesa, Jest espera a que se resuelva antes de finalizar la prueba.

#### Ejercicio 3: Usando Async/Await en pruebas

#### Paso 1: Escribir la prueba con Async/Await

**Archivo**: `__tests__/asyncFunction.test.js`

```javascript
test('fetchDataPromise devuelve los datos esperados (async/await)', async () => {
  const data = await fetchDataPromise();
  expect(data).toBe('Datos recibidos');
});
```

#### Paso 2: Ejecutar la prueba

```bash
npm test
```


#### Consejos para escribir buenas pruebas

- **Nombrado claro**: Utiliza nombres descriptivos para tus pruebas y funciones.
- **Una aserción por prueba**: Idealmente, cada prueba debe verificar una sola cosa.
- **Aislamiento**: Las pruebas no deben depender del orden de ejecución ni modificar el estado compartido.
- **Cobertura de código**: Utiliza la cobertura de código para identificar áreas no probadas.
- **Evita mockear en exceso**: Si mocks demasiado, podrías no estar probando el comportamiento real.
- **Documentación**: Comenta tus pruebas si el propósito no es evidente.
