const express = require("express");
const router = express.Router();
const cors = require("cors");
const {
	startExam,
	submitExam,
	getScores,
	checkSession,
	startSession
} = require("../controllers/examController");
// middleware
router.use(
	cors({
		credentials: true,
		origin: "http://localhost:5173",
	})
);

router.post("/start/:examId", startExam); //route: /exam/start/:examId
router.post("/submitexam", submitExam); //route: /exam/submitexam
router.post("/checksession", checkSession); //route: /exam/checksession
router.post("/startsession", startSession); //route: /exam/startsession
router.get("/getscores/:studentId", getScores); //routes: /exam/getscores/:studentId

module.exports = router;
