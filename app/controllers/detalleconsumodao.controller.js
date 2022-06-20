const db = require("../models");
const sequelize = db.sequelize; //importamos nuestro módulo
const Detalles = db.Detalles; //controller
const {QueryTypes} = require('sequelize');
const Op = db.Sequelize.Op;

//POST
exports.create = (req, res) => { //creamos una nueva entidad
    // registra un nuevo detalle
    const detalle = {
        id_consumo: req.body.id_consumo,
        id_producto: req.body.id_producto,
        cantidad: req.body.cantidad,
    };
    // Guardamos a la base de datos
    Detalles.create(detalle)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido un error al crear el detalle del consumo."
            });
        });
};

//GET
exports.findOne = (req, res) => {
    const id = req.params.id;
    Detalles.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error al obtener el detalle de consumo con id=" + id
            });
        });
};

//GET ALL
exports.findAll = (req, res) => {
    Detalles.findAll()
        .then((datos) => {
            res.send(datos);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Ocurrio un error al obtener los detalles de consumos.",
            });
        });
};

//GET consumos por id consumo
exports.findByConsumo = (req, res) => {

    Detalles.findAll({ where: {id_consumo: req.params.id_consumo} })

        .then((datos) => {
            console.log("GET detalles de consumos por id consumo");
            res.send(datos);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al filtrar los detalles de consumos por id del consumo.",
            });
        });
};

//PUT (update)
exports.update = async(req, res) => {
    if (!req.body.id) {
        res.status(400).send({
            message: "Debe especificar el id del detalle de consumo!"
        });
    }
    const id = req.body.id;
    try {
        const detalle = await Detalles.findByPk(id);
        if(!detalle){
            res.status(404).send({
                message: "No se encuentra el detalle de consumo a modificar"
            });
        }else{
            detalle.id_producto = req.body.id_producto;
            detalle.cantidad = req.body.cantidad;
            
            const data = await detalle.save();
            res.send(data);
        }
    }catch (error){
        res.status(500).send({
            message: "No se pudo actualizar el detalle de consumo. "+error.message
        });
    }
}

//DELETE
exports.delete = async(req, res) => {
    const {id} = req.params;
    try {
        const detalle = await Detalles.findByPk(id);
        if (!detalle){
            res.status(404).send({
                message: "No se encuentra el detalle de consumo a eliminar"
            });
        }else{
            const data = await detalle.destroy();
            res.send(data);
        }
    }catch (error){
        res.status(500).send({
            message: "No se pudo eliminar el detalle de consumo. "+error.message
        })
    }
}