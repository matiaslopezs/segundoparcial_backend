
const db = require("../models");
const Cliente = db.Clientes;
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

    const cliente = {

        nombre: req.body.nombre,

        apellido: req.body.apellido,

        cedula: req.body.cedula

    };

// Guardamos a la base de datos

    Cliente.create(cliente)

        .then(data => {

            res.send(data);

        })

        .catch(err => {

            res.status(500).send({

                message:

                    err.message || "Ha ocurrido un error al crear un cliente."

            });

        });

};

exports.findOne = (req, res) => {

    const id = req.params.id;

    Cliente.findByPk(id)

        .then(data => {

            res.send(data);

        })

        .catch(err => {

            res.status(500).send({

                message: "Error al obtener cliente con id=" + id

            });

        });

};



exports.findAll = (req, res) => {

    const nombre = req.query.nombre;

    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    Cliente.findAll({ where: condition })

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
    Cliente.update(req.body, {
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
    Cliente.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El cliente fue eliminado existosamente!"
                });
            } else {
                res.send({
                    message: `No puede borrar el cliente con id=${id}. Tal vez el cliente no fue encontrada!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No pudo borrar el cliente con id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Cliente.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Los clientes fueron eliminados exitosamente!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido un error al eliminar los clientes."
            });
        });
};


//encuentra por condicion

exports.findAllCondition = (req, res) => {
    let condition = undefined; // escribir condicion
    Cliente.findAll({ where: {condition} })
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

