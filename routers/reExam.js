const express = require('express');
const router = express.Router();
const reExamController = require('../controllers/reExam');
router.get('/registered-subjects', reExamController.getAllRegisteredSubjects);
router.get('/student/:studentId', reExamController.getReExamsByStudentId); // ✅ New route
router.post('/', reExamController.createReExam);
router.get('/', reExamController.getAllReExams);
router.get('/:id', reExamController.getReExamById);
router.put('/:id', reExamController.updateReExam);
router.delete('/:id', reExamController.deleteReExam);

router.get('/reports/:range', reExamController.getReExamReport);


module.exports = router;
