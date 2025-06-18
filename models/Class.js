// models/Class.js
const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  name: { type: String, required: true },
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: "Faculty", required: true },
  description: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Class", classSchema);
