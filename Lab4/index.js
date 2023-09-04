const express = require('express')
const app = express()
const port = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let users = []

users.push({
    name: "Pepito",
    last: "Perez",
    age: 26,
    id: "1130613425",
    email: "pperez@u.icesi.edu.co"
})

// ver usuario en especifico
app.get('/users/:id', (req, res)=>{
    console.log("params:", req.params)
    const requestID = req.params.id
    let requiredUser = null;
    for (let index = 0; index < users.length; index++) {
        console.log(users[index].id === requestID, users[index].id, requestID)
        if(users[index].id === requestID){
            requiredUser = users[index];
        }
    }
    console.log(requiredUser)
    res.json(requiredUser)
})

// filtrar usuario por edad
app.get('/users', (req, res)=>{
    if(req.query.age){
        users = users.filter(
            (user)=>{return user.age == req.query.age}
        )
    }
    res.send({"users":users})
})

// crear usuarios
app.post('/users', (req, res) => {
    let newUser = {
        name:req.body.name,
        last:req.body.last,
        age:req.body.age,
        id:req.body.id,
        email:req.body.email
    }
    users.push(newUser)
    res.send("¡Creación de usuario exitosa!")
})

app.get('/', (req, res)=>{
    res.send("Bienvenidos a la API de usuarios")
})

// eliminar usuarios
app.delete('/users/:id', (req, res)=>{
    const idToDelete = req.params.id;
    let indexToDelete = users.findIndex(user=>user.id==idToDelete)
    let userDeleted = users.splice(indexToDelete, 1)
    res.send("Se eliminó correctamente el usuario con id: " + userDeleted[0].id)
})

// replazar datos del usuario
app.put('/users/:id',(req, res)=>{
    let index = users.findIndex(user => user.id == req.params.id)
    let newUser = {
        name:req.body.name,
        last:req.body.last,
        age:req.body.age,
        id:req.body.id,
        email:req.body.email
    }
    users[index]=newUser
    res.send("usuario reemplazado " + newUser )
})

// modificar datos del usuario
app.patch('/users/:id', (req, res)=>{
    let index = users.findIndex(user => user.id == req.params.id)

    users[index].name = req.body.name || users[index].name
    users[index].last = req.body.last || users[index].last
    users[index].age = req.body.age || users[index].age
    users[index].email = req.body.email || users[index].email

    res.send("usuario modificado ")
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })