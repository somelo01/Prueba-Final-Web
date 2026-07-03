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
            <img src="images/titus-warhammer.gif">
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
        <img src="images/no-warhammer-40k.gif">
        <br>
        `;
        res.send(cabecera + contenido + final);
    }
});

server.get("/RemplazarSirviente", (req, res) => {
    const id_recibido = req.query.id;

    conexion.query("select * from WK where id=?", [id_recibido], (error, data) => {
     
        if(error||data.length == 0){
        const contenido = `
        <h1> No existe ese Sirviente </h1>
        <br>
        <img src="images/no-warhammer-40k.gif"> <br> <br>
        <input type="button" name="btn" valule="Volver a seleccionar Sirviente" onclick="location='/Elegidos';">
        `;   
        res.send(cabecera + contenido + final);
    }
    else
    {
        const nombre_recibido = data[0].nombre;
        const rango_recibido = data[0].rango;
        const raza_recibido = data[0].raza
        const cantidad_tropas_recibido = data[0].cantidad_tropas;
        const contenido =`
        <form name="editar" action="/Alerta_Remplazar" method="POST">
            <input type="hidden" name="id" value="${id_recibido}">
            <table border="1" width="600">
                <tr>
                    <table>
                    <tr>
                        <td>Nombre</td> <td> <input type="text" name="nombre" value="${nombre_recibido}"></td>
                    </tr>
                    <tr>
                        <td>Rango</td> <td> <input type="text" name="rango" value="${rango_recibido}"></td>
                    </tr>
                    <tr>
                    <tr>
                        <td>Raza</td> <td> <input type="text" name="RAZA" value="${raza_recibido}"></td>
                    </tr>
                        <td>Cantidad de Tropas</td> <td> <input type="number" name="cantidad_tropas" value="${cantidad_tropas_recibido}"></td>
                    </tr>
                    </tr>
                    <tr>
                        <td> <input type="submit" name="btn_actualizar" value="Remplazar Sirviente"> </td>
                    </tr>
                </table>
            </tr>
        </table>
    </form>
        `;
        res.send(cabecera + contenido + final);
    }
    });

});

server.post(/Alerta_Remplazar/, (req, res) => { 

    const id_recibido = req.body.id;
    const nombre_recibido = req.body.nombre;
    const rango_recibido = req.body.rango;
    const cantidad_tropas_recibido = req.body.cantidad_tropas;
    const raza_recibido = data[0].raza

    conexion.query("update WK set nombre=?, rango=?, cantidad_tropas=?, raza=?, where id=?", [nombre_recibido, rango_recibido, raza_recibido,cantidad_tropas_recibido, id_recibido], (error, data) => { 
        if(error||data.length == 0){
            const contenido = `
            <h1> No se pudo remplazar el Sirviente </h1>
            <br>
            <img src="imagenes/no-warhammer-40k.gif"> <br> <br>
            <input type="button" name="btn" valule="Volver a seleccionar Sirviente" onclick="location='/Elegidos';">
            `;   
            res.send(cabecera + contenido + final);
        }
    else{
        const contenido = `
        <script>
            alert("Sirviente Remplazado con exito");
            location="/Elegidos";
        </script>
        `;
        res.send(cabecera + contenido + final);
    }
    
    });
});
server.get("/Elegidos", (req, res) => {

    const informacion = conexion.query("select * from WK", (error, data) => {
        let fila = ``;
        if(error)
        {
            fila = `
            <tr>
                <td colspan="4"> No hay Sirvientes de la humnanidad </td>
            </tr>
            `;
        }

        else
        {
            for(const i of data){
                fila += `
                <tr>
                    <td>${i.id}</td><td>${i.nombre}</td><td>${i.rango}</td><td>${i.raza}</td><td>${i.cantidad_tropas}</td><td> <a href="/RemplazarSirviente?id=${i.id}">Remplazar</a> &nbsp; <a href="/Castigar_Sirviente?id=${i.id}">Castigar</a></td>
                </tr>
                    `;
            }
        }

        const contenido = `
        <table border="1" width="600">
            <tr>
                <td>
                    <table width="100%">
                        <tr>
                            <td>ID</td>
                            <td>Nombre</td>
                            <td>Rango</td>
                            <td>Cantidad_Tropas</td>
                            <td>ACCION</td>
                        </tr>
                        ${fila}
                    </table>
                </td>
            </tr>
        </table>
        <br>
        <input type="button" name="btn_nuevo" value="Nuevo Sirviente" onclick="location='/nuevo_Sirviente';">
                    `;
                    res.send(cabecera + contenido + final);

    });
});

server.get("/Confirmar_Eliminacion", (req, res) => {
    const id_recibido = req.query.id;

    conexion.query("delete from WK where id=?", [id_recibido], (error, data) => {
     
        if(error||data.length == 0){
        const contenido = `
        <h1> No existe ese Sirviente </h1>
        <br>
        <img src="imagenes/no-warhammer-40k.gif"> <br> <br>
        <input type="button" name="btn" valule="Volver a seleccionar Sirviente" onclick="location='/Elegidos';">
        `;   
        res.send(cabecera + contenido + final);
    }
    else
    {
        const contenido =` 
        <script>
            alert("Sirviente Eliminado con exito");
            location="/Elegidos";
        </script>
        `;
        res.send(cabecera + contenido + final);
    }
    });
});

server.get("/Castigar_Sirviente", (req, res) => {
const id_recibido = req.query.id;

conexion.query("select * from WK where id=?", [id_recibido], (error, data) => {
     
        if(error||data.length == 0){
        const contenido = `
        <h1> No existe ese Sirviente </h1>
        <br>
        <img src="imagenes/no-warhammer-40k.gif"> <br> <br>
        <input type="button" name="btn" valule="Volver a seleccionar Sirviente" onclick="location='/Elegidos';">
        `;   
        res.send(cabecera + contenido + final);
    }
    else
    {
        const nombre_recibido = data[0].nombre;
        const contenido =` 
        <h1> ¿Estas seguro de castigar a ${nombre_recibido}?</h1>
        <br>
        <input type="button" name="btn1" value="Si" onclick="location='/Confirmar_Eliminacion?id=${id_recibido}';">
        &nbsp;&nbsp&nbsp&nbsp&nbsp
        <input type="button" name="btn" value="NO" onclick="location='/Elegidos';">
        `;
        res.send(cabecera + contenido + final);
    }
});
  
});

server.get("/Nuevo_Sirviente", (req, res) => {

        const contenido =`
        <form name="Nuevo_Sirviente" action="/Insertar_Sirviente" method="POST">
            <table border="1" width="600">
                <tr>
                    <table>
                    <tr>
                        <td>Nombre</td> <td> <input type="text" name="nombre" value=""></td>
                    </tr>
                    <tr>
                        <td>Rango</td> <td> <input type="text" name="rango" value=""></td>
                    </tr>
                    <tr>
                        <td>Raza</td> <td> <input type="text" name="Raza" value=""></td>
                    </tr>
                    <tr>
                        <td>Cantidad de Tropas</td> <td> <input type="number" name="cantidad_tropas" value=""></td>
                    </tr>
                    </tr>
                    <tr>
                        <td> <input type="submit" name="btn_insertar" value="Insertar Sirviente"> </td>
                    </tr>
                </table>
            </tr>
        </table>
    </form>
        `;
        res.send(cabecera + contenido + final);

});

server.post("/insertar_Sirviente", (req, res) => {

const nombre_recibido = req.body.nombre;
const rango_recibido = req.body.rango;
const cantidad_tropas_recibido = req.body.cantidad_tropas;

conexion.query("insert into WK (nombre, rango, Raza, cantidad_tropas) values (?, ?, ?, ?)", [nombre_recibido, rango_recibido, raza_recibido, cantidad_tropas_recibido], (error, data) => {
     
    if(error||data.length == 0){
        const contenido = `
        <h1> Error en seleccionar Sirviente </h1>
        <br>
        <img src="imagenes/no-warhammer-40k.gif"> <br> <br>
        <input type="button" name="btn" valule="Volver a seleccionar Sirviente" onclick="location='/Elegidos';">
        `;   
        res.send(cabecera + contenido + final);
    }
    else
    {
        const contenido =` 
        <script>
            alert("Sirviente Agregado con exito");
            location="/Elegidos";
        </script>
        `;
        res.send(cabecera + contenido + final);
    }
});
});

server.listen(3000, () => {
    console.log("Servidor escuchando en el puerto 3000 (OK)");
});