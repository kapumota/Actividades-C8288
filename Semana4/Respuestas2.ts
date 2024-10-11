//Ejercicio: Simulación de un servidor web con temporizadores y async/await
// Fase 1: Uso de Callbacks
// servidor_callbacks.js

// Clase Temporizador: Simula setTimeout y setInterval
class Temporizador {
    constructor() {
        this.tareas = [];
        this.iniciar();
    }

    iniciar() {
        const loop = () => {
            const ahora = Date.now();
            this.tareas.forEach((tarea, index) => {
                if (ahora >= tarea.ejecucion) {
                    tarea.funcion();
                    this.tareas.splice(index, 1);
                }
            });
            // Ejecuta el loop en el próximo ciclo de eventos
            setImmediate(loop);
        };
        loop();
    }

    setTimeout(funcion, ms) {
        this.tareas.push({
            ejecucion: Date.now() + ms,
            funcion
        });
        // Retorna un identificador único para la tarea
        return this.tareas.length - 1;
    }

    clearTimeout(id) {
        if (this.tareas[id]) {
            this.tareas.splice(id, 1);
        }
    }

    setInterval(funcion, ms) {
        const intervalo = () => {
            funcion();
            this.setTimeout(intervalo, ms);
        };
        return this.setTimeout(intervalo, ms);
    }
}

// Clase Nodo: Elemento de la cola
class Nodo {
    constructor(valor) {
        this.valor = valor;
        this.siguiente = null;
    }
}

// Clase Cola: Implementa una cola FIFO sin usar arrays
class Cola {
    constructor() {
        this.cabeza = null;
        this.cola = null;
        this.tamaño = 0;
    }

    encolar(valor) {
        const nuevoNodo = new Nodo(valor);
        if (this.cola) {
            this.cola.siguiente = nuevoNodo;
        } else {
            this.cabeza = nuevoNodo;
        }
        this.cola = nuevoNodo;
        this.tamaño++;
    }

    desencolar() {
        if (!this.cabeza) return null;
        const valor = this.cabeza.valor;
        this.cabeza = this.cabeza.siguiente;
        if (!this.cabeza) {
            this.cola = null;
        }
        this.tamaño--;
        return valor;
    }

    esVacia() {
        return this.tamaño === 0;
    }
}

// Clase ServidorWeb: Maneja las solicitudes utilizando callbacks
class ServidorWeb {
    constructor() {
        this.temporizador = new Temporizador();
        this.cola = new Cola();
        this.maxSimultaneas = 5;
        this.actuales = 0;
        this.idSolicitud = 1;
        this.inactividad = null;
        this.iniciarRecepcion();
    }

    iniciarRecepcion() {
        // Programar la llegada de nuevas solicitudes cada 2 segundos
        this.temporizador.setInterval(() => {
            this.recibirSolicitud((error, solicitud) => {
                if (error) {
                    console.error('Error al recibir solicitud:', error);
                    return;
                }
                this.agregarASolicitudes(solicitud);
            });
        }, 2000);

        // Iniciar el temporizador de inactividad
        this.resetInactividad();
    }

    resetInactividad() {
        if (this.inactividad !== null) {
            this.temporizador.clearTimeout(this.inactividad);
        }
        this.inactividad = this.temporizador.setTimeout(() => {
            this.detenerServidor();
        }, 10000);
    }

    detenerServidor() {
        console.log('El servidor se ha detenido por inactividad.');
        process.exit(0);
    }

    recibirSolicitud(callback) {
        // Simular la creación de una nueva solicitud
        const solicitud = {
            id: this.idSolicitud++,
            tiempoProcesamiento: Math.floor(Math.random() * 5) + 1 // 1 a 5 segundos
        };
        console.log(`Solicitud ${solicitud.id} recibida.`);
        callback(null, solicitud);
        this.resetInactividad();
    }

    agregarASolicitudes(solicitud) {
        if (this.actuales < this.maxSimultaneas) {
            this.procesarSolicitud(solicitud, (error, resultado) => {
                if (error) {
                    console.log(`Solicitud ${solicitud.id} falló en ${solicitud.tiempoProcesamiento} segundos.`);
                } else {
                    console.log(`Solicitud ${solicitud.id} procesada correctamente en ${solicitud.tiempoProcesamiento} segundos.`);
                }
                this.actuales--;
                this.verificarCola();
            });
            this.actuales++;
        } else {
            this.cola.encolar(solicitud);
            console.log(`Solicitud ${solicitud.id} en cola.`);
        }
    }

