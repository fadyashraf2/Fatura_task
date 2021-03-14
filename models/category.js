module.exports =  (sequelize, DataTypes)=> {
  const Category = sequelize.define(
    "category",
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
      parent_id: {
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
      timestamps: false,
    }
  );

  Category.associate = function (models) {
    Category.belongsTo(Category, {
      foreignKey: "parent_id",
      as: "parent_category"
    });
  };
  return Category;
};
