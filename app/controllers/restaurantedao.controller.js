const db = require("../models"); //importamos nuestro módulo de restaurante
const Restaurantes = db.Restaurantes; //controller
const Op = db.Sequelize.Op;

//POST
exports.create = (req, res) => { //creamos una nueva entidad
    // Validate request (dejo como ejemplo por si necesitemos validar un campo
//    if (!req.body.factura) {
//        res.status(400).send({
//            message: "Debe enviar numero de factura!"
//        });
//        return;
//    }
    // registra un nuevo restaurante
    const restaurante = {
        nombre: req.body.nombre,
        direccion: req.body.direccion
    };
    // Guardamos a la base de datos
    Restaurantes.create(restaurante)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido un error al registrar el restaurante."
            });
        });
};

//GET
exports.findOne = (req, res) => {
    const id = req.params.id;
    Restaurantes.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message: "Error al obtener restaurante con id=" + id
        });
    });
};

//GET por nombre
exports.findAll = (req, res) => {
    const nombreb = req.query.nombre; //query.nombre es lo que aparece en el query (URL)
    var condition = nombreb ? { nombre: { [Op.iLike]: `%${nombreb}%` } } : null; //este nombre se refiere al atributo
    Restaurantes.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al obtener los restaurantes."
            });
        });
};


exports.update = (req, res) => {
    const id = req.params.id;
    Restaurantes.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El restaurante fue actualizado exitosamente."
                });
            } else {
                res.send({
                    message: `No se puede actualizar restaurante con id=${id}. Tal vez el restaurante no ha sido encontrado o req.body estaba vacio!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error actualizando Restaurante con id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Restaurantes.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El restaurante fue eliminado existosamente!"
                });
            } else {
                res.send({
                    message: `No puede borrar restaurante con id=${id}. Tal vez el restaurante no fue encontrado!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No pudo borrar el restaurante con id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Restaurantes.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Los restaurantes fueron eliminados exitosamente!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido un error al eliminar los restaurantes."
            });
        });
};


//encuentra por condicion

exports.findAllCondition = (req, res) => {
    let condition = undefined; // escribir condicion
    Restaurantes.findAll({ where: {condition} })
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