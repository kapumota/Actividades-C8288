### Repaso REST

**URL RESTful**
https://api.ejemplo.com/v1/usuarios/1234

**Estrategias de autenticación en API REST**

* Autenticación básica
* Tokens de portador (Bearer Tokens): JWT
* OAuth 2.0

Authorization: Basic am9obkBleGFtcGxlLmNvbTpzZWNyZXRwYXNz

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...

https://api.ejemplo.com/v1/usuarios?api_key=abcdef123456

**Métodos HTTP**

| Método | Acción                                 | Idempotente | Seguro |
|--------|----------------------------------------|-------------|--------|
| GET    | Recuperar un recurso                   | Sí          | Sí     |
| POST   | Crear un nuevo recurso                 | No          | No     |
| PUT    | Actualizar completamente un recurso     | Sí          | No     |
| PATCH  | Actualizar parcialmente un recurso      | No          | No     |
| DELETE | Eliminar un recurso                     | Sí          | No     |
| HEAD   | Obtener metadatos de un recurso         | Sí          | Sí     |
| OPTIONS| Obtener opciones de comunicación       | Sí          | Sí     |


GET https://api.ejemplo.com/v1/usuarios

POST https://api.ejemplo.com/v1/usuarios
Content-Type: application/json

{
    "nombre": "Ana Gómez",
    "email": "ana.gomez@ejemplo.com",
    "activo": true
}



PUT https://api.ejemplo.com/v1/usuarios/1234
Content-Type: application/json

{
    "nombre": "Ana María Gómez",
    "email": "ana.maria.gomez@ejemplo.com",
    "activo": false
}


PATCH https://api.ejemplo.com/v1/usuarios/1234
Content-Type: application/json

{
    "activo": true
}


DELETE https://api.ejemplo.com/v1/usuarios/1234

**Lectura de datos**

GET https://api.ejemplo.com/v1/usuarios?pagina=2&limite=50&orden=asc

* Paginación --> offset-based, cursor-based
* Filtrado
* Ordenamiento
* Caching

**Paginación**
- GET /v1/usuarios?pagina=2&limite=50
- GET /v1/usuarios?cursor=abc123&limite=50

**Filtrado**
GET /v1/usuarios?activo=true

**Ordemiento**
GET /v1/usuarios?orden=asc&campo=nombre

**Proyeccion**
GET /v1/usuarios?campos=nombre,email

**Caching**
Cache-Control: max-age=3600
ETag: "abc123"
Last-Modified??

**HATEOAS**

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


PUT https://api.ejemplo.com/v1/usuarios/1234
Content-Type: application/json

{
    "nombre": "Juan Pérez",
    "email": "juan.perez@ejemplo.com",
    "activo": true
}

PATCH https://api.ejemplo.com/v1/usuarios/1234
Content-Type: application/json

{
    "email": "juan.perez@nuevoejemplo.com"
}


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


---

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

---
**Manejo de errores**
{
    "error": {
        "codigo": 400,
        "mensaje": "Solicitud inválida. El campo 'email' es obligatorio."
    }
}

**Versionado de API REST**

https://api.ejemplo.com/v1/usuarios


**Versionado en la URL**
https://api.ejemplo.com/V1/usuarios

**Versionado en el encabezado**
GET /usuarios
Accept: application/vnd.ejemplo.v1+json

**Versionado por parametro de consulta**
GET /usuarios?version=1

**Versionado por encabezados personalizados**
GET /usuarios
X-API-Version: 1

**Seguridad en API REST**

**CORS**
Access-Control-Allow-Origin: https://cliente.ejemplo.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization


HTTP/1.1 200 OK
Content-Type: application/json
Access-Control-Allow-Origin: https://cliente.ejemplo.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization

**Pruebas funcionales**
//Verificar que una solicitud GET a /usuarios/1234 devuelva el usuario correcto
// Verifica que una solicitud POST a /usuarios crea un nuevo usuario y retorna el estado
// 201 Created

**Pruebas de integración**

// Verificar que la creación de un usuario en la API actualiza correctamente
// la base de datos

//Verificar que una solicitud a /usuarios/1234/pedidos obtiene los pedidos asociados
// correctamente desde el servicio de pedidos.

**Pruebas de rendimiento**
// Medir el tiempo de respuesta de la API cuando se realizan 1000 solicitudes concurrentes

**Pruebas de seguridad**
- Pruebas de autenticación
- Pruebas de autorización,
- Inyección SQL, XSS, CSRF

//Probar inyecciones SQL en parametros de entrada y asegurar que la API las maneje
// correctamente

**Pruebas de compatibilidad**

---
{
    "error": {
        "codigo": 401,
        "mensaje": "Autenticación requerida."
    }
}


### GraphQL

// Ejemplo de definición de tipo
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

