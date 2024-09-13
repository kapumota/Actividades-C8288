// Pregunta 1

/**
 * Clase que representa un Gestor de Tareas.
 */
class GestorTareas {
    constructor() {
        this.tareas = {}; // Estructura: { categoria: { subcategoria: [tareas] } }
    }

    // Agrega una nueva tarea a una categoría y subcategoría.
    agregarTarea(categoria, subCategoria, tarea) {
        if (!this.tareas[categoria]) {
            this.tareas[categoria] = {};
        }
        if (!this.tareas[categoria][subCategoria]) {
            this.tareas[categoria][subCategoria] = [];
        }
        this.tareas[categoria][subCategoria].push(tarea);
    }

    // Elimina una tarea específica de una categoría y subcategoría.
    eliminarTarea(categoria, subCategoria, nombreTarea) {
        const tareasSubCat = this.tareas[categoria]?.[subCategoria];
        if (tareasSubCat) {
            this.tareas[categoria][subCategoria] = tareasSubCat.filter(tarea => tarea.nombre !== nombreTarea);
        }
    }

    // Actualiza el estado de una tarea específica.
    actualizarEstadoTarea(categoria, subCategoria, nombreTarea, nuevoEstado) {
        const tareasSubCat = this.tareas[categoria]?.[subCategoria];
        if (tareasSubCat) {
            const tarea = tareasSubCat.find(tarea => tarea.nombre === nombreTarea);
            if (tarea) {
                tarea.completada = nuevoEstado;
            }
        }
    }

    // Fusiona dos categorías, combinando las subcategorías y tareas.
    fusionarCategorias(categoria1, categoria2, nuevoNombreCategoria) {
        const categoriaFusionada = {
            ...this.tareas[categoria1],
            ...this.tareas[categoria2],
        };

        // Si una subcategoría existe en ambas categorías, se combinan las tareas
        for (let subCategoria in categoriaFusionada) {
            if (this.tareas[categoria1]?.[subCategoria] && this.tareas[categoria2]?.[subCategoria]) {
                categoriaFusionada[subCategoria] = [
                    ...this.tareas[categoria1][subCategoria],
                    ...this.tareas[categoria2][subCategoria],
                ];
            }
        }

        this.tareas[nuevoNombreCategoria] = categoriaFusionada;
        delete this.tareas[categoria1];
        delete this.tareas[categoria2];
    }

    // Itera sobre todas las categorías y subcategorías, imprimiendo las tareas.
    listarTareas() {
        for (let categoria in this.tareas) {
            console.log(`Categoría: ${categoria}`);
            for (let subCategoria in this.tareas[categoria]) {
                console.log(`  Subcategoría: ${subCategoria}`);
                this.tareas[categoria][subCategoria].forEach(tarea => {
                    console.log(`    - Tarea: ${tarea.nombre} [${tarea.completada ? 'Completada' : 'Pendiente'}]`);
                });
            }
        }
    }

    // Realiza una copia superficial de una categoría.
    copiaSuperficialCategoria(categoria) {
        return { ...this.tareas[categoria] };
    }

    // Realiza una copia profunda de una categoría.
    copiaProfundaCategoria(categoria) {
        return JSON.parse(JSON.stringify(this.tareas[categoria]));
    }
}

// Ejemplo de uso:
const gestorTareas = new GestorTareas();

gestorTareas.agregarTarea('Trabajo', 'Desarrollo', { nombre: 'Revisión de Código', completada: false });
gestorTareas.agregarTarea('Trabajo', 'Desarrollo', { nombre: 'Escribir Pruebas Unitarias', completada: false });
gestorTareas.agregarTarea('Personal', 'Casa', { nombre: 'Limpiar la Casa', completada: false });
gestorTareas.agregarTarea('Personal', 'Casa', { nombre: 'Comprar Comestibles', completada: false });

gestorTareas.actualizarEstadoTarea('Trabajo', 'Desarrollo', 'Revisión de Código', true);

gestorTareas.listarTareas();

const copiaSuperficial = gestorTareas.copiaSuperficialCategoria('Trabajo');
const copiaProfunda = gestorTareas.copiaProfundaCategoria('Trabajo');

console.log('Copia Superficial:', copiaSuperficial);
console.log('Copia Profunda:', copiaProfunda);

gestorTareas.fusionarCategorias('Trabajo', 'Personal', 'CategoriaFusionada');
gestorTareas.listarTareas();

// Pregunta 2 --> utilizando anotaciones
/**
 * Calcula la media de un array de números.
 * @param {number[]} numeros - Array de números.
 * @returns {number} La media de los números.
 */
