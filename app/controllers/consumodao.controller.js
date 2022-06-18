const db = require("../models");
const sequelize = db.sequelize; //importamos nuestro módulo de reserva
const Consumos = db.Consumos; //controller
const {QueryTypes} = require('sequelize');
const Op = db.Sequelize.Op;

//POST
exports.create = (req, res) => { //creamos una nueva entidad
    // registra un nuevo consumo
    const consumo = {
        id_mesa: req.body.id_mesa,
        id_cliente: req.body.id_cliente,
        estado: "abierto", //el estado debe ser siempre abierto al crear
        total: 0, //el total debe ser cero al crear
        fecha_creacion: Date.now() //fecha actual
    };
    // Guardamos a la base de datos
    Consumos.create(consumo)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido un error al crear el consumo del cliente."
            });
        });
};

//GET
exports.findOne = (req, res) => {
    const id = req.params.id;
    Consumos.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error al obtener el consumo con id=" + id
            });
        });
};

//GET ALL
exports.findAll = (req, res) => {
    Consumos.findAll()
        .then((datos) => {
            res.send(datos);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Ocurrio un error al obtener los consumos.",
            });
        });
};

//GET consumos por id cliente
exports.findByCliente = (req, res) => {

    Consumos.findAll({ where: {id_cliente: req.params.id_cliente} })

        .then((datos) => {
            console.log("GET consumos por id cliente");
            res.send(datos);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al filtrar los consumos por id del cliente.",
            });
        });
};

//PUT (update)
exports.update = async(req, res) => {
    if (!req.body.id) {
        res.status(400).send({
            message: "Debe especificar el id del consumo!"
        });
    }
    const id = req.body.id;
    try {
        const consumo = await Consumos.findByPk(id);
        if(!consumo){
            res.status(404).send({
                message: "No se encuentra el consumo a modificar"
            });
        }else{
            consumo.id_mesa = req.body.id_mesa;
            consumo.id_cliente = req.body.id_cliente;
            consumo.estado = req.body.estado;
            consumo.total = req.body.total;
            consumo.fecha_cierre = Date.now();

            const data = await consumo.save();
            res.send(data);
        }
    }catch (error){
        res.status(500).send({
            message: "No se pudo actualizar el consumo. "+error.message
        });
    }
}

//DELETE
exports.delete = async(req, res) => {
    const {id} = req.params;
    try {
        const consumo = await Consumos.findByPk(id);
        if (!consumo){
            res.status(404).send({
                message: "No se encuentra el consumo a eliminar"
            });
        }else{
            const data = await consumo.destroy();
            res.send(data);
        }
    }catch (error){
        res.status(500).send({
            message: "No se pudo eliminar el consumo. "+error.message
        })
    }
}