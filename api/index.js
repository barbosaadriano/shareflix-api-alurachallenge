const express = require('express')

const app = express()
const port = 3000

app.get('/',(req,res)=>res.send('It works!'))

app.listen(port,()=>console.log(`Server is running at ${port}`))

module.exports = app