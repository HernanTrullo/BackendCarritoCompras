const Categoria = require('../models/entities/categoriaEntity');

let categorias = [
    new Categoria({ id: 1, nombre: 'Electrónica' }),
    new Categoria({ id: 2, nombre: 'Libros' }),
    new Categoria({ id: 3, nombre: 'Ropa' })
];

let categoriaId = categorias.length;

class CategoryRepository {
    
    static create({ nombre }) {
        const categoria = new Categoria({ id: ++categoriaId, nombre });
        categorias.push(categoria);
        return Promise.resolve(categoria);
    }

    static getAll() {
        return Promise.resolve(categorias);
    }

    static getById(id) {
        const categoria = categorias.find(c => c.id == id);
        return Promise.resolve(categoria);
    }

    static update(id, { nombre }) {
        const categoria = categorias.find(c => c.id == id);
        if (categoria) {
            categoria.nombre = nombre;
            return Promise.resolve(categoria);
        }
        return Promise.resolve(null);
    }

    static delete(id) {
        const index = categorias.findIndex(c => c.id == id);
        if (index !== -1) {
            categorias = categorias.filter(c => c.id != id);
            return Promise.resolve({ id });
        }
        return Promise.resolve(null);
    }
}

module.exports = CategoryRepository;
