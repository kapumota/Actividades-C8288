## Lista de proyectos

### Proyecto 1: Plataforma social interactiva en tiempo real

####  **Introducción**

En la era digital actual, las plataformas sociales se han convertido en pilares fundamentales para la interacción y comunicación entre individuos a nivel global. La capacidad de conectar, compartir y colaborar en tiempo real ha redefinido la manera en que las personas se relacionan y construyen comunidades. El **proyecto: plataforma social interactiva en tiempo real** tiene como objetivo desarrollar una aplicación web social que facilite la interacción entre usuarios a través de perfiles personalizados, permitiendo la creación de cuentas, la adición de amigos, la publicación de contenido etiquetado y la respuesta o reacción a dichas publicaciones. Además, se implementará un manejo de datos en tiempo real para enriquecer la experiencia del usuario y fomentar una comunicación dinámica y fluida.

---

#### **Entregable 1: Desarrollo de funcionalidades básicas de la plataforma social**

**Fecha de entrega**: 28 de noviembre

**Objetivo:** Crear una aplicación web funcional que permita la gestión de usuarios, la creación de perfiles, la adición de amigos y la publicación de contenido básico.

#### **1. Diseño e implementación de la base de datos**

- **Gestor de base de datos:** Utilizar **MongoDB** por su flexibilidad y facilidad de uso.
  
- **Modelado de datos simplificado:**
  
  - **Usuarios:**
    - `_id`: Identificador único.
    - `nombre`: Nombre completo.
    - `email`: Correo electrónico único.
    - `contraseña`: Contraseña cifrada.
    - `fechaRegistro`: Fecha de creación de la cuenta.
    - `listaAmigos`: Arreglo de IDs de amigos.
    - `perfil`: Información básica (foto, biografía).

  - **Publicaciones:**
    - `_id`: Identificador único.
    - `contenido`: Texto de la publicación.
    - `autor`: ID del usuario que crea la publicación.
    - `fechaCreacion`: Fecha y hora de creación.
    - `reacciones`: Número de "me gusta".

#### **2. Desarrollo del backend**

- **Tecnologías:** **Node.js** con **Express.js**.
  
- **Funcionalidades:**
  
  - **Autenticación:**
    - **Registro de usuarios:** `POST /api/auth/register`
    - **Login de usuarios:** `POST /api/auth/login` (emite JWT)

  - **Gestión de usuarios:**
    - **Obtener perfil:** `GET /api/users/:id`
    - **Actualizar perfil:** `PUT /api/users/:id`
  
  - **Amistades:**
    - **Enviar solicitud de amistad:** `POST /api/friendships`
    - **Aceptar solicitud:** `PUT /api/friendships/:id/accept`
    - **Rechazar Solicitud:** `PUT /api/friendships/:id/reject`
    - **Listar amigos:** `GET /api/friendships/:userId`

  - **Publicaciones:**
    - **Crear publicación:** `POST /api/posts`
    - **Obtener publicaciones:** `GET /api/posts`
    - **Reaccionar a publicación:** `POST /api/posts/:id/reactions`

- **Seguridad:**
  
  - **Hash de contraseñas:** Utilizar **bcrypt**.
  - **Validación de datos:** Usar **Joi** para validar entradas.
  - **Autorización:** Proteger rutas con **JWT**.

#### **3. Desarrollo del frontend**

- **Tecnologías:** **React** (o **Vue.js**) para una interfaz de usuario interactiva.
  
- **Componentes clave:**
  
  - **Registro y login:**
    - Formularios para crear cuenta e iniciar sesión.
    - Validación básica de campos.

  - **Perfil de usuario:**
    - Visualización y edición de información básica.
    - Lista de amigos con opción para agregar nuevos.

  - **Feed de publicaciones:**
    - Mostrar publicaciones de amigos.
    - Crear nuevas publicaciones.
    - "Me gusta" en publicaciones.

#### **4. Integración y pruebas básicas**

- **Integración frontend y backend:** Asegurar que las solicitudes desde el frontend se comuniquen correctamente con el backend.
  
- **Pruebas funcionales:**
  - Verificar el registro y login de usuarios.
  - Comprobar la adición de amigos.
  - Validar la creación y visualización de publicaciones.

#### **5. Documentación básica**

- **Guía de instalación:** Instrucciones para configurar el entorno de desarrollo.
  
- **Manual de uso:** Descripción de las funcionalidades implementadas.

---

### **Entregable 2: Funcionalidades avanzadas y mejoras en tiempo real**

**Fecha de entrega**:  5 de diciembre

**Objetivo:** Incorporar características avanzadas que mejoren la interacción entre usuarios y añadir funcionalidades en tiempo real para una experiencia más dinámica.

#### **1. Implementación de datos en tiempo real**

- **Tecnología:** **Socket.IO** para habilitar la comunicación en tiempo real.
  
- **Funcionalidades:**
  
  - **Notificaciones de amistad:**
    - Notificar en tiempo real cuando un usuario recibe una solicitud de amistad.
  
  - **Actualización del feed:**
    - Actualizar el feed de publicaciones en tiempo real cuando un amigo crea una nueva publicación.

  - **Reacciones en tiempo real:**
    - Actualizar el conteo de "me gusta" en las publicaciones en tiempo real.

#### **2. Mejoras en la interacción de usuarios**

- **Sistema de reacciones mejorado:**
  - Permitir diferentes tipos de reacciones (por ejemplo, "me gusta", "me encanta", "me sorprende").
  
- **Comentarios básicos:**
  - Añadir la posibilidad de comentar en publicaciones, manteniendo la simplicidad.

#### **3. Optimización del rendimiento**

- **Caché con Redis (Opcional):**
  - Implementar Redis para cachear las publicaciones más recientes y mejorar el tiempo de respuesta.

#### **4. Mejoras en el frontend**

- **Interfaz mejorada:**
  - Añadir elementos visuales para notificaciones en tiempo real.
  - Mejorar la experiencia de usuario con actualizaciones dinámicas.

- **Manejo de estado:**
  - Utilizar **Redux** (para React) o **Vuex** (para Vue.js) para gestionar el estado de la aplicación de manera más eficiente.

#### **5. Pruebas y documentación adicional**

- **Pruebas de integración:**
  - Asegurar que las nuevas funcionalidades en tiempo real funcionan correctamente.
  
- **Documentación extendida:**
  - Incluir detalles sobre la implementación de Socket.IO y Redis.
  - Actualizar el manual de uso con las nuevas funcionalidades.

#### **6. Despliegue básico**

- **Contenerización con Docker (Opcional):**
  - Crear un archivo `Dockerfile` básico para el backend y el frontend.
  - Utilizar **Docker Compose** para orquestar los servicios principales (backend, frontend, MongoDB).

#### **Resumen de tecnologías utilizadas**

- **Backend:** Node.js, Express.js, MongoDB, JWT, bcrypt, Joi, Socket.IO
- **Frontend:** React o Vue.js, Redux/Vuex, Socket.IO-client
- **Opcional:** Redis, Docker, Docker Compose


### **Recomendaciones**

- **Planificación:** Dividir las tareas diarias para asegurar el cumplimiento de los objetivos semanales.
- **Colaboración:** Utilizar herramientas de control de versiones como Git para trabajar en equipo de manera eficiente.
- **Consulta de recursos:** Aprovechar documentación oficial y tutoriales para resolver dudas sobre tecnologías específicas.
- **Enfoque en la calidad:** Priorizar la funcionalidad sobre la estética en las primeras etapas, asegurando que la aplicación sea funcional y segura.

---

### Proyecto 2: Plataforma segura de gestión de datos de salud

#### **Introducción**

En el contexto actual, donde la digitalización de la información ha transformado diversos sectores, el ámbito de la salud no ha sido la excepción. La gestión eficiente y segura de los datos de salud es crucial para garantizar la calidad de la atención médica, la investigación y la toma de decisiones informadas. Sin embargo, este manejo de información sensible conlleva desafíos significativos en términos de seguridad, privacidad y escalabilidad. 

