const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let driverLocationSchema = new Schema({
  driver_id: {
    type: String,
    required: true
  },
  coordinate: {
    type: String
  },
  socket_id: {
    type: String,
  },
}, {
  timestamps: true,
  collection: 'driverLocation'
})

module.exports = mongoose.model('DriverLocation', driverLocationSchema);