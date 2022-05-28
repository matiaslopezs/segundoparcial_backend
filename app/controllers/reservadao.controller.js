const db = require("../models");
const sequelize = db.sequelize; //importamos nuestro módulo de reserva
const Reservas = db.Reservas; //controller
const {QueryTypes} = require('sequelize');
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

        .then((datos) => {
            //ordenamientosegun hora_entrada segun id_mesa ordenada
            datos.sort((a,b)=>{
                const orden_mesa = a.id_mesa - b.id_mesa;
                const orden_entrada = a.hora_entrada - b.hora_entrada;
    
                return orden_mesa === 0 ? orden_entrada: orden_mesa;
            })
            res.send(datos);
        })

        .catch((err) => {
            res.status(500).send({
                message: err.message || "Ocurrio un error al obtener las reservas.",
            });
        });
};

//GET reservas por id restaurante
exports.findByRestaurant = (req, res) => {

    Reservas.findAll({ where: {id_restaurante: req.params.id_restaurante} })

        .then((data) => {
            res.send(data);
        })

        .catch((err) => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al filtrar las reservas por restaurante.",
            });
        });
};

//GET Available (retorna las mesas ocupadas)
exports.getMesasNotAvailable = (req, res) => {
    // var condition = { nombre: { [Op.iLike]: `%${nombreb}%` } } : null;
    let fecha_query = new Date(req.params.fecha)
    let inicio = (parseInt(req.params.hora_entrada)+1).toString()
    Reservas.findAll({
        where: {
            id_restaurante: req.params.id_restaurante,
            [Op.or]:[
                {hora_entrada: req.params.hora_entrada},
                {hora_salida:req.params.hora_salida}
            ],
            cantidad_lugares: { [Op.gte]: req.params.cantidad_lugares},
        },
        attributes: ['id_mesa','fecha']
    })
        .then(data => {
            respuesta=[]
            data.forEach(elem=>{
                // console.log("elemento: "+elem.getDataValue("id_mesa"))
                fecha_db_format = elem.fecha.getFullYear()+"-"+(elem.fecha.getMonth()+1)+"-"+elem.fecha.getDate()
                fecha_format =  fecha_query.getFullYear()+"-"+(fecha_query.getMonth()+1)+"-"+fecha_query.getDate()
                if (fecha_format === fecha_db_format){
                    respuesta.push(elem.getDataValue("id_mesa"));
                }
            })
            res.send(respuesta);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al obtener los restaurantes."
            });
        });
};

//GET reservas por restaurante y fecha de reserva
exports.getReservasRestaurantFecha = (req, res) => {
    const fecha_query = new Date(req.params.fecha);
    Reservas.findAll({
        where: {
            [Op.and]:[
            {id_restaurante: req.params.id_restaurante},
            {fecha: fecha_query}
            ]
        },
        order: [
            ["id_mesa", "ASC"],
        ],
    })

    .then((datos) => {
        //ordenamiento segun hora_entrada segun id_mesa ordenada
        datos.sort((a,b)=>{
            const orden_mesa = a.id_mesa - b.id_mesa;
            const orden_entrada = a.hora_entrada - b.hora_entrada;

            return orden_mesa === 0 ? orden_entrada: orden_mesa;
        })
        res.send(datos);
    })

    .catch((err) => {
        res.status(500).send({
            message: err.message || "Ocurrió un error al filtrar las reservas por restaurante.",
        });
    });
}

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
            reserva.id_cliente = req.body.id_cliente;
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