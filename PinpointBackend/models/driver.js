const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let driverSchema = new Schema({
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
  driver_name: {
    type: String,
    required: true
  },
  vehicle_no: {
    type: String,
    required: true
  },
  vehicle_name: {
    type: String,
    required: true
  },
}, {
  timestamps: true,
  collection: 'drivers'
})

module.exports = mongoose.model('Driver', driverSchema);