module.exports = app => {
    const administraciondeproductos = require("../controllers/administraciondeproductos.controller.js");
    var router = require("express").Router();
    //rutas que utilizaremos
    router.post("/", administraciondeproductos.create);
    router.get("/", administraciondeproductos.findAll);
    router.get("/:id", administraciondeproductos.findOne);
    router.put("/", administraciondeproductos.update);
    router.delete( "/:id",administraciondeproductos.delete);
    //registramos en la api
    app.use('/api/administraciondeproductos', router);
};