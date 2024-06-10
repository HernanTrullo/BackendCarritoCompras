const express = require('express');
const categoriaController = require('../controllers/categoriaController');

const router = express.Router();

router.post('/', categoriaController.createCategoria);
router.get('/', categoriaController.getAllCategorias);
router.get('/:id', categoriaController.getCategoriaById);
router.put('/:id', categoriaController.updateCategoria);
router.delete('/:id', categoriaController.deleteCategoria);

module.exports = router;
