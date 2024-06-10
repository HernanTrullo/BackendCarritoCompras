class ProductoEntity {
    constructor({ id_producto, nombre, descripcion, precio, id_categoria }) {
        this.id_producto= id_producto,
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.id_categoria = id_categoria;
    }
}

module.exports = ProductoEntity;

