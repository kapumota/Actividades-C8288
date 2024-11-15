### Fakes, Stubs, inyección de dependencias y Mocks orientado al Full-Stack con JEST y K6

#### Introducción

En el desarrollo full-stack moderno, las pruebas son una parte esencial para garantizar la calidad y fiabilidad del software. Herramientas como JEST y K6 han surgido como soluciones poderosas para llevar a cabo pruebas unitarias, de integración y de rendimiento. 
Esta lectura se enfoca en los conceptos de Fakes, Stubs, inyección de dependencias y Mocks, y cómo se aplican en el contexto del desarrollo full-stack utilizando JEST y K6.

### Importancia de las pruebas en el desarrollo Full-Stack

El desarrollo full-stack implica trabajar tanto en el front-end como en el back-end de una aplicación. Esto significa que los desarrolladores deben garantizar que todas las partes del sistema funcionen correctamente, tanto individualmente como en conjunto. Las pruebas permiten detectar y corregir errores antes de que lleguen a producción, reducir el tiempo de desarrollo a largo plazo y mejorar la mantenibilidad del código.

#### Conceptos clave

#### Fakes

Un **Fake** es una implementación funcional pero simplificada de un componente que se utiliza en lugar del componente real para propósitos de prueba. A diferencia de los Stubs y Mocks, los Fakes tienen una lógica de funcionamiento que puede ser utilizada para pruebas más complejas.

#### Características de los Fakes

- Implementación funcional simplificada.
- Utilizados para pruebas que requieren más lógica que la proporcionada por Stubs.
- Pueden almacenar datos en memoria para simular una base de datos.

#### Stubs

Un **Stub** es un objeto que reemplaza a otro objeto y proporciona respuestas predefinidas a las llamadas durante la prueba. Los Stubs se utilizan para aislar el código bajo prueba de sus dependencias.

#### Características de los Stubs

- Proporcionan respuestas predefinidas.
- No contienen lógica de funcionamiento.
- Utilizados para pruebas unitarias simples.

#### Mocks

Un **Mock** es un objeto que simula el comportamiento de objetos reales de forma controlada. A diferencia de los Stubs, los Mocks pueden verificar si se han realizado ciertas interacciones, como si se llamó a un método específico.

#### Características de los Mocks

- Simulan el comportamiento y permiten verificar interacciones.
- Pueden configurar expectativas sobre llamadas a métodos.
- Útiles para pruebas donde la interacción es importante.

#### Inyección de dependencias

La **Inyección de dependencias** es un patrón de diseño que permite que un objeto reciba sus dependencias de fuentes externas en lugar de crearlas internamente. Esto facilita las pruebas y promueve un código más modular y flexible.

#### Ventajas de la inyección de dependencias

- Facilita las pruebas unitarias.
- Promueve el acoplamiento débil entre componentes.
- Mejora la mantenibilidad y extensibilidad del código.

###  Aplicación en desarrollo Full-Stack

En el desarrollo full-stack, estos conceptos se aplican tanto en el front-end como en el back-end. Por ejemplo, en una aplicación Node.js, podemos utilizar JEST para realizar pruebas unitarias y de integración, mientras que K6 puede ser utilizado para pruebas de rendimiento.

#### Uso de JEST

JEST es un framework de pruebas en JavaScript que permite realizar pruebas unitarias, de integración y de snapshot. Soporta características como mocking, watch mode y generación de informes de cobertura.

#### Uso de K6

K6 es una herramienta de pruebas de carga y rendimiento de código abierto. Está diseñada para ser utilizada por desarrolladores, permitiendo escribir scripts de prueba en JavaScript y ejecutarlos para simular cargas de trabajo en aplicaciones web.

#### Ejemplos de código

A continuación, presentamos ejemplos de cómo implementar Fakes, Stubs, Mocks e Inyección de Dependencias utilizando JEST y K6 en un entorno full-stack.

#### Ejemplo con JEST: implementación de Mocks e inyección de dependencias

Supongamos que tenemos un servicio que obtiene datos de una API externa.

