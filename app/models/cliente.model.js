module.exports = (sequelize, Sequelize) => {

    const Cliente = sequelize.define("Cliente", {

        nombre: {

            type: Sequelize.STRING

        },

        apellido: {

            type: Sequelize.STRING

        },

        cedula: {
            type : Sequelize.BIGINT,
            unique : true
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
                Cliente.hasMany(models.Reservas);
            },
        },
    });

    return Cliente;

};