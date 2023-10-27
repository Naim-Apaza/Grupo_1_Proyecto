module.exports = (sequelize, DataTypes) => {
    const colms = {
        id_categoria: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING(20),
            allowNull: false
        }
    };
    const config = {
        tableName: 'categorias',
        timestamps: false
    }

    const Categoria = sequelize.define('Categoria', colms, config)

    /************************    RELACION DE MUCHOS A MUCHOS   ******************************/
    Categoria.associate = (modelo) => {
        Categoria.belongsToMany(modelo.Producto, {
            as: 'productos',
            through: 'productos_categorias',
            foreignKey: 'id_categoria',
            otherKey: 'id_producto',
            timestamps: false
        });
    };

    return Categoria;
}