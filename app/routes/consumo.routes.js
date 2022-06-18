module.exports = app => {
    const consumo = require("../controllers/consumodao.controller.js");
    var router = require("express").Router();
    //rutas que utilizaremos
    router.post("/", consumo.create);
    router.get("/", consumo.findAll);
    router.get("/:id", consumo.findOne);
    router.get("/cliente/:id_cliente",consumo.findByCliente);
    router.put("/", consumo.update);
    router.delete( "/:id",consumo.delete);
    //registramos en la api
    app.use('/api/consumo', router);
};