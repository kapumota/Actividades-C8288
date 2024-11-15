### Pruebas con el framework JEST

Cada vez que modificas tu código, corres el riesgo de causar efectos secundarios imprevistos en otra parte de tu aplicación. Como resultado, garantizar la integridad y estabilidad de una base de código puede ser un desafío. Para lograrlo, los desarrolladores siguen dos estrategias principales.

En la primera, un patrón arquitectónico, dividimos nuestro código en pequeños componentes React autónomos. Por naturaleza, estos componentes no interfieren entre sí. Por lo tanto, cambiar uno no debería conducir a ningún efecto secundario. En la segunda, realizamos pruebas unitarias automatizadas utilizando el framework Jest.

En las siguientes secciones, discutiremos lo esencial de las pruebas unitarias automatizadas y los beneficios de su uso. Aprenderás cómo escribir un conjunto de pruebas en Jest y utilizar sus informes para mejorar tu código. También manejarás dependencias usando dobles de código. Por último, explorarás otros tipos de pruebas que podrías querer ejecutar contra tu aplicación.

**Desarrollo dirigido por pruebas y pruebas unitarias**

Los desarrolladores a veces utilizan la técnica de desarrollo dirigido por pruebas (TDD), en la cual escriben sus pruebas automatizadas antes de implementar el código real a probar. Primero crean una prueba para evaluar que la unidad más pequeña posible de código funcione como se espera. Tal prueba se llama prueba unitaria. Luego, escriben la cantidad mínima de código necesaria para pasar la prueba.

Este enfoque tiene beneficios distintivos. Primero, te permite enfocarte en los requisitos de tu aplicación al definir explícitamente la funcionalidad del código y los casos límite. Por lo tanto, tienes una imagen clara de su comportamiento deseado, y puedes identificar especificaciones poco claras o faltantes más temprano que tarde. Cuando escribes pruebas después de completar la funcionalidad, pueden reflejar el comportamiento que implementaste en lugar del comportamiento que requieres.

Segundo, limitarte a escribir solo el código necesario evita que tus funciones se vuelvan demasiado complejas y divide tu aplicación en secciones pequeñas y comprensibles. El código testeable es código mantenible. Además, la técnica asegura que tus pruebas cubran una gran parte del código de la aplicación, una métrica llamada **cobertura de código**, y al ejecutar las pruebas frecuentemente durante el desarrollo, reconocerás instantáneamente los errores introducidos por nuevas líneas de código.

Dependiendo de la situación, la unidad dirigida por una prueba unitaria puede ser un módulo, una función o una línea de código. Las pruebas tienen como objetivo verificar que cada unidad funcione de manera aislada. Las líneas individuales dentro de cada función de prueba son los pasos de prueba, y toda la función de prueba se llama un caso de prueba. Los conjuntos de pruebas agregan casos de prueba en bloques lógicos. Para ser considerado reproducible, la prueba debe devolver los mismos resultados cada vez que la ejecutamos. Esto significa que debemos ejecutar las pruebas en un entorno controlado con un conjunto de datos definido.

Facebook desarrolló el framework de pruebas Jest en conjunto con React, pero podemos usarlo con cualquier proyecto de Node.js. Tiene una sintaxis definida para configurar y escribir pruebas. Su ejecutor de pruebas (test runnner) ejecuta estas pruebas, reemplaza automáticamente cualquier dependencia en nuestro código y genera un informe de cobertura de pruebas. Módulos npm adicionales proporcionan código personalizado para probar componentes DOM o React y, por supuesto, agregar tipos de TypeScript.

#### Usando Jest

Para usar Jest en un proyecto, debemos instalar sus paquetes requeridos, crear un directorio para todos los archivos de prueba y agregar un script de npm que ejecutará las pruebas. Ejecuta lo siguiente en el directorio raíz de tu aplicación Next.js para instalar el framework, así como las definiciones de tipos de DefinitelyTyped como dependencias de desarrollo:

```
$ npm install --save-dev jest @types/jest
```

Luego crea el directorio en el que guardarás tus pruebas. Jest usa la carpeta __tests__ por defecto, así que crea una en tu directorio raíz. A continuación, para agregar el script de npm test a tu proyecto, abre el archivo package.json y modifica el objeto scripts para que coincida con el codigo siguiente:.

```
   "scripts": {
      "dev": "next dev",
      "build": "next build",
      "start": "next start",
      "lint": "next lint",
      "test": "jest"
  },
``` 


Ahora podemos ejecutar pruebas con el comando npm test. Usualmente, los servidores de construcción ejecutan este comando por defecto durante el proceso de construcción. Por último, para habilitar el soporte de TypeScript en Jest, agrega el transpiler ts-jest:

```
$ npm install --save-dev ts-jest
```

También crea un archivo jest.config para agregar TypeScript ejecutando npx ts-jest config:init.

**Creando un módulo de ejemplo para probar**

Escribamos algún código de ejemplo para ayudarnos a entender las pruebas unitarias y TDD. Supongamos que queremos crear un nuevo módulo en nuestra aplicación, ./helpers/sum.ts. Debería exportar una función, sum, que devuelve la suma de sus parámetros. Para seguir un patrón TDD, comenzaremos creando casos de prueba para este módulo.

Primero necesitamos crear la función que ejecutará nuestras pruebas. Crea un archivo llamado sum.test.ts en el directorio de pruebas por defecto y agrega el código siguiente:

```javascript
 import {sum} from "../helpers/sum";

describe("La funcion suma", () => {

});
```


