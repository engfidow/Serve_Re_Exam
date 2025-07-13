const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Class = require('../models/Class');
const ReExam = require('../models/reExam');

// GET /api/dashboard/summary
router.get('/summary', async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const totalClasses = await Class.countDocuments();
    const totalRevenue = await ReExam.aggregate([
      { $group: { _id: null, total: { $sum: "$totalFee" } } }
    ]);
    res.json({
      totalStudents,
      totalClasses,
      totalRevenue: totalRevenue[0]?.total || 0
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/dashboard/top-subjects
router.get('/top-subjects', async (req, res) => {
  try {
    const result = await ReExam.aggregate([
      { $unwind: "$subjects" },
      { $group: { _id: "$subjects", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
