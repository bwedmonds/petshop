import FerretsService from "../services/FerretsService";
import express from 'express'

//import service and create an instance
let _service = new FerretsService()
let _repo = _service.repository

//public
export default class FerretsController {
  constructor() {
    this.router = express.Router()
      .get('', this.getAllFerrets)
      .get('/:id', this.getFerretById)
      .post('', this.createFerret)
      .put('/:id', this.editFerret)
      .delete('/:id', this.deleteFerret)
      .use('*', this.defaultRoute)
  }

  defaultRoute(req, res, next) {
    next({ status: 404, message: 'no such FerretRoute' })
  }

  async getAllFerrets(req, res, next) {
    try {
      let ferrets = await _repo.find({})
      return res.send(ferrets)
    } catch (err) { next(err) }
  }

  async getFerretById(req, res, next) {
    try {
      let ferret = await _repo.findById(req.params.id)
      return res.send(ferret)
    } catch (err) { next(err) }
  }

  async createFerret(req, res, next) {
    try {
      let ferret = await _repo.create(req.body)
      return res.status(201).send(ferret)
    } catch (err) { next(err) }
  }

  async editFerret(req, res, next) {
    try {
      let ferret = await _repo.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      if (ferret) {
        return res.send(ferret)
      }
      throw new Error("invalid id")
    } catch (err) { next(err) }
  }

  async deleteFerret(req, res, next) {
    try {
      let ferret = await _repo.findByIdAndDelete(req.params.id)
      return res.send("successfully deleted")
    } catch (err) { next(err) }
  }
}