const { Categoria_producto } = require("./index.js");
module.exports = (sequelize, Sequelize) => {
    const Categoria_producto = sequelize.define("Categoria_producto", {
            nombre: {
                type: Sequelize.STRING,
            },

            id: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
        },
        {
            classMethods: {
                associate: function (models) {
                    // un producto puede perternecer a una categoria  1:1
                    Categoria_producto.hasOne(models.AdministraciondeProductos);
                },
            },
        }


    );
      nombre: {
        type: Sequelize.STRING,
      },

      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
    },
        {
            classMethods: {
                associate: function (models) {
                    // un producto puede perternecer a una categoria  1:1
                   Categoria_producto.hasOne(models.AdministraciondeProductos);
                },
            },
        }


        );
    return Categoria_producto;
  };
  