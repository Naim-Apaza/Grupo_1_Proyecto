module.exports = (sequelize, DataTypes) => {
  const colms = {
    id_plataforma: {
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
    tableName: "plataformas",
    timestamps: false,
  };

  const Plataforma = sequelize.define("Plataforma", colms, config);

  /************************    RELACION DE MUCHOS A UNO  ******************************/
  Plataforma.associate = (modelo) => {
    Plataforma.hasMany(modelo.Producto, {
      as: "productos",
      foreignKey: "id_plataforma",
      timestamps: false,
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Plataforma;
};
