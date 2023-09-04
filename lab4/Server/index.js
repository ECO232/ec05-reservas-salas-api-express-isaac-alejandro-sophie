const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let salas = []

salas.push({
    edificio: "C",
    salon: 303,
    reserva: "",
})

// ver salas por edificio
app.get('/salas/:edificio', (req, res) => {
    console.log("params:", req.params);
    const requestEDIFICIO = req.params.edificio;
    let salasPorEdificio = [];

    for (let index = 0; index < salas.length; index++) {
        console.log(salas[index].edificio === requestEDIFICIO, salas[index].edificio, requestEDIFICIO);
        if (salas[index].edificio === requestEDIFICIO) {
            salasPorEdificio.push(salas[index]);
        }
    }

    console.log(salasPorEdificio);
    res.json(salasPorEdificio);
});

// filtrar usuario por edad
app.get('/salas', (req, res)=>{
    let salasFilter = [...salas]
    if(req.query.salon){
        salasFilter = salas.filter(
            (sala)=>{return sala.salon == req.query.salon}
        )
    }
    res.send({"salas":salasFilter})
})

// crear usuarios
app.post('/salas', (req, res) => {
    let newSala = {
        edificio:req.body.edificio,
        salon:req.body.salon,
        reserva:req.body.reserva,
    }
    salas.push(newSala)
    res.send("¡Creación de sala exitosa!")
})

app.get('/', (req, res)=>{
    res.send("Bienvenidos a la API de salas")
})


// modificar datos de la sala (el horario)
app.patch('/salas/:salon', (req, res)=>{
    let index = salas.findIndex(sala => sala.salon == req.params.salon)

    salas[index].edificio = req.body.edificio || salas[index].edificio
    salas[index].salon = req.body.salon || salas[index].salon
    salas[index].reserva = req.body.reserva || salas[index].reserva

    res.send("sala modificado ")
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })