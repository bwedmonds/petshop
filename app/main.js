import express from 'express'
import './db/dbconfig'
let server = express()
let bp = require('body-parser')

server.use(bp.urlencoded({ extended: true }))
server.use(bp.json())

//everything above this line will ALWAYS stay


//Register Routes

//  import the route Controller
import CatsController from './controllers/CatsController'
import DogsController from './controllers/DogsController'
import FerretsController from './controllers/FerretsController';
import IguanasController from './controllers/IguanasController';

//  register the route
server.use('/api/cats', new CatsController().router)
server.use('/api/dogs', new DogsController().router)
server.use('api/ferrets', new FerretsController().router)
server.use('api/iguanas', new IguanasController().router)


//BELOW THIS LINE STAYS THE SAME

//Default Error Handler
server.use((error, req, res, next) => {
  res.status(error.status || 400).send({ error: { message: error.message } })
})

server.listen(3000, () => { console.log("Your server is running on port 3000; you better go catch it!") })