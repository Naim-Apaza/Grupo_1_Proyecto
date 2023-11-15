module.exports = (sequelize, DataTypes) => {
    const colms = {
        id_producto: {
            primaryKey: true,
            autoIncrement: true,
            //SAQUE EL AUTOINCREMENT PORQUE TIRABA ERROR SOBRE QUE DEBE HABER UN SOLO AUTOINCREMENT EN TABLA
            type: DataTypes.INTEGER,
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING(60),
            allowNull: false
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        precio: {
            type: DataTypes.DECIMAL(7, 2).UNSIGNED,
            defaultValue: 0.00
        },
        img_prod: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        cant_desc: {
            type: DataTypes.INTEGER(3).UNSIGNED,
            allowNull: true
        },
        // ******************************** CLAVE FORANEA  ********************************
        id_plataforma: {
            type: DataTypes.INTEGER,
            allowNull: false
        }

    };
    const config = {
        tableName: 'productos',
        timestamps: false
    };

    const Producto = sequelize.define('Producto', colms, config);

    Producto.associate = (modelo) => {
        /************************    RELACION DE MUCHOS A MUCHOS   ******************************/
            Producto.belongsToMany(modelo.Usuario, {
                as: 'usuarios',
                through: 'carrito',
                foreignKey: 'id_producto',
                otherKey: 'id_usuario',
                timestamps: false
            });

            Producto.belongsToMany(modelo.Categoria, {
                as: 'categorias',
                through: 'productos_categorias',
                foreignKey: 'id_producto',
                otherKey: 'id_categoria',
                timestamps: false
            });
            
    /************************    RELACION DE MUCHOS A UNO  ******************************/
            Producto.belongsTo(modelo.Plataforma, {
                as: 'plataformas',
                foreignKey: 'id_plataforma',
                timestamps: false
            })
    }
    return Producto;

}