El **proyecto: plataforma segura de gestión de datos de salud** se propone abordar estos desafíos mediante el desarrollo de una plataforma web robusta y segura, destinada a la gestión y almacenamiento de datos en el sector salud. El objetivo principal es asegurar la integridad y confidencialidad de la información médica, al tiempo que se garantiza la escalabilidad del sistema para adaptarse a las crecientes demandas del sector.

#### **Entregable 1: Desarrollo de funcionalidades básicas de la plataforma de gestión de datos de salud**
**Fecha de entrega**: 28 de noviembre

**Objetivo:** Crear una aplicación web funcional que permita la gestión básica de datos de salud, incluyendo la gestión de usuarios, historiales médicos y citas, con un enfoque en la seguridad y la autenticación.

#### **1. Diseño e implementación de la base de datos**

- **Gestor de base de datos:** Utilizar **PostgreSQL** por su robustez y capacidades avanzadas en manejo de datos relacionales.

- **Modelado de datos simplificado:**

  - **Usuarios:**
    - `id`: Identificador único.
    - `nombre`: Nombre completo.
    - `email`: Correo electrónico único.
    - `contraseña`: Contraseña cifrada.
    - `rol`: Rol del usuario (Médico, Enfermero, Administrador).
    - `fechaRegistro`: Fecha de creación de la cuenta.

  - **Pacientes:**
    - `id`: Identificador único.
    - `nombre`: Nombre completo.
    - `fechaNacimiento`: Fecha de nacimiento.
    - `direccion`: Dirección residencial.
    - `telefono`: Número de teléfono.
    - `email`: Correo electrónico.
    - `historialMedico`: Relación con historiales médicos.

  - **Historiales médicos:**
    - `id`: Identificador único.
    - `pacienteId`: Referencia al paciente.
    - `descripcion`: Descripción del historial.
    - `fecha`: Fecha del registro.
    - `medicoId`: Referencia al médico que creó el historial.

  - **Citas:**
    - `id`: Identificador único.
    - `pacienteId`: Referencia al paciente.
    - `medicoId`: Referencia al médico.
    - `fechaHora`: Fecha y hora de la cita.
    - `motivo`: Motivo de la cita.
    - `estado`: Estado de la cita (Programada, Completada, Cancelada).

#### **2. Desarrollo del backend**

- **Tecnologías:** **Node.js** con **Express.js**.

- **Funcionalidades:**

  - **Autenticación:**
    - **Registro de usuarios:** `POST /api/auth/register`
    - **Login de usuarios:** `POST /api/auth/login` (emite JWT)

  - **Gestión de usuarios:**
    - **Obtener perfil:** `GET /api/users/:id`
    - **Actualizar perfil:** `PUT /api/users/:id`
    - **Eliminar usuario:** `DELETE /api/users/:id` (solo Administradores)

  - **Gestión de pacientes:**
    - **Crear paciente:** `POST /api/pacientes`
    - **Obtener pacientes:** `GET /api/pacientes`
    - **Actualizar paciente:** `PUT /api/pacientes/:id`
    - **Eliminar paciente:** `DELETE /api/pacientes/:id`

  - **Gestión de historiales médicos:**
    - **Crear historial:** `POST /api/historiales`
    - **Obtener historiales de un paciente:** `GET /api/pacientes/:id/historiales`
    - **Actualizar historial:** `PUT /api/historiales/:id`
    - **Eliminar historial:** `DELETE /api/historiales/:id`

  - **Gestión de citas:**
    - **Programar cita:** `POST /api/citas`
    - **Obtener citas:** `GET /api/citas`
    - **Actualizar cita:** `PUT /api/citas/:id`
    - **Cancelar cita:** `DELETE /api/citas/:id`

- **Seguridad:**

  - **Hash de contraseñas:** Utilizar **bcrypt**.
  - **Validación de datos:** Usar **Joi** para validar entradas.
  - **Autorización:** Proteger rutas con **JWT** y control de acceso basado en roles (RBAC).

#### **3. Desarrollo del frontend**

- **Tecnologías:** **React** (o **Vue.js**) para una interfaz de usuario interactiva y responsiva.

- **Componentes clave:**

  - **Registro y login:**
    - Formularios para crear cuenta e iniciar sesión.
    - Validación básica de campos.

  - **Gestión de usuarios:**
    - Visualización y edición del perfil de usuario.
    - Gestión de roles (solo para Administradores).

  - **Gestión de pacientes:**
    - Formularios para crear, editar y eliminar pacientes.
    - Listado de pacientes con opciones de búsqueda y filtrado.

  - **Historiales médicos:**
    - Visualización y gestión de historiales médicos de pacientes.
    - Formularios para agregar y editar historiales.

  - **Gestión de citas:**
    - Calendario o listado de citas programadas.
    - Formularios para programar, actualizar y cancelar citas.

#### **4. Integración y pruebas básicas**

- **Integración frontend y backend:** Asegurar que las solicitudes desde el frontend se comuniquen correctamente con el backend.

- **Pruebas funcionales:**
  - Verificar el registro y login de usuarios.
  - Comprobar la creación, edición y eliminación de pacientes.
  - Validar la gestión de historiales médicos y citas.

#### **5. Documentación básica**

- **Guía de instalación:** Instrucciones para configurar el entorno de desarrollo.
  
- **Manual de uso:** Descripción de las funcionalidades implementadas.

---

#### **Entregable 2: Implementación de seguridad avanzada y despliegue básico**

**Fecha de entrega**: 5 de diciembre

**Objetivo:** Incorporar características avanzadas de seguridad, optimizar el rendimiento mediante caché y realizar el despliegue básico de la aplicación utilizando herramientas de contenerización.

#### **1. Mejoras en la seguridad**

- **Control de acceso basado en roles (RBAC):**
  - Implementar middleware para verificar permisos según el rol del usuario antes de acceder a ciertos endpoints.
  - Definir roles y permisos en el backend para garantizar que cada usuario solo acceda a lo que le corresponde.

- **Cifrado de datos sensibles:**
  - Asegurar que los datos sensibles (como historiales médicos) estén cifrados en la base de datos.
  - Implementar HTTPS en el servidor para proteger la transmisión de datos.

- **Protección contra vulnerabilidades comunes:**
  - Implementar **Helmet.js** en Express.js para establecer encabezados de seguridad HTTP.
  - Utilizar **cors** para controlar el acceso desde diferentes orígenes.
  - Sanitizar las entradas para prevenir ataques de inyección SQL y XSS.

#### **2. Optimización del rendimiento**

- **Implementación de caché con Redis:**
  - **Instalación y configuración:** Integrar **Redis** en el backend para gestionar el caché.
  - **Caché de consultas frecuentes:** Almacenar en caché resultados de consultas que se realizan repetidamente, como listados de pacientes.
  - **Caché de sesiones:** Utilizar Redis para almacenar tokens JWT y gestionar sesiones de usuario de manera eficiente.
  - **Estrategias de expiración:** Configurar tiempos de vida (TTL) para los datos en caché, asegurando la frescura y relevancia de la información.

#### **3. Mejoras en el frontend**

- **Interfaz mejorada:**
  - Añadir notificaciones visuales para acciones exitosas o errores.
  - Mejorar la navegación con rutas protegidas basadas en el rol del usuario.
  
- **Manejo de estado:**
  - Utilizar **Redux** (para React) o **Vuex** (para Vue.js) para gestionar el estado de la aplicación de manera más eficiente y centralizada.

#### **4. Despliegue básico**

