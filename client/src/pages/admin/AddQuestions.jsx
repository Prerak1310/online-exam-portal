import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const AddQuestions = () => {
	const { examId } = useParams();

	const [questionText, setQuestionText] = useState("");
	const [options, setOptions] = useState(["", "", "", ""]);
	const [correctAnswer, setCorrectAnswer] = useState("");

	const handleOptionChange = (index, value) => {
		const newOptions = [...options];
		newOptions[index] = value;
		setOptions(newOptions);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
		const {data}=await axios.post(`/admin/questions/${examId}`, {
				questionText,
				options,
				correctAnswer,
			});
			if(data.error){
				toast.error(data.error);
			}else{
			toast.success("Question added successfully");	
			setQuestionText("");
			setOptions(["", "", "", ""]);
			setCorrectAnswer("");
			}
			
		} catch (err) {
			console.error(err);
			alert("Failed to add question");
		}
	};

	return (
		<div className="max-w-xl mx-auto mt-10 p-4 border rounded shadow">
			<h2 className="text-2xl font-bold mb-4">Add Question to Exam</h2>
			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				<textarea
					placeholder="Question text"
					value={questionText}
					onChange={(e) => setQuestionText(e.target.value)}
					required
					className="border p-2 rounded"
				/>
				{options.map((opt, idx) => (
					<input
						key={idx}
						type="text"
						placeholder={`Option ${idx + 1}`}
						value={opt}
						onChange={(e) => handleOptionChange(idx, e.target.value)}
						className="border p-2 rounded"
					/>
				))}
				<input
					type="text"
					placeholder="Correct Answer (must match one of the options)"
					value={correctAnswer}
					onChange={(e) => setCorrectAnswer(e.target.value)}
					className="border p-2 rounded"
					required
				/>
				<button type="submit" className="bg-green-600 text-white p-2 rounded hover:bg-green-700">
					Add Question
				</button>
			</form>
		</div>
	);
};

export default AddQuestions;

