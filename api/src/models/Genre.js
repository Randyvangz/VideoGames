const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  //Define model
  sequelize.define('genre', {
      //ID it's automatically generated
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
    });
};