// routes/classRoutes.js
const express = require("express");
const router = express.Router();
const classController = require("../controllers/classController");

router.post("/", classController.createClass);
router.get("/", classController.getClasses);
router.put("/:id", classController.updateClass);
router.delete("/:id", classController.deleteClass);

module.exports = router;
