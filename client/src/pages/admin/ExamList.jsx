import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ExamList = () => {
	const [exams, setExams] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchExams = async () => {
			try {
				const res = await axios.get("/admin/getexams"); // adjust if you use a different endpoint
				setExams(res.data);
			} catch (err) {
				console.error("Failed to load exams", err);
			}finally{
				setLoading(false);
			}
		};

		fetchExams();
	}, []);

	if (exams == []) return <p className="text-center mt-10">Loading exams...</p>;
	return (
		<div className="max-w-3xl mx-auto mt-10">
			<h1 className="text-3xl font-bold mb-6">All Exams</h1>

			{loading ? (
				<p className="text-center text-gray-500">Loading exams...</p>
			) : exams.length === 0 ? (
				<p className="text-center text-gray-500">No exams found.</p>
			) : (
				exams.map((exam) => (
					<div key={exam._id} className="border p-4 rounded mb-4 shadow">
						<h2 className="text-xl font-bold">{exam.title}</h2>
						<p>Duration: {exam.duration} minutes</p>
						<p>
							Start Time:{" "}
							{new Date(exam.startTime).toLocaleString("en-IN", {
								dateStyle: "medium",
								timeStyle: "short",
							})}
						</p>

						<Link to={`/addquestions/${exam._id}`}>
							<button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
								Add Questions
							</button>
						</Link>

						<Link to={`/previewexam/${exam._id}`}>
							<button className="ml-3 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
								Preview
							</button>
						</Link>
					</div>
				))
			)}
		</div>
	);

};

export default ExamList;

