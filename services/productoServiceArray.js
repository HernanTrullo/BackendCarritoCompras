const productoRepository = require('../models/repositories/productoRepository');
const categoriaRepository = require('../models/repositories/categoriaRepository');
const {v4: uuid} = require("uuid")

const productoService = {
    createProducto: async (producto) => {
        if(!producto.nombre || !producto.descripcion || !producto.precio || !producto.id_categoria){
            throw new Error("Datos vacios.")
        }
        
        // const nuevoProducto= {
        //     id: uuid(),
        //     nombre: producto.nombre,
        //     descripcion: producto.descripcion,
        //     precio: producto.precio,
        //     id_categoria: producto.id_categoria
        // }

        return await productoRepository.create({...producto, id: uuid()});
    },

    getAllProductos: async () => {

        const categoriaGetAll= await categoriaRepository.getAll()

        const categorias= categoriaGetAll.reduce((acc, categoria) => {
            acc[categoria.id]= categoria.nombre
            return acc
        }, {})

        const productosGetAll= await productoRepository.getAll();

        const productos= productosGetAll.map(producto => {
            const categoria= categorias[producto.id_categoria]
            return {...producto, categoria}
        })
        
        return productos
    },

    getProductoById: async (id) => {

        const productoGetById= await productoRepository.getById(id);
        const categoriaGetById= await categoriaRepository.getById(productoGetById.id_categoria);

        return {...productoGetById, categoria: categoriaGetById.nombre}
    },

    updateProducto: async (id, producto) => {
        if(!producto.nombre || !producto.descripcion || !producto.precio || !producto.id_categoria){
            throw new Error("Datos vacios.")
        }

        const productoBD= await productoRepository.getById(id)
        productoBD.nombre= producto.nombre
        productoBD.descripcion= producto.descripcion
        productoBD.precio= producto.precio
        productoBD.id_categoria= producto.id_categoria

        return await productoRepository.update(id, productoBD);
    },

    deleteProducto: async (id) => {
        return await productoRepository.delete(id);
    }
};

module.exports = productoService;
