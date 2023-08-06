const { log } = require('console');
const express=require('express');
const app=express();
const path=require('path');

const publicpath=path.resolve(__dirname, 'Registro.css');
app.use(express.static('Registro.css'));

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'Registro.html'))
});

app.listen(3000, ()=>{
    console.log("Corriendo")
})