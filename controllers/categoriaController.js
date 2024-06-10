const categoriaService = require('../services/categoriaService');
const CategoriaEntity = require('../models/entities/categoriaEntity');

const categoriaController = {
    createCategoria: async (req, res) => {
        try {
            const categoria = await categoriaService.createCategoria(new CategoriaEntity(req.body));
            res.status(201).json(categoria);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    getAllCategorias: async (req, res) => {
        try {
            const categorias = await categoriaService.getAllCategorias();
            res.json(categorias);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    getCategoriaById: async (req, res) => {
        try {
            const categoria = await categoriaService.getCategoriaById(req.params.id);
            if (categoria) {
                res.json(categoria);
            } else {
                res.status(404).send('Category not found');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    updateCategoria: async (req, res) => {
        try {
            const categoria = await categoriaService.updateCategoria(req.params.id, new CategoriaEntity(req.body));
            res.json(categoria);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    deleteCategoria: async (req, res) => {
        try {
            await categoriaService.deleteCategoria(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
};

module.exports = categoriaController;
