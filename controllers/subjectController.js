// controllers/subjectController.js
const Subject = require("../models/Subject");

exports.createSubject = async (req, res) => {
  try {
    const subject = await Subject.create(req.body);
    res.status(201).json(subject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find().populate("faculty"); // ✅ add populate
    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateSubject = async (req, res) => {
  try {
    const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(subject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteSubject = async (req, res) => {
  try {
    await Subject.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Subject deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getSubjectsByFacultyId = async (req, res) => {
  try {
    const facultyId = req.params.facultyId;
    const subjects = await Subject.find({ faculty: facultyId }).populate("faculty");
    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

