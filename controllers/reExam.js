const ReExam = require('../models/reExam');
const Subject = require('../models/Subject');
const { payByWaafiPay } = require('../paymentEvc');

// Create
exports.createReExam = async (req, res) => {
  try {
    
    const { studentId, phone, subjects, reason } = req.body;

    if (!studentId || !phone || !subjects || !reason) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const totalFee = subjects.length * 3;
    const waafiResponse = await payByWaafiPay({
          phone: phone,
          amount: 0.01,
          merchantUid: process.env.merchantUid,
          apiUserId: process.env.apiUserId,
          apiKey: process.env.apiKey,
        });
        console.log(waafiResponse)
        if (waafiResponse.status) {
          const totalFee = subjects.length * 3;

    const reExam = new ReExam({
      studentId,
      phone,
      subjects,
      reason,
      totalFee,
      status: 'approved'
    });

    const saved = await reExam.save();
   res.status(201).json(saved);
        } else {
          // Handling payment failure
          return res.status(400).send({
            status: "failed",
            message: `${waafiResponse.error}` ?? "Payment Failed Try Again",
          });
         
        }

    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllRegisteredSubjects = async (req, res) => {
  try {
    const all = await ReExam.find({}, 'subjects');
    const allSubjects = all.flatMap(item => item.subjects);
    const unique = [...new Set(allSubjects)];

    // Optionally fetch full Subject info
    const subjects = await Subject.find({ name: { $in: unique } });
    res.status(200).json(subjects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All
exports.getAllReExams = async (req, res) => {
  try {
    const reExams = await ReExam.find()
      .populate({
        path: 'studentId',
        populate: { path: 'user' }
      });
    res.status(200).json(reExams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get One
exports.getReExamById = async (req, res) => {
  try {
    const reExam = await ReExam.findById(req.params.id).populate('studentId');
    if (!reExam) return res.status(404).json({ message: 'Not found' });
    res.json(reExam);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
exports.updateReExam = async (req, res) => {
  try {
    const updated = await ReExam.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete
exports.deleteReExam = async (req, res) => {
  try {
    const deleted = await ReExam.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getReExamsByStudentId = async (req, res) => {
  try {
    const { studentId } = req.params;

    const reExams = await ReExam.find({ studentId })
      .populate({
        path: 'studentId',
        populate: { path: 'user' }
      });

    res.status(200).json(reExams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getDateRange = (range) => {
  const now = new Date();
  let start;

  switch (range) {
    case 'week':
      start = new Date(now.setDate(now.getDate() - 7));
      break;
    case 'month':
      start = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    case 'year':
      start = new Date(now.getFullYear(), 0, 1);
      break;
    default:
      start = null;
  }

  return start;
};

exports.getReExamReport = async (req, res) => {
  try {
    const { range } = req.params;
    const startDate = getDateRange(range);

    const query = startDate ? { createdAt: { $gte: startDate } } : {};

    const reExams = await ReExam.find(query);

    const totalCount = reExams.length;
    const totalRevenue = reExams.reduce((sum, exam) => sum + (exam.totalFee || 0), 0);

    res.status(200).json({
      range,
      totalCount,
      totalRevenue,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};