    procesarSolicitud(solicitud, callback) {
        // Simular el procesamiento asincrónico con un temporizador
        this.temporizador.setTimeout(() => {
            // Simular un 20% de fallos
            if (Math.random() < 0.2) {
                callback(new Error('Error en el procesamiento'), null);
            } else {
                callback(null, {
                    id: solicitud.id,
                    tiempo: solicitud.tiempoProcesamiento
                });
            }
        }, solicitud.tiempoProcesamiento * 1000);
    }

    verificarCola() {
        if (!this.cola.esVacia() && this.actuales < this.maxSimultaneas) {
            const siguienteSolicitud = this.cola.desencolar();
            this.agregarASolicitudes(siguienteSolicitud);
            console.log(`Solicitud ${siguienteSolicitud.id} retirada de la cola y en proceso.`);
        }
    }
}

// Iniciar el servidor
new ServidorWeb();

// Fase 2: Refactorización con promesas
// servidor_promesas.js

// Clase Temporizador: Simula setTimeout y setInterval
class Temporizador {
    constructor() {
        this.tareas = [];
        this.iniciar();
    }

    iniciar() {
        const loop = () => {
            const ahora = Date.now();
            this.tareas.forEach((tarea, index) => {
                if (ahora >= tarea.ejecucion) {
                    tarea.funcion();
                    this.tareas.splice(index, 1);
                }
            });
            // Ejecuta el loop en el próximo ciclo de eventos
            setImmediate(loop);
        };
        loop();
    }

    setTimeout(funcion, ms) {
        this.tareas.push({
            ejecucion: Date.now() + ms,
            funcion
        });
        // Retorna un identificador único para la tarea
        return this.tareas.length - 1;
    }

    clearTimeout(id) {
        if (this.tareas[id]) {
            this.tareas.splice(id, 1);
        }
    }

    setInterval(funcion, ms) {
        const intervalo = () => {
            funcion();
            this.setTimeout(intervalo, ms);
        };
        return this.setTimeout(intervalo, ms);
    }
}

// Clase Nodo: Elemento de la cola
class Nodo {
    constructor(valor) {
        this.valor = valor;
        this.siguiente = null;
    }
}

// Clase Cola: Implementa una cola FIFO sin usar arrays
class Cola {
    constructor() {
        this.cabeza = null;
        this.cola = null;
        this.tamaño = 0;
    }

    encolar(valor) {
        const nuevoNodo = new Nodo(valor);
        if (this.cola) {
            this.cola.siguiente = nuevoNodo;
        } else {
            this.cabeza = nuevoNodo;
        }
        this.cola = nuevoNodo;
        this.tamaño++;
    }

    desencolar() {
        if (!this.cabeza) return null;
        const valor = this.cabeza.valor;
        this.cabeza = this.cabeza.siguiente;
        if (!this.cabeza) {
            this.cola = null;
        }
        this.tamaño--;
        return valor;
    }

    esVacia() {
        return this.tamaño === 0;
    }
}

// Clase ServidorWebPromesas: Maneja las solicitudes utilizando promesas
class ServidorWebPromesas {
    constructor() {
        this.temporizador = new Temporizador();
        this.cola = new Cola();
        this.maxSimultaneas = 5;
        this.actuales = 0;
        this.idSolicitud = 1;
        this.inactividad = null;
        this.iniciarRecepcion();
    }

    iniciarRecepcion() {
        // Programar la llegada de nuevas solicitudes cada 2 segundos
        this.temporizador.setInterval(() => {
            this.recibirSolicitud()
                .then(solicitud => this.agregarASolicitudes(solicitud))
                .catch(error => console.error('Error al recibir solicitud:', error));
        }, 2000);

        // Iniciar el temporizador de inactividad
        this.resetInactividad();
    }

    resetInactividad() {
        if (this.inactividad !== null) {
            this.temporizador.clearTimeout(this.inactividad);
        }
        this.inactividad = this.temporizador.setTimeout(() => {
            this.detenerServidor();
        }, 10000);
    }

    detenerServidor() {
        console.log('El servidor se ha detenido por inactividad.');
        process.exit(0);
    }

