// models/Subject.js
const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: "Faculty", required: true },
  class: { type: mongoose.Schema.Types.ObjectId, ref: "Class" }, // ✅ Add this line
  description: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Subject", subjectSchema);
