const express = require('express')
const movies = require('./moviesRoutes')

module.exports = app => {
    app.use(express.urlencoded({
        extended: true
    }))
    app.use(express.json())
    app.use(movies)
    app.get("/",(req,res)=>res.status(200).json({message:'It works!'}))
}