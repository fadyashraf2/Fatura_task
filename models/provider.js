module.exports = (sequelize, DataTypes) =>{
  const Provider= sequelize.define('provider', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'providers',
    timestamps:false
  });
  return Provider
};
