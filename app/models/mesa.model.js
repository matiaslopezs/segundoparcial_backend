const Restaurantes = require("./restaurante.model.js");
const { Model, DataTypes, Deferrable } = require("sequelize");
const { Mesas } = require("./index.js");

module.exports = (sequelize, Sequelize) => {
  const Mesa = sequelize.define(
    "Mesa",
    {
      nombre: {
        type: Sequelize.STRING,
        unique: true,
      },

      coordenada_x: {
        type: Sequelize.BIGINT,
      },

      coordenada_y: {
        type: Sequelize.BIGINT,
      },

      planta: {
        type: Sequelize.BIGINT,
        defaultValue: 1,
        allowNull: true,
      },

      capacidad: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },

      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },

      // It is possible to create foreign keys:
      id_restaurante: {
        type: Sequelize.BIGINT,

        references: {
          // Esta es una referencia a otro modelo
          model: "Restaurantes",
          // Este es el nombre de la columna del modelo al que se hace referencia
          key: "id",
          // Con PostgreSQL, opcionalmente es posible declarar cuándo verificar la restricción de clave externa, pasando el tipo Deferrable.
          deferrable: Deferrable.INITIALLY_IMMEDIATE,
          // Opciones:
          // - `Deferrable.INITIALLY_IMMEDIATE` - Verifica inmediatamente las restricciones de clave externa
          // - `Deferrable.INITIALLY_DEFERRED` - Diferir todas las comprobaciones de restricciones de clave externa hasta el final de una transacción
          // - `Deferrable.NOT` - No diferir los cheques en absoluto (predeterminado) - Esto no le permitirá cambiar dinámicamente la regla en una transacción
        },
      },
    },
    {
      classMethods: {
        associate: function (models) {
          // La Mesa.belongsTo(Restaurantes)asociación significa que existe una relación uno a uno entre Mesa y Restaurantes,
          // con la clave externa definida en el modelo fuente ( Mesa).
          Mesa.belongsTo(models.Restaurantes);
        },
      },
    }
  );
  return Mesa;
};

/**
   * Restaurante.hasMany("Mesa", {
        foreignKey: "id_restaurante",
        sourceKey: "id"
    })

    Mesa.belongsTo("Restaurante", {
        foreignKey: "id_restaurante",
        targetId: "id"
    })
   */
