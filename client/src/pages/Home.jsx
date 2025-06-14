// src/pages/Home.jsx
import React from "react";
import { useSelector } from "react-redux";
import Dropdown from "../components/DropDown/Dropdown";
import LoginButton from "../components/LoginButton";
import FeatureCard from "../components/FeatureCard";

function Home() {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">Welcome to the Exam Portal</h1>
        {userInfo ? (
          <Dropdown username={userInfo.name} />
        ) : (
          <LoginButton />
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <FeatureCard
          title="View Exams"
          description="Browse all available exams you can take."
          link="/viewexams"
        />
        <FeatureCard
          title="View Scores"
          description="Check your performance and scores."
          link="/scores"
        />
        <FeatureCard
          title="Upcoming Exams"
          description="Get details about upcoming scheduled exams."
          link="/upcoming"
        />
      </div>
    </div>
  );
}

export default Home;

