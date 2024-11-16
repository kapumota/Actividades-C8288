### Repaso REST

#### URL RESTful

```
https://api.ejemplo.com/v1/usuarios/1234
```

#### Estrategias de autenticación en API REST

- **Autenticación básica**
- **Tokens de portador (Bearer Tokens): JWT**
- **OAuth 2.0**

**Ejemplos de encabezados de autorización:**

```
Authorization: Basic am9obkBleGFtcGxlLmNvbTpzZWNyZXRwYXNz

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
```

```
https://api.ejemplo.com/v1/usuarios?api_key=abcdef123456
```

#### Métodos HTTP

| Método | Acción                                 | Idempotente | Seguro |
|--------|----------------------------------------|-------------|--------|
| GET    | Recuperar un recurso                   | Sí          | Sí     |
| POST   | Crear un nuevo recurso                 | No          | No     |
| PUT    | Actualizar completamente un recurso     | Sí          | No     |
| PATCH  | Actualizar parcialmente un recurso      | No          | No     |
| DELETE | Eliminar un recurso                     | Sí          | No     |
| HEAD   | Obtener metadatos de un recurso         | Sí          | Sí     |
| OPTIONS| Obtener opciones de comunicación       | Sí          | Sí     |


#### Ejemplos de solicitudes HTTP

#### GET

```
GET https://api.ejemplo.com/v1/usuarios
```

#### POST

```
POST https://api.ejemplo.com/v1/usuarios
Content-Type: application/json

{
    "nombre": "Ana Gómez",
    "email": "ana.gomez@ejemplo.com",
    "activo": true
}
```

#### PUT

```
PUT https://api.ejemplo.com/v1/usuarios/1234
Content-Type: application/json

{
    "nombre": "Ana María Gómez",
    "email": "ana.maria.gomez@ejemplo.com",
    "activo": false
}
```

#### PATCH

```
PATCH https://api.ejemplo.com/v1/usuarios/1234
Content-Type: application/json

{
    "activo": true
}
```

#### DELETE

```
DELETE https://api.ejemplo.com/v1/usuarios/1234
```

#### Lectura de datos

```
GET https://api.ejemplo.com/v1/usuarios?pagina=2&limite=50&orden=asc
```

**Características:**

- **Paginación:** offset-based, cursor-based
- **Filtrado**
- **Ordenamiento**
- **Caching**

#### Paginación

- **Offset-based:**
  ```
  GET /v1/usuarios?pagina=2&limite=50
  ```
- **Cursor-based:**
  ```
  GET /v1/usuarios?cursor=abc123&limite=50
  ```

#### Filtrado

```
GET /v1/usuarios?activo=true
```

#### Ordenamiento

```
GET /v1/usuarios?orden=asc&campo=nombre
```

#### Proyección

```
GET /v1/usuarios?campos=nombre,email
```

#### Caching

```
Cache-Control: max-age=3600
ETag: "abc123"
Last-Modified: Wed, 21 Oct 2015 07:28:00 GMT
```


#### HATEOAS

**Ejemplo de respuesta con HATEOAS:**

```json
{
    "id": "1234",
    "nombre": "Juan Pérez",
    "email": "juan.perez@ejemplo.com",
    "links": [
        {
            "rel": "self",
            "href": "https://api.ejemplo.com/v1/usuarios/1234"
        },
        {
            "rel": "pedidos",
            "href": "https://api.ejemplo.com/v1/usuarios/1234/pedidos"
        }
    ]
}
```

#### Ejemplos de actualizaciones

#### PUT

```
PUT https://api.ejemplo.com/v1/usuarios/1234
Content-Type: application/json

{
    "nombre": "Juan Pérez",
    "email": "juan.perez@nuevoejemplo.com",
    "activo": false,
    "direccion": "Calle Nueva 456"
}

HTTP/1.1 200 OK
Content-Type: application/json

{
    "id": "1234",
    "nombre": "Juan Pérez",
    "email": "juan.perez@nuevoejemplo.com",
    "activo": false,
    "direccion": "Calle Nueva 456"
}
```

#### PATCH

