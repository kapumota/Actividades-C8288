### Actividad 16: Agregar casos de prueba a la aplicación del clima**

#### **Objetivo**
Aprender a implementar pruebas unitarias, de instantáneas y `end-to-end` en una aplicación del clima utilizando Jest. Además, entender cómo utilizar `spies` y `mocks` para aislar y verificar componentes específicos de la aplicación.

#### **Requisitos previos**
- Conocimiento básico de **TypeScript** y **JavaScript**.
- Familiaridad con **React** y **Mongoose**.
- Comprensión de conceptos básicos de **pruebas unitarias** y **Jest**.
- Proyecto de la **aplicación del clima** ya configurado con una estructura similar a la mencionada en el ejercicio.

#### **Contenido de la actividad**
1. **Configuración del entorno de pruebas para el middleware**
2. **Escribir pruebas unitarias para `dbConnect`**
3. **Crear mocks para los servicios de Mongoose**
4. **Escribir pruebas unitarias para los servicios del clima**
5. **Ejecutar y verificar las pruebas**

---

#### **1. Configuración del entorno de pruebas para el middleware**

Antes de comenzar a escribir las pruebas, es esencial configurar el entorno de pruebas correctamente.

**Pasos:**

1. **Crear la carpeta de pruebas:**
   - Navega a la carpeta raíz de tu proyecto.
   - Crea una nueva carpeta llamada `__tests__`.
   - Dentro de `__tests__`, crea una subcarpeta llamada `middleware`.

2. **Crear el archivo de pruebas para `dbConnect`:**
   - Dentro de la carpeta `middleware`, crea un archivo llamado `db-connect.test.ts`.

3. **Agregar el código de prueba inicial:**
   - Abre `db-connect.test.ts` y copia el siguiente código:

     ```typescript
     /**
     * @jest-environment node
     */

     import dbConnect from "../../middleware/db-connect";
     import mongoose from "mongoose";
     import { MongoMemoryServer } from "mongodb-memory-server";

     describe("dbConnect", () => {
         let connection: any;

         afterEach(async () => {
             jest.clearAllMocks();
             await connection.stop();
             await mongoose.disconnect();
         });

         afterAll(async () => {
             jest.restoreAllMocks();
         });

         test("calls MongoMemoryServer.create()", async () => {
             const spy = jest.spyOn(MongoMemoryServer, "create");
             connection = await dbConnect();
             expect(spy).toHaveBeenCalled();
         });

         test("calls mongoose.disconnect()", async () => {
             const spy = jest.spyOn(mongoose, "disconnect");
             connection = await dbConnect();
             expect(spy).toHaveBeenCalled();
         });

         test("calls mongoose.connect()", async () => {
             const spy = jest.spyOn(mongoose, "connect");
             connection = await dbConnect();
             const MONGO_URI = connection.getUri();
             expect(spy).toHaveBeenCalledWith(MONGO_URI, { dbName: "Weather" });
         });
     });
     ```

4. **Modificar `dbConnect` para retornar `mongoServer`:**
   - Abre el archivo `db-connect.ts` ubicado en la carpeta `middleware`.
   - Asegúrate de que la función `dbConnect` retorne `mongoServer` justo antes del cierre de la función. Por ejemplo:

     ```typescript
     const dbConnect = async () => {
         const mongoServer = await MongoMemoryServer.create();
         const uri = mongoServer.getUri();
         await mongoose.connect(uri, { dbName: "Weather" });
         return mongoServer; // Agregar esta línea
     };
     ```

#### **2. Escribir pruebas unitarias para `dbConnect`**

Las pruebas unitarias verifican que cada parte de tu aplicación funcione correctamente de forma aislada.

**Descripción de las pruebas:**

- **Prueba 1:** Verifica que `MongoMemoryServer.create()` sea llamado.
- **Prueba 2:** Verifica que `mongoose.disconnect()` sea llamado.
- **Prueba 3:** Verifica que `mongoose.connect()` sea llamado con los argumentos correctos.

**Pasos:**

1. **Revisar el código de prueba:**
   - Asegúrate de que el código en `db-connect.test.ts` siga el patrón de preparar, actuar y afirmar.
   - Cada prueba utiliza `jest.spyOn` para espiar métodos específicos y luego verifica si fueron llamados correctamente.

2. **Ejecutar las pruebas:**
   - En la terminal, ejecuta el comando:

     ```bash
     npm test
     ```

   - Todas las pruebas deberían pasar con una cobertura de prueba del 100%.

#### **3. Crear mocks para los servicios de Mongoose**

Los mocks permiten aislar las partes de tu aplicación que deseas probar, reemplazando las dependencias reales por simulaciones controladas.

**Pasos:**

1. **Crear el mock de `WeatherModel`:**
   - Navega a `mongoose/weather/` dentro de tu proyecto.
   - Crea una carpeta llamada `__mocks__`.
   - Dentro de `__mocks__`, crea un archivo llamado `model.ts`.
   - Copia y pega el siguiente código en `model.ts`:

     ```typescript
     import { WeatherInterface } from "../interface";

     type param = {
         [key: string]: string;
     };

     const WeatherModel = {
         create: jest.fn((newData: WeatherInterface) => Promise.resolve(true)),
         findOne: jest.fn(({ zip: paramZip }: param) => Promise.resolve(true)),
         updateOne: jest.fn(({ zip: paramZip }: param, newData: WeatherInterface) =>
             Promise.resolve(true)
         ),
         deleteOne: jest.fn(({ zip: paramZip }: param) => Promise.resolve(true))
     };
     export default WeatherModel;
     ```

   - **Descripción del mock:**
     - Implementa `WeatherInterface`.
     - Define un tipo `param` para tipificar los parámetros.
     - Crea un objeto `WeatherModel` con métodos `create`, `findOne`, `updateOne` y `deleteOne` que son funciones simuladas (`jest.fn`) que devuelven una promesa resuelta con `true`.

