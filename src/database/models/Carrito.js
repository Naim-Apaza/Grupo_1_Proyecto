module.exports = (sequelize, DataTypes) => {
  const colms = {
    id_carrito: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    // ******************************** CLAVE FORANEA ********************************
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  };

  const config = {
    tableName: "carritos",
    timestamps: false,
  };
  const Carrito = sequelize.define("Carrito", colms, config);

  Carrito.associate = (modelo) => {
    /************************    RELACION DE MUCHOS A MUCHOS   ******************************/
    Carrito.belongsToMany(modelo.Producto, {
      as: "productos",
      foreignKey: "id_carrito",
      otherKey: "id_producto",
      through: modelo.CarritoProducto,
      timestamps: false,
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    /************************    RELACION DE MUCHOS A UNO  ******************************/
    Carrito.belongsTo(modelo.Usuario, {
      as: "usuarios",
      foreignKey: "id_usuario",
      timestamps: false,
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Carrito;
};
