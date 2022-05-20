module.exports = (sequelize, Sequelize) => {
    const db = require("../models"); //importamos nuestros modelos
    const Reserva = sequelize.define("Reserva", { //sequeliza define que así se llamara la entidad en la DB y sus atributos
        id_restaurante: {
            type: Sequelize.BIGINT,
            // references: {
            //     model: Restaurante,
            //     key: 'id'
            // }
        },
        id_mesa: {
            type: Sequelize.BIGINT,
            // references: {
            //     model: Mesas,
            //     key: 'id'
            // }
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
            //     model: Cliente,
            //     key: 'id'
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
    });
    return Reserva;
};