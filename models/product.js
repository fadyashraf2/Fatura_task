module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "product",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      image_uri: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      category_id: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        references: {
          model: {
            tableName: "category",
          },
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "products",
      timestamps: false,
    }
  );

  Product.associate = function (models) {
    Product.belongsTo(models.category, {
      foreignKey: "category_id",
      as: "category",
      sourceKey: "id",
    });
    Product.hasMany(models.product_providers, {
      foreignKey: "product_id",
      as: "product_providers",
      sourceKey: "id",
    });
  };
  return Product;
};
