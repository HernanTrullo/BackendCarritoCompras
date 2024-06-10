const ConectorDataBase= require("../conectorDataBase")

class ProductoRepository {
    constructor(){
        this.db= new ConectorDataBase()
    }

  async create(producto) {
    try {
        const conexion= await this.db.conectar()
        const sql= "INSERT INTO productos (id_producto, nombre, descripcion, precio, id_categoria) VALUES(?, ?, ?, ?, ?)"
        await conexion.execute(sql, [producto.id_producto, producto.nombre, producto.descripcion, producto.precio, producto.id_categoria])
    } catch (error) {
        console.log(`Error al crear el producto: ${error.message}`)
        throw error
    }finally{
        await this.db.desconectar()
    }
  }

  async getAll() {
    try {
        const conexion= await this.db.conectar()
        const sql= `
            SELECT p.id_producto, p.nombre, p.descripcion, p.precio, p.id_categoria, c.nombre AS categoria
            FROM productos p
            LEFT JOIN categorias c
            ON p.id_categoria= c.id
            ORDER BY p.id_producto DESC
        `
        const [rows]= await conexion.execute(sql)

        return rows

    } catch (error) {
        console.log(`Error al obtener los productos: ${error.message}`)
        throw error
    }finally{
        await this.db.desconectar()
    }
  }

  async getById(id_producto) {
    try {
        const conexion= await this.db.conectar()
        const sql= `
            SELECT p.id_producto, p.nombre, p.descripcion, p.precio, p.id_categoria, c.nombre AS categoria
            FROM productos p
            LEFT JOIN categorias c
            ON p.id_categoria= c.id
            WHERE p.id_producto= ?
        `
        const [rows]= await conexion.execute(sql, [id_producto])

        return rows[0] || null

    } catch (error) {
        console.log(`Error al obtener el producto: ${error.message}`)
        throw error
    }finally{
        await this.db.desconectar()
    }
  }

  async update(id_producto, productoDB) {
    try {
        const conexion= await this.db.conectar()
        const sql= "UPDATE productos SET nombre= ?, descripcion= ?, precio= ?, id_categoria= ? WHERE id_producto = ?"
        await conexion.execute(sql, [productoDB.nombre, productoDB.descripcion, productoDB.precio, productoDB.id_categoria, id_producto])
    } catch (error) {
        console.log(`Error al actualizar el producto: ${error.message}`)
        throw error
    }finally{
        await this.db.desconectar()
    }
  }

  async delete(id_producto) {
    try {
        const conexion= await this.db.conectar()
        const sql= "DELETE FROM productos WHERE id_producto = ?"
        await conexion.execute(sql, [id_producto])
    } catch (error) {
        console.log(`Error al eliminar el producto: ${error.message}`)
        throw error
    }finally{
        await this.db.desconectar()
    }
  }
}

module.exports = ProductoRepository;

