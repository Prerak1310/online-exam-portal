import {useRef,useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
const StartExam = () => {

	const { userInfo } = useSelector((state) => state.auth);
	const { examId } = useParams();
	const navigate = useNavigate();

	const [exam, setExam] = useState(null);
	const [questions, setQuestions] = useState([]);
	const [current, setCurrent] = useState(0);
	const [answers, setAnswers] = useState({});
	const [timer, setTimer] = useState(0); // in seconds
	const [submitted, setSubmitted] = useState(false);
	const tabSwitchRef = useRef(0); // holds actual count outside React state
	const currentQuestion = questions[current];
	// Prevent Right Click and other cheating prone keys
	useEffect(() => {
		const handleContextMenu = (e) => e.preventDefault();
		const handleKeyDown = (e) => {
			if (e.ctrlKey && (e.key === 'u' || e.key === 's' || e.key === 'c')) {
				e.preventDefault();
			}
			if (e.key === 'F12') {
				e.preventDefault();
			}
		};

		document.addEventListener("contextmenu", handleContextMenu);
		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("contextmenu", handleContextMenu);
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	// Handle Tab Switches
	useEffect(() => {
		const handleBlur = () => {
			tabSwitchRef.current += 1;

			if (tabSwitchRef.current >= 3) {
				alert("Too many tab switches! Your exam will now be submitted.");
				handleSubmit(); // Call your submission function
			} else {
				alert(
					`Warning: You have switched tabs ${tabSwitchRef.current} time(s). After 3, your exam will be auto-submitted.`
				);
			}
		};

		window.addEventListener("blur", handleBlur);

		return () => {
			window.removeEventListener("blur", handleBlur);
		};
	}, []);


	useEffect(() => {
		const checkSessionAndFetch = async () => {
			try {
				// Check session first
				const sessionRes = await axios.post("/exam/checksession", {
					studentId: userInfo._id,
					examId,
				});

				if (sessionRes.data.alreadyStarted) {
					alert("You have already started this exam. You cannot retake it.");
					navigate("/"); // or home
					return;
				}

				// If no session, fetch exam + questions
				const examRes = await axios.get(`/admin/getexam/${examId}`);
				setExam(examRes.data);

				const questionsRes = await axios.get(`/admin/getquestions/${examId}`);
				setQuestions(questionsRes.data);

				const durationInSeconds = examRes.data.duration * 60;
				setTimer(durationInSeconds);

				// Create the new session now
				await axios.post("/exam/startsession", {
					examId,
					studentId: userInfo._id,
					startTime: new Date(),
					endTime: new Date(Date.now() + durationInSeconds * 1000),
				});
			} catch (err) {
				console.error("Error checking session or fetching exam:", err);
			}
		};

		checkSessionAndFetch();
	}, [examId]);



	// Countdown timer
	useEffect(() => {
		if (submitted || timer <= 0) return;

		const interval = setInterval(() => {
			setTimer((prev) => {
				if (prev <= 1) {
					clearInterval(interval);
					handleSubmit(); // auto-submit
				}
				return prev - 1;
			});
		}, 1000);

		return () => clearInterval(interval);
	}, [timer, submitted]);

	const handleOptionSelect = (qId, selected) => {
		if (submitted) return;
		setAnswers({ ...answers, [qId]: selected });
	};
	const handleSubmit = async () => {
		setSubmitted(true);

		try {
			const res = await axios.post("/exam/submitexam", {
				examId,
				studentId: userInfo._id, // get this from Redux state
				answers,
			});

			alert(`Exam submitted! You scored ${res.data.session.score} out of ${questions.length}`);
			navigate("/"); // or redirect to a results page
		} catch (err) {
			console.error("Submission error:", err);
			alert("Failed to submit exam");
		}
	};


	const formatTime = (seconds) => {
		const m = String(Math.floor(seconds / 60)).padStart(2, "0");
		const s = String(seconds % 60).padStart(2, "0");
		return `${m}:${s}`;
	};

	if (!exam || questions.length === 0) return <p className="text-center mt-10">Loading exam...</p>;




	return (
		<div className="max-w-3xl mx-auto mt-10 px-4">
			<div className="flex justify-between mb-4">
				<h1 className="text-xl font-semibold">{exam.title}</h1>
				<p className="text-red-600 font-bold">Time Left: {formatTime(timer)}</p>
			</div>

			<div className="border rounded p-4 shadow">
				<p className="mb-4 font-medium">
					Q{current + 1}. {currentQuestion.questionText}
				</p>

				<div className="space-y-2">
					{currentQuestion.options.map((opt, i) => (
						<label key={i} className="block">
							<input
								type="radio"
								name={`question-${currentQuestion._id}`}
								value={opt}
								checked={answers[currentQuestion._id] === opt}
								disabled={submitted}
								onChange={() => handleOptionSelect(currentQuestion._id, opt)}
								className="mr-2"
							/>
							{opt}
						</label>
					))}
				</div>
			</div>

			<div className="mt-6 flex justify-between">
				<button
					onClick={() => setCurrent((c) => Math.max(c - 1, 0))}
					disabled={current === 0}
					className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
				>
					Previous
				</button>

				<button
					onClick={() => setCurrent((c) => Math.min(c + 1, questions.length - 1))}
					disabled={current === questions.length - 1}
					className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
				>
					Next
				</button>
			</div>

			{!submitted && (
				<button
					onClick={handleSubmit}
					className="mt-6 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
				>
					Submit Exam
				</button>
			)}

			{submitted && <p className="mt-6 text-center text-blue-600 font-semibold">Your responses have been submitted.</p>}
		</div>
	);
};

export default StartExam;

