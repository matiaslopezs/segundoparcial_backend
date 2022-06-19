module.exports = app => {
    const reserva = require("../controllers/reservadao.controller.js");
    var router = require("express").Router();
    //rutas que utilizaremos
    router.post("/", reserva.create);
    router.get("/", reserva.findAll);
    router.get("/:id", reserva.findOne);
    router.get("/restaurantes/:id_restaurante",reserva.findByRestaurant);
    router.get("/clientes/:id_cliente",reserva.findByCliente);
    router.get("/fechas/:fecha",reserva.findByFecha);
    router.get("/mesasocupadas/:id_restaurante/:fecha/:hora_entrada/:hora_salida/:cantidad_lugares",reserva.getMesasNotAvailable);
    router.get("/ryf/:id_restaurante/:fecha",reserva.getReservasRestaurantFecha);
    router.get("/ryc/:id_restaurante/:id_cliente",reserva.getReservasRestaurantCliente);
    router.get("/cyf/:id_cliente/:fecha",reserva.getReservasFechaCliente);
    router.get("/ryfyc/:id_restaurante/:fecha/:id_cliente",reserva.getReservasRestaurantFechaCliente);
    router.put("/", reserva.update);
    router.delete( "/:id",reserva.delete);
    //registramos en la api
    app.use('/api/reserva', router);
};