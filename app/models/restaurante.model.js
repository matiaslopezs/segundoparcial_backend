const { Mesas } = require("./mesa.model");
("use strict");
module.exports = (sequelize, Sequelize) => {
  const Restaurante = sequelize.define(
    "Restaurante",
    {
      //sequeliza define que así se llamara la entidad en la DB y sus atributos
      nombre: {
        type: Sequelize.STRING,
      },
      direccion: {
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
          // create one to many relationship
          //La Restaurante.hasMany(Mesas)asociación significa que existe una relación
          // de uno a muchos entre Restaurante y Mesas, con la clave externa definida en el modelo de destino ( Mesas).
          Restaurante.hasMany(models.Mesas);
        },
      },
    }
  );
  return Restaurante;
};
