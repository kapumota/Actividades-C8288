### Configuración y ejemplos de uso de MongoDB con Node.js y Mongoose

```markdown
#### Iniciar el servidor MongoDB

mongod
```

#### Crear el directorio de la aplicación y configurar el proyecto

```bash
mkdir mi-aplicacion
cd mi-aplicacion
npm init -y

npm install mongoose
```

#### Estructura del proyecto

```plaintext
mi-aplicacion/
├── models/
│   └── usuario.js
├── routes/
│   └── usuario.js
├── app.js
└── package.json
```


#### Conexión a MongoDB con el cliente oficial

```javascript
// Importar el cliente de MongoDB
const { MongoClient } = require('mongodb');

// URL de conexión a MongoDB (puede ser local o en la nube)
const url = 'mongodb://localhost:27017';

// Nombre de la base de datos
const dbName = 'miBaseDeDatos';

// Crear una instancia del cliente
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

async function main() {
    try {
        // Conectar al servidor MongoDB
        await client.connect();
        console.log('Conectado correctamente a MongoDB');

        // Seleccionar la base de datos
        const db = client.db(dbName);

        // ------------------------- Schema-less design -------------------------
        // MongoDB es una base de datos sin esquema fijo, lo que significa que
        // los documentos en una misma colección pueden tener estructuras diferentes.
        const coleccion = db.collection('usuarios');

        // Insertar documentos con diferentes estructuras
        const usuarios = [
            { nombre: 'Juan', edad: 30, dirección: { ciudad: 'Madrid', códigoPostal: 28001 } },
            { nombre: 'Ana', correo: 'ana@example.com' },
            { nombre: 'Luis', edad: 25, hobbies: ['fútbol', 'lectura'] },
        ];

        const resultadoInsert = await coleccion.insertMany(usuarios);
        console.log(`${resultadoInsert.insertedCount} documentos insertados.`);

        // ------------------------- Document-based storage -------------------------
        // MongoDB almacena datos en documentos BSON (una extensión de JSON),
        // lo que permite almacenar datos complejos y anidados de manera eficiente.
        const documento = await coleccion.findOne({ nombre: 'Juan' });
        console.log('Documento encontrado:', documento);

        // ------------------------- Indexing -------------------------
        // Los índices mejoran el rendimiento de las consultas.
        // Crear un índice en el campo 'nombre'
        const resultadoIndex = await coleccion.createIndex({ nombre: 1 });
        console.log('Índice creado:', resultadoIndex);

        // ------------------------- Replication -------------------------
        // La replicación proporciona alta disponibilidad mediante réplicas de los datos.
        // (Nota: La configuración de replicación se realiza a nivel de servidor y no se muestra aquí.)

        // ------------------------- Sharding -------------------------
        // El sharding permite distribuir los datos en múltiples servidores para manejar grandes volúmenes.
        // (Nota: La configuración de sharding se realiza a nivel de servidor y no se muestra aquí.)

        // ------------------------- Aggregation Framework -------------------------
        // El framework de agregación permite realizar consultas complejas y transformaciones de datos.
        const pipeline = [
            { $match: { edad: { $gte: 18 } } },
            { $group: { _id: '$edad', total: { $sum: 1 } } },
            { $sort: { _id: 1 } },
        ];

        const agregacion = await coleccion.aggregate(pipeline).toArray();
        console.log('Resultados de la agregación:', agregacion);

        // ------------------------- Flexible Querying -------------------------
        // MongoDB permite consultas flexibles utilizando una variedad de operadores.
        const consulta = { 'dirección.ciudad': 'Madrid' };
        const usuariosMadrid = await coleccion.find(consulta).toArray();
        console.log('Usuarios en Madrid:', usuariosMadrid);

        // ------------------------- CRUD Operations -------------------------
        // Crear, Leer, Actualizar y Eliminar documentos.

        // Actualizar un documento
        const actualizar = await coleccion.updateOne(
            { nombre: 'Ana' },
            { $set: { edad: 22 } }
        );
        console.log('Documento actualizado:', actualizar.modifiedCount);

        // Eliminar un documento
        const eliminar = await coleccion.deleteOne({ nombre: 'Luis' });
        console.log('Documento eliminado:', eliminar.deletedCount);

        // ------------------------- Schema Validation -------------------------
        // Aunque MongoDB es schema-less, permite definir validaciones de esquema.
        // (Nota: La configuración de validación de esquema se realiza al crear la colección.)

        // ------------------------- Data Types -------------------------
        // Soporta múltiples tipos de datos como cadenas, números, objetos, arrays, etc.
        const nuevoUsuario = {
            nombre: 'Carlos',
            edad: 28,
            casado: false,
            hijos: [],
            hobbies: ['ciclismo', 'programación'],
            dirección: {
                calle: 'Gran Vía',
                ciudad: 'Barcelona',
                códigoPostal: 08002,
            },
            fechaRegistro: new Date(),
            puntaje: 4.5,
        };

        const insertarCarlos = await coleccion.insertOne(nuevoUsuario);
        console.log('Nuevo usuario insertado con ID:', insertarCarlos.insertedId);

        // ------------------------- Geospatial Indexing -------------------------
        // Permite realizar consultas geoespaciales.
        // (Ejemplo simplificado)
        const lugares = db.collection('lugares');
        await lugares.createIndex({ ubicación: '2dsphere' });

        const lugar = {
            nombre: 'Parque Central',
            ubicación: {
                type: 'Point',
                coordinates: [-73.97, 40.77],
            },
        };

        await lugares.insertOne(lugar);

        const cercaDe = {
            ubicación: {
                $near: {
                    $geometry: { type: 'Point', coordinates: [-73.9667, 40.78] },
                    $maxDistance: 1000,
                },
            },
        };

        const lugaresCercanos = await lugares.find(cercaDe).toArray();
        console.log('Lugares cercanos:', lugaresCercanos);

        // ------------------------- Transactions -------------------------
        // Soporta transacciones ACID para operaciones que involucran múltiples documentos.
        // (Requiere una configuración de replica set)
        const session = client.startSession();
        try {
            session.startTransaction();

            const ordenes = db.collection('ordenes');
            await coleccion.updateOne({ nombre: 'Carlos' }, { $inc: { puntaje: 1 } }, { session });
            await ordenes.insertOne({ usuario: 'Carlos', producto: 'Laptop', cantidad: 1 }, { session });

            await session.commitTransaction();
            console.log('Transacción completada.');
        } catch (error) {
            await session.abortTransaction();
            console.error('Transacción abortada debido a un error:', error);
        } finally {
            session.endSession();
        }

        // ------------------------- Change Streams -------------------------
        // Permite escuchar cambios en tiempo real en las colecciones.
        const changeStream = coleccion.watch();

        changeStream.on('change', (cambio) => {
            console.log('Cambio detectado:', cambio);
        });

        // Insertar un nuevo documento para ver el Change Stream en acción
        await coleccion.insertOne({ nombre: 'María', edad: 35 });
        
        // Esperar unos segundos para recibir el cambio
        await new Promise(resolve => setTimeout(resolve, 3000));
        await changeStream.close();

    } catch (err) {
        console.error('Error al conectar o operar con MongoDB:', err);
    } finally {
        // Cerrar la conexión
        await client.close();
        console.log('Conexión a MongoDB cerrada');
    }
}

// Ejecutar la función principal
main().catch(console.error);
```


#### Conexión a MongoDB con GridFS

