const express = require('express')

module.exports = app => {
    app.use(express.urlencoded({
        extended: true
    }))
    app.use(express.json())
    app.get("/",(req,res)=>res.status(200).json({message:'It works!'}))
}