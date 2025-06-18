// ES Module import syntax
require('./database/conn.js'); // Ensure the path is correct and includes the .js extension

const  usersRouter = require('./routers/user.js');
const facultyRoutes = require("./routers/facultyRoutes");
const classRoutes = require("./routers/classRoutes");
const subjectRoutes = require("./routers/subjectRoutes");

const studentRoutes = require('./routers/studentRoutes');
const reExamRoutes = require('./routers/reExam.js');

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const  app = express();

app.use(cors());
// Middleware
app.use(express.json());


// Use Routers
app.use('/uploads', express.static('uploads'));


app.use('/api',usersRouter);





app.use("/api/faculties", facultyRoutes);
app.use("/api/classes", classRoutes);

app.use("/api/subjects", subjectRoutes);



app.use('/api/students', studentRoutes);

app.use('/api/reexams', reExamRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`+ ` 🔥`);
});