```javascript
// Importar el cliente de MongoDB y GridFS
const { MongoClient, GridFSBucket } = require('mongodb');
const fs = require('fs');
const path = require('path');

// URL de conexión a MongoDB (puede ser local o en la nube)
const url = 'mongodb://localhost:27017';

// Nombre de la base de datos
const dbName = 'miBaseDeDatos';

// Crear una instancia del cliente
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

async function main() {
    try {
        // Conectar al servidor MongoDB
        await client.connect();
        console.log('Conectado correctamente a MongoDB');

        // Seleccionar la base de datos
        const db = client.db(dbName);

        // ------------------------- Validación de esquema -------------------------
        // Definir reglas de validación al crear la colección 'productos'
        const coleccionProductos = db.collection('productos');
        await db.createCollection('productos', {
            validator: {
                $jsonSchema: {
                    bsonType: 'object',
                    required: ['nombre', 'precio', 'categoria'],
                    properties: {
                        nombre: {
                            bsonType: 'string',
                            description: 'debe ser una cadena y es requerida'
                        },
                        precio: {
                            bsonType: 'double',
                            minimum: 0,
                            description: 'debe ser un número positivo y es requerido'
                        },
                        categoria: {
                            bsonType: 'string',
                            description: 'debe ser una cadena y es requerida'
                        },
                        stock: {
                            bsonType: 'int',
                            minimum: 0,
                            description: 'debe ser un entero positivo'
                        }
                    }
                }
            }
        }).catch(err => {
            if (err.codeName === 'NamespaceExists') {
                console.log('La colección "productos" ya existe con validación de esquema.');
            } else {
                throw err;
            }
        });

        // Insertar un documento válido
        try {
            const productoValido = {
                nombre: 'Teclado Mecánico',
                precio: 99.99,
                categoria: 'Periféricos',
                stock: 50
            };
            const insertarProducto = await coleccionProductos.insertOne(productoValido);
            console.log('Producto válido insertado con ID:', insertarProducto.insertedId);
        } catch (error) {
            console.error('Error al insertar producto válido:', error.message);
        }

        // Intentar insertar un documento inválido
        try {
            const productoInvalido = {
                nombre: 'Ratón Inalámbrico',
                precio: -25.00, // Precio negativo, inválido
                categoria: 'Periféricos'
            };
            await coleccionProductos.insertOne(productoInvalido);
        } catch (error) {
            console.error('Error al insertar producto inválido:', error.message);
        }

        // ------------------------- Índices compuestos y de texto -------------------------
        // Crear un índice compuesto en 'categoria' y 'precio'
        const indiceCompuesto = await coleccionProductos.createIndex({ categoria: 1, precio: -1 });
        console.log('Índice compuesto creado:', indiceCompuesto);

        // Crear un índice de texto en 'nombre' y 'categoria' para búsquedas de texto
        const indiceTexto = await coleccionProductos.createIndex({ nombre: 'text', categoria: 'text' });
        console.log('Índice de texto creado:', indiceTexto);

        // Realizar una búsqueda de texto
        const busquedaTexto = { $text: { $search: 'Periféricos' } };
        const productosTexto = await coleccionProductos.find(busquedaTexto).toArray();
        console.log('Resultados de búsqueda de texto:', productosTexto);

        // ------------------------- Paginación en consultas -------------------------
        // Implementar paginación usando 'limit' y 'skip'
        const pagina = 2;
        const elementosPorPagina = 2;
        const productosPaginados = await coleccionProductos.find({})
            .skip((pagina - 1) * elementosPorPagina)
            .limit(elementosPorPagina)
            .toArray();
        console.log(`Productos página ${pagina}:`, productosPaginados);

        // ------------------------- Uso de GridFS para Almacenamiento de Archivos -------------------------
        // Crear una instancia de GridFSBucket
        const bucket = new GridFSBucket(db, { bucketName: 'archivos' });

        // Subir un archivo a GridFS
        const rutaArchivo = path.join(__dirname, 'ejemplo.txt');
        fs.writeFileSync(rutaArchivo, 'Este es un archivo de ejemplo para GridFS.');
        const uploadStream = bucket.openUploadStream('ejemplo.txt');
        fs.createReadStream(rutaArchivo).pipe(uploadStream)
            .on('error', (error) => {
                console.error('Error al subir archivo a GridFS:', error);
            })
            .on('finish', () => {
                console.log('Archivo subido a GridFS con ID:', uploadStream.id);
            });

        // Descargar un archivo de GridFS
        const downloadStream = bucket.openDownloadStreamByName('ejemplo.txt');
        const rutaDescarga = path.join(__dirname, 'descargado_ejemplo.txt');
        const writeStream = fs.createWriteStream(rutaDescarga);
        downloadStream.pipe(writeStream)
            .on('error', (error) => {
                console.error('Error al descargar archivo de GridFS:', error);
            })
            .on('finish', () => {
                console.log('Archivo descargado de GridFS en:', rutaDescarga);
                // Opcional: Eliminar los archivos locales después de la operación
                fs.unlinkSync(rutaArchivo);
                fs.unlinkSync(rutaDescarga);
            });

        // ------------------------- Manejo avanzado de errores -------------------------
        // Ejemplo de manejo de errores en operaciones de actualización
        try {
            const actualizarError = await coleccionProductos.updateOne(
                { nombre: 'Teclado Mecánico' },
                { $set: { precio: 'cien' } } // Intentar establecer un precio no numérico
            );
            console.log('Documento actualizado:', actualizarError.modifiedCount);
        } catch (error) {
            console.error('Error al actualizar documento con datos inválidos:', error.message);
        }

        // ------------------------- Map-Reduce -------------------------
        // Utilizar map-reduce para calcular el total de ventas por categoría
        // (Este es un ejemplo simplificado)
        const mapFunction = function () {
            emit(this.categoria, this.precio);
        };

        const reduceFunction = function (keyCategoria, valoresPrecio) {
            return Array.sum(valoresPrecio);
        };

        const resultadosMapReduce = await coleccionProductos.mapReduce(mapFunction, reduceFunction, {
            out: 'total_ventas_por_categoria'
        });

        const totalVentas = await db.collection('total_ventas_por_categoria').find({}).toArray();
        console.log('Total de ventas por categoría (Map-Reduce):', totalVentas);

        // ------------------------- Agregación Avanzada -------------------------
        // Ejemplo de agregación con $lookup para unir colecciones
        const coleccionOrdenes = db.collection('ordenes');

        // Insertar documentos de ejemplo en 'ordenes'
        await coleccionOrdenes.insertMany([
            { usuario: 'Carlos', producto: 'Teclado Mecánico', cantidad: 2 },
            { usuario: 'María', producto: 'Ratón Inalámbrico', cantidad: 1 }
        ]);

        const pipelineLookup = [
            {
                $lookup: {
                    from: 'productos',
                    localField: 'producto',
                    foreignField: 'nombre',
                    as: 'detalleProducto'
                }
            },
            {
                $unwind: '$detalleProducto'
            },
            {
                $project: {
                    usuario: 1,
                    producto: 1,
                    cantidad: 1,
                    precioUnitario: '$detalleProducto.precio',
                    total: { $multiply: ['$cantidad', '$detalleProducto.precio'] }
                }
            }
        ];

        const ordenesConDetalle = await coleccionOrdenes.aggregate(pipelineLookup).toArray();
        console.log('Ordenes con detalle de productos:', ordenesConDetalle);

        // ------------------------- Implementación de caching con indices -------------------------
        // Utilizar índices para mejorar el rendimiento de las consultas frecuentes
        // Por ejemplo, si se realizan muchas búsquedas por 'categoria', ya creamos un índice compuesto anteriormente

        // ------------------------- Implementación de Rate Limiting en aplicaciones (ejemplo conceptual) -------------------------
        // Aunque MongoDB no maneja directamente el rate limiting, se puede implementar usando una colección para rastrear
        // solicitudes por usuario y aplicar lógica de control en la aplicación.

        // ------------------------- Agregar más tipos de datos -------------------------
        // Insertar un documento con tipos de datos variados
        const usuarioAvanzado = {
            nombre: 'Laura',
            edad: 29,
            suscrito: true,
            intereses: ['tecnología', 'arte', 'viajes'],
            perfil: {
                twitter: '@lauraTech',
                linkedin: 'laura-linkedin'
            },
            fechaNacimiento: new Date('1994-05-15'),
            puntuaciones: [8, 9, 7.5],
            historialCompras: [
                { producto: 'Monitor 24"', fecha: new Date('2023-03-10'), cantidad: 1 },
                { producto: 'Teclado Mecánico', fecha: new Date('2023-06-22'), cantidad: 2 }
            ]
        };

        const insertarUsuarioAvanzado = await coleccion.insertOne(usuarioAvanzado);
        console.log('Usuario avanzado insertado con ID:', insertarUsuarioAvanzado.insertedId);

        // ------------------------- Consultas con operadores avanzados -------------------------
        // Buscar usuarios con al menos una puntuación mayor a 8
        const consultaAvanzada = { puntuaciones: { $gt: 8 } };
        const usuariosAltaPuntuacion = await coleccion.find(consultaAvanzada).toArray();
        console.log('Usuarios con puntuaciones > 8:', usuariosAltaPuntuacion);

        // ------------------------- Actualizaciones con operadores de array -------------------------
        // Agregar un nuevo interés a Laura
        const actualizarIntereses = await coleccion.updateOne(
            { nombre: 'Laura' },
            { $addToSet: { intereses: 'fotografía' } }
        );
        console.log('Intereses actualizados:', actualizarIntereses.modifiedCount);

        // ------------------------- Eliminación de campos -------------------------
        // Eliminar el campo 'perfil.linkedin' de Laura
        const eliminarCampo = await coleccion.updateOne(
            { nombre: 'Laura' },
            { $unset: { 'perfil.linkedin': "" } }
        );
        console.log('Campo eliminado:', eliminarCampo.modifiedCount);

        // ------------------------- Operaciones de Bulk -------------------------
        // Realizar múltiples operaciones de inserción, actualización y eliminación en bulk
        const operacionesBulk = [
            { insertOne: { document: { nombre: 'Auriculares Bluetooth', precio: 59.99, categoria: 'Periféricos', stock: 100 } } },
            { updateOne: { filter: { nombre: 'Teclado Mecánico' }, update: { $inc: { stock: -1 } } } },
            { deleteOne: { filter: { nombre: 'Ratón Inalámbrico' } } }
        ];

        const resultadoBulk = await coleccionProductos.bulkWrite(operacionesBulk);
        console.log('Operaciones bulk realizadas:', resultadoBulk);

        // ------------------------- Monitoreo de rendimiento con Explain -------------------------
        // Utilizar 'explain' para analizar el rendimiento de una consulta
        const consultaExplain = await coleccionProductos.find({ categoria: 'Periféricos' }).explain('executionStats');
        console.log('Explicación de la consulta:', JSON.stringify(consultaExplain, null, 2));

    } catch (err) {
        console.error('Error al conectar o operar con MongoDB:', err);
    } finally {
        // Cerrar la conexión
        await client.close();
        console.log('Conexión a MongoDB cerrada');
    }
}

// Ejecutar la función principal
main().catch(console.error);
```

