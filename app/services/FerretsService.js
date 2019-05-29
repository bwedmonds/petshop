import mongoose from 'mongoose'

let _schema = new mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
  mood: { type: String, default: 'ferrety' }
})

export default class FerretsService {
  get repository() {
    return mongoose.model('ferret', _schema)
  }
}