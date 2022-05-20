module.exports = (sequelize, Sequelize) => {
    const Mesa = sequelize.define("Mesa", {
      nombre: {
        type: Sequelize.STRING,
      },
  
      coordenada_x: {
        type: Sequelize.BIGINT,
      },
  
      coordenada_y: {
        type: Sequelize.BIGINT,
      },
  
      planta: {
        type: Sequelize.BIGINT,
      },

      id_restaurante: {
        type: Sequelize.BIGINT,
      },

      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
    });
    return Mesa;
  };
  