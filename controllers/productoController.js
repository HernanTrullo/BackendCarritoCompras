const productoService = require('../services/productoService');
const ProductoEntity = require('../models/entities/productoEntity');

const productoController = {
    createProducto: async (req, res) => {
        try {
            const producto = await productoService.createProducto(new ProductoEntity(req.body));
            res.status(201).json(producto);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    getAllProductos: async (req, res) => {
        try {
            const productos = await productoService.getAllProductos();
            res.json(productos);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    getProductoById: async (req, res) => {
        try {
            const producto = await productoService.getProductoById(req.params.id);
            if (producto) {
                res.json(producto);
            } else {
                res.status(404).send('Product not found');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    },


    updateProducto: async (req, res) => {
        try {    
            const producto = await productoService.updateProducto(req.params.id, new ProductoEntity(req.body));
            res.json(producto);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    deleteProducto: async (req, res) => {
        try {
            await productoService.deleteProducto(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
};

module.exports = productoController;
