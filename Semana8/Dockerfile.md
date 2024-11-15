### **1. Contenerización de servicios frontend y backend**

**Ejemplo: aplicación full-stack con React (Frontend) y Node.js (Backend)**

Vamos a crear contenedores separados para el frontend (React) y el backend (Node.js), lo que nos permitirá desarrollar y desplegar cada parte de forma independiente.

**Dockerfile para el frontend (React):**

```Dockerfile
# Etapa 1: Construcción
FROM node:14 AS build

WORKDIR /app

# Copiamos los archivos de configuración
COPY package*.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos el código fuente
COPY . .

# Construimos la aplicación
RUN npm run build

# Etapa 2: Servidor Nginx
FROM nginx:stable-alpine

# Copiamos los archivos estáticos de la etapa de construcción
COPY --from=build /app/build /usr/share/nginx/html

# Exponemos el puerto 80
EXPOSE 80

# Comando por defecto para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
```

**Dockerfile para el backend (Node.js):**

```Dockerfile
# Usamos la imagen base de Node.js
FROM node:14

# Establecemos el directorio de trabajo
WORKDIR /usr/src/app

# Copiamos los archivos de configuración
COPY package*.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos el resto del código fuente
COPY . .

# Exponemos el puerto 5000
EXPOSE 5000

# Comando por defecto para iniciar la aplicación
CMD ["node", "server.js"]
```

**Archivo `docker-compose.yml`:**

```yaml
version: '3.8'

services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - '3000:80'
    depends_on:
      - backend

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - '5000:5000'
    environment:
      - MONGO_URL=mongodb://database:27017/mydb
    depends_on:
      - database

  database:
    image: mongo:4.4
    ports:
      - '27017:27017'
    volumes:
      - dbdata:/data/db

volumes:
  dbdata:
```

**Estructura de directorios:**

```
project/
├── docker-compose.yml
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   ├── public/
│   └── src/
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
└── database/
```

**Explicación:**

- **Frontend**: Construimos la aplicación React y la servimos usando Nginx.
- **Backend**: Aplicación Node.js que expone una API en el puerto 5000.
- **Database**: Contenedor de MongoDB para persistencia de datos.
- **Docker Compose**: Orquesta los tres servicios, estableciendo dependencias y mapeando puertos.

---

#### **2. Uso de Docker Compose**

**Ejemplo: aplicación multicontenedor con aplicación, base de datos y caché**

**Archivo `docker-compose.yml`:**

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - '8080:8080'
    environment:
      - DATABASE_URL=postgres://postgres:password@db:5432/mydb
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis

  db:
    image: postgres:13
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=mydb
    volumes:
      - pgdata:/var/lib/postgresql/data

  redis:
    image: redis:6
    volumes:
      - redisdata:/data

volumes:
  pgdata:
  redisdata:
```

**Dockerfile de la aplicación:**

```Dockerfile
# Etapa 1: Construcción
FROM node:14 AS builder

WORKDIR /usr/src/app

# Copiamos los archivos de configuración
COPY package*.json ./

# Instalamos las dependencias
RUN npm ci

# Copiamos el código fuente
COPY . .

# Construimos la aplicación
RUN npm run build

# Etapa 2: Producción
FROM node:14-alpine

WORKDIR /usr/src/app

# Variables de entorno
ENV NODE_ENV=production

# Copiamos las dependencias de producción
COPY --from=builder /usr/src/app/package*.json ./
RUN npm ci --only=production

# Copiamos la aplicación construida
COPY --from=builder /usr/src/app/dist ./dist

# Exponemos el puerto
EXPOSE 8080

# Comando por defecto
CMD ["node", "dist/server.js"]
```

**Explicación:**

- **Docker Compose**: Orquesta la aplicación, la base de datos PostgreSQL y el servicio de caché Redis.
- **Dockerfile multietapa**: Optimiza la imagen final separando las etapas de construcción y ejecución, reduciendo el tamaño y mejorando la seguridad.

---

#### **3. Entornos de desarrollo consistentes**

**Ejemplo: configuración de un entorno de desarrollo con Docker**

**Dockerfile para desarrollo:**

```Dockerfile
FROM node:14

WORKDIR /usr/src/app

# Instalamos nodemon globalmente
RUN npm install -g nodemon

# Copiamos los archivos de configuración
COPY package*.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos el resto del código fuente
COPY . .

# Exponemos el puerto 3000
EXPOSE 3000

# Iniciamos la aplicación con nodemon para autorecarga
CMD ["nodemon", "src/index.js"]
```

**Archivo `docker-compose.yml`:**

```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - '3000:3000'
    volumes:
      - .:/usr/src/app
      - /usr/src/app/node_modules
    environment:
      - NODE_ENV=development
```

**Explicación:**

- **Volúmenes**: Mapeamos el directorio actual al contenedor, permitiendo que los cambios en el código se reflejen inmediatamente.
- **Exclusión de `node_modules`**: Evitamos conflictos entre las dependencias del host y las del contenedor.
- **Consistencia**: Todos los desarrolladores trabajan en el mismo entorno, eliminando discrepancias.

---

#### **4. Arquitectura de microservicios**

**Ejemplo: Aplicación dividida en microservicios independientes**

Supongamos que tenemos una aplicación con los siguientes microservicios:

- **Autenticación**
- **Gestión de productos**
- **Procesamiento de pagos**

**Dockerfile para el microservicio de autenticación:**

```Dockerfile
# Etapa 1: Construcción
FROM node:14 AS builder

WORKDIR /usr/src/auth-service

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# Etapa 2: Producción
FROM node:14-alpine

WORKDIR /usr/src/auth-service

ENV NODE_ENV=production

COPY --from=builder /usr/src/auth-service/package*.json ./
RUN npm ci --only=production

COPY --from=builder /usr/src/auth-service/dist ./dist

EXPOSE 4000

CMD ["node", "dist/index.js"]
```

**Archivo `docker-compose.yml` para orquestar los microservicios:**

```yaml
version: '3.8'

services:
  auth-service:
    build:
      context: ./auth-service
      dockerfile: Dockerfile
    ports:
      - '4000:4000'
    depends_on:
      - auth-db

  product-service:
    build:
      context: ./product-service
      dockerfile: Dockerfile
    ports:
      - '5000:5000'
    depends_on:
      - product-db

  payment-service:
    build:
      context: ./payment-service
      dockerfile: Dockerfile
    ports:
      - '6000:6000'
    depends_on:
      - payment-db

  auth-db:
    image: postgres:13
    environment:
      - POSTGRES_DB=authdb
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=secret
    volumes:
      - auth-db-data:/var/lib/postgresql/data

  product-db:
    image: postgres:13
    environment:
      - POSTGRES_DB=productdb
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=secret
    volumes:
      - product-db-data:/var/lib/postgresql/data

  payment-db:
    image: postgres:13
    environment:
      - POSTGRES_DB=paymentdb
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=secret
    volumes:
      - payment-db-data:/var/lib/postgresql/data

volumes:
  auth-db-data:
  product-db-data:
  payment-db-data:
```

**Explicación:**

- **Servicios independientes**: Cada microservicio tiene su propio contenedor y base de datos.
- **Escalabilidad**: Podemos escalar cada servicio de forma independiente según la carga.
- **Aislamiento**: Los servicios están aislados, mejorando la seguridad y mantenibilidad.

---

#### **5. Volúmenes de Docker**

**Ejemplo: Persistencia de datos con volúmenes**

**Archivo `docker-compose.yml`:**

```yaml
version: '3.8'

services:
  app:
    image: myapp:latest
    ports:
      - '8080:8080'
    environment:
      - DATABASE_URL=mysql://user:password@db:3306/mydb
    depends_on:
      - db

  db:
    image: mysql:8
    environment:
      - MYSQL_ROOT_PASSWORD=rootpassword
      - MYSQL_DATABASE=mydb
      - MYSQL_USER=user
      - MYSQL_PASSWORD=password
    volumes:
      - dbdata:/var/lib/mysql
    ports:
      - '3306:3306'

volumes:
  dbdata:
```

**Explicación:**

- **Volumen `dbdata`**: Almacena los datos de la base de datos MySQL en el host, garantizando persistencia.
- **Recuperación fácil**: Si el contenedor de la base de datos falla o es recreado, los datos permanecen intactos.

---

#### **6. Redes de Docker**

**Ejemplo: Configuración de redes personalizadas para seguridad**

**Archivo `docker-compose.yml` con redes definidas:**

```yaml
version: '3.8'

services:
  frontend:
    image: frontend:latest
    networks:
      - frontend-net
      - backend-net
    depends_on:
      - backend

  backend:
    image: backend:latest
    networks:
      - backend-net
    depends_on:
      - database

  database:
    image: postgres:13
    networks:
      - backend-net

networks:
  frontend-net:
    driver: bridge
  backend-net:
    driver: bridge
```

**Explicación:**

- **Red `frontend-net`**: Permite la comunicación entre el usuario y el frontend.
- **Red `backend-net`**: Aísla la comunicación entre el backend y la base de datos.
- **Seguridad mejorada**: El frontend no puede acceder directamente a la base de datos.

---

#### **7. Optimización de Dockerfiles**

**Ejemplo: Dockerfile eficiente con imágenes base ligeras**

**Dockerfile optimizado:**

```Dockerfile
# Etapa 1: Construcción
FROM node:14-alpine AS builder

WORKDIR /app

# Variables de entorno
ENV NODE_ENV=development

