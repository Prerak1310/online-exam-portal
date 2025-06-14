// src/components/LoginButton.jsx
import React from "react";
import { Link } from "react-router-dom";

function LoginButton() {
  return (
    <Link
      to="/login"
      className="mt-4 inline-flex items-center rounded border-0 bg-blue-100 px-3 py-1 text-base hover:bg-blue-200 focus:outline-none md:mt-0"
    >
      Login
      <svg
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="ml-1 h-4 w-4"
        viewBox="0 0 24 24"
      >
        <path d="M5 12h14M12 5l7 7-7 7"></path>
      </svg>
    </Link>
  );
}

export default LoginButton;

