## Notas de clase

Para ejecutar este cuaderno de ejemplo, puedes revisar: [Notebooks for Python and Javascript](https://codestax.medium.com/notebooks-for-python-and-javascript-aefbb5040428), está hecho con el objetivo de presentar el código fuente realizado y algunas anotaciones de temas complejos.

### **Exportaciones predeterminadas**

```javascript
const getFoo = function () {  
    return 'C8288';  
};  

export default getFoo; 
```

Se define una función anónima que retorna la cadena 'C8288', y se almacena en la constante `getFoo`. Luego, se exporta esta constante como la exportación predeterminada del módulo usando `export default`. Solo puede haber una exportación predeterminada por archivo.

```javascript
const obtenerManzana = function () {  
    return 'manzana';  
};  

export default obtenerManzana; 
```

### **Exportaciones nombradas**

```javascript
export const getFooBar = function () {  
    return 'fq bar';  
};  

const getBar = function () {  
    return 'bar';  
};  

const getBaz = function () {  
    return 'baz';  
};  

export {getBar, getBaz}; 
```

En este ejemplo, la función `getFooBar` es definida y exportada inmediatamente como una exportación nombrada. Luego, se definen otras dos funciones, `getBar` y `getBaz`, y se exportan juntas usando una sola declaración `export` con llaves (`{}`), lo que permite exportar múltiples elementos a la vez.

```javascript
export const obtenerFruta = function () {  
    return 'manzana pera';  
};  

const obtenerPera = function () {  
    return 'pera';  
};  

const obtenerUva = function () {  
    return 'uva';  
};  

export {obtenerPera, obtenerUva}; 
```

**Apunte:** Las exportaciones predeterminadas se usan para exportar un solo valor o entidad por archivo, mientras que las exportaciones nombradas permiten exportar múltiples valores o entidades.

Cuando importas módulos en ES.Next, la sintaxis que usas depende del tipo de exportación que se hizo en el archivo del módulo.

##### 1. **Importando exportaciones predeterminadas:**

La importación de una exportación predeterminada no requiere llaves `{}`. Puedes importar el módulo con un nombre local de tu elección. Aquí tienes el ejemplo corregido y algunos adicionales:

```javascript
import getFoo from "./default.js"; 
```

- En este caso, `getFoo` es la exportación predeterminada del archivo `default.js`. Se importa sin usar llaves y puedes darle cualquier nombre al importarlo.

```javascript
import obtenerManzana from "./fruta.js";
```

Aquí, `obtenerManzana` es la exportación predeterminada del archivo `fruta.js`. Nuevamente, no se usan llaves, y el nombre `obtenerManzana` puede ser cualquier nombre que elijas.

##### 2. **Importando exportaciones nombradas:**

Para las exportaciones nombradas, debes usar llaves `{}` y especificar el nombre exacto de las entidades que deseas importar. Si deseas renombrar una función o variable importada, puedes hacerlo usando `as`.

```javascript
import {getFooBar, getBar, getBaz} from "./named.js"; 
```

- Este código importa tres funciones (`getFooBar`, `getBar`, `getBaz`) del archivo `named.js`. Estas funciones se importan usando sus nombres originales y deben estar dentro de llaves `{}`.

##### **Importando y renombrando:**

```javascript
import {getFooBar as obtenerFruta, getBar as obtenerPera, getBaz as obtenerUva} from "./fruta.js"; 
```

Aquí, las funciones `getFooBar`, `getBar`, y `getBaz` se importan y se les asignan nuevos nombres (`obtenerFruta`, `obtenerPera`, `obtenerUva`) localmente en el archivo actual.

###### **Importando solo algunos módulos:**

```javascript
import {getFooBar, getBaz} from "./fruta.js";
```

En este caso, solo se importan dos funciones (`getFooBar` y `getBaz`) desde el archivo `fruta.js`, y se omite `getBar`.

##### 3. **Importación combinada:**

Puedes combinar la importación de una exportación predeterminada y exportaciones nombradas en una sola línea:

```javascript
import obtenerManzana, {getBar as obtenerPera, getBaz as obtenerUva} from "./fruta.js"; 
```

Este código importa la exportación predeterminada `obtenerManzana` y las exportaciones nombradas `getBar` y `getBaz`, renombradas como `obtenerPera` y `obtenerUva`, respectivamente.

##### 4. **Importando todo el módulo:**

Si deseas importar todo el contenido de un módulo bajo un solo objeto, puedes hacerlo usando el asterisco `*` y un alias:

```javascript
import * as frutas from "./fruta.js";
```

Ahora, todo lo que se exporta desde `fruta.js` está disponible bajo el objeto `frutas`. Puedes acceder a las funciones como `frutas.getFooBar`, `frutas.getBar`, y `frutas.getBaz`.

Estos ejemplos muestran cómo puedes trabajar con las diferentes formas de importación de módulos en JavaScript ES.Next, permitiéndote organizar y reutilizar tu código de manera efectiva. 

---
### **Declaración de variables**

#### 1. Alcance global

Las variables declaradas en el alcance global están disponibles en todo el programa, sin importar dónde se utilicen.

```javascript
// Variable global
var globalVar = "Soy global";

function checkGlobal() {
    console.log(globalVar); // Puede acceder a globalVar porque es global
}

checkGlobal(); // Imprime: Soy global
console.log(globalVar); // Imprime: Soy global
```

Aquí, `globalVar` es una variable global porque se declara fuera de cualquier función, módulo o bloque. Es accesible tanto dentro de la función `checkGlobal` como fuera de ella, en cualquier parte del programa.

#### 2. Alcance de módulo

El alcance del módulo se refiere a variables y funciones que están disponibles solo dentro del módulo (archivo) en el que se definen.

```javascript
// archivo: module1.js
// Variable de módulo
let moduleVar = "Estoy en el módulo 1";

export function checkModule() {
    console.log(moduleVar); // Puede acceder a moduleVar porque está en el mismo módulo
}

// archivo: module2.js
import { checkModule } from './module1.js';

checkModule(); // Imprime: Estoy en el módulo 1
console.log(moduleVar); // Error: moduleVar is not defined
```

La variable `moduleVar` está disponible solo dentro de `module1.js`. Aunque la función `checkModule` puede acceder a `moduleVar` dentro del mismo módulo, `moduleVar` no es accesible en `module2.js`.

#### 3. Alcance de función

Las variables definidas dentro de una función tienen un alcance de función, lo que significa que son accesibles solo dentro de esa función.

```javascript
function checkFunctionScope() {
    var functionVar = "Estoy dentro de una función";
    console.log(functionVar); // Imprime: Estoy dentro de una función
}

checkFunctionScope();
console.log(functionVar); // Error: functionVar is not defined
```

`functionVar` solo está disponible dentro de `checkFunctionScope`. Al intentar acceder a `functionVar` fuera de la función, se genera un error porque no existe fuera del alcance de la función.

#### 4. Alcance de bloque

Las variables declaradas con `let` o `const` dentro de un bloque `{}` tienen alcance de bloque, lo que significa que solo son accesibles dentro de ese bloque específico.

```javascript
if (true) {
    let blockVar = "Estoy dentro de un bloque";
    console.log(blockVar); // Imprime: Estoy dentro de un bloque
}

console.log(blockVar); // Error: blockVar is not defined
```

`blockVar` se define dentro de un bloque `if`, por lo que solo es accesible dentro de ese bloque. Al intentar acceder a `blockVar` fuera de ese bloque, se genera un error porque está fuera de su alcance.

#### 5. Combinación de alcances

Un alcance puede contener múltiples alcances secundarios. Por ejemplo, un alcance de función puede contener varios alcances de bloque.

```javascript
function checkScopes() {
    var functionVar = "Estoy en el alcance de función";

    if (true) {
        let blockVar = "Estoy en el alcance de bloque";
        console.log(functionVar); // Imprime: Estoy en el alcance de función
        console.log(blockVar); // Imprime: Estoy en el alcance de bloque
    }

    console.log(blockVar); // Error: blockVar is not defined
}

checkScopes();
```

`functionVar` es accesible dentro del bloque `if` porque el alcance de función contiene al alcance de bloque. Sin embargo, `blockVar` no es accesible fuera del bloque `if` porque su alcance está limitado a ese bloque específico.

---

#### **Variables hoisted**

En JavaScript, cuando declaras variables con la palabra clave `var`, estas variables son "izadas" (hoisted). Esto significa que el entorno de ejecución de JavaScript "mueve" la declaración de la variable al principio de su alcance, antes de que cualquier otro código sea ejecutado.

```javascript
console.log(a); // ¿Qué crees que sucede aquí?
var a = 5;
```

Lo que realmente ocurre internamente:

```javascript
var a; // La declaración es izada al inicio de su alcance
console.log(a); // Aquí a es undefined, porque la asignación aún no ha ocurrido
a = 5; // Asignación del valor a a
```

- La declaración `var a;` es movida al principio del alcance (en este caso, el alcance global), pero su valor aún no se ha asignado. Esto significa que `a` existe y está definida, pero su valor es `undefined` en el momento en que `console.log(a);` se ejecuta.
- Cuando `console.log(a);` se ejecuta, `a` ya ha sido declarada, pero no tiene un valor asignado aún, por lo que `undefined` se imprime en la consola.
- Finalmente, se ejecuta la línea `a = 5;`, asignando el valor `5` a `a`.

Este comportamiento es específico de variables declaradas con `var`. Las variables declaradas con `let` y `const` no están accesibles antes de la línea en la que se declaran debido a una característica llamada "zona muerta temporal" (Temporal Dead Zone), lo que genera un error si intentas usarlas antes de su declaración.

---

#### **La palabra clave let**

```javascript
let globalVar = "global";

function scope() {
    let a = "1";

    if (true) {
        let bar = "2";
    }

    console.log(globalVar); // Imprime: "global"
    console.log(window.globalVar); // Imprime: undefined
    console.log(a); // Imprime: "1"
    console.log(bar); // Error: Uncaught ReferenceError: bar is not defined
}

scope();
```

- `let globalVar`: Esta variable se declara en el alcance global pero no se agrega al objeto `window`, lo que significa que `window.globalVar` será `undefined`.
- `let a`: Esta variable se declara dentro de la función `scope` y solo es accesible dentro de esa función. Por lo tanto, `console.log(a);` imprime `"1"`.
- `let bar`: Esta variable se declara dentro de un bloque `if`, y su alcance está limitado a ese bloque. Como resultado, intentar acceder a `bar` fuera del bloque generará un error.
- `window.globalVar`: Como `globalVar` se declaró con `let`, no se convierte en una propiedad del objeto global `window`, lo que significa que `window.globalVar` es `undefined`.

```javascript
let globalVar = "global";

function scope() { 
    let f = 1; 
    if (true) { 
        let bar = "2"; 
        console.log(bar); // Puedes acceder a 'bar' aquí dentro
    } 
    console.log(globalVar); 

    // En lugar de window, utiliza global en Node.js
    if (typeof global !== "undefined") {
        console.log(global.globalVar); 
    }

    console.log(f); 

    // Aquí fuera, 'bar' no es accesible, así que comentamos o eliminamos esta línea
    // console.log(bar); // Esto generará un error porque 'bar' no está en el alcance
}

scope();

```
```javascript
function loopExample() {
    for (let i = 0; i < 3; i++) {
        console.log(i); // Imprime: 0, 1, 2
    }

    console.log(i); // Error: Uncaught ReferenceError: i is not defined
}

loopExample();
```
Aquí, `i` está limitado al alcance del bloque for, lo que significa que solo es accesible dentro del ciclo. Intentar acceder a `i` fuera del ciclo generará un error porque `i` no está definida fuera del alcance del bloque.

```javascript
function temporalDeadZoneExample() {
    console.log(a); // Error: Uncaught ReferenceError: a is not defined
    let a = 10;
}

temporalDeadZoneExample();
```
Aunque la variable `a` es izada técnicamente, no se puede acceder a ella antes de su declaración debido a la "Zona Muerta Temporal" (TDZ). Esto provoca un error de referencia cuando intentas usar a antes de su declaración con let.

```javascript
function letVsVarExample() {
    if (true) {
        let x = 5;
        var y = 10;
    }

    console.log(x); // Error: Uncaught ReferenceError: x is not defined
    console.log(y); // Imprime: 10
}

letVsVarExample();
```
`x` es una variable de alcance de bloque y no está disponible fuera del bloque if, mientras que `y` es una variable declarada con `var`, que tiene un alcance de función (o global si está fuera de cualquier función), lo que permite que y sea accesible fuera del bloque if.

**Datos como constantes**

```javascript
const primitiveDataType = 1;

try {
    primitiveDataType = 2;
} catch (err) {
    console.log(err); // Error: TypeError: Assignment to constant variable.
}

const nonPrimitiveDataType = [];

nonPrimitiveDataType.push(1);
console.log(nonPrimitiveDataType); // Imprime: [1]
```
Si intentaras reasignar una constante que contiene un objeto, obtendrías un error similar al anterior:

```javascript
const obj = { name: "Kapu" };

try {
    obj = { name: "Mota" };
} catch (err) {
    console.log(err); // Error: TypeError: Assignment to constant variable.
}

// Sin embargo, puedes modificar las propiedades del objeto:
obj.name = "Mota";
console.log(obj); // Imprime: { name: "Mota" }
```

---

### **Funciones flechas**

Las funciones flecha, introducidas en ECMAScript 6 (ES6), son una forma más concisa de escribir funciones en JavaScript. Son especialmente útiles cuando se quieren definir funciones de manera rápida y en situaciones donde se utilizan como callbacks o funciones anónimas.

```javascript
const nombreFuncion = (parametros) => {
    // Cuerpo de la función
    return resultado;
};
```

Si la función tiene solo un parámetro, puedes omitir los paréntesis, y si el cuerpo de la función tiene una sola expresión, puedes omitir las llaves `{}` y la palabra clave `return`.

```javascript
const traditional = function (x) {
    return x * x;
};

const conciseBody = x => x * x;
const sum = (a, b) => {
    return a + b;
};

// O de manera aún más concisa:
const sumConcise = (a, b) => a + b;

console.log(sum(2, 3)); // Imprime: 5
console.log(sumConcise(2, 3)); // Imprime: 5
```

Aquí, `sum` y `sumConcise` son funciones flecha que aceptan dos parámetros (`a` y `b`) y devuelven su suma. La versión concisa es posible porque el cuerpo de la función es una sola expresión.

```javascript
const greet = () => "Hello, world!";
console.log(greet()); // Imprime: Hello, world!
```

Cuando una función flecha no tiene parámetros, los paréntesis vacíos `()` son obligatorios. En este caso, la función `greet` devuelve una cadena fija "Hello, world!".

---

### **Funciones flechas y callbacks**

Las funciones flecha son especialmente útiles como *callbacks*, donde se necesita pasar una función como argumento a otra función.

```javascript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log(doubled); // Imprime: [2, 4, 6, 8, 10]
```

En este ejemplo, la función flecha `n => n * 2` se pasa como *callback* al método `map` de un array. Cada elemento del array `numbers` se multiplica por 2, y el resultado se almacena en el nuevo array `doubled`.

---

### **Alcance léxico**

Una de las características más importantes de las funciones flecha es su manejo del contexto `this`. A diferencia de las funciones tradicionales, las funciones flecha no tienen su propio `this`. En su lugar, heredan el `this` del contexto en el que fueron definidas, lo que las hace más predecibles en situaciones donde se usan como *callbacks*.

```javascript
function Person() {
    this.age = 0;

    setInterval(() => {
        this.age++;
        console.log(this.age); // Imprime: 1, 2, 3, ...
    }, 1000);
}

const person = new Person();
```

En este ejemplo, la función flecha usada en `setInterval` hereda el `this` de la función `Person`. Esto significa que dentro de la función flecha, `this` se refiere al objeto `person`, lo que permite que `this.age` se incremente correctamente. Si hubiéramos usado una función tradicional, `this` podría haber sido redefinido y no se habría comportado como se esperaba.

```javascript
this.scope = "alcance léxico"; // ❶ Definición en el contexto global

const scopeOf = {
    scope: "alcance definidor", // ❷ Definición en el objeto `scopeOf`

    traditional: function () {
        return this.scope; // ❸ `this` se refiere al objeto que llama a la función
    },

    arrow: () => {
        return this.scope; // `this` se refiere al contexto léxico, no al objeto
    },
};

console.log(scopeOf.traditional()); // Imprime: "alcance definidor"
console.log(scopeOf.arrow()); // Imprime: "alcance léxico"
```

- **Alcance léxico (❶)**: La variable `this.scope` se define en el contexto global. Esto significa que `this` en cualquier función flecha definida en este contexto se referirá a `this.scope = "alcance léxico"`.
- **Alcance definidor (❷)**: Dentro del objeto `scopeOf`, hay una propiedad `scope` definida con el valor "alcance definidor". Este es el valor que una función tradicional referenciará.
- **Función tradicional (❸)**: La función `traditional` es una función regular. Cuando `scopeOf.traditional()` es llamada, `this` se refiere al objeto `scopeOf`, por lo que devuelve "alcance definidor".
- **Función flecha**: La función `arrow` es una función flecha. Cuando se ejecuta `scopeOf.arrow()`, `this` no se refiere al objeto `scopeOf`, sino al contexto léxico global, devolviendo "alcance léxico".

---

### **Funciones como ciudadanos de primera clase**

En JavaScript, las funciones son tratadas como ciudadanos de primera clase, lo que significa que pueden ser asignadas a variables, pasadas como argumentos a otras funciones, y devueltas por funciones.

```javascript
let numbers = [-2, -1, 0, 1, 2];

let traditional = numbers.filter(function(num) {
    return num >= 0;
});

let arrow = numbers.filter(num => num >= 0);

console.log(traditional); // Imprime: [0, 1, 2]
console.log(arrow); // Imprime: [0, 1, 2]
```

---

### **Cadenas**

#### Literales de plantilla no etiquetado

```javascript
let a = 1; 
let b = 2; 
let string = `${a} + ${b} = ${a + b}`; 
console.log(string);

let name = "Alice"; 
let age = 30; 
let greeting = `Hola, mi nombre es ${name} y tengo ${age} años.`; 
console.log(greeting);

let multiLine = `This is a string 
that spans across 
multiple lines.`;

console.log(multiLine);
```

#### Literales de plantilla etiquetado

```javascript
function simpleTag(strings, ...values) { 
    console.log(strings);  // ["Hello, ", " is ", " years old."] 
    console.log(values);   // ["Kapu", 30] 
    return strings.join('') + values.join(''); 
} 

let name = "Kapu"; 
let age = 30; 

let result = simpleTag`Hello, ${name} is ${age} years old.`; 
console.log(result); 
```

La función `simpleTag` recibe una matriz de partes de cadena (`strings`) y una matriz de valores interpolados (`values`), que luego son combinados y retornados.

```javascript
function simpleTag(strings, ...values) { 
    let result = strings.reduce((acc, str, i) => {
        return acc + str + (values[i] !== undefined ? values[i] : '');
    }, '');
    return result;
} 

let name = "Kapu"; 
let age = 30; 

let result = simpleTag`Hello, ${name} is ${age} years old.`; 
console.log(result);
```

Utilizamos `reduce` para construir la cadena final. Por cada parte de la cadena en `strings`, se añade el correspondiente valor interpolado de `values`, si existe.

---

### **Funciones flecha y callbacks**

```javascript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log(doubled); // Imprime: [2, 4, 6, 8, 10]
```

Las funciones flecha son especialmente útiles cuando se pasan como *callbacks*. Aquí, la función flecha multiplica cada número del arreglo por 2, y el resultado se guarda en un nuevo arreglo.

---
### **Programación asincrónica en JavaScript**

#### ¿Qué son las tareas no bloqueantes?

Las tareas no bloqueantes son operaciones que pueden iniciarse y, en lugar de esperar a que se completen, permiten que el programa continúe ejecutando otras operaciones. Una vez que la tarea no bloqueante está completa, el programa vuelve a procesar su resultado. Este enfoque es clave en la programación asincrónica en JavaScript.

Cuando ejecutas un script en JavaScript, cada línea de código se ejecuta secuencialmente. Sin embargo, si una tarea tarda mucho tiempo (como una solicitud de red o una lectura de archivo), esto podría bloquear el hilo principal. Para evitarlo, JavaScript permite que ciertas operaciones se realicen de manera asincrónica, liberando el hilo principal para que continúe con otras tareas.

```javascript
console.log("Inicio de la solicitud");

fetch("https://api.example.com/data")
    .then(response => response.json())
    .then(data => {
        console.log("Datos recibidos:", data);
    });

console.log("Solicitud enviada, esperando respuesta...");
```

En este ejemplo:

1. **Inicio de la solicitud**: Se imprime inmediatamente.
2. **Solicitud enviada, esperando respuesta...**: También se imprime de inmediato, sin esperar a que se complete la solicitud de la API.
3. **Datos recibidos**: Este mensaje se imprime solo después de que los datos se han recibido y procesado.

---

### **Callbacks**

En JavaScript, un *callback* es una función que se pasa como argumento a otra función y que se ejecuta después de que se completa alguna operación.

```javascript
function getData(callback) { 
    console.log("Iniciando solicitud de datos..."); 
    setTimeout(() => { 
        console.log("Datos recibidos"); 
        const data = { id: 1, name: "Producto" }; 
        callback(data); 
    }, 2000); 
} 

function processData(data) { 
    console.log("Procesando datos:", data); 
} 

getData(processData);
```

**Explicación**:

1. `getData` recibe una función *callback* como argumento.
2. Se simula una operación asincrónica con `setTimeout`.
3. Después de 2 segundos, se obtiene "Datos recibidos" y se ejecuta el *callback* (`processData`), pasando los datos obtenidos como argumento.
4. `processData` se llama y los datos son procesados (en este caso, se imprimen en la consola).

---

### **Callback anidado**

```javascript
function primeraTarea(callback) { 
    setTimeout(() => { 
        console.log("Primera tarea completada"); 
        callback("datos de la primera tarea"); 
    }, 1000); 
} 

function segundaTarea(data, callback) { 
    setTimeout(() => { 
        console.log("Segunda tarea completada usando", data); 
        callback("datos de la segunda tarea"); 
    }, 1000); 
} 

function terceraTarea(data, callback) { 
    setTimeout(() => { 
        console.log("Tercera tarea completada usando", data); 
        callback("datos de la tercera tarea"); 
    }, 1000); 
} 

primeraTarea((data1) => { 
    segundaTarea(data1, (data2) => { 
        terceraTarea(data2, (data3) => { 
            console.log("Todas las tareas completadas con:", data3); 
        }); 
    }); 
});
```

- `primeraTarea`, `segundaTarea`, y `terceraTarea` son funciones asincrónicas que dependen unas de otras.
- Cada función recibe un *callback* que se ejecuta una vez que la tarea está completa.
- Al finalizar todas las tareas, la consola imprimirá: "Todas las tareas completadas con: datos de la tercera tarea".

---

### **Infierno de callbacks**

El código con *callbacks* anidados puede volverse difícil de leer y mantener, creando lo que se conoce como el "infierno de *callbacks*":

```javascript
doSomething(function(result) { 
    doSomethingElse(result, function(newResult) { 
        doAnotherThing(newResult, function(finalResult) { 
            doFinalThing(finalResult, function() { 
                console.log("Primera parte completada");      
                doSomethingMore(function(extraResult) {
                    doEvenMore(extraResult, function(evenMoreResult) {
                        finishItOff(evenMoreResult, function() {
                            console.log("Todo completado finalmente");
                        });
                    });
                });
            }); 
        }); 
    }); 
});
```

Este tipo de código es difícil de mantener debido a la profundidad de los *callbacks* anidados. Afortunadamente, las **Promesas** y **async/await** son soluciones más elegantes para manejar este tipo de situaciones.

---

### **Promesas**

Las promesas en JavaScript son un mecanismo para manejar operaciones asincrónicas de manera más limpia y manejable que con los *callbacks* tradicionales. Una promesa representa un valor que puede estar disponible ahora, en el futuro, o nunca.

#### Estados de una promesa:

- **Pendiente (Pending)**: La promesa se ha iniciado, pero aún no ha terminado.
- **Cumplida (Fulfilled)**: La operación se completó con éxito, y la promesa devuelve un valor.
- **Rechazada (Rejected)**: La operación falló, y la promesa devuelve un error.

#### Encadenamiento:

- `.then()`: Se ejecuta cuando la promesa se resuelve con éxito.
- `.catch()`: Se ejecuta si la promesa se rechaza debido a un error.
- `.finally()`: Se ejecuta después de que la promesa se resuelva o se rechace.

```javascript
function ejemploPromesa() {
    return new Promise((resolve, reject) => {
        let exito = true; // Simula una operación exitosa

        if (exito) {
            resolve("La operación fue exitosa");
        } else {
            reject("La operación falló");
        }
    });
}

ejemploPromesa()
    .then((mensaje) => {
        console.log(mensaje); // Imprime: La operación fue exitosa
    })
    .catch((error) => {
        console.error(error); // Esto no se ejecuta en este caso
    })
    .finally(() => {
        console.log("Operación completada"); // Imprime: Operación completada
    });
```

**Explicación**:

1. Se crea una nueva promesa que simula una operación que puede tener éxito o fallar.
2. `resolve`: Llama a esta función si la operación tiene éxito.
3. `reject`: Llama a esta función si la operación falla.
4. Se utilizan `.then()`, `.catch()` y `.finally()` para manejar los diferentes resultados de la promesa.

---

### **Promesas y fetch**

Un ejemplo práctico de **promesas** es usando la API `fetch` para obtener datos de una URL.

```javascript
function fetchData(url) {
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((json) => {
            console.log("Datos obtenidos:", json);
        })
        .catch((error) => {
            console.error(`Error: ${error.message}`);
        })
        .finally(() => {
            console.log("Finalizó la operación de fetch.");
        });
}

fetchData("https://jsonplaceholder.typicode.com/posts/1");
```

1. `fetch(url)`: Hace una solicitud HTTP y devuelve una promesa.
2. Primer `.then()`: Verifica si la respuesta fue exitosa (código de estado HTTP 200-299). Si no lo fue, lanza un error.
3. Segundo `.then()`: Parsea la respuesta en formato JSON y la imprime en la consola.
4. `.catch()`: Captura cualquier error ocurrido durante la operación.
5. `.finally()`: Siempre se ejecuta, independientemente de si la promesa se resolvió o se rechazó, y se utiliza para realizar tareas de limpieza.

---

### **async/await**

`async/await` es una sintaxis más clara y directa para manejar promesas. Permite escribir código asincrónico que se asemeja al código síncrono.

```javascript
function getData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Datos recibidos");
        }, 2000);
    });
}

async function fetchData() {
    console.log("Iniciando solicitud...");
    const data = await getData();
    console.log(data); // Se ejecuta después de que la promesa se resuelve
    console.log("Solicitud completada.");
}

fetchData();
```

- `async` marca una función como asincrónica.
- `await` pausa la ejecución de la función hasta que la promesa se resuelve.

Con `async/await`, puedes manejar errores usando `try/catch`:

```javascript
async function fetchData() {
    try {
        console.log("Iniciando solicitud...");
        const data = await getData();
        console.log(data); // Se ejecuta si la promesa se resuelve
    } catch (error) {
        console.error(error); // Se ejecuta si la promesa se rechaza
    } finally {
        console.log("Solicitud completada."); // Siempre se ejecuta
    }
}
```
---

### **Encadenamiento de `async/await`**

Con `async/await`, puedes encadenar varias promesas de una manera más sencilla y clara. En lugar de utilizar múltiples `.then()`, puedes esperar a que cada promesa se resuelva antes de pasar al siguiente paso.

```javascript
async function processData() {
    try {
        const step1 = await firstStep();
        console.log("Paso 1:", step1);

        const step2 = await secondStep(step1);
        console.log("Paso 2:", step2);

        const step3 = await thirdStep(step2);
        console.log("Paso 3:", step3);
        
        console.log("Todos los pasos completados.");
    } catch (error) {
        console.error("Error en el proceso:", error);
    }
}

processData();
```

En este ejemplo, cada paso depende del resultado del paso anterior. Si alguna promesa falla, el bloque `catch` manejará el error.

---

### **Paralelismo con `async/await` y `Promise.all`**

Si tienes varias promesas independientes entre sí, puedes ejecutarlas en paralelo utilizando `Promise.all`. Esto puede hacer que tu código sea más eficiente, ya que no necesitas esperar a que una promesa se resuelva antes de iniciar otra.

```javascript
async function fetchMultipleData() {
    const promise1 = getData1(); // Simula una solicitud de datos
    const promise2 = getData2(); // Simula otra solicitud de datos

    try {
        const [data1, data2] = await Promise.all([promise1, promise2]);
        console.log("Datos 1:", data1);
        console.log("Datos 2:", data2);
    } catch (error) {
        console.error("Error al obtener datos:", error);
    }
}

fetchMultipleData();
```

- `Promise.all` toma un arreglo de promesas y espera a que todas se resuelvan. Si alguna falla, se ejecutará el bloque `catch`.

---

### **Operador de propagación (spread operator)**

El operador de propagación, representado por `...`, permite expandir los elementos de un arreglo o las propiedades de un objeto de manera sencilla. Es muy útil cuando se trabaja con arreglos y objetos en JavaScript.

#### Propagación en objetos:

```javascript
let object = { fruit: "apple", color: "green" };
let { fruit, color } = { ...object };

console.log(`fruit: ${fruit}, color: ${color}`);

color = "red";
console.log(`object.color: ${object.color}, color: ${color}`);
```

En este ejemplo, las propiedades del objeto `object` se "propagan" en las variables `fruit` y `color`. Puedes modificar las variables sin afectar el objeto original.

#### Propagación en arreglos:

```javascript
let originalArray = [1, 2, 3];
let clonedArray = [...originalArray];

clonedArray[0] = "one";
clonedArray[1] = "two";
clonedArray[2] = "three";

console.log(`Arreglo original: ${originalArray}, Arreglo clonado: ${clonedArray}`);
```

El operador de propagación se utiliza para clonar el arreglo `originalArray`. Los cambios realizados en `clonedArray` no afectan al arreglo original.

---

### **Promesas y asincronía en paralelo**

Usar `Promise.all` es una forma eficiente de manejar promesas en paralelo. Esto es útil cuando tienes múltiples operaciones que no dependen entre sí.

```javascript
let promise1 = new Promise((resolve) => setTimeout(() => resolve("Primera promesa"), 1000));
let promise2 = new Promise((resolve) => setTimeout(() => resolve("Segunda promesa"), 2000));
let promise3 = new Promise((resolve) => setTimeout(() => resolve("Tercera promesa"), 3000));

Promise.all([promise1, promise2, promise3])
    .then(results => {
        console.log("Todas las promesas completadas:", results);
    })
    .catch(error => {
        console.error("Ocurrió un error en alguna promesa:", error);
    });
```

- `Promise.all` ejecuta todas las promesas en paralelo y se resuelve cuando todas se completan. Si alguna falla, el bloque `catch` maneja el error.
- El valor devuelto por `Promise.all` es un arreglo con los resultados de cada promesa, en el mismo orden en que fueron proporcionadas.

---

### **Hoisting (Izado) en JavaScript**

El izado (`hoisting`) es un comportamiento de JavaScript donde las declaraciones de variables y funciones se "mueven" al comienzo del alcance antes de la ejecución del código. Esto significa que puedes usar variables y funciones antes de que aparezcan en el código, aunque el valor de las variables declaradas con `var` será `undefined` hasta que se les asigne un valor.

#### Variables declaradas con `var`:

```javascript
console.log(a); // undefined
var a = 5;
```

Lo que sucede internamente es que la declaración de `var a` se mueve al comienzo del código, pero su valor aún no está asignado:

```javascript
var a;
console.log(a); // undefined
a = 5;
```

Las variables declaradas con `let` o `const` no se comportan de esta manera debido a la **zona muerta temporal** (TDZ, *Temporal Dead Zone*), lo que genera un error si intentas usarlas antes de su declaración:

```javascript
console.log(b); // Error: Cannot access 'b' before initialization
let b = 10;
```

---

### **Ejemplo de temporización asincrónica**

La función `setTimeout` es muy utilizada en JavaScript para ejecutar código después de un retraso.

```javascript
console.log("Inicio");

setTimeout(() => {
    console.log("Esta tarea se ejecuta después de 2 segundos");
}, 2000);

console.log("Fin");
```

1. "Inicio" y "Fin" se imprimen inmediatamente.
2. La tarea dentro de `setTimeout` se ejecuta después de 2 segundos.

#### Temporización con auto-llamada:

Puedes crear una especie de intervalo usando `setTimeout` y una función que se llama a sí misma:

```javascript
console.log("Iniciando el intervalo");
let counter = 0;

function executeInterval() {
    counter++;
    console.log(`Intervalo ejecutado: ${counter}`);
    if (counter < 5) {
        setTimeout(executeInterval, 1000); // Se llama a sí misma después de 1 segundo
    }
}

setTimeout(executeInterval, 1000); // Comienza el "intervalo" después de 1 segundo
console.log("Intervalo configurado");
```

El intervalo se ejecuta cada segundo y se detiene después de 5 iteraciones.

---

### **Conclusión de Promesas y asincronía**

El uso de promesas y la sintaxis `async/await` simplifican la programación asincrónica en JavaScript, eliminando el problema del "infierno de callbacks" y haciendo el código más fácil de leer y mantener. Además, técnicas como `Promise.all` permiten el manejo eficiente de múltiples promesas en paralelo.