Importamos la función sum que escribiremos más adelante y usamos la función describe de Jest para crear un conjunto de pruebas vacío. Tan pronto como ejecutemos las (inexistentes) pruebas con npm test, Jest debería quejarse de que no hay un archivo llamado sum.ts en el directorio helpers. Crea este archivo y carpeta ahora, en el directorio raíz de tu proyecto. Dentro del archivo, escribe la función sum que se muestra a continuacion:

```javascript
 const sum = () => {};
export {sum};
```

Ahora ejecuta las pruebas nuevamente con npm test. Debido a que el código solo exporta una función sum de marcador de posición que no devuelve nada, el ejecutor de pruebas de Jest se queja nuevamente. Esta vez, nos informa que el conjunto de pruebas necesita contener al menos una prueba.

Veamos la anatomía de un caso de prueba y agreguemos algunos casos de prueba al archivo sum.test.ts durante el proceso.

#### Anatomía de un caso de prueba

Hay dos tipos de pruebas unitarias: basadas en estado y basadas en interacción. Un caso de prueba basado en interacción verifica que el código bajo evaluación invoque una función específica, mientras que un caso de prueba basado en estado verifica el valor de retorno del código o el estado resultante. Ambos tipos siguen los mismos tres pasos: **arrange**, **act** y **assert**.

**Arrange**

Para escribir pruebas independientes y reproducibles, primero necesitamos preparar nuestro entorno definiendo los prerrequisitos, como los datos de prueba. Si necesitamos estos prerrequisitos para un solo caso de prueba en particular, los definimos al principio del caso. De lo contrario, los configuramos globalmente para todas las pruebas en el conjunto de pruebas utilizando el hook beforeEach, que se ejecuta antes de cada caso de prueba, o el hook beforeAll, que se ejecuta antes de que se ejecuten todas las pruebas.

Si, por ejemplo, tuviéramos alguna razón para usar el mismo conjunto de datos global para cada caso de prueba y supiéramos que nuestros pasos de prueba modificarían el conjunto de datos, necesitaríamos recrear el conjunto de datos antes de cada prueba. El hook beforeEach sería el lugar perfecto para hacer esto. Por otro lado, si los casos de prueba simplemente consumen los datos, necesitaríamos definir los conjuntos de datos solo una vez y usaríamos el hook beforeAll.

Definamos dos casos de prueba y creemos los valores de entrada para cada uno. Nuestros parámetros de entrada serán específicos para cada caso de prueba, así que los declararemos dentro de los casos de prueba en lugar de usar un hook beforeEach o beforeAll. Actualiza el archivo sum.test.ts con el código siguiente:

```javascript
 import {sum} from "../helpers/sum";

describe("la funcion es suma", () => {
    test("dos mas dos es cuatro", () => {
        let first = 2;
        let second = 2;
        let expectation = 4;
    });

    test("menos 8 mas cuatro es menos cuatro", () => {
        let first = -8;
        let second = 4;
        let expectation = -4;
    });
});
```

La función describe crea nuestro conjunto de pruebas, que comprende dos llamadas a la función test, cada una de las cuales es un caso de prueba. Para ambos, el primer argumento es la descripción que vemos en el informe del ejecutor de pruebas.

Cada una de nuestras pruebas evalúa el resultado de la función sum. La primera verifica la característica de suma, verificando que 2 más 2 devuelve 4. La segunda prueba confirma que la función también devuelve correctamente valores negativos. Agrega 4 a -8 y espera un resultado de -4.

Podrías querer comprobar el tipo de retorno de la función sum también. Usualmente, lo habríamos hecho, pero dado que estamos usando TypeScript, no hay necesidad de este caso de prueba adicional. En su lugar, podemos definir el tipo de retorno en la firma de la función, y TSC lo verificará por nosotros.

**Act**

Tan pronto como el ejecutor de pruebas ejecuta un caso, los pasos de prueba actúan en nuestro nombre invocando el código bajo prueba con los datos para el caso de prueba particular. Cada caso de prueba debe probar exactamente una característica o variante del sistema. Este paso es la línea de código que invoca la función a ejecutar. El código siguiente lo agrega a los casos de prueba en sum.test.ts.

```javascript
 import {sum} from "../helpers/sum";
describe("La funcion suma", () => {

    test("dos mas dos es cuatro", () => {
        let first = 2;
        let second = 2;
        let expectation = 4;
        let result = sum(first, second);
    });

    test("menos ocho mas cuatro es menos cuatro", () => {
        let first = -8;
        let second = 4;
        let expectation = -4;
        let result = sum(first, second);
    });

});
```

Nuestras nuevas líneas llaman a la función sum y le pasan los valores que definimos como parámetros. Almacenamos los valores devueltos en la variable result. En tu editor, TSC debería arrojar un error del tipo "Se esperaban 0 argumentos, pero se recibieron 2". Esto está bien, ya que la función sum es solo un marcador de posición vacío y aún no espera ningún parámetro.

**Assert**

El paso final de nuestro caso de prueba es la afirmación de que el código cumple con las expectativas que definimos. Creamos esta afirmación con dos partes: la función expect de Jest, utilizada en conjunto con una función matcher de la biblioteca de aserciones de Jest que define la condición para la que estamos probando. Dependiendo de la categoría de la prueba unitaria, esta condición podría ser un valor de retorno específico, un cambio de estado o la invocación de otra función. Los matchers comunes verifican si un valor es un número, una cadena, etc. También podemos usarlos para afirmar que una función devuelve verdadero o falso.

La biblioteca de aserciones de Jest nos proporciona un conjunto incorporado de matchers básicos, y podemos agregar otros adicionales desde el repositorio de npm. Uno de los paquetes de aserciones más comunes es testing-library/dom, utilizado para consultar el DOM por un nodo particular y afirmar sus características. Por ejemplo, podemos verificar un nombre de clase o atributo o trabajar con eventos nativos del DOM. Otro paquete de aserciones común, testing-library/react, agrega utilidades para React y nos da acceso a la función render y a los hooks de React en nuestras aserciones.

