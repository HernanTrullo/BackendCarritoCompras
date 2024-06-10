const express = require('express');
const productoController = require('../controllers/productoController');

const router = express.Router();

router.post('/', productoController.createProducto);
router.get('/', productoController.getAllProductos);
router.get('/:id', productoController.getProductoById);
router.put('/:id', productoController.updateProducto);
router.delete('/:id', productoController.deleteProducto);

module.exports = router;
