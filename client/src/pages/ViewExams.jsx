// src/pages/ViewExams.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import ExamCard from "../components/ExamCard";

function ViewExams() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const res = await axios.get("/admin/getexams"); // make sure this endpoint returns only upcoming/published exams
        setExams(res.data);
      } catch (err) {
        console.error("Error fetching exams", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Available Exams</h1>

        {loading ? (
          <p className="text-center text-gray-600">Loading exams...</p>
        ) : exams.length === 0 ? (
          <p className="text-center text-gray-600">No exams available right now.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {exams.map((exam) => (
              <ExamCard key={exam._id} exam={exam} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewExams;