Debido a que cada caso de prueba evalúa una condición en una unidad de código, limitamos cada prueba a una aserción. De esta manera, tan pronto como la ejecución de la prueba tenga éxito o falle y el reportero de pruebas genere el informe, podemos detectar fácilmente qué suposición de prueba falló. El código siguiente agrega una aserción por caso de prueba. Pégalo en el archivo sum.test.ts.

```javascript
 import {sum} from "../helpers/sum";

describe("La funcion suma", () => {

    test("dos mas dos es cuatro", () => {
        let first = 2;
        let second = 2;
        let expectation = 4;
        let result = sum(first, second);
        expect(result).toBe(expectation);
    });

    test("menos ocho mas cuatro es menos cuatro", () => {
        let first = -8;
        let second = 4;
        let expectation = -4;
        let result = sum(first, second);
        expect(result).toBe(expectation);
    });

});

```
Estas líneas usan la función de aserción expect con el matcher toBe para comparar que el resultado esperado sea el mismo que nuestra expectativa. Nuestros casos de prueba ahora están completos. Cada uno sigue el patrón arrange, act, assert y verifica una condición.

#### Matchers comunes

En Jest, los matchers nos permiten comprobar una condición específica, como si dos valores son iguales o si un elemento HTML existe en el DOM actual. Jest viene con un conjunto de matchers incorporados. Además, el paquete JEST-DOM de la biblioteca de pruebas proporciona matchers específicos para el DOM.

**Matchers incorporados**

Esta sección cubre los matchers incorporados más comunes de Jest. Puedes encontrar una lista completa en la documentación oficial de Jest en https://jestjs.io/docs/expect.

**toBe** Este matcher es el más simple y con mucho el más común. Es una comprobación de igualdad simple para determinar si dos valores son idénticos. Se comporta de manera similar al operador de igualdad estricta (===), ya que considera las diferencias de tipo. Sin embargo, a diferencia del operador de igualdad estricta, considera +0 y -0 como diferentes.

```javascript
test('toBe',  () => {
    expect(1 + 1).toBe(2);
})
```

**toEqual** Usamos toEqual para realizar una comprobación de igualdad profunda entre objetos y arreglos, comparando todas sus propiedades o elementos. Este matcher ignora valores y elementos undefined. Además, no verifica los tipos de objeto (por ejemplo, si son instancias o hijos de la misma clase u objeto padre). Si requieres tal comprobación, considera usar el matcher toStrictEqual en su lugar.

```javascript
test('toEqual', () => {
    expect([undefined, 1]).toEqual([1]);
})
```

**toStrictEqual** El matcher toStrictEqual realiza una comparación de estructura y tipo para objetos y arreglos; pasar esta prueba requiere que los objetos sean del mismo tipo. Además, el matcher considera los valores undefined y los elementos undefined en arreglos.

```javascript
test('toStrictEqual', () => {
    expect([undefined, 1]).toStrictEqual([undefined, 1]);
})
```

**toBeCloseTo** Para números de punto flotante, usamos toBeCloseTo en lugar de toBe. Esto se debe a que los cálculos internos de JavaScript de números de punto flotante son defectuosos, y este matcher considera esos errores de redondeo.

```javascript
test('toBeCloseTo', () => {
    expect(0.1 + 0.2).toBeCloseTo(0.3);
})
```

**toBeGreaterThan/toBeGreaterThanOrEqual** Para valores numéricos, usamos estos matchers para verificar que el resultado es mayor o igual a un valor, similar a los operadores > y >=.

```javascript
test('toBeGreaterThan', () => {
    expect(1 + 1).toBeGreaterThan(1);
})
```

**toBeLessThan/toBeLessThanOrEqual** Estos son los opuestos de los matchers GreaterThan... para valores numéricos, similares a los operadores < y <=.

```javascript
test('toBeLessThan', () => {
    expect(1 + 1).toBeLessThan(3);
})
```

**toBeTruthy/toBeFalsy** Estos matchers verifican si un valor existe, independientemente de su valor. Consideran los seis valores de JavaScript 0, '', null, undefined, NaN y false como falsy y todo lo demás como truthy.

```javascript
test('toBeTruthy', () => {
    expect(1 + 1).toBeTruthy();
})
```

**toMatch** Este matcher acepta una cadena o una expresión regular, luego verifica si un valor contiene la cadena dada o si la expresión regular devuelve el resultado dado.

```javascript
test('toMatch', () => {
    expect('apples and oranges').toMatch('apples');
})
```

**toContain** El matcher toContain es similar a toMatch, pero acepta un arreglo o una cadena y verifica si estos contienen un valor de cadena dado. Cuando se usa en un arreglo, el matcher verifica que el arreglo contenga la cadena dada.

```javascript
test('toMatch', () => {
    expect(['apples', 'oranges']).toContain('apples');
})
```

**toThrow** Este matcher verifica que una función arroja un error. La función que se está comprobando requiere una función envolvente o la aserción fallará. Podemos pasarle una cadena o una expresión regular, similar a la función toMatch.

```javascript
function functionThatThrows() {
    throw new Error();
}

test('toThrow', () => {
    expect(() => functionThatThrows()).toThrow();
})
```

**Los matchers de JEST-DOM**

El paquete JEST-DOM proporciona matchers para trabajar directamente con el DOM, lo que nos permite escribir fácilmente pruebas que ejecutan aserciones en el DOM, como comprobar la presencia de un elemento, contenidos HTML, clases CSS o atributos.

