const Categoria = require("../../database/models/Categoria.js");
const db = require("../../database/models/index.js")
const { Op, Sequelize } = require("sequelize");

module.exports = {
    list:async (req,res) => {
       //parseINT sirve para convertir una cadena de texto a un numero entero
        const limit = parseInt(req.query.limit) || 10;
        const offset = parseInt(req.query.offset) || 0;

        let productos = await db.Producto.findAll({
            attributes:['id_producto','nombre','descripcion'],
            include:[{association:'plataformas'}],
            limit,
            offset
         })
         let category = await  db.Categoria.findAll(
            {   
                attributes:[
                    'nombre',
                    [db.sequelize.fn('COUNT', db.sequelize.col('productos.productos_categorias.id_categoria')),'cantidad_productos']
                 ] ,
                include:[{
                    attributes:[],
                    association:'productos',
                    through:{attributes:[]}
                }],
                raw:true,
                nest:true,
                group:'nombre',  
            },
         ) 
            //Esto cuenta la cantidad
            let totalProductos = await db.Producto.count();

            let next = offset + limit < totalProductos ? `/Api/products?limit=${limit}&offset=${offset + limit}` : null;
            let previous = offset - limit >= 0 ? `/Api/products?limit=${limit}&offset=${offset - limit}` : null;

         return   res.status(200).json(
            {
            status:200,    
            count:totalProductos,
            data:{ 
                countByCategory:category,
                products:productos.map((product) => ({
                    id:product.id_producto,
                    name:product.nombre,
                    description:product.descripcion,
                    plataforma:product.plataformas.nombre,
                    detail:req.protocol + '://' + req.get('host') + '/Api/products' + `/${product.id_producto}`,
                }))
                },
            pagination:{
                next,
                previous
            },
             })
    },
    idProduct:async (req,res) => {
        const producto = await db.Producto.findByPk(req.params.id,{
            include:[{association:'plataformas'}],
        })
        let product;
        if(producto!=null){
            return   res.status(200).json(
                   {
                    status:200,
                    data:{
                        Producto:
                        product={
                            id:producto.id_producto,
                            name:producto.nombre,
                            description:producto.descripcion,
                            price:Number(producto.precio),
                            discount:producto.cant_desc,
                            platforms:producto.plataformas.nombre,
                            imagen_URL: `/images/products/${producto.img_prod}`,
                    }
                }})
           }
           res.json("Ups, No existe la pelicula")
    },
    createProduct:(req,res) => {
        db.Producto.create(req.body)
            .then(function(product){
             return  res.status(200).json({
                    nombre:product.nombre,
                    status:200
                })
            })
            .catch(function(e){
                console.log(e)
            })
    },
    deleteProduct:(req,res) => {
        db.Producto.destroy({
            where:{
                id_producto:req.params.id
            }})
            .then(function(response){
                return res.json(response)
            })
            .catch(function(e){
                console.log(e)
            })
    }
}