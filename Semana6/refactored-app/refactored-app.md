## Actividad 11: Refactorización de aplicaciones Express.js y React a Next.js 

### **Estructura del Proyecto**

Tienes la siguiente estructura de proyecto:

```
my-next-app/
├── .next/
├── node_modules/
├── public/
│   ├── file (HTML)
│   ├── globe (HTML)
│   ├── next (HTML)
│   ├── vercel (HTML)
│   ├── window (HTML)
├── src/
│   └── app/
│       ├── favicon.ico
│       ├── fonts/
│       │   ├── GeistMonoVF.woff
│       │   └── GeistVF.woff
│       ├── globals.css
│       ├── layout.tsx
│       ├── page.module.css
│       └── page.tsx
├── .eslintrc.json
├── .gitignore
├── next-env.d.ts
├── next.config.ts
├── package.json
├── README.md
└── tsconfig.json
```

Esta estructura corresponde a una aplicación Next.js que utiliza el **directorio `app/`**, introducido en Next.js 13 para aprovechar el **App Router**.


#### **Objetivo**

- **Refactorizar** las aplicaciones React y Express.js en una aplicación Next.js utilizando la estructura existente.
- **Crear** rutas de API y páginas dentro del directorio `app/`.
- **Mantener** las funcionalidades originales:
  - Ruta de API: `api/names` que devuelve nombres de usuario.
  - Ruta de API dinámica: `api/weather/[zipcode]` que devuelve información del clima.
  - Página `/hello`.
  - Página `/components/weather`.


### **Pasos para integrar las funcionalidades en la estructura existente**

#### **1. Almacenar interfaces y tipos personalizados**

Crearemos un archivo `custom.d.ts` en la raíz del proyecto (`my-next-app/`) para almacenar las definiciones de tipos.

**Archivo:** `my-next-app/custom.d.ts`

```typescript
interface WeatherProps {
  weather: string;
}

type WeatherDetailType = {
  zipcode: string;
  weather: string;
  temp?: number;
};

type ResponseItemType = {
  id: string;
  name: string;
};
```

**Nota:** Asegúrate de que el archivo `custom.d.ts` sea reconocido por TypeScript. Si es necesario, ajusta el `tsconfig.json` para incluirlo:

```json
{
  "compilerOptions": {
    // ... otras configuraciones
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", "custom.d.ts"],
  "exclude": ["node_modules"]
}
```

#### **2. Creando las Rutas de API en el Directorio `app/`**

En Next.js 13 con el App Router, las rutas de API se crean dentro del directorio `app/api/`.

#### **a. Ruta `api/names`**

**Directorio y archivo:**

```
my-next-app/
└── src/
    └── app/
        └── api/
            └── names/
                └── route.ts
```

**Código:** `src/app/api/names/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';

type ResponseItemType = {
  id: string;
  name: string;
};

export async function GET(request: NextRequest) {
  const url = 'https://www.usemodernfullstack.dev/api/v1/users';

  try {
    const response = await fetch(url);
    const data = (await response.json()) as ResponseItemType[];

    const names = data.map((item) => {
      return { id: item.id, name: item.name };
    });

    return NextResponse.json(names);
  } catch (err) {
    return NextResponse.json({ error: 'Error al obtener los datos' }, { status: 500 });
  }
}
```

**Explicación:**

- En Next.js 13, utilizamos funciones exportadas (`GET`, `POST`, etc.) en lugar de `default export` para las rutas de API.
- `NextRequest` y `NextResponse` son las clases que manejan las solicitudes y respuestas.
- La función `GET` maneja las solicitudes GET a esta ruta.

#### **b. Ruta dinámica `api/weather/[zipcode]`**

**Directorio y archivo:**

```
my-next-app/
└── src/
    └── app/
        └── api/
            └── weather/
                └── [zipcode]/
                    └── route.ts
```

**Código:** `src/app/api/weather/[zipcode]/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';

type WeatherDetailType = {
  zipcode: string;
  weather: string;
  temp?: number;
};

export async function GET(request: NextRequest, { params }: { params: { zipcode: string } }) {
  const { zipcode } = params;

  return NextResponse.json({
    zipcode,
    weather: 'sunny',
    temp: 35,
  } as WeatherDetailType);
}
```

**Explicación:**

- Utilizamos una carpeta con nombre dinámico `[zipcode]` para crear la ruta dinámica.
- La función `GET` recibe un objeto `params` que contiene los parámetros de la URL.

---

#### **3. Creando las páginas en el directorio `app/`**

En Next.js 13, las páginas se crean dentro del directorio `app/` y utilizan archivos `page.tsx`.

##### **a. Página `/hello`**

**Directorio y archivo:**

```
my-next-app/
└── src/
    └── app/
        └── hello/
            └── page.tsx
```

**Código:** `src/app/hello/page.tsx`

