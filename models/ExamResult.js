// models/ExamResult.js
const mongoose = require("mongoose");

const examResultSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
  score: { type: Number, required: true },
  passed: { type: Boolean, required: true },
}, { timestamps: true });

module.exports = mongoose.model("ExamResult", examResultSchema);
