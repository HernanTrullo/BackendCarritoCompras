const mysql= require("mysql2/promise")
const envConfig= require("../utils/envConfig")

class ConectorDataBase{
    constructor(){
        this.config= {
            host: envConfig.MYSQL_HOST,
            user: envConfig.MYSQL_USER,
            password: envConfig.MYSQL_PASSWORD,
            port: envConfig.MYSQL_PORT,
            database: envConfig.MYSQL_DB
        }
        this.conexion= null
    }

    async conectar(){
        try {            
            if(!this.conexion){
                this.conexion= await mysql.createConnection(this.config)
            }

            return this.conexion
        } catch (error) {
            console.log(`Error al conectar con la base de datos: ${error.message}`)
            this.conexion= null
        }
    }

    async desconectar(){
        try {            
            if(this.conexion){
                await this.conexion.end()
                this.conexion= null
            }
        } catch (error) {
            console.log(`Error al desconectar con la base de datos: ${error.message}`)
        }
    }

    async incializarDB(){
        try {            
            const database= this.config.database
            const sql= `CREATE DATABASE IF NOT EXISTS ${database}`

            delete this.config.database

            const conexion= await this.conectar()
            await conexion.query(sql)

            await this.crearTablas(conexion, database)

        } catch (error) {
            console.log(`Error al crear la base de datos: ${error.message}`)
        } finally{
            await this.desconectar()
        }
    }

    async crearTablas(conexion, database){
        const comandos= [
            `USE ${database};`,
            `CREATE TABLE IF NOT EXISTS categorias (
                id int(11) NOT NULL AUTO_INCREMENT,
                nombre VARCHAR(255) NOT NULL,
                PRIMARY KEY (id),
                UNIQUE KEY nombre (nombre)
            ) ENGINE= InnoDB DEFAULT CHARSET= utf8mb4 COLLATE= utf8mb4_unicode_ci;`,
            `CREATE TABLE IF NOT EXISTS productos (
                id int(11) NOT NULL AUTO_INCREMENT,
                id_producto VARCHAR(36) NOT NULL,
                nombre VARCHAR(255) NOT NULL,
                descripcion TEXT,
                precio INT NOT NULL,
                id_categoria INT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (id_producto),
                UNIQUE KEY nombre (nombre),
                INDEX id (id),
                FOREIGN KEY (id_categoria) REFERENCES categorias (id)
            ) ENGINE= InnoDB DEFAULT CHARSET= utf8mb4 COLLATE= utf8mb4_unicode_ci;`,
            `CREATE TABLE IF NOT EXISTS users (
                id int(11) NOT NULL AUTO_INCREMENT,
                id_user VARCHAR(36) NOT NULL,
                username VARCHAR(255) NOT NULL,
                password_hash VARCHAR(60) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (id_user),
                UNIQUE KEY username (username),
                INDEX id (id)
            ) ENGINE= InnoDB DEFAULT CHARSET= utf8mb4 COLLATE= utf8mb4_unicode_ci;`,
            "INSERT IGNORE INTO categorias (nombre) VALUES ('Electrónica'), ('Libros'), ('Ropa');"
        ]

        try {
            await conexion.beginTransaction()

            for(const sql of comandos){
                await conexion.query(sql)
            }
            
            await conexion.commit()
        } catch (error) {
            console.log(`Error al crear las tablas de la base de datos: ${error.message}`)
            if(conexion) await conexion.rollback()
        }
    }

}

module.exports= ConectorDataBase