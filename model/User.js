const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema ({
  username: {
    type: String
  },
  name: {
    type: String
  },
  email: {
    type: String
  },
  points: {
    type: Number,
    default: 0
  },
  level: {
    type: Number,
    // admin: 1, user: 2
    default: 2
  },
  password: {
    type: String
  }
})

module.exports = mongoose.model('user', UserSchema)