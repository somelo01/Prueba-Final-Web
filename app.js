const http = require('http');
const fs = require('fs');
const express = require('express');
const mysql = require('mysql2');
const { error } = require('console');

const server = express();
server.use(express.urlencoded({ extended: true }));

server.use(express.static('public')); // sirve HTML, imágenes, CSS, todo

const conexion = mysql.createConnection({
    host: '10.1.15.29',
    user: 'alumno',
    password: 'alumno',
    database: 'WK'
});

const cabecera = fs.readFileSync('public/header.html', 'utf-8');
const final = fs.readFileSync('public/footer.html', 'utf-8');

server.post("/WK", (req, res) => {
    const correo = req.body.correo;
    const clave = req.body.clave;

    if ((correo == "emperador@terra.com") && (clave == "1234")) 
        {
            const contenido = `
            <br>
            <h1> Bienvenido Al Imperio de la humanidad </h1>
            <img src="imagenes/titus-warhammer.gif">
            <a href="/Elegidos"><h2> Que la luz del emperador te guie </h2></a>
            <br>
            `;
            res.send(cabecera + contenido + final);
        }
     else
    {
        const contenido = `
        <br>
        <h1> Traidor de la humanidad </h1>
        <img src="imagenes/no-warhammer-40k.gif">
        <br>
        `;
        res.send(cabecera + contenido + final);
    }
});