```
PATCH https://api.ejemplo.com/v1/usuarios/1234
Content-Type: application/json

{
    "email": "juan.perez@nuevoejemplo.com",
    "activo": false
}

HTTP/1.1 200 OK
Content-Type: application/json

{
    "id": "1234",
    "nombre": "Juan Pérez",
    "email": "juan.perez@nuevoejemplo.com",
    "activo": false,
    "direccion": "Calle Falsa 123"
}
```

#### Manejo de errores

**Ejemplo de respuesta de error 401:**

```json
{
    "error": {
        "codigo": 401,
        "mensaje": "Autenticación requerida."
    }
}
```

#### Versionado de API REST

- **URL RESTful:**
  ```
  https://api.ejemplo.com/v1/usuarios
  ```

- **Versionado en la URL:**
  ```
  https://api.ejemplo.com/V1/usuarios
  ```

- **Versionado en el encabezado:**
  ```
  GET /usuarios
  Accept: application/vnd.ejemplo.v1+json
  ```

- **Versionado por parámetro de consulta:**
  ```
  GET /usuarios?version=1
  ```

- **Versionado por encabezados personalizados:**
  ```
  GET /usuarios
  X-API-Version: 1
  ```


#### Seguridad en API REST

#### CORS

**Encabezados de respuesta:**

```
Access-Control-Allow-Origin: https://cliente.ejemplo.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
```

**Ejemplo de respuesta con CORS:**

```
HTTP/1.1 200 OK
Content-Type: application/json
Access-Control-Allow-Origin: https://cliente.ejemplo.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
```

#### Pruebas en API REST

#### Pruebas funcionales

- **Verificar que una solicitud GET a `/usuarios/1234` devuelva el usuario correcto.**
- **Verificar que una solicitud POST a `/usuarios` crea un nuevo usuario y retorna el estado 201 Created.**

#### Pruebas de integración

- **Verificar que la creación de un usuario en la API actualiza correctamente la base de datos.**
- **Verificar que una solicitud a `/usuarios/1234/pedidos` obtiene los pedidos asociados correctamente desde el servicio de pedidos.**

#### Pruebas de rendimiento

- **Medir el tiempo de respuesta de la API cuando se realizan 1000 solicitudes concurrentes.**

#### Pruebas de seguridad

- **Pruebas de autenticación**
- **Pruebas de autorización**
- **Inyección SQL, XSS, CSRF**
  - Probar inyecciones SQL en parámetros de entrada y asegurar que la API las maneje correctamente.



### GraphQL

#### Definición de tipos

```graphql
# Definiciones de tipos
type Usuario {
    id: ID!
    nombre: String!
    email: String!
    activo: Boolean!
    pedidos: [Pedido]
}

type Pedido {
    id: ID!
    fecha: String!
    total: Float!
    items: [Item]
}

type Item {
    id: ID!
    nombre: String!
    cantidad: Int!
    precio: Float!
}
```

#### Definición de consultas y mutaciones

```graphql
# Query 
type Query {
    usuarios(pagina: Int, limite: Int): [Usuario]
    usuario(id: ID!): Usuario
    pedidosUsuario(id: ID!, limite: Int): [Pedido]
}

# Mutaciones
type Mutation {
    crearUsuario(nombre: String!, email: String!): Usuario
    actualizarUsuario(id: ID!, nombre: String, email: String, activo: Boolean): Usuario
    eliminarUsuario(id: ID!): Boolean
    crearPedido(usuarioId: ID!, items: [ItemInput]!): Pedido
}

# Suscripciones
type Subscription {
    usuarioCreado: Usuario
    pedidoCreado(usuarioId: ID!): Pedido
}
```

#### Definición de esquemas avanzados

```graphql
# Enums
enum EstadoPedido {
    PENDIENTE
    COMPLETADO
    CANCELADO
}

# Interfaces
interface Entidad {
    id: ID!
}

type Usuario implements Entidad {
    id: ID!
    nombre: String!
    email: String!
}

type Pedido implements Entidad {
    id: ID!
    fecha: String!
    total: Float!
}

# Uniones 
union BusquedaResultado = Usuario | Pedido | Item
```

#### Definición del Schema

```graphql
schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
}
```

#### Resolvers

