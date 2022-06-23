module.exports = (app) => {
  const cat_producto = require("../controllers/categoria_productodao.controller.js");
  var router = require("express").Router();
  router.post("/", cat_producto.create);
  router.get("/", cat_producto.findAll);
  router.get("/:id", cat_producto.findOne);
  router.delete("/borrar/:id", cat_producto.destroy);
  router.put("/actualizar/", cat_producto.update);
  app.use("/api/categoria_producto", router);
};