- **Contenerización con Docker:**
  - **Creación de Dockerfiles:**
    - **Backend:** Imagen con Node.js, dependencias y configuración para ejecutar la API.
    - **Frontend:** Imagen con React/Vue.js, dependencias y configuración para servir la interfaz de usuario.
    - **Base de datos:** Imagen de PostgreSQL con configuración básica.
    - **Redis:** Imagen de Redis configurada para gestión de caché.
  
  - **Optimización de imágenes:**
    - Utilizar imágenes base ligeras como **Alpine Linux** para reducir el tamaño de los contenedores.
    - Minimizar el número de capas y eliminar dependencias innecesarias.

- **Orquestación con Docker Compose:**
  - **Archivo `docker-compose.yml`:**
    - **Servicios definidos:** Backend, frontend, PostgreSQL, Redis.
    - **Redes y volúmenes:** Configurar redes internas para la comunicación entre contenedores y volúmenes persistentes para la base de datos.
    - **Dependencias y orden de inicio:** Asegurar que PostgreSQL y Redis estén activos antes de iniciar el backend y frontend.

#### **5. Pruebas y documentación adicional**

- **Pruebas de seguridad:**
  - Realizar pruebas básicas para verificar la implementación de medidas de seguridad.
  - Utilizar herramientas como **OWASP ZAP** para escanear vulnerabilidades.

- **Pruebas de rendimiento:**
  - Evaluar el impacto de la implementación de caché en el tiempo de respuesta.
  - Asegurar que la aplicación maneje adecuadamente múltiples solicitudes concurrentes.

- **Documentación extendida:**
  - Incluir detalles sobre la configuración de Redis y Docker.
  - Actualizar el manual de uso con las nuevas funcionalidades de seguridad y rendimiento.

---

### **Resumen de tecnologías utilizadas**

- **Backend:** Node.js, Express.js, PostgreSQL, JWT, bcrypt, Joi, Redis, Helmet.js
- **Frontend:** React o Vue.js, Redux/Vuex
- **Contenerización:** Docker, Docker Compose
- **Seguridad:** Helmet.js, CORS, Sanitización de Entradas
- **Opcional:** OWASP ZAP para pruebas de seguridad


#### **Recomendaciones**

- **Planificación:** Dividir las tareas diarias para asegurar el cumplimiento de los objetivos semanales.
- **Colaboración:** Utilizar herramientas de control de versiones como Git para trabajar en equipo de manera eficiente.
- **Consulta de recursos:** Aprovechar documentación oficial y tutoriales para resolver dudas sobre tecnologías específicas.
- **Enfoque en la seguridad:** Priorizar la implementación de medidas de seguridad desde el inicio para garantizar la protección de los datos.
- **Pruebas continuas:** Realizar pruebas frecuentes para identificar y corregir errores a medida que se desarrolla la aplicación.


---
### Proyecto 3: Plataforma de gestión segura de infraestructura en la nube

#### **Introducción**

En la actualidad, la gestión de infraestructura en la nube se ha convertido en una necesidad fundamental para organizaciones de todos los tamaños. La capacidad de administrar, monitorizar y asegurar los recursos en la nube de manera eficiente y segura es crucial para garantizar la continuidad del negocio, la protección de datos sensibles y la optimización de costos. Sin embargo, este manejo conlleva desafíos significativos en términos de seguridad, escalabilidad y gestión eficiente.

El **proyecto: plataforma de gestión segura de infraestructura en la nube** tiene como objetivo desarrollar una aplicación web robusta que integre aspectos de infraestructura y ciberseguridad, permitiendo a los usuarios gestionar y monitorizar sus recursos en la nube de manera segura. Utilizando tecnologías modernas como **REST**, **Express.js**, y herramientas libres para el despliegue, el proyecto se alinea con los objetivos de ofrecer soluciones escalables, seguras y eficientes.

---

#### **Entregable 1: Desarrollo de funcionalidades básicas de la plataforma de gestión de infraestructura en la nube**

**Fecha de entrega**: 28 de noviembre

**Objetivo:** Crear una aplicación web funcional que permita la gestión básica de usuarios y recursos de infraestructura en la nube, con un enfoque en la autenticación y autorización seguras.

#### **1. Diseño e implementación de la base de datos**

- **Gestor de base de datos:** Utilizar **PostgreSQL** por su robustez y capacidades avanzadas en manejo de datos relacionales.

- **Modelado de datos simplificado:**

  - **Usuarios:**
    - `id_usuario` (PK): Identificador único.
    - `nombre`: Nombre completo.
    - `email`: Correo electrónico único.
    - `contraseña`: Contraseña cifrada.
    - `rol`: Rol del usuario (Administrador, Operador).
    - `fecha_registro`: Fecha de creación de la cuenta.

  - **Recursos de infraestructura:**
    - `id_recurso` (PK): Identificador único.
    - `tipo_recurso`: Tipo de recurso (Servidor, Base de Datos).
    - `configuracion`: Detalles de configuración del recurso.
    - `estado`: Estado actual (Activo, Inactivo).
    - `fecha_creacion`: Fecha de creación.
    - `id_usuario` (FK): Referencia al usuario propietario.

  - **Logs de actividad:**
    - `id_log` (PK): Identificador único.
    - `id_usuario` (FK): Referencia al usuario que realizó la acción.
    - `accion`: Descripción de la acción.
    - `fecha_hora`: Fecha y hora de la acción.
    - `ip_origen`: Dirección IP de origen.

#### **2. Desarrollo del backend**

- **Tecnologías:** **Node.js** con **Express.js**.

- **Funcionalidades:**

  - **Autenticación:**
    - **Registro de usuarios:** `POST /api/auth/register`
    - **Login de usuarios:** `POST /api/auth/login` (emite JWT)

  - **Gestión de usuarios:**
    - **Obtener perfil:** `GET /api/users/:id`
    - **Actualizar perfil:** `PUT /api/users/:id`
    - **Eliminar usuario:** `DELETE /api/users/:id` (solo Administradores)

  - **Gestión de recursos:**
    - **Crear recurso:** `POST /api/recursos`
    - **Obtener recursos:** `GET /api/recursos`
    - **Actualizar recurso:** `PUT /api/recursos/:id`
    - **Eliminar recurso:** `DELETE /api/recursos/:id`

  - **Logs de actividad:**
    - **Registrar acción:** Middleware que registra acciones importantes.

- **Seguridad:**

  - **Hash de contraseñas:** Utilizar **bcrypt**.
  - **Validación de datos:** Usar **Joi** para validar entradas.
  - **Autorización:** Proteger rutas con **JWT** y control de acceso basado en roles (RBAC).

#### **3. Desarrollo del frontend**

- **Tecnologías:** **React** (o **Vue.js**) para una interfaz de usuario interactiva y responsiva.

- **Componentes clave:**

  - **Registro y login:**
    - Formularios para crear cuenta e iniciar sesión.
    - Validación básica de campos.

  - **Gestión de usuarios:**
    - Visualización y edición del perfil de usuario (para Administradores y el propio usuario).
    - Gestión de roles (solo para Administradores).

  - **Gestión de recursos:**
    - Formularios para crear, editar y eliminar recursos de infraestructura.
    - Listado de recursos con opciones de búsqueda y filtrado.

#### **4. Integración y pruebas básicas**

- **Integración frontend y backend:** Asegurar que las solicitudes desde el frontend se comuniquen correctamente con el backend.

- **Pruebas funcionales:**
  - Verificar el registro y login de usuarios.
  - Comprobar la creación, edición y eliminación de recursos.
  - Validar la gestión de usuarios y roles.

#### **5. Documentación básica**

- **Guía de instalación:** Instrucciones para configurar el entorno de desarrollo.
  
- **Manual de uso:** Descripción de las funcionalidades implementadas.

---

#### **Entregable 2: Implementación de seguridad avanzada y despliegue básico**

**Fecha de entrega**: 5 de diciembre

**Objetivo:** Incorporar características avanzadas de seguridad, optimizar el rendimiento mediante caché y realizar el despliegue básico de la aplicación utilizando herramientas de contenerización.

#### **1. Mejoras en la seguridad**