function calcularMedia(numeros) {
    return numeros.reduce((suma, num) => suma + num, 0) / numeros.length;
}

/**
 * Calcula la mediana de un array de números.
 * @param {number[]} numeros - Array de números.
 * @returns {number} La mediana de los números.
 */
function calcularMediana(numeros) {
    const ordenados = [...numeros].sort((a, b) => a - b);
    const mitad = Math.floor(ordenados.length / 2);
    return ordenados.length % 2 === 0 ? (ordenados[mitad - 1] + ordenados[mitad]) / 2 : ordenados[mitad];
}

/**
 * Calcula la moda de un array de números.
 * @param {number[]} numeros - Array de números.
 * @returns {number[]} La moda de los números.
 */
function calcularModa(numeros) {
    const mapaFrecuencia = {};
    numeros.forEach(num => mapaFrecuencia[num] = (mapaFrecuencia[num] || 0) + 1);
    const maxFrecuencia = Math.max(...Object.values(mapaFrecuencia));
    return Object.keys(mapaFrecuencia).filter(key => mapaFrecuencia[key] === maxFrecuencia).map(Number);
}

/**
 * Calcula la desviación estándar de un array de números.
 * @param {number[]} numeros - Array de números.
 * @returns {number} La desviación estándar de los números.
 */
function calcularDesviacionEstandar(numeros) {
    const media = calcularMedia(numeros);
    const varianza = numeros.reduce((suma, num) => suma + Math.pow(num - media, 2), 0) / numeros.length;
    return Math.sqrt(varianza);
}

/**
 * Realiza un análisis estadístico completo sobre un array de datos organizados en categorías.
 * @param {Object[]} datos - Array de objetos con datos.
 * @param {string} clave - Clave para el análisis (por ejemplo, "edad", "ingreso").
 */
function analizarDatos(datos, clave) {
    const gruposPorCategoria = {};

    // Agrupar datos por categoría
    datos.forEach(item => {
        const valor = item[clave];
        if (valor !== undefined) {
            if (!gruposPorCategoria[item.categoria]) {
                gruposPorCategoria[item.categoria] = [];
            }
            gruposPorCategoria[item.categoria].push(valor);
        }
    });

    // Calcular estadísticas por categoría
    for (let categoria in gruposPorCategoria) {
        const numeros = gruposPorCategoria[categoria];
        const media = calcularMedia(numeros);
        const mediana = calcularMediana(numeros);
        const moda = calcularModa(numeros);
        const desviacionEstandar = calcularDesviacionEstandar(numeros);

        console.log(`Categoría: ${categoria}`);
        console.log(`  Media: ${media}`);
        console.log(`  Mediana: ${mediana}`);
        console.log(`  Moda: ${moda}`);
        console.log(`  Desviación Estándar: ${desviacionEstandar}`);
    }
}

/**
 * Calcula la diferencia en días entre dos fechas.
 * @param {Date} fecha1 - Primera fecha.
 * @param {Date} fecha2 - Segunda fecha.
 * @returns {number} Diferencia en días entre las dos fechas.
 */
function calcularDiferenciaFechas(fecha1, fecha2) {
    const diferenciaTiempo = Math.abs(fecha2 - fecha1);
    return Math.ceil(diferenciaTiempo / (1000 * 60 * 60 * 24));
}

// Ejemplo de uso:
const datos = [
    { categoria: 'A', edad: 25, ingreso: 50000 },
    { categoria: 'B', edad: 30, ingreso: 60000 },
    { categoria: 'A', edad: 22, ingreso: 48000 },
    { categoria: 'B', edad: 35, ingreso: 65000 },
    { categoria: 'A', edad: 28, ingreso: 54000 },
    { categoria: 'C', edad: 40, ingreso: 70000 },
];

analizarDatos(datos, 'edad');
analizarDatos(datos, 'ingreso');

// Cálculo de diferencia de fechas
const fecha1 = new Date('2023-01-01');
const fecha2 = new Date('2023-12-31');
const diferenciaDias = calcularDiferenciaFechas(fecha1, fecha2);
console.log(`Diferencia en días: ${diferenciaDias}`);


// Version 1 - Pregunta 1

// Definición de permisos posibles
const PERMISSIONS = {
    READ: 'read',
    WRITE: 'write',
    DELETE: 'delete',
};

// Clase User con campos privados para encapsular los permisos
class User {
    #permissions;
    constructor(name) {
        this.name = name;
        this.groups = [];
        this.#permissions = [];
    }

    /**
     * Método estático para crear un nuevo usuario
     * @param {string} name - Nombre del usuario
     * @returns {User} - Nueva instancia de usuario
     */
    static createUser(name) {
        return new User(name);
    }

