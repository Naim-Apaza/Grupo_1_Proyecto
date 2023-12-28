module.exports = (sequelize, DataTypes) => {
  const cols = {
    id_categoria: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  };
  const config = {
    tableName: "categorias",
    timestamps: false,
    deleteAt: false,
  };

  const Categoria = sequelize.define("Categoria", cols, config);  
  /************************    RELACION DE MUCHOS A MUCHOS   ******************************/
  Categoria.associate = (modelo) => {
    Categoria.belongsToMany(modelo.Producto, {
      as: "productos",
      through: "productos_categorias",
      foreignKey: "id_categoria",
      otherKey: "id_producto",
      timestamps: false,
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Categoria;
};
