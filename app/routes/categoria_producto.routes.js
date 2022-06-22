const administraciondeproductos = require("../controllers/administraciondeproductos.controller.js");
module.exports = (app) => {
  const cat_producto = require("../controllers/categoria_productodao.controller.js");
  var router = require("express").Router();
  router.post("/", cat_producto.create);
  router.get("/", cat_producto.findAll);
  router.get("/:id", cat_producto.findOne);
  router.delete("/:id", cat_producto.destroy);
  router.put("/", cat_producto.update);
  router.get("/administraciondeproductos/:id_producto",cat_producto.findByProducto);
  app.use("/api/categoria_producto", router);
};
