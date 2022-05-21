module.exports = (app) => {
  const mesa = require("../controllers/mesadao.controller.js");

  var router = require("express").Router();

  router.post("/", mesa.create);

  router.get("/", mesa.findAll);

  router.get("/:id", mesa.findOne);

  router.delete("/:id", mesa.destroy);

  router.put("/", mesa.update);

  app.use("/api/mesa", router);
};
