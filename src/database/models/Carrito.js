module.exports = (sequelize, DataTypes) => {
    const colms = {
        id_carrito: {
            primaryKey: true,
            //SAQUE EL AUTOINCREMENT PORQUE TIRABA ERROR SOBRE QUE DEBE HABER UN SOLO AUTOINCREMENT EN TABLA
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cantidad: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        total: {
            type: DataTypes.DECIMAL(7, 2).UNSIGNED,
            defaultValue: 0.00
        },
        // ******************************** CLAVE FORANEA ********************************
        id_usuario: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_producto: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    };

    const config = {
        tableName: 'carrito',
        timestamps: false
    };
    const Carrito = sequelize.define("Carrito", colms, config);

    return Carrito;
}
