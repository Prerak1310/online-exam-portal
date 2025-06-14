const express = require("express");
const router = express.Router();
const StudentExamSession = require("../models/StudentExamSession");
const Exam = require("../models/exam");
const Question = require("../models/questions");
const startExam = async (req, res) => {
	try {
		const { examId } = req.params;
		const studentId = req.user._id; // assuming auth middleware sets req.user

		const exam = await Exam.findById(examId);
		if (!exam) return res.status(404).json({ message: "Exam not found" });

		const existing = await StudentExamSession.findOne({ examId, studentId });
		if (existing) return res.json(existing); // Return session if already started

		const startTime = new Date();
		const endTime = new Date(startTime.getTime() + exam.duration * 60000);

		const session = StudentExamSession.create({
			studentId,
			examId,
			startTime,
			endTime,
		});

		res.status(201).json(session);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}

}

const submitExam = async (req, res) => {
	try {
		const { examId, studentId, answers } = req.body;

		const questions = await Question.find({ examId });
		let score = 0;
		const qid = q._id.toString(); // Ensure key is string
		questions.forEach((q) => {
			if (answers[q._id] && answers[q._id] === q.correctAnswer) {
				score++;
			}
		});

		const session = await StudentExamSession.create({
			examId,
			studentId,
			answers,
			score,
			submittedAt: new Date(),
		});

		return	res.status(200).json({ message: "Exam submitted", session });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Submission failed" });
	}

}

module.exports = {startExam, submitExam};
