const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const userController = require('../controllers/user'); // for image upload

router.post('/', userController.upload, studentController.createStudent);
router.get('/', studentController.getAllStudents);
router.get('/:id', studentController.getStudentById);
router.put('/:id', userController.upload, studentController.updateStudent);
router.delete('/:id', studentController.deleteStudent);



module.exports = router;
