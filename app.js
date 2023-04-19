require('dotenv').config();
import Server from './bin/server';
const express = require('express')
const app = express()
const PORT = process.env.PORT


app.get('/', (req,res) => {
    res.send('Server is working')
})

const start = async() =>{
    try{
        app.listen(PORT, ()=>{
            console.log(`Server is running on port: ${PORT}`)
        })  
 }catch(error){
    console.log(error)
        res.status(500).send(error.message)
    }
}

start();