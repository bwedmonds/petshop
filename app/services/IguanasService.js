import mongoose from 'mongoose'

let _schema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, min: 0 },
  color: { type: String, default: 'multicolored' }
})

export default class IguanasService {
  get repository() {
    return mongoose.model('iguna', _schema)
  }
}