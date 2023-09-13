// Controlador de productos
const controller = {
  detail: (req, res) => {
    res.render("productDetail");
  },
  products: (req, res) => {
    res.render("products");
  },
  create: (req, res) => {
    res.render("productCreate");
  },
  store: (req, res) => {
    let imageFile = req.file;
     //console.log(imageFile)
    if(imageFile !== undefined){
      let product=req.body
      console.log(product);
      res.redirect("/products")
    }else{
        res.render("productCreate")
    }
  },
  edit: (req, res) => {
    let idProduct = req.params.id;
    let products = [
      {
        id: 1,
    name: "Far Cry 6",
    price: 2000,
    discount: 20,
    image: "farcry.png",
    description: "El juego se desarrolla en Yara, una isla caribeña ficticia que yace bajo una dictadura liderada por 'El Presidente' Antón Castillo quien está preparando a su hijo, Diego, para que continúe con su mandato. El jugador encarna al guerrillero Dani Rojas, quien busca derrocar a Castillo y a su régimen."
  },{
    id: 2,
    name: "GTA",
    price: 2000,
    discount: 20,
    image: "gta.png",
    description: "GTA es una saga con más de 15 títulos ambientados en diferentes escenarios. En todos los casos, un criminal realiza distintas misiones a cambio de dinero. Sus encargos suelen ser asesinar personas, secuestrar hombres adinerados, robar coches, asaltar bancos, etc."
  },{
    id: 3,
    name: "The Last Of Us Part I",
    price: 2000,
    discount: 20,
    image: "img.png",
    description: "The Last of Us es un videojuego de terror, acción y aventura desarrollado por la compañía estadounidense Naughty Dog y distribuido por Sony Computer Entertainment para la consola PlayStation 3 en 2013."
  }]
     
    let productsToEdit = products[idProduct-1]

    res.render("productEdit", {productsToEdit : productsToEdit})
  },
  actualizar:(req,res) => {
   let save_product= req.body
   console.log("ya se guardo")
   res.redirect("/products")
  },
  modify: (req, res) => {
    console.log(req.body);
  }
};

module.exports = controller;
