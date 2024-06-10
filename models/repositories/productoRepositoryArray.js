const Producto = require('../models/productoModel');

let productos = [
    new Producto({ id: 1, nombre: 'iPhone 12', descripcion: 'Smartphone Apple', precio: 999.99, id_categoria: 1 }),
    new Producto({ id: 2, nombre: 'Cien años de soledad', descripcion: 'Libro de Gabriel García Márquez', precio: 12.99, id_categoria: 2 }),
    new Producto({ id: 3, nombre: 'Camiseta', descripcion: 'Camiseta de algodón color blanco', precio: 19.99, id_categoria: 3 })
];


class productoRepository {

  static create(producto) {
    productos.push(producto);
    return Promise.resolve(producto);
  }

  static getAll() {
      return Promise.resolve(productos);
  }

  static getById(id) {
      const producto = productos.find(p => p.id == id);
      return Promise.resolve(producto);
  }

  static update(id, productoDB) {
      const index = productos.findIndex(p => p.id == id);
      if (index !== -1) {
          productos[index] = {...productos[index], ...productoDB};
          return Promise.resolve(productos[index]);
      }
            
      return Promise.resolve(null);
  }

  static delete(id) {
      const index = productos.findIndex(p => p.id == id);
      if (index !== -1) {
          productos = productos.filter(p => p.id != id);
          return Promise.resolve({ id });
      }
      return Promise.resolve(null);
  }
}

module.exports = productoRepository;

