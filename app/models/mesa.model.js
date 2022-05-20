module.exports = (sequelize, Sequelize) => {
    const Mesa = sequelize.define("Mesa", {
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
        allowNull: true
      },

      capacidad: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
/*
      id_restaurante: {
        type: Sequelize.BIGINT,
      },*/

      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
    });
    return Mesa;
  };
  