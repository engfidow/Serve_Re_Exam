const express = require('express');
const router = express.Router();
const examResultController = require('../controllers/examResultController');

router.post('/', examResultController.createExamResult);
router.get('/', examResultController.getAllExamResults);
router.get('/:id', examResultController.getExamResultById);
router.get('/student/:studentId', examResultController.getResultsByStudentId);
router.put('/:id', examResultController.updateExamResult);
router.delete('/:id', examResultController.deleteExamResult);

module.exports = router;
