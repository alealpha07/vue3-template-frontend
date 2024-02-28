const express=require('express')
const serveStatic=require('serve-static')
const path  = require('path')
const app = express() 
const cors = require('cors')
require("dotenv").config();

app.use(cors({}));
app.use('/', serveStatic(path.join('./dist')))

app.get("/favicon.ico", function (req, res){
    res.sendFile(__dirname + '/dist/favicon.ico')
})

app.get(/.*/, function (req, res){
    res.sendFile(__dirname + '/dist/index.html')
})

const port=process.env.PORT || 8080
app.listen(port)
console.log(`app is listening on port: ${port}`)