```javascript
const resolvers = {
    Query: {
        usuario: async (parent, args, context, info) => {
            // Verificar autenticación
            if (!context.usuario) {
                throw new Error('No autenticado');
            }
            // Obtener el usuario por ID
            return await obtenerUsuarioPorId(args.id);
        },
        usuarios: async (parent, args, context, info) => {
            return await obtenerUsuarios(args.pagina, args.limite);
        },
    },
    Mutation: {
        crearUsuario: async (parent, args, context, info) => {
            return await crearNuevoUsuario(args.nombre, args.email);
        },
        actualizarUsuario: async (parent, args, context, info) => {
            return await actualizarUsuario(args.id, args);
        },
        eliminarUsuario: async (parent, args, context, info) => {
            return await eliminarUsuarioPorId(args.id);
        },
    },
    Usuario: {
        pedidos: async (parent, args, context, info) => {
            return await obtenerPedidosPorUsuario(parent.id, args.limite);
        },
    },
    Subscription: {
        pedidoCreado: {
            subscribe: (parent, args, context, info) => {
                // Implementar lógica de suscripción
            },
        },
    },
};
```

#### Implementación de una API GraphQL

```javascript
// Implementación de una API GraphQL
// 1. Definición de un esquema 
type Usuario {
    id: ID!
    nombre: String!
    email: String!
    activo: Boolean!
    pedidos: [Pedido]
}

type Pedido {
    id: ID!
    fecha: String!
    total: Float!
    items: [Item]
}

type Item {
    id: ID!
    nombre: String!
    cantidad: Int!
    precio: Float!
}

type Query {
    usuarios(pagina: Int, limite: Int): [Usuario]
    usuario(id: ID!): Usuario
}

type Mutation {
    crearUsuario(nombre: String!, email: String!): Usuario
}

type Subscription {
    usuarioCreado: Usuario
    pedidoCreado(usuarioId: ID!): Pedido
}
```

#### Configuración del servidor Apollo

```javascript
const { ApolloServer, gql } = require('apollo-server');

// Definición del esquema
const typeDefs = gql`
    type Usuario {
        id: ID!
        nombre: String!
        email: String!
        activo: Boolean!
        pedidos: [Pedido]
    }

    type Pedido {
        id: ID!
        fecha: String!
        total: Float!
        items: [Item]
    }

    type Item {
        id: ID!
        nombre: String!
        cantidad: Int!
        precio: Float!
    }

    type Query {
        usuarios(pagina: Int, limite: Int): [Usuario]
        usuario(id: ID!): Usuario
    }

    type Mutation {
        crearUsuario(nombre: String!, email: String!): Usuario
    }

    type Subscription {
        usuarioCreado: Usuario
        pedidoCreado(usuarioId: ID!): Pedido
    }
`;

// Resolvers
const resolvers = {
    Query: {
        usuarios: async (parent, args, context, info) => {
            return await obtenerUsuarios(args.pagina, args.limite);
        },
        usuario: async (parent, args, context, info) => {
            return await obtenerUsuarioPorId(args.id);
        },
    },
    Mutation: {
        crearUsuario: async (parent, args, context, info) => {
            return await crearNuevoUsuario(args.nombre, args.email);
        },
    },
    Usuario: {
        pedidos: async (parent, args, context, info) => {
            return await obtenerPedidosPorUsuario(parent.id, args.limite);
        },
    },
    Subscription: {
        usuarioCreado: {
            subscribe: (parent, args, context, info) => {
                // Implementar lógica de suscripción
            },
        },
        pedidoCreado: {
            subscribe: (parent, args, context, info) => {
                // Implementar lógica de suscripción
            },
        },
    },
};

// Creación del servidor Apollo
const server = new ApolloServer({ typeDefs, resolvers });

// Inicio del servidor
server.listen().then(({ url }) => {
    console.log(`🚀 Servidor listo en ${url}`);
});
```

#### Conexión a la base de datos con Mongoose

```javascript
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/miapi', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error de conexión a MongoDB:', err));
```

#### Implementación del Middleware de autenticación

```javascript
const jwt = require('jsonwebtoken');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const token = req.headers.authorization || '';
        try {
            const usuario = jwt.verify(token.replace('Bearer ', ''), 'mi_secreto');
            return { usuario };
        } catch (err) {
            return {};
        }
    },
});
```


#### Herramientas adicionales

#### GraphQL Code Generator

