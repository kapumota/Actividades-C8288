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

#### 1. Alcance Global

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

#### 3. Alcance de Función

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

### **Variable hoisted**

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

### **La palabra clave let**

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
