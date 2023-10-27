module.exports = (sequelize, DataTypes) => {
    const colms = {
        id_usuario: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING(40),
            allowNull: false
        },
        apellido: {
            type: DataTypes.STRING(40),
            allowNull: false
        },
        correo: {
            type: DataTypes.STRING(40),
            allowNull: false
        },
        clave: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        /************************** CLAVE FORANEA *****************************/
        id_rol: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    };
    const config = {
        tableName: 'usuarios',
        timestamps: false
    };

    const Usuario = sequelize.define('Usuario', colms, config)

    Usuario.associate = (modelo) => {
    /************************    RELACION DE UNO A UNO   ******************************/
        Usuario.belongsTo(modelo.Rol, {
            as: 'roles',
            foreignKey: 'id_rol'
        });
        
    /************************    RELACION DE MUCHOS A MUCHOS   ******************************/ 
        Usuario.belongsToMany(modelo.Producto, {
            as: 'productos',
            through: 'carrito',
            foreignKey: 'id_usuario',
            otherKey: 'id_producto',
            timestamps: false
        })
    }

    return Usuario;
}