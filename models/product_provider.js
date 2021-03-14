module.exports = (sequelize, DataTypes) =>{
  const product_providers = sequelize.define('product_providers', {
    product_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: {
          tableName: 'Product',
        },
        key: 'id'
      }
    },
    provider_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: {
          tableName: 'Provider',
        },
        key: 'id'
      }
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    available: {
      type: DataTypes.INTEGER(1),
      defaultValue:0  
    }
  }, {
    sequelize,
    tableName: 'product_providers',
    timestamps:false
  });

  product_providers.associate = function(models){
    product_providers.belongsTo(models.product, {foreignKey: "product_id"});
    product_providers.belongsTo(models.provider, {foreignKey: "provider_id"});
  }
  return product_providers
};