```yaml
schema: 'https://api.ejemplo.com/graphql'
documents: './src/**/*.graphql'
generates:
  ./src/generated/graphql.ts:
    plugins:
      - 'typescript'
      - 'typescript-operations'
      - 'typescript-react-apollo'
```

#### Uso con React y Apollo Client

```javascript
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://api.ejemplo.com/graphql',
    cache: new InMemoryCache(),
});

const GET_USUARIOS = gql`
    query GetUsuarios {
        usuarios {
            id
            nombre
            email
        }
    }
`;

function Usuarios() {
    const { loading, error, data } = useQuery(GET_USUARIOS);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <ul>
            {data.usuarios.map(usuario => (
                <li key={usuario.id}>{usuario.nombre} - {usuario.email}</li>
            ))}
        </ul>
    );
}

function App() {
    return (
        <ApolloProvider client={client}>
            <h1>Lista de Usuarios</h1>
            <Usuarios />
        </ApolloProvider>
    );
}

export default App;
```


#### Implementación de una API GraphQL con Prisma (ORM)

```javascript
// Prisma - ORM
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const resolvers = {
    Query: {
        usuarios: async () => {
            return await prisma.usuario.findMany();
        },
    },
    Mutation: {
        crearUsuario: async (parent, args) => {
            return await prisma.usuario.create({
                data: {
                    nombre: args.nombre,
                    email: args.email,
                },
            });
        },
    },
};
```

### Ejemplos adicionales

#### Consulta de usuario

```graphql
query {
    usuario(id: "1234") {
        nombre
        email
    }
}
```

**Respuesta:**

```json
{
    "data": {
        "usuario": {
            "nombre": "Juan Pérez",
            "email": "juan.perez@ejemplo.com"
        }
    }
}
```


#### Single Endpoint

```
POST https://api.ejemplo.com/graphql
```

#### Resolución de datos agregados

```graphql
query {
    usuario(id: "1234") {
        nombre
        pedidos {
            id
            fecha
            total
        }
    }
}
```

#### Definición de tipos adicionales

```graphql
# Enums, interfaces y uniones
enum EstadoPedido {
    PENDIENTE
    COMPLETADO
    CANCELADO
}

interface Entidad {
    id: ID!
}

type Usuario implements Entidad {
    id: ID!
    nombre: String!
    email: String!
}

type Pedido implements Entidad {
    id: ID!
    fecha: String!
    total: Float!
}

union BusquedaResultado = Usuario | Pedido | Item
```

#### Definición de input types y list types

```graphql
# Input types
input CrearUsuarioInput {
    nombre: String!
    email: String!
}

type Mutation {
    crearUsuario(input: CrearUsuarioInput!): Usuario
}

# List types 
type Query {
    usuarios: [Usuario]
    pedidos: [Pedido]
}
```

#### Definición de Non-Null Types

```graphql
type Usuario {
    id: ID!
    nombre: String!
    email: String!
    activo: Boolean!
}
```


#### Implementación de una API GraphQL completa

```javascript
// Implementación de una API GraphQL
// 1. Definición de un esquema 
type Usuario {
    id: ID!
    nombre: String!
    email: String!
    activo: Boolean!
    pedidos: [Pedido]
}

type Pedido {
    id: ID!
    fecha: String!
    total: Float!
    items: [Item]
}

type Item {
    id: ID!
    nombre: String!
    cantidad: Int!
    precio: Float!
}

type Query {
    usuarios(pagina: Int, limite: Int): [Usuario]
    usuario(id: ID!): Usuario
}

type Mutation {
    crearUsuario(nombre: String!, email: String!): Usuario
}

type Subscription {
    usuarioCreado: Usuario
    pedidoCreado(usuarioId: ID!): Pedido
}
```

#### Configuración del servidor Apollo con Resolvers

```javascript
const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = gql`
    type Usuario {
        id: ID!
        nombre: String!
        email: String!
        activo: Boolean!
        pedidos: [Pedido]
    }

    type Pedido {
        id: ID!
        fecha: String!
        total: Float!
        items: [Item]
    }

    type Item {
        id: ID!
        nombre: String!
        cantidad: Int!
        precio: Float!
    }

    type Query {
        usuarios(pagina: Int, limite: Int): [Usuario]
        usuario(id: ID!): Usuario
    }

    type Mutation {
        crearUsuario(nombre: String!, email: String!): Usuario
    }

    type Subscription {
        usuarioCreado: Usuario
        pedidoCreado(usuarioId: ID!): Pedido
    }