    recibirSolicitud() {
        return new Promise((resolve, reject) => {
            // Simular la creación de una nueva solicitud
            const solicitud = {
                id: this.idSolicitud++,
                tiempoProcesamiento: Math.floor(Math.random() * 5) + 1 // 1 a 5 segundos
            };
            console.log(`Solicitud ${solicitud.id} recibida.`);
            resolve(solicitud);
            this.resetInactividad();
        });
    }

    agregarASolicitudes(solicitud) {
        if (this.actuales < this.maxSimultaneas) {
            this.procesarSolicitud(solicitud)
                .then(resultado => {
                    console.log(`Solicitud ${solicitud.id} procesada correctamente en ${resultado.tiempo} segundos.`);
                })
                .catch(error => {
                    console.log(`Solicitud ${solicitud.id} falló en ${solicitud.tiempoProcesamiento} segundos.`);
                })
                .finally(() => {
                    this.actuales--;
                    this.verificarCola();
                });
            this.actuales++;
        } else {
            this.cola.encolar(solicitud);
            console.log(`Solicitud ${solicitud.id} en cola.`);
        }
    }

    procesarSolicitud(solicitud) {
        return new Promise((resolve, reject) => {
            this.temporizador.setTimeout(() => {
                // Simular un 20% de fallos
                if (Math.random() < 0.2) {
                    reject(new Error('Error en el procesamiento'));
                } else {
                    resolve({
                        id: solicitud.id,
                        tiempo: solicitud.tiempoProcesamiento
                    });
                }
            }, solicitud.tiempoProcesamiento * 1000);
        });
    }

    verificarCola() {
        if (!this.cola.esVacia() && this.actuales < this.maxSimultaneas) {
            const siguienteSolicitud = this.cola.desencolar();
            this.agregarASolicitudes(siguienteSolicitud);
            console.log(`Solicitud ${siguienteSolicitud.id} retirada de la cola y en proceso.`);
        }
    }
}

// Iniciar el servidor con promesas
new ServidorWebPromesas();

// Fase 3: Refactorización con Async/Await

// servidor_async_await.js

// Clase Temporizador: Simula setTimeout y setInterval
class Temporizador {
    constructor() {
        this.tareas = [];
        this.iniciar();
    }

    iniciar() {
        const loop = () => {
            const ahora = Date.now();
            this.tareas.forEach((tarea, index) => {
                if (ahora >= tarea.ejecucion) {
                    tarea.funcion();
                    this.tareas.splice(index, 1);
                }
            });
            // Ejecuta el loop en el próximo ciclo de eventos
            setImmediate(loop);
        };
        loop();
    }

    setTimeout(funcion, ms) {
        this.tareas.push({
            ejecucion: Date.now() + ms,
            funcion
        });
        // Retorna un identificador único para la tarea
        return this.tareas.length - 1;
    }

    clearTimeout(id) {
        if (this.tareas[id]) {
            this.tareas.splice(id, 1);
        }
    }

    setInterval(funcion, ms) {
        const intervalo = () => {
            funcion();
            this.setTimeout(intervalo, ms);
        };
        return this.setTimeout(intervalo, ms);
    }
}

// Clase Nodo: Elemento de la cola
class Nodo {
    constructor(valor) {
        this.valor = valor;
        this.siguiente = null;
    }
}

// Clase Cola: Implementa una cola FIFO sin usar arrays
class Cola {
    constructor() {
        this.cabeza = null;
        this.cola = null;
        this.tamaño = 0;
    }

    encolar(valor) {
        const nuevoNodo = new Nodo(valor);
        if (this.cola) {
            this.cola.siguiente = nuevoNodo;
        } else {
            this.cabeza = nuevoNodo;
        }
        this.cola = nuevoNodo;
        this.tamaño++;
    }

    desencolar() {
        if (!this.cabeza) return null;
        const valor = this.cabeza.valor;
        this.cabeza = this.cabeza.siguiente;
        if (!this.cabeza) {
            this.cola = null;
        }
        this.tamaño--;
        return valor;
    }

    esVacia() {
        return this.tamaño === 0;
    }
}

// Clase ServidorWebAsyncAwait: Maneja las solicitudes utilizando async/await
class ServidorWebAsyncAwait {
    constructor() {
        this.temporizador = new Temporizador();
        this.cola = new Cola();
        this.maxSimultaneas = 5;
        this.actuales = 0;
        this.idSolicitud = 1;
        this.inactividad = null;
        this.iniciarRecepcion();
    }

