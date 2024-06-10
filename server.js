const express = require('express');
const cors = require('cors');
const productoRoutes = require('./routes/productoRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const envConfig= require("./utils/envConfig")
const ConectorDataBase= require("./models/conectorDataBase")

const app = express();
const PORT = envConfig.EXPRESS_PORT;
const HOST = envConfig.EXPRESS_HOST
const db= new ConectorDataBase()

app.use(express.json());
app.use(cors());

// app.use("/api", protectedRoutes)
app.use('/productos', productoRoutes);
app.use('/categorias', categoriaRoutes);


db.incializarDB()
.then(()=>{
  app.listen(PORT, HOST, () => {
    console.log(`Servidor corriendo en http://${HOST}:${PORT}`);
  });
})
.catch((error)=>{
  console.log(`Error al inicializar la base de datos: ${error.message}`)
})




