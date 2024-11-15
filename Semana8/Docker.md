### Contenerización con Docker

Los desarrolladores full-stack profesionales trabajan frecuentemente con Docker y, en general, con contenedores. Docker, una plataforma de contenedorización de código abierto, resuelve tres problemas comunes:

1. **Versiones específicas de software**: Nos permite ejecutar una versión específica de algún software, como Node.js, para cada uno de nuestros proyectos.
2. **Entorno de desarrollo desacoplado**: Desacopla el entorno de desarrollo de nuestra máquina local y crea una forma reproducible de ejecutar la aplicación.
3. **Eficiencia en recursos**: A diferencia de las máquinas virtuales tradicionales, los contenedores Docker se ejecutan en un host compartido. Por lo tanto, son más pequeños en tamaño y consumen menos memoria que las máquinas virtuales clásicas, que emulan un sistema completo y a menudo son específicas de hardware. Como resultado, las aplicaciones basadas en contenedores son livianas y fáciles de escalar.

Estas ventajas han convertido a Docker en la plataforma de desarrollo más apreciada en los últimos años.

Esta nota cubre los fundamentos de Docker. Primero, recorreremos los pasos necesarios para contenerizar nuestra aplicación Next.js creando un contenedor Docker que ejecute la versión más reciente de Node.js y sirva la aplicación desde dentro del contenedor. Luego exploraremos el concepto de una arquitectura de microservicios y crearemos dos microservicios utilizando Docker.

#### La Arquitectura de contenerización

En su vida diaria, los desarrolladores deben cambiar regularmente entre aplicaciones que requieren diferentes versiones de la misma biblioteca. Por ejemplo, un desarrollador enfocado en JavaScript podría necesitar una versión diferente de Node.js o TypeScript para cada uno de sus proyectos. Por supuesto, podrían cambiar la versión instalada de Node.js en su máquina local con herramientas como `nvm` cada vez que necesiten trabajar en un proyecto diferente. Pero en lugar de recurrir a trucos toscos, podrían optar por una solución más elegante.

Usando Docker, podemos separar nuestra aplicación o sus servicios en contenedores independientes, cada uno de los cuales proporciona un entorno específico del servicio. Estos contenedores se ejecutan en un sistema operativo de nuestra elección (a menudo Debian, Ubuntu o Alpine), con solo las dependencias necesarias para esta aplicación en particular. Los contenedores están aislados entre sí y se comunican a través de API definidas.

Cuando usamos un contenedor Docker durante el proceso de desarrollo, facilitamos el despliegue posterior de la aplicación. Después de todo, el contenedor proporciona una versión de nuestra aplicación que es independiente de la ubicación y agnóstica de la plataforma. Por lo tanto, ya sabemos que nuestra aplicación funciona con las dependencias instaladas y que no son necesarios pasos adicionales de instalación ni conflictos. En lugar de configurar un servidor remoto con el software requerido y luego desplegar y probar nuestra aplicación, simplemente podemos mover nuestro contenedor Docker al servidor y ejecutarlo allí.

En situaciones en las que necesitamos mudarnos a un servidor diferente, escalar nuestra aplicación, agregar servidores de base de datos adicionales o distribuir instancias en varias ubicaciones, Docker nos permite desplegar nuestra aplicación utilizando el mismo proceso sencillo. En lugar de gestionar diferentes hosts y configuraciones, podemos construir efectivamente una aplicación agnóstica de la plataforma y ejecutar los mismos contenedores en todas partes.

#### Instalando Docker

