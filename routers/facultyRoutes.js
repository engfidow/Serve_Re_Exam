// routes/facultyRoutes.js
const express = require("express");
const router = express.Router();
const facultyController = require("../controllers/facultyController");

router.post("/", facultyController.createFaculty);
router.get("/", facultyController.getFaculties);
router.put("/:id", facultyController.updateFaculty);
router.delete("/:id", facultyController.deleteFaculty);

module.exports = router;