// Ejemplo de definición de consulta 
type Query {
    usuarios(pagina: Int, limite: Int): [Usuario]
    usuario(id: ID!): Usuario
    pedidosUsuario(id: ID!, limite: Int): [Pedido]
}

//Ejemplo de definición de mutación
type Mutation {
    crearUsuario(nombre: String!, email: String!): Usuario
    actualizarUsuario(id: ID!, nombre: String, email: String, activo: Boolean): Usuario
    eliminarUsuario(id: ID!): Boolean
    crearPedido(usuarioId: ID!, items: [ItemInput]!): Pedido
}

input ItemInput {
    nombre: String!
    cantidad: Int!
    precio: Float!
}

//Suscripciones
type Subscription {
    usuarioCreado: Usuario
    pedidoCreado(usuarioId: ID!): Pedido
}


---
// Enums, interfaces y uniones
enum EstadoPedido {
    PENDIENTE
    COMPLETADO
    CANCELADO
}

---

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

---
union BusquedaResultado = Usuario | Pedido | Item

type Query {
    buscar(texto: String!): [BusquedaResultado]
}

---
// Resolvers
const resolvers = {
    Query: {
        usuario: async (parent, args, context, info) => {
            // Obtener el usuario por ID desde la base de datos
            const usuario = await obtenerUsuarioPorId(args.id);
            if (!usuario) {
                throw new Error('Usuario no encontrado');
            }
            return usuario;
        },
        usuarios: async (parent, args, context, info) => {
            // Obtener una lista de usuarios con paginación
            return await obtenerUsuarios(args.pagina, args.limite);
        },
    },
    Mutation: {
        crearUsuario: async (parent, args, context, info) => {
            // Crear un nuevo usuario en la base de datos
            const nuevoUsuario = await crearNuevoUsuario(args.nombre, args.email);
            return nuevoUsuario;
        },
        actualizarUsuario: async (parent, args, context, info) => {
            // Actualizar los detalles del usuario
            const usuarioActualizado = await actualizarUsuario(args.id, args);
            if (!usuarioActualizado) {
                throw new Error('No se pudo actualizar el usuario');
            }
            return usuarioActualizado;
        },
        eliminarUsuario: async (parent, args, context, info) => {
            // Eliminar el usuario de la base de datos
            const exito = await eliminarUsuarioPorId(args.id);
            return exito;
        },
    },
    Usuario: {
        pedidos: async (parent, args, context, info) => {
            // Obtener los pedidos asociados al usuario
            return await obtenerPedidosPorUsuario(parent.id, args.limite);
        },
    },
};



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

//Escalar
type Usuario {
    id: ID!
    nombre: String!
    edad: Int
    saldo: Float
    activo: Boolean!
}

// Enums
enum EstadoUsuario {
    ACTIVO
    INACTIVO
    SUSPENDIDO
}

type Usuario {
    id: ID!
    nombre: String!
    estado: EstadoUsuario!
}


//Objetos
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

//interfaces
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

//Uniones 
union BusquedaResultado = Usuario | Pedido | Item

type Query {
    buscar(texto: String!): [BusquedaResultado]
}


//Input types
input CrearUsuarioInput {
    nombre: String!
    email: String!
}

type Mutation {
    crearUsuario(input: CrearUsuarioInput!): Usuario
}

//list types 
type Query {
    usuarios: [Usuario]
    pedidos: [Pedido]
}

//non-null types 
type Usuario {
    id: ID!
    nombre: String!
    email: String!
    activo: Boolean!
}


---
// Definiciones de tipos
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

//Query 
type Query {
    usuarios(pagina: Int, limite: Int): [Usuario]
    usuario(id: ID!): Usuario
    pedidosUsuario(id: ID!, limite: Int): [Pedido]
}
//Mutaciones
type Mutation {
    crearUsuario(nombre: String!, email: String!): Usuario
    actualizarUsuario(id: ID!, nombre: String, email: String, activo: Boolean): Usuario
    eliminarUsuario(id: ID!): Boolean
    crearPedido(usuarioId: ID!, items: [ItemInput]!): Pedido
}

//Suscripciones
type Subscription {
    usuarioCreado: Usuario
    pedidoCreado(usuarioId: ID!): Pedido
}

//Definiciones de schema

schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
}


---
//Implementación de una API GraphQL
//1. Definición de un esquema 
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

2. Configuración del servidor, resolvers 

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
            return await obtenerPedidosPorUsuario(parent.id);
        },
    },
};

// Creación del servidor Apollo
const server = new ApolloServer({ typeDefs, resolvers });

// Inicio del servidor
server.listen().then(({ url }) => {
    console.log(`🚀 Servidor listo en ${url}`);
});

//4. Conexión a la base de datos 
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/miapi', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error de conexión a MongoDB:', err));

//5. Implementación del Middleware
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



---
// Exact fetching 
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


---
//Solo un endpoint

POST https://api.ejemplo.com/graphql

// Resolución de datos agregados

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

//Herramientas 
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

//Uso con React y Apollo Client 
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

// GraphQL Code Generator
schema: 'https://api.ejemplo.com/graphql'
documents: './src/**/*.graphql'
generates:
  ./src/generated/graphql.ts:
    plugins:
      - 'typescript'
      - 'typescript-operations'
      - 'typescript-react-apollo'


---
//Prisma - ORM
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


#### Ejemplos

query {
    usuario(id: "1234") {
        nombre
        email
        pedidos {
            id
            total
        }
    }
}

{
    "data": {
        "usuario": {
            "nombre": "Juan Pérez",
            "email": "juan.perez@ejemplo.com",
            "pedidos": [
                {
                    "id": "5678",
                    "total": 150.00
                },
                {
                    "id": "5679",
                    "total": 200.00
                }
            ]
        }
    }
}

---
GET https://api.ejemplo.com/v1/usuarios/1234
{
    "id": "1234",
    "nombre": "Juan Pérez",
    "email": "juan.perez@ejemplo.com",
    "activo": true
}

GET https://api.ejemplo.com/v1/usuarios/1234/pedidos
[
    {
        "id": "5678",
        "fecha": "2024-04-01",
        "total": 150.00
    },
    {
        "id": "5679",
        "fecha": "2024-04-02",
        "total": 200.00
    }
]

---

mutation {
    crearPedido(usuarioId: "1234", items: [
        { nombre: "Producto A", cantidad: 2, precio: 50.00 },
        { nombre: "Producto B", cantidad: 1, precio: 100.00 }
    ]) {
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
        "crearPedido": {
            "id": "5680",
            "fecha": "2024-04-03",
            "total": 200.00,
            "items": [
                {
                    "nombre": "Producto A",
                    "cantidad": 2,
                    "precio": 50.00
                },
                {
                    "nombre": "Producto B",
                    "cantidad": 1,
                    "precio": 100.00
                }
            ]
        }
    }
}

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

---

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


#### over-fetching
GET https://api.ejemplo.com/v1/usuarios/1234

{
    "id": "1234",
    "nombre": "Juan Pérez",
    "email": "juan.perez@ejemplo.com",
    "direccion": "Calle Falsa 123",
    "telefono": "555-1234",
    "fechaNacimiento": "1990-01-01"
}


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


#### Under-fetching
GET https://api.ejemplo.com/v1/usuarios/1234
GET https://api.ejemplo.com/v1/usuarios/1234/pedidos?limite=5


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


---
GET https://api.ejemplo.com/v1/usuarios/1234

{
    "id": "1234",
    "nombre": "Juan Pérez",
    "email": "juan.perez@ejemplo.com",
    "activo": true
}

GET https://api.ejemplo.com/v1/usuarios/1234/pedidos

[
    {
        "id": "5678",
        "fecha": "2024-04-01",
        "total": 150.00
    },
    {
        "id": "5679",
        "fecha": "2024-04-02",
        "total": 200.00
    }
]

query {
    usuario(id: "1234") {
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
        "usuario": {
            "nombre": "Juan Pérez",
            "email": "juan.perez@ejemplo.com",
            "pedidos": [
                {
                    "id": "5678",
                    "fecha": "2024-04-01",
                    "total": 150.00
                },
                {
                    "id": "5679",
                    "fecha": "2024-04-02",
                    "total": 200.00
                }
            ]
        }
    }
}


POST https://api.ejemplo.com/v1/usuarios
Content-Type: application/json

{
    "nombre": "Ana Gómez",
    "email": "ana.gomez@ejemplo.com",
    "activo": true
}

{
    "id": "1235",
    "nombre": "Ana Gómez",
    "email": "ana.gomez@ejemplo.com",
    "activo": true
}

POST https://api.ejemplo.com/v1/pedidos
Content-Type: application/json

{
    "usuarioId": "1235",
    "fecha": "2024-04-03",
    "total": 250.00
}


{
    "id": "5680",
    "usuarioId": "1235",
    "fecha": "2024-04-03",
    "total": 250.00
}


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

---
GET https://api.ejemplo.com/v1/usuarios?nombre=Juan
[
    {
        "id": "1234",
        "nombre": "Juan Pérez",
        "email": "juan.perez@ejemplo.com",
        "activo": true
    }
]

GET https://api.ejemplo.com/v1/pedidos?usuarioId=1234

[
    {
        "id": "5678",
        "fecha": "2024-04-01",
        "total": 150.00
    }
]


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


query {
    usuarios {
        nombre
        email
    }
}

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



