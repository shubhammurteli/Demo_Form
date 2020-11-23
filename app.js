const express = require('express');
const port = process.env.PORT || 5000;
const app = express();
const path = require('path')
const fs = require('fs')

//Serving static files
app.use('/static', express.static('static'))

app.use(express.urlencoded())

//Setting Pug as template engine
app.set('view engine', 'pug')

//Setting views folder for serving pug
app.set('views', path.join(__dirname, 'views'))


// app.get("/", (req, res) =>{
//     res.send("This is a pug tutorial")
// })

//Pug related files
app.get('/', (req, res)=>{
    const con = "This is a simple survey form"
    const params = {'title': 'This is a Survey Form', 'content': con}
    res.status(200).render('index.pug', params)
})

app.post('/', (req, res)=> {
    name = req.body.name
    age = req.body.age
    address = req.body.address
    let outputtowrite = `The name of client is ${name} and age is ${age} resides at ${address}`
    fs.writeFileSync('output.txt', outputtowrite)

    const response = { 'message': "Your form has been submitted"}
    res.status(200).render('index.pug', response)

})

//Server Listning port
app.listen(port, () => {
    console.log("The server is running at http://localhost")
})
