// Módulos
const fs = require("fs")
const express = require("express");
const app = express();
const methodOverride = require("method-override")

// Rutas
const mainRoutes = require("./routes/mainRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");


// Variables

const port = 3001;

// Servidor

app.listen(port, () => console.log(`Servidor corriendo en el puerto ${port}`));

// Configuracion HTTP

app.use(methodOverride('_method'))

// Configuracion de carpetas

app.use(express.static("public"));
app.set("views", "./views");

// Configuracion de motor de plantillas

app.set("view engine", "ejs");

// Ruteo

app.use("/", mainRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);



//Error 404

app.use((req,res,next)=> {
   res.status(404).render("error404")
})