- **Control de Acceso basado en roles (RBAC):**
  - Implementar middleware para verificar permisos según el rol del usuario antes de acceder a ciertos endpoints.
  - Definir roles y permisos en el backend para garantizar que cada usuario solo acceda a lo que le corresponde.

- **Cifrado de datos sensibles:**
  - Asegurar que los datos sensibles (como configuraciones de recursos) estén cifrados en la base de datos.
  - Implementar HTTPS en el servidor para proteger la transmisión de datos.

- **Protección contra vulnerabilidades comunes:**
  - Implementar **Helmet.js** en Express.js para establecer encabezados de seguridad HTTP.
  - Utilizar **cors** para controlar el acceso desde diferentes orígenes.
  - Sanitizar las entradas para prevenir ataques de inyección SQL y XSS.

#### **2. Optimización del rendimiento**

- **Implementación de caché con Redis:**
  - **Instalación y configuración:** Integrar **Redis** en el backend para gestionar el caché.
  - **Caché de consultas frecuentes:** Almacenar en caché resultados de consultas que se realizan repetidamente, como listados de recursos.
  - **Caché de sesiones:** Utilizar Redis para almacenar tokens JWT y gestionar sesiones de usuario de manera eficiente.
  - **Estrategias de expiración:** Configurar tiempos de vida (TTL) para los datos en caché, asegurando la frescura y relevancia de la información.

#### **3. Mejoras en el frontend**

- **Interfaz mejorada:**
  - Añadir notificaciones visuales para acciones exitosas o errores.
  - Mejorar la navegación con rutas protegidas basadas en el rol del usuario.

- **Manejo de estado:**
  - Utilizar **Redux** (para React) o **Vuex** (para Vue.js) para gestionar el estado de la aplicación de manera más eficiente y centralizada.

#### **4. Contenerización con Docker**

- **Creación de Dockerfiles:**
  - **Backend:** Imagen con Node.js, dependencias y configuración para ejecutar la API.
  - **Frontend:** Imagen con React/Vue.js, dependencias y configuración para servir la interfaz de usuario.
  - **Base de datos:** Imagen de PostgreSQL con configuración básica.
  - **Redis:** Imagen de Redis configurada para gestión de caché.

- **Optimización de imágenes:**
  - Utilizar imágenes base ligeras como **Alpine Linux** para reducir el tamaño de los contenedores.
  - Minimizar el número de capas y eliminar dependencias innecesarias.

- **Orquestación con Docker Compose:**
  - **Archivo `docker-compose.yml`:**
    - **Servicios definidos:** Backend, frontend, PostgreSQL, Redis.
    - **Redes y volúmenes:** Configurar redes internas para comunicación entre contenedores y volúmenes persistentes para la base de datos.
    - **Dependencias y orden de inicio:** Asegurar que PostgreSQL y Redis estén activos antes de iniciar el backend y frontend.
    - **Variables de entorno:** Configuración de variables de entorno para manejar configuraciones sensibles y específicas del entorno.

#### **5. Despliegue básico**

- **Despliegue local con docker compose:**
  - Ejecutar todos los servicios definidos en `docker-compose.yml` para tener la aplicación funcionando localmente.
  - Verificar que el frontend se comunica correctamente con el backend y que los servicios de PostgreSQL y Redis están operativos.

- **Documentación de despliegue:**
  - Instrucciones detalladas sobre cómo iniciar la aplicación utilizando Docker Compose.
  - Descripción de las variables de entorno necesarias y cómo configurarlas.

#### **6. Pruebas y documentación adicional**

- **Pruebas de seguridad:**
  - Realizar pruebas básicas para verificar la implementación de medidas de seguridad.
  - Utilizar herramientas como **OWASP ZAP** para escanear vulnerabilidades.

- **Pruebas de rendimiento:**
  - Evaluar el impacto de la implementación de caché en el tiempo de respuesta.
  - Asegurar que la aplicación maneje adecuadamente múltiples solicitudes concurrentes.

- **Documentación extendida:**
  - Incluir detalles sobre la configuración de Redis y Docker.
  - Actualizar el manual de uso con las nuevas funcionalidades de seguridad y rendimiento.

---

#### **Resumen de tecnologías utilizadas**

- **Backend:** Node.js, Express.js, PostgreSQL, JWT, bcrypt, Joi, Redis, Helmet.js
- **Frontend:** React o Vue.js, Redux/Vuex
- **Contenerización:** Docker, Docker Compose
- **Seguridad:** Helmet.js, CORS, Sanitización de Entradas
- **Opcional:** OWASP ZAP para pruebas de seguridad


#### **Recomendaciones**

- **Planificación:** Dividir las tareas diarias para asegurar el cumplimiento de los objetivos semanales.
- **Colaboración:** Utilizar herramientas de control de versiones como Git para trabajar en equipo de manera eficiente.
- **Consulta de recursos:** Aprovechar documentación oficial y tutoriales para resolver dudas sobre tecnologías específicas.
- **Enfoque en la seguridad:** Priorizar la implementación de medidas de seguridad desde el inicio para garantizar la protección de los datos.
- **Pruebas continuas:** Realizar pruebas frecuentes para identificar y corregir errores a medida que se desarrolla la aplicación.

---
### Proyecto 4: Sistema automatizado de autorización segura para aplicaciones web en contenedores

#### **Introducción**

En el contexto actual de la transformación digital, las aplicaciones web han adquirido un papel central en las operaciones de organizaciones de todos los tamaños. La adopción de contenedores ha facilitado la portabilidad y escalabilidad de estas aplicaciones, permitiendo despliegues más eficientes y consistentes. Sin embargo, con el aumento de la complejidad y la interconexión de sistemas, la seguridad y la gestión de autorizaciones se convierten en aspectos críticos que deben abordarse con rigor.

El **proyecto: sistema automatizado de autorización segura para aplicaciones web en contenedores** tiene como objetivo desarrollar una plataforma que integre la automatización del despliegue y la gestión de aplicaciones web en contenedores, con un enfoque robusto en la autorización y seguridad. Utilizando tecnologías modernas como **JavaScript**, **TypeScript**, **Docker**, **Kubernetes** y algoritmos de cifrado avanzados, se busca crear un sistema que no solo facilite la gestión eficiente de recursos en la nube, sino que también garantice la protección de la información sensible y las comunicaciones.

---

#### **Entregable 1: Desarrollo de funcionalidades básicas y contenerización**

**Fecha de entrega**: 28 de noviembre

**Objetivo:** Crear una aplicación web funcional que permita la gestión básica de usuarios y recursos de infraestructura en contenedores, implementando mecanismos esenciales de autenticación y autorización, y contenerizando la aplicación para su despliegue.

#### **1. Diseño e implementación de la base de datos**

- **Gestor de base de datos:** Utilizar **PostgreSQL** por su robustez y capacidades avanzadas en manejo de datos relacionales.

- **Modelado de datos simplificado:**

  - **Usuarios:**
    - `id_usuario` (PK): Identificador único.
    - `nombre`: Nombre completo.
    - `email`: Correo electrónico único.
    - `contraseña`: Contraseña cifrada.
    - `rol`: Rol del usuario (Administrador, Operador).
    - `fecha_registro`: Fecha de creación de la cuenta.

  - **Recursos de infraestructura:**
    - `id_recurso` (PK): Identificador único.
    - `tipo_recurso`: Tipo de recurso (Servidor, Base de Datos).
    - `configuracion`: Detalles de configuración del recurso.
    - `estado`: Estado actual (Activo, Inactivo).
    - `fecha_creacion`: Fecha de creación.
    - `id_usuario` (FK): Referencia al usuario propietario.

  - **Logs de actividad:**
    - `id_log` (PK): Identificador único.
    - `id_usuario` (FK): Referencia al usuario que realizó la acción.
    - `accion`: Descripción de la acción.
    - `fecha_hora`: Fecha y hora de la acción.
    - `ip_origen`: Dirección IP de origen.

