const express = require('express')
const app = express()
const port = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let salas = []

salas.push({
    name: "Pepito",
    last: "Perez",
    age: 26,
    id: "1130613425",
    email: "pperez@u.icesi.edu.co"
})

// ver usuario en especifico
app.get('/salas/:id', (req, res)=>{
    console.log("params:", req.params)
    const requestID = req.params.id
    let requiredSala = null;
    for (let index = 0; index < salas.length; index++) {
        console.log(salas[index].id === requestID, salas[index].id, requestID)
        if(salas[index].id === requestID){
            requiredSala = salas[index];
        }
    }
    console.log(requiredSala)
    res.json(requiredSala)
})

// filtrar usuario por edad
app.get('/salas', (req, res)=>{
    console.log("salas",salas)
    let salasFilter = [...salas]
    if(req.query.age){
        console.log("Tiene age")
        salasFilter = salas.filter(
            (sala)=>{return sala.age == req.query.age}
        )
    }
    console.log(salasFilter)
    res.send({"salas":salasFilter})
})

// crear usuarios
app.post('/salas', (req, res) => {
    let newSala = {
        name:req.body.name,
        last:req.body.last,
        age:req.body.age,
        id:req.body.id,
        email:req.body.email
    }
    salas.push(newSala)
    res.send("¡Creación de sala exitosa!")
})

app.get('/', (req, res)=>{
    res.send("Bienvenidos a la API de salas")
})

// eliminar usuarios
app.delete('/salas/:id', (req, res)=>{
    const idToDelete = req.params.id;
    let indexToDelete = salas.findIndex(sala=>sala.id==idToDelete)
    let salaDeleted = salas.splice(indexToDelete, 1)
    res.send("Se eliminó correctamente la sala con id: " + salaDeleted[0].id)
})

// replazar datos del usuario
app.put('/salas/:id',(req, res)=>{
    let index = salas.findIndex(sala => sala.id == req.params.id)
    let newSala = {
        name:req.body.name,
        last:req.body.last,
        age:req.body.age,
        id:req.body.id,
        email:req.body.email
    }
    salas[index]=newSala
    res.send("sala reemplazada " + newSala )
})

// modificar datos del usuario
app.patch('/salas/:id', (req, res)=>{
    let index = salas.findIndex(sala => sala.id == req.params.id)

    salas[index].name = req.body.name || salas[index].name
    salas[index].last = req.body.last || salas[index].last
    salas[index].age = req.body.age || salas[index].age
    salas[index].email = req.body.email || salas[index].email

    res.send("sala modificado ")
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })