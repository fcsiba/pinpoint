const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let studentSchema = new Schema({
  role_no: {
    type: String,
    required: true
  },
  student_name: {
    type: String,
    required: true
  },
  class_name: {
    type: String,
    required: true
  },
  driver_id : {
    type: String,
    required: true
  },
  parent_id : {
    type: String,
    required: true
  },
  driver_loc : {
    type: Schema.Types.Mixed
  },
  student_home_loc: {
    type: Schema.Types.Mixed
  },
  speed: {
    type: String,
  },
}, {
  timestamps: true,
  collection: 'students'
})

module.exports = mongoose.model('Student', studentSchema);