#### **2. Desarrollo del backend**

- **Tecnologías:** **Node.js** con **Express.js**.

- **Funcionalidades básicas:**

  - **Autenticación:**
    - **Registro de usuarios:** `POST /api/auth/register`
    - **Login de usuarios:** `POST /api/auth/login` (emite JWT)
  
  - **Gestión de usuarios:**
    - **Obtener perfil:** `GET /api/users/:id`
    - **Actualizar perfil:** `PUT /api/users/:id`
    - **Eliminar usuario:** `DELETE /api/users/:id` (solo Administradores)
  
  - **Gestión de recursos:**
    - **Crear recurso:** `POST /api/recursos`
    - **Obtener recursos:** `GET /api/recursos`
    - **Actualizar recurso:** `PUT /api/recursos/:id`
    - **Eliminar recurso:** `DELETE /api/recursos/:id`
  
  - **Logs de actividad:**
    - **Registrar acción:** Middleware que registra acciones importantes en la base de datos.

- **Seguridad básica:**
  
  - **Hash de contraseñas:** Utilizar **bcrypt** para cifrar las contraseñas de los usuarios.
  - **Validación de datos:** Usar **Joi** para validar las entradas de datos en cada endpoint.
  - **Autorización:** Proteger rutas con **JWT** y control de acceso basado en roles (RBAC).

#### **3. Desarrollo del frontend**

- **Tecnologías:** **React** (o **Vue.js**) para una interfaz de usuario interactiva y responsiva.

- **Componentes clave:**

  - **Registro y login:**
    - Formularios para crear cuenta e iniciar sesión.
    - Validación básica de campos.
  
  - **Gestión de usuarios:**
    - Visualización y edición del perfil de usuario (para Administradores y el propio usuario).
    - Gestión de roles (solo para Administradores).
  
  - **Gestión de recursos:**
    - Formularios para crear, editar y eliminar recursos de infraestructura.
    - Listado de recursos con opciones de búsqueda y filtrado.

#### **4. Contenerización con Docker**

- **Creación de Dockerfiles:**

  - **Backend:** Imagen con Node.js, dependencias y configuración para ejecutar la API.
  - **Frontend:** Imagen con React/Vue.js, dependencias y configuración para servir la interfaz de usuario.
  - **Base de datos:** Imagen de PostgreSQL con configuración básica.
  
- **Optimización de imágenes:**
  
  - Utilizar imágenes base ligeras como **Alpine Linux** para reducir el tamaño de los contenedores.
  - Minimizar el número de capas y eliminar dependencias innecesarias.

- **Orquestación con Docker Compose:**

  - **Archivo `docker-compose.yml`:**
    - **Servicios definidos:** Backend, frontend, PostgreSQL.
    - **Redes y volúmenes:** Configurar redes internas para comunicación entre contenedores y volúmenes persistentes para la base de datos.
    - **Dependencias y orden de inicio:** Asegurar que PostgreSQL esté activo antes de iniciar el backend y frontend.
    - **Variables de entorno:** Configuración de variables de entorno para manejar configuraciones sensibles y específicas del entorno.

#### **5. Integración y pruebas básicas**

- **Integración frontend y backend:** Asegurar que las solicitudes desde el frontend se comuniquen correctamente con el backend.

- **Pruebas funcionales:**
  - Verificar el registro y login de usuarios.
  - Comprobar la creación, edición y eliminación de recursos.
  - Validar la gestión de usuarios y roles.

#### **6. Documentación básica**

- **Guía de instalación:** Instrucciones para configurar el entorno de desarrollo y ejecutar los contenedores.
  
- **Manual de uso:** Descripción de las funcionalidades implementadas con capturas de pantalla y ejemplos prácticos.

---

### **Entregable 2: Implementación de seguridad avanzada y despliegue mejorado**

**Fecha de entrega**: 5 de diciembre

**Objetivo:** Incorporar características avanzadas de seguridad, optimizar el rendimiento mediante caché, implementar monitorización básica y mejorar el despliegue de la aplicación utilizando herramientas de contenerización avanzadas.

#### **1. Mejoras en la seguridad**

- **Control de acceso basado en roles (RBAC):**
  - Implementar middleware para verificar permisos según el rol del usuario antes de acceder a ciertos endpoints.
  - Definir roles y permisos en el backend para garantizar que cada usuario solo acceda a lo que le corresponde.

- **Cifrado de datos sensibles:**
  - Asegurar que los datos sensibles (como configuraciones de recursos) estén cifrados en la base de datos.
  - Implementar HTTPS en el servidor para proteger la transmisión de datos.

- **Protección contra vulnerabilidades comunes:**
  - Implementar **Helmet.js** en Express.js para establecer encabezados de seguridad HTTP.
  - Utilizar **cors** para controlar el acceso desde diferentes orígenes.
  - Sanitizar las entradas para prevenir ataques de inyección SQL y XSS.

#### **2. Optimización del rendimiento**

- **Implementación de caché con Redis:**
  - **Instalación y configuración:** Integrar **Redis** en el backend para gestionar el caché.
  - **Caché de consultas frecuentes:** Almacenar en caché resultados de consultas que se realizan repetidamente, como listados de recursos.
  - **Caché de sesiones:** Utilizar Redis para almacenar tokens JWT y gestionar sesiones de usuario de manera eficiente.
  - **Estrategias de expiración:** Configurar tiempos de vida (TTL) para los datos en caché, asegurando la frescura y relevancia de la información.

#### **3. Mejoras en el frontend**

- **Interfaz mejorada:**
  - Añadir notificaciones visuales para acciones exitosas o errores.
  - Mejorar la navegación con rutas protegidas basadas en el rol del usuario.

- **Manejo de estado:**
  - Utilizar **Redux** (para React) o **Vuex** (para Vue.js) para gestionar el estado de la aplicación de manera más eficiente y centralizada.

#### **4. Contenerización avanzada con Docker**

- **Actualización de Dockerfiles:**
  - **Backend y frontend:** Optimizar los Dockerfiles para mejorar la eficiencia y seguridad.
  - **Añadir Redis:** Incluir un servicio de Redis en el archivo `docker-compose.yml`.
  
- **Orquestación con Docker Compose Mejorada:**
  - **Archivo `docker-compose.yml` Actualizado:**
    - **Servicios definidos:** Backend, frontend, PostgreSQL, Redis.
    - **Redes y volúmenes:** Configurar redes internas para comunicación entre contenedores y volúmenes persistentes para la base de datos y Redis.
    - **Dependencias y orden de inicio:** Asegurar que PostgreSQL y Redis estén activos antes de iniciar el backend y frontend.
    - **Variables de entorno:** Continuar utilizando variables de entorno para manejar configuraciones sensibles y específicas del entorno.

#### **5. Implementación de monitorización básica**

- **Integración con Prometheus y Grafana:**
  - **Prometheus:**
    - **Exporters:** Utilizar exporters específicos para recolectar métricas del backend, PostgreSQL y Redis.
    - **Scrape configuration:** Definir tareas de scrape en Prometheus para recolectar métricas a intervalos regulares.
  
  - **Grafana:**
    - **Data sources:** Conectar Grafana a Prometheus como fuente de datos.
    - **Dashboards básicos:** Crear dashboards que muestren métricas clave como uso de CPU, memoria, estado de recursos y tráfico de red.
  
- **Configuración de alertas:**
  - Configurar alertas en Prometheus para notificar al equipo cuando se alcancen umbrales críticos en métricas clave.

#### **6. Pruebas y documentación adicional**

- **Pruebas de seguridad:**
  - Realizar pruebas básicas para verificar la implementación de medidas de seguridad.
  - Utilizar herramientas como **OWASP ZAP** para escanear vulnerabilidades.

- **Pruebas de rendimiento:**
  - Evaluar el impacto de la implementación de caché en el tiempo de respuesta.
  - Asegurar que la aplicación maneje adecuadamente múltiples solicitudes concurrentes.