#### Conexión a MongoDB usando Mongoose

```javascript
const mongoose = require('mongoose');

// Reemplaza <username>, <password> y <dbname> con tus credenciales y nombre de la base de datos
const uri = 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority';

// Opciones de conexión
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Conexión a la base de datos
mongoose.connect(uri, options)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

// Opcional: Escuchar eventos de conexión
mongoose.connection.on('connected', () => {
  console.log('Mongoose conectado a la base de datos');
});

mongoose.connection.on('error', (err) => {
  console.log('Mongoose conexión error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose desconectado');
});

// Manejar cierre de conexión
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('Mongoose desconectado por la terminación de la aplicación');
  process.exit(0);
});
```

#### Definición del esquema de usuario con Mongoose

```javascript
const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  correo: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: props => `${props.value} no es un correo válido!`
    },
  },
  edad: {
    type: Number,
    min: 0,
    max: 120,
  },
  fechaRegistro: {
    type: Date,
    default: Date.now,
  },
});
```

#### Exportación del modelo de usuario

```javascript
const mongoose = require('mongoose');
const usuarioSchema = require('./usuarioSchema'); // Ruta al esquema definido anteriormente

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
```

#### Middleware para Hash de contraseña con bcrypt

```javascript
const bcrypt = require('bcrypt');

usuarioSchema.pre('save', async function(next) {
  const usuario = this;
  if (usuario.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(usuario.password, salt);
  }
  next();
});
```

#### Crear un usuario

```javascript
const Usuario = require('./models/Usuario'); // Ruta al modelo de usuario

async function crearUsuario() {
  try {
    const nuevoUsuario = new Usuario({
      nombre: 'Juan Pérez',
      correo: 'juan.perez@example.com',
      edad: 30,
    });

    const resultado = await nuevoUsuario.save();
    console.log('Usuario creado:', resultado);
  } catch (error) {
    console.error('Error al crear usuario:', error);
  }
}

crearUsuario();
```

#### Encontrar y obtener usuarios

```javascript
async function encontrarUsuarioPorCorreo(correo) {
  try {
    const usuario = await Usuario.findOne({ correo: correo });
    if (usuario) {
      console.log('Usuario encontrado:', usuario);
    } else {
      console.log('No se encontró un usuario con ese correo.');
    }
  } catch (error) {
    console.error('Error al encontrar usuario:', error);
  }
}

encontrarUsuarioPorCorreo('juan.perez@example.com');

async function obtenerTodosLosUsuarios() {
  try {
    const usuarios = await Usuario.find();
    console.log('Lista de usuarios:', usuarios);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
  }
}

obtenerTodosLosUsuarios();
```

#### Actualizar la edad de un usuario

```javascript
async function actualizarEdadUsuario(correo, nuevaEdad) {
  try {
    const usuarioActualizado = await Usuario.findOneAndUpdate(
      { correo: correo }, 
      { edad: nuevaEdad },
      { new: true, runValidators: true }
    );
    if (usuarioActualizado) {
      console.log('Usuario actualizado:', usuarioActualizado);
    } else {
      console.log('No se encontró un usuario con ese correo.');
    }
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
  }
}

actualizarEdadUsuario('juan.perez@example.com', 31);
```

#### Eliminar un usuario por correo

```javascript
async function eliminarUsuarioPorCorreo(correo) {
  try {
    const resultado = await Usuario.deleteOne({ correo: correo });
    if (resultado.deletedCount > 0) {
      console.log('Usuario eliminado exitosamente.');
    } else {
      console.log('No se encontró un usuario con ese correo.');
    }
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
  }
}

eliminarUsuarioPorCorreo('juan.perez@example.com');
```


#### Flujo completo de operaciones CRUD

```javascript
async function flujoCompletoUsuarios() {
  try {
    // Crear un nuevo usuario
    const nuevoUsuario = new Usuario({
      nombre: 'Ana Gómez',
      correo: 'ana.gomez@example.com',
      edad: 25,
    });
    const usuarioCreado = await nuevoUsuario.save();
    console.log('Usuario creado:', usuarioCreado);

    // Leer el usuario creado
    const usuarioLeido = await Usuario.findOne({ correo: 'ana.gomez@example.com' });
    console.log('Usuario leído:', usuarioLeido);

    // Actualizar la edad del usuario
    const usuarioActualizado = await Usuario.findOneAndUpdate(
      { correo: 'ana.gomez@example.com' },
      { edad: 26 },
      { new: true, runValidators: true }
    );
    console.log('Usuario actualizado:', usuarioActualizado);

    // Eliminar el usuario
    const resultadoEliminacion = await Usuario.deleteOne({ correo: 'ana.gomez@example.com' });
    if (resultadoEliminacion.deletedCount > 0) {
      console.log('Usuario eliminado exitosamente.');
    } else {
      console.log('No se encontró un usuario para eliminar.');
    }
  } catch (error) {
    console.error('Error en el flujo completo:', error);
  }
}

flujoCompletoUsuarios();
```


#### Configuración inicial del proyecto con Mongoose

```bash
mkdir mongoose_mongodb_ejemplo
cd mongoose_mongodb_ejemplo
npm init -y
npm install mongoose
```