# Instalamos dependencias
COPY package*.json ./
RUN npm ci

# Copiamos el código fuente
COPY . .

# Ejecutamos pruebas
RUN npm test

# Construimos la aplicación
RUN npm run build

# Etapa 2: Producción
FROM node:14-alpine

WORKDIR /app

# Variables de entorno
ENV NODE_ENV=production

# Copiamos las dependencias de producción
COPY package*.json ./
RUN npm ci --only=production

# Copiamos la aplicación construida
COPY --from=builder /app/dist ./dist

# Exponemos el puerto
EXPOSE 8080

# Usuario no root
RUN addgroup appgroup && adduser -S -G appgroup appuser
USER appuser

# Comando por defecto
CMD ["node", "dist/server.js"]
```

**Explicación:**

- **Imágenes `alpine`**: Son más ligeras, reduciendo el tamaño de la imagen final.
- **Construcciones multietapa**: Separan las etapas de construcción y ejecución.
- **Usuario no root**: Mejora la seguridad al no ejecutar el contenedor como root.

---

#### **8. Integración continua y despliegue continuo (CI/CD)**

**Ejemplo: Pipeline de CI/CD con GitLab CI/CD y Docker**

**Archivo `.gitlab-ci.yml`:**

```yaml
stages:
  - build
  - test
  - deploy

variables:
  DOCKER_DRIVER: overlay2

build:
  stage: build
  image: docker:latest
  services:
    - docker:dind
  script:
    - docker build -t myapp:latest .
    - docker save myapp:latest | gzip > myapp_latest.tar.gz
  artifacts:
    paths:
      - myapp_latest.tar.gz

test:
  stage: test
  image: docker:latest
  services:
    - docker:dind
  script:
    - docker load -i myapp_latest.tar.gz
    - docker run myapp:latest npm test

deploy:
  stage: deploy
  image: docker:latest
  services:
    - docker:dind
  script:
    - docker load -i myapp_latest.tar.gz
    - docker tag myapp:latest registry.example.com/myapp:latest
    - docker push registry.example.com/myapp:latest
```

**Explicación:**

- **Pipeline**: Construye la imagen, ejecuta pruebas y despliega la imagen al registro privado.
- **Docker in Docker (`dind`)**: Permite ejecutar comandos de Docker dentro del contenedor de CI/CD.

---

#### **9. Orquestación con Kubernetes o Docker Swarm**

**Ejemplo: Despliegue con Kubernetes**

**Archivo de despliegue `deployment.yaml`:**

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
        - name: myapp
          image: registry.example.com/myapp:latest
          ports:
            - containerPort: 8080
          env:
            - name: NODE_ENV
              value: "production"
            - name: DATABASE_URL
              valueFrom:
                secretKeyRef:
                  name: db-secret
                  key: DATABASE_URL
---
apiVersion: v1
kind: Service
metadata:
  name: myapp-service
spec:
  type: LoadBalancer
  selector:
    app: myapp
  ports:
    - protocol: TCP
      port: 80
      targetPort: 8080
```

**Explicación:**

- **Despliegue**: Define cómo se ejecuta la aplicación, incluyendo réplicas y variables de entorno.
- **Servicio**: Expone la aplicación al mundo exterior a través de un balanceador de carga.
- **Secretos**: Utiliza `Secret` para manejar información sensible.

---

#### **10. Uso de variables de entorno**

**Ejemplo: Configuración de variables de entorno con Docker Compose**

**Archivo `docker-compose.yml`:**

```yaml
version: '3.8'

services:
  app:
    image: myapp:latest
    environment:
      - NODE_ENV=${NODE_ENV}
      - DATABASE_URL=${DATABASE_URL}
      - API_KEY=${API_KEY}
    ports:
      - '8080:8080'
```

**Archivo `.env`:**

```
NODE_ENV=production
DATABASE_URL=postgres://user:password@db:5432/mydb
API_KEY=abcdef123456
```

**Explicación:**

- **Variables de entorno**: Permiten configurar la aplicación sin modificar el código.
- **Archivo `.env`**: Centraliza la configuración y facilita el cambio entre entornos.

---

#### **11. Pruebas automatizadas en contenedores**

**Ejemplo: Ejecutar pruebas unitarias en un contenedor**

**Dockerfile para pruebas:**

```Dockerfile
FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "test"]
```

**Comando para ejecutar las pruebas:**

```bash
docker build -t myapp-test -f Dockerfile.test .
docker run --rm myapp-test
```

**Explicación:**

- **Imagen temporal**: Construimos una imagen específica para pruebas.
- **Ejecución aislada**: Las pruebas se ejecutan en un entorno controlado y reproducible.

---

#### **12. Despliegue de bases de datos en contenedores**

**Ejemplo: Contenerizar postgreSQL para desarrollo**

**Archivo `docker-compose.yml`:**

