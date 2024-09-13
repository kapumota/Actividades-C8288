// Pregunta 1

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