```javascript
// Importar Mongoose
const mongoose = require('mongoose');

// URL de conexión a MongoDB (puede ser local o en la nube)
const mongoURL = 'mongodb://localhost:27017/miBaseDeDatos';

// Opciones de conexión
const opciones = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true, // Obsoleto en versiones recientes
    // useFindAndModify: false // Obsoleto en versiones recientes
};

// Conectar a MongoDB usando Mongoose
mongoose.connect(mongoURL, opciones)
    .then(() => console.log('Conectado correctamente a MongoDB con Mongoose'))
    .catch(err => console.error('Error al conectar a MongoDB:', err));

// Definir un esquema de usuario
const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true,
        minlength: [3, 'El nombre debe tener al menos 3 caracteres'],
        maxlength: [50, 'El nombre no puede exceder los 50 caracteres']
    },
    email: {
        type: String,
        required: [true, 'El correo electrónico es obligatorio'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'Por favor, ingresa un correo electrónico válido']
    },
    edad: {
        type: Number,
        min: [0, 'La edad no puede ser negativa'],
        max: [120, 'La edad no puede exceder los 120 años']
    },
    fechaRegistro: {
        type: Date,
        default: Date.now
    },
    direccion: {
        calle: { type: String, required: true },
        ciudad: { type: String, required: true },
        codigoPostal: { type: String, required: true }
    },
    hobbies: [String],
    activo: {
        type: Boolean,
        default: true
    }
}, {
    // Opciones de esquema
    timestamps: true, // Agrega createdAt y updatedAt
    versionKey: false // Elimina el campo __v
});

// Virtual: Calcular la edad en meses
usuarioSchema.virtual('edadEnMeses').get(function () {
    return this.edad * 12;
});

// Método de instancia: Saludar
usuarioSchema.methods.saludar = function () {
    return `Hola, mi nombre es ${this.nombre}`;
};

// Método estático: Buscar por ciudad
usuarioSchema.statics.buscarPorCiudad = function (ciudad) {
    return this.find({ 'direccion.ciudad': ciudad });
};

// Middleware: Antes de guardar, convertir el nombre a mayúsculas
usuarioSchema.pre('save', function (next) {
    this.nombre = this.nombre.toUpperCase();
    next();
});

// Middleware: Después de eliminar, loguear la eliminación
usuarioSchema.post('remove', function (doc) {
    console.log(`El usuario con ID ${doc._id} ha sido eliminado.`);
});

// Crear el modelo de Usuario
const Usuario = mongoose.model('Usuario', usuarioSchema);

// Definir un esquema de publicación (para demostración de población)
const publicacionSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    contenido: String,
    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    fechaPublicacion: {
        type: Date,
        default: Date.now
    }
});

// Crear el modelo de publicación
const Publicacion = mongoose.model('Publicacion', publicacionSchema);

// Función principal para ejecutar operaciones
async function main() {
    try {
        // Limpiar las colecciones existentes
        await Usuario.deleteMany({});
        await Publicacion.deleteMany({});

        // Crear nuevos usuarios
        const usuario1 = new Usuario({
            nombre: 'Juan Pérez',
            email: 'juan.perez@example.com',
            edad: 28,
            direccion: {
                calle: 'Calle Falsa 123',
                ciudad: 'Madrid',
                codigoPostal: '28001'
            },
            hobbies: ['fútbol', 'lectura']
        });

        const usuario2 = new Usuario({
            nombre: 'Ana Gómez',
            email: 'ana.gomez@example.com',
            edad: 34,
            direccion: {
                calle: 'Avenida Siempre Viva 456',
                ciudad: 'Barcelona',
                codigoPostal: '08002'
            },
            hobbies: ['cine', 'viajes']
        });

        // Guardar usuarios en la base de datos
        await usuario1.save();
        await usuario2.save();
        console.log('Usuarios creados y guardados.');

        // Crear publicaciones relacionadas con usuarios
        const publicacion1 = new Publicacion({
            titulo: 'Mi primer post',
            contenido: 'Este es el contenido de mi primer post.',
            autor: usuario1._id
        });

        const publicacion2 = new Publicacion({
            titulo: 'Aventuras en Barcelona',
            contenido: 'Compartiendo mis experiencias en Barcelona.',
            autor: usuario2._id
        });

        // Guardar publicaciones
        await publicacion1.save();
        await publicacion2.save();
        console.log('Publicaciones creadas y guardadas.');

        // Buscar un usuario y usar un método de instancia
        const encontrado = await Usuario.findOne({ email: 'juan.perez@example.com' });
        console.log(encontrado.saludar()); // Salida: Hola, mi nombre es JUAN PÉREZ

        // Usar un método estático para buscar usuarios por ciudad
        const usuariosMadrid = await Usuario.buscarPorCiudad('Madrid');
        console.log('Usuarios en Madrid:', usuariosMadrid);

        // Población: Obtener publicaciones con detalles del autor
        const publicacionesConAutores = await Publicacion.find().populate('autor', 'nombre email');
        console.log('Publicaciones con detalles del autor:', publicacionesConAutores);

        // Actualizar un usuario
        encontrado.edad = 29;
        await encontrado.save();
        console.log('Edad actualizada:', encontrado.edad);

        // Utilizar el virtual 'edadEnMeses'
        console.log(`Edad de ${encontrado.nombre} en meses:`, encontrado.edadEnMeses);

        // Eliminar un usuario y observar el middleware post 'remove'
        await encontrado.remove();

        // Crear índices
        await Usuario.createIndexes(); // Asegura que los índices definidos en el esquema se creen
        console.log('Índices creados.');

        // Realizar una consulta avanzada usando operadores
        const usuariosActivos = await Usuario.find({ activo: true, edad: { $gte: 30 } });
        console.log('Usuarios activos mayores o iguales a 30 años:', usuariosActivos);

    } catch (error) {
        console.error('Error en las operaciones:', error);
    } finally {
        // Cerrar la conexión a MongoDB
        mongoose.connection.close();
        console.log('Conexión a MongoDB cerrada.');
    }
}

// Ejecutar la función principal
main();
```

#### Definición y uso de esquemas y modelos con Mongoose

#### Esquema de usuario

```javascript
const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  correo: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: props => `${props.value} no es un correo válido!`
    },
  },
  edad: {
    type: Number,
    min: 0,
    max: 120,
  },
  fechaRegistro: {
    type: Date,
    default: Date.now,
  },
});

module.exports = usuarioSchema;
```

#### Modelo de usuario

```javascript
const mongoose = require('mongoose');
const usuarioSchema = require('./usuarioSchema'); // Ruta al esquema definido anteriormente

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
```

#### Middleware para Hash de contraseña

```javascript
const bcrypt = require('bcrypt');

usuarioSchema.pre('save', async function(next) {
  const usuario = this;
  if (usuario.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(usuario.password, salt);
  }
  next();
});
```

#### Operaciones CRUD con Mongoose

#### Crear un usuario

```javascript
const Usuario = require('./models/Usuario'); // Ruta al modelo de usuario

async function crearUsuario() {
  try {
    const nuevoUsuario = new Usuario({
      nombre: 'Juan Pérez',
      correo: 'juan.perez@example.com',
      edad: 30,
    });

    const resultado = await nuevoUsuario.save();
    console.log('Usuario creado:', resultado);
  } catch (error) {
    console.error('Error al crear usuario:', error);
  }
}

crearUsuario();
```

##### Encontrar un usuario por correo

```javascript
async function encontrarUsuarioPorCorreo(correo) {
  try {
    const usuario = await Usuario.findOne({ correo: correo });
    if (usuario) {
      console.log('Usuario encontrado:', usuario);
    } else {
      console.log('No se encontró un usuario con ese correo.');
    }
  } catch (error) {
    console.error('Error al encontrar usuario:', error);
  }
}

encontrarUsuarioPorCorreo('juan.perez@example.com');
```

#### Obtener todos los usuarios

```javascript
async function obtenerTodosLosUsuarios() {
  try {
    const usuarios = await Usuario.find();
    console.log('Lista de usuarios:', usuarios);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
  }
}

obtenerTodosLosUsuarios();
```

#### Actualizar la edad de un usuario

```javascript
async function actualizarEdadUsuario(correo, nuevaEdad) {
  try {
    const usuarioActualizado = await Usuario.findOneAndUpdate(
      { correo: correo }, 
      { edad: nuevaEdad },
      { new: true, runValidators: true }
    );
    if (usuarioActualizado) {
      console.log('Usuario actualizado:', usuarioActualizado);
    } else {
      console.log('No se encontró un usuario con ese correo.');
    }
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
  }
}

actualizarEdadUsuario('juan.perez@example.com', 31);
```

#### Eliminar un usuario por correo

```javascript
async function eliminarUsuarioPorCorreo(correo) {
  try {
    const resultado = await Usuario.deleteOne({ correo: correo });
    if (resultado.deletedCount > 0) {
      console.log('Usuario eliminado exitosamente.');
    } else {
      console.log('No se encontró un usuario con ese correo.');
    }
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
  }
}

eliminarUsuarioPorCorreo('juan.perez@example.com');
```