    iniciarRecepcion() {
        // Programar la llegada de nuevas solicitudes cada 2 segundos
        this.temporizador.setInterval(async () => {
            try {
                const solicitud = await this.recibirSolicitud();
                this.agregarASolicitudes(solicitud);
            } catch (error) {
                console.error('Error al recibir solicitud:', error);
            }
        }, 2000);

        // Iniciar el temporizador de inactividad
        this.resetInactividad();
    }

    resetInactividad() {
        if (this.inactividad !== null) {
            this.temporizador.clearTimeout(this.inactividad);
        }
        this.inactividad = this.temporizador.setTimeout(() => {
            this.detenerServidor();
        }, 10000);
    }

    detenerServidor() {
        console.log('El servidor se ha detenido por inactividad.');
        process.exit(0);
    }

    recibirSolicitud() {
        return new Promise((resolve, reject) => {
            // Simular la creación de una nueva solicitud
            const solicitud = {
                id: this.idSolicitud++,
                tiempoProcesamiento: Math.floor(Math.random() * 5) + 1 // 1 a 5 segundos
            };
            console.log(`Solicitud ${solicitud.id} recibida.`);
            resolve(solicitud);
            this.resetInactividad();
        });
    }

    agregarASolicitudes(solicitud) {
        if (this.actuales < this.maxSimultaneas) {
            this.procesarSolicitud(solicitud)
                .then(resultado => {
                    console.log(`Solicitud ${solicitud.id} procesada correctamente en ${resultado.tiempo} segundos.`);
                })
                .catch(error => {
                    console.log(`Solicitud ${solicitud.id} falló en ${solicitud.tiempoProcesamiento} segundos.`);
                })
                .finally(() => {
                    this.actuales--;
                    this.verificarCola();
                });
            this.actuales++;
        } else {
            this.cola.encolar(solicitud);
            console.log(`Solicitud ${solicitud.id} en cola.`);
        }
    }

    async procesarSolicitud(solicitud) {
        return new Promise((resolve, reject) => {
            this.temporizador.setTimeout(() => {
                // Simular un 20% de fallos
                if (Math.random() < 0.2) {
                    reject(new Error('Error en el procesamiento'));
                } else {
                    resolve({
                        id: solicitud.id,
                        tiempo: solicitud.tiempoProcesamiento
                    });
                }
            }, solicitud.tiempoProcesamiento * 1000);
        });
    }

    verificarCola() {
        if (!this.cola.esVacia() && this.actuales < this.maxSimultaneas) {
            const siguienteSolicitud = this.cola.desencolar();
            this.agregarASolicitudes(siguienteSolicitud);
            console.log(`Solicitud ${siguienteSolicitud.id} retirada de la cola y en proceso.`);
        }
    }
}

// Iniciar el servidor con async/await
new ServidorWebAsyncAwait();

//Ejercicio 2: Sistema de permisos basado en herencia y prototipos
// permisos.ts

// Clase Base UsuarioBase
class UsuarioBase {
    nombre: string;
    correo: string;

    constructor(nombre: string, correo: string) {
        this.nombre = nombre;
        this.correo = correo;
    }

    verPermisos(): string[] {
        return ['leerContenido'];
    }
}

// Clase Admin que extiende de UsuarioBase
class Admin extends UsuarioBase {
    constructor(nombre: string, correo: string) {
        super(nombre, correo);
    }

    verPermisos(): string[] {
        return [...super.verPermisos(), 'gestionarUsuarios'];
    }
}

// Clase SuperAdmin que extiende de Admin
class SuperAdmin extends Admin {
    constructor(nombre: string, correo: string) {
        super(nombre, correo);
    }

    verPermisos(): string[] {
        return [...super.verPermisos(), 'gestionarSistema'];
    }
}

// Clase Genérica GestorDePermisos
class GestorDePermisos<T extends UsuarioBase> {
    asignarPermisos(usuario: T): void {
        const permisos = usuario.verPermisos();
        console.log(`Permisos para ${usuario.nombre}: ${permisos.join(', ')}`);
    }

    agregarPermiso(usuario: T, permiso: string): void {
        // Aquí se simula la asignación de un permiso adicional
        console.log(`Agregado permiso '${permiso}' a ${usuario.nombre}.`);
    }
}

// Añadir métodos adicionales a Admin mediante prototipos
(Admin.prototype as any).actualizarConfiguraciones = function (): void {
    console.log(`Configuraciones actualizadas por ${this.nombre}.`);
};

