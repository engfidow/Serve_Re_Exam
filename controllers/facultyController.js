// controllers/facultyController.js
const Faculty = require("../models/Faculty");

exports.createFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.create(req.body);
    res.status(201).json(faculty);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getFaculties = async (req, res) => {
  try {
    const faculties = await Faculty.find();
    res.status(200).json(faculties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(faculty);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteFaculty = async (req, res) => {
  try {
    await Faculty.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Faculty deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
