// Módulos

const express = require("express");
const app = express();
const mainRoutes = require("./routes/mainRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");

// Variables

const port = 3001;

// Servidor

app.listen(port, () => console.log(`Servidor corriendo en el puerto ${port}`));

// Configuracion de carpetas

app.use(express.static("public"));
app.set("views", "./views");

// Configuracion de motor de plantillas

app.set("view engine", "ejs");

// Ruteo

app.use("/", mainRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