`;

const resolvers = {
    Query: {
        usuarios: async (parent, args, context, info) => {
            return await obtenerUsuarios(args.pagina, args.limite);
        },
        usuario: async (parent, args, context, info) => {
            return await obtenerUsuarioPorId(args.id);
        },
    },
    Mutation: {
        crearUsuario: async (parent, args, context, info) => {
            return await crearNuevoUsuario(args.nombre, args.email);
        },
    },
    Usuario: {
        pedidos: async (parent, args, context, info) => {
            return await obtenerPedidosPorUsuario(parent.id, args.limite);
        },
    },
    Subscription: {
        usuarioCreado: {
            subscribe: (parent, args, context, info) => {
                // Implementar lógica de suscripción
            },
        },
        pedidoCreado: {
            subscribe: (parent, args, context, info) => {
                // Implementar lógica de suscripción
            },
        },
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`🚀 Servidor listo en ${url}`);
});

// Conexión a la base de datos 
mongoose.connect('mongodb://localhost:27017/miapi', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error de conexión a MongoDB:', err));

// Implementación del Middleware de Autenticación
const jwt = require('jsonwebtoken');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const token = req.headers.authorization || '';
        try {
            const usuario = jwt.verify(token.replace('Bearer ', ''), 'mi_secreto');
            return { usuario };
        } catch (err) {
            return {};
        }
    },
});
```

#### Ejemplos de consultas y mutaciones

#### Consulta exacta

```graphql
query {
    usuario(id: "1234") {
        nombre
        email
    }
}
```

**Respuesta:**

```json
{
    "data": {
        "usuario": {
            "nombre": "Juan Pérez",
            "email": "juan.perez@ejemplo.com"
        }
    }
}
```
#### Single Endpoint

```
POST https://api.ejemplo.com/graphql
```

#### Resolución de datos agregados

```graphql
query {
    usuario(id: "1234") {
        nombre
        pedidos {
            id
            fecha
            total
        }
    }
}
```

#### Herramientas para GraphQL

```javascript
const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
    type Usuario {
        id: ID!
        nombre: String!
        email: String!
    }

    type Query {
        usuarios: [Usuario]
    }
`;

const resolvers = {
    Query: {
        usuarios: () => obtenerTodosLosUsuarios(),
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`🚀 Servidor listo en ${url}`);
});
```

#### Uso con React y Apollo Client

```javascript
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://api.ejemplo.com/graphql',
    cache: new InMemoryCache(),
});

const GET_USUARIOS = gql`
    query GetUsuarios {
        usuarios {
            id
            nombre
            email
        }
    }
`;

function Usuarios() {
    const { loading, error, data } = useQuery(GET_USUARIOS);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <ul>
            {data.usuarios.map(usuario => (
                <li key={usuario.id}>{usuario.nombre} - {usuario.email}</li>
            ))}
        </ul>
    );
}

function App() {
    return (
        <ApolloProvider client={client}>
            <h1>Lista de Usuarios</h1>
            <Usuarios />
        </ApolloProvider>
    );
}

export default App;
```


#### GraphQL Code Generator

```yaml
schema: 'https://api.ejemplo.com/graphql'
documents: './src/**/*.graphql'
generates:
  ./src/generated/graphql.ts:
    plugins:
      - 'typescript'
      - 'typescript-operations'
      - 'typescript-react-apollo'
```


#### Suscripciones en GraphQL

```graphql
subscription {
    pedidoCreado(usuarioId: "1234") {
        id
        fecha
        total
        items {
            nombre
            cantidad
            precio
        }
    }
}
```

**Respuesta:**

```json
{
    "data": {
        "pedidoCreado": {
            "id": "5681",
            "fecha": "2024-04-04",
            "total": 250.00,
            "items": [
                {
                    "nombre": "Producto C",
                    "cantidad": 3,
                    "precio": 50.00
                },
                {
                    "nombre": "Producto D",
                    "cantidad": 2,
                    "precio": 75.00
                }
            ]
        }
    }
}
```

#### Ejemplos de consultas con GraphQL

#### Consulta con listados

```graphql
query {
    usuarios(pagina: 1, limite: 10) {
        nombre
        email
        pedidos {
            id
            total
        }
    }
}
```

#### Over-fetching y under-fetching

#### Over-fetching

```
GET https://api.ejemplo.com/v1/usuarios/1234