#### Flujo completo de operaciones CRUD

```javascript
async function flujoCompletoUsuarios() {
  try {
    // Crear un nuevo usuario
    const nuevoUsuario = new Usuario({
      nombre: 'Ana Gómez',
      correo: 'ana.gomez@example.com',
      edad: 25,
    });
    const usuarioCreado = await nuevoUsuario.save();
    console.log('Usuario creado:', usuarioCreado);

    // Leer el usuario creado
    const usuarioLeido = await Usuario.findOne({ correo: 'ana.gomez@example.com' });
    console.log('Usuario leído:', usuarioLeido);

    // Actualizar la edad del usuario
    const usuarioActualizado = await Usuario.findOneAndUpdate(
      { correo: 'ana.gomez@example.com' },
      { edad: 26 },
      { new: true, runValidators: true }
    );
    console.log('Usuario actualizado:', usuarioActualizado);

    // Eliminar el usuario
    const resultadoEliminacion = await Usuario.deleteOne({ correo: 'ana.gomez@example.com' });
    if (resultadoEliminacion.deletedCount > 0) {
      console.log('Usuario eliminado exitosamente.');
    } else {
      console.log('No se encontró un usuario para eliminar.');
    }
  } catch (error) {
    console.error('Error en el flujo completo:', error);
  }
}

flujoCompletoUsuarios();
```

#### Ejemplo completo de flujo de trabajo con Mongoose

```javascript
// flujoCompletoMongoose.js

const mongoose = require('mongoose');
const Usuario = require('./models/Usuario'); // Asegúrate de la ruta correcta
const Publicacion = require('./models/Publicacion'); // Define este modelo similar al de Usuario

async function main() {
  try {
    // Conectar a MongoDB usando Mongoose
    const mongoURL = 'mongodb://localhost:27017/miBaseDeDatos';
    const opciones = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    await mongoose.connect(mongoURL, opciones);
    console.log('Conectado correctamente a MongoDB con Mongoose');

    // Limpiar las colecciones existentes
    await Usuario.deleteMany({});
    await Publicacion.deleteMany({});

    // Crear nuevos usuarios
    const usuario1 = new Usuario({
      nombre: 'Juan Pérez',
      correo: 'juan.perez@example.com',
      edad: 28,
      direccion: {
        calle: 'Calle Falsa 123',
        ciudad: 'Madrid',
        codigoPostal: '28001'
      },
      hobbies: ['fútbol', 'lectura']
    });

    const usuario2 = new Usuario({
      nombre: 'Ana Gómez',
      correo: 'ana.gomez@example.com',
      edad: 34,
      direccion: {
        calle: 'Avenida Siempre Viva 456',
        ciudad: 'Barcelona',
        codigoPostal: '08002'
      },
      hobbies: ['cine', 'viajes']
    });

    // Guardar usuarios en la base de datos
    await usuario1.save();
    await usuario2.save();
    console.log('Usuarios creados y guardados.');

    // Crear publicaciones relacionadas con usuarios
    const publicacion1 = new Publicacion({
      titulo: 'Mi primer post',
      contenido: 'Este es el contenido de mi primer post.',
      autor: usuario1._id
    });

    const publicacion2 = new Publicacion({
      titulo: 'Aventuras en Barcelona',
      contenido: 'Compartiendo mis experiencias en Barcelona.',
      autor: usuario2._id
    });

    // Guardar publicaciones
    await publicacion1.save();
    await publicacion2.save();
    console.log('Publicaciones creadas y guardadas.');

    // Buscar un usuario y usar un método de instancia
    const encontrado = await Usuario.findOne({ correo: 'juan.perez@example.com' });
    console.log(encontrado.saludar()); // Salida: Hola, mi nombre es JUAN PÉREZ

    // Usar un método estático para buscar usuarios por ciudad
    const usuariosMadrid = await Usuario.buscarPorCiudad('Madrid');
    console.log('Usuarios en Madrid:', usuariosMadrid);

    // Población: Obtener publicaciones con detalles del autor
    const publicacionesConAutores = await Publicacion.find().populate('autor', 'nombre email');
    console.log('Publicaciones con detalles del autor:', publicacionesConAutores);

    // Actualizar un usuario
    encontrado.edad = 29;
    await encontrado.save();
    console.log('Edad actualizada:', encontrado.edad);

    // Utilizar el virtual 'edadEnMeses'
    console.log(`Edad de ${encontrado.nombre} en meses:`, encontrado.edadEnMeses);

    // Eliminar un usuario y observar el middleware post 'remove'
    await encontrado.remove();

    // Crear índices
    await Usuario.createIndexes(); // Asegura que los índices definidos en el esquema se creen
    console.log('Índices creados.');

    // Realizar una consulta avanzada usando operadores
    const usuariosActivos = await Usuario.find({ activo: true, edad: { $gte: 30 } });
    console.log('Usuarios activos mayores o iguales a 30 años:', usuariosActivos);

  } catch (error) {
    console.error('Error en las operaciones:', error);
  } finally {
    // Cerrar la conexión a MongoDB
    mongoose.connection.close();
    console.log('Conexión a MongoDB cerrada.');
  }
}

// Ejecutar la función principal
main();
```

#### Definición del modelo de publicación

```javascript
// models/Publicacion.js

const mongoose = require('mongoose');

const publicacionSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  contenido: String,
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  fechaPublicacion: {
    type: Date,
    default: Date.now
  }
});

const Publicacion = mongoose.model('Publicacion', publicacionSchema);

module.exports = Publicacion;
```


#### Configuración y uso de Mongoose en una aplicación Node.js

```bash
mkdir mongoose_mongodb_ejemplo
cd mongoose_mongodb_ejemplo
npm init -y
npm install mongoose
```

