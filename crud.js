const express = require('express')
const server = express()
const port = 3000

server.use(express.json())

const users = [
    {
        id: 1,
        firstname: 'Marcos',
        lastname: 'Costa',
        isActive: true,
        age: 25,
        hobbis: ["Karate", "Scout", "Pesca", "Escalada"],
        categoria: 'VIP',
        monto: 500
    },
    {
        id: 2,
        firstname: 'Elena',
        lastname: 'Zamora',
        isActive: true,
        age: 32,
        hobbis: ["Lectura", "Yoga", "Fotografía"],
        categoria: 'NORMAL',
        monto: 500
    },
    {
        id: 3,
        firstname: 'Julián',
        lastname: 'Ríos',
        isActive: false,
        age: 19,
        hobbis: ["Gaming", "Ajedrez", "Ciclismo"],
        categoria: 'VIP',
        monto: 500
    },
    {
        id: 4,
        firstname: 'Sofía',
        lastname: 'Méndez',
        isActive: true,
        age: 28,
        hobbis: ["Cocina", "Pintura", "Tenis"],
        categoria: 'VIP',
        monto: 500
    },
    {
        id: 5,
        firstname: 'Ricardo',
        lastname: 'Gómez',
        isActive: false,
        age: 45,
        hobbis: ["Carpintería", "Jardinería", "Viajes"],
        categoria: 'VIP',
        monto: 500
    }
]
//debera tener un GET que obtenga a todos los usuarios,
//  un GET por ID para obtener un usuario por ID,
//  un POST para crear un nuevo usuarios (como es de forma logica mostrar la lista completa con el nuevo usuarios),
//  PATCH para modificar parcialmente un usuario (deberan mostrar el usuario una vez fue modificado),
//  PUT para modificar de forma completa un usuario (lo mismo que el patch deben mostrar el usuaro modificado) 
// y DELETE debera eliminar un usuario de lalista y mostrar nuevamente la lista ya con el usuario eliminado

//200 OK (http.cat/200): Todo salió bien.
//201 Created (http.cat/201): Se creó un recurso con éxito.
//400 bad request post
//404 Not Found (http.cat/404): Lo que buscas no existe.
//500 Server Error (http.cat/500): Error en tu lógica de programación.

//user.age = req.body.age ? req.body.age : user.age. si req.body.age existe lo usa y sino usa el que ya existe
///usuario?id=1&sueldo=2

//{
//    "firstname": "santino",
//    "lastname": "rioja",
//    "isActive": true,
//    "age": 17,
//    "hobbis": ["lolear", "jugar", "ver anime"]
//}
server.get('/users', (req, res) => {
    res.status(200).json(users)
})
server.get('/users/:id', (req, res) => {
    const id = Number(req.params.id)
    var user = {}
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === id) {
            console.log(users[i])
            user = users[i]
        }
    }
    res.status(200).json(user)

})
server.post('/users', (req, res) => {
    const { firstname, lastname, age, isActive, hobbis } = req.body
    let newID = users[0].id
    for (let i = 0; i < users.length; i++) {
        if (users[i].id > newID) {
            newID = users[i].id
        }
    }

    const nuevoUsuario = {
        id: newID + 1,
        firstname,
        lastname,
        isActive: isActive ?? false,
        age,
        hobbis
    }
    users.push(nuevoUsuario)
    res.status(201).json(users)
})
server.patch('/users/:id', (req, res) => {
    const id = Number(req.params.id)
    const { firstname, lastname, age, isActive, hobbis } = req.body
    if (firstname || lastname || age || isActive || hobbis) {
        for (i = 0; i < users.length; i++) {
            if (users[i].id === id) {
                if (firstname !== undefined) { users[i].firstname = firstname }
                if (lastname !== undefined) { users[i].lastname = lastname }
                if (age !== undefined) { users[i].age = age }
                if (isActive !== undefined) { users[i].isActive = isActive }
                if (hobbis !== undefined) { users[i].hobbis = hobbis }
                res.status(200).json(users[i])
            }

        }
    }


})
server.put('/users/:id', (req, res) => {
    const id = Number(req.params.id)
    const { firstname, lastname, age, isActive, hobbis } = req.body
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == id) {
            users[i].firstname = firstname
            users[i].lastname = lastname
            users[i].age = age
            users[i].isActive = isActive
            users[i].hobbis = hobbis
            res.status(200).json(users[i])
        }

    }
})
server.delete('/users/:id', (req, res) => {
    const id = Number(req.params.id)
    let index = 0
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === id) {
            index = i
            users.splice(i, 1)
        }
    }
    res.status(200).json(users)
})


//realizar una transferencia a un usuario por su ID pero si el usuario que realiza la transferencia es NORMAL se le debe descontar un 10% de lo enviado, si el usuario es VIP no debe pasar nada con el monto y se realizara la transferencia con nortmalidad
server.patch('/users',(req, res)=>{
let id = req.body.id
let idRecibe= req.body.idRecibe
let monto = req.body.monto
let cant=0;
for (i=0; i<users.length;i++)
{
    if(users[i].id==id){
        for(y=0;y<users.length;y++){
            if(users[y].id==idRecibe){
            cant=y     
            }
        }
        if(users[i].categoria=="NORMAL")
        {
            users[i].monto = users[i].monto-(monto+(monto*0.10))
          users[cant].monto = users[cant].monto+(monto+(monto*0.10))
        }
        else
        {
           users[i].monto= users[i].monto-monto
            users[cant].monto = users[cant].monto+monto
        }
        
    }
}
res.status(200).json({message:`Se le transfirio ${monto} a el usuario ${users[idRecibe]}`})
})

server.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`)
})