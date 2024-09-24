// Tipos utilitarios: Pick<Type, Keys>
interface IUser {
    id: number;
    name: string;
    email: string;
}
type UserPreview = Pick<IUser, 'id' | 'name' | 'email'>;
const userPreview: UserPreview = { id: 1, name: 'Kapu', email: "kapu@z.com" };  // Corregido 'id' a number

// Record<Keys, Type>
type UserNamesById = Record<number, string>;
const userNamesById: UserNamesById = { 1: 'Kapu', 2: 'Mota', 3: 'Checha' };

// Partial<Type>
type PartialIUser = Partial<IUser>;
const partialUser: PartialIUser = { id: 1 };  // Corregido 'id' a number

// Required<Type>
type RequiredIUser = Required<PartialIUser>;
const requiredUser: RequiredIUser = { id: 1, name: 'Kapu', email: 'kapu1@example.com' };  // Corregido 'id' a number

// Omit<Type, Keys>
type UserWithoutEmail = Omit<IUser, 'email'>;
const userWithoutEmail: UserWithoutEmail = { id: 2, name: 'Alice' };

// Readonly<Type>
type ReadonlyIUser = Readonly<IUser>;
const user: ReadonlyIUser = { id: 1, name: 'Kapu', email: 'kapu@example.com' };  // Corregido 'id' a number

// NonNullable<Type>
type Name = string | null | undefined;
type NonNullableName = NonNullable<Name>;  // Solo "string"

// Extract<Type, Union>
type T = Extract<string | number | boolean, string | boolean>;  // string | boolean

// Exclude<Type, Union>
type U = Exclude<string | number | boolean, string | boolean>;  // number

// Tipos de union
type MessageType = "user" | "system";
interface IMessage {
    type: MessageType;
    content: string;
    // otras propiedades
}

// Tipos de interseccion
type IDBEntityWithId = {
    id: number;
};
type IChatEntity = {
    name: string;
};
type IChatEntityWithId = IDBEntityWithId & IChatEntity;
const chatEntity: IChatEntityWithId = {
    id: 1,
    name: "Typescript tutor",
};

// ReturnType<Type> reutilización
function getUser() {
    return { id: 1, name: "Kapu" };
}
type User1 = ReturnType<typeof getUser>;  // { id: number, name: string }

// InstanceType<Type>
class User {
    id: number;
    name: string;
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}
type UserInstance = InstanceType<typeof User>;

// POO
// Interfaz
interface Persona {
    nombre: string;
    edad: number;
    saludar(): void;
}

interface Trabajador extends Persona {
    salario: number;
    trabajar(): void;
}

class Ingeniero implements Trabajador {
    constructor(public nombre: string, public edad: number, public salario: number) {}

    saludar(): void {
        console.log(`Hola, mi nombre es ${this.nombre}.`);
    }

    trabajar(): void {
        console.log(`${this.nombre} está trabajando.`);
    }
}


// Clase abstracta
abstract class Animalito {
    constructor(public name: string) {}
    mover(): void {
        console.log("El animalito se mueve");
    }
    abstract hacerSonido(): void;
}
class Perrito extends Animalito {
    constructor(name: string) {
        super(name);
    }
    hacerSonido(): void {
        console.log(`${this.name} dice: Guau`);
    }
}
class Gatito extends Animalito {
    constructor(name: string) {
        super(name);
    }
    hacerSonido(): void {
        console.log(`${this.name} dice: Miau`);
    }
}

const perrito = new Perrito('Motita');
perrito.mover();
perrito.hacerSonido();

const gatito = new Gatito('Minimini');
gatito.mover();
gatito.hacerSonido();

// Herencia
class Mascota {
    constructor(public nombre: string) {}
    moverse(): void {
        console.log(`${this.nombre} se está moviendo.`);
    }
}

class Perrito2 extends Mascota {
    ladrar(): void {
        console.log(`${this.nombre} está ladrando.`);
    }
}

const miPerro = new Perrito2("Rex");
miPerro.moverse();   // Rex se está moviendo.
miPerro.ladrar();    // Rex está ladrando.

//Polimorfismo

class Shape {
    public area(): number {
        throw new Error("El metodo Area debe ser implementado");
    }
}

class Circle extends Shape {
    constructor(private radius: number) {
        super();
    }

    public area(): number {
        return Math.PI * this.radius * this.radius;
    }
}

class Rectangle extends Shape {
    constructor(private width: number, private height: number) {
        super();
    }

    public area(): number {
        return this.width * this.height;
    }
}

const shapes: Shape[] = [new Circle(5), new Rectangle(10, 20)];

shapes.forEach((shape) => {
    console.log(`Area: ${shape.area()}`);
});
//Abstraccion
abstract class Figura {
    abstract calcularArea(): number;
}

class Circulo extends Figura {
    constructor(private radio: number) {
        super();
    }