```javascript
// Importar Mongoose
const mongoose = require('mongoose');

// URL de conexión a MongoDB (puede ser local o en la nube)
const mongoURL = 'mongodb://localhost:27017/miBaseDeDatos';

// Opciones de conexión
const opciones = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true, // Obsoleto en versiones recientes
    // useFindAndModify: false // Obsoleto en versiones recientes
};

// Conectar a MongoDB usando Mongoose
mongoose.connect(mongoURL, opciones)
    .then(() => console.log('Conectado correctamente a MongoDB con Mongoose'))
    .catch(err => console.error('Error al conectar a MongoDB:', err));

// Definir un esquema de usuario
const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true,
        minlength: [3, 'El nombre debe tener al menos 3 caracteres'],
        maxlength: [50, 'El nombre no puede exceder los 50 caracteres']
    },
    email: {
        type: String,
        required: [true, 'El correo electrónico es obligatorio'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'Por favor, ingresa un correo electrónico válido']
    },
    edad: {
        type: Number,
        min: [0, 'La edad no puede ser negativa'],
        max: [120, 'La edad no puede exceder los 120 años']
    },
    fechaRegistro: {
        type: Date,
        default: Date.now
    },
    direccion: {
        calle: { type: String, required: true },
        ciudad: { type: String, required: true },
        codigoPostal: { type: String, required: true }
    },
    hobbies: [String],
    activo: {
        type: Boolean,
        default: true
    }
}, {
    // Opciones de esquema
    timestamps: true, // Agrega createdAt y updatedAt
    versionKey: false // Elimina el campo __v
});

// Virtual: Calcular la edad en meses
usuarioSchema.virtual('edadEnMeses').get(function () {
    return this.edad * 12;
});

// Método de instancia: Saludar
usuarioSchema.methods.saludar = function () {
    return `Hola, mi nombre es ${this.nombre}`;
};

// Método estático: Buscar por ciudad
usuarioSchema.statics.buscarPorCiudad = function (ciudad) {
    return this.find({ 'direccion.ciudad': ciudad });
};

// Middleware: Antes de guardar, convertir el nombre a mayúsculas
usuarioSchema.pre('save', function (next) {
    this.nombre = this.nombre.toUpperCase();
    next();
});

// Middleware: Después de eliminar, loguear la eliminación
usuarioSchema.post('remove', function (doc) {
    console.log(`El usuario con ID ${doc._id} ha sido eliminado.`);
});

// Crear el modelo de Usuario
const Usuario = mongoose.model('Usuario', usuarioSchema);

// Definir un esquema de publicación (para demostración de población)
const publicacionSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    contenido: String,
    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    fechaPublicacion: {
        type: Date,
        default: Date.now
    }
});

// Crear el modelo de Publicación
const Publicacion = mongoose.model('Publicacion', publicacionSchema);

// Función principal para ejecutar operaciones
async function main() {
    try {
        // Limpiar las colecciones existentes
        await Usuario.deleteMany({});
        await Publicacion.deleteMany({});

        // Crear nuevos usuarios
        const usuario1 = new Usuario({
            nombre: 'Juan Pérez',
            email: 'juan.perez@example.com',
            edad: 28,
            direccion: {
                calle: 'Calle Falsa 123',
                ciudad: 'Madrid',
                codigoPostal: '28001'
            },
            hobbies: ['fútbol', 'lectura']
        });

        const usuario2 = new Usuario({
            nombre: 'Ana Gómez',
            email: 'ana.gomez@example.com',
            edad: 34,
            direccion: {
                calle: 'Avenida Siempre Viva 456',
                ciudad: 'Barcelona',
                codigoPostal: '08002'
            },
            hobbies: ['cine', 'viajes']
        });

        // Guardar usuarios en la base de datos
        await usuario1.save();
        await usuario2.save();
        console.log('Usuarios creados y guardados.');

        // Crear publicaciones relacionadas con usuarios
        const publicacion1 = new Publicacion({
            titulo: 'Mi primer post',
            contenido: 'Este es el contenido de mi primer post.',
            autor: usuario1._id
        });

        const publicacion2 = new Publicacion({
            titulo: 'Aventuras en Barcelona',
            contenido: 'Compartiendo mis experiencias en Barcelona.',
            autor: usuario2._id
        });

        // Guardar publicaciones
        await publicacion1.save();
        await publicacion2.save();
        console.log('Publicaciones creadas y guardadas.');

        // Buscar un usuario y usar un método de instancia
        const encontrado = await Usuario.findOne({ correo: 'juan.perez@example.com' });
        console.log(encontrado.saludar()); // Salida: Hola, mi nombre es JUAN PÉREZ

        // Usar un método estático para buscar usuarios por ciudad
        const usuariosMadrid = await Usuario.buscarPorCiudad('Madrid');
        console.log('Usuarios en Madrid:', usuariosMadrid);

        // Población: Obtener publicaciones con detalles del autor
        const publicacionesConAutores = await Publicacion.find().populate('autor', 'nombre email');
        console.log('Publicaciones con detalles del autor:', publicacionesConAutores);

        // Actualizar un usuario
        encontrado.edad = 29;
        await encontrado.save();
        console.log('Edad actualizada:', encontrado.edad);

        // Utilizar el virtual 'edadEnMeses'
        console.log(`Edad de ${encontrado.nombre} en meses:`, encontrado.edadEnMeses);

        // Eliminar un usuario y observar el middleware post 'remove'
        await encontrado.remove();

        // Crear índices
        await Usuario.createIndexes(); // Asegura que los índices definidos en el esquema se creen
        console.log('Índices creados.');

        // Realizar una consulta avanzada usando operadores
        const usuariosActivos = await Usuario.find({ activo: true, edad: { $gte: 30 } });
        console.log('Usuarios activos mayores o iguales a 30 años:', usuariosActivos);

    } catch (error) {
        console.error('Error en las operaciones:', error);
    } finally {
        // Cerrar la conexión a MongoDB
        mongoose.connection.close();
        console.log('Conexión a MongoDB cerrada.');
    }
}

// Ejecutar la función principal
main();
```


#### Definición y uso de modelos y esquemas avanzados con Mongoose

#### Definición del esquema de usuario avanzado

```javascript
const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  correo: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: props => `${props.value} no es un correo válido!`
    },
  },
  edad: {
    type: Number,
    min: 0,
    max: 120,
  },
  fechaRegistro: {
    type: Date,
    default: Date.now,
  },
});

module.exports = usuarioSchema;
```

#### Modelo de usuario

```javascript
const mongoose = require('mongoose');
const usuarioSchema = require('./usuarioSchema'); // Ruta al esquema definido anteriormente

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
```

#### Middleware para Hash de contraseña

```javascript
const bcrypt = require('bcrypt');

usuarioSchema.pre('save', async function(next) {
  const usuario = this;
  if (usuario.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(usuario.password, salt);
  }
  next();
});
```

#### Operaciones CRUD con Mongoose

#### Crear un usuario

```javascript
const Usuario = require('./models/Usuario'); // Ruta al modelo de usuario

async function crearUsuario() {
  try {
    const nuevoUsuario = new Usuario({
      nombre: 'Juan Pérez',
      correo: 'juan.perez@example.com',
      edad: 30,
    });

    const resultado = await nuevoUsuario.save();
    console.log('Usuario creado:', resultado);
  } catch (error) {
    console.error('Error al crear usuario:', error);
  }
}

crearUsuario();
```

#### Encontrar un usuario por correo

```javascript
async function encontrarUsuarioPorCorreo(correo) {
  try {
    const usuario = await Usuario.findOne({ correo: correo });
    if (usuario) {
      console.log('Usuario encontrado:', usuario);
    } else {
      console.log('No se encontró un usuario con ese correo.');
    }
  } catch (error) {
    console.error('Error al encontrar usuario:', error);
  }
}

encontrarUsuarioPorCorreo('juan.perez@example.com');
```

#### Obtener todos los usuarios

```javascript
async function obtenerTodosLosUsuarios() {
  try {
    const usuarios = await Usuario.find();
    console.log('Lista de usuarios:', usuarios);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
  }
}

obtenerTodosLosUsuarios();
```

#### Actualizar la edad de un usuario

```javascript
async function actualizarEdadUsuario(correo, nuevaEdad) {
  try {
    const usuarioActualizado = await Usuario.findOneAndUpdate(
      { correo: correo }, 
      { edad: nuevaEdad },
      { new: true, runValidators: true }
    );
    if (usuarioActualizado) {
      console.log('Usuario actualizado:', usuarioActualizado);
    } else {
      console.log('No se encontró un usuario con ese correo.');
    }
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
  }
}

actualizarEdadUsuario('juan.perez@example.com', 31);
```

#### Eliminar un usuario por correo

```javascript
async function eliminarUsuarioPorCorreo(correo) {
  try {
    const resultado = await Usuario.deleteOne({ correo: correo });
    if (resultado.deletedCount > 0) {
      console.log('Usuario eliminado exitosamente.');
    } else {
      console.log('No se encontró un usuario con ese correo.');
    }
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
  }
}

eliminarUsuarioPorCorreo('juan.perez@example.com');
```

#### Flujo completo de operaciones CRUD

```javascript
async function flujoCompletoUsuarios() {
  try {
    // Crear un nuevo usuario
    const nuevoUsuario = new Usuario({
      nombre: 'Ana Gómez',
      correo: 'ana.gomez@example.com',
      edad: 25,
    });
    const usuarioCreado = await nuevoUsuario.save();
    console.log('Usuario creado:', usuarioCreado);

    // Leer el usuario creado
    const usuarioLeido = await Usuario.findOne({ correo: 'ana.gomez@example.com' });
    console.log('Usuario leído:', usuarioLeido);

    // Actualizar la edad del usuario
    const usuarioActualizado = await Usuario.findOneAndUpdate(
      { correo: 'ana.gomez@example.com' },
      { edad: 26 },
      { new: true, runValidators: true }
    );
    console.log('Usuario actualizado:', usuarioActualizado);

    // Eliminar el usuario
    const resultadoEliminacion = await Usuario.deleteOne({ correo: 'ana.gomez@example.com' });
    if (resultadoEliminacion.deletedCount > 0) {
      console.log('Usuario eliminado exitosamente.');
    } else {
      console.log('No se encontró un usuario para eliminar.');
    }
  } catch (error) {
    console.error('Error en el flujo completo:', error);
  }
}

flujoCompletoUsuarios();
```

#### Configuración de Mongoose y definición de esquemas

