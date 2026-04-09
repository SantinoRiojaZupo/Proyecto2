const pepe = require('express')
const server = pepe()
const port = 3000

server.get('/user/:num1/:num2/', (req, res) => {
    //body
    //params
    //query
    const info = req.params
    console.log(req.params)

    // res.send(`hola ${info}`)
    
    const num1 = parseInt(req.params.num1)
    const num2 = parseInt(req.params.num2)
    const num3 = parseInt(req.query.num3)
    const num4 = parseInt(req.query.num4)
    const operacion=(num1+num2)
    const operacion2=(num3-num4)
    const operacion3=(num1*num2)
    const operacion4=(num1/num2)
    console.log(operacion);
    console.log(operacion2)
    res.send(`hola  ${operacion} ${operacion2} ${operacion3} ${operacion4}`)
})

server.listen(port, () => {
    console.log(`servidor corriendo en http://localhost: ${port}`)
})