Digamos que queremos comprobar que nuestro elemento de logo tiene el nombre de clase center. En lugar de comprobar manualmente la presencia de un elemento y luego comprobar su atributo de nombre de clase con toMatch, podemos usar el matcher toHaveClass, como se muestra en el Listado C-1.

```html
<img data-testid="image" class="center full" alt="The Logo" src="logo.svg" />

test('toHaveClass', () => {
    const element = getByTestId('image');
    expect(element).toHaveClass('center');
})
```

Primero agregamos el atributo de datos testid a nuestro elemento de imagen. Luego, en la prueba, obtenemos el elemento usando este ID y almacenamos la referencia en una constante. Finalmente, usamos el matcher toHaveClass en la referencia del elemento para ver si los nombres de clase del elemento contienen la clase center.

Veamos los matchers relacionados con el DOM más comunes.

**getByTestId** Este matcher nos permite acceder directamente a un elemento del DOM y almacenar una referencia a él, que luego usamos con matchers personalizados para afirmar cosas sobre este elemento.

```html
<img data-testid="image" class="center full" alt="The Logo" src="logo.svg"
/>

test('toHaveClass', () => {
    const element = getByTestId('image');
--snip--
})
```

**toBeInTheDocument** Este matcher verifica que un elemento fue agregado al árbol del documento. Este matcher funciona solo en elementos que son actualmente parte del DOM e ignora los elementos separados.

```html
<img data-testid="image" class="center full" alt="The Logo" src="logo.svg" />

test('toHaveClass', () => {
    const element = getByTestId('image');
    expect(element).toBeInTheDocument();
})
```

**toContainElement** Este matcher prueba nuestras suposiciones sobre los elementos hijos del elemento, permitiéndonos verificar, por ejemplo, si un elemento es descendiente del primero.

```html
<div data-testid="parent">
    <img data-testid="image" class="center full" alt="The Logo" src="logo.svg" />
</div>

test('toHaveClass', () => {
    const parent = getByTestId('parent');
    const element = getByTestId('image');
    expect(parent).toContainElement(element);
})
```

**toHaveAttribute** Este matcher nos permite ejecutar aserciones sobre los atributos del elemento, como el atributo alt de una imagen y el estado checked, disabled o error de elementos de formulario.

```html
<img data-testid="image" class="center full" alt="The Logo" src="logo.svg" />

test('toHaveClass', () => {
    const element = getByTestId('image');
    expect(element).toHaveAttribute('alt', 'The Logo');
})
```

**toHaveClass** El matcher toHaveClass es una variante específica del matcher toHaveAttribute. Nos permite afirmar explícitamente que un elemento tiene un nombre de clase particular, permitiéndonos escribir pruebas limpias.

```html
<img data-testid="image" class="center full" alt="The Logo" src="logo.svg" />

test('toHaveClass', () => {
    const element = getByTestId('image');
    expect(element).toHaveClass('center');
})
```
### Usando TDD

Nuestros casos de prueba aún no se han ejecutado, y si ejecutas `npm test`, el ejecutor de pruebas debería fallar de inmediato. TSC ( TypeScript Compiler) verifica el código y arroja un error por las declaraciones de parámetros faltantes en la función `sum`:

```
FAIL  __tests__/sum.test.ts
  • Test suite failed to run
--snip--
Test Suites: 2 failed, 2 total
Tests:       0 total
Snapshots:   0 total
```

Es hora de implementar esta función `sum`. Siguiendo los principios del TDD, agregaremos funciones al código de manera incremental y ejecutaremos los conjuntos de pruebas después de cada adición, continuando este proceso hasta que todas las pruebas pasen. Primero agregaremos esos parámetros faltantes. Reemplaza el código en `sum.ts` con el contenido siguiente:

```typescript
const sum = (a: number, b: number) => {};

export { sum };
```

Hemos agregado los parámetros y los hemos tipado como números. Ahora volvemos a ejecutar los casos de prueba y, como se esperaba, fallan. La salida de la consola nos dice que la función `sum` no devuelve los resultados esperados. Esto no debería sorprendernos, porque nuestra función `sum` no devuelve nada en absoluto:

```
FAIL  __tests__/sum.test.ts
  La funcion suma
    × dos mas dos es cuatro
    × menos ocho mas cuatro es menos cuatro

  • La funcion suma › dos mas dos es cuatro
    Expected: 4
    Received: undefined

  • La funcion suma › menos ocho mas cuatro es menos cuatro
    Expected: -4
    Received: undefined

Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
Snapshots:   0 total
```

El siguiente código agrega esta funcionalidad al archivo `sum.ts`. Tipamos el tipo de retorno de la función como un número y agregamos los dos parámetros.

```typescript
const sum = (a: number, b: number): number => a + b;

export { sum };
```

Si volvemos a ejecutar `npm test`, Jest debería informar que todos los casos de prueba tienen éxito:

```
PASS  __tests__/sum.test.ts
  La funcion suma
    ✓ dos mas dos es cuatro
    ✓ menos ocho mas cuatro es menos cuatro

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
```

Como puedes ver, todo funcionó.

#### Refactorización de código

Las pruebas unitarias son particularmente útiles cuando necesitamos refactorizar nuestro código. Como ejemplo, reescribamos la función `sum` para que, en lugar de dos parámetros, acepte un array de números. La función debería devolver la suma de todos los elementos del array.

Comenzamos reescribiendo nuestros casos de prueba existentes en una forma más compacta y luego expandimos el conjunto de pruebas para verificar el nuevo comportamiento. Reemplaza el código en el archivo `sum.test.ts` con el siguiente:

```typescript
import { sum } from "../helpers/sum";

describe("La funcion suma", () => {
  test("dos mas dos es cuatro", () => {
    expect(sum([2, 2])).toBe(4);
  });

  test("menos ocho mas cuatro es menos cuatro", () => {
    expect(sum([-8, 4])).toBe(-4);
  });

  test("two plus two plus minus four is zero", () => {
    expect(sum([2, 2, -4])).toBe(0);
  });
});
```

Observa que reescribimos los casos de prueba en una forma más compacta. Dividir explícitamente las declaraciones de preparar, actuar y afirmar en varias líneas puede ser más fácil de leer, pero para casos de prueba simples, como el código anterior, a menudo los escribimos en una sola línea. Hemos cambiado su funcionalidad para adaptarse a los nuevos requisitos. En lugar de aceptar dos valores, nuestra función `sum` recibe un array con números. Nuevamente, TSC nos notifica instantáneamente sobre los parámetros que no coinciden entre la función `sum` en el conjunto de pruebas y la implementación real.

Una vez que hemos escrito nuestras pruebas, podemos reescribir nuestro código. El siguiente código muestra el contenido para el archivo `helpers/sum.ts`. Aquí la función `sum` ahora acepta un array de números como parámetro y devuelve un número.

```typescript
const sum = (data: number[]): number => {
  return data[0] + data[1];
};

export { sum };
```

Cambiamos el parámetro a un array de números. Esto soluciona el error de TypeScript causado por el conjunto de pruebas. Pero como estamos siguiendo TDD y haciendo solo un cambio funcional a la vez, mantenemos el comportamiento original de la función de sumar dos valores. Como era de esperar, uno de los casos de prueba falla cuando ejecutamos las pruebas automatizadas con `npm test`:

```
FAIL  __tests__/sum.test.ts
  La funcion suma
    ✓ dos mas dos es cuatro
    ✓ menos ocho mas cuatro es menos cuatro
    ✕ two plus two plus minus four is zero

  • La funcion suma › two plus two plus minus four is zero
    Expected: 0
    Received: 4

Test Suites: 1 failed, 1 total
Tests:       1 failed, 2 passed, 3 total
Snapshots:   0 total
```

El tercer caso de prueba, que prueba el nuevo requisito, es el que falló. No solo esperábamos este resultado, sino que también queríamos que la prueba fallara; de esta manera, sabemos que las pruebas en sí mismas están funcionando. Si hubieran tenido éxito antes de implementar la funcionalidad correspondiente, los casos de prueba serían defectuosos.

Con la prueba fallida como referencia, ahora es el momento de refactorizar el código para cumplir con el nuevo requisito. Pega el siguiente código en el archivo `sum.ts`. Aquí refactorizamos la función `sum` para devolver la suma de todos los valores del array.

```typescript
const sum = (data: number[]): number => {
  return data.reduce((a, b) => a + b);
};

export { sum };
```

Aunque podríamos recorrer el array con un bucle `for`, usamos la función nativa de arrays de JavaScript moderno `array.reduce`. Esta función ejecuta una función de callback en cada elemento del array. La callback recibe el valor de retorno de la iteración anterior y el elemento actual del array como parámetros, exactamente lo que necesitamos para calcular la suma.

Ejecuta todos los casos de prueba en nuestro conjunto para verificar que están funcionando como se espera:

```
PASS  __tests__/sum.test.ts
  La funcion suma
    ✓ dos mas dos es cuatro
    ✓ menos ocho mas cuatro es menos cuatro
    ✓ two plus two plus minus four is zero

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
```

El ejecutor de pruebas debería mostrar que el código pasó todas las pruebas.

#### Evaluando la cobertura de pruebas

Para medir exactamente qué líneas de código cubren nuestros conjuntos de pruebas, Jest genera un informe de cobertura de pruebas. Cuanto mayor sea el porcentaje de código que evalúan nuestras pruebas, más exhaustivas serán, y más confianza podremos tener en la calidad y mantenibilidad de la aplicación. Como regla general, deberías apuntar a una cobertura de código del 90 por ciento o superior, con una alta cobertura para la parte más crítica de tu código. Por supuesto, los casos de prueba deben agregar valor al probar las funciones del código; agregar pruebas solo para aumentar la cobertura no es el objetivo que buscamos. 
Pero tan pronto como hayas probado tu base de código de manera exhaustiva, podrás refactorizar funciones existentes e implementar nuevas sin preocuparte por introducir errores de regresión. Una alta cobertura de código verifica que los cambios no tienen efectos secundarios ocultos.

Modifica el script `npm test` en el archivo `package.json` agregando la bandera `--coverage` a él, como se muestra en el código:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "test": "jest --coverage"
},
```

Si volvemos a ejecutar el conjunto de pruebas, Jest debería mostrar qué porcentaje del código cubren nuestras pruebas unitarias. Genera un informe de cobertura de código y lo almacena en la carpeta `coverage`. Compara tu salida con la siguiente:

```
PASS  __tests__/sum.test.ts
  La funcion suma
    ✓ dos mas dos es cuatro
    ✓ menos ocho mas cuatro es menos cuatro
    ✓ two plus two plus minus four is zero

----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------|---------|----------|---------|---------|-------------------
All files |     100 |      100 |     100 |     100 |
  sum.ts  |     100 |      100 |     100 |     100 |