```bash
mkdir mongoose_mongodb_ejemplo
cd mongoose_mongodb_ejemplo
npm init -y
npm install mongoose
```

```javascript
// Importar Mongoose
const mongoose = require('mongoose');

// URL de conexión a MongoDB (puede ser local o en la nube)
const mongoURL = 'mongodb://localhost:27017/miBaseDeDatos';

// Opciones de conexión
const opciones = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true, // Obsoleto en versiones recientes
    // useFindAndModify: false // Obsoleto en versiones recientes
};

// Conectar a MongoDB usando Mongoose
mongoose.connect(mongoURL, opciones)
    .then(() => console.log('Conectado correctamente a MongoDB con Mongoose'))
    .catch(err => console.error('Error al conectar a MongoDB:', err));

// Definir un esquema de usuario
const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true,
        minlength: [3, 'El nombre debe tener al menos 3 caracteres'],
        maxlength: [50, 'El nombre no puede exceder los 50 caracteres']
    },
    email: {
        type: String,
        required: [true, 'El correo electrónico es obligatorio'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'Por favor, ingresa un correo electrónico válido']
    },
    edad: {
        type: Number,
        min: [0, 'La edad no puede ser negativa'],
        max: [120, 'La edad no puede exceder los 120 años']
    },
    fechaRegistro: {
        type: Date,
        default: Date.now
    },
    direccion: {
        calle: { type: String, required: true },
        ciudad: { type: String, required: true },
        codigoPostal: { type: String, required: true }
    },
    hobbies: [String],
    activo: {
        type: Boolean,
        default: true
    }
}, {
    // Opciones de esquema
    timestamps: true, // Agrega createdAt y updatedAt
    versionKey: false // Elimina el campo __v
});

// Virtual: Calcular la edad en meses
usuarioSchema.virtual('edadEnMeses').get(function () {
    return this.edad * 12;
});

// Método de instancia: Saludar
usuarioSchema.methods.saludar = function () {
    return `Hola, mi nombre es ${this.nombre}`;
};

// Método estático: Buscar por ciudad
usuarioSchema.statics.buscarPorCiudad = function (ciudad) {
    return this.find({ 'direccion.ciudad': ciudad });
};

// Middleware: Antes de guardar, convertir el nombre a mayúsculas
usuarioSchema.pre('save', function (next) {
    this.nombre = this.nombre.toUpperCase();
    next();
});

// Middleware: Después de eliminar, loguear la eliminación
usuarioSchema.post('remove', function (doc) {
    console.log(`El usuario con ID ${doc._id} ha sido eliminado.`);
});

// Crear el modelo de Usuario
const Usuario = mongoose.model('Usuario', usuarioSchema);

// Definir un esquema de publicación (para demostración de población)
const publicacionSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    contenido: String,
    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    fechaPublicacion: {
        type: Date,
        default: Date.now
    }
});

// Crear el modelo de Publicación
const Publicacion = mongoose.model('Publicacion', publicacionSchema);

// Función principal para ejecutar operaciones
async function main() {
    try {
        // Limpiar las colecciones existentes
        await Usuario.deleteMany({});
        await Publicacion.deleteMany({});

        // Crear nuevos usuarios
        const usuario1 = new Usuario({
            nombre: 'Juan Pérez',
            correo: 'juan.perez@example.com',
            edad: 28,
            direccion: {
                calle: 'Calle Falsa 123',
                ciudad: 'Madrid',
                codigoPostal: '28001'
            },
            hobbies: ['fútbol', 'lectura']
        });

        const usuario2 = new Usuario({
            nombre: 'Ana Gómez',
            correo: 'ana.gomez@example.com',
            edad: 34,
            direccion: {
                calle: 'Avenida Siempre Viva 456',
                ciudad: 'Barcelona',
                codigoPostal: '08002'
            },
            hobbies: ['cine', 'viajes']
        });

        // Guardar usuarios en la base de datos
        await usuario1.save();
        await usuario2.save();
        console.log('Usuarios creados y guardados.');

        // Crear publicaciones relacionadas con usuarios
        const publicacion1 = new Publicacion({
            titulo: 'Mi primer post',
            contenido: 'Este es el contenido de mi primer post.',
            autor: usuario1._id
        });

        const publicacion2 = new Publicacion({
            titulo: 'Aventuras en Barcelona',
            contenido: 'Compartiendo mis experiencias en Barcelona.',
            autor: usuario2._id
        });

        // Guardar publicaciones
        await publicacion1.save();
        await publicacion2.save();
        console.log('Publicaciones creadas y guardadas.');

        // Buscar un usuario y usar un método de instancia
        const encontrado = await Usuario.findOne({ correo: 'juan.perez@example.com' });
        console.log(encontrado.saludar()); // Salida: Hola, mi nombre es JUAN PÉREZ

        // Usar un método estático para buscar usuarios por ciudad
        const usuariosMadrid = await Usuario.buscarPorCiudad('Madrid');
        console.log('Usuarios en Madrid:', usuariosMadrid);

        // Población: Obtener publicaciones con detalles del autor
        const publicacionesConAutores = await Publicacion.find().populate('autor', 'nombre email');
        console.log('Publicaciones con detalles del autor:', publicacionesConAutores);

        // Actualizar un usuario
        encontrado.edad = 29;
        await encontrado.save();
        console.log('Edad actualizada:', encontrado.edad);

        // Utilizar el virtual 'edadEnMeses'
        console.log(`Edad de ${encontrado.nombre} en meses:`, encontrado.edadEnMeses);

        // Eliminar un usuario y observar el middleware post 'remove'
        await encontrado.remove();

        // Crear índices
        await Usuario.createIndexes(); // Asegura que los índices definidos en el esquema se creen
        console.log('Índices creados.');

        // Realizar una consulta avanzada usando operadores
        const usuariosActivos = await Usuario.find({ activo: true, edad: { $gte: 30 } });
        console.log('Usuarios activos mayores o iguales a 30 años:', usuariosActivos);

    } catch (error) {
        console.error('Error en las operaciones:', error);
    } finally {
        // Cerrar la conexión a MongoDB
        mongoose.connection.close();
        console.log('Conexión a MongoDB cerrada.');
    }
}

// Ejecutar la función principal
main();
```

#### Definición y uso de modelos y esquemas adicionales

#### Modelo de publicación

```javascript
// models/Publicacion.js

const mongoose = require('mongoose');

const publicacionSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    contenido: String,
    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    fechaPublicacion: {
        type: Date,
        default: Date.now
    }
});

const Publicacion = mongoose.model('Publicacion', publicacionSchema);

module.exports = Publicacion;
```

#### Crear y utilizar el modelo de usuario con Mongoose

#### Crear un usuario

```javascript
const Usuario = require('./models/Usuario'); // Ruta al modelo de usuario

async function crearUsuario() {
  try {
    const nuevoUsuario = new Usuario({
      nombre: 'Juan Pérez',
      correo: 'juan.perez@example.com',
      edad: 30,
    });

    const resultado = await nuevoUsuario.save();
    console.log('Usuario creado:', resultado);
  } catch (error) {
    console.error('Error al crear usuario:', error);
  }
}

crearUsuario();
```

#### Leer usuarios

```javascript
async function encontrarUsuarioPorCorreo(correo) {
  try {
    const usuario = await Usuario.findOne({ correo: correo });
    if (usuario) {
      console.log('Usuario encontrado:', usuario);
    } else {
      console.log('No se encontró un usuario con ese correo.');
    }
  } catch (error) {
    console.error('Error al encontrar usuario:', error);
  }
}

encontrarUsuarioPorCorreo('juan.perez@example.com');

async function obtenerTodosLosUsuarios() {
  try {
    const usuarios = await Usuario.find();
    console.log('Lista de usuarios:', usuarios);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
  }
}

obtenerTodosLosUsuarios();
```

#### Actualizar un usuario

```javascript
async function actualizarEdadUsuario(correo, nuevaEdad) {
  try {
    const usuarioActualizado = await Usuario.findOneAndUpdate(
      { correo: correo }, 
      { edad: nuevaEdad },
      { new: true, runValidators: true }
    );
    if (usuarioActualizado) {
      console.log('Usuario actualizado:', usuarioActualizado);
    } else {
      console.log('No se encontró un usuario con ese correo.');
    }
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
  }
}

actualizarEdadUsuario('juan.perez@example.com', 31);
```