- **Documentación extendida:**
  - Incluir detalles sobre la configuración de Redis, Prometheus y Grafana.
  - Actualizar el manual de uso con las nuevas funcionalidades de seguridad y rendimiento.
  - Instrucciones para acceder a los dashboards de monitorización y entender las métricas presentadas.

---

#### **Resumen de tecnologías utilizadas**

- **Backend:** Node.js, Express.js, PostgreSQL, JWT, bcrypt, Joi, Redis, Helmet.js
- **Frontend:** React o Vue.js, Redux/Vuex
- **Contenerización:** Docker, Docker Compose
- **Monitorización:** Prometheus, Grafana
- **Seguridad:** Helmet.js, CORS, Sanitización de Entradas
- **Opcional:** OWASP ZAP para pruebas de seguridad


#### **Recomendaciones**

- **Planificación:** Dividir las tareas diarias para asegurar el cumplimiento de los objetivos semanales.
- **Colaboración:** Utilizar herramientas de control de versiones como Git para trabajar en equipo de manera eficiente.
- **Consulta de recursos:** Aprovechar documentación oficial y tutoriales para resolver dudas sobre tecnologías específicas.
- **Enfoque en la seguridad:** Priorizar la implementación de medidas de seguridad desde el inicio para garantizar la protección de los datos.
- **Pruebas continuas:** Realizar pruebas frecuentes para identificar y corregir errores a medida que se desarrolla la aplicación.

---
### Proyecto 5: Sistema automatizado de autorización segura para aplicaciones web

## **Introducción**

En el panorama actual de la tecnología, las aplicaciones web han evolucionado significativamente, convirtiéndose en herramientas esenciales para la operación de organizaciones de diversos sectores. La adopción de contenedores ha revolucionado la forma en que se despliegan y gestionan estas aplicaciones, ofreciendo ventajas como la portabilidad, escalabilidad y consistencia en diferentes entornos. Sin embargo, con el incremento de la complejidad y la interconexión de sistemas, surge la necesidad de implementar mecanismos robustos de autorización y seguridad que aseguren el acceso controlado y protegido a los recursos.

El **proyecto: sistema automatizado de autorización segura para aplicaciones web en contenedores** se propone desarrollar una plataforma que combine la automatización del despliegue y gestión de aplicaciones web en contenedores con un sistema avanzado de autorización y seguridad. Utilizando tecnologías modernas como **JavaScript**, **TypeScript**, **Docker**, **Kubernetes** y algoritmos de cifrado avanzados, este proyecto busca crear un sistema eficiente, seguro y escalable que responda a las necesidades actuales y futuras de las organizaciones.

---

#### **Entregable 1: Desarrollo de funcionalidades básicas y contenerización**

**Fecha de entrega**: 28 de noviembre

**Objetivo:** Crear una aplicación web funcional que permita la gestión básica de usuarios y recursos, implementando mecanismos esenciales de autenticación y autorización, y contenerizando la aplicación para su despliegue.

### **1. Configuración del entorno de desarrollo**

- **Instalación de herramientas necesarias:**
  - **Node.js y npm:** Para el desarrollo del backend.
  - **React** (o **Vue.js**): Para el desarrollo del frontend.
  - **PostgreSQL:** Como gestor de base de datos.
  - **Docker:** Para contenerizar la aplicación.

- **Inicialización del proyecto:**
  - Crear un repositorio Git y configurar el archivo `.gitignore` para excluir `node_modules/` y `.env`.
  - Inicializar un proyecto Node.js:
    ```bash
    mkdir proyecto-autorization
    cd proyecto-autorization
    npm init -y
    ```

### **2. Diseño e implementación de la base de datos**

- **Modelo de datos simplificado:**

  **Usuarios**
  ```sql
  CREATE TABLE usuarios (
      id SERIAL PRIMARY KEY,
      nombre VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      contraseña VARCHAR(255) NOT NULL,
      rol VARCHAR(50) NOT NULL,
      fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  ```

  **Recursos de infraestructura**
  ```sql
  CREATE TABLE recursos (
      id SERIAL PRIMARY KEY,
      tipo_recurso VARCHAR(100) NOT NULL,
      configuracion TEXT NOT NULL,
      estado VARCHAR(50) NOT NULL,
      fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      id_usuario INTEGER REFERENCES usuarios(id)
  );
  ```

#### **3. Desarrollo del backend**

- **Tecnologías:** **Node.js** con **Express.js**.

- **Estructura básica del proyecto:**
  ```
  - src/
    - controllers/
      - authController.js
      - recursoController.js
    - routes/
      - authRoutes.js
      - recursoRoutes.js
    - models/
      - usuarioModel.js
      - recursoModel.js
    - middlewares/
      - authMiddleware.js
    - config/
      - dbConfig.js
    - app.js
  - .env
  - package.json
  ```

- **Configuración de la conexión a la base de datos (`config/dbConfig.js`):**
  ```javascript
  const { Pool } = require('pg');
  require('dotenv').config();

  const pool = new Pool({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
  });

  module.exports = pool;
  ```

- **Modelo de usuario (`models/usuarioModel.js`):**
  ```javascript
  const pool = require('../config/dbConfig');

  const crearUsuario = async (nombre, email, contraseña, rol) => {
    const resultado = await pool.query(
      'INSERT INTO usuarios (nombre, email, contraseña, rol) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, email, contraseña, rol]
    );
    return resultado.rows[0];
  };

  const encontrarUsuarioPorEmail = async (email) => {
    const resultado = await pool.query(
      'SELECT * FROM usuarios WHERE email = $1',
      [email]
    );
    return resultado.rows[0];
  };

  module.exports = { crearUsuario, encontrarUsuarioPorEmail };
  ```

- **Controlador de autenticación (`controllers/authController.js`):**
  ```javascript
  const jwt = require('jsonwebtoken');
  const bcrypt = require('bcrypt');
  const { crearUsuario, encontrarUsuarioPorEmail } = require('../models/usuarioModel');

  exports.registrar = async (req, res) => {
    const { nombre, email, contraseña, rol } = req.body;
    try {
      const hash = await bcrypt.hash(contraseña, 10);
      const nuevoUsuario = await crearUsuario(nombre, email, hash, rol);
      res.status(201).json({ usuario: nuevoUsuario });
    } catch (error) {
      res.status(500).json({ error: 'Error al registrar el usuario.' });
    }
  };

  exports.login = async (req, res) => {
    const { email, contraseña } = req.body;
    try {
      const usuario = await encontrarUsuarioPorEmail(email);
      if (!usuario) return res.status(400).json({ error: 'Usuario no encontrado.' });

      const esValida = await bcrypt.compare(contraseña, usuario.contraseña);
      if (!esValida) return res.status(400).json({ error: 'Contraseña incorrecta.' });

      const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Error al iniciar sesión.' });
    }
  };
  ```

- **Middleware de autenticación (`middlewares/authMiddleware.js`):**
  ```javascript
  const jwt = require('jsonwebtoken');

  const autenticar = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Acceso denegado.' });

    try {
      const verificado = jwt.verify(token, process.env.JWT_SECRET);
      req.usuario = verificado;
      next();
    } catch (error) {
      res.status(400).json({ error: 'Token inválido.' });
    }
  };

  const autorizar = (roles = []) => {
    if (typeof roles === 'string') roles = [roles];
    return [
      autenticar,
      (req, res, next) => {
        if (!roles.length || roles.includes(req.usuario.rol)) {
          return next();
        }
        return res.status(403).json({ error: 'No tienes permisos para realizar esta acción.' });
      },
    ];
  };

  module.exports = { autenticar, autorizar };
  ```

- **Rutas de autenticación (`routes/authRoutes.js`):**
  ```javascript
  const express = require('express');
  const router = express.Router();
  const authController = require('../controllers/authController');

  // Registro de usuario
  router.post('/register', authController.registrar);

  // Login de usuario
  router.post('/login', authController.login);

  module.exports = router;
  ```

