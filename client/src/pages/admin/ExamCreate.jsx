import { useState } from 'react';
import axios from 'axios';
import { toast } from "react-hot-toast";

const ExamCreate = () => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [duration, setDuration] = useState('');
	const [startTime, setStartTime] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const {data} = await axios.post('admin/examcreate', {
				title,
				description,
				duration: parseInt(duration),
				startTime
			});
			if(data.error){
				toast.error(data.error);

			}else{
				toast.success(data.message);
			}
			setTitle('');
			setDescription('');
			setDuration('');
			setStartTime('');
		} catch (err) {
			console.error(err);
			alert('Failed to create exam');
		}
	};

	return (
		<div className="max-w-xl mx-auto mt-10 p-4 border rounded shadow">
			<h2 className="text-2xl font-semibold mb-4">Create New Exam</h2>
			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				<input
					type="text"
					placeholder="Exam Title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					required
					className="border p-2 rounded"
				/>
				<textarea
					placeholder="Description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					className="border p-2 rounded"
				/>
				<input
					type="number"
					placeholder="Duration (in minutes)"
					value={duration}
					onChange={(e) => setDuration(e.target.value)}
					required
					className="border p-2 rounded"
				/>
				<input
					type="datetime-local"
					value={startTime}
					onChange={(e) => setStartTime(e.target.value)}
					required
					className="border p-2 rounded"
				/>
				<button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
					Create Exam
				</button>
			</form>
		</div>
	);
};

export default ExamCreate;