#### Eliminar un usuario

```javascript
async function eliminarUsuarioPorCorreo(correo) {
  try {
    const resultado = await Usuario.deleteOne({ correo: correo });
    if (resultado.deletedCount > 0) {
      console.log('Usuario eliminado exitosamente.');
    } else {
      console.log('No se encontró un usuario con ese correo.');
    }
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
  }
}

eliminarUsuarioPorCorreo('juan.perez@example.com');
```

#### Flujo completo de operaciones CRUD

```javascript
async function flujoCompletoUsuarios() {
  try {
    // Crear un nuevo usuario
    const nuevoUsuario = new Usuario({
      nombre: 'Ana Gómez',
      correo: 'ana.gomez@example.com',
      edad: 25,
    });
    const usuarioCreado = await nuevoUsuario.save();
    console.log('Usuario creado:', usuarioCreado);

    // Leer el usuario creado
    const usuarioLeido = await Usuario.findOne({ correo: 'ana.gomez@example.com' });
    console.log('Usuario leído:', usuarioLeido);

    // Actualizar la edad del usuario
    const usuarioActualizado = await Usuario.findOneAndUpdate(
      { correo: 'ana.gomez@example.com' },
      { edad: 26 },
      { new: true, runValidators: true }
    );
    console.log('Usuario actualizado:', usuarioActualizado);

    // Eliminar el usuario
    const resultadoEliminacion = await Usuario.deleteOne({ correo: 'ana.gomez@example.com' });
    if (resultadoEliminacion.deletedCount > 0) {
      console.log('Usuario eliminado exitosamente.');
    } else {
      console.log('No se encontró un usuario para eliminar.');
    }
  } catch (error) {
    console.error('Error en el flujo completo:', error);
  }
}

flujoCompletoUsuarios();
```

#### Configuración inicial del proyecto Mongoose con MongoDB

```bash
mkdir mongoose_mongodb_ejemplo
cd mongoose_mongodb_ejemplo
npm init -y
npm install mongoose
```

#### Código de configuración

```javascript
// Importar Mongoose
const mongoose = require('mongoose');

// URL de conexión a MongoDB (puede ser local o en la nube)
const mongoURL = 'mongodb://localhost:27017/miBaseDeDatos';

// Opciones de conexión
const opciones = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true, // Obsoleto en versiones recientes
    // useFindAndModify: false // Obsoleto en versiones recientes
};

// Conectar a MongoDB usando Mongoose
mongoose.connect(mongoURL, opciones)
    .then(() => console.log('Conectado correctamente a MongoDB con Mongoose'))
    .catch(err => console.error('Error al conectar a MongoDB:', err));

// Definir un esquema de usuario
const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true,
        minlength: [3, 'El nombre debe tener al menos 3 caracteres'],
        maxlength: [50, 'El nombre no puede exceder los 50 caracteres']
    },
    email: {
        type: String,
        required: [true, 'El correo electrónico es obligatorio'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'Por favor, ingresa un correo electrónico válido']
    },
    edad: {
        type: Number,
        min: [0, 'La edad no puede ser negativa'],
        max: [120, 'La edad no puede exceder los 120 años']
    },
    fechaRegistro: {
        type: Date,
        default: Date.now
    },
    direccion: {
        calle: { type: String, required: true },
        ciudad: { type: String, required: true },
        codigoPostal: { type: String, required: true }
    },
    hobbies: [String],
    activo: {
        type: Boolean,
        default: true
    }
}, {
    // Opciones de esquema
    timestamps: true, // Agrega createdAt y updatedAt
    versionKey: false // Elimina el campo __v
});

// Virtual: Calcular la edad en meses
usuarioSchema.virtual('edadEnMeses').get(function () {
    return this.edad * 12;
});

// Método de instancia: Saludar
usuarioSchema.methods.saludar = function () {
    return `Hola, mi nombre es ${this.nombre}`;
};

// Método estático: Buscar por ciudad
usuarioSchema.statics.buscarPorCiudad = function (ciudad) {
    return this.find({ 'direccion.ciudad': ciudad });
};

// Middleware: Antes de guardar, convertir el nombre a mayúsculas
usuarioSchema.pre('save', function (next) {
    this.nombre = this.nombre.toUpperCase();
    next();
});

// Middleware: Después de eliminar, loguear la eliminación
usuarioSchema.post('remove', function (doc) {
    console.log(`El usuario con ID ${doc._id} ha sido eliminado.`);
});

// Crear el modelo de Usuario
const Usuario = mongoose.model('Usuario', usuarioSchema);

// Definir un esquema de publicación (para demostración de población)
const publicacionSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    contenido: String,
    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    fechaPublicacion: {
        type: Date,
        default: Date.now
    }
});

// Crear el modelo de Publicación
const Publicacion = mongoose.model('Publicacion', publicacionSchema);

// Función principal para ejecutar operaciones
async function main() {
    try {
        // Limpiar las colecciones existentes
        await Usuario.deleteMany({});
        await Publicacion.deleteMany({});

        // Crear nuevos usuarios
        const usuario1 = new Usuario({
            nombre: 'Juan Pérez',
            email: 'juan.perez@example.com',
            edad: 28,
            direccion: {
                calle: 'Calle Falsa 123',
                ciudad: 'Madrid',
                codigoPostal: '28001'
            },
            hobbies: ['fútbol', 'lectura']
        });

        const usuario2 = new Usuario({
            nombre: 'Ana Gómez',
            email: 'ana.gomez@example.com',
            edad: 34,
            direccion: {
                calle: 'Avenida Siempre Viva 456',
                ciudad: 'Barcelona',
                codigoPostal: '08002'
            },
            hobbies: ['cine', 'viajes']
        });

        // Guardar usuarios en la base de datos
        await usuario1.save();
        await usuario2.save();
        console.log('Usuarios creados y guardados.');

        // Crear publicaciones relacionadas con usuarios
        const publicacion1 = new Publicacion({
            titulo: 'Mi primer post',
            contenido: 'Este es el contenido de mi primer post.',
            autor: usuario1._id
        });

        const publicacion2 = new Publicacion({
            titulo: 'Aventuras en Barcelona',
            contenido: 'Compartiendo mis experiencias en Barcelona.',
            autor: usuario2._id
        });

        // Guardar publicaciones
        await publicacion1.save();
        await publicacion2.save();
        console.log('Publicaciones creadas y guardadas.');

        // Buscar un usuario y usar un método de instancia
        const encontrado = await Usuario.findOne({ correo: 'juan.perez@example.com' });
        console.log(encontrado.saludar()); // Salida: Hola, mi nombre es JUAN PÉREZ

        // Usar un método estático para buscar usuarios por ciudad
        const usuariosMadrid = await Usuario.buscarPorCiudad('Madrid');
        console.log('Usuarios en Madrid:', usuariosMadrid);

        // Población: Obtener publicaciones con detalles del autor
        const publicacionesConAutores = await Publicacion.find().populate('autor', 'nombre email');
        console.log('Publicaciones con detalles del autor:', publicacionesConAutores);

        // Actualizar un usuario
        encontrado.edad = 29;
        await encontrado.save();
        console.log('Edad actualizada:', encontrado.edad);

        // Utilizar el virtual 'edadEnMeses'
        console.log(`Edad de ${encontrado.nombre} en meses:`, encontrado.edadEnMeses);

        // Eliminar un usuario y observar el middleware post 'remove'
        await encontrado.remove();

        // Crear índices
        await Usuario.createIndexes(); // Asegura que los índices definidos en el esquema se creen
        console.log('Índices creados.');

        // Realizar una consulta avanzada usando operadores
        const usuariosActivos = await Usuario.find({ activo: true, edad: { $gte: 30 } });
        console.log('Usuarios activos mayores o iguales a 30 años:', usuariosActivos);

    } catch (error) {
        console.error('Error en las operaciones:', error);
    } finally {
        // Cerrar la conexión a MongoDB
        mongoose.connection.close();
        console.log('Conexión a MongoDB cerrada.');
    }
}

// Ejecutar la función principal
main();
```
