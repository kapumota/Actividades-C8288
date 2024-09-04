// Exportaciones predeterminadas
const getFoo = function () {  
    return 'C8288';  
};  
export default getFoo; 

const obtenerManzana = function () {  
    return 'manzana';  
};  
export default obtenerManzana;

// Exportaciones nombradas
export const getFooBar = function () {  
    return 'fq bar';  
};  

const getBar = function () {  
    return 'bar';  
};  

const getBaz = function () {  
    return 'baz';  
};  

export { getBar, getBaz };

export const obtenerFruta = function () {  
    return 'manzana pera';  
};  

const obtenerPera = function () {  
    return 'pera';  
};  

const obtenerUva = function () {  
    return 'uva';  
};  

export { obtenerPera, obtenerUva };

// Alcance Global
var globalVar = "Soy global";

function checkGlobal() {
    console.log(globalVar); // Puede acceder a globalVar porque es global
}

checkGlobal(); // Imprime: Soy global
console.log(globalVar); // Imprime: Soy global

// Alcance de módulo
let moduleVar = "Estoy en el módulo 1";

export function checkModule() {
    console.log(moduleVar); // Puede acceder a moduleVar porque está en el mismo módulo
}

// Alcance de Función
function checkFunctionScope() {
    var functionVar = "Estoy dentro de una función";
    console.log(functionVar); // Imprime: Estoy dentro de una función
}

checkFunctionScope();
console.log(functionVar); // Error: functionVar is not defined

// Alcance de Bloque
if (true) {
    let blockVar = "Estoy dentro de un bloque";
    console.log(blockVar); // Imprime: Estoy dentro de un bloque
}

console.log(blockVar); // Error: blockVar is not defined

// Combinación de alcances
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

// Ejemplo de variable hoisted
console.log(a); // Imprime: undefined
var a = 5;

// Uso de let
let globalVarLet = "global";

function scope() {
    let f = 1;
    if (true) {
        let bar = "2";
        console.log(bar); // Puedes acceder a 'bar' aquí dentro
    }
    console.log(globalVarLet);
    
    // En lugar de window, utiliza global en Node.js
    if (typeof global !== "undefined") {
        console.log(global.globalVar); 
    }

    console.log(f);
}

scope();

// Ejemplo de let en bucle
function loopExample() {
    for (let i = 0; i < 3; i++) {
        console.log(i); // Imprime: 0, 1, 2
    }

    console.log(i); // Error: Uncaught ReferenceError: i is not defined
}

loopExample();

// Temporal Dead Zone (TDZ)
function temporalDeadZoneExample() {
    console.log(a); // Error: Uncaught ReferenceError: a is not defined
    let a = 10;
}

temporalDeadZoneExample();

// Diferencia let vs var
function letVsVarExample() {
    if (true) {
        let x = 5;
        var y = 10;
    }

    console.log(x); // Error: Uncaught ReferenceError: x is not defined
    console.log(y); // Imprime: 10
}

letVsVarExample();

// Constantes
const primitiveDataType = 1;

try {
    primitiveDataType = 2;
} catch (err) {
    console.log(err); // Error: TypeError: Assignment to constant variable.
}

const nonPrimitiveDataType = [];
nonPrimitiveDataType.push(1);
console.log(nonPrimitiveDataType); // Imprime: [1]

const obj = { name: "Kapu" };

try {
    obj = { name: "Mota" };
} catch (err) {
    console.log(err); // Error: TypeError: Assignment to constant variable.
}

obj.name = "Mota";
console.log(obj); // Imprime: { name: "Mota" }

// Funciones flecha
const nombreFuncion = (parametros) => {
    return resultado;
};

const traditional = function (x) {
    return x * x;
};

const conciseBody = x => x * x;
const sum = (a, b) => {
    return a + b;
};

const sumConcise = (a, b) => a + b;

console.log(sum(2, 3)); // Imprime: 5
console.log(sumConcise(2, 3)); // Imprime: 5

const greet = () => "Hello, world!";
console.log(greet()); // Imprime: Hello, world!

// Funciones flechas como callbacks
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log(doubled); // Imprime: [2, 4, 6, 8, 10]

// Alcance léxico
function Person() {
    this.age = 0;

    setInterval(() => {
        this.age++;
        console.log(this.age); // Imprime: 1, 2, 3, ...
    }, 1000);
}

