const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  phone: { type: String, required: true },
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', required: true },
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  address: { type: String },
  dateOfBirth: { type: Date },
  emergencyName: { type: String },
  emergencyPhone: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