    calcularArea(): number {
        return Math.PI * Math.pow(this.radio, 2);
    }
}

const circulo = new Circulo(5);
console.log(circulo.calcularArea());  // 78.53981633974483


//Encapsulacion

class BankAccount {
    private balance: number;

    constructor(initialBalance: number) {
        this.balance = initialBalance;
    }

    public deposito(amount: number): void {
        if (amount > 0) {
            this.balance += amount;
            console.log(`Deposito exitoso. Actual balance: ${this.balance}`);
        }
    }

    public withdraw(amount: number): void {
        if (amount > 0 && amount <= this.balance) {
            this.balance -= amount;
            console.log(`Retiro exitoso. Actual balance: ${this.balance}`);
        } else {
            console.log("Fondos insuficientes");
        }
    }

    public getBalance(): number {
        return this.balance;
    }
}

const account = new BankAccount(1000);
account.deposito(500);   
account.withdraw(300); 
console.log(account.getBalance());  // 1200

// Prototipos en typescript
// Objeto sin herencia
const obj1 = Object.create(null);
console.log(obj1); // {}

console.log(Object.getPrototypeOf(obj1)); // null

const obj = Object.create(null);
console.log(obj.toString); // undefined
console.log(obj.hasOwnProperty); // undefined

//Objetos con prototipo
const objWithProto = {};
console.log(objWithProto.toString); // [Function: toString]
console.log(objWithProto.hasOwnProperty); // [Function: hasOwnProperty]
/*
La cadena de prototipos:objWithProto --> Object.prototype --> null
*/

//Typescript
// Clase base para los empleados
class Empleadores {
    constructor(public name: string, public department: string) {}

    getDetails(): string {
        return `${this.name} trabaja en el ${this.department} departmento.`;
    }
}

// Clase para Desarrolladores que extiende de Employee
class Developer extends Empleadores {
    constructor(name: string, department: string, public programmingLanguage: string) {
        super(name, department); // Llamamos al constructor de la clase base
    }

    code(): void {
        console.log(`${this.name} esta codificando en ${this.programmingLanguage}.`);
    }
}

// Clase para Gerentes que extiende de Empleadores
class Manager extends Empleadores {
    constructor(name: string, department: string, public teamSize: number) {
        super(name, department);
    }

    manage(): void {
        console.log(`${this.name} gestiona un equipo de ${this.teamSize} empleadores.`);
    }
}

// Uso de las clases
const dev = new Developer("Kapu", "Ingenieria", "JavaScript");
const manager = new Manager("Mota", "Ventas", 10);

console.log(dev.getDetails()); // "....."
dev.code(); // "....."

console.log(manager.getDetails()); // ...
manager.manage(); // "...."

console.log(Object.getPrototypeOf(dev)); // Developer.prototype
console.log(Object.getPrototypeOf(Developer.prototype)); // Empleadores.prototype
console.log(Object.getPrototypeOf(Empleadores.prototype)); // Object.prototype

/*
dev --> Developer.prototype --> Empleadores.prototype --> Object.prototype --> null
*/

//Función genérica
function identidad<T>(arg: T): T {
    return arg;
}

let num = identidad<number>(5);  // num es de tipo number
let str = identidad<string>("Hola");  // str es de tipo string


// Función genérica
function printValue<T>(value: T): void { 
    console.log(value); 
} 

printValue<number>(123); 
printValue<string>("Hello");

// Parametros de tipos genericos

class Caja<T> {
    private content: T;

    constructor(content: T) {
        this.content = content;
    }

    pedirContenido(): T {
        return this.content;
    }

    ponerContenido(content: T): void {
        this.content = content;
    }
}

const numberBox = new Caja<number>(123);
console.log(numberBox.pedirContenido());  // 123

const stringBox = new Caja<string>("Hola");
console.log(stringBox.pedirContenido());  // Hola

//Funciones genéricas con restricciones
interface L {
    length: number;
}

function logLongitud<T extends L>(arg: T): void {
    console.log(arg.length);
}

logLongitud("Hello");  // Funciona: string tiene una propiedad length
logLongitud([1, 2, 3]);  // Funciona: los arrays tienen una propiedad length
// logLongitud(42);  // Error: number no tiene una propiedad length

//Genéricos con interfaces
interface Pares<K, M> {
    key: K;
    value: M;
}

const stringNumberPair: Pares<string, number> = { key: "age", value: 25 };
const numberBooleanPair: Pares<number, boolean> = { key: 1, value: true };

//Genericos con múltiples parametros
function swap<T, U>(primero: T, segundo: U): [U, T] {
    return [segundo, primero];
}

const result = swap<number, string>(1, "Hello");
console.log(result);  // ["Hello", 1]

//Genericos con tipos de funciones
function combine<T>(a: T, b: T): T {
    return a;
}

