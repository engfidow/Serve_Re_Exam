const mongoose = require('mongoose');

const reExamSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  subjects: {
    type: [String],
    required: true
  },
  reason: {
    type: String,
    enum: ['medical', 'family', 'attendence', 'payment', 'failed_exam'],
    required: true
  },
  totalFee: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('ReExam', reExamSchema);
