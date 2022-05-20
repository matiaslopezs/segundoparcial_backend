const db = require("../models"); //importamos nuestro módulo de restaurante
const Restaurantes = db.Restaurantes; //controller
const Op = db.Sequelize.Op;

//POST
exports.create = (req, res) => { //creamos una nueva entidad
    // Validate request (dejo como ejemplo por si necesitemos validar un campo)
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
                message:
                    err.message || "Error al obtener restaurante con id=" + id
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

//PUT (update)
exports.update = async(req, res) => {
    if (!req.body.id) {
       res.status(400).send({
           message: "Debe especificar el id del restaurante!"
       });
    }
    const id = req.body.id;
    try {
        const restaurante = await Restaurantes.findByPk(id);
        if(!restaurante){
            res.status(404).send({
                message: "No se encuentra el restaurante a modificar"
            });
        }else{
            restaurante.nombre = req.body.nombre;
            restaurante.direccion = req.body.direccion;
            const data = await restaurante.save();
            res.send(data);
        }
    }catch (error){
        res.status(500).send({
            message: "No se pudo actualizar el restaurante. RAZÓN: "+error.message
        });
    }
}

//DELETE
exports.delete = async(req, res) => {
    const {id} = req.params;
    try {
        const restaurante = await Restaurantes.findByPk(id);
        if (!restaurante){
            res.status(404).send({
                message: "No se encuentra el restaurante a eliminar"
            });
        }else{
            const data = await restaurante.destroy();
            res.send(data);
        }
    }catch (error){
        res.status(500).send({
            message: "No se pudo eliminar el restaurante. RAZÓN: "+error.message
        })
    }
}