#### **4. Desarrollo del frontend**

- **Tecnologías:** **React** (puede adaptarse a **Vue.js** según preferencia).

- **Estructura básica del proyecto:**
  ```
  - src/
    - components/
      - Register.js
      - Login.js
      - Dashboard.js
      - RecursoForm.js
      - RecursoList.js
    - services/
      - authService.js
      - recursoService.js
    - App.js
    - index.js
  - package.json
  ```

- **Ejemplo de componente de registro (`components/Register.js`):**
  ```javascript
  import React, { useState } from 'react';
  import authService from '../services/authService';

  const Register = () => {
    const [formData, setFormData] = useState({
      nombre: '',
      email: '',
      contraseña: '',
      rol: 'Operador',
    });

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await authService.register(formData);
        alert('Usuario registrado exitosamente!');
      } catch (error) {
        alert(error.response.data.error);
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="contraseña" placeholder="Contraseña" onChange={handleChange} required />
        <select name="rol" onChange={handleChange}>
          <option value="Operador">Operador</option>
          <option value="Administrador">Administrador</option>
        </select>
        <button type="submit">Registrar</button>
      </form>
    );
  };

  export default Register;
  ```

- **Servicio de autenticación (`services/authService.js`):**
  ```javascript
  import axios from 'axios';

  const API_URL = 'http://localhost:3000/api/auth';

  const register = (data) => {
    return axios.post(`${API_URL}/register`, data);
  };

  const login = (data) => {
    return axios.post(`${API_URL}/login`, data);
  };

  export default { register, login };
  ```

#### **5. Contenerización con Docker**

- **Creación de Dockerfiles:**

  **Backend (`Dockerfile.backend`):**
  ```dockerfile
  FROM node:16-alpine

  WORKDIR /app

  COPY package.json ./
  RUN npm install

  COPY . .

  EXPOSE 3000

  CMD ["node", "src/app.js"]
  ```

  **Frontend (`Dockerfile.frontend`):**
  ```dockerfile
  FROM node:16-alpine as build

  WORKDIR /app

  COPY package.json ./
  RUN npm install

  COPY . .
  RUN npm run build

  FROM nginx:alpine
  COPY --from=build /app/build /usr/share/nginx/html

  EXPOSE 80

  CMD ["nginx", "-g", "daemon off;"]
  ```

- **Archivo `docker-compose.yml`:**
  ```yaml
  version: '3.8'

  services:
    backend:
      build:
        context: .
        dockerfile: Dockerfile.backend
      env_file:
        - .env
      ports:
        - "3000:3000"
      depends_on:
        - db

    frontend:
      build:
        context: ./frontend
        dockerfile: Dockerfile.frontend
      ports:
        - "80:80"

    db:
      image: postgres:13
      restart: always
      environment:
        POSTGRES_USER: ${DATABASE_USER}
        POSTGRES_PASSWORD: ${DATABASE_PASSWORD}
        POSTGRES_DB: ${DATABASE_NAME}
      ports:
        - "5432:5432"
      volumes:
        - db-data:/var/lib/postgresql/data

  volumes:
    db-data:
  ```

#### **6. Integración y pruebas básicas**

- **Pruebas funcionales:**
  - **Registro de usuarios:** Verificar que se puedan crear nuevos usuarios.
  - **Login de usuarios:** Verificar que los usuarios puedan iniciar sesión y recibir un JWT.
  - **Gestión de recursos:** Permitir a usuarios autenticados crear, ver, actualizar y eliminar recursos según su rol.

- **Validación de datos:**
  - Implementar validaciones en el backend utilizando **Joi** para asegurar que los datos recibidos sean correctos.

  **Ejemplo de validación en `routes/authRoutes.js`:**
  ```javascript
  const { body, validationResult } = require('express-validator');

  router.post(
    '/register',
    [
      body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
      body('email').isEmail().withMessage('Email inválido'),
      body('contraseña').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
      body('rol').isIn(['Administrador', 'Operador']).withMessage('Rol inválido'),
    ],
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
    authController.registrar
  );
  ```

#### **7. Documentación básica**

- **Guía de instalación:**
  - Instrucciones para clonar el repositorio, configurar variables de entorno y ejecutar los contenedores Docker.
  
  **Ejemplo de `README.md`:**
  ```markdown
  # Sistema Automatizado de Autorización Segura para Aplicaciones Web

  ## Introducción
  Este proyecto es una plataforma básica para la gestión de usuarios y recursos con autenticación y autorización, contenerizada con Docker.

  ## Tecnologías Utilizadas
  - Backend: Node.js, Express.js, PostgreSQL
  - Frontend: React
  - Contenerización: Docker, Docker Compose

  ## Instalación

  ### Prerrequisitos
  - Docker y Docker Compose instalados.
  
  ### Pasos
  1. Clona el repositorio:
     ```bash
     git clone https://github.com/tu_usuario/proyecto-autorization.git
     cd proyecto-autorization
     ```

  2. Crea un archivo `.env` en la raíz con las siguientes variables:
     ```env
     DATABASE_USER=tu_usuario
     DATABASE_PASSWORD=tu_password
     DATABASE_NAME=tu_base_de_datos
     DATABASE_HOST=db
     DATABASE_PORT=5432
     JWT_SECRET=tu_secreto_jwt
     ```

  3. Inicia los contenedores:
     ```bash
     docker-compose up --build
     ```

  4. Accede a la aplicación:
     - Frontend: [http://localhost](http://localhost)
     - Backend API: [http://localhost:3000](http://localhost:3000)
  ```

---

#### **Entregable 2: Implementación de seguridad, pruebas y despliegue mejorado**

**Fecha de entrega**: 5 de diciembre


**Objetivo:** Incorporar características avanzadas de seguridad, implementar pruebas unitarias e integración, optimizar el rendimiento, mejorar la gestión de errores y logging, y mejorar el despliegue de la aplicación.

#### **1. Mejoras en la seguridad**

- **Control de acceso basado en roles (RBAC):**
  - Asegurar que solo los usuarios con el rol adecuado puedan acceder a ciertas rutas.
  
  **Ejemplo en `routes/recursoRoutes.js`:**
  ```javascript
  const express = require('express');
  const router = express.Router();
  const recursoController = require('../controllers/recursoController');
  const { autorizar } = require('../middlewares/authMiddleware');

  // Crear recurso - solo Administradores y Operadores
  router.post('/', autorizar(['Administrador', 'Operador']), recursoController.crearRecurso);

  // Obtener recursos - cualquier usuario autenticado
  router.get('/', autorizar(), recursoController.obtenerRecursos);

  // Actualizar recurso - solo Administradores
  router.put('/:id', autorizar(['Administrador']), recursoController.actualizarRecurso);

  // Eliminar recurso - solo Administradores
  router.delete('/:id', autorizar(['Administrador']), recursoController.eliminarRecurso);

  module.exports = router;
  ```

- **Implementación de Helmet.js:**
  - Añadir encabezados de seguridad HTTP para proteger la aplicación.
  
  **Configuración en `app.js`:**
  ```javascript
  const helmet = require('helmet');
  app.use(helmet());
  ```

- **Configuración de CORS:**
  - Permitir solicitudes desde el frontend.
  
  **Configuración en `app.js`:**
  ```javascript
  const cors = require('cors');
  app.use(cors({
    origin: 'http://localhost', // Cambiar según el origen del frontend
    optionsSuccessStatus: 200
  }));
  ```

- **Sanitización de entradas:**
  - Prevenir ataques de inyección SQL y XSS utilizando librerías como **express-validator**.

### **2. Implementación de pruebas unitarias y de integración**

- **Herramientas:** **Jest** y **Supertest**.

- **Configuración de Jest:**
  - Añadir script de pruebas en `package.json`:
    ```json
    "scripts": {
      "test": "jest"
    }
    ```

