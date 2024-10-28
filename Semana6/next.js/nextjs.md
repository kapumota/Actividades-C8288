## Estructura básica de un proyecto next.js

Cuando inicias un nuevo proyecto de Next.js, la estructura de archivos por defecto suele ser la siguiente:

```
my-next-app/
├── node_modules/
├── public/
│   ├── favicon.ico
│   └── vercel.svg
├── styles/
│   ├── Home.module.css
│   └── globals.css
├── pages/
│   ├── api/
│   │   └── hello.js
│   ├── _app.js
│   └── index.js
├── .gitignore
├── package.json
├── README.md
└── next.config.js
```

Ahora, vamos a detallar cada uno de estos archivos y directorios.

#### `node_modules/`

Este directorio contiene todas las dependencias y módulos instalados a través de npm o yarn. No es necesario modificar nada aquí manualmente.

#### `public/`

El directorio `public/` es utilizado para servir archivos estáticos como imágenes, fuentes y otros recursos que no necesitan procesamiento adicional.

- **favicon.ico**: El icono que aparece en la pestaña del navegador.
- **vercel.svg**: Un ejemplo de imagen que puedes utilizar en tu aplicación.

Los archivos en `public/` son accesibles desde la raíz del sitio. Por ejemplo, `public/vercel.svg` es accesible en `https://tu-dominio.com/vercel.svg`.

#### `styles/`

Aquí se almacenan los archivos CSS de tu proyecto.

- **globals.css**: Archivo CSS global que se aplica a toda la aplicación.
- **Home.module.css**: Ejemplo de un módulo CSS que es utilizado en componentes específicos. Next.js soporta CSS Modules de forma nativa.

#### `pages/`

Este es uno de los directorios más importantes en Next.js. Cada archivo JavaScript (`.js`), TypeScript (`.ts`) o MDX (`.mdx`) en este directorio se convierte en una ruta.

#### Rutas de página

- **index.js**: La página principal de tu aplicación, accesible en la ruta `/`.
- **about.js**: Si creas este archivo, sería accesible en `/about`.

#### Subdirectorios

Puedes crear subdirectorios para anidar rutas:

```
pages/
└── blog/
    ├── index.js      // Accesible en /blog
    └── [slug].js     // Ruta dinámica, accesible en /blog/tu-slug
```

#### Rutas dinámicas

- **[slug].js**: Los corchetes indican una ruta dinámica. Por ejemplo, `/posts/[id].js` responderá a rutas como `/posts/1`, `/posts/2`, etc.

#### `api/` - rutas API

El subdirectorio `api/` dentro de `pages/` es para crear API endpoints sin necesidad de configurar un servidor separado.

- **api/hello.js**: Un endpoint de ejemplo que responde a `/api/hello`.

#### Archivos especiales

- **\_app.js**: Personaliza el componente raíz que envuelve todas las páginas. Útil para añadir proveedores de contexto, estilos globales, etc.
- **\_document.js**: Personaliza el documento HTML que se sirve al cliente. Aquí puedes modificar el `<html>`, `<head>` y `<body>`.

### Archivos de configuración y metadatos

#### `.gitignore`

Lista de archivos y directorios que Git debe ignorar.

#### `package.json`

Contiene información sobre el proyecto y las dependencias. Incluye scripts útiles:

- **scripts**:
  - **dev**: Inicia el servidor de desarrollo.
  - **build**: Compila la aplicación para producción.
  - **start**: Inicia el servidor en producción.
  - **lint**: Ejecuta el linter en el código.

#### `README.md`

Archivo de documentación donde puedes describir tu proyecto.

#### `next.config.js`

Archivo de configuración para personalizar el comportamiento de Next.js.

### Otros directorios y archivos (opcionales)

#### `components/`

Aunque no está creado por defecto, es común tener un directorio `components/` para almacenar componentes reutilizables.

```
components/
├── Header.js
├── Footer.js
└── Layout.js
```

#### `public/robots.txt` y `public/sitemap.xml`

