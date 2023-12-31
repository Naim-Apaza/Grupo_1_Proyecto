module.exports = (sequelize, DataTypes) => {
  const colms = {
    id_rol: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  };
  const config = {
    tableName: "roles",
    timestamps: false,
  };

  const Rol = sequelize.define("Rol", colms, config);

  Rol.associate = (modelo) => {
    /************************    RELACION DE UNO A UNO   ******************************/
    Rol.hasOne(modelo.Usuario, {
      as: "usuarios",
      foreignKey: "id_rol",
      timestamps: false,
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Rol;
};
