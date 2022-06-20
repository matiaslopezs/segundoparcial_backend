module.exports = app => {
    const detalle = require("../controllers/detalleconsumodao.controller");
    var router = require("express").Router();
    //rutas que utilizaremos
    router.post("/", detalle.create);
    router.get("/", detalle.findAll);
    router.get("/:id", detalle.findOne);
    router.get("/consumo/:id_consumo",detalle.findByConsumo);
    router.put("/", detalle.update);
    router.delete( "/:id",detalle.delete);
    //registramos en la api
    app.use('/api/detalleconsumo', router);
};