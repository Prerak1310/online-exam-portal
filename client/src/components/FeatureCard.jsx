// src/components/FeatureCard.jsx
import React from "react";
import { Link } from "react-router-dom";

function FeatureCard({ title, description, link }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link
        to={link}
        className="text-blue-600 hover:underline font-medium"
      >
        Go →
      </Link>
    </div>
  );
}

export default FeatureCard;