    /**
     * Asigna un grupo a un usuario
     * @param {Group} group - Grupo que se le asignará al usuario
     */
    assignGroup(group) {
        this.groups.push(group);
        this.#updatePermissions();
    }

    /**
     * Verifica si el usuario tiene un permiso específico
     * @param {string} permission - Permiso que se desea verificar
     * @returns {boolean} - Verdadero si tiene el permiso
     */
    hasPermission(permission) {
        return this.#permissions.includes(permission);
    }

    // Método privado para actualizar los permisos del usuario según los grupos
    #updatePermissions() {
        this.#permissions = this.groups.reduce((acc, group) => {
            return acc.concat(group.permissions);
        }, []);
    }

    /**
     * Obtiene los permisos del usuario
     * @returns {Array} - Lista de permisos del usuario
     */
    getPermissions() {
        return this.#permissions;
    }
}

// Clase Group para gestionar los grupos de usuarios
class Group {
    constructor(name, permissions = []) {
        this.name = name;
        this.permissions = permissions;
    }

    /**
     * Añade permisos al grupo
     * @param {string[]} newPermissions - Lista de permisos a añadir
     */
    addPermissions(newPermissions) {
        this.permissions = [...this.permissions, ...newPermissions];
    }

    /**
     * Elimina un permiso del grupo
     * @param {string} permission - Permiso que se desea eliminar
     */
    removePermission(permission) {
        this.permissions = this.permissions.filter(perm => perm !== permission);
    }
}

// Clase AdminUser que hereda de User y tiene permisos adicionales
class AdminUser extends User {
    constructor(name) {
        super(name);
        this.assignAdminPermissions();
    }

    /**
     * Asigna permisos de administrador
     */
    assignAdminPermissions() {
        const adminPermissions = [PERMISSIONS.READ, PERMISSIONS.WRITE, PERMISSIONS.DELETE];
        const adminGroup = new Group('Admin', adminPermissions);
        this.assignGroup(adminGroup);
    }
}

// Clase GuestUser que hereda de User con permisos limitados
class GuestUser extends User {
    constructor(name) {
        super(name);
        this.assignGuestPermissions();
    }

    /**
     * Asigna permisos limitados de invitado
     */
    assignGuestPermissions() {
        const guestPermissions = [PERMISSIONS.READ];
        const guestGroup = new Group('Guest', guestPermissions);
        this.assignGroup(guestGroup);
    }
}

// Función que lista todos los usuarios con un permiso específico
function getUsersWithPermission(users, permission) {
    return users.filter(user => user.hasPermission(permission));
}

// Prueba de la funcionalidad

// Crear grupos
const devGroup = new Group('Developers', [PERMISSIONS.READ, PERMISSIONS.WRITE]);
const hrGroup = new Group('HR', [PERMISSIONS.READ]);

// Crear usuarios
const user1 = User.createUser('Kapu');
const user2 = User.createUser('Mota');
const admin = new AdminUser('Ire');
const guest = new GuestUser('Chalo');

// Asignar grupos a usuarios
user1.assignGroup(devGroup);
user2.assignGroup(hrGroup);

// Mostrar permisos de cada usuario
console.log(`${user1.name} tiene permisos:`, user1.getPermissions());
console.log(`${user2.name} tiene permisos:`, user2.getPermissions());
console.log(`${admin.name} tiene permisos:`, admin.getPermissions());
console.log(`${guest.name} tiene permisos:`, guest.getPermissions());

// Verificar si los usuarios tienen un permiso específico
console.log(`${user1.name} puede escribir:`, user1.hasPermission(PERMISSIONS.WRITE));
console.log(`${guest.name} puede eliminar:`, guest.hasPermission(PERMISSIONS.DELETE));

// Listar todos los usuarios que pueden leer
const users = [user1, user2, admin, guest];
const readers = getUsersWithPermission(users, PERMISSIONS.READ);
console.log('Usuarios con permiso de lectura:', readers.map(user => user.name));





// Pregunta 2

// Clase Product que representa un producto en la tienda
class Product {
  constructor(id, name, price, stock) {
      this.id = id;
      this.name = name;
      this.price = price;
      this.stock = stock;
  }

  // Getter para obtener la información del producto
  get productInfo() {
      return `Producto: ${this.name} - Precio: ${this.price.toFixed(2)}€ - Stock: ${this.stock} unidades`;
  }

  // Setter para actualizar el stock
  set updateStock(newStock) {
      if (newStock < 0) {
          console.error('El stock no puede ser negativo.');
      } else {
          this.stock = newStock;
      }
  }

