const ExamResult = require('../models/ExamResult');

// Create result
exports.createExamResult = async (req, res) => {
  try {
    const result = await ExamResult.create(req.body);
    res.status(201).json({ status: true, data: result });
  } catch (err) {
    res.status(400).json({ status: false, message: err.message });
  }
};

// Get all results
exports.getAllExamResults = async (req, res) => {
  try {
    const results = await ExamResult.find()
      .populate('student', 'studentId')
      .populate('subject', 'name');
    res.status(200).json({ status: true, data: results });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// Get result by ID
exports.getExamResultById = async (req, res) => {
  try {
    const result = await ExamResult.findById(req.params.id)
      .populate('student', 'studentId')
      .populate('subject', 'name');
    if (!result) return res.status(404).json({ status: false, message: 'Result not found' });
    res.status(200).json({ status: true, data: result });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// Get results by student ID
exports.getResultsByStudentId = async (req, res) => {
try {
    const results = await ExamResult.find({
      student: req.params.studentId,
      passed: false
    }).populate('subject', 'name');

    res.status(200).json({ status: true, data: results });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// Update result
exports.updateExamResult = async (req, res) => {
  try {
    const updated = await ExamResult.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ status: false, message: 'Result not found' });
    res.status(200).json({ status: true, data: updated });
  } catch (err) {
    res.status(400).json({ status: false, message: err.message });
  }
};

// Delete result
exports.deleteExamResult = async (req, res) => {
  try {
    const deleted = await ExamResult.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ status: false, message: 'Result not found' });
    res.status(200).json({ status: true, message: 'Result deleted successfully' });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};
