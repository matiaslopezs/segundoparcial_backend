module.exports = app => {
    const restaurante = require("../controllers/restaurantedao.controller.js");
    var router = require("express").Router();
    //rutas que utilizaremos
    router.post("/", restaurante.create);
    router.get("/", restaurante.findAll);
    router.get("/:id", restaurante.findOne);
    //registramos en la api
    app.use('/api/restaurantereserva', router);
};