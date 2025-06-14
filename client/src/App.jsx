import React, { Suspense, lazy } from "react";
import { Routes, BrowserRouter, Route, redirect } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import axios from "axios";

import LayoutLoader from "./components/layouts/Loading.jsx";
import NotFound from "./pages/NotFound.jsx";
// lazy loading of pages
const Home = lazy(() => import("./pages/Home.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));
const StartExam = lazy(() => import("./pages/StartExam.jsx"));
const ViewExams = lazy(() => import("./pages/ViewExams.jsx"));

// Protected Routes
const ProtectedRoutes = lazy(() => import("./utils/ProtectedRoutes.jsx"));

// Admin Pages
const ExamCreate = lazy(() => import("./pages/admin/ExamCreate.jsx"));
const ExamList = lazy(() => import("./pages/admin/ExamList.jsx"));
const AddQuestions = lazy(() => import("./pages/admin/AddQuestions.jsx"));
const PreviewExam = lazy(() => import("./pages/admin/PreviewExam.jsx"));

// axios config
axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;
// entry point
const App = () => {
	return (
		<BrowserRouter>
			<Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
			{/* loading screen in LayoutLoader */}
			<Suspense fallback={<LayoutLoader />}>
				<Routes>

					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />

					
					{/* Admin and Student Routes */}
					<Route element={<ProtectedRoutes allowedRoles={["admin", "student"]} />}>
					<Route path="/" element={<Home />} />
					<Route path="/viewexams" element={<ViewExams />} />
					<Route path="/startexam/:examId" element={<StartExam />} />
					</Route>


					{/* Admin Routes */}
					<Route element={<ProtectedRoutes allowedRoles={["admin"]} />}>
					<Route path="/examcreate" element={<ExamCreate />} />
					<Route path="/exams" element={<ExamList />} />
					<Route path="/addquestions/:examId" element={<AddQuestions />} />
					<Route path="/previewexam/:examId" element={<PreviewExam />} />
					</Route>
					{/* Not Found Route */}
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
};

export default App;
