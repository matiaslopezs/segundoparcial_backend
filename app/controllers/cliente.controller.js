
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

//GET cliente por cedula
exports.findByCi = (req, res) => {

    Cliente.findAll({ where: {cedula: req.params.ci} })

        .then((data) => {
            res.send(data);
        })

        .catch((err) => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al obtener el cliente por cédula.",
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

//PUT (update)
exports.update = async(req, res) => {
    if (!req.body.id) {
        res.status(400).send({
            message: "Debe especificar el id del cliente!"
        });
    }
    const id = req.body.id;
    try {
        const cliente = await Cliente.findByPk(id);
        if(!cliente){
            res.status(404).send({
                message: "No se encuentra el cliente a modificar"
            });
        }else{
            cliente.nombre = req.body.nombre;
            cliente.apellido = req.body.apellido;
            cliente.cedula= req.body.cedula;
            const data = await cliente.save();
            res.send(data);
        }
    }catch (error){
        res.status(500).send({
            message: "No se pudo actualizar al cliente. "+error.message
        });
    }
}

exports.delete = (req, res) => {
    const id = req.params.id;
    Cliente.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "El cliente fue eliminado exitosamente!"
                });
            } else {
                res.send({
                    message: `No puede borrar el cliente con id=${id}. Tal vez el cliente no fue encontrado!`
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

