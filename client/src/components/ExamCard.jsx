// src/components/ExamCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function ExamCard({ exam }) {
	const navigate = useNavigate();

	const handleStart = () => {
		navigate(`/startexam/${exam._id}`);
	};

	const hasStarted = true;
	//const hasStarted = new Date() >= new Date(exam.startTime);

	return (
		<div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300">
			<h2 className="text-xl font-bold text-gray-800 mb-2">{exam.title}</h2>
			<p className="text-gray-600 mb-1">
				Duration: <strong>{exam.duration}</strong> minutes
			</p>
			<p className="text-gray-600 mb-4">
				Start Time:{" "}
				<strong>{new Date(exam.startTime).toLocaleString()}</strong>
			</p>

			<button
				onClick={handleStart}
				disabled={!hasStarted}
				className={`w-full py-2 px-4 rounded font-semibold ${
					hasStarted
						? "bg-blue-600 hover:bg-blue-700 text-white"
						: "bg-gray-300 text-gray-500 cursor-not-allowed"
				}`}
			>
				{hasStarted ? "Take Exam" : "Not Started Yet"}
			</button>

		</div>
	);
}

export default ExamCard;

