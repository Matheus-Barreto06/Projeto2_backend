const { DataTypes } = require('sequelize');
const sequelize = require('../config/bancoDeDados');
const Usuario = require('./Usuario');
const TipoIngresso = require('./TipoIngresso');

const Compra = sequelize.define('Compra', {
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  
});


Usuario.hasMany(Compra);
Compra.belongsTo(Usuario);

TipoIngresso.hasMany(Compra);
Compra.belongsTo(TipoIngresso);

module.exports = Compra;
