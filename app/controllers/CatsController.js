import CatsService from "../services/CatsService"
import express from 'express'

//import service and create an instance
let _service = new CatsService()
let _repo = _service.repository

//PUBLIC
export default class CatsController {
  constructor() {
    this.router = express.Router()
      .get('', this.getAllCats)
      .get('/:id', this.getCatById)
      .post('', this.createCat)
      .put('/:id', this.editCat)
      .delete('/:id', this.deleteCat)
      .use('*', this.defaultRoute)
  }

  defaultRoute(req, res, next) {
    next({ status: 404, message: 'no such CatRoute' })
  }

  async getAllCats(req, res, next) {
    try {
      let cats = await _repo.find({})
      return res.send(cats)
    }
    catch (err) { next(err) } //sends error to default error handler (main.js)
  }

  async getCatById(req, res, next) {
    try {
      let cat = await _repo.findById(req.params.id)
      return res.send(cat)
    } catch (error) { next(error) }
  }

  async createCat(req, res, next) {
    try {
      let cat = await _repo.create(req.body)
      return res.status(201).send(cat)
    } catch (error) { next(error) }
  }

  async editCat(req, res, next) {
    try {
      let cat = await _repo.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      if (cat) {
        return res.send(cat)
      }
      throw new Error("invalid id")
    } catch (error) { next(error) }
  }

  async deleteCat(req, res, next) {
    try {
      let cat = await _repo.findByIdAndDelete(req.params.id)
      return res.send("successfully deleted")
    } catch (error) { next(error) }
  }
}