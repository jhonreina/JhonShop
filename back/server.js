const app = require("./app");
const connectDatabase = require("./config/database");
const cloudinary=require("cloudinary")

//Setear archivo de configuración
const dotenv = require("dotenv");
dotenv.config({ path: 'back/config/config.env'});

// configuracion base de datos
connectDatabase();

//configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

//lamamos al servidor
const server = app.listen(process.env.PORT, () => {
  console.log(
    `Servidor iniciado en puerto: ${process.env.PORT} modo ${process.env.NODE_ENV}`
  );
});
