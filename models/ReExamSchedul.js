const mongoose = require('mongoose');

const reExamScheduleSchema = new mongoose.Schema({
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  hall: {
    type: String,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('ReExamSchedule', reExamScheduleSchema);
