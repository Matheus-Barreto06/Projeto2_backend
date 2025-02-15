const { DataTypes } = require('sequelize');
const sequelize = require('../config/bancoDeDados');

const TipoIngresso = sequelize.define('TipoIngresso', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  quantidadeDisponivel: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = TipoIngresso;
