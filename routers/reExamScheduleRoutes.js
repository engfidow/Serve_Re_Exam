const express = require('express');
const router = express.Router();
const controller = require('../controllers/reExamScheduleController');

router.post('/', controller.createSchedule);
router.get('/', controller.getAllSchedules);
router.get('/:id', controller.getScheduleById);
router.get('/subject/:subjectId', controller.getScheduleBySubjectId); // for student use
router.put('/:id', controller.updateSchedule);
router.delete('/:id', controller.deleteSchedule);

module.exports = router;
