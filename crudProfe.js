const express = require('express')
const server = express()
const port = 3000

server.use(express.json())
//Realizar una API que pueda hacer operaciones CRUD sobre la siguiente lista de usuarios:
const users = [
    {
        id: 1,
        firstname: 'Marcos',
        lastname: 'Costa',
        isActive: true,
        age: 25,
        hobbis: ["Karate", "Scout", "Pesca", "Escalada"]
    },
    {
        id: 2,
        firstname: 'Elena',
        lastname: 'Zamora',
        isActive: true,
        age: 32,
        hobbis: ["Lectura", "Yoga", "Fotografía"]
    },
    {
        id: 3,
        firstname: 'Julián',
        lastname: 'Ríos',
        isActive: false,
        age: 19,
        hobbis: ["Gaming", "Ajedrez", "Ciclismo"]
    },
    {
        id: 4,
        firstname: 'Sofía',
        lastname: 'Méndez',
        isActive: true,
        age: 28,
        hobbis: ["Cocina", "Pintura", "Tenis"]
    },
    {
        id: 5,
        firstname: 'Ricardo',
        lastname: 'Gómez',
        isActive: false,
        age: 45,
        hobbis: ["Carpintería", "Jardinería", "Viajes"]
    }
];


//debera tener un GET que obtenga a todos los usuarios,
//  un GET por ID para obtener un usuario por ID,
//  un POST para crear un nuevo usuarios (como es de forma logica mostrar la lista completa con el nuevo usuarios),
//  PATCH para modificar parcialmente un usuario (deberan mostrar el usuario una vez fue modificado),
//  PUT para modificar de forma completa un usuario (lo mismo que el patch deben mostrar el usuaro modificado) y
//  DELETE debera eliminar un usuario de lalista y mostrar nuevamente la lista ya con el usuario eliminado

server.get('/users',(req,res)=>{
    res.status(200).json(users)
})

server.get('/users/:id',(req,res)=>{
    const idBuscado = Number(req.params.id)
    var user ={}
    for (let i=0;i<users.length;i++)
    {
        if(users[i].id===idBuscado)
        {
            user = users[i]
        }
    }
    res.status(200).json(user)
})

server.post('/users',(req,res)=>{
    const{firstname,lastname,age,isActive,hobbis}= req.body
    var newID=users[0].id
    for (let i=0;i<users.length;i++){
        if(users[i].id>newID){
            newID=users[i].id
        }
    }
    const newUser ={
        id:newID+1,
        firstname,
        lastname,
        age,
        isActive,
        hobbis
    }
    users.push(newUser)
    res.status(201).json({message:"Usuario creado con exito , su ID es: "+(newID+1)})
})
server.patch('/users/:id',(req,res)=>{})

server.listen(port, () => {
    console.log("El server esta prendido en el puerto:" + port)
})