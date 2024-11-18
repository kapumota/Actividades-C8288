// app/api/route.ts

import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { NextRequest } from 'next/server';
import { gql } from 'graphql-tag';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

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

