import mongoose from 'mongoose'

let _schema = new mongoose.Schema({
  name: { type: String, required: true },
  breed: { type: String, required: true },
  gender: { type: String, enum: ['male', 'female'] },
  age: { type: Number, min: 0 }
})

export default class DogsService {
  get repository() {
    return mongoose.model('dog', _schema)
  }
}