import DogsService from '../services/DogsService'
import express from 'express'

//import service and create an instance
let _service = new DogsService()
let _repo = _service.repository

//PUBLIC
export default class DogsController {
  constructor() {
    this.router = express.Router()
      .get('', this.getAllDogs)
      .get('/:id', this.getDogById)
      .put('/:id', this.editDog)
      .post('', this.createDog)
      .delete('/:id', this.deleteDog)
      .use('*', this.defaultRoute)
  }

  defaultRoute(req, res, next) {
    next({ status: 404, message: 'no such DogRoute' })
  }

  async getAllDogs(req, res, next) {
    try {
      let dogs = await _repo.find({})
      return res.send(dogs)
    } catch (error) { next(error) }
  }

  async getDogById(req, res, next) {
    try {
      let dog = await _repo.findById(req.params.id)
      return res.send(dog)
    } catch (error) { next(error) }
  }

  async editDog(req, res, next) {
    try {
      let dog = await _repo.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      if (dog) {
        return res.send(dog)
      }
      throw new Error("invalid request")
    } catch (error) { next(error) }
  }

  async createDog(req, res, next) {
    try {
      let dog = await _repo.create(req.body)
      return res.status(201).send(dog)
    } catch (error) { next(error) }
  }

  async deleteDog(req, res, next) {
    try {
      let dog = await _repo.findOneAndDelete({ _id: req.params.id })
      return res.send('successfully deleted')
    } catch (error) { next(error) }
  }
}