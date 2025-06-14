import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Scores = () => {
	const { userInfo } = useSelector((state) => state.auth);
	const [scores, setScores] = useState([]);

	useEffect(() => {
		const fetchScores = async () => {
			try {
				const res = await axios.get(`/exam/getscores/${userInfo._id}`);
				setScores(res.data);
			} catch (err) {
				console.error("Error fetching scores", err);
			}
		};

		fetchScores();
	}, [userInfo]);

	return (
		<div className="max-w-4xl mx-auto mt-10 px-4">
			<h1 className="text-2xl font-bold mb-6 text-center">Your Exam Scores</h1>

			{scores.length === 0 ? (
				<p className="text-center">No scores available yet.</p>
			) : (
				<div className="space-y-4">
					{scores.map((session) => (
						<div
							key={session._id}
							className="border rounded p-4 shadow flex justify-between items-center"
						>
							<div>
								<h2 className="text-lg font-semibold">{session.examId.title}</h2>
								<p className="text-gray-600">Submitted on: {new Date(session.submittedAt || session.createdAt).toLocaleString()}</p>
							</div>
							<div className="text-right">
								<p className="text-green-600 font-bold text-lg">
									Score: {session.score} / {session.totalQuestions}
								</p>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Scores;

