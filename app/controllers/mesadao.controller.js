const db = require("../models");
//const Ventas = db.Ventas;
const Mesas = db.Mesas;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  // Validate request
  /*if (!req.body.factura) {
    res.status(400).send({
      message: "Debe enviar numero de factura!",
    });

    return;
  }*/

  // crea una venta

  const mesa = {
    nombre: req.body.nombre,
    coordenada_x: req.body.coordenada_x,
    coordenada_y: req.body.coordenada_y,
    planta: req.body.planta,
    id_restaurante: req.body.id_restaurante
  };

  // Guardamos a la base de datos

  Mesas.create(mesa)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ha ocurrido un error al crear una venta.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Mesas.findByPk(id)

    .then((data) => {
      res.send(data);
    })

    .catch((err) => {
      res.status(500).send({
        message: "Error al obtener venta con id=" + id,
      });
    });
};

exports.findAll = (req, res) => {
  const nombre = req.query.nombre;

  var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

  Mesas.findAll({ where: condition })

    .then((data) => {
      res.send(data);
    })

    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ocurrio un error al obtener las ventas.",
      });
    });
};

exports.delete = (req, res) => {

    var id = req.params.id;

    Mesas.delete(id)

    .then((data) => {
        res.send("se eliminó con exito");
      })
  
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Ocurrio un error al obtener las ventas.",
        });
      });

};
