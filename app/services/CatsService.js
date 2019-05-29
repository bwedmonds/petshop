import mongoose from 'mongoose'

let _schema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, min: 0 },
  mood: { type: String, required: true, default: 'Bitey' }
})

export default class CatsService {
  get repository() {
    return mongoose.model('cat', _schema)
  }
}