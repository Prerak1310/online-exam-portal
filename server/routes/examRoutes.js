const express = require("express");
const router = express.Router();
const cors = require("cors");
const {
	startExam,
	submitExam
} = require("../controllers/examController");
// middleware
router.use(
	cors({
		credentials: true,
		origin: "http://localhost:5173",
	})
);

router.post("/start/:examId", startExam); //route: /exam/start/:examId
router.post("/submitexam", startExam); //route: /exam/submitexam

module.exports = router;