----------|---------|----------|---------|---------|-------------------

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        7.687 s
```

El informe muestra la cobertura desglosada por declaraciones, ramas, funciones y líneas. Vemos que nuestra simple función `sum` tiene una cobertura de código del 100% en todas las categorías. Por lo tanto, sabemos que no hemos dejado ningún código sin probar y podemos confiar en que los casos de prueba reflejan la calidad de la función.

### Reemplazando dependencias con Fakes, Stubs y Mocks

Mencionamos que nuestras pruebas deben ejecutarse de manera aislada, sin depender de código externo. Es posible que te hayas preguntado cómo manejar módulos importados; después de todo, tan pronto como importas código, agregas una dependencia a la unidad bajo evaluación. Esos módulos de terceros pueden no funcionar como se espera, y no queremos que nuestro código dependa de la suposición de que todos operan correctamente. Por lo tanto, debes proporcionar un conjunto de casos de prueba para cada módulo importado para verificar su funcionalidad. Ellos también son unidades a probar.

Por separado, en lugar de importar módulos en nuestras otras unidades de código, necesitamos reemplazarlos con *test doubles* que devuelvan un conjunto definido de datos estáticos adaptados a la prueba. Los *test doubles* reemplazan un objeto o una función, eliminando efectivamente una dependencia. Como devuelven un conjunto de datos definido, su respuesta es conocida y predecible. Puedes compararlos con los dobles de acción en las películas.

Además de reemplazar un objeto o función, los *test doubles* tienen un segundo propósito importante: registran sus llamadas y nos permiten espiarlos. Por lo tanto, podemos usarlos para probar si se ha llamado al *test double*, cuántas veces y qué argumentos recibió. Hay tres tipos principales de *test doubles*: *fakes*, *stubs* y *mocks*. Sin embargo, a veces escucharás el término *mock* para referirse a los tres.

#### Creando un módulo con dependencias

Para practicar el uso de *test doubles* en nuestra función `sum`, crearemos una nueva función que calcule un número específico de valores en la secuencia de Fibonacci. La secuencia de Fibonacci es un patrón en el que cada número subsiguiente es la suma de los dos anteriores, un caso de uso simple para un módulo de suma.

Todos los desarrolladores deben descubrir qué tan detallados necesitan ser sus casos de prueba. La secuencia de Fibonacci es un buen ejemplo, porque tratar de probar todos los números posibles enviados a la función sería inútil, ya que la secuencia no tiene fin. En su lugar, queremos verificar que la función maneje correctamente los casos límite y que su funcionalidad subyacente funcione. Por ejemplo, verificaremos cómo maneja una entrada con una longitud de 0; en ese caso, la función debería devolver una cadena vacía. Luego probaremos cómo calcula una secuencia de Fibonacci de cualquier longitud superior a 3. 

Crea el conjunto de pruebas `fibonacci.test.ts` dentro de la carpeta `__tests__` y luego agrega el siguiente código:

```typescript
import { fibonacci } from "../helpers/fibonacci";

describe("the fibonacci sequence", () => {
  test("with a length of 0 is ", () => {
    expect(fibonacci(0)).toBe(" ");
  });

  test("with a length of 5 is '0, 1, 1, 2, 3' ", () => {
    expect(fibonacci(5)).toBe("0, 1, 1, 2, 3");
  });
});
```

Definimos dos casos de prueba: uno que verifica una entrada de longitud 0 y otro que calcula una secuencia de Fibonacci de cinco números. Ambas pruebas siguen el patrón de preparar, actuar y afirmar en la variante compacta que usamos anteriormente.

Después de haber creado los casos de prueba, podemos pasar a escribir el código de la función Fibonacci. Crea el archivo `fibonacci.ts` en la carpeta `helpers` junto al archivo `sum.ts`, y agrega el siguiente código:

```typescript
import { sum } from "./sum";

const fibonacci = (length: number): string => {
  const sequence: number[] = [];
  for (let i = 0; i < length; i++) {
    if (i < 2) {
      sequence.push(sum([0, i]));
    } else {
      sequence.push(sum([sequence[i - 1], sequence[i - 2]]));
    }
  }
  return sequence.join(", ");
};

export { fibonacci };
```

Importamos la función `sum` del módulo que creamos anteriormente . Ahora es una dependencia que necesitaremos reemplazar con un *test double* más tarde. Luego implementamos la función `fibonacci`, que acepta la longitud de la secuencia para calcular y devuelve una cadena. Almacenamos la secuencia actual en un array para que tengamos una forma simple de acceder a los dos valores anteriores necesarios para calcular el siguiente. Observa que el primer número de la secuencia siempre es 0 y el segundo siempre es 1. 
Finalmente, devolvemos una cadena con el número solicitado de valores. Si guardas este código y vuelves a ejecutar los conjuntos de pruebas, tanto `sum.test.ts` como `fibonacci.test.ts` deberían pasar con éxito.

#### Creando una carpeta de dobles

Debido a que importamos la función `sum` en el módulo Fibonacci, nuestro código tiene una dependencia externa. Esto es problemático para fines de prueba: si la función `sum` se rompe, la prueba de la secuencia de Fibonacci también fallará, incluso si la lógica de la implementación de Fibonacci es correcta.

Para desacoplar la prueba de la dependencia, reemplazaremos la función `sum` en el archivo `fibonacci.ts` con un *test double*. Jest puede reemplazar cualquier módulo que tenga un archivo con el mismo nombre guardado en un subdirectorio `__mocks__` adyacente al archivo de prueba durante la ejecución de la prueba. Crea dicha carpeta en la carpeta `helpers` junto al archivo de prueba y coloca un archivo `sum.ts` dentro de ella. Deja el archivo vacío por ahora.

Para habilitar el *test double*, llamamos a la función `jest.mock`, pasándole la ruta al módulo original guardado en el archivo de prueba. En el siguiente código, agregamos esta llamada a `fibonacci.test.ts`:

```typescript
import { fibonacci } from "../helpers/fibonacci";

jest.mock("../helpers/sum");

