// Módulos
const express = require("express");
const app = express();
const methodOverride = require("method-override");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors")

// Middlewares

const logMiddleware = require("./src/middlewares/logMiddleware");

// Rutas

const mainRoutes = require("./src/routes/mainRoutes");
const productRoutes = require("./src/routes/productRoutes");
const cartRoutes = require("./src/routes/cartRoutes");
const userRoutes = require("./src/routes/userRoutes");

// APIs

const userRouter = require("./src/routes/api/user");
const productRouter = require("./src/routes/api/product");

// Cookies

app.use(cookieParser());

// Sesiones

app.use(
  session({
    secret: "Shhh, It's a secret",
    resave: false,
    saveUninitialized: false,
  })
  );
  
// Post

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Variables

const port = 3001;

// Servidor

app.listen(port, () => console.log(`[server] Corriendo en el puerto ${port}`));

// Configuracion HTTP

app.use(methodOverride("_method"));

// Configuracion de carpetas

app.use(express.static("public"));
app.set("views", "./src/views");

// Configuracion de motor de plantillas

app.set("view engine", "ejs");

// Middlewares

app.use(logMiddleware);

// Rutas

app.use("/", mainRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/users", userRoutes);

// Cors 

app.use(cors())

// Rutas de APIs

app.use(productRouter);
app.use(userRouter);

// Error 404

app.use((req, res, next) => {
  res.status(404).render("notFound");
});
