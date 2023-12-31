module.exports = (sequelize, DataTypes) => {
  const colms = {
    id_usuario: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    correo: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: true,
    },
    clave: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    img_usuario: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    /************************** CLAVE FORANEA *****************************/
    id_rol: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  };
  const config = {
    tableName: "usuarios",
    timestamps: false,
  };

  const Usuario = sequelize.define("Usuario", colms, config);

  Usuario.associate = (modelo) => {
    /************************    RELACION DE UNO A UNO   ******************************/
    Usuario.belongsTo(modelo.Rol, {
      as: "roles",
      foreignKey: "id_rol",
      timestamps: false,
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    });
    /************************   RELACION MUCHOS A MUCHOS   ***************************/
    Usuario.hasMany(modelo.Carrito, {
      as: "carritos",
      foreignKey: "id_usuario",
      timestamps: false,
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    })
  };

  return Usuario;
};
