const express = require("express");
const router = express.Router();
const cors = require("cors");
const {
	examCreate,
	addQuestions,
	getExams,
	getQuestions,
	getExam
} = require("../controllers/adminController");
// middleware
router.use(
	cors({
		credentials: true,
		origin: "http://localhost:5173",
	})
);

router.post("/examcreate", examCreate); //route: /admin/examcreate
router.post("/questions/:examId", addQuestions); //route: /admin/questions/:examId
router.get("/getexams", getExams); //route: /admin/getexams
router.get("/getquestions/:examId", getQuestions); //route: /admin/getquestions/:examId
router.get("/getexam/:examId", getExam); //route: /admin/getexam/:examId

module.exports = router;
