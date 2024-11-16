// graphql-server.js
const { ApolloServer, gql, AuthenticationError } = require('apollo-server');
const depthLimit = require('graphql-depth-limit');
const DataLoader = require('dataloader');

// Definición de esquema (typeDefs)
const typeDefs = gql`
  interface Producto {
    id: ID!
    nombre: String!
  }

  type Libro implements Producto {
    id: ID!
    nombre: String!
    autor: String!
  }

  type Electronico implements Producto {
    id: ID!
    nombre: String!
    marca: String!
  }

  union ResultadoBusqueda = Libro | Electronico

  type Query {
    productos: [Producto]
    buscarProducto(termino: String!): [ResultadoBusqueda]
  }
`;

// Datos Simulados
const productos = [
  { __typename: 'Libro', id: '1', nombre: 'Libro A', autor: 'Autor A' },
  { __typename: 'Electronico', id: '2', nombre: 'Teléfono B', marca: 'Marca B' },
];

// Implementación de DataLoader
// Optimiza el rendimiento de las consultas 
async function obtenerProductosPorIds(ids) {
  // Simula la obtención de productos por IDs
  return ids.map(id => productos.find(p => p.id === id));
}

const productoLoader = new DataLoader(ids => obtenerProductosPorIds(ids));

// Resolvers
const resolvers = {
  Query: {
    productos: () => productos,
    buscarProducto: (_, { termino }) => {
      return productos.filter(p => p.nombre.includes(termino));
    },
  },
  Producto: {//Producto.__resolverType
    __resolveType(obj) {
      if (obj.autor) {
        return 'Libro';
      }
      if (obj.marca) {
        return 'Electronico';
      }
      return null;
    },
  },
  ResultadoBusqueda: {//ResultadoBusqueda.__resolverType
    __resolveType(obj) {
      if (obj.autor) {
        return 'Libro';
      }
      if (obj.marca) {
        return 'Electronico';
      }
      return null;
    },
  },
};

// Función para obtener el usuario desde el token (Simulada)
function obtenerUsuarioDesdeToken(token) {
  // Implementar la lógica para decodificar el token y obtener el usuario
  // Por simplicidad, suponemos que si el token es 'token_valido', el usuario está autenticado
  if (token === 'token_valido') {
    return { id: 'usuario1', nombre: 'Usuario 1' };
  }
  return null;
}

// Servidor Apollo
const servidor = new ApolloServer({
  typeDefs,
  resolvers,
  validationRules: [depthLimit(5)], // Limita la profundidad de las consultas a 5 niveles
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    const usuario = obtenerUsuarioDesdeToken(token);
    return { usuario, loaders: { productoLoader } };
  },
});

servidor.listen().then(({ url }) => {
  console.log(`Servidor GraphQL ejecutándose en ${url}`);
});
