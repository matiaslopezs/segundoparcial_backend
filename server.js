const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const db = require("./app/models");
db.sequelize.sync(); //sincroniza con la DB. Si las tablas no existen las crea
var corsOptions = {
    origin: "*"
};
app.use(cors(/*corsOptions*/)); /* desactivado para que permita usar los datos enviados al servidor */
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
    res.json({ message: "Segundo Parcial: Sistema de Reserva de Restaurantes" });
});
// set port, listen for requests
const PORT = process.env.PORT || 9090;
// cargamos las rutas con la línea de abajo
require("./app/routes/restaurante.routes.js")(app);
require("./app/routes/mesa.routes.js")(app);
require("./app/routes/reserva.routes.js")(app);
require("./app/routes/cliente.routes.js")(app);
require("./app/routes/categoria_producto.routes.js")(app);
require("./app/routes/administraciondeproductos.routes.js")(app);

app.listen(PORT, () => {
    console.log('Servidor corriendo en puerto 9090.');
});