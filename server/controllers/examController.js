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

		questions.forEach((q) => {
			const qid = q._id.toString();
			if (answers[qid] && answers[qid] === q.correctAnswer) {
				score++;
			}
		});

		const session = await StudentExamSession.create({
			examId,
			studentId,
			answers,
			score,
			totalQuestions: questions.length, // 👈 store this
			submittedAt: new Date(),
			startTime: new Date(), // dummy for now
			endTime: new Date(),   // dummy for now
			submitted: true,
		});

		return res.status(200).json({ message: "Exam submitted", session });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Submission failed" });
	}
};


const getScores = async (req, res) => {
	try {
		const sessions = await StudentExamSession.find({ studentId: req.params.studentId })
			.populate("examId", "title") // populate exam title
			.sort({ createdAt: -1 }); // optional: latest first

		res.json(sessions);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to fetch scores" });
	}
}

const checkSession = async (req, res) => {
	try {
		const { studentId, examId } = req.body;

		const existing = await StudentExamSession.findOne({
			studentId,
			examId,
			submitted: false,
		});

		if (existing) {
			return res.status(200).json({ alreadyStarted: true });
		}

		res.status(200).json({ alreadyStarted: false });
	} catch (err) {
		console.error("Session check failed", err);
		res.status(500).json({ error: "Server error during session check" });
	}
}

// POST /exam/startsession
const startSession = async (req, res) => {
	try {
		const { studentId, examId, startTime, endTime } = req.body;

		const existing = await StudentExamSession.findOne({ studentId, examId });
		if (existing) {
			return res.status(400).json({ error: "Session already exists" });
		}

		// You must also know how many questions are in this exam
		const questions = await Question.find({ examId });

		const session = await StudentExamSession.create({
			studentId,
			examId,
			startTime,
			endTime,
			totalQuestions: questions.length,
		});

		res.status(201).json({ message: "Session started", session });
	} catch (err) {
		console.error("Start session error:", err);
		res.status(500).json({ error: "Could not start session" });
	}
};


module.exports = {startExam, submitExam, getScores, checkSession, startSession};