describe("the fibonacci sequence", () => {
  test("with a length of 0 is ", () => {
    expect(fibonacci(0)).toBe(" ");
  });
  test("with a length of 5 is '0, 1, 1, 2, 3' ", () => {
    expect(fibonacci(5)).toBe("0, 1, 1, 2, 3");
  });
});
```

Esta nueva línea reemplaza el módulo `sum` con el *test double*. Ahora creemos los tres tipos básicos de *test doubles*, agregando su código al archivo en la carpeta `__mocks__`.

#### Usando un stub

Los *stubs* son simplemente objetos que devuelven algunos datos predefinidos. Esto los hace muy simples de implementar pero limitados en su uso; a menudo, devolver los mismos datos no es suficiente para imitar las acciones originales de una dependencia. El siguiente código muestra una implementación de *stub* para el *test double* de la función `sum`. Pega el código en el archivo `sum.ts` dentro de la carpeta `__mocks__`:

```typescript
const sum = (data: number[]): number => 999;

export { sum };
```

La función de *stub* tiene la misma firma que la función original. Acepta los mismos argumentos, un array de números, y devuelve un número. Sin embargo, a diferencia de la original, este *test double* siempre devuelve el mismo número, 999, independientemente de los datos que haya recibido.

Para ejecutar con éxito los conjuntos de pruebas con esta función de *stub*, necesitaríamos ajustar nuestras expectativas sobre lo que hará nuestro código. En lugar de devolver cinco números en la secuencia de Fibonacci, produciría la cadena `999, 999, 999, 999, 999`. Si vemos tal cadena, sabemos que la función `sum` se llamó cinco veces.

Experimenta con el *stub*, modificando las expectativas del conjunto de pruebas para que coincidan con él. Luego, restaura los *matchers* para que puedas usarlos para las próximas pruebas.

#### Usando un Fake

Los *fakes* son el tipo más complejo de *test double*. Son implementaciones que funcionan de la funcionalidad original, pero a diferencia de la implementación real, solo proporcionan la funcionalidad necesaria para la prueba unitaria. Su implementación se simplifica y, a menudo, no aborda los casos límite.

El *fake* para la función `sum` agrega manualmente el primer y segundo elemento del array, en lugar de usar `array.reduce`. Esta implementación simplificada despoja a la función `sum` de la capacidad de sumar más de dos puntos de datos, pero para la secuencia de Fibonacci, es suficiente. La complejidad reducida facilita su comprensión y lo hace menos propenso a errores. Reemplaza el contenido del archivo `sum.ts` dentro de la carpeta `__mocks__` con el siguiente código:

```typescript
const sum = (data: number[]): number => {
  return data[0] + data[1];
};

export { sum };
```

Nuestro *fake* utiliza un simple operador matemático de suma (`+`) para agregar el primer y segundo elemento del parámetro `data`. Su principal beneficio es que devuelve un resultado similar al de la implementación real. Ahora podemos ejecutar los conjuntos de pruebas, y deberían pasar con éxito sin tener que ajustar nuestras expectativas, devolviendo la secuencia de Fibonacci.

#### Usando un mock

Los *mocks* se encuentran en algún lugar entre los *stubs* y los *fakes*. Aunque menos sofisticados que los *fakes*, devuelven datos más realistas que los *stubs*. Si bien no simulan el comportamiento verdadero de una dependencia, pueden reaccionar a los datos que reciben.

Por ejemplo, nuestra implementación de *mock* ingenua de la función `sum` devolverá un resultado de un mapa hash codificado. Reemplaza el código en el archivo `__mocks__/sum.ts` con el siguiente código, que inspecciona la solicitud y permite que la calculadora de Fibonacci use los conjuntos de pruebas originales.

```typescript
type ResultMap = {
  [key: string]: number;
};

const results: ResultMap = {
  "0+0": 0,
  "0+1": 1,
  "1+0": 1,
  "1+1": 2,
  "2+1": 3,
};

const sum = (data: number[]): number => {
  return results[data.join("+")];
};