// Ejemplo de Uso
// Crear instancias de usuarios
const usuario = new UsuarioBase('Juan Pérez', 'juan@example.com');
const admin = new Admin('María López', 'maria@example.com');
const superAdmin = new SuperAdmin('Carlos García', 'carlos@example.com');

// Crear una instancia del gestor de permisos
const gestor = new GestorDePermisos<UsuarioBase>();

// Asignar permisos
gestor.asignarPermisos(usuario);      // Permisos para Juan Pérez: leerContenido
gestor.asignarPermisos(admin);        // Permisos para María López: leerContenido, gestionarUsuarios
gestor.asignarPermisos(superAdmin);   // Permisos para Carlos García: leerContenido, gestionarUsuarios, gestionarSistema

// Agregar un permiso adicional a un admin
gestor.agregarPermiso(admin, 'crearReportes'); // Agregado permiso 'crearReportes' a María López.

// Usar el método añadido mediante prototipos
(admin as Admin & { actualizarConfiguraciones: () => void }).actualizarConfiguraciones(); // Configuraciones actualizadas por María López.

// Ejercicio 3: Sistema de registro y validación con tipos refinados y callbacks 

// interfaces.ts

// Resultado de un registro exitoso
export interface RegistroExitoso {
    status: "success";
    message: string;
}

// Resultado de un error de validación
export interface ErrorDeValidacion {
    status: "error";
    message: string;
    detalles: string[];
}

// Datos de entrada del usuario
export interface DatosUsuario {
    nombre: string;
    correo: string;
    telefono: string;
    edad: number;
}

// Tipos refinados utilizando "branding" (opción más facil)
export type NombreValido = string & { __brand: "NombreValido" };
export type CorreoValido = string & { __brand: "CorreoValido" };
export type TelefonoValido = string & { __brand: "TelefonoValido" };
export type EdadValida = number & { __brand: "EdadValida" };

// validacion.ts

import { ErrorDeValidacion } from "./interfaces";

// Interfaz genérica para validaciones
export interface Validacion<T> {
    validar: (dato: any, callback: (error: ErrorDeValidacion | null, resultado?: T) => void) => void;
}
// ValidacionNombre.ts

import { Validacion } from "./validacion";
import { NombreValido, ErrorDeValidacion } from "./interfaces";

export class ValidacionNombre implements Validacion<NombreValido> {
    validar(dato: any, callback: (error: ErrorDeValidacion | null, resultado?: NombreValido) => void): void {
        const errores: string[] = [];

        if (typeof dato !== "string") {
            errores.push("El nombre debe ser una cadena de texto.");
        } else {
            const nombreTrim = dato.trim();
            if (nombreTrim.length < 3) {
                errores.push("El nombre debe tener al menos 3 caracteres.");
            }

            // Validación manual: solo letras y espacios
            for (let i = 0; i < nombreTrim.length; i++) {
                const char = nombreTrim.charAt(i);
                const code = char.charCodeAt(0);
                const isUpperCase = code >= 65 && code <= 90;
                const isLowerCase = code >= 97 && code <= 122;
                const isSpace = char === ' ';

                if (!(isUpperCase || isLowerCase || isSpace)) {
                    errores.push("El nombre solo puede contener letras y espacios.");
                    break;
                }
            }
        }

        if (errores.length > 0) {
            const error: ErrorDeValidacion = {
                status: "error",
                message: "Validación de nombre fallida.",
                detalles: errores,
            };
            callback(error);
        } else {
            const nombreValido: NombreValido = dato as NombreValido;
            callback(null, nombreValido);
        }
    }
}
// ValidacionCorreo.ts

import { Validacion } from "./validacion";
import { CorreoValido, ErrorDeValidacion } from "./interfaces";

