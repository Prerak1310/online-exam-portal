const Exam = require('../models/exam');
const Question = require("../models/questions");

// Create Exam
const examCreate = async (req,res) =>{
	try {
		const { title, description, duration, startTime, createdBy } = req.body;

		const newExam =  await Exam.create({
			title,
			description,
			duration,
			startTime,
			createdBy // optional, for admin tracking
		});

		return res.json({ message: 'Exam created successfully', exam: newExam });
	} catch (error) {
		return res.json({ error: 'Error creating exam' });
	}
}

// Add Questions
const addQuestions = async(req, res) =>{
	try {
		const { questionText, options, correctAnswer } = req.body;
		const { examId } = req.params;

		const newQuestion = await Question.create({
			examId,
			questionText,
			options,
			correctAnswer
		});

		return res.json({ message: "Question added", question: newQuestion });
	} catch (err) {
		console.error(err);
		return res.json({ error: "Could not add question" });
	}
}

// Get Exams
const getExams = async(req, res) => {
	try {
		const exams = await Exam.find().sort({ createdAt: -1 }); // newest first
		return res.json(exams);
	} catch (err) {
		console.error("Failed to fetch exams", err);
		return res.json({ error: "Internal Server Error" });
	}
}

// Get Exam based on ID
const getExam = async(req, res) => {
	try {
		const exam = await Exam.findById(req.params.examId);
		if (!exam) {
			return res.json({ error: "Exam not found" });
		}
		return res.json(exam);
	} catch (err) {
		console.error("Error fetching exam:", err);
		return res.json({ error: "Internal server error" });
	}
}

// Get Questions
const getQuestions = async(req, res)=>{
	try {
		const questions = await Question.find({ examId: req.params.examId });
		return res.json(questions);
	} catch (err) {
		console.error("Error fetching questions:", err);
		return res.json({ error: "Failed to fetch questions" });
	}
}

module.exports = {examCreate, addQuestions, getExams, getExam, getQuestions};
