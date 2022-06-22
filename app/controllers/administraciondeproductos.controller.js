
const db = require("../models");
const AdministraciondeProductos = db.AdministraciondeProductos;
const Op = db.Sequelize.Op;
const Categoria = db.Categoria_productos;

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

    const producto = {



        nombre_del_producto: req.body.nombre_del_producto,

        precio_de_venta: req.body.precio_de_venta,

        id_categoria: req.body.id_categoria

    };




    AdministraciondeProductos.create(producto)

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

exports.update = async(req, res) => {
    if (!req.body.id_categoria) {
        res.status(400).send({
            message: "Debe especificar el id de la categoria!"
        });
    }
    const id = req.body.id;
    try {
        const producto = await AdministraciondeProductos.findByPk(id);
        if(!producto){
            res.status(404).send({
                message: "No se encuentra el consumo a modificar"
            });
        }else{
            producto.nombre_del_producto = req.body.nombre_del_producto;
            producto.precio_de_venta = req.body.precio_de_venta;
            producto.id_categoria = req.body.id_categoria;

            const data = await producto.save();
            res.send(data);
        }
    }catch (error){
        res.status(500).send({
            message: "No se pudo actualizar el producto. "+error.message
        });
    }
}


//GET categoria por id_categoria
exports.findByCategoria = (req, res) => {

    AdministraciondeProductos.findAll({ where: {id_categoria: req.params.id_categoria} })

        .then((datos) => {
            console.log("GET categoria por id producto");
            res.send(datos);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al filtrar los consumos por id del cliente.",
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

