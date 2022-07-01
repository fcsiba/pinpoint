const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let parentSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
  },
  parent_name: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  collection: 'parents'
})

module.exports = mongoose.model('Parent', parentSchema);