  // Método para reducir el stock tras una venta
  reduceStock(quantity) {
      if (this.stock >= quantity) {
          this.stock -= quantity;
          console.log(`${quantity} unidades de ${this.name} han sido vendidas.`);
      } else {
          console.error(`Stock insuficiente para ${this.name}.`);
      }
  }

  // Método estático para crear productos de prueba
  static generateSampleProducts() {
      return [
          new Product(1, 'Laptop', 1200, 50),
          new Product(2, 'Mouse', 25, 200),
          new Product(3, 'Teclado', 75, 150)
      ];
  }
}

// Clase ProductWithVariants que extiende Product para productos con variantes
class ProductWithVariants extends Product {
  constructor(id, name, price, stock, variants) {
      super(id, name, price, stock);
      this.variants = variants;  // Variantes como color o tamaño
  }

  // Método para mostrar las variantes del producto
  showVariants() {
      console.log(`Variantes disponibles para ${this.name}: ${this.variants.join(', ')}`);
  }
}

// Clase Order que representa un pedido
class Order {
  constructor(orderId, customerName) {
      this.orderId = orderId;
      this.customerName = customerName;
      this.products = []; // Array de productos en el pedido
  }

  // Getter para obtener la información del pedido
  get orderInfo() {
      return `Pedido ${this.orderId} para ${this.customerName}`;
  }

  // Método para añadir un producto al pedido
  addProduct(product, quantity) {
      if (product.stock >= quantity) {
          const productCopy = { ...product }; // Copia superficial del producto
          productCopy.quantity = quantity;   // Añadir la cantidad pedida
          this.products.push(productCopy);
          product.reduceStock(quantity);     // Reducir el stock del producto original
      } else {
          console.error(`No se pudo añadir ${product.name}. Stock insuficiente.`);
      }
  }

  // Método para calcular el precio total del pedido
  calculateTotal() {
      return this.products.reduce((total, product) => total + product.price * product.quantity, 0);
  }

  // Método estático para crear un pedido de prueba
  static createSampleOrder() {
      return new Order(101, 'Juan Pérez');
  }
}

// Función para gestionar pedidos de clientes con closures y arrow functions
const orderManager = (() => {
  let orderIdCounter = 1;
  const orders = [];

  return {
      createOrder: (customerName) => {
          const order = new Order(orderIdCounter++, customerName);
          orders.push(order);
          return order;
      },

      listOrders: () => orders.map(order => order.orderInfo),

      findOrder: (orderId) => orders.find(order => order.orderId === orderId),

      deleteOrder: (orderId) => {
          const index = orders.findIndex(order => order.orderId === orderId);
          if (index !== -1) {
              orders.splice(index, 1);
              console.log(`Pedido ${orderId} ha sido eliminado.`);
          } else {
              console.error(`Pedido ${orderId} no encontrado.`);
          }
      }
  };
})();

// Función para fusionar los datos de dos objetos de pedidos
const mergeOrders = (order1, order2) => {
  const mergedOrder = {
      ...order1,
      ...order2,
      products: [...order1.products, ...order2.products] // Fusionar productos
  };
  return mergedOrder;
};

// --- DEMOSTRACIÓN DEL SISTEMA ---

// Crear productos de prueba
const products = Product.generateSampleProducts();
const productWithVariants = new ProductWithVariants(4, 'Camiseta', 20, 100, ['S', 'M', 'L', 'XL']);

// Mostrar productos iniciales
console.log('--- Productos Iniciales ---');
products.forEach(product => console.log(product.productInfo));
productWithVariants.showVariants();

// Crear un pedido
const order1 = orderManager.createOrder('Pedro González');
order1.addProduct(products[0], 1); // Añadir 1 Laptop
order1.addProduct(products[1], 5); // Añadir 5 Mouse

console.log(`Total del pedido 1: ${order1.calculateTotal().toFixed(2)}€`);

// Crear otro pedido
const order2 = orderManager.createOrder('María López');
order2.addProduct(products[2], 2); // Añadir 2 Teclados

console.log(`Total del pedido 2: ${order2.calculateTotal().toFixed(2)}€`);

// Listar pedidos
console.log('--- Pedidos Actuales ---');
orderManager.listOrders().forEach(info => console.log(info));

// Fusionar dos pedidos
const mergedOrder = mergeOrders(order1, order2);
console.log(`Pedido fusionado: ${mergedOrder.customerName} con ${mergedOrder.products.length} productos.`);

// Eliminar un pedido
orderManager.deleteOrder(order1.orderId);

// Listar pedidos después de eliminar uno
console.log('--- Pedidos después de eliminar ---');
orderManager.listOrders().forEach(info => console.log(info));
