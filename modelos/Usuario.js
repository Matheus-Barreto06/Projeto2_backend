const { DataTypes } = require('sequelize');
const sequelize = require('../config/bancoDeDados');

const Usuario = sequelize.define('Usuario', {
  nomeUsuario: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false // Em produção, armazene a senha de forma hash
  },
  papel: {
    type: DataTypes.ENUM('usuario', 'admin'),
    defaultValue: 'usuario'
  }
});

module.exports = Usuario;