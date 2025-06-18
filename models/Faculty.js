// models/Faculty.js
const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Faculty", facultySchema);