```yaml
version: '3.8'

services:
  app:
    image: myapp:latest
    environment:
      - DATABASE_URL=postgres://user:password@db:5432/mydb
    depends_on:
      - db
    ports:
      - '8080:8080'

  db:
    image: postgres:13
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=mydb
    volumes:
      - pgdata:/var/lib/postgresql/data
    ports:
      - '5432:5432'

volumes:
  pgdata:
```

**Explicación:**

- **Base de datos contenerizada**: Facilita la configuración y limpieza del entorno de desarrollo.
- **Persistencia**: El volumen `pgdata` asegura que los datos se mantengan entre reinicios.

---

#### **13. Multietapa en Dockerfiles**

**Ejemplo: Dockerfile multietapa para aplicación Go**

**Dockerfile:**

```Dockerfile
# Etapa 1: Construcción
FROM golang:1.16-alpine AS builder

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY . .

RUN go build -o myapp

# Etapa 2: Ejecución
FROM alpine:latest

WORKDIR /app

COPY --from=builder /app/myapp .

EXPOSE 8080

CMD ["./myapp"]
```

**Explicación:**

- **Lenguaje compilado**: Go produce binarios estáticos que pueden ejecutarse en imágenes muy ligeras.
- **Multietapa**: La imagen final es extremadamente pequeña y segura.

---

#### **14. Seguridad en Docker**

**Ejemplo: Escaneo de imágenes en busca de vulnerabilidades**

Utiliza herramientas como **Trivy** para escanear imágenes:

```bash
# Instalar Trivy
brew install aquasecurity/trivy/trivy

# Escanear una imagen
trivy image myapp:latest
```

**Explicación:**

- **Escaneo regular**: Ayuda a identificar y corregir vulnerabilidades en las imágenes.
- **Buenas prácticas**: Mantener las imágenes base actualizadas y minimizar la superficie de ataque.

---

#### **15. Registro de imágenes privado**

**Ejemplo: Configuración de un registro privado con Docker Registry**

**Comando para iniciar el registro privado:**

```bash
docker run -d -p 5000:5000 --restart=always --name registry registry:2
```

**Etiquetar y subir una imagen:**

```bash
docker tag myapp:latest localhost:5000/myapp:latest
docker push localhost:5000/myapp:latest
```

**Explicación:**

- **Registro local**: Almacena imágenes en un servidor privado.
- **Seguridad**: Controlas el acceso y gestión de las imágenes.

---

#### **16. Despliegue en la nube**

**Ejemplo: Desplegar en Google Cloud Run**

**Paso 1: Construir la imagen**

```bash
gcloud builds submit --tag gcr.io/PROJECT_ID/myapp
```

**Paso 2: Desplegar en Cloud Run**

```bash
gcloud run deploy myapp \
  --image gcr.io/PROJECT_ID/myapp \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

**Explicación:**

- **Cloud Run**: Servicio sin servidor que ejecuta contenedores en la nube.
- **Escalabilidad automática**: Se ajusta según la demanda.

---

#### **17. Monitorización y Logging**

**Ejemplo: Implementar ELK Stack para Logging**

**Archivo `docker-compose.yml`:**

```yaml
version: '3.8'

services:
  app:
    image: myapp:latest
    ports:
      - '8080:8080'
    logging:
      driver: gelf
      options:
        gelf-address: udp://localhost:12201

  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:7.9.2
    environment:
      - discovery.type=single-node
    ports:
      - '9200:9200'

  logstash:
    image: docker.elastic.co/logstash/logstash:7.9.2
    volumes:
      - ./logstash.conf:/usr/share/logstash/pipeline/logstash.conf
    ports:
      - '12201:12201/udp'

  kibana:
    image: docker.elastic.co/kibana/kibana:7.9.2
    ports:
      - '5601:5601'
```

**Explicación:**

- **ELK Stack**: Conjunto de herramientas para almacenar, analizar y visualizar logs.
- **Integración**: La aplicación envía logs a Logstash, que los procesa y envía a Elasticsearch.

---

#### **18. Gestión de secretos y configuraciones sensibles**

**Ejemplo: Uso de Docker Secrets en Swarm**

**Archivo `docker-compose.yml`:**

```yaml
version: '3.8'

services:
  app:
    image: myapp:latest
    secrets:
      - db_password
    environment:
      - DATABASE_PASSWORD_FILE=/run/secrets/db_password
    deploy:
      mode: replicated
      replicas: 3

secrets:
  db_password:
    external: true
```

**Crear el secreto en Docker Swarm:**

```bash
echo "my_db_password" | docker secret create db_password -
```

**Explicación:**

- **Docker Secrets**: Proporciona una forma segura de manejar información sensible.
- **Acceso desde la aplicación**: Los secretos se montan en `/run/secrets/`, y la aplicación los lee desde allí.

