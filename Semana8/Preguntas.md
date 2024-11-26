### Ejercicios de docker 

#### **1. Ejercicios teóricos**


#### **Ejercicio 1: Conceptos básicos de Docker**

**Pregunta:**  
Define qué es Docker y explica la diferencia fundamental entre un contenedor Docker y una máquina virtual tradicional.

**Objetivos:**
- Entender la definición y propósito de Docker.
- Diferenciar entre contenedores y máquinas virtuales en términos de virtualización, uso de recursos y rendimiento.


#### **Ejercicio 2: Componentes de Docker**

**Pregunta:**  
Describe los componentes principales de Docker, incluyendo Docker Engine, Docker Hub, Dockerfile y Docker Compose. Explica brevemente la función de cada uno en el flujo de trabajo de desarrollo y despliegue.

**Objetivos:**
- Identificar y comprender los componentes clave de Docker.
- Reconocer cómo cada componente contribuye al ciclo de vida de una aplicación Dockerizada.


#### **Ejercicio 3: Ventajas de Docker en el desarrollo web**

**Pregunta:**  
Enumera y explica al menos cinco ventajas de utilizar Docker en el desarrollo y despliegue de sistemas web. Relaciona cada ventaja con un ejemplo práctico en el contexto de aplicaciones JavaScript o TypeScript.

**Objetivos:**
- Reconocer los beneficios de Docker en términos de portabilidad, consistencia, escalabilidad, etc.
- Aplicar estos beneficios a escenarios reales en el desarrollo web.


#### **Ejercicio 4: Dockerfile y construcción de imágenes**

**Pregunta:**  
Explica qué es un Dockerfile y cuáles son las instrucciones más comunes que se utilizan en él. Describe el proceso que sigue Docker para construir una imagen a partir de un Dockerfile.

**Objetivos:**
- Comprender la estructura y propósito de un Dockerfile.
- Conocer las instrucciones básicas utilizadas en la creación de imágenes Docker.


#### **Ejercicio 5: Docker Compose y orquestación de contenedores**

**Pregunta:**  
¿Qué es Docker Compose y cómo facilita la gestión de aplicaciones multi-contenedor? Proporciona un ejemplo de un archivo `docker-compose.yml` básico para una aplicación web que utiliza un servidor backend en Node.js y una base de datos MongoDB.

**Objetivos:**
- Entender la utilidad de Docker Compose en la orquestación de múltiples contenedores.
- Ser capaz de conceptualizar la configuración básica de servicios interdependientes en Docker Compose.


#### **2. Ejercicios prácticos**

#### **Ejercicio 1: Creación de un Dockerfile para una aplicación Node.js**

**Tarea:**  
Crea un `Dockerfile` para una aplicación sencilla de Node.js que sirva una API REST. La aplicación debe instalar las dependencias, copiar el código fuente y exponer el puerto 3000.

**Pasos a seguir:**
1. Seleccionar una imagen base adecuada (por ejemplo, `node:14-alpine`).
2. Establecer el directorio de trabajo.
3. Copiar los archivos `package.json` y `package-lock.json`.
4. Ejecutar `npm install` para instalar dependencias.
5. Copiar el resto del código fuente al contenedor.
6. Exponer el puerto 3000.
7. Definir el comando para iniciar la aplicación.

**Objetivos:**
- Familiarizarse con la creación de Dockerfiles.
- Comprender cómo se estructuran las aplicaciones Node.js dentro de contenedores Docker.

#### **Ejercicio 2: Uso de Docker Compose para una aplicación Full-Stack**

**Tarea:**  
Configura un archivo `docker-compose.yml` para desplegar una aplicación full-stack que consta de un frontend en React, un backend en Node.js y una base de datos PostgreSQL.

**Pasos a seguir:**
1. Definir servicios para `frontend`, `backend` y `db`.
2. Configurar las imágenes y los contextos de construcción para frontend y backend.
3. Establecer variables de entorno necesarias para cada servicio.
4. Configurar los puertos mapeados para acceder a frontend y backend.
5. Definir volúmenes para la persistencia de datos en PostgreSQL.
6. Establecer dependencias entre los servicios para asegurar el orden de inicio.

**Objetivos:**
- Aprender a orquestar múltiples contenedores utilizando Docker Compose.
- Gestionar configuraciones de red y volúmenes para servicios interdependientes.


#### **Ejercicio 3: Implementación de persistencia de datos con volúmenes Docker**

**Tarea:**  
Modifica el `docker-compose.yml` creado en el Ejercicio 2 para incluir un volumen que persista los datos de la base de datos PostgreSQL entre reinicios de contenedores.

**Pasos a seguir:**
1. Definir un volumen en la sección `volumes` del archivo `docker-compose.yml`.
2. Asociar el volumen definido al servicio `db` para mapearlo al directorio de datos de PostgreSQL.

**Objetivos:**
- Comprender cómo los volúmenes Docker permiten la persistencia de datos.
- Aplicar la configuración de volúmenes en un entorno multi-contenedor.


#### **Ejercicio 4: Escalado de servicios con Docker Compose**

**Tarea:**  
Utiliza Docker Compose para escalar el servicio de backend a tres réplicas. Asegúrate de que todas las réplicas puedan comunicarse correctamente con la base de datos y el frontend.

**Pasos a seguir:**
1. Modificar el archivo `docker-compose.yml` para especificar el número de réplicas para el servicio `backend`.
2. Ejecutar el comando adecuado para escalar el servicio.
3. Verificar que todas las réplicas estén funcionando y accesibles.

**Objetivos:**
- Aprender a escalar servicios utilizando Docker Compose.
- Entender cómo gestionar múltiples instancias de un servicio en un entorno Dockerizado.


#### **Ejercicio 5: Implementación de un pipeline CI/CD con Docker y GitHub Actions**