{
    "id": "1234",
    "nombre": "Juan Pérez",
    "email": "juan.perez@ejemplo.com",
    "direccion": "Calle Falsa 123",
    "telefono": "555-1234",
    "fechaNacimiento": "1990-01-01"
}
```

**Consulta GraphQL para evitar Over-fetching:**

```graphql
query {
    usuario(id: "1234") {
        nombre
        email
    }
}

{
    "data": {
        "usuario": {
            "nombre": "Juan Pérez",
            "email": "juan.perez@ejemplo.com"
        }
    }
}
```

#### Under-fetching

```
GET https://api.ejemplo.com/v1/usuarios/1234
GET https://api.ejemplo.com/v1/usuarios/1234/pedidos?limite=5
```

**Consulta GraphQL para evitar Under-fetching:**

```graphql
query {
    usuario(id: "1234") {
        nombre
        pedidos(limite: 5) {
            id
            fecha
            total
        }
    }
}

{
    "data": {
        "usuario": {
            "nombre": "Juan Pérez",
            "pedidos": [
                {
                    "id": "5678",
                    "fecha": "2024-04-01",
                    "total": 150.00
                },
                // otros pedidos
            ]
        }
    }
}
```

#### Ejemplos de respuestas

#### Solicitud GET a `/usuarios`

```
GET https://api.ejemplo.com/v1/usuarios/1234

{
    "id": "1234",
    "nombre": "Juan Pérez",
    "email": "juan.perez@ejemplo.com",
    "activo": true
}
```

#### Solicitud a GET a `/pedidos`

```
GET https://api.ejemplo.com/v1/pedidos?usuarioId=1234

[
    {
        "id": "5678",
        "fecha": "2024-04-01",
        "total": 150.00
    }
]
```

#### Consulta GraphQL para obtener usuario con pedidos

```graphql
query {
    usuarios(nombre: "Juan") {
        id
        nombre
        email
        pedidos {
            id
            fecha
            total
        }
    }
}

{
    "data": {
        "usuarios": [
            {
                "id": "1234",
                "nombre": "Juan Pérez",
                "email": "juan.perez@ejemplo.com",
                "pedidos": [
                    {
                        "id": "5678",
                        "fecha": "2024-04-01",
                        "total": 150.00
                    }
                ]
            }
        ]
    }
}
```


#### Ejemplos de mutaciones y suscripciones

#### Mutación para crear usuario y pedido

```graphql
mutation {
    crearUsuario(nombre: "Ana Gómez", email: "ana.gomez@ejemplo.com") {
        id
        nombre
        email
        activo
    }
    crearPedido(usuarioId: "1235", fecha: "2024-04-03", total: 250.00) {
        id
        fecha
        total
    }
}

{
    "data": {
        "crearUsuario": {
            "id": "1235",
            "nombre": "Ana Gómez",
            "email": "ana.gomez@ejemplo.com",
            "activo": true
        },
        "crearPedido": {
            "id": "5680",
            "fecha": "2024-04-03",
            "total": 250.00
        }
    }
}
```

#### Suscripción para pedido creado

```graphql
subscription {
    pedidoCreado(usuarioId: "1234") {
        id
        fecha
        total
        items {
            nombre
            cantidad
            precio
        }
    }
}

{
    "data": {
        "pedidoCreado": {
            "id": "5681",
            "fecha": "2024-04-04",
            "total": 250.00,
            "items": [
                {
                    "nombre": "Producto C",
                    "cantidad": 3,
                    "precio": 50.00
                },
                {
                    "nombre": "Producto D",
                    "cantidad": 2,
                    "precio": 75.00
                }
            ]
        }
    }
}
```

#### Definición del Schema completo

```graphql
schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
}
```

#### Definición de interfaces y uniones

```graphql
interface Entidad {
    id: ID!
}

