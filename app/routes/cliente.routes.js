const cliente = require("../controllers/cliente.controller");
module.exports = app => {
    const cliente = require("../controllers/cliente.controller.js");
    var router = require("express").Router();
    //rutas que utilizaremos
    router.post("/", cliente.create);
    router.get("/", cliente.findAll);
    router.get("/:id", cliente.findOne);
    router.get( "/ci/:ci",cliente.findByCi);
    router.put("/", cliente.update);
    router.delete( "/:id",cliente.delete);
    //registramos en la api
    app.use('/api/cliente', router);
};