const Student = require('../models/Student');
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Create student
exports.createStudent = async (req, res) => {
  try {
    const {
      name, email, password, gender, phone,
      faculty, class: classId, address, dateOfBirth,
      emergencyName, emergencyPhone
    } = req.body;

    const image = req.file ? req.file.path : '';

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: password,
      gender,
      image,
      usertype: 'student',
      status: 'inactive'
    });

    const savedUser = await user.save();

    const student = new Student({
      user: savedUser._id,
      phone,
      faculty,
      class: classId,
      address,
      dateOfBirth,
      emergencyName,
      emergencyPhone
    });

    const savedStudent = await student.save();

    res.status(201).json({ user: savedUser, student: savedStudent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find()
      .populate('user')
      .populate('faculty')
      .populate('class');
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get student by ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate('user')
      .populate('faculty')
      .populate('class');
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update student
exports.updateStudent = async (req, res) => {
  try {
    const {
      name, email, gender, phone,
      faculty, class: classId, address, dateOfBirth,
      emergencyName, emergencyPhone, status
    } = req.body;

    const image = req.file ? req.file.path : null;

    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ error: 'Student not found' });

    const user = await User.findById(student.user);
    if (!user) return res.status(404).json({ error: 'Linked user not found' });

    user.name = name || user.name;
    user.email = email || user.email;
    user.gender = gender || user.gender;
    user.image = image || user.image;
    user.status = status || user.status;
    await user.save();

    student.phone = phone || student.phone;
    student.faculty = faculty || student.faculty;
    student.class = classId || student.class;
    student.address = address || student.address;
    student.dateOfBirth = dateOfBirth || student.dateOfBirth;
    student.emergencyName = emergencyName || student.emergencyName;
    student.emergencyPhone = emergencyPhone || student.emergencyPhone;
    await student.save();

    res.status(200).json({ user, student });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Delete student
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ error: 'Student not found' });

    await User.findByIdAndDelete(student.user);
    await Student.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Student and user deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