export class ValidacionCorreo implements Validacion<CorreoValido> {
    validar(dato: any, callback: (error: ErrorDeValidacion | null, resultado?: CorreoValido) => void): void {
        const errores: string[] = [];

        if (typeof dato !== "string") {
            errores.push("El correo electrónico debe ser una cadena de texto.");
        } else {
            const partes = dato.split("@");
            if (partes.length !== 2) {
                errores.push("El correo electrónico debe contener una sola '@'.");
            } else {
                const [local, dominio] = partes;
                if (local.length === 0) {
                    errores.push("La parte local del correo no puede estar vacía.");
                }
                if (dominio.length === 0) {
                    errores.push("El dominio del correo no puede estar vacío.");
                }

                const dominioPartes = dominio.split(".");
                if (dominioPartes.length < 2) {
                    errores.push("El dominio debe contener al menos un punto.");
                } else {
                    for (let parte of dominioPartes) {
                        if (parte.length === 0) {
                            errores.push("Las partes del dominio no pueden estar vacías.");
                            break;
                        }
                    }
                }
            }
        }

        if (errores.length > 0) {
            const error: ErrorDeValidacion = {
                status: "error",
                message: "Validación de correo electrónico fallida.",
                detalles: errores,
            };
            callback(error);
        } else {
            const correoValido: CorreoValido = dato as CorreoValido;
            callback(null, correoValido);
        }
    }
}
// ValidacionTelefono.ts

import { Validacion } from "./validacion";
import { TelefonoValido, ErrorDeValidacion } from "./interfaces";

export class ValidacionTelefono implements Validacion<TelefonoValido> {
    validar(dato: any, callback: (error: ErrorDeValidacion | null, resultado?: TelefonoValido) => void): void {
        const errores: string[] = [];

        if (typeof dato !== "string") {
            errores.push("El número de teléfono debe ser una cadena de texto.");
        } else {
            const telefonoTrim = dato.trim();
            if (telefonoTrim.length < 7 || telefonoTrim.length > 15) {
                errores.push("El número de teléfono debe tener entre 7 y 15 caracteres.");
            }

            // Validación manual: solo dígitos, '+', '-', y espacios
            for (let i = 0; i < telefonoTrim.length; i++) {
                const char = telefonoTrim.charAt(i);
                const code = char.charCodeAt(0);
                const isDigit = code >= 48 && code <= 57; // '0' - '9'
                const isPlus = char === '+';
                const isMinus = char === '-';
                const isSpace = char === ' ';

                if (!(isDigit || isPlus || isMinus || isSpace)) {
                    errores.push("El número de teléfono contiene caracteres inválidos.");
                    break;
                }
            }
        }

        if (errores.length > 0) {
            const error: ErrorDeValidacion = {
                status: "error",
                message: "Validación de número de teléfono fallida.",
                detalles: errores,
            };
            callback(error);
        } else {
            const telefonoValido: TelefonoValido = dato as TelefonoValido;
            callback(null, telefonoValido);
        }
    }
}

// ValidacionEdad.ts

import { Validacion } from "./validacion";
import { EdadValida, ErrorDeValidacion } from "./interfaces";

export class ValidacionEdad implements Validacion<EdadValida> {
    validar(dato: any, callback: (error: ErrorDeValidacion | null, resultado?: EdadValida) => void): void {
        const errores: string[] = [];

        if (typeof dato !== "number") {
            errores.push("La edad debe ser un número.");
        } else {
            if (!Number.isInteger(dato)) {
                errores.push("La edad debe ser un número entero.");
            }
            if (dato < 18 || dato > 100) {
                errores.push("La edad debe estar entre 18 y 100 años.");
            }
        }

        if (errores.length > 0) {
            const error: ErrorDeValidacion = {
                status: "error",
                message: "Validación de edad fallida.",
                detalles: errores,
            };
            callback(error);
        } else {
            const edadValida: EdadValida = dato as EdadValida;
            callback(null, edadValida);
        }
    }
}
// SistemaRegistro.ts

import { DatosUsuario, RegistroExitoso, ErrorDeValidacion } from "./interfaces";
import { Validacion } from "./validacion";
import { ValidacionNombre } from "./ValidacionNombre";
import { ValidacionCorreo } from "./ValidacionCorreo";
import { ValidacionTelefono } from "./ValidacionTelefono";
import { ValidacionEdad } from "./ValidacionEdad";

export class SistemaRegistro {
    private validaciones: Validacion<any>[];
    private callbacksExitosos: Array<(registro: RegistroExitoso) => void>;
    private callbacksErrores: Array<(error: ErrorDeValidacion) => void>;

    constructor() {
        // Composición de validaciones
        this.validaciones = [
            new ValidacionNombre(),
            new ValidacionCorreo(),
            new ValidacionTelefono(),
            new ValidacionEdad(),
        ];

        // Inicialización de callbacks
        this.callbacksExitosos = [];
        this.callbacksErrores = [];
    }

