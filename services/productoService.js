const ProductoRepository = require('../models/repositories/productoRepository');
const crearUUID= require("../utils/crearUUID")

const productoService = {
    createProducto: async (producto) => {
        if(!producto.nombre || !producto.descripcion || !producto.precio || !producto.id_categoria){
            throw new Error("Datos vacios.")
        }
        
        const id_producto= crearUUID()

        const productoRepository= new ProductoRepository()        
        await productoRepository.create({...producto, id_producto });

        return await productoRepository.getById(id_producto);
    },

    getAllProductos: async () => {
        return await new ProductoRepository().getAll(); 
    },

    getProductoById: async (id_producto) => {
        return await new ProductoRepository.getById(id_producto);
    },

    updateProducto: async (id_producto, producto) => {
        const {nombre, descripcion, precio, id_categoria} = producto

        if(!nombre || !descripcion || !precio || !id_categoria){
            throw new Error("Datos vacios.")
        }

        const productoRepository= new ProductoRepository()  
        const productoBD= await productoRepository.getById(id_producto)

        if(!productoBD){
            throw new Error("Producto no encontrado.")
        }

        productoBD.nombre= producto.nombre
        productoBD.descripcion= producto.descripcion
        productoBD.precio= producto.precio
        productoBD.id_categoria= producto.id_categoria

        await productoRepository.update(id_producto, productoBD);

        // await productoRepository.update(id_producto, {...productoBD, ...producto});

        return await productoRepository.getById(id_producto)
    },

    deleteProducto: async (id_producto) => {
        const productoRepository= new ProductoRepository()  
        const productoBD= await productoRepository.getById(id_producto)

        if(!productoBD){
            throw new Error("Producto no encontrado.")
        }

        await productoRepository.delete(id_producto);
    }
};

module.exports = productoService;