type Usuario implements Entidad {
    id: ID!
    nombre: String!
    email: String!
}

type Pedido implements Entidad {
    id: ID!
    fecha: String!
    total: Float!
}

union BusquedaResultado = Usuario | Pedido | Item
```

#### Definición de Enums

```graphql
enum EstadoUsuario {
    ACTIVO
    INACTIVO
    SUSPENDIDO
}
```

#### Definición de Input Types

```graphql
input ItemInput {
    nombre: String!
    cantidad: Int!
    precio: Float!
}

input CrearUsuarioInput {
    nombre: String!
    email: String!
}
```

#### Definición de tipos No-Null

```graphql
type Usuario {
    id: ID!
    nombre: String!
    email: String!
    activo: Boolean!
}
```

#### Implementación de resolvers con autenticación

```javascript
const resolvers = {
    Query: {
        usuario: async (parent, args, context, info) => {
            // Verificar autenticación
            if (!context.usuario) {
                throw new Error('No autenticado');
            }
            // Obtener el usuario por ID
            return await obtenerUsuarioPorId(args.id);
        },
    },
};
```

#### Ejemplos de consultas completas

#### Crear pedido

```
POST https://api.ejemplo.com/v1/pedidos
Content-Type: application/json

{
    "usuarioId": "1234",
    "items": [
        { "nombre": "Producto A", "cantidad": 2, "precio": 50.00 },
        { "nombre": "Producto B", "cantidad": 1, "precio": 100.00 }
    ]
}

{
    "id": "5680",
    "fecha": "2024-04-03",
    "total": 200.00,
    "items": [
        { "nombre": "Producto A", "cantidad": 2, "precio": 50.00 },
        { "nombre": "Producto B", "cantidad": 1, "precio": 100.00 }
    ]
}
```

#### Mutación en GraphQL

```graphql
mutation {
    crearUsuario(nombre: "Ana Gómez", email: "ana.gomez@ejemplo.com") {
        id
        nombre
        email
        activo
    }
    crearPedido(usuarioId: "1235", fecha: "2024-04-03", total: 250.00) {
        id
        fecha
        total
    }
}

{
    "data": {
        "crearUsuario": {
            "id": "1235",
            "nombre": "Ana Gómez",
            "email": "ana.gomez@ejemplo.com",
            "activo": true
        },
        "crearPedido": {
            "id": "5680",
            "fecha": "2024-04-03",
            "total": 250.00
        }
    }
}
```

#### Suscripción en GraphQL

```graphql
subscription {
    pedidoCreado(usuarioId: "1234") {
        id
        fecha
        total
        items {
            nombre
            cantidad
            precio
        }
    }
}

{
    "data": {
        "pedidoCreado": {
            "id": "5681",
            "fecha": "2024-04-04",
            "total": 250.00,
            "items": [
                {
                    "nombre": "Producto C",
                    "cantidad": 3,
                    "precio": 50.00
                },
                {
                    "nombre": "Producto D",
                    "cantidad": 2,
                    "precio": 75.00
                }
            ]
        }
    }
}
```

#### Consultas adicionales

#### Obtener usuarios filtrados

```
GET https://api.ejemplo.com/v1/usuarios?nombre=Juan
```

**Respuesta:**

```json
[
    {
        "id": "1234",
        "nombre": "Juan Pérez",
        "email": "juan.perez@ejemplo.com",
        "activo": true
    }
]
```

#### Obtener pedidos de un usuario

```
GET https://api.ejemplo.com/v1/pedidos?usuarioId=1234

[
    {
        "id": "5678",
        "fecha": "2024-04-01",
        "total": 150.00
    }
]
```

#### Consulta GraphQL para obtener usuarios con pedidos

```graphql
query {
    usuarios(nombre: "Juan") {
        id
        nombre
        email
        pedidos {
            id
            fecha
            total
        }
    }
}

{
    "data": {
        "usuarios": [
            {
                "id": "1234",
                "nombre": "Juan Pérez",
                "email": "juan.perez@ejemplo.com",
                "pedidos": [
                    {
                        "id": "5678",
                        "fecha": "2024-04-01",
                        "total": 150.00
                    }
                ]
            }
        ]
    }
}
```

#### Definición del Schema completo

```graphql
schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
}
```
