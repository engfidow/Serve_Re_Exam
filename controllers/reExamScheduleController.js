const ReExamSchedule = require('../models/ReExamSchedul');

// Create
exports.createSchedule = async (req, res) => {
  try {
    const schedule = await ReExamSchedule.create(req.body);
    res.status(201).json(schedule);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Read All
exports.getAllSchedules = async (req, res) => {
  try {
    const schedules = await ReExamSchedule.find().populate('subject');
    res.status(200).json(schedules);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read One
exports.getScheduleById = async (req, res) => {
  try {
    const schedule = await ReExamSchedule.findById(req.params.id).populate('subject');
    if (!schedule) return res.status(404).json({ error: 'Schedule not found' });
    res.status(200).json(schedule);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
exports.updateSchedule = async (req, res) => {
  try {
    const updated = await ReExamSchedule.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete
exports.deleteSchedule = async (req, res) => {
  try {
    await ReExamSchedule.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get by Subject ID (for students)
exports.getScheduleBySubjectId = async (req, res) => {
  try {
    const schedules = await ReExamSchedule.find({ subject: req.params.subjectId }).populate('subject');
    res.status(200).json(schedules);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
