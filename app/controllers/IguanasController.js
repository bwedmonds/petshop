import IguanasService from "../services/IguanasService";
import express from 'express'

//import service and create an instance
let _service = new IguanasService()
let _repo = _service.repository

//public
export default class IguanasController {
  constructor() {
    this.router = express.Router()
      .get('', this.getAllIguanas)
      .get('/:id', this.getIguanaById)
      .put('/:id', this.editIguana)
      .post('', this.createIguana)
      .delete('/:id', this.deleteIguana)
      .use('*', this.defaultRoute)
  }

  defaultRoute(req, res, next) {
    next({ status: 404, message: 'no such IguanaRoute' })
  }

  async getAllIguanas(req, res, next) {
    try {
      let iguanas = await _repo.find({})
      return res.send(iguanas)
    }
    catch (err) { next(err) }
  }

  async getIguanaById(req, res, next) {
    try {
      let iguana = await _repo.findById(req.params.id)
      return res.send(iguana)
    } catch (error) { next(error) }
  }

  async createIguana(req, res, next) {
    try {
      let iguana = await _repo.create(req.body)
      return res.status(201).send(iguana)
    } catch (error) { next(error) }
  }

  async editIguana(req, res, next) {
    try {
      let iguana = _repo.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      if (iguana) {
        return res.send(iguana)
      }
      throw new Error("invalid id")
    } catch (error) { next(error) }
  }

  async deleteIguana(req, res, next) {
    try {
      let iguana = await _repo.findByIdAndDelete(req.params.id)
      return res.send("successfully deleted")
    } catch (error) { next(error) }
  }
}