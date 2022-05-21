const db = require("../models"); //importamos nuestro módulo de reserva
const Reservas = db.Reservas; //controller
const Op = db.Sequelize.Op;

//POST
exports.create = (req, res) => { //creamos una nueva entidad
    // registra una nueva reserva
    const reserva = {
        id_restaurante: req.body.id_restaurante,
        id_mesa: req.body.id_mesa,
        fecha: req.body.fecha,
        hora_entrada: req.body.hora_entrada,
        hora_salida: req.body.hora_salida,
        id_cliente: req.body.id_cliente,
        cantidad_lugares: req.body.cantidad_lugares
    };
    // Guardamos a la base de datos
    Reservas.create(reserva)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido un error al registrar la reserva."
            });
        });
};

//GET
exports.findOne = (req, res) => {
    const id = req.params.id;
    Reservas.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error al obtener la reserva con id=" + id
            });
        });
};

//GET ALL
exports.findAll = (req, res) => {
    Reservas.findAll()

        .then((data) => {
            res.send(data);
        })

        .catch((err) => {
            res.status(500).send({
                message: err.message || "Ocurrio un error al obtener las reservas.",
            });
        });
};

//PUT (update)
exports.update = async(req, res) => {
    if (!req.body.id) {
        res.status(400).send({
            message: "Debe especificar el id de la reserva!"
        });
    }
    const id = req.body.id;
    try {
        const reserva = await Reservas.findByPk(id);
        if(!reserva){
            res.status(404).send({
                message: "No se encuentra la reserva a modificar"
            });
        }else{
            reserva.id_restaurante = req.body.id_restaurante;
            reserva.id_mesa = req.body.id_mesa;
            reserva.fecha= req.body.fecha;
            reserva.hora_entrada= req.body.hora_entrada;
            reserva.hora_salida= req.body.hora_salida;
            // reserva.id_cliente = req.body.id_cliente;
            reserva.cantidad_lugares= req.body.cantidad_lugares;
            const data = await reserva.save();
            res.send(data);
        }
    }catch (error){
        res.status(500).send({
            message: "No se pudo actualizar la reserva. "+error.message
        });
    }
}

//DELETE
exports.delete = async(req, res) => {
    const {id} = req.params;
    try {
        const reserva = await Reservas.findByPk(id);
        if (!reserva){
            res.status(404).send({
                message: "No se encuentra la reserva a eliminar"
            });
        }else{
            const data = await reserva.destroy();
            res.send(data);
        }
    }catch (error){
        res.status(500).send({
            message: "No se pudo eliminar la reserva. "+error.message
        })
    }
}