let combineFunc: <T>(a: T, b: T) => T = combine;
console.log(combineFunc<number>(10, 20)); // 10

//Genericos y tipos predeterminados

function defaultGeneric<T = string>(arg: T): T {
    return arg;
}
const result1 = defaultGeneric("Hola");  // El tipo inferido es string
const result2 = defaultGeneric<number>(42);  // Se especifica number


// Clase genérica renombrada a 'GenericStorage'
class GenericStorage<T> {
    private items: T[] = [];

    // Añadir un nuevo elemento al almacenamiento
    addItem(item: T): void {
        this.items.push(item);
    }

    // Eliminar un elemento del almacenamiento
    removeItem(item: T): void {
        this.items = this.items.filter((i) => i !== item);
    }

    // Obtener todos los elementos del almacenamiento
    getItems(): T[] {
        return [...this.items];  // Devuelve una copia para evitar modificaciones directas
    }
}

// Ejemplo con almacenamiento de strings
const stringStorage = new GenericStorage<string>();
stringStorage.addItem("Apple");
stringStorage.addItem("Banana");
console.log(stringStorage.getItems());  // ["Apple", "Banana"]

// Ejemplo con almacenamiento de números
const numberStorage = new GenericStorage<number>();
numberStorage.addItem(10);
numberStorage.addItem(20);
console.log(numberStorage.getItems());  // [10, 20]

// Espacio de nombres adicional para evitar duplicados futuros
namespace StorageNamespace {
    export class Storage<T> {
        private items: T[] = [];

        addItem(item: T): void {
            this.items.push(item);
        }

        removeItem(item: T): void {
            this.items = this.items.filter((i) => i !== item);
        }

        getItems(): T[] {
            return [...this.items];
        }
    }
}

// Uso de la clase dentro del espacio de nombres
const stringStorageNamespace = new StorageNamespace.Storage<string>();
stringStorageNamespace.addItem("Grape");
stringStorageNamespace.addItem("Peach");
console.log(stringStorageNamespace.getItems());  // ["Grape", "Peach"]

const numberStorageNamespace = new StorageNamespace.Storage<number>();
numberStorageNamespace.addItem(30);
numberStorageNamespace.addItem(40);
console.log(numberStorageNamespace.getItems());  // [30, 40]

//Genericos y Hooks en react
function useArray<T>(initialArray: T[]): [T[], (item: T) => void, (item: T) => void] {
    const [array, setArray] = React.useState<T[]>(initialArray);

    const addItem = (item: T) => {
        setArray([...array, item]);
    };

    const removeItem = (item: T) => {
        setArray(array.filter(i => i !== item));
    };

    return [array, addItem, removeItem];
}

const [fruits, addFruit, removeFruit] = useArray<string>(["Apple", "Banana"]);
addFruit("Orange");
console.log(fruits);  // ["Apple", "Banana", "Orange"]

//Promesas
function fetchData(): Promise<string> { 
    return new Promise((resolve) => { 
        setTimeout(() => resolve("Data Fetched"), 1000); 
    }); 
} 

//Promesas tipadas

function fetchData(): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Data Fetched");
        }, 2000);
    });
}

fetchData().then((data) => {
    console.log(data);  // "Data Fetched"
});

// Promesas anidadas

function fetchUsers(): Promise<{ id: number; name: string }> {
    return new Promise(resolve => {
        setTimeout(() => resolve({ id: 1, name: 'John' }), 1000);
    });
}

function fetchOrders(userId: number): Promise<string[]> {
    return new Promise(resolve => {
        setTimeout(() => resolve(['Order1', 'Order2', 'Order3']), 1000);
    });
}

fetchUsers()
    .then(user => {
        console.log(`Usuario: ${user.name}`);
        return fetchOrders(user.id);
    })
    .then(orders => {
        console.log(`Órdenes: ${orders.join(', ')}`);
    });


//Promesas y genericos
interface IUser {
    id: number;
    name: string;
    email: string;
}

function fetchUser(id: number): Promise<IUser> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id, name: "User" + id, email: `user${id}@example.com` });
        }, 1000);
    });
}

fetchUser(1).then(user => {
    console.log(`Usuario: ${user.name}, Email: ${user.email}`);
});

//async y await
async function fetchUserData(id: number): Promise<IUser> {
    return fetchUser(id);
}

(async () => {
    const user = await fetchUserData(1);
    console.log(`Usuario: ${user.name}, Email: ${user.email}`);
})();

//Manejo de Errores con async/await
async function fetchDataWithError(): Promise<string> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('Error al obtener datos');
        }, 1000);
    });
}

async function fetchData() {
    try {
        const data = await fetchDataWithError();
        console.log(data);
    } catch (error) {
        console.log('Error:', error);  // Error: Error al obtener datos
    }
}

fetchData();
