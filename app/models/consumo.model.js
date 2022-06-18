module.exports = (sequelize, Sequelize) => {
    const db = require("../models"); //importamos nuestros modelos
    const Consumo = sequelize.define("Consumo", { //sequeliza define que así se llamara la entidad en la DB y sus atributos
            id_mesa: {
                type: Sequelize.BIGINT,
                references: {
                    model: "Mesas",
                    key: "id"
                }
            },
            id_cliente: {
                type: Sequelize.BIGINT,
                references: {
                    model: "Clientes",
                    key: "id"
                }
            },
            estado: {
                type: Sequelize.STRING,
            },
            total: {
                type: Sequelize.BIGINT
            },
            fecha_creacion: {
                type: Sequelize.DATE
            },
            fecha_cierre: {
                type: Sequelize.DATE
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
                    // Una mesa puede tener varios consumos
                    // Un cliente puede tener varios consumos
                    Consumo.belongsTo(models.Mesas);
                    Consumo.belongsTo(models.Clientes);
                    Consumo.hasMany(models.Detalles);
                },
            },
        });
    return Consumo;
};