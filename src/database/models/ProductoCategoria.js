module.exports = (sequelize, DataTypes) => {
  const colms = {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
    },
    /******************** CLAVES FORANEAS *******************/
    id_categoria: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_producto: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  };
  const config = {
    tableName: "productos_categorias",
    timestamps: false,
  };

  const ProductoCategoria = sequelize.define(
    "ProductoCategoria",
    colms,
    config
  );

  return ProductoCategoria;
};
