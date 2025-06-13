import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const StartExam = () => {
  const { examId } = useParams();
  const navigate = useNavigate();

  const [exam, setExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timer, setTimer] = useState(0); // in seconds
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const examRes = await axios.get(`/admin/getexam/${examId}`);
        setExam(examRes.data);

        const questionsRes = await axios.get(`/admin/getquestions/${examId}`);
        setQuestions(questionsRes.data);

        const durationInSeconds = examRes.data.duration * 60;
        setTimer(durationInSeconds);
      } catch (err) {
        console.error("Error loading exam", err);
      }
    };

    fetchData();
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

  const handleSubmit = () => {
    setSubmitted(true);
    alert("Exam submitted!");
    // You can also POST answers to backend here if needed
  };

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  if (!exam || questions.length === 0) return <p className="text-center mt-10">Loading exam...</p>;

  const currentQuestion = questions[current];

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

