const db = require("../models");
const Categoria_productos = db.Categoria_productos;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

  // crea un producto
  const producto = {
    nombre: req.body.nombre,
  };

  // Guardamos a la base de datos
  Categoria_productos.create(producto)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ha ocurrido un error al crear un producto.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Categoria_productos.findByPk(id)

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

  Categoria_productos.findAll({ where: condition })

    .then((data) => {
      res.send(data);
    })

    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ocurrio un error al obtener los productos.",
      });
    });
};

//DELETE producto por id
exports.destroy = (req, res) => {
  var id_producto = req.params.id;

  Categoria_productos.destroy({
    where: {
      id: id_producto,
    },
    force: true,
  })

    .then((data) => {
      if (data == 1) {
        console.log("DELETE producto por id ");
        res.send("El producto se eliminó con exito " + data);
      } else {
        res.send("El producto a eliminar no existe " + data);
      }
    })

    .catch((err) => {
      res.status(500).send({
        message: "Ocurrio un error al eliminar el producto." || err.message,
      });
    });
};

//PUT categoria producto por id
exports.update = (req, res) => {
  console.log(!req.body.id);
  if (!req.body.id) {
    res.send({
      message: "Debe especificar el id de la categoria producto",
    });
  } else {
    id_cat_producto = req.body.id;
    nombre_cat_producto = req.body.nombre;

    Categoria_productos.update(
      {
        nombre: nombre_cat_producto,
      },
      {
        where: {
          id: id_cat_producto,
        },
      }
    )
      .then((data) => {
        console.log("UPDATE de una categoria producto por id");
        if (data == 1) {
          res.send("La categoria producto se actualizó con exito " + data);
        } else {
          res.send("La categoria porducto a actualizar no existe " + data);
        }
      })

      .catch((err) => {
        res.status(500).send({
          message: err.message || "Ocurrio un error al actualizar la categoria producto.",
        });
      });
  }
};