module.exports = (sequelize, Sequelize) => {
    const db = require("../models"); //importamos nuestros modelos
    const Detalle = sequelize.define("DetalleConsumo", { //sequeliza define que así se llamara la entidad en la DB y sus atributos
            id_consumo: {
                type: Sequelize.BIGINT,
                references: {
                    model: "Consumos",
                    key: "id"
                }
            },
            id_producto: {
                type: Sequelize.BIGINT,
                references: {
                    model: "AdministraciondeProductos",
                    key: "id"
                }
            },
            cantidad: {
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
                    Detalle.belongsTo(models.Consumos);
                    Detalle.belongsTo(models.AdministraciondeProductos);
                },
            },
        });
    return Detalle;
};