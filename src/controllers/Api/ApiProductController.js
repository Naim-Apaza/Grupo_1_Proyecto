const db = require("../../database/models/index.js");

module.exports = {
  list: async (req, res) => {
    try {
      //parseINT sirve para convertir una cadena de texto a un numero entero
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;

    const lastProduct = await db.Producto.findOne({
      order: [["id_producto", "DESC"]],
      limit: 1,
      include: [
        {
          model: db.Plataforma,
          as: "plataformas",
        },
        { 
          model: db.Categoria, 
          as: "categorias" 
        },
      ],
    });

    let productos = await db.Producto.findAll({
      attributes: ["id_producto", "nombre", "descripcion"],
      include: [{ association: "plataformas" }],
      limit,
      offset,
    });
    let category = await db.Categoria.findAll({
      attributes: [
        "nombre",
        [
          db.sequelize.fn(
            "COUNT",
            db.sequelize.col("productos.productos_categorias.id_categoria")
          ),
          "cantidad_productos",
        ],
      ],
      include: [
        {
          attributes: [],
          association: "productos",
          through: { attributes: [] },
        },
      ],
      raw: true,
      nest: true,
      group: "nombre",
    });

    let totalCategorias = await db.Categoria.count();

    //Esto cuenta la cantidad de productos
    let totalProductos = await db.Producto.count();

    let next =
      offset + limit < totalProductos
        ? `/api/products?limit=${limit}&offset=${offset + limit}`
        : null;
    let previous =
      offset - limit >= 0
        ? `/api/products?limit=${limit}&offset=${offset - limit}`
        : null;

    return res.status(200).json({
      meta: {
        status: 200,
        count: totalProductos,
        url: `${req.protocol}://${req.get("host")}${req.url}`,
      },
      data: {
        lastProduct: {
          id: lastProduct.id_producto,
          nombre: lastProduct.nombre,
          descripcion: lastProduct.descripcion,
          plataforma: lastProduct.plataformas.nombre,
          categorias: lastProduct.categorias.map((categoria) => (categoria.nombre)),
          imagen: `${req.protocol}://${req.get("host")}/images/products/${lastProduct.img_prod}`,
          detalle: req.protocol +
          "://" +
          req.get("host") +
          "/api/products" +
          `/${lastProduct.id_producto}`,
        },
        categorias: totalCategorias,
        countByCategory: category,
        products: productos.map((product) => ({
          id: product.id_producto,
          name: product.nombre,
          description: product.descripcion,
          plataforma: product.plataformas.nombre,
          detail:
            req.protocol +
            "://" +
            req.get("host") +
            "/api/products" +
            `/${product.id_producto}`,
        })),
      },
      pagination: {
        next,
        previous,
      },
    });
    } catch (error) {
      console.error(error);
      res.status(400).json(error)
    }
  },
  idProduct: async (req, res) => {
    const producto = await db.Producto.findByPk(req.params.id, {
      include: [{ association: "plataformas" }],
    });
    if (producto != null) {
      return res.status(200).json({
        meta: {
          status: 200,
          url: `${req.protocol}://${req.get("host")}${req.url}`,
        },
        data: {
          producto: {
            id: producto.id_producto,
            name: producto.nombre,
            description: producto.descripcion,
            price: Number(producto.precio),
            discount: producto.cant_desc,
            platforms: producto.plataformas.nombre,
            imagen_URL: `/images/products/${producto.img_prod}`,
          },
        },
      });
    }
    res.status(400).json("Ups, No existe la pelicula");
  },
  createProduct: (req, res) => {
    db.Producto.create(req.body)
      .then(function (product) {
        return res.status(200).json({
          nombre: product.nombre,
          status: 200,
        });
      })
      .catch(function (e) {
        console.log(e);
      });
  },
  deleteProduct: (req, res) => {
    db.Producto.destroy({
      where: {
        id_producto: req.params.id,
      },
    })
      .then(function (response) {
        return res.json(response);
      })
      .catch(function (e) {
        console.log(e);
      });
  },
};
