const express = require('express')
const server = express()
const port = 3000

server.use(express.json())

server.post('/calcular', (req, res) => {
    const { numeros, operacion } = req.body

    if (!numeros || !Array.isArray(numeros) || numeros.length === 0) {
        return res.status(400).json({ error: 'Mandá un array de números. Ej: "numeros": [2, 3, 4]' })
    }
    if (!operacion) {
        return res.status(400).json({ error: 'Mandá una operacion: suma | resta | multiplicacion | division' })
    }

    let resultado

    switch (operacion) {
        case 'suma':
            resultado = numeros.reduce((acc, num) => acc + num, 0)
            break

        case 'resta':
            resultado = numeros.reduce((acc, num) => acc - num)
            break

        case 'multiplicacion':
            resultado = numeros.reduce((acc, num) => acc * num, 1)
            break

        case 'division':
            if (numeros.slice(1).includes(0)) {
                return res.status(400).json({ error: 'No se puede dividir por cero' })
            }
            resultado = numeros.reduce((acc, num) => acc / num)
            break

        default:
            return res.status(400).json({ error: 'Operación no válida. Usá: suma | resta | multiplicacion | division' })
    }

    res.json({
        operacion,
        numeros,
        resultado
    })
})

server.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`)
})