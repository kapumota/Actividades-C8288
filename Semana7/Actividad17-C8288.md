### **Actividad 17: Comprendiendo y implementando OAuth**

#### **Objetivo**
Entender los conceptos fundamentales de OAuth, distinguir entre autenticación y autorización, y aprender a implementar el flujo de código de autorización mediante un ejemplo práctico utilizando cURL. Además, explorar la creación y firma de tokens JWT.

#### **Requisitos previos**
- Conocimientos básicos de **HTTP** y **REST APIs**.
- Familiaridad con **cURL** y la línea de comandos.
- Conocimientos básicos de **JSON**.
- Entender conceptos básicos de **seguridad web**.

#### **Contenido de la actividad**
1. **Autenticación vs. autorización**
2. **El papel de OAuth**
3. **Tipos de grants en OAuth**
4. **Bearer tokens**
5. **El flujo de código de autorización**
6. **Creación de un token JWT**
7. **Firma de tokens JWT**
8. **Ejemplo práctico: acceso a un recurso ´rotegido**
9. **Buenas prácticas**

---

#### **1. Autenticación vs. autorización**

#### **Autenticación**
La **autenticación** es el proceso de verificar la identidad de un usuario o entidad. En otras palabras, es confirmar que alguien es quien dice ser. Por ejemplo, cuando inicias sesión en una aplicación con tu nombre de usuario y contraseña, estás pasando por un proceso de autenticación.

#### **Autorización**
La **autorización**, por otro lado, es el proceso de determinar si una entidad autenticada tiene permiso para realizar una acción específica o acceder a ciertos recursos. Por ejemplo, después de iniciar sesión (autenticación), la aplicación decide si tienes permiso para acceder a ciertos datos o funcionalidades (autorización).

#### **2. El papel de OAuth**

**OAuth** es un protocolo estándar abierto para autorización, que permite que aplicaciones de terceros obtengan acceso limitado a un servicio HTTP, ya sea en nombre de un propietario de recurso o de sí mismo. OAuth no gestiona la autenticación de usuarios directamente, sino que se enfoca en la autorización segura y delegada.

#### **ventajas de usar OAuth:**
- **Seguridad mejorada:** Los usuarios no comparten sus credenciales directamente con las aplicaciones de terceros.
- **Control de acceso:** Los usuarios pueden otorgar permisos específicos y revocar el acceso cuando lo deseen.
- **Escalabilidad:** Facilita la integración con múltiples servicios y proveedores.

#### **3. Tipos de grants en OAuth**

En OAuth 2.0, un **grant** es un método por el cual un cliente obtiene un token de acceso. Los tipos principales de grants son:

1. **Authorization code grant:** Utilizado principalmente por aplicaciones web del lado del servidor.
2. **Implicit grant:** Diseñado para aplicaciones de cliente públicas, como aplicaciones móviles o de una sola página (SPA).
3. **Resource owner password credentials grant:** Utilizado cuando el propietario del recurso confía plenamente en la aplicación.
4. **Client credentials grant:** Utilizado para aplicaciones que acceden a sus propios recursos, no en nombre de un usuario.

**En esta actividad, nos enfocaremos en el *Authorization Code Grant*.**

#### **4. Bearer Tokens**

Un **Bearer Token** es un tipo de token de acceso que no contiene información incorporada y cuya posesión da al portador acceso a ciertos recursos. Es decir, cualquier entidad que posea el token puede usarlo para acceder a los recursos protegidos.

#### **Características:**
- **Simplicidad:** No requiere manejo de información adicional.
- **Riesgo de seguridad:** Si un token es interceptado, puede ser usado por terceros no autorizados.
- **Uso común:** Amplamente utilizado en OAuth 2.0 para autorizar solicitudes de API.

#### **5. El flujo de código de autorización**

El **authorization code flow** es un proceso de OAuth 2.0 diseñado para aplicaciones que pueden mantener la confidencialidad de un secreto de cliente, como aplicaciones del lado del servidor.

#### **Pasos del flujo:**
1. **Solicitud de autorización:** La aplicación redirige al usuario al servidor de autorización.
2. **Consentimiento del usuario:** El usuario concede permisos a la aplicación.
3. **Recepción del código de autorización:** El servidor de autorización redirige al usuario de vuelta a la aplicación con un código.
4. **Intercambio del código por un token de acceso:** La aplicación usa el código para solicitar un token de acceso al servidor de token.
5. **Acceso a recursos protegidos:** La aplicación usa el token para acceder a los recursos protegidos en nombre del usuario.


#### **6. Creación de un Token JWT**

**JWT (JSON Web Token)** es un estándar abierto para transmitir información segura entre partes como un objeto JSON. Los JWTs pueden ser firmados usando un secreto (con el algoritmo HMAC) o un par de claves pública/privada (con RSA o ECDSA).

### **Estructura de un JWT:**
1. **Header (Encabezado):** Contiene el tipo de token y el algoritmo de firma.
2. **Payload (Carga útil):** Contiene las reclamaciones, que son declaraciones sobre una entidad (generalmente el usuario) y datos adicionales.
3. **Signature (Firma):** Es la firma digital que verifica que el emisor del token es quien dice ser y que el mensaje no ha sido alterado.

**Formato:**
```
xxxxx.yyyyy.zzzzz
```

Donde:
- `xxxxx` es la parte codificada del encabezado.
- `yyyyy` es la parte codificada de la carga útil.
- `zzzzz` es la firma.

#### **7. Firma de Tokens JWT**

La **firma** en un JWT asegura que el token no ha sido alterado y que proviene de una fuente confiable. Dependiendo del algoritmo utilizado, la firma puede ser creada usando un secreto compartido o una clave privada.

### **Algoritmos comunes:**
- **HS256:** HMAC con SHA-256 (clave secreta compartida).
- **RS256:** RSA con SHA-256 (clave pública/privada).

#### **Proceso de firma:**
1. **Crear el header y payload.**
2. **Codificar en Base64Url.**
3. **Generar la firma usando el algoritmo especificado y la clave correspondiente.**
4. **Concatenar las partes para formar el JWT completo.**


#### **8. Ejemplo práctico: acceso a un recurso protegido**

A continuación, se presenta un ejemplo práctico que ilustra el uso de OAuth para acceder a un recurso protegido utilizando el flujo de código de autorización.

#### **Descripción del ejemplo**

Intentaremos acceder a un recurso protegido alojado por un servidor OAuth en `https://www.usemodernfullstack.dev/protected/resource`. El proceso incluye:

1. **Acceso sin token de acceso (esperando un 401).**
2. **Configuración del cliente OAuth.**
3. **Inicio de sesión y recepción del código de autorización.**
4. **Intercambio del código por un token de acceso.**
5. **Acceso al recurso protegido con el token de acceso.**

#### **Paso a paso**

#### **Acceso al recurso protegido sin token de acceso**

Intenta acceder al recurso protegido sin un token de acceso para ver la respuesta inicial.

```bash
$ curl -i \
    -X GET 'https://www.usemodernfullstack.dev/protected/resource' \
    -H 'Accept: text/html'
```

**Respuesta esperada:**
```
HTTP/2 401
Content-Type: text/html; charset=utf-8

<h1>Unauthorized request: no authentication given</h1>
```

Esto indica que el acceso está restringido y se requiere un token de acceso válido.

#### **Configuración del cliente OAuth**

Antes de poder obtener un token de acceso, necesitamos configurar un cliente OAuth.

1. **Crear una cuenta de usuario:**
   - Navega a [https://www.usemodernfullstack.dev/register](https://www.usemodernfullstack.dev/register) en tu navegador.
   - Completa el formulario con un nombre de usuario y contraseña de tu elección.

2. **Registrar un cliente OAuth:**
   - Proporciona una URL de callback. Para este ejercicio, puedes usar `http://localhost:3000/oauth/callback`.
   - Anota el **ID de Cliente** y el **Secreto de Cliente** que recibirás tras el registro.

**Nota:** La URL de callback no necesita existir realmente para este ejercicio, ya que no estaremos enviando datos reales a ella.

#### **Iniciar Sesión para Recibir el Permiso de Autorización**

Utilizaremos el flujo de código de autorización para obtener un **código de autorización**.

```bash
$ curl -i \
    -X POST 'https://www.usemodernfullstack.dev/oauth/authenticate' \
    -H 'Accept: text/html' \
    -H 'Content-Type: application/x-www-form-urlencoded' \
    -d "response_type=code\
&client_id=<OAUTH_CLIENT_ID>\
&state=4nBjkh31\
&scope=read\
&redirect_uri=http://localhost:3000/oauth/callback\
&username=<OAUTH_USER>\
&password=<OAUTH_PASSWORD>"
```

**Reemplaza los siguientes placeholders:**
- `<OAUTH_CLIENT_ID>`: ID de cliente obtenido al registrar el cliente OAuth.
- `<OAUTH_USER>`: Nombre de usuario registrado.
- `<OAUTH_PASSWORD>`: Contraseña registrada.

**Respuesta esperada:**
```
HTTP/2 302
Content-Type: text/html; charset=utf-8
location: http://localhost:3000/oauth/callback?code=<AUTHORIZATION_GRANT>&state=4nBjkh31
```

Esta respuesta indica una redirección a la URL de callback con un **código de autorización** y el parámetro `state` para mitigar ataques CSRF.

#### ** Intercambio del código de autorización por un token de acceso**

Con el **Código de autorización** obtenido, solicitaremos un **token de acceso**.

```bash
$ curl -i \
    -X POST 'https://www.usemodernfullstack.dev/oauth/access_token' \
    -H 'Accept: text/html, application/json' \
    -H 'Content-Type: application/x-www-form-urlencoded' \
    -d "code=<AUTHORIZATION_GRANT>\
&grant_type=authorization_code\
&redirect_uri=http://localhost:3000/oauth/callback\
&client_id=<OAUTH_CLIENT_ID>\
&client_secret=<OAUTH_CLIENT_SECRET>"
```

**Reemplaza los siguientes placeholders:**
- `<AUTHORIZATION_GRANT>`: Código de autorización recibido en el paso anterior.
- `<OAUTH_CLIENT_ID>`: ID de cliente.
- `<OAUTH_CLIENT_SECRET>`: Secreto de cliente.

**Respuesta esperada:**
```json
HTTP/2 200 OK
Content-Type: application/json; charset=utf-8

{
    "access_token":"9bd55e2acf046128a54b76eada1ea6e0f909ca53",
    "token_type":"Bearer",
    "expires_in":3599,
    "refresh_token":"79a22d2b37c635a6095f5548ca08ea632deae573",
    "scope":"read"
}
```

Este JSON contiene el **token de acceso** necesario para acceder al recurso protegido.

#### Acceso al recurso protegido con el token de acceso**

Finalmente, utilizaremos el **token de acceso** para acceder al recurso protegido.

```bash
$ curl -i \
    -X GET 'https://www.usemodernfullstack.dev/protected/resource' \
    -H 'Accept: text/html' \
    -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

**Reemplaza el siguiente placeholder:**
- `<ACCESS_TOKEN>`: Token de acceso obtenido en el paso anterior.

**Respuesta esperada:**
```
HTTP/2 200 OK
Content-Type: text/html; charset=utf-8

<h1>This page is secured.</h1>
```

Esta respuesta confirma que el acceso al recurso protegido ha sido exitoso utilizando el **token de acceso** válido.


#### **9. Buenas prácticas**

#### **Buenas prácticas:**
- **Mantener seguras las credenciales:** Nunca expongas el **secreto de cliente** en el frontend o repositorios públicos.
- **Validar el parámetro `state`:** Siempre verifica el parámetro `state` para proteger contra ataques CSRF.
- **Usar HTTPS:** Asegúrate de que todas las comunicaciones se realicen a través de HTTPS para proteger los tokens.
- **Manejar la expiración de tokens:** Implementa mecanismos para renovar tokens de acceso utilizando los **refresh tokens**.
- **Almacenar tokens de forma segura:** Guarda los tokens de acceso en lugares seguros, evitando almacenamiento en lugares vulnerables como el almacenamiento local del navegador.

#### **Consideraciones de seguridad:**
- **Rotación de claves:** Cambia periódicamente las claves utilizadas para firmar tokens JWT.
- **Revocación de tokens:** Implementa la capacidad de revocar tokens comprometidos.
- **Scopes adecuados:** Solicita únicamente los permisos necesarios para minimizar el riesgo en caso de que un token sea comprometido.

### Ejercicios

#### **Ejercicio 1: Autenticación vs. autorización**

#### **Objetivo**
Distinguir claramente entre los conceptos de autenticación y autorización mediante el análisis de situaciones prácticas.

#### **Tareas**

1. **Análisis de escenarios:**
   - Piensa en tres situaciones cotidianas (pueden ser digitales o del mundo real) donde se apliquen los conceptos de autenticación y autorización.
   - Para cada situación, identifica qué parte corresponde a la autenticación y cuál a la autorización.
   
2. **Preguntas:**
   - ¿Por qué es importante realizar ambos procesos (autenticación y autorización) en aplicaciones que manejan información sensible?
   - ¿Qué podría suceder si una aplicación realiza la autenticación pero no una correcta autorización?

3. **Comparación y contraste:**
   - Elabora un cuadro comparativo que destaque las diferencias clave entre autenticación y autorización.
   - Incluye ejemplos de métodos o mecanismos utilizados comúnmente en cada proceso.

#### **Preguntas**

- ¿Cómo afecta la seguridad de una aplicación si se confunden los procesos de autenticación y autorización?
- ¿Puedes pensar en un caso donde un usuario esté autenticado pero no autorizado para realizar cierta acción? Describe ese caso.


#### **Ejercicio 2: El papel de OAuth**

#### **Objetivo**
Comprender el propósito y las ventajas de utilizar OAuth en aplicaciones modernas.

#### **Tareas**

1. **Descripción en tus propias palabras:**
   - Explica qué es OAuth y cuál es su principal función en la gestión de acceso a recursos protegidos.
   
2. **Ventajas de OAuth:**
   - Enumera y explica al menos tres ventajas de utilizar OAuth en comparación con otros métodos de autorización.
   
3. **Casos de uso:**
   - Identifica dos aplicaciones o servicios populares que utilicen OAuth.
   - Describe cómo estas aplicaciones implementan OAuth para permitir el acceso a terceros.

#### **Preguntas**

- ¿Por qué OAuth es preferido en escenarios donde se necesita acceso delegado a recursos?
- ¿Cómo mejora OAuth la experiencia del usuario en comparación con solicitar credenciales directamente?

#### **Ejercicio 3: Tipos de grants en OAuth**

#### **Objetivo**
Diferenciar entre los distintos tipos de grants en OAuth y determinar cuándo es apropiado utilizar cada uno.

#### **Tareas**

1. **Definición y aplicación:**
   - Para cada tipo de grant mencionado, proporciona una breve descripción y un ejemplo de una situación donde sería el más adecuado.
     - **Authorization code grant**
     - **Implicit grant**
     - **Resource owner password credentials grant**
     - **Client credentials grant**

2. **Análisis de casos:**
   - Dado el siguiente escenario: Una aplicación web del lado del servidor que necesita acceder a recursos protegidos en nombre de un usuario. ¿Qué tipo de grant sería el más apropiado y por qué?
   - ¿Por qué el Implicit Grant es menos seguro y se desaconseja su uso en aplicaciones modernas?

3. **Comparación de seguridad:**
   - Ordena los tipos de grants de mayor a menor nivel de seguridad y justifica tu clasificación.

#### **Preguntas**

- ¿Qué factores considerarías al elegir un tipo de grant para tu aplicación?
- ¿Cómo influye el entorno (aplicación móvil, web, servidor) en la elección del grant?

#### **Ejercicio 4: Bearer tokens**

#### **Objetivo**
Entender qué son los bearer tokens y las implicaciones de seguridad asociadas con su uso.

#### **Tareas**

1. **Definición y características:**
   - Explica qué es un bearer token y cómo funciona en el contexto de OAuth.
   - Describe por qué los bearer tokens se consideran sencillos de usar.

2. **Riesgos de seguridad:**
   - Identifica y explica al menos dos riesgos de seguridad asociados con el uso de bearer tokens.
   - Sugiere medidas para mitigar estos riesgos en una aplicación.

3. **Mejores prácticas:**
   - Enumera las mejores prácticas para manejar y almacenar bearer tokens de forma segura.

#### **Preguntas**

- ¿Qué podría suceder si un bearer token es interceptado por una tercera parte malintencionada?
- ¿Por qué es crucial utilizar HTTPS cuando se transmiten bearer tokens?

#### **Ejercicio 5: El flujo de código de autorización**

#### **Objetivo**
Comprender los pasos y componentes involucrados en el flujo de código de autorización en OAuth 2.0.

#### **Tareas**

1. **Desglose de pasos:**
   - Para cada paso del flujo de código de autorización, explica detalladamente qué ocurre y quiénes son los actores involucrados.
     - Solicitud de autorización
     - Consentimiento del usuario
     - Recepción del código de autorización
     - Intercambio del código por un token de acceso
     - Acceso a recursos protegidos

2. **Roles y responsabilidades:**
   - Identifica y describe los roles del cliente, el propietario del recurso, el servidor de autorización y el servidor de recursos en este flujo.

3. **Diagrama de flujo:**
   - Dibuja un diagrama que represente visualmente el flujo de código de autorización, mostrando las interacciones entre los diferentes componentes.

#### **Preguntas de reflexión**

- ¿Por qué es más seguro el flujo de código de autorización para aplicaciones del lado del servidor?
- ¿Cómo ayuda el uso de un código de autorización a proteger el secreto de cliente?


#### **Ejercicio 6: Creación de un token JWT**

#### **Objetivo**
Familiarizarse con la estructura y propósito de los tokens JWT en la transmisión de información segura.

#### **Tareas**

1. **Componentes de un JWT:**
   - Describe detalladamente cada una de las tres partes de un JWT: Header, Payload y Signature.
   - Explica qué tipo de información se incluye comúnmente en el payload.

2. **Proceso de codificación:**
   - Explica cómo se codifican el header y el payload utilizando Base64Url.
   - Discute por qué se utiliza Base64Url en lugar de Base64 estándar.

3. **Ventajas de usar JWT:**
   - Enumera y explica al menos tres ventajas de utilizar JWT para transmitir información entre partes.

#### **Preguntas**

- ¿Cómo garantiza un JWT la integridad de los datos que contiene?
- ¿Qué consideraciones de seguridad deben tenerse en cuenta al incluir información en el payload de un JWT?

#### **Ejercicio 7: Firma de tokens JWT**

#### **Objetivo**
Entender la importancia de la firma en los tokens JWT y cómo se asegura su autenticidad.

#### **Tareas**

1. **Importancia de la firma:**
   - Explica por qué es crucial firmar un JWT y qué riesgos existen si un JWT no está firmado.

2. **Algoritmos de firma:**
   - Compara los algoritmos HS256 y RS256 en términos de mecanismos de firma y seguridad.
   - Indica escenarios en los que sería más apropiado usar uno u otro.

3. **Proceso de verificación:**
   - Describe cómo un receptor de un JWT verifica la firma y la autenticidad del token.

#### **Preguntas**

- ¿Qué podría ocurrir si una aplicación no verifica correctamente la firma de un JWT recibido?
- ¿Cómo afectan las claves comprometidas a la seguridad de los tokens JWT firmados?

#### **Ejercicio 8: Ejemplo práctico de acceso a un recurso protegido**

#### **Objetivo**
Aplicar los conceptos aprendidos para analizar el proceso de obtención de acceso a un recurso protegido utilizando OAuth.

#### **Tareas**

1. **Secuencia de eventos:**
   - Describe paso a paso lo que ocurre desde que un usuario intenta acceder al recurso protegido hasta que obtiene acceso exitoso.
   - Incluye las interacciones con el servidor OAuth y el manejo de tokens.

2. **Análisis de respuestas HTTP:**
   - Explica el significado de los códigos de estado HTTP recibidos en cada etapa (por ejemplo, 401, 302, 200).
   - Discute cómo estos códigos indican el progreso y éxito de las solicitudes.

3. **Rol del parámetro `state`:**
   - Explica la función del parámetro `state` en el proceso de autorización.
   - Describe cómo ayuda a proteger contra ataques CSRF.

#### **Preguntas**

- ¿Por qué es importante intercambiar el código de autorización por un token de acceso en lugar de recibir el token directamente?
- ¿Qué ventajas ofrece realizar este proceso manualmente en términos de comprensión del flujo de OAuth?


#### **Ejercicio 9: Buenas prácticas y consideraciones de seguridad**

#### **Objetivo**
Identificar las mejores prácticas y consideraciones de seguridad al implementar OAuth y manejar tokens.

#### **Tareas**

1. **Listar buenas prácticas:**
   - Elabora una lista detallada de las buenas prácticas mencionadas en la actividad, explicando por qué cada una es importante.

2. **Escenarios de riesgo:**
   - Imagina una situación donde un desarrollador almacena el secreto de cliente en el código fuente público. Analiza los riesgos y propone soluciones.

3. **Gestión de tokens:**
   - Discute cómo debería manejar una aplicación la expiración de tokens de acceso y la utilización de refresh tokens.

4. **Almacenamiento seguro:**
   - Propón métodos seguros para almacenar tokens de acceso en aplicaciones móviles y web.

#### **Preguntas de reflexión**

- ¿Cómo contribuye el uso de scopes adecuados a minimizar riesgos en caso de compromisos de seguridad?
- ¿Por qué es esencial utilizar HTTPS en todas las comunicaciones que involucran tokens?

