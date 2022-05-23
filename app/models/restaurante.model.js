module.exports = (sequelize, Sequelize) => {
    const Restaurante = sequelize.define("Restaurante", { //sequeliza define que así se llamara la entidad en la DB y sus atributos
        nombre: {
            type: Sequelize.STRING
        },
        direccion: {
            type: Sequelize.STRING
        },
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        }
    });
    return Restaurante;
};