```tsx
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

export default function Hello() {
  return (
    <div>
      <Head>
        <title>Título de página Hola Mundo</title>
        <meta property="og:title" content="Hello World" key="title" />
      </Head>

      <div>Hello World!</div>

      <div>
        Usa el ancla de HTML para un{' '}
        <a href="https://nostarch.com" target="_blank" rel="noopener noreferrer">
          enlace externo
        </a>{' '}
        y el componente Link para una
        <Link href="/components/weather"> página interna</Link>.
      </div>

      <div>
        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
      </div>
    </div>
  );
}
```

**Explicación:**

- Creamos una carpeta `hello` con un archivo `page.tsx` que define la página.
- Utilizamos los componentes `Head`, `Link` e `Image` de Next.js.
- Ajustamos el uso de `Link` y `Image` según las convenciones de Next.js 13.

#### **b. Página `/components/weather`**

**Directorio y archivo:**

```
my-next-app/
└── src/
    └── app/
        └── components/
            └── weather/
                └── page.tsx
```

**Código:** `src/app/components/weather/page.tsx`

```tsx
'use client';

import { useState, useEffect } from 'react';

const WeatherComponent = (props: WeatherProps) => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    setCount(1);
  }, []);

  return (
    <h1 onClick={() => setCount(count + 1)}>
      El clima es {props.weather}, y el contador muestra {count}
    </h1>
  );
};

export default function PageComponentWeather() {
  return <WeatherComponent weather="sunny" />;
}
```

**Explicación:**

- Añadimos `'use client';` al inicio del archivo para indicar que es un componente que se renderiza en el cliente.
- Creamos el componente `WeatherComponent` dentro del mismo archivo.
- Utilizamos los hooks `useState` y `useEffect`.
- No es necesario redefinir la interfaz `WeatherProps` aquí porque ya está en `custom.d.ts`.

---

#### **4. Ejecutando la aplicación**

Ejecuta el comando:

```bash
npm run dev
```

Tu aplicación estará disponible en `http://localhost:3000`.

---

#### **5. Probando las rutas y páginas**

#### **a. Ruta de API `/api/names`**

- Visita: `http://localhost:3000/api/names`
- Deberías ver un arreglo JSON con objetos que tienen `id` y `name`.

#### **b. Ruta de API dinámica `/api/weather/[zipcode]`**

- Visita: `http://localhost:3000/api/weather/90210`
- Deberías ver un objeto JSON con el código postal y datos del clima.

#### **c. Página `/hello`**

- Visita: `http://localhost:3000/hello`
- Deberías ver la página "Hello World!" con enlaces externo e interno y una imagen.

#### **d. Página `/components/weather`**

- Visita: `http://localhost:3000/components/weather`
- Deberías ver el mensaje "El clima es sunny, y el contador muestra 1".
- Al hacer clic en el texto, el contador debería incrementarse.

#### **6. Estilizando las páginas**

Puedes agregar estilos globales y de componentes.

#### **a. Estilos globales**

Ya tienes un archivo `globals.css` en `src/app/globals.css`.

**Archivo:** `src/app/globals.css`

```css
/* Puedes agregar estilos globales aquí */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 20px;
}

a {
  color: #0070f3;
  text-decoration: none;
}
```

Este archivo ya se está importando automáticamente en `src/app/layout.tsx`.

#### **b. Estilos de componente**

**Archivo:** `src/app/components/weather/weather.module.css`

```css
.heading {
  color: blue;
  cursor: pointer;
  user-select: none;
}
```

**Aplicar en el componente**

En `src/app/components/weather/page.tsx`:

```tsx
'use client';

import { useState, useEffect } from 'react';
import styles from './weather.module.css';

const WeatherComponent = (props: WeatherProps) => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    setCount(1);
  }, []);

  return (
    <h1 className={styles.heading} onClick={() => setCount(count + 1)}>
      El clima es {props.weather}, y el contador muestra {count}
    </h1>
  );
};

export default function PageComponentWeather() {
  return <WeatherComponent weather="sunny" />;
}
```
#### **7. Ajustes adicionales**

#### **a. Ajustar el archivo `next.config.ts`**

Asegúrate de que tu `next.config.ts` está configurado correctamente para TypeScript y las nuevas rutas.

**Archivo:** `next.config.ts`

```typescript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
};

export default nextConfig;
```

#### **Probando que todo funciona**

1. **Inicia el servidor de desarrollo**:

   ```bash
   npm run dev
   ```

2. **Verifica las rutas de API**:

   - `http://localhost:3000/api/names`
   - `http://localhost:3000/api/weather/12345`

3. **Visita las páginas**:

   - `http://localhost:3000/hello`
   - `http://localhost:3000/components/weather`


Hemos refactorizado las aplicaciones de React y Express.js en tu aplicación Next.js existente, integrando las nuevas funcionalidades dentro de tu estructura actual. 
Ahora tienes:

- Rutas de API funcionales en `src/app/api/`.
- Páginas interactivas en `src/app/`.
- Tipos personalizados definidos en `custom.d.ts`.
- Estilos aplicados a tus componentes.

