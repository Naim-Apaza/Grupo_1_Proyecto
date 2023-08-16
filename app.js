// Módulos

const express = require("express");
const app = express();
const mainRoutes = require("./routes/mainRoutes");

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