const person = new Person();

this.scope = "alcance léxico";

const scopeOf = {
    scope: "alcance definidor",

    traditional: function () {
        return this.scope;
    },

    arrow: () => {
        return this.scope;
    },
};

console.log(scopeOf.traditional()); // Imprime: "alcance definidor"
console.log(scopeOf.arrow()); // Imprime: "alcance léxico"

// Función tradicional y función flecha en setInterval
function Timer() {
    this.seconds = 0;

    setInterval(() => {
        this.seconds++;
        console.log(this.seconds);
    }, 1000);
}

const timer = new Timer(); // Funciona correctamente

// Funciones como ciudadanos de primera clase
let numbersArray = [-2, -1, 0, 1, 2];

let traditionalFilter = numbersArray.filter(function(num) {
    return num >= 0;
});

let arrowFilter = numbersArray.filter(num => num >= 0);

console.log(traditionalFilter); // Imprime: [0, 1, 2]
console.log(arrowFilter); // Imprime: [0, 1, 2]

// Literales de plantilla no etiquetados
let a = 1; 
let b = 2; 
let string = `${a} + ${b} = ${a + b}`; 
console.log(string);

let name = "Alice"; 
let age = 30; 
let greeting = `Hola mi nombre es ${name} y tengo ${age} años.`; 
console.log(greeting);

let multiLine = `This is a string 
that spans across 
multiple lines.`;
console.log(multiLine);

// Literales de plantilla etiquetados
function simpleTag(strings, ...values) { 
    return strings.join('') + values.join('');
}

let nameTag = "Kapu"; 
let ageTag = 30; 
let result = simpleTag`Hello, ${nameTag} is ${ageTag} years old.`;
console.log(result);

function simpleTagWithReduce(strings, ...values) { 
    let result = strings.reduce((acc, str, i) => {
        return acc + str + (values[i] !== undefined ? values[i] : '');
    }, '');
    return result;
}

let resultWithReduce = simpleTagWithReduce`Hello, ${nameTag} is ${ageTag} years old.`;
console.log(resultWithReduce);

function upperCaseTag(strings, ...values) { 
    let result = strings.map(str => str.toUpperCase());
    return result.reduce((acc, str, i) => acc + str + (values[i] || ''), '');
}

let city = "Wonderland"; 
let message = upperCaseTag`Hello, ${nameTag} from ${city}!`;
console.log(message);

function formatCurrency(strings, ...values) { 
    return strings.reduce((result, string, i) => { 
        let value = values[i]; 
        if (typeof value === 'number') { 
            value = `$${value.toFixed(2)}`; 
        } 
        return result + string + (value || ''); 
    }, ''); 
}

let price = 25.99; 
let discount = 5; 
let receipt = formatCurrency`El precio total es ${price} con un descuento de ${discount}.`; 
console.log(receipt);

// Ejemplo de tareas no bloqueantes
console.log("Inicio de la solicitud");

fetch("https://jsonplaceholder.typicode.com/posts/1")
    .then(response => response.json())
    .then(data => {
        console.log("Datos recibidos:", data);
    });

console.log("Solicitud enviada, esperando respuesta...");

console.log("Inicio");

setTimeout(() => {
    console.log("Esta tarea se ejecuta después de 2 segundos");
}, 2000);

console.log("Fin");

console.log("Iniciando el intervalo");
let counter = 0;

function executeInterval() {
    counter++;
    console.log(`Intervalo ejecutado: ${counter}`);
    if (counter < 5) {
        setTimeout(executeInterval, 1000);
    }
}

setTimeout(executeInterval, 1000);
console.log("Intervalo configurado");

// Ejemplo de callback
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

// Callback anidado
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

// Ejemplo de infierno de callbacks
function doSomething(callback) {
    callback("Resultado de doSomething");
}

function doSomethingElse(result, callback) {
    callback(result + " -> Resultado de doSomethingElse");
}

function doAnotherThing(result, callback) {
    callback(result + " -> Resultado de doAnotherThing");
}

function doFinalThing(result, callback) {
    callback(result + " -> Resultado de doFinalThing");
}

function doSomethingMore(callback) {
    callback("Resultado de doSomethingMore");
}

function doEvenMore(result, callback) {
    callback(result + " -> Resultado de doEvenMore");
}