#### Código original del servicio (`apiService.js`)

```javascript
const axios = require('axios');

class ApiService {
  async getData() {
    const response = await axios.get('https://api.example.com/data');
    return response.data;
  }
}

module.exports = ApiService;
```

#### Código de la prueba (`apiService.test.js`)

En esta prueba, usaremos Mocks e Inyección de Dependencias para probar `ApiService` sin realizar llamadas reales a la API externa.

```javascript
const ApiService = require('./apiService');
const axios = require('axios');

jest.mock('axios');

describe('ApiService', () => {
  let apiService;

  beforeEach(() => {
    apiService = new ApiService();
  });

  test('debe obtener datos correctamente', async () => {
    const mockData = { data: { id: 1, name: 'Test' } };
    axios.get.mockResolvedValue(mockData);

    const data = await apiService.getData();

    expect(axios.get).toHaveBeenCalledWith('https://api.example.com/data');
    expect(data).toEqual(mockData.data);
  });
});
```

Este ejemplo utiliza el mock de JEST para reemplazar `axios.get` y proporcionar una respuesta predefinida, permitiendo probar `ApiService` sin realizar una llamada real a la API.

#### Ejemplo con K6: prueba de rendimiento con Mocks

Aunque K6 no soporta Mocks de la misma manera que JEST, podemos simular servicios para pruebas de rendimiento.

#### Script de prueba (`loadTest.js`)

```javascript
import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 50 }, // Ramp-up a 50 usuarios
    { duration: '1m', target: 50 },   // Sostener 50 usuarios
    { duration: '10s', target: 0 },   // Ramp-down
  ],
};

export default function () {
  let response = http.get('https://api.mockservice.com/data');
  // Validar la respuesta o registrar datos
  sleep(1);
}
```

En este script, estamos simulando una carga en un servicio API mockeado para probar el rendimiento de nuestra aplicación bajo ciertas condiciones.

#### Ejemplo completo: aplicación Full-Stack con inyección de dependencias y Mocks

Supongamos que tenemos una aplicación Express que utiliza un servicio de base de datos.

#### Código del servicio de base de datos (`databaseService.js`)

```javascript
class DatabaseService {
  constructor(dbClient) {
    this.dbClient = dbClient;
  }

  async getUser(id) {
    return await this.dbClient.query('SELECT * FROM users WHERE id = $1', [id]);
  }
}

module.exports = DatabaseService;
```

#### Código del controlador (`userController.js`)

```javascript
class UserController {
  constructor(databaseService) {
    this.databaseService = databaseService;
  }

  async getUser(req, res) {
    try {
      const user = await this.databaseService.getUser(req.params.id);
      res.json(user);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

module.exports = UserController;
```

#### Código de la ruta (`routes.js`)

```javascript
const express = require('express');
const router = express.Router();
const DatabaseService = require('./databaseService');
const UserController = require('./userController');
const dbClient = require('./dbClient'); // Cliente real de base de datos

const databaseService = new DatabaseService(dbClient);
const userController = new UserController(databaseService);

router.get('/users/:id', (req, res) => userController.getUser(req, res));

module.exports = router;
```

#### Prueba unitaria del controlador con Mocks y Fakes (`userController.test.js`)

```javascript
const UserController = require('./userController');

describe('UserController', () => {
  let userController;
  let mockDatabaseService;

  beforeEach(() => {
    mockDatabaseService = {
      getUser: jest.fn(),
    };
    userController = new UserController(mockDatabaseService);
  });

  test('debe responder con datos de usuario', async () => {
    const req = { params: { id: 1 } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const mockUser = { id: 1, name: 'John Doe' };
    mockDatabaseService.getUser.mockResolvedValue(mockUser);

    await userController.getUser(req, res);

    expect(mockDatabaseService.getUser).toHaveBeenCalledWith(1);
    expect(res.json).toHaveBeenCalledWith(mockUser);
  });

  test('debe manejar errores correctamente', async () => {
    const req = { params: { id: 1 } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const mockError = new Error('Database Error');
    mockDatabaseService.getUser.mockRejectedValue(mockError);

    await userController.getUser(req, res);

    expect(mockDatabaseService.getUser).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith('Database Error');
  });
});
```