    // Métodos para suscribirse a eventos de éxito y error
    onSuccess(callback: (registro: RegistroExitoso) => void): void {
        this.callbacksExitosos.push(callback);
    }

    onError(callback: (error: ErrorDeValidacion) => void): void {
        this.callbacksErrores.push(callback);
    }

    // Método para registrar un usuario
    registrarUsuario(datos: DatosUsuario): void {
        const errores: string[] = [];
        const resultados: { [key: string]: any } = {};

        // Función para manejar el resultado de cada validación
        const manejarValidacion = (
            error: ErrorDeValidacion | null,
            resultado?: any,
            campo?: string
        ) => {
            if (error) {
                errores.push(...error.detalles.map(detalle => `${campo}: ${detalle}`));
            } else {
                // Almacenar el resultado validado
                resultados[campo as string] = resultado;
            }
        };

        // Funciones nombradas para cada validación
        function validarNombre(
            nombre: any,
            callback: (error: ErrorDeValidacion | null, resultado?: any) => void
        ): void {
            const validacion = this.validaciones[0] as Validacion<any>;
            validacion.validar(nombre, (error, resultado) => {
                manejarValidacion(error, resultado, "Nombre");
                validarCorreo(datos.correo, callback);
            });
        }

        function validarCorreo(
            correo: any,
            callback: (error: ErrorDeValidacion | null, resultado?: any) => void
        ): void {
            const validacion = this.validaciones[1] as Validacion<any>;
            validacion.validar(correo, (error, resultado) => {
                manejarValidacion(error, resultado, "Correo Electrónico");
                validarTelefono(datos.telefono, callback);
            });
        }

        function validarTelefono(
            telefono: any,
            callback: (error: ErrorDeValidacion | null, resultado?: any) => void
        ): void {
            const validacion = this.validaciones[2] as Validacion<any>;
            validacion.validar(telefono, (error, resultado) => {
                manejarValidacion(error, resultado, "Número de Teléfono");
                validarEdad(datos.edad, callback);
            });
        }

        function validarEdad(
            edad: any,
            callback: (error: ErrorDeValidacion | null, resultado?: any) => void
        ): void {
            const validacion = this.validaciones[3] as Validacion<any>;
            validacion.validar(edad, (error, resultado) => {
                manejarValidacion(error, resultado, "Edad");
                // Después de todas las validaciones
                if (errores.length > 0) {
                    const errorValidacion: ErrorDeValidacion = {
                        status: "error",
                        message: "Validación de registro fallida.",
                        detalles: errores,
                    };
                    // Ejecutar todos los callbacks de error
                    this.callbacksErrores.forEach(cb => cb(errorValidacion));
                } else {
                    const registro: RegistroExitoso = {
                        status: "success",
                        message: "Registro completado exitosamente.",
                    };
                    // Ejecutar todos los callbacks de éxito
                    this.callbacksExitosos.forEach(cb => cb(registro));
                }
            });
        }

        // Iniciar las validaciones de manera asíncrona
        validarNombre.call(this, datos.nombre, () => { /* Finalización */ });
    }
}
//Ejemplo de uso (este codigo es completo)
// index.ts

import { SistemaRegistro } from "./SistemaRegistro";
import { DatosUsuario } from "./interfaces";

// Crear una instancia del sistema de registro
const sistemaRegistro = new SistemaRegistro();

// Definir callbacks nombrados para manejar éxito y errores
function manejarExito(registro: RegistroExitoso): void {
    console.log(registro.message);
}

function manejarError(error: ErrorDeValidacion): void {
    console.error(error.message);
    error.detalles.forEach(detalle => console.error(`- ${detalle}`));
}

// Suscribirse a los eventos de éxito y error
sistemaRegistro.onSuccess(manejarExito);
sistemaRegistro.onError(manejarError);

// Datos de ejemplo para registrar usuarios
const usuarioValido: DatosUsuario = {
    nombre: "Juan Pérez",
    correo: "juan.perez@example.com",
    telefono: "+1234567890",
    edad: 30,
};

const usuarioInvalido: DatosUsuario = {
    nombre: "J",
    correo: "juan.perez@com",
    telefono: "123-abc-7890",
    edad: 17,
};

// Registrar usuarios
console.log("Registrando usuario válido:");
sistemaRegistro.registrarUsuario(usuarioValido);

console.log("\nRegistrando usuario inválido:");
sistemaRegistro.registrarUsuario(usuarioInvalido);