Para SEO, puedes incluir estos archivos en `public/`:

- **robots.txt**: Indica a los motores de búsqueda qué páginas rastrear.
- **sitemap.xml**: Proporciona una lista de URLs para ayudar a los motores de búsqueda a indexar tu sitio.

#### `lib/`

Para funciones auxiliares y código que no encaja en `components/` o `pages/`.

```
lib/
└── api.js
```

#### `middleware/`

Next.js soporta middlewares que se ejecutan antes de que se resuelva una solicitud.

```
middleware.js
```

### Configuración avanzada

#### `next-env.d.ts`

Si utilizas TypeScript, este archivo es generado automáticamente y asegura que los tipos de Next.js sean reconocidos.

#### `jsconfig.json` o `tsconfig.json`

Permite configurar opciones de compilación y alias de ruta.

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/components/*": ["components/*"],
      "@/pages/*": ["pages/*"]
    }
  }
}
```

#### `babel.config.js` o `.babelrc`

Si necesitas personalizar la configuración de Babel.

#### `postcss.config.js`

Para configurar PostCSS si estás utilizando Tailwind CSS u otros plugins de PostCSS.

### Estructura recomendada para escalabilidad

A medida que tu proyecto crece, es útil organizar tu código de manera más estructurada.

```
src/
├── components/
│   ├── ui/
│   └── layout/
├── pages/
├── styles/
├── lib/
├── hooks/
├── context/
└── utils/
```

- **components/**: Componentes reutilizables.
  - **ui/**: Componentes de interfaz de usuario básicos.
  - **layout/**: Componentes relacionados con la disposición general de las páginas.
- **pages/**: Mantiene su función original.
- **styles/**: Archivos de estilo, CSS Modules o archivos SCSS.
- **lib/**: Código compartido como llamadas a APIs externas.
- **hooks/**: Custom Hooks de React.
- **context/**: Proveedores de contexto para manejar estados globales.
- **utils/**: Funciones utilitarias y helpers.

#### Ejemplo detallado de una página

Supongamos que tienes `pages/blog/[slug].js`. Este archivo podría verse así:

```jsx
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import { getPostData } from '@/lib/posts';

export default function Post({ postData }) {
  const router = useRouter();

  // Muestra un estado de carga si la ruta aún no está lista
  if (router.isFallback) {
    return <div>Cargando...</div>;
  }

  return (
    <Layout>
      <article>
        <h1>{postData.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds(); // Función que obtiene todos los IDs de posts
  return {
    paths,
    fallback: true, // o false o 'blocking' dependiendo de tus necesidades
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.slug);
  return {
    props: {
      postData,
    },
  };
}
```

#### Explicación

- **useRouter**: Hook de Next.js para acceder al router.
- **getStaticPaths**: Necesario para generar rutas dinámicas estáticas.
- **getStaticProps**: Obtiene los datos necesarios para renderizar la página.

#### Archivos de estilos

Puedes utilizar CSS Modules para estilos locales:

```css
/* styles/Home.module.css */
.container {
  padding: 0 2rem;
}

.title {
  color: #0070f3;
}
```

Y en tu componente:

```jsx
import styles from '@/styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Bienvenido a Next.js</h1>
    </div>
  );
}
```

#### Uso de imágenes

Next.js proporciona un componente `next/image` para optimizar imágenes automáticamente.

```jsx
import Image from 'next/image';