Para verificar si ya tienes Docker instalado, abre la línea de comandos y ejecuta `docker -v`. Si ves un número de versión superior a 20, deberías poder seguir los ejemplos. De lo contrario, necesitarás instalar la versión más reciente de Docker desde Docker Inc. Ve a [Docker Desktop](https://www.docker.com/products/docker-desktop/). Luego elige el instalador de Docker Desktop para tu sistema operativo y descárgalo. Ejecuta la aplicación y verifica el número de versión de Docker en la línea de comandos. Debería coincidir con la que descargaste.

#### Creando un contenedor Docker

Docker tiene varios componentes clave:

- **Sistema host**: La máquina física o virtual en la que se ejecuta el demonio Docker. Mientras desarrollas tu aplicación localmente, el host es tu máquina física; cuando despliegas tu contenedor, el host es el servidor que ejecuta la aplicación.
- **Demonio Docker**: Proporciona la funcionalidad de Docker a través de APIs y es la aplicación Docker instalada en tu máquina. Accedemos al demonio usando el comando `docker` desde la línea de comandos.
- **Contenedores Docker**: Instancias en ejecución de una imagen Docker en particular, que es el artefacto que contiene la aplicación.
- **Dockerfile**: Define la configuración y el contenido de la imagen Docker.

#### Escribiendo el Dockerfile

Un Dockerfile es un archivo de texto que contiene la información necesaria para configurar una imagen Docker. Comúnmente se basa en una imagen base existente, como una máquina Linux básica en la que hemos instalado software adicional o un entorno preconfigurado. Por ejemplo, podríamos usar una imagen de Linux con Node.js, MongoDB y todas las dependencias relevantes instaladas.

A menudo, podemos basarnos en una imagen oficial. Por ejemplo, el siguiente Dockerfile muestra el Dockerfile básico que usamos para contenerizar nuestra aplicación Next.js refactorizada. Crea un archivo llamado `Dockerfile` en el directorio raíz de tu proyecto, junto al archivo `package.json`, y agrega el siguiente código:

```Dockerfile
FROM node:current

WORKDIR /home/node

COPY package.json package-lock.json /home/node/

EXPOSE 3000
```


La imagen que hemos seleccionado contiene un sistema Node.js preconfigurado que se ejecuta en Debian. La etiqueta de versión `current` te da la versión más reciente de Node.js; alternativamente, podríamos proporcionar un número de versión específico aquí. Si necesitas bloquear tu aplicación a una versión específica de Node.js, esta es la línea para hacerlo. También podrías usar la imagen más ligera `node:current-slim`, una distribución ligera de Debian que contiene solo los paquetes de software necesarios para ejecutar Node.js. Sin embargo, necesitamos el servidor en memoria de MongoDB, por lo que elegiremos la imagen regular. 

Puedes ver una lista de las imágenes disponibles en [Docker Hub](https://hub.docker.com). Otras imágenes que probablemente usarás en tu carrera incluyen las de WordPress, MySQL, Redis, Apache y NGINX.

Usamos la palabra clave `WORKDIR` para configurar el directorio de trabajo dentro de la imagen Docker en el directorio del usuario. Todos los comandos futuros ahora se ejecutarán en este directorio. Usamos la palabra clave `COPY` para agregar los archivos `package.json` y `package-lock.json` al directorio de trabajo. Una aplicación Node.js se ejecuta en el puerto 3000 por defecto, por lo que usamos la palabra clave `EXPOSE` para elegir el puerto 3000 para las conexiones TCP. Esta conexión proporcionará acceso a la aplicación desde fuera del contenedor.

#### Construyendo la imagen Docker

Para crear una imagen Docker a partir del Dockerfile, usamos el comando `docker image build`. Durante el proceso de construcción, el demonio Docker lee el Dockerfile y ejecuta los comandos definidos allí para descargar e instalar software, copiar archivos locales en la imagen y configurar el entorno. 

Ejecuta lo siguiente junto al Dockerfile para construir la imagen a partir de él:

```bash
$ docker image build --tag nextjs:latest .

[+] Building 11.9s (10/10) FINISHED

=> [internal] load build definition from Dockerfile                   0.1s
=> => transferring dockerfile: 136B                                   0.0s
=> [1/2] FROM docker.io/library/node:current-alpine@sha256:HASH       0.0s
=> [2/2] WORKDIR /home/node                                           0.0s
=> => naming to docker.io/library/nextjs:latest
```

La bandera `--tag` le da el nombre `nextjs` a la imagen y establece su versión en `latest`. Ahora podemos referirnos fácilmente a esta imagen específica en un momento posterior. Usamos un punto (`.`) al final del comando para establecer el contexto de construcción, limitando el acceso de archivos del comando `docker build` al directorio actual.

Para verificar que tenemos acceso a la imagen, ejecuta lo siguiente. Este comando lista todas las imágenes Docker disponibles localmente:

```bash
$ docker image ls

REPOSITORY    TAG        IMAGE ID       CREATED          SIZE
nextjs        latest     98b28358e19a   12 seconds ago   100MB
```

Docker proporciona comandos adicionales para gestionar imágenes locales y remotas. Puedes ver una lista de todos los comandos disponibles ejecutando `docker image --help`. Por ejemplo, para eliminar una imagen existente de tu máquina local, usa `docker image rm`:

```bash
$ docker image rm <nombre:versión o ID>
```

Para liberar espacio en tu máquina eliminando imágenes no utilizadas, puedes usar:

```bash
$ docker image prune
```

#### Sirviendo la aplicación desde el contenedor Docker

Los contenedores Docker son instancias en ejecución de imágenes Docker. Puedes usar la misma imagen Docker para iniciar múltiples contenedores, cada uno con un nombre o ID único. Una vez que el contenedor está en ejecución, puedes sincronizar archivos locales con él. Escucha en un puerto TCP o UDP expuesto, por lo que puedes conectarte a él y ejecutar comandos dentro de él utilizando SSH.

Vamos a contenerizar nuestra aplicación. Iniciaremos el contenedor Docker desde nuestra imagen, mapearemos los archivos locales de Next.js al directorio de trabajo, publicaremos el puerto expuesto y finalmente iniciaremos el servidor de desarrollo de Next.js. Podemos hacer todo esto usando `docker container run`:

```bash
$ docker container run \
--name nextjs_container \
--volume ~/nextjs_refactored/:/home/node/ \
--publish-all \
nextjs:latest npm run dev

> refactored-app@0.1.0 dev
> next dev

ready - started server on 0.0.0.0:3000, url: http://localhost:3000
event - compiled client and server successfully in 10.9s (208 modules)
```

Le pasamos varias banderas:

- `--name`: Asigna un nombre único al contenedor en ejecución.
- `--volume`: Crea un volumen Docker para sincronizar nuestros archivos de aplicación con el directorio `/home/node/` dentro del contenedor.
- `--publish-all`: Publica todos los puertos exportados y los asigna a puertos aleatorios en el sistema host.
- `nextjs:latest`: Apunta a la imagen Docker que queremos usar para el contenedor.
- `npm run dev`: Inicia el servidor de desarrollo de Next.js.

#### Localizando el puerto expuesto de Docker

Para acceder a nuestra aplicación, necesitamos conocer el puerto asignado. Ejecuta `docker container ls` para ver detalles sobre todos los contenedores Docker en ejecución:

```bash
$ docker container ls

CONTAINER ID   IMAGE             PORTS                     NAMES
dff681898013   nextjs:latest     0.0.0.0:55000->3000/tcp   nextjs_container
```

El puerto 55000 en el host se asigna al puerto 3000 de Docker. Podemos acceder a nuestra aplicación en `http://localhost:55000`.

#### Interactuando con el contenedor

Para ejecutar comandos dentro de un contenedor Docker ya en ejecución, puedes usar:

```bash
$ docker container exec -it <container ID or name> /bin/sh
```

Para detener un contenedor Docker en ejecución:

```bash
$ docker container kill <container ID or name>
```

#### Creando microservicios con Docker Compose

Docker nos proporciona una forma de dividir una aplicación en unidades pequeñas y autónomas, llamadas microservicios. Una arquitectura impulsada por microservicios divide una aplicación en una colección de servicios autónomos que se comunican a través de API bien definidas.

Los microservicios tienen varias ventajas:

- **Simplicidad**: Cada servicio independiente tiene un solo propósito, lo que reduce su complejidad.
- **Mantenibilidad**: Son más fáciles de probar y mantener.
- **Despliegue independiente**: Podemos desplegar los microservicios por separado.
- **Escalabilidad**: Podemos iniciar múltiples instancias de un solo microservicio para mejorar su rendimiento o reemplazarlo sin afectar a toda la aplicación.

#### Escribiendo el archivo docker-compose.yml

Definimos todos los servicios en `docker-compose.yml`, un archivo de texto en formato YAML. Este archivo también establece las propiedades, dependencias y volúmenes para cada servicio.

Crea el archivo en la carpeta raíz de tu aplicación y agrega el siguiente código:

```yaml
version: "3.0"
services:
  application:
    image: nextjs:latest
    ports:
      - "3000:3000"
    volumes:
      - ./:/home/node/
    command: npm run dev
  jest:
    image: nextjs:latest
    volumes:
      - ./:/home/node/
    command: npx jest ./__tests__/mongoose/weather/services.test.ts --watchAll
```
Cada servicio sigue aproximadamente la misma estructura:

- **image**: La imagen a partir de la cual Docker Compose debe crear cada contenedor.
- **ports**: Mapeamos los puertos directamente de 3000 a 3000.
- **volumes**: Sincronizamos los archivos y rutas del sistema host dentro del contenedor.
- **command**: Especifica el comando que cada contenedor ejecuta al iniciarse.

#### Ejecutando los contenedores

Inicia la aplicación con múltiples contenedores usando el comando `docker compose up`. La salida debería verse similar a lo siguiente:

```bash
$ docker compose up

[+] Running 2/2
⠿ Container application-1  Created                       0.0s
⠿ Container jest-1         Recreated                     0.4s
Attaching to application-1, jest-1
application-1     |

application-1     | > refactored-app@0.1.0 dev
application-1     | > next dev
application-1     |
application-1     | ready - started server on 0.0.0.0:3000, URL:
application-1     | http://localhost:3000
jest-1            | PASS __tests__/mongoose/weather/services.test.ts
jest-1            |  the weather services
jest-1            |     API storeDocument
jest-1            |       ✓ returns true  (9 ms)
jest-1            |       ✓ passes the document to Model.create()  (6 ms)
jest-1            |     API findByZip
jest-1            |       ✓ returns true  (1 ms)
jest-1            |       ✓ passes the zip code to Model.findOne()  (1 ms)
jest-1            |     API updateByZip
jest-1            |       ✓ returns true  (1 ms)
jest-1            |       ✓ passes the zip code and the new data to
jest-1            |         Model.updateOne()  (1 ms)
jest-1            |     API deleteByZip
jest-1            |       ✓ returns true  (1 ms)
jest-1            |       ✓ passes the zip code to Model.deleteOne()  (1 ms)
jest-1            |
jest-1            | Test Suites: 1 passed, 1 total
jest-1            | Tests:       8 passed, 8 total
jest-1            | Time:        4.059 s
jest-1            | Ran all test suites matching
jest-1            |    /.\/__tests__\/mongoose\/weather\/services.test.ts/i.
```

#### Volver a ejecutar las pruebas

Para verificar que Jest vuelve a ejecutar las pruebas cuando hay cambios en el código, modifica el archivo `mongoose/weather/service.ts` y guarda los cambios. Deberías ver una salida similar:

```bash
jest-1            | Ran all test suites matching
jest-1            |    /.\/__tests__\/mongoose\/weather\/services.test.ts/i.
jest-1            |
jest-1            | PASS __tests__/mongoose/weather/services.test.ts
jest-1            |   the weather services
jest-1            |     API storeDocument
jest-1            |       ✓ returns true  (9 ms)
jest-1            |       ✓ passes the document to Model.create()  (6 ms)
jest-1            |     API findByZip
jest-1            |       ✓ returns true  (1 ms)
jest-1            |       ✓ passes the zip code to Model.findOne()  (1 ms)
jest-1            |     API updateByZip
jest-1            |       ✓ returns true  (1 ms)
jest-1            |       ✓ passes the zip code and the new data to
jest-1            |         Model.updateOne()  (1 ms)
jest-1            |     API deleteByZip
jest-1            |       ✓ returns true  (1 ms)
jest-1            |       ✓ pasa el código postal a Model.deleteOne()  (1 ms)
jest-1            |
jest-1            | Test Suites: 1 passed, 1 total
jest-1            | Tests:       8 passed, 8 total
jest-1            | Time:        7.089 s
jest-1            | Ran all test suites matching
jest-1            |    /.\/__tests__\/mongoose\/weather\/services.test.ts/i
```


#### Interactuando con Docker Compose

Docker Compose proporciona una interfaz completa para gestionar aplicaciones de microservicios. Algunos comandos esenciales son:

- **Listar aplicaciones Docker en ejecución**:

  ```bash
  $ docker compose ls
  ```

- **Detener todos los servicios en ejecución**:

  ```bash
  $ docker compose kill
  ```

- **Cerrar servicios de manera ordenada**:

  ```bash
  $ docker compose down
  ```


Usar la plataforma de contenerización Docker facilita el despliegue de aplicaciones y el uso de una arquitectura de microservicios. Este capítulo cubrió los bloques de construcción del ecosistema Docker: el host, el demonio Docker, Dockerfiles, imágenes y contenedores. Usando Docker Compose y volúmenes Docker, dividiste tu aplicación en servicios individuales y autónomos.

Para aprovechar al máximo Docker, consulta los tutoriales oficiales en [Docker Docs](https://docs.docker.com/get-started/) o en [Docker Curriculum](https://docker-curriculum.com).