function finishItOff(result, callback) {
    callback(result + " -> Todo completado");
}

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

// Ejemplo de promesa
function ejemploPromesa() {
    return new Promise((resolve, reject) => {
        let exito = true;

        if (exito) {
            resolve("La operación fue exitosa");
        } else {
            reject("La operación falló");
        }
    });
}

ejemploPromesa()
    .then((mensaje) => {
        console.log(mensaje);
    })
    .catch((error) => {
        console.error(error);
    })
    .finally(() => {
        console.log("Operación completada");
    });

// Promesa con fetch
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

// Promesas encadenadas
function fetchDataWithPromise() {
    return new Promise((resolve, reject) => {
        console.log("Iniciando solicitud de datos...");
        setTimeout(() => {
            let success = true;
            if (success) {
                resolve({ id: 1, name: "Producto" });
            } else {
                reject("Error: No se pudo obtener los datos.");
            }
        }, 2000);
    });
}

fetchDataWithPromise()
    .then(data => {
        console.log("Datos recibidos:", data);
        return "Proceso adicional con los datos";
    })
    .then(message => {
        console.log(message);
    })
    .catch(error => {
        console.error(error);
    });

// Promesas y asincronía en paralelo
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


// Simulación de obtención de datos con async/await
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
// Output:
// Iniciando solicitud...
// (2 segundos después)
// Datos recibidos
// Solicitud completada.

// Manejo de errores con async/await y try/catch
function getDataWithError() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const success = Math.random() > 0.5;
            if (success) {
                resolve("Datos recibidos");
            } else {
                reject("Error al obtener los datos");
            }
        }, 2000);
    });
}

async function fetchDataWithErrorHandling() {
    try {
        console.log("Iniciando solicitud...");
        const data = await getDataWithError();
        console.log(data);
    } catch (error) {
        console.error(error);
    } finally {
        console.log("Solicitud completada.");
    }
}

fetchDataWithErrorHandling();
// Output (puede variar):
// Iniciando solicitud...
// (2 segundos después, si se resuelve)
// Datos recibidos
// Solicitud completada.
// OR
// Iniciando solicitud...
// (2 segundos después, si falla)
// Error al obtener los datos
// Solicitud completada.

// Encadenamiento de async/await
async function firstStep() {
    return new Promise(resolve => setTimeout(() => resolve("Resultado del primer paso"), 1000));
}

async function secondStep(data) {
    return new Promise(resolve => setTimeout(() => resolve(`Resultado del segundo paso basado en: ${data}`), 1000));
}

async function thirdStep(data) {
    return new Promise(resolve => setTimeout(() => resolve(`Resultado del tercer paso basado en: ${data}`), 1000));
}

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
// Output:
// Paso 1: Resultado del primer paso
// Paso 2: Resultado del segundo paso basado en: Resultado del primer paso
// Paso 3: Resultado del tercer paso basado en: Resultado del segundo paso
// Todos los pasos completados.

// Paralelismo con async/await y Promise.all
function getData1() {
    return new Promise(resolve => setTimeout(() => resolve("Resultado de la primera solicitud"), 1000));
}

function getData2() {
    return new Promise(resolve => setTimeout(() => resolve("Resultado de la segunda solicitud"), 1500));
}

async function fetchMultipleData() {
    const promise1 = getData1();
    const promise2 = getData2();

    try {
        const [data1, data2] = await Promise.all([promise1, promise2]);
        console.log("Datos 1:", data1);
        console.log("Datos 2:", data2);
    } catch (error) {
        console.error("Error al obtener datos:", error);
    }
}

fetchMultipleData();
// Output:
// Datos 1: Resultado de la primera solicitud
// Datos 2: Resultado de la segunda solicitud

// Operador de propagación en objetos
let object = { fruit: "apple", color: "green" };
let { fruit, color } = { ...object };

console.log(`fruit: ${fruit}, color: ${color}`);
color = "red";
console.log(`object.color: ${object.color}, color: ${color}`);

// Operador de propagación en arreglos
let originalArray = [1, 2, 3];
let clonedArray = [...originalArray];

clonedArray[0] = "one";
clonedArray[1] = "two";
clonedArray[2] = "three";

console.log(`Arreglo original: ${originalArray}, Arreglo clonado: ${clonedArray}`);
