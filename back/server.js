const app = require("./app");
const connectDatabase = require("./config/database");

//Setear archivo de configuración
const dotenv = require("dotenv");
dotenv.config({ path: 'back/config/config.env'});

// configuracion base de datos
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Servidor iniciado en puerto: ${process.env.PORT} modo ${process.env.NODE_ENV}`
  );
});
