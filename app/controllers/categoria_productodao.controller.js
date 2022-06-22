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
        message: "Error al obtener categoria con id=" + id,
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

//DELETE categoria producto por id
exports.destroy = async(req, res) => {
    const {id} = req.params;
    try {
        const cat_prod = await Categoria_productos.findByPk(id);
        if (!cat_prod){
            res.status(404).send({
                message: "No se encuentra la categoria a eliminar"
            });
        }else{
            const data = await cat_prod.destroy();
            res.send(data);
        }
    }catch (error){
        res.status(500).send({
            message: "No se pudo eliminar la categoria. "+error.message
        })
    }
};

//PUT categoria producto por id
exports.update = async(req, res) => {
    if (!req.body.id) {
      res.status(400).send({
          message: "Debe especificar el id de la categoria!"
      });
  }
  const id = req.body.id;
  try {
      const cat_prod = await Categoria_productos.findByPk(id);
      if(!cat_prod){
          res.status(404).send({
              message: "No se encuentra la categoria a modificar"
          });
      }else{
          cat_prod.nombre = req.body.nombre;

          const data = await cat_prod.save();
          res.send(data);
      }
  }catch (error){
      res.status(500).send({
          message: "No se pudo actualizar la categoria. "+error.message
      });
  }
};