En este ejemplo, estamos inyectando una dependencia mockeada (`mockDatabaseService`) en `UserController` para probar su comportamiento sin necesidad de una base de datos real. Esto demuestra el uso de Mocks e Inyección de Dependencias en pruebas unitarias.

#### Ejemplo de un Fake para la base de datos

Podemos crear un Fake de `DatabaseService` para pruebas más complejas.

#### Código del Fake (`fakeDatabaseService.js`)

```javascript
class FakeDatabaseService {
  constructor() {
    this.users = [{ id: 1, name: 'John Doe' }];
  }

  async getUser(id) {
    return this.users.find(user => user.id === parseInt(id));
  }

  async addUser(user) {
    this.users.push(user);
    return user;
  }
}

module.exports = FakeDatabaseService;
```

#### Prueba utilizando el Fake (`userControllerWithFake.test.js`)

```javascript
const UserController = require('./userController');
const FakeDatabaseService = require('./fakeDatabaseService');

describe('UserController with FakeDatabaseService', () => {
  let userController;
  let fakeDatabaseService;

  beforeEach(() => {
    fakeDatabaseService = new FakeDatabaseService();
    userController = new UserController(fakeDatabaseService);
  });

  test('debe responder con datos de usuario usando el Fake', async () => {
    const req = { params: { id: 1 } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await userController.getUser(req, res);

    expect(res.json).toHaveBeenCalledWith({ id: 1, name: 'John Doe' });
  });

  test('debe agregar y obtener un nuevo usuario', async () => {
    const newUser = { id: 2, name: 'Jane Smith' };
    await fakeDatabaseService.addUser(newUser);

    const req = { params: { id: 2 } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await userController.getUser(req, res);

    expect(res.json).toHaveBeenCalledWith(newUser);
  });
});
```

Este ejemplo muestra cómo utilizar un Fake para simular una base de datos en memoria, permitiendo pruebas más complejas sin necesidad de una base de datos real.

#### Ejemplo de prueba de rendimiento con K6 y una aPI simulada

Para pruebas de rendimiento, podemos simular nuestra API y utilizar K6 para evaluar cómo se comporta bajo carga.

#### Script de prueba de rendimiento (`performanceTest.js`)

```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 100,
  duration: '1m',
};

export default function () {
  let res = http.get('http://localhost:3000/users/1');
  
  check(res, {
    'status es 200': (r) => r.status === 200,
    'respuesta tiene el nombre': (r) => JSON.parse(r.body).name !== undefined,
  });
  
  sleep(1);
}
```

Este script simula 100 usuarios virtuales accediendo al endpoint `/users/1` durante un minuto, verificando que la respuesta sea correcta.


La implementación de Fakes, Stubs, inyección de dependencias y Mocks es esencial para realizar pruebas eficaces en el desarrollo full-stack. Herramientas como JEST y K6 proporcionan funcionalidades poderosas para llevar a cabo estas pruebas de manera eficiente. Los Fakes permiten simular componentes complejos, los Stubs y Mocks ayudan a aislar y controlar las dependencias, y la Inyección de Dependencias facilita la modularidad y la capacidad de prueba del código. Al aplicar estos conceptos y herramientas, los desarrolladores pueden mejorar significativamente la calidad y fiabilidad de tus aplicaciones.

### Referencias

- [Documentación de JEST](https://jestjs.io/)
- [Documentación de K6](https://k6.io/docs/)
- [Principios de pruebas unitarias](https://martinfowler.com/bliki/UnitTest.html)
- [Pruebas de integración](https://www.martinfowler.com/bliki/IntegrationTest.html)
- [Mocks Aren't Stubs](https://www.martinfowler.com/articles/mocksArentStubs.html)
- [Inyección de dependencias](https://es.wikipedia.org/wiki/Inyecci%C3%B3n_de_dependencias)
