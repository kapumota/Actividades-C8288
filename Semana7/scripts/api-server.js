// api-server.mjs
import express from 'express';
import jwt from 'jsonwebtoken';
//npm install express-rate-limit
import rateLimit from 'express-rate-limit';
//npm install swagger-ui-express swagger-jsdoc
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import crypto from 'crypto';

const app = express();
app.use(express.json());

const SECRET_KEY = 'clave_secreta';

// Configuración de Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limita a 100 solicitudes por IP
  message: 'Demasiadas solicitudes desde esta IP, por favor intente de nuevo después de 15 minutos',
});

// Aplicar Rate Limiting a todas las rutas
app.use(limiter);

// Simulación de base de datos
let usuarios = [
  { id: 1, nombre: 'Usuario1', password: 'pass1' },
  // ...
];

let productos = [
  { id: 1, nombre: 'Producto A' },
  // ...
];

// Middleware de Autenticación
function verificarToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send('Se requiere token');

  jwt.verify(token.replace('Bearer ', ''), SECRET_KEY, (err, decoded) => {
    if (err) return res.status(500).send('Token inválido');
    req.usuarioId = decoded.id;
    next();
  });
}

// Opciones de Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Productos',
      version: '1.0.0',
      description: 'API para gestionar productos',
      contact: {
        name: 'Tu Nombre',
      },
      servers: [{ url: 'http://localhost:3000' }],
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./api-server.mjs'],
};

// Inicializar SwaggerJSDoc
const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Ruta para la documentación
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Autentica un usuario y obtiene un token
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Autenticación exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 auth:
 *                   type: boolean
 *                 token:
 *                   type: string
 *       401:
 *         description: Credenciales inválidas
 */

// Ruta de Autenticación
app.post('/login', (req, res) => {
  const { nombre, password } = req.body;
  const usuario = usuarios.find(u => u.nombre === nombre && u.password === password);
  if (!usuario) return res.status(401).send('Credenciales inválidas');

  const token = jwt.sign({ id: usuario.id }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ auth: true, token });
});

/**
 * @swagger
 * /api/productos:
 *   get:
 *     summary: Obtiene la lista de productos
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de productos
 *         headers:
 *           ETag:
 *             description: Identificador único del recurso
 *             schema:
 *               type: string
 *           Cache-Control:
 *             description: Directivas de caché
 *             schema:
 *               type: string
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nombre:
 *                     type: string
 *       304:
 *         description: No modificado
 *       403:
 *         description: Se requiere token
 *       500:
 *         description: Error del servidor
 */
// Etag
app.get('/api/productos', verificarToken, (req, res) => {
  // Generar ETag basado en el contenido de los productos
  const etag = crypto.createHash('md5').update(JSON.stringify(productos)).digest('hex');

  // Verificar si el ETag coincide con el proporcionado por el cliente
  if (req.headers['if-none-match'] === etag) {
    return res.status(304).end(); // No modificado
  }

  // Establecer ETag y encabezados de caché
  res.set({
    'ETag': etag,
    'Cache-Control': 'public, max-age=300', // 5 minutos
  });

  res.json(productos);
});

// Manejo de errores
app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal');
});

app.listen(3000, () => {
  console.log('Servidor API escuchando en http://localhost:3000');
});
