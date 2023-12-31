module.exports = (sequelize, DataTypes) => {
  const colms = {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.INTEGER.UNSIGNED,
      default: 1,
      allowNull: false,
    },
    /******************** CLAVES FORANEAS *******************/
    id_carrito: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_producto: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  };
  const config = {
    tableName: "carritos_productos",
    timestamps: false,
  };

  const CarritoProducto = sequelize.define("CarritoProducto", colms, config);

  return CarritoProducto;
};
