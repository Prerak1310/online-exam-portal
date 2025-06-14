# Online Exam Portal

A full-stack web application for conducting online exams securely, with features for both admins and students. Built with **MERN Stack** and includes basic anti-cheating measures.

## Features

### Admin
- Create and manage exams
- Add questions with options and correct answers

### Student
- View available exams
- Take timed exams with a countdown
- Submit answers and get auto-evaluated score
- View exam history and scores

### Anti-Cheating (Basic)
- Tab switch detection (auto-submits after 3 switches)
- Disables right-click, Ctrl+U, Ctrl+C, Ctrl+S, and F12
- Timer-based auto submission

## Tech Stack
- **Frontend**: React, Tailwind CSS, Axios, React Router
- **Backend**: Node.js, Express.js, Mongoose
- **Database**: MongoDB Atlas
- **Auth**: JWT + Redux (or basic auth)

## Running Locally

1. **Clone this repo**
   ```bash
   git clone https://github.com/yourusername/online-exam-portal.git
   cd online-exam-portal

