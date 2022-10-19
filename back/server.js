const app = require("./app");

//Setear archivo de configuración
const dotenv = require("dotenv");
dotenv.config({ path: 'back/config/config.env'});

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Servidor iniciado en puerto: ${process.env.PORT} modo ${process.env.NODE_ENV}`
  );
});
