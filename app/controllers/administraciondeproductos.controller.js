
const db = require("../models");
const AdministraciondeProductos = db.AdministraciondeProductos;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

// Validate request

  /*  if (!req.body.nombre) {

        res.status(400).send({

            message: "Debe enviar numero el nombre!"

        });

        return;

    }
*/

// crea un cliente

    const administracion_de_productos = {

        nombre_del_producto: req.body.nombre_del_producto,

        precio_de_venta: req.body.precio_de_venta,

        id_categoria: req.body.id_categoria

    };




    AdministraciondeProductos.create(administracion_de_productos)

        .then(data => {

            res.send(data);

        })

        .catch(err => {

            res.status(500).send({

                message:

                    err.message || "Ha ocurrido un error insertar los datos."

            });

        });

};

exports.findOne = (req, res) => {

    const id = req.params.id;

    AdministraciondeProductos.findByPk(id)

        .then(data => {

            res.send(data);

        })

        .catch(err => {

            res.status(500).send({

                message: "Error al obtener el dato con id=" + id

            });

        });

};



exports.findAll = (req, res) => {

    const nombre = req.query.nombre_del_producto;

    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    AdministraciondeProductos.findAll({ where: condition })

        .then(data => {

            res.send(data);

        })

        .catch(err => {

            res.status(500).send({

                message:

                    err.message || "Ocurrio un error al obtener el cliente."

            });

        });

};

exports.update = (req, res) => {
    const id = req.params.id;
    AdministraciondeProductos.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El cliente fue actualizada exitosamente."
                });
            } else {
                res.send({
                    message: `No se puede actualizar el cliente con id=${id}. Tal vez el cliente no ha sido encontrado o req.body estaba vacio!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error actualizando cliente con id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    AdministraciondeProductos.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Se ha eliminado exitosamente!"
                });
            } else {
                res.send({
                    message: `No puede borrar la fila con id=${id}. Tal vez ese dato no fue encontrado!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No pudo borrar  la fila con id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    AdministraciondeProductos.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Se ha eliminado exitosamente todos los datos de la tabla Administracion de Productos!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido un error al eliminar ."
            });
        });
};


//encuentra por condicion

exports.findAllCondition = (req, res) => {
    let condition = undefined; // escribir condicion
    AdministraciondeProductos.findAll({ where: {condition} })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido un error al obtener las ventas."
            });
        });
};

