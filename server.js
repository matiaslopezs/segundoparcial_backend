const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const db = require("./app/models");
db.sequelize.sync(); //sincroniza con la DB. Si las tablas no existen las crea
var corsOptions = {
    origin: "http://localhost:9091"
};
app.use(cors(corsOptions));
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
require("./app/routes/restaurantereserva.routes.js")(app);
require("./app/routes/mesa.routes.js")(app);
app.listen(PORT, () => {
    console.log('Servidor corriendo en puerto 9090.');
});