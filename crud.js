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
]

server.get('/users', (req, res) => {
    res.json(users)
})

server.post('/users', (req, res) => {
    const { firstname, lastname, isActive, age, hobbis } = req.body

    if (!firstname || !lastname || age === undefined) {
        return res.status(400).json({ error: 'Faltan campos obligatorios: firstname, lastname, age' })
    }

    const nuevoUsuario = {
        id: users.length + 1,
        firstname,
        lastname,
        isActive: isActive ?? false,
        age,
        hobbis: hobbis ?? []
    }
    users.push(nuevoUsuario)
    res.json(users)
})

server.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`)
})