export default function Avatar() {
  return (
    <Image
      src="/me.png"
      alt="Mi Avatar"
      width={500}
      height={500}
    />
  );
}
```

#### Configuración del servidor y entorno

Puedes definir variables de entorno en archivos `.env.local`, `.env.development` y `.env.production`.

```env
# .env.local
API_KEY=tu_api_key
```

Y acceder a ellas en tu código:

```jsx
const apiKey = process.env.API_KEY;
```

#### `next.config.js` avanzado

Puedes personalizar el comportamiento de Next.js:

```js
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['example.com'],
  },
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
  },
};
```

- **reactStrictMode**: Activa las comprobaciones estrictas de React.
- **images.domains**: Permite cargar imágenes de dominios externos.
- **i18n**: Configura internacionalización.

¡Claro! A continuación, te guiaré paso a paso para crear una aplicación básica con Next.js, explorando la estructura de archivos y entendiendo cómo funciona cada parte. Esta actividad te ayudará a consolidar los conceptos previamente explicados.

---

### **Creando una aplicación con next.js**

#### **Requisitos previos**

- **Node.js** instalado (versión 12.22.0 o superior)
- **npm** o **yarn** como gestor de paquetes
- Conocimientos básicos de **JavaScript** y **React**

#### **Paso 1: Crear un nuevo proyecto next.js**

Utiliza el comando `create-next-app` para generar un nuevo proyecto:

```bash
npx create-next-app my-next-app
# O con yarn
yarn create next-app my-next-app
```

Este comando creará una carpeta llamada `my-next-app` con la estructura básica de un proyecto Next.js.

#### **Paso 2: Navegar al directorio del proyecto**

```bash
cd my-next-app
```

#### **Paso 3: Ejecutar el servidor de desarrollo**

Inicia el servidor de desarrollo para ver la aplicación en funcionamiento:

```bash
npm run dev
# O con yarn
yarn dev
```

Abre tu navegador y visita `http://localhost:3000`. Verás la página de inicio por defecto de Next.js.

#### **Paso 4: Explorar la estructura de archivos**

Abre el proyecto en tu editor de código preferido (por ejemplo, Visual Studio Code). Observa los siguientes directorios y archivos:

- **pages/**
- **public/**
- **styles/**
- **package.json**
- **next.config.js** (si existe)

#### **Paso 5: Modificar la página principal**

Abre `pages/index.js` y modifica el contenido para personalizar la página de inicio.

```jsx
// pages/index.js
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Mi Primera Aplicación Next.js</title>
        <meta name="description" content="Aplicación creada con Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          ¡Bienvenido a mi aplicación Next.js!
        </h1>
      </main>
    </div>
  );
}
```

Guarda los cambios y observa cómo se actualiza la página en el navegador.

#### **Paso 6: Añadir una nueva página**

Crea un archivo llamado `about.js` en el directorio `pages/`.

```jsx
// pages/about.js
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function About() {
  return (
    <div className={styles.container}>
      <h1>Acerca de Nosotros</h1>
      <p>Esta es la página "Acerca de".</p>
      <Link href="/">Volver al Inicio</Link>
    </div>
  );
}
```

Ahora, navega a `http://localhost:3000/about` para ver la nueva página.

#### **Paso 7: Crear un componente reutilizable**

Crea un directorio `components/` en la raíz del proyecto y añade un archivo `NavBar.js`.

```jsx
// components/NavBar.js
import Link from 'next/link';
import styles from './NavBar.module.css';

export default function NavBar() {
  return (
    <nav className={styles.nav}>
      <Link href="/">Inicio</Link>
      <Link href="/about">Acerca de</Link>
    </nav>
  );
}
```

Crea también un archivo de estilos para la barra de navegación:

```css
/* components/NavBar.module.css */
.nav {
  background-color: #333;
  padding: 1rem;
}

.nav a {
  color: #fff;
  margin-right: 1rem;
  text-decoration: none;
}

.nav a:hover {
  text-decoration: underline;
}
```

### **Paso 8: Integrar el Componente NavBar**

Importa y utiliza `NavBar` en `pages/index.js` y `pages/about.js`.

```jsx
// Ejemplo en pages/index.js
import NavBar from '../components/NavBar';

export default function Home() {
  return (
    <div>
      <NavBar />
      {/* Resto del contenido */}
    </div>
  );
}
```

Haz lo mismo en `about.js`.

#### **Paso 9: Crear una ruta dinámica**

Crea un archivo `[id].js` dentro de `pages/posts/`.

```jsx
// pages/posts/[id].js
import { useRouter } from 'next/router';
import NavBar from '../../components/NavBar';

