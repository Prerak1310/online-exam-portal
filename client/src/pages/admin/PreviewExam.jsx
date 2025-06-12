import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PreviewExam = () => {
	const { examId } = useParams();
	const [exam, setExam] = useState(null);
	const [questions, setQuestions] = useState([]);

	useEffect(() => {
		const fetchExamAndQuestions = async () => {
			try {
				const examRes = await axios.get(`/admin/getexam/${examId}`);
				setExam(examRes.data);

				const questionsRes = await axios.get(`/admin/getquestions/${examId}`);
				setQuestions(questionsRes.data);
			} catch (err) {
				console.error("Failed to load preview data", err);
			}
		};

		fetchExamAndQuestions();
	}, [examId]);

	if (!exam) return <p className="text-center mt-10">Loading exam preview...</p>;

	return (
		<div className="max-w-3xl mx-auto mt-10 px-4">
			<h1 className="text-3xl font-bold mb-2">{exam.title}</h1>
			<p className="mb-6 text-gray-600">
				Duration: {exam.duration} mins | Start Time: {new Date(exam.startTime).toLocaleString()}
			</p>

			<h2 className="text-xl font-semibold mb-4">Questions Preview</h2>
			{questions.length === 0 && <p>No questions added yet.</p>}

			{questions.map((q, i) => (
				<div key={q._id} className="mb-6 p-4 border rounded shadow">
					<p className="font-semibold mb-2">
						{i + 1}. {q.questionText}
					</p>
					<div className="space-y-1">
						{q.options.map((opt, idx) => (
							<label key={idx} className="block">
								<input type="radio" disabled className="mr-2" />
								{opt}
							</label>
						))}
					</div>
				</div>
			))}
		</div>
	);
};

export default PreviewExam;