#### **4. Escribir pruebas unitarias para los servicios del clima**

Ahora, escribiremos pruebas unitarias para los servicios que interactúan con `WeatherModel`.

**Pasos:**

1. **Crear el archivo de pruebas para los servicios:**
   - Dentro de la carpeta `__tests__/mongoose/weather/`, crea un archivo llamado `services.test.ts`.

2. **Agregar el código de prueba para los servicios:**
   - Abre `services.test.ts` y copia el siguiente código:

     ```typescript
     /**
     * @jest-environment node
     */
     import { WeatherInterface } from "../../../mongoose/weather/interface";
     import {
         findByZip,
         storeDocument,
         updateByZip,
         deleteByZip,
     } from "../../../mongoose/weather/services";

     import WeatherModel from "../../../mongoose/weather/model";

     jest.mock("../../../mongoose/weather/model");

     describe("the weather services", () => {
         let doc: WeatherInterface = {
             zip: "test",
             weather: "weather",
             tempC: "00",
             tempF: "01",
             friends: []
         };

         afterEach(async () => {
             jest.clearAllMocks();
         });

         afterAll(async () => {
             jest.restoreAllMocks();
         });

         describe("API storeDocument", () => {
             test("returns true", async () => {
                 const result = await storeDocument(doc);
                 expect(result).toBeTruthy();
             });

             test("passes the document to Model.create()", async () => {
                 const spy = jest.spyOn(WeatherModel, "create");
                 await storeDocument(doc);
                 expect(spy).toHaveBeenCalledWith(doc);
             });
         });

         describe("API findByZip", () => {
             test("returns true", async () => {
                 const result = await findByZip(doc.zip);
                 expect(result).toBeTruthy();
             });

             test("passes the zip code to Model.findOne()", async () => {
                 const spy = jest.spyOn(WeatherModel, "findOne");
                 await findByZip(doc.zip);
                 expect(spy).toHaveBeenCalledWith({ zip: doc.zip });
             });
         });

         describe("API updateByZip", () => {
             test("returns true", async () => {
                 const result = await updateByZip(doc.zip, doc);
                 expect(result).toBeTruthy();
             });

             test("passes the zip code and the new data to Model.updateOne()", async () => {
                 const spy = jest.spyOn(WeatherModel, "updateOne");
                 const result = await updateByZip(doc.zip, doc);
                 expect(spy).toHaveBeenCalledWith({ zip: doc.zip }, doc);
             });
         });

         describe("API deleteByZip", () => {
             test("returns true", async () => {
                 const result = await deleteByZip(doc.zip);
                 expect(result).toBeTruthy();
             });

             test("passes the zip code Model.deleteOne()", async () => {
                 const spy = jest.spyOn(WeatherModel, "deleteOne");
                 const result = await deleteByZip(doc.zip);
                 expect(spy).toHaveBeenCalledWith({ zip: doc.zip });
             });
         });
     });
     ```

3. **Descripción de las pruebas:**
   - **Mocking del modelo:**
     - Utiliza `jest.mock` para reemplazar el modelo real con el mock que creamos anteriormente.
   - **Definición del documento de prueba:**
     - Crea un documento de prueba `doc` que se utilizará en las pruebas.
   - **Estructura de las pruebas:**
     - Para cada servicio (`storeDocument`, `findByZip`, `updateByZip`, `deleteByZip`), se realizan dos pruebas:
       1. Verificar que la función del servicio retorne `true`.
       2. Verificar que el método correspondiente del `WeatherModel` sea llamado con los argumentos correctos.

#### **5. Ejecutar y verificar las pruebas**

Una vez que hayas configurado todas las pruebas, es momento de ejecutarlas y verificar los resultados.

**Pasos:**

1. **Ejecutar las Pruebas:**
   - En la terminal, dentro de la carpeta raíz de tu proyecto, ejecuta:

     ```bash
     npm test
     ```

2. **Interpretar el resultado de las pruebas:**
   - Deberías ver una salida similar a la siguiente:

     ```
     PASS  __tests__/mongoose/weather/services.test.ts
     PASS  __tests__/middleware/db-connect.test.ts

     --------------------|---------|----------|---------|---------|-------------------
     File                | % Stmts | % Branch | % Funcs | % Lines | Uncovered Lines
     --------------------|---------|----------|---------|---------|-------------------
     All files           |   83.63 |      100 |   88.23 |   82.35 |
     middleware         |     100 |      100 |     100 |     100 |
       db-connect.test.ts|     100 |      100 |     100 |     100 |
     mongoose/weather.  |   77.41 |      100 |     100 |   75.86 |
       services.test.ts  |   70.83 |      100 |     100 |   70.83 |8,20-22,33-35,43-45
     --------------------|---------|----------|---------|---------|-------------------
     ```

   - **Interpretación:**
     - Todas las pruebas deberían pasar (`PASS`).
     - La cobertura de código debería ser alta, con algunas líneas no cubiertas relacionadas con `console.log(err);`.

3. **Análisis de la cobertura de código:**
   - Observa el reporte de cobertura para identificar las partes del código que no están cubiertas por las pruebas.
   - En este caso, las líneas no cubiertas contienen la salida `console.log(err);`.
   - Para cubrir estas líneas, podrías agregar pruebas adicionales que simulen errores en las llamadas asíncronas.

