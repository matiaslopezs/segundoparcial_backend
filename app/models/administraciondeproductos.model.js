const { Deferrable } = require("sequelize");

const {AdministraciondeProductos } = require("./index.js");
module.exports =  (sequelize, Sequelize) => {


    const db = require("../models"); //importamos nuestros modelos
    const AdministraciondeProductos = sequelize.define("AdministraciondeProductos", { //sequeliza define que así se llamara la entidad en la DB y sus atributos
            id: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                autoIncrement: true
            },
            nombre_del_producto: {
                type: Sequelize.STRING
            },
            precio_de_venta: {
                type: Sequelize.BIGINT
            },
            id_categoria: {
                type: Sequelize.BIGINT,
                allowNull: false,

                references: {
                    // Esta es una referencia a otro modelo
                    model: "Categoria_productos",
                    // Este es el nombre de la columna del modelo al que se hace referencia
                    key: 'id',
                    // Con PostgreSQL, opcionalmente es posible declarar cuándo verificar la restricción de clave externa, pasando el tipo Deferrable.
                    deferrable: Deferrable.INITIALLY_IMMEDIATE,
                    // Opciones:
                    // - `Deferrable.INITIALLY_IMMEDIATE` - Verifica inmediatamente las restricciones de clave externa
                    // - `Deferrable.INITIALLY_DEFERRED` - Diferir todas las comprobaciones de restricciones de clave externa hasta el final de una transacción
                    // - `Deferrable.NOT` - No diferir los cheques en absoluto (predeterminado) - Esto no le permitirá cambiar dinámicamente la regla en una transacción
                }

            }


        },
        {
            classMethods: {
                associate: function (models) {
                    // un producto puede perternecer a una categoria  1:1
                    AdministraciondeProductos.belongsTo(models.Categoria_productos);
                },
            },
        }
    );


    return AdministraciondeProductos;
};