**Tarea:**  
Configura un pipeline de integración continua y despliegue continuo (CI/CD) utilizando GitHub Actions que construya una imagen Docker de tu aplicación web, la etiquete y la suba a Docker Hub cada vez que se realice un push a la rama `main`.

**Pasos a Seguir:**
1. Crear un archivo de workflow en `.github/workflows/docker-deploy.yml`.
2. Configurar acciones para:
   - Checkout del código fuente.
   - Configurar Node.js.
   - Instalar dependencias y construir la aplicación.
   - Login en Docker Hub utilizando secretos de GitHub.
   - Construir y etiquetar la imagen Docker.
   - Push de la imagen al repositorio de Docker Hub.
3. Probar el pipeline realizando un push a la rama `main` y verificar que la imagen se suba correctamente.

**Objetivos:**
- Integrar Docker en un pipeline de CI/CD.
- Automatizar la construcción y despliegue de imágenes Docker utilizando GitHub Actions.


#### **Ejercicio 6: Seguridad en contenedores Docker**

**Tarea:**  
Asegura tu contenedor Docker ejecutando la aplicación como un usuario no privilegiado en lugar de `root`. Modifica el `Dockerfile` para crear un usuario específico y ejecutar la aplicación con ese usuario.

**Pasos a seguir:**
1. Añadir instrucciones en el `Dockerfile` para crear un grupo y usuario no privilegiado.
2. Cambiar el usuario de ejecución del contenedor a este nuevo usuario.
3. Reconstruir la imagen y ejecutar el contenedor para verificar que la aplicación funcione correctamente bajo el nuevo usuario.

**Objetivos:**
- Implementar prácticas de seguridad en la configuración de contenedores Docker.
- Comprender la importancia de minimizar privilegios en entornos de producción.


#### **Ejercicio 7: Monitoreo de contenedores con Prometheus y Grafana**

**Tarea:**  
Integra herramientas de monitoreo como Prometheus y Grafana en tu entorno Docker Compose para supervisar el rendimiento y el estado de tus servicios web.

**Pasos a Seguir:**
1. Añadir servicios para Prometheus y Grafana en el archivo `docker-compose.yml`.
2. Configurar Prometheus para recopilar métricas de los servicios existentes.
3. Configurar Grafana para visualizar las métricas recopiladas por Prometheus.
4. Acceder a los dashboards de Grafana y verificar la correcta recopilación de métricas.

**Objetivos:**
- Aprender a integrar herramientas de monitoreo en un entorno Dockerizado.
- Visualizar y analizar métricas de rendimiento de aplicaciones y contenedores.

#### **Ejercicio 8: Uso de Docker volumes para almacenar Logs**

**Tarea:**  
Configura un volumen Docker para almacenar los logs generados por tu aplicación web, asegurando que los logs persistan incluso si el contenedor se reinicia o elimina.

**Pasos a seguir:**
1. Definir un volumen en el archivo `docker-compose.yml` para los logs.
2. Configurar la aplicación para escribir los logs en un directorio mapeado al volumen.
3. Verificar que los logs se mantengan persistentes tras reiniciar el contenedor.

**Objetivos:**
- Gestionar el almacenamiento persistente de logs utilizando volúmenes Docker.
- Garantizar la disponibilidad de logs para auditorías y análisis post-mortem.


#### **Ejercicio 9: Despliegue de una aplicación React en producción con Docker**

**Tarea:**  
Construye y despliega una aplicación frontend en React utilizando Docker. Asegúrate de que la aplicación esté optimizada para producción, sirviendo los archivos estáticos a través de un servidor web ligero como Nginx.

**Pasos a Seguir:**
1. Crear un `Dockerfile` multi-etapa:
   - Primera etapa: Construir la aplicación React.
   - Segunda etapa: Utilizar una imagen base de Nginx para servir los archivos estáticos.
2. Configurar Nginx para servir la aplicación correctamente.
3. Construir la imagen Docker y ejecutarla localmente para verificar el despliegue.
4. (Opcional) Subir la imagen a Docker Hub y desplegarla en un servidor remoto.

**Objetivos:**
- Optimizar aplicaciones frontend para producción utilizando Docker.
- Utilizar servidores web eficientes para servir contenido estático desde contenedores Docker.


#### **Ejercicio 10: Implementación de redes personalizadas en Docker Compose**

**Tarea:**  
Crea una red personalizada en tu archivo `docker-compose.yml` para aislar los servicios de tu aplicación web del resto de la red local. Asegúrate de que solo los servicios definidos en la red personalizada puedan comunicarse entre sí.

**Pasos a seguir:**
1. Definir una red personalizada en la sección `networks` del archivo `docker-compose.yml`.
2. Asignar cada servicio a esta red personalizada.
3. Verificar que los servicios pueden comunicarse entre sí a través de la red definida.
4. Intentar acceder a los servicios desde fuera de la red personalizada y confirmar que no es posible.

**Objetivos:**
- Gestionar la comunicación entre contenedores utilizando redes Docker personalizadas.
- Aumentar la seguridad aislando los servicios dentro de una red específica.


#### **Recursos adicionales**

Para facilitar la realización de estos ejercicios, a continuación se proporcionan algunos recursos útiles:

- [Documentación Oficial de Docker](https://docs.docker.com/)
- [Docker Hub](https://hub.docker.com/)
- [Guía de Docker Compose](https://docs.docker.com/compose/)
- [GitHub Actions Documentation](https://docs.github.com/actions)
- [Prometheus y Grafana para Monitoreo](https://prometheus.io/docs/introduction/overview/), [Grafana Docs](https://grafana.com/docs/)
- [Buenas Prácticas de Seguridad en Docker](https://docs.docker.com/engine/security/security/)

