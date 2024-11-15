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

describe("the sum function", () => {

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
