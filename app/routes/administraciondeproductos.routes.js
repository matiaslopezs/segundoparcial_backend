const administraciondeproductos = require("../controllers/administraciondeproductos.controller.js");
module.exports = app => {
    const administraciondeproductos = require("../controllers/administraciondeproductos.controller.js");
    var router = require("express").Router();
    //rutas que utilizaremos
    router.post("/", administraciondeproductos.create);
    router.get("/", administraciondeproductos.findAll);
    router.get("/:id", administraciondeproductos.findOne);
    router.put("/actualizar/", administraciondeproductos.update);
    router.delete( "/borrar/:id",administraciondeproductos.delete);
    router.delete( "/",administraciondeproductos.deleteAll);
    router.get("/categoria_producto/:id_categoria",administraciondeproductos.findByCategoria);
    //registramos en la api
    app.use('/api/administraciondeproductos', router);
};