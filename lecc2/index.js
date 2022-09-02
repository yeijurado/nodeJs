/* Este archivo se debe eliminar ya que no se usa pero lo dejo a nivel 
de ilustración ya que asi empezamos a aprender

'use strict'
// Configuración del servidor

const express = require ('express');
const app = express();
const port = 3700;

//
app.get("/", (req, res) => {
    console.log("Get ejecutado en raiz");
    //res.send("Hello Ostyn y Doro");
    //res.send("Mi primer endpoint");
    res.send("Mi primer debug");
});

app.get("/alumnos", (req, res) => {
    res.send("Mi listado de alumnos");
});

app.get("/alumno", (req, res) => {
    
    let cal1 = 10;
    let cal2 = 8;
    let cal3 = 8;
    let final = (cal1 + cal2 + cal3) / 3;

    console.log(final);
    
    res.send("La calificaciòn final del alumno Ostyn Dario es: " + final);
});

app.post("/alumno", (req, res) => {
    res.send("creamos un alumno");
});

app.put("/alumno", (req, res) => {
    res.send("actualizamos un alumno");
});

app.delete("/alumno", (req, res) => {
    res.send("borramos o eliminamos un alumno");
});

app.listen(port, () => {
    console.log("Servidor de ejemplo ejecutando en " + port);
});

*/
