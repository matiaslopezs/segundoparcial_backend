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

  // crea una mesa

  const mesa = {
    nombre: req.body.nombre,
    coordenada_x: req.body.coordenada_x,
    coordenada_y: req.body.coordenada_y,
    capacidad: req.body.capacidad,
    planta: req.body.planta,
    id_restaurante: req.body.id_restaurante,
  };

  // Guardamos a la base de datos

  Mesas.create(mesa)
    .then((data) => {
      console.log("Mesa creada");
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ha ocurrido un error al crear una mesa.",
      });
    });
};

//GET  una mesa por id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Mesas.findByPk(id)

    .then((data) => {
      console.log("GET mesa por id");
      if(data!=null){
        res.send(data);
      }else{
        res.send("El id de la mesa no existe")
      }
      
    })

    .catch((err) => {
      res.status(500).send({
        message: "Error al obtener mesa con id=" + id,
      });
    });
};

//GET mesas por aproximacion de nombres
exports.findAll = (req, res) => {
  const nombre = req.query.nombre;

  var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

  Mesas.findAll({ where: condition })

    .then((data) => {
      console.log("GET all mesas o por apoximacion de nombres");
      res.send(data);
    })

    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ocurrio un error al obtener las mesas.",
      });
    });
};

//GET mesas por id restaurante
exports.findByRestaurant = (req, res) => {

  Mesas.findAll({ where: {id_restaurante: req.params.id_restaurante} })

      .then((data) => {
        console.log("GET mesas por id de restaurante");
        res.send(data);
      })

      .catch((err) => {
        res.status(500).send({
          message: err.message || "Ocurrió un error al filtrar las mesas por restaurante.",
        });
      });
};

//DELETE mesa por id
exports.destroy = (req, res) => {
  var id_mesa = req.params.id;

  Mesas.destroy({
    where: {
      id: id_mesa,
    },
    force: true,
  })

    .then((data) => {
      if (data == 1) {
        console.log("DELETE mesa por id ");
        res.send("La mesa se eliminó con exito " + data);
      } else {
        res.send("La mesa a eliminar no existe " + data);
      }
    })

    .catch((err) => {
      res.status(500).send({
        message: "Ocurrio un error al eliminar la mesa." || err.message,
      });
    });
};

//PUT mesa por id
exports.update = (req, res) => {
  console.log(!req.body.id);
  if (!req.body.id) {
    res.send({
      message: "Debe especificar el id de la mesa",
    });
  } else {
    id_mesa = req.body.id;
    nombre_mesa = req.body.nombre;
    coordenadaX = req.body.coordenada_x;
    coordenadaY = req.body.coordenada_y;
    planta_mesa = req.body.planta;
    capacidad_mesa = req.body.capacidad;
    restauranteId = req.body.id_restaurante;

    Mesas.update(
      {
        coordenada_x: coordenadaX,
        coordenada_y: coordenadaY,
        planta: planta_mesa,
        capacidad: capacidad_mesa,
        nombre: nombre_mesa,
        id_restaurante: restauranteId,
      },
      {
        where: {
          id: id_mesa,
        },
      }
    )
      .then((data) => {
        console.log("UPDATE de una mesa por id");
        if (data == 1) {
          res.send("La mesa se actualizó con exito " + data);
        } else {
          res.send("La mesa a actualizar no existe " + data);
        }
      })

      .catch((err) => {
        res.status(500).send({
          message: err.message || "Ocurrio un error al actualizar la mesa.",
        });
      });
  }
};
