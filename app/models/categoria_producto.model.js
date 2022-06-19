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
    });
    return Categoria_producto;
  };
  