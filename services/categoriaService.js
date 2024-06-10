const categoriaRepository = require('../models/repositories/categoriaRepository');

const categoriaService = {
    createCategoria: async (data) => {
        return await categoriaRepository.create(data);
    },

    getAllCategorias: async () => {
        return await categoriaRepository.getAll();
    },

    getCategoriaById: async (id) => {
        return await categoriaRepository.getById(id);
    },

    updateCategoria: async (id, data) => {
        return await categoriaRepository.update(id, data);
    },

    deleteCategoria: async (id) => {
        return await categoriaRepository.delete(id);
    }
};

module.exports = categoriaService;
