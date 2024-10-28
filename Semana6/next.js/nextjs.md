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