- **Ejemplo de prueba unitaria (`tests/unit/authController.test.js`):**
  ```javascript
  const authController = require('../../src/controllers/authController');
  const usuarioModel = require('../../src/models/usuarioModel');
  const bcrypt = require('bcrypt');
  const jwt = require('jsonwebtoken');

  jest.mock('../../src/models/usuarioModel');
  jest.mock('bcrypt');
  jest.mock('jsonwebtoken');

  describe('Auth Controller', () => {
    describe('Registrar', () => {
      it('debería registrar un nuevo usuario', async () => {
        const req = {
          body: {
            nombre: 'Juan Perez',
            email: 'juan@example.com',
            contraseña: 'password123',
            rol: 'Operador'
          }
        };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn()
        };
        bcrypt.hash.mockResolvedValue('hashed_password');
        usuarioModel.crearUsuario.mockResolvedValue({
          id: 1,
          nombre: 'Juan Perez',
          email: 'juan@example.com',
          contraseña: 'hashed_password',
          rol: 'Operador',
          fecha_registro: new Date()
        });

        await authController.registrar(req, res);

        expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
        expect(usuarioModel.crearUsuario).toHaveBeenCalledWith('Juan Perez', 'juan@example.com', 'hashed_password', 'Operador');
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ usuario: expect.any(Object) });
      });
    });
  });
  ```

- **Ejemplo de prueba de integración (`tests/integration/authRoutes.test.js`):**
  ```javascript
  const request = require('supertest');
  const app = require('../../src/app');
  const pool = require('../../src/config/dbConfig');

  beforeAll(async () => {
    // Configurar la base de datos de pruebas
    await pool.query('DELETE FROM usuarios');
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('Auth Routes', () => {
    it('debería registrar un nuevo usuario', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          nombre: 'Maria Lopez',
          email: 'maria@example.com',
          contraseña: 'securepassword',
          rol: 'Administrador'
        });
      
      expect(res.statusCode).toEqual(201);
      expect(res.body.usuario).toHaveProperty('id');
      expect(res.body.usuario.email).toBe('maria@example.com');
    });

    it('debería iniciar sesión y devolver un token', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'maria@example.com',
          contraseña: 'securepassword'
        });
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('token');
    });
  });
  ```

#### **3. Optimización del rendimiento**

- **Compresión de respuestas HTTP:**
  - Reducir el tamaño de las respuestas para mejorar tiempos de carga.
  
  **Configuración en `app.js`:**
  ```javascript
  const compression = require('compression');
  app.use(compression());
  ```

- **Cacheo de recursos estáticos:**
  - Mejorar tiempos de respuesta sirviendo recursos estáticos con cache.
  
  **Configuración en `app.js`:**
  ```javascript
  const path = require('path');
  app.use(express.static(path.join(__dirname, '../public'), { maxAge: '1d' }));
  ```

#### **4. Mejora de la gestión de errores y logging**

- **Implementación de Winston para logging:**

  **Instalación:**
  ```bash
  npm install winston
  ```

  **Configuración (`config/logger.js`):**
  ```javascript
  const { createLogger, format, transports } = require('winston');

  const logger = createLogger({
    level: 'info',
    format: format.combine(
      format.timestamp(),
      format.json()
    ),
    transports: [
      new transports.File({ filename: 'logs/error.log', level: 'error' }),
      new transports.File({ filename: 'logs/combined.log' })
    ],
  });

  if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
      format: format.simple(),
    }));
  }

  module.exports = logger;
  ```

  **Uso en `app.js`:**
  ```javascript
  const morgan = require('morgan');
  const logger = require('./config/logger');

  app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));

  // Middleware global de errores
  app.use((err, req, res, next) => {
    logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(500).json({ error: 'Ocurrió un error interno. Por favor, intenta nuevamente más tarde.' });
  });
  ```

#### **5. Despliegue mejorado con Docker Compose**

- **Actualización del archivo `docker-compose.yml` para incluir Redis:**
  ```yaml
  version: '3.8'

  services:
    backend:
      build:
        context: .
        dockerfile: Dockerfile.backend
      env_file:
        - .env
      ports:
        - "3000:3000"
      depends_on:
        - db
        - redis

    frontend:
      build:
        context: ./frontend
        dockerfile: Dockerfile.frontend
      ports:
        - "80:80"

    db:
      image: postgres:13
      restart: always
      environment:
        POSTGRES_USER: ${DATABASE_USER}
        POSTGRES_PASSWORD: ${DATABASE_PASSWORD}
        POSTGRES_DB: ${DATABASE_NAME}
      ports:
        - "5432:5432"
      volumes:
        - db-data:/var/lib/postgresql/data

    redis:
      image: redis:6-alpine
      restart: always
      ports:
        - "6379:6379"

  volumes:
    db-data:
  ```

- **Integración de redis en el Backend:**
  
  **Instalación de Redis Client:**
  ```bash
  npm install redis
  ```

  **Configuración en `config/dbConfig.js`:**
  ```javascript
  const redis = require('redis');

  const redisClient = redis.createClient({
    host: 'redis',
    port: 6379,
  });

  redisClient.on('error', (err) => {
    console.error('Redis error:', err);
  });

  module.exports = { pool, redisClient };
  ```

  **Uso en controladores para cachear datos (ejemplo en `controllers/recursoController.js`):**
  ```javascript
  const { pool, redisClient } = require('../config/dbConfig');

  exports.obtenerRecursos = async (req, res) => {
    try {
      redisClient.get('recursos', async (err, data) => {
        if (err) throw err;

        if (data) {
          return res.json(JSON.parse(data));
        } else {
          const resultado = await pool.query('SELECT * FROM recursos');
          redisClient.setex('recursos', 3600, JSON.stringify(resultado.rows));
          res.json(resultado.rows);
        }
      });
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los recursos.' });
    }
  };
  ```

#### **6. Documentación extendida**

- **Actualización del `README.md` para incluir nuevas funcionalidades:**
  ```markdown
  ## Funcionalidades avanzadas

  - **Seguridad mejorada:**
    - Control de Acceso Basado en Roles (RBAC)
    - Encabezados de Seguridad con Helmet.js
    - CORS configurado para permitir solicitudes desde el frontend

  - **Optimización del rendimiento:**
    - Compresión de respuestas HTTP con compression
    - Cacheo de recursos estáticos y consultas frecuentes con Redis

  - **Gestión de errores y logging:**
    - Logging avanzado con Winston
    - Middleware global de manejo de errores

  - **Pruebas:**
    - Pruebas unitarias con Jest
    - Pruebas de integración con Supertest

  - **Despliegue mejorado:**
    - Despliegue multi-contenedor con Docker Compose incluyendo Redis

  ## Acceso a la API

  La documentación de la API está disponible en [http://localhost:3000/api-docs](http://localhost:3000/api-docs) una vez que la aplicación esté en ejecución.
  ```

#### **Resumen de tecnologías utilizadas**

- **Backend:** Node.js, Express.js, PostgreSQL, JWT, bcrypt, Joi, Redis, Helmet.js, Winston
- **Frontend:** React
- **Contenerización:** Docker, Docker Compose
- **Pruebas:** Jest, Supertest
- **Optimización:** compression, express-validator


#### **Recomendaciones**

- **Planificación:** Dividir las tareas diarias para asegurar el cumplimiento de los objetivos semanales.
- **Colaboración:** Utilizar herramientas de control de versiones como Git para trabajar en equipo de manera eficiente.
- **Consulta de recursos:** Aprovechar documentación oficial y tutoriales para resolver dudas sobre tecnologías específicas.
- **Enfoque en la seguridad:** Priorizar la implementación de medidas de seguridad desde el inicio para garantizar la protección de los datos.
- **Pruebas continuas:** Realizar pruebas frecuentes para identificar y corregir errores a medida que se desarrolla la aplicación.