export default function Post() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <NavBar />
      <h1>Post {id}</h1>
    </div>
  );
}
```

Visita `http://localhost:3000/posts/1` y verás "Post 1".

#### **Paso 10: Implementar getStaticPaths y getStaticProps**

Para pre-renderizar páginas dinámicas, utiliza `getStaticPaths` y `getStaticProps`.

```jsx
// pages/posts/[id].js
export async function getStaticPaths() {
  const paths = [{ params: { id: '1' } }, { params: { id: '2' } }];
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  return {
    props: {
      id: params.id,
    },
  };
}

export default function Post({ id }) {
  return (
    <div>
      <NavBar />
      <h1>Post {id}</h1>
    </div>
  );
}
```

#### **Paso 11: Añadir una API Route**

Crea un endpoint de API en `pages/api/hello.js`.

```jsx
// pages/api/hello.js
export default function handler(req, res) {
  res.status(200).json({ message: 'Hola desde la API' });
}
```

Visita `http://localhost:3000/api/hello` para ver el mensaje JSON.

#### **Paso 12: Consumir la API en el cliente**

Utiliza `fetch` para obtener datos desde la API.

```jsx
// pages/index.js
import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';

export default function Home() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/hello')
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <div>
      <NavBar />
      <h1>{message}</h1>
    </div>
  );
}
```

#### **Paso 13: Añadir estilos globales**

Crea o modifica `styles/globals.css`.

```css
/* styles/globals.css */
body {
  margin: 0;
  font-family: Arial, sans-serif;
}
```

Asegúrate de importar este archivo en `pages/_app.js`.

```jsx
// pages/_app.js
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

#### **Paso 14: Configurar variables de entorno**

Crea un archivo `.env.local` en la raíz del proyecto.

```env
API_URL=http://localhost:3000/api
```

Utiliza la variable de entorno en tu código.

```jsx
// pages/index.js
useEffect(() => {
  fetch(`${process.env.API_URL}/hello`)
    .then((res) => res.json())
    .then((data) => setMessage(data.message));
}, []);
```

#### **Paso 15: Optimizar imágenes**

Añade una imagen a tu proyecto en `public/` y utiliza el componente `Image`.

```jsx
// pages/index.js
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <NavBar />
      <h1>Bienvenido</h1>
      <Image src="/mi-imagen.jpg" alt="Mi Imagen" width={500} height={300} />
    </div>
  );
}
```

#### **Paso 16: Configurar el archivo next.config.js**

Si necesitas configurar Next.js, crea o modifica `next.config.js`.

```js
// next.config.js
module.exports = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
  },
};
```

#### **Paso 17: Preparar para producción**

Construye la aplicación para producción.

```bash
npm run build
# O con yarn
yarn build
```

Inicia el servidor en modo producción.

```bash
npm start
# O con yarn
yarn start
```

#### **Paso 18: Desplegar la aplicación**

Considera desplegar tu aplicación en Vercel.

1. **Regístrate en Vercel**: [vercel.com](https://vercel.com/)
2. **Conecta tu Repositorio**: Sigue las instrucciones para conectar tu repositorio de GitHub, GitLab o Bitbucket.
3. **Despliega**: Vercel detectará automáticamente que es un proyecto Next.js y configurará todo por ti.

#### **Paso 19: Añadir soporte para TypeScript (opcional)**

Si prefieres usar TypeScript, puedes agregar soporte fácilmente.

```bash
touch tsconfig.json
npm install --save-dev typescript @types/react @types/node
```

Renombra tus archivos `.js` a `.tsx` y reinicia el servidor de desarrollo.

#### **Paso 20: Explorar funcionalidades avanzadas**

- **Internacionalización (i18n)**: Configura múltiples idiomas en tu aplicación.
- **Middlewares**: Implementa middlewares para tareas como autenticación.
- **Incremental Static Regeneration (ISR)**: Actualiza contenido estático después de la compilación.