export { sum };
```

Creamos un tipo llamado `ResultMap`, que utiliza una cadena como clave y un número como valor. Luego utilizamos el tipo recién creado para un mapa hash que almacena nuestras respuestas deseadas. A continuación, definimos la función *mock* con la misma interfaz que la implementación original. Dentro del *mock*, calculamos la clave a utilizar en el mapa hash basado en los parámetros que recibimos. Esto nos permite devolver el conjunto de datos correcto y producir una secuencia de Fibonacci real. 
El principal beneficio de usar el *mock* en lugar de `sum` es que podemos controlar su resultado, ya que devuelve valores de un conjunto de datos conocido.

Convenientemente, Jest nos proporciona ayudas para trabajar con *test doubles*. La función `jest.mock` reemplaza módulos importados con *mocks*. La API `jest.fn` crea un *mock* básico que puede devolver cualquier tipo de datos predefinidos, y `jest.spyOn` nos permite registrar llamadas a cualquier función sin modificarla.

En contextos típicos de desarrolladores, no te molestes en las sutilezas entre *stubs*, *fakes* y *mocks* y usa el término *mock* como un término genérico para *test doubles*. No pases demasiado tiempo sobre-ingeniando tus *mocks*; son solo herramientas para ayudarte a probar tu código.

### Tipos adicionales de pruebas 

  
Las pruebas cubiertas en esta clase hasta ahora son las más comunes que encontrarás como desarrollador full-stack. Esta sección explica brevemente tipos adicionales de pruebas y cuándo usarlas. No se trata de reemplazar las pruebas unitarias; más bien, complementan las pruebas unitarias al cubrir aspectos específicos de tu implementación que de otra manera no serían comprobables.

Por ejemplo, debido a que las pruebas unitarias se ejecutan en aislamiento, no pueden evaluar la interacción entre módulos. Teóricamente, si cada función y módulo pasa su prueba, todo el programa debería funcionar como se esperaba. Prácticamente, a menudo enfrentarás problemas causados por documentación de módulo defectuosa. Comúnmente, la documentación afirmará que una API devuelve un tipo específico, pero la implementación real devolverá uno diferente. 

#### Pruebas funcionales 

Mientras que las pruebas unitarias examinan la implementación de una característica desde la perspectiva del desarrollador, las pruebas funcionales cubren la perspectiva del usuario al verificar que el código funcione como el usuario espera que funcione. Dicho de otro modo, estas pruebas verifican que una entrada dada resulte en una salida esperada. La mayoría de las pruebas funcionales son un tipo de prueba de caja negra, que ignora el código interno del módulo, los efectos secundarios y los resultados intermedios, y prueba solo las interfaces. 

Las pruebas funcionales no generan un informe de cobertura de código. Generalmente, un gerente de calidad (QA) escribirá y usará pruebas funcionales durante una etapa de prueba del sistema. Por el contrario, los desarrolladores escriben y usan pruebas unitarias durante el desarrollo. 

#### Pruebas de integración 

Aprendiste que el objetivo de una prueba unitaria es verificar la sección más pequeña posible de código en aislamiento. Una prueba de integración es todo lo contrario. Verifica el comportamiento de subsistemas completos, ya sea que se trate de capas de código, como el mecanismo de almacenamiento de datos de una aplicación, o funciones específicas que consisten en múltiples módulos. Las pruebas de integración verifican la integración del subsistema en el contexto del entorno actual. Por lo tanto, nunca se ejecutan en aislamiento y generalmente no usan `test doubles`. 

Las pruebas de integración son útiles para encontrar tres tipos de problemas. El primer tipo son problemas relacionados con la comunicación entre módulos, que es la comunicación entre módulos. Los problemas comunes son integraciones defectuosas de API internas y efectos secundarios no detectados, como una función que no elimina archivos antiguos antes de escribir nuevos datos en el sistema de archivos. 
El segundo tipo son problemas relacionados con el entorno, que describe la configuración de hardware y software en la que se ejecuta el código. Las diferentes versiones de software o configuraciones de hardware pueden introducir problemas significativos para tu código. El problema más común para los desarrolladores full-stack involucra diferencias en las versiones de Node.js y dependencias desactualizadas en los módulos. 

El tercer tipo son problemas relacionados con las comunicaciones del gateway, que se refiere a probar cualquier comunicación de API con un gateway API de terceros. Cualquier comunicación con APIs externas debe probarse con pruebas de integración. Esta es la única instancia en la que las pruebas de integración pueden usar `test doubles`, como versiones `stub` de la API externa, para simular un comportamiento específico de la API, como un tiempo de espera o una solicitud exitosa. Al igual que con las pruebas funcionales, generalmente un gerente de calidad escribe y usa pruebas de integración. Los desarrolladores lo hacen con menos frecuencia. 

#### Pruebas end-to-end 

Puedes pensar en la prueba `end-to-end` como una combinación de pruebas funcionales y pruebas de integración. Como otro tipo de prueba de caja negra, examinan la funcionalidad de la aplicación en toda la pila, desde el frontend hasta el backend, en un entorno específico. Estas pruebas orientadas al negocio deberían proporcionar confianza en que la aplicación en su conjunto sigue funcionando como se esperaba. 
  
Las pruebas `end-to-end` ejecutan la aplicación en un entorno específico. A menudo, la complejidad de las muchas dependencias aumenta el riesgo de pruebas inestables en las que la aplicación funciona correctamente, pero el entorno causa que las pruebas fallen. Por lo tanto, las pruebas `end-to-end` son las más difíciles de crear y mantener. Debido a su complejidad, debemos crearlas con cuidado. Durante la ejecución, son conocidas por ser lentas, propensas a encontrar tiempos de espera y, como casi todas las pruebas de caja negra, incapaces de proporcionar informes de errores detallados. Por lo tanto, solo prueban los escenarios más críticos orientados al negocio. Generalmente, un gerente de calidad las escribe. 

#### Pruebas de instantáneas 

Las pruebas descritas anteriormente en esta nota verifican el código contra alguna afirmación. Por el contrario, una prueba de instantánea compara el estado visual actual de la aplicación (o interfaz de usuario) con una versión anterior de la misma. Por lo tanto, estas pruebas también se llaman pruebas de regresión visual. En cada prueba, creamos nuevas instantáneas y luego las comparamos con las almacenadas anteriormente, proporcionando una forma económica de probar componentes de la interfaz de usuario y páginas completas. 
En lugar de crear y mantener manualmente pruebas que describan cada propiedad de una interfaz, como la altura, el ancho, la posición y los colores de un componente, podemos establecer una instantánea que contenga todas estas propiedades. 

Una forma de realizar este tipo de prueba es crear y comparar instantáneas. Generalmente, un navegador headless renderiza el componente; el ejecutor de pruebas espera a que la página se renderice y luego captura una imagen de ella. Desafortunadamente, este proceso es relativamente lento y los navegadores headless son inestables. 

Jest toma un enfoque diferente para las pruebas de instantáneas. En lugar de trabajar con navegadores headless y archivos de imagen, renderiza los componentes de la interfaz de usuario de React en el DOM virtual, los serializa y los guarda como texto plano en archivos `snap` almacenados en el directorio `__snapshots__`. Por lo tanto, las pruebas de instantáneas de Jest son mucho más rápidas y menos defectuosas.  
