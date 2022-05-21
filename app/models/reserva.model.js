module.exports = (sequelize, Sequelize) => {
    const db = require("../models"); //importamos nuestros modelos
    const Reserva = sequelize.define("Reserva", { //sequeliza define que así se llamara la entidad en la DB y sus atributos
        id_restaurante: {
            type: Sequelize.BIGINT,
            references: {
                model: "Restaurantes",
                key: "id"
            }
        },
        id_mesa: {
            type: Sequelize.BIGINT,
            references: {
                model: "Mesas",
                key: "id"
            }
        },
        fecha: {
            type: Sequelize.DATE
        },
        hora_entrada: {
            type: Sequelize.BIGINT
        },
        hora_salida: {
            type: Sequelize.BIGINT
        },
        id_cliente: {
          type: Sequelize.BIGINT,
            // references: {
            //     model: "Clientes",
            //     key: "id"
            // }
        },
        cantidad_lugares: {
            type: Sequelize.BIGINT
        },
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        }
    },
    {
        classMethods: {
            associate: function (models) {
                // un cliente puede tener varias reservas.
                // un restaurante puede tener varias reservas.
                // una mesa puede tener varias reservas (en diferentes horarios).
                Reserva.belongsTo(models.Restaurantes);
                Reserva.belongsTo(models.Mesas);
                // Reserva.belongsTo(models.Clientes);
            },
        },
    });
    return Reserva;
};