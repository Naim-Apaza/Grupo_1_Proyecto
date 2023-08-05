const express = require("express");
const app = express();

const PublicFolderPath = path.resolve(__dirname, './Images');
app.use(express.static(PublicFolderPath));

app.listen(4000, () =>
    console.log("servidorencendido 4000")
);
app.get("/", (req, res) => {
    res.send("DETALLE DEL PRODUCTO")


})

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/Home.html'));

})

