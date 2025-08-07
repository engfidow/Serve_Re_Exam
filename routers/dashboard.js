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
      {
        $group: {
          _id: "$subjects",
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: 'subjects', // 👈 make sure it's the exact name of your collection
          localField: "_id",
          foreignField: "_id",
          as: "subjectInfo"
        }
      },
      {
        $unwind: "$subjectInfo"
      },
      {
        $project: {
          _id: 0,
          subjectId: "$_id",
          subjectName: "$subjectInfo.name",
          count: 1
        }
      }
    ]);

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET /api/dashboard/gender-count
router.get('/gender-count', async (req, res) => {
  try {
    const students = await Student.find().populate('user', 'gender');

    let totalMale = 0;
    let totalFemale = 0;

    students.forEach((student) => {
      const gender = student.user?.gender?.toLowerCase();
      if (gender === 'male') totalMale++;
      else if (gender === 'female') totalFemale++;
    });

    res.json({
      totalMale